#!/usr/bin/env python3
"""fray-garde-fou (version Cowork) : demande l'accord de David avant toute action
irréversible ou visible par un client.

Appelé par le hook PreToolUse de Cowork : lit l'appel d'outil en JSON sur l'entrée
standard. Si l'action fait partie des 5 règles, répond « ask_user » avec un résumé.
Sinon, ne répond rien (l'appel passe). N'utilise que la bibliothèque standard de
Python : aucun réseau, aucun sous-processus, aucune écriture de fichier. Seule
lecture hors appel : social/instagram/file-publication.json (exception Instagram).

Règles : 1 emails, 2 Dolibarr, 3 publications Facebook / Instagram / Buffer,
4 écritures sur frayservices.com et solandvolt.com, 5 Make et n8n.
Exception : publication Instagram d'un post au statut « valide » de la file de
publication, daté d'aujourd'hui (heure de Madrid), pour le bon compte.
"""
import json
import os
import re
import sys
from datetime import datetime

DOMAINES = re.compile(r"(solandvolt\.com|frayservices\.com)", re.I)
SITES = {"257165426": "solandvolt.com", "253853971": "frayservices.com"}
PAGES_FACEBOOK = {
    "659509903912871": "Fray Services",
    "1244233788769589": "Sol & Volt (Solandvolt)",
    "688555174347773": "SereniBrava Conciergerie Palamós (ni Fray Services ni Sol & Volt)",
    "894312617095394": "Français & Francophones de Palamós (ni Fray Services ni Sol & Volt)",
}
COMPTES_INSTAGRAM = {
    "instagram_creagh-averah": ("fray", "@frayservicespalamos (Fray Services)"),
    "instagram_izote-crepe": ("solandvolt", "@solandvolt (Sol & Volt)"),
}
FILE_PUBLICATION = os.path.join("social", "instagram", "file-publication.json")

LECTURE = re.compile(
    r"(^|[_-])(get|list|fetch|read|search|find|lookup|count|show|download|insights?|stats|check|preview|"
    r"screenshot|status|describe|schema|guide)([_-]|$)"
)
ECRITURE_WP = re.compile(
    r"(create|update|delete|install|uninstall|activate|deactivate|upload|switch|save|attach|detach|set|"
    r"purchase|provision|insert|replace|remove|move|import|add|change|invite|resend|cancel|edit|trash)"
)


# ---------- petits outils ----------

def txt(v):
    if v is None:
        return ""
    if isinstance(v, str):
        return v
    if isinstance(v, (int, float, bool)):
        return str(v)
    try:
        return json.dumps(v, ensure_ascii=False)
    except Exception:
        return ""


def first(a, keys):
    for k in keys:
        v = txt(a.get(k)).strip() if isinstance(a, dict) else ""
        if v:
            return v
    return ""


def cut(s, n):
    s = re.sub(r"\s+", " ", s or "").strip()
    return s if len(s) <= n else s[:n] + "…"


def euros(v):
    try:
        n = float(str(v).replace(" ", "").replace(",", "."))
    except Exception:
        return v
    ent, dec = f"{abs(n):.2f}".split(".")
    ent = re.sub(r"\B(?=(\d{3})+(?!\d))", " ", ent)
    return f"{'-' if n < 0 else ''}{ent},{dec} €"


def action(name):
    return name.split("__")[-1].lower()


def obj(v):
    return v if isinstance(v, dict) else {}


# ---------- règle 1 : emails ----------

def email(tool, a):
    t = tool.lower()
    act = action(tool)
    forme_email = "subject" in a and any(k in a for k in ("to", "recipient_email", "recipients"))
    if not ("gmail" in t or forme_email):
        return None
    if not re.search(r"(send|reply|forward)", act):
        return None
    brouillon = first(a, ["draftId", "draft_id"])
    if brouillon:
        return (1, f"Envoi du brouillon Gmail n° {brouillon} : destinataire, objet et texte ne sont pas dans l'appel. "
                   f"Ouvre le brouillon dans Gmail avant d'accepter.")
    dest = first(a, ["to", "recipient_email", "recipients", "to_recipients", "recipient", "email"]) or "(destinataire non indiqué)"
    cc = first(a, ["cc", "extra_recipients"])
    sujet = first(a, ["subject", "objet"]) or "(sans objet)"
    corps = first(a, ["body", "message_body", "text", "html_body", "htmlBody", "content", "message"])
    verbe = "transfert" if "forward" in act else "réponse" if "reply" in act else "envoi"
    return (1, f"Email ({verbe}) — À : {dest}" + (f" · Cc : {cc}" if cc else "") + f"\nObjet : {sujet}\n"
               f"Début : {cut(corps, 200) if corps else '(corps vide)'}")


# ---------- règle 2 : Dolibarr ----------

def lignes_montant(a):
    total, vu, taux = 0.0, False, []
    for l in a.get("lines") or []:
        o = obj(l)
        try:
            pu = float(o.get("subprice", o.get("price", o.get("pu_ht"))))
            q = float(o.get("qty", o.get("quantity", 1)))
            r = float(o.get("remise_percent", 0) or 0)
            total += pu * q * (1 - r / 100)
            vu = True
        except Exception:
            pass
        t = txt(o.get("tva_tx", o.get("vat_rate", o.get("tva")))).strip()
        if t:
            t = re.sub(r"\.0+$", "", t)
            if t not in taux:
                taux.append(t)
    return (f"{total:.2f}" if vu else ""), " / ".join(f"{t} %" for t in taux)


def sujet_dolibarr(s):
    if re.search(r"supplier", s, re.I):
        return "facture fournisseur"
    if re.search(r"(invoice|facture)", s, re.I):
        return "facture"
    if re.search(r"(propal|proposal|devis|quote)", s, re.I):
        return "devis"
    if re.search(r"(order|commande)", s, re.I):
        return "commande"
    return "objet Dolibarr"


def resume_dolibarr(verbe, sujet, origine, a):
    ht_brut, tva_lignes = lignes_montant(a)
    nom = first(a, ["thirdparty_name", "socname", "soc_name", "tiers", "customer", "client", "nom_client"])
    id_tiers = first(a, ["socid", "thirdparty", "thirdparty_id", "fk_soc"])
    if nom:
        tiers = nom
    elif re.fullmatch(r"\d+", id_tiers or ""):
        tiers = f"n° {id_tiers} (numéro interne : ouvre cette fiche dans Dolibarr pour voir le nom du client)"
    else:
        tiers = id_tiers or "(tiers non indiqué)"
    ht = first(a, ["total_ht", "amount_ht", "montant_ht", "totalHT"]) or ht_brut
    tva = first(a, ["tva_tx", "vat_rate", "tva", "taux_iva", "iva"])
    tva = (re.sub(r"\.0+$", "", tva) + " %") if tva else tva_lignes
    return (f"Dolibarr, {verbe} : {sujet} — {origine}\nTiers : {tiers}\n"
            f"Montant HT : {euros(ht) if ht else '(non indiqué dans l appel)'}\n"
            f"IVA : {tva or '(non indiquée dans l appel)'}")


def dolibarr_mcp(tool, a):
    if "dolibarr" not in tool.lower():
        return None
    act = action(tool)
    if LECTURE.search(act) and not re.search(r"(valid|create|update|add|set|close|delete|modify|edit)", act):
        return None
    verbe = ("validation" if "valid" in act else "suppression" if re.search(r"(delete|remove)", act)
             else "modification" if re.search(r"(update|set|modify|edit)", act) else "création")
    return (2, resume_dolibarr(verbe, sujet_dolibarr(act + " " + txt(a.get("module") or a.get("object") or "")), act, a))


def donnees_curl(cmd):
    m = re.search(r"(?:--data(?:-raw|-binary)?|--json|-d)\s+(?:'([^']*)'|\"((?:[^\"\\]|\\.)*)\"|(\S+))", cmd)
    brut = ""
    if m:
        brut = m.group(1) if m.group(1) is not None else (m.group(2).replace('\\"', '"') if m.group(2) is not None else m.group(3) or "")
    if brut.startswith("@"):
        return {}, True
    try:
        return obj(json.loads(brut)), False
    except Exception:
        return {}, False


def dolibarr_http(cmd, force=False):
    route = re.search(r"api/index\.php/(proposals|invoices|supplierinvoices|orders|thirdparties|contacts)(/\d+)?(/[a-z_]+)?", cmd, re.I)
    if not route or (not force and not ecriture_http(cmd)):
        return None
    m = re.search(r"(?:-X|--request)\s*(POST|PUT|PATCH|DELETE)", cmd, re.I)
    methode = (m.group(1) if m else "POST").upper()
    suite = (route.group(3) or "").lower()
    tiers = route.group(1).lower() in ("thirdparties", "contacts")
    if "valid" in suite:
        verbe = "validation"
    elif methode == "DELETE":
        verbe = "suppression"
    elif re.search(r"(close|setinvoiced|sign|refus|accept|settodraft|setdraft|cancel)", suite):
        verbe = "changement de statut"
    elif methode in ("PUT", "PATCH") or route.group(2) or suite:
        verbe = "modification"
    else:
        verbe = "création"
    a, fichier = donnees_curl(cmd)
    origine = f"API {methode} {route.group(0)}"
    if tiers:
        id_ = (route.group(2) or "").replace("/", "")
        t = (f"Dolibarr, {verbe} : {'contact' if route.group(1).lower() == 'contacts' else 'fiche de tiers'} — {origine}\n"
             + (f"Fiche n° {id_}\n" if id_ else "")
             + (f"Nom : {first(a, ['name', 'nom', 'lastname'])}\n" if first(a, ['name', 'nom', 'lastname']) else "")
             + (f"Champs envoyés : {', '.join(a.keys())}" if a else ""))
        if verbe == "suppression":
            t += "\nNe supprime jamais une fiche qui porte un devis, une facture ou une commande."
        return (2, t.strip())
    t = resume_dolibarr(verbe, sujet_dolibarr(route.group(1)), origine, a)
    if fichier:
        t += "\nDonnées lues dans un fichier : vérifie son contenu (tiers, lignes, montant, IVA)."
    return (2, t)


# ---------- règle 3 : réseaux sociaux ----------

def jour_madrid():
    try:
        from zoneinfo import ZoneInfo
        return datetime.now(ZoneInfo("Europe/Madrid")).date().isoformat()
    except Exception:
        return datetime.utcnow().date().isoformat()


def trouver_file():
    bases = [os.environ.get("CLAUDE_PROJECT_DIR"), os.getcwd()]
    for base in [b for b in bases if b]:
        d = os.path.abspath(base)
        for _ in range(8):
            p = os.path.join(d, FILE_PUBLICATION)
            if os.path.isfile(p):
                return p
            parent = os.path.dirname(d)
            if parent == d:
                break
            d = parent
    return None


def exception_instagram(a):
    """Vrai si la file contient un post « valide » daté d'aujourd'hui pour ce compte."""
    compte = COMPTES_INSTAGRAM.get(first(a, ["_compte"]), ("fray", ""))[0]
    p = trouver_file()
    if not p:
        return False
    try:
        with open(p, encoding="utf-8") as f:
            posts = obj(json.load(f)).get("publications") or []
    except Exception:
        return False
    jour = jour_madrid()
    return any(obj(x).get("statut") == "valide" and obj(x).get("date") == jour and obj(x).get("compte") == compte
               for x in posts)


def statut_social(a):
    quand = a.get("scheduled_publish_time") or a.get("scheduled_at") or a.get("scheduledAt") or a.get("publish_at")
    if quand not in (None, ""):
        try:
            n = float(quand)
            if n > 1e9:
                return "programmé pour le " + datetime.utcfromtimestamp(n if n < 1e12 else n / 1000).strftime("%Y-%m-%d %H:%M UTC")
        except Exception:
            pass
        return f"programmé pour le {quand}"
    if a.get("published") is False:
        return "non publié (invisible du public)"
    return "publié immédiatement (visible du public)"


def social(tool, a):
    t = tool.lower()
    m = re.search(r"(facebook|instagram|buffer|postiz)", t)
    if not m:
        return None
    act = action(tool)
    if not re.search(r"(publish|post|schedule|share|send|reel|stor(y|ies)|comment|reply|create_update)", act):
        return None
    if LECTURE.search(act):
        return None
    plateforme = {"facebook": "Facebook", "instagram": "Instagram", "buffer": "Buffer", "postiz": "Postiz"}[m.group(1)]
    if plateforme == "Instagram":
        # Instagram publie en 2 étapes : la création du conteneur est invisible et passe.
        if "publish" not in act and re.search(r"(media|container)", act):
            return None
        if "publish" in act and exception_instagram(a):
            return None
    compte = first(a, ["_compte"])
    page = first(a, ["page_id", "pageId", "ig_user_id", "profile_ids", "profile_id", "account_id"])
    if compte in COMPTES_INSTAGRAM:
        qui = COMPTES_INSTAGRAM[compte][1]
    elif page and page != "me":
        qui = (f"page {PAGES_FACEBOOK[page]} ({page})" if page in PAGES_FACEBOOK else f"page ou compte n° {page} (non reconnu)")
    elif plateforme == "Instagram":
        qui = "compte Instagram par défaut : @frayservicespalamos (Fray Services)"
    else:
        qui = "(page ou compte non indiqué)"
    texte = first(a, ["caption", "message", "text", "content", "body", "description"])
    media = first(a, ["image_url", "video_url", "media_url", "url", "creation_id", "link"])
    t_ = f"Publication {plateforme} — {act}\nPage ou compte : {qui}\nStatut : {statut_social(a)}\n"
    if not texte and first(a, ["creation_id"]):
        t_ += (f"Conteneur n° {first(a, ['creation_id'])} : la légende et la photo ne sont pas dans l'appel "
               f"(elles figuraient dans la création du conteneur).\n")
    else:
        t_ += f"Texte : {cut(texte, 1000) if texte else '(aucun texte dans l appel)'}\n"
        if media:
            t_ += f"Média : {cut(media, 150)}\n"
    return (3, t_.strip())


# ---------- règle 4 : sites ----------

def ecriture_http(cmd):
    return bool(re.search(
        r"(-X\s*(POST|PUT|PATCH|DELETE)|--request\s+(POST|PUT|PATCH|DELETE)|\s(-d|--data[\w-]*|--json|-F|--form)\s|"
        r"requests\.(post|put|patch|delete)|method\s*[:=]\s*['\"](POST|PUT|PATCH|DELETE)|"
        r"\bwp\s+(post|option|plugin|theme|rewrite|menu|user)\s+(update|create|delete|activate|deactivate|install|set|add))",
        f" {cmd} ", re.I))


def type_wp(s):
    t = s.lower()
    for motif, nom in [
        (r"(rankmath|rank-math).*redirect|redirect.*(rankmath|rank-math)", "redirection (Rank Math)"),
        (r"redirect", "redirection"), (r"(rankmath|rank-math)", "SEO Rank Math (titre ou description)"),
        (r"wc/v3/products|product", "produit WooCommerce"), (r"wc/v3/orders|order", "commande WooCommerce"),
        (r"code-snippets|snippet", "snippet de code (Code Snippets)"),
        (r"global-styles|global_styles|custom_css|css", "styles du site (CSS)"),
        (r"template-part|template_part", "partie de modèle"), (r"template", "modèle de page"),
        (r"navigation|menu", "menu"), (r"dns|nameserver|domain", "domaine ou DNS"),
        (r"plugin", "extension"), (r"theme", "thème"), (r"media|upload", "média"),
        (r"settings|option", "réglages du site"), (r"pages-|/pages|page", "page"),
        (r"posts-|/posts|post", "article"), (r"user", "utilisateur"),
    ]:
        if re.search(motif, t):
            return nom
    return "élément du site"


def wordpress(tool, a):
    t = tool.lower()
    if not re.search(r"(wordpress|wpcom)", t):
        return None
    act = action(tool)
    if not ECRITURE_WP.search(act):
        return None
    site = first(a, ["wpcom_site", "site", "site_id", "siteId", "blog_id", "domain"])
    site = SITES.get(site, site)
    if site and not DOMAINES.search(site) and not re.fullmatch(r"\d+", site):
        return None
    cible = first(a, ["id", "post_id", "page_id", "slug", "name", "plugin", "theme", "domain"])
    titre = first(a, ["title"])
    statut = first(a, ["status"])
    contenu = first(a, ["content", "css", "records", "source", "destination"])
    t_ = f"Modification de production sur {site or '(site non indiqué)'} — {act}\nType : {type_wp(act)}" \
         + (f" n° {cut(cible, 120)}" if cible else "") + "\n"
    if titre:
        t_ += f"Titre envoyé : {cut(titre, 120)}\n"
    if statut:
        t_ += f"Statut envoyé : {statut}{' (en ligne)' if statut == 'publish' else ''}\n"
    if contenu:
        t_ += f"Contenu envoyé : {cut(contenu, 300)}\n"
    for i, e in enumerate((a.get("css_edits") or [])[:5], 1):
        e = obj(e)
        c, r = txt(e.get("search")), txt(e.get("replace"))
        t_ += (f"CSS, modification {i} : " + (f"ajout de « {cut(r, 200)} »" if c == "" else
               f"suppression de « {cut(c, 200)} »" if r == "" else
               f"remplace « {cut(c, 200)} » par « {cut(r, 200)} »") + "\n")
    champs = [k for k in a if k not in ("wpcom_site", "site", "site_id", "id", "include_fields", "context", "_compte")]
    if champs:
        t_ += f"Champs modifiés : {', '.join(champs)}\n"
    return (4, t_.strip())


def site_http(cmd, force=False):
    if not DOMAINES.search(cmd) or (not force and not ecriture_http(cmd)):
        return None
    site = DOMAINES.search(cmd).group(1).lower()
    m = re.search(r"https?://[^\s'\"]+", cmd)
    route = m.group(0) if m else ""
    avert = ""
    if re.search(r"code-snippets", cmd, re.I) and (re.search(r"[\"']code[\"']\s*:", cmd) or re.search(r"[\"']active[\"']\s*:|/(activate|deactivate)\b", cmd)
                                                  or re.search(r"-X\s*DELETE|--request\s+DELETE", cmd, re.I)):
        avert = "ATTENTION : code PHP d'un snippet modifié, activé, désactivé ou supprimé. Une erreur peut rendre le site inaccessible.\n"
    extra = ""
    if re.search(r"wc/v3/products", cmd, re.I):
        a, _ = donnees_curl(cmd)
        champs = []
        if a.get("regular_price") not in (None, ""):
            champs.append("prix normal " + euros(txt(a.get("regular_price"))))
        if a.get("sale_price") is not None:
            champs.append("prix promotionnel " + euros(txt(a.get("sale_price"))) if txt(a.get("sale_price")) else "promotion retirée")
        if a.get("stock_quantity") is not None:
            champs.append("stock " + txt(a.get("stock_quantity")))
        if a.get("status") is not None:
            champs.append("statut " + txt(a.get("status")))
        if champs:
            extra = "Champs envoyés : " + ", ".join(champs) + "\n"
        if "regular_price" in a or "sale_price" in a:
            extra += "Rappel : une fiche EcoFlow (SKU SV-ECF…) ne se vend jamais sous le PVP conseillé (PVP HT × 1,21).\n"
    return (4, avert + f"Écriture sur {site} par une commande — {type_wp(route or cmd)}\n"
               + (f"Adresse : {cut(route, 200)}\n" if route else "") + extra + f"Commande : {cut(cmd, 300)}")


# ---------- règle 5 : Make et n8n ----------

def automatisation(tool, a):
    t = tool.lower()
    act = action(tool)
    make = t.startswith("mcp__make__") or t.startswith("make_") or "__make__" in t
    n8n = "n8n" in t
    if "deactivate" in act:  # décision de David : la désactivation n'est pas bloquée
        return None
    if make and not re.search(r"(scenarios?_(activate|delete|run|replay|start)|run_scenario)", act):
        return None
    if n8n and not re.search(r"(activate|delete|execute|run|trigger|start)", act):
        return None
    if not make and not n8n:
        return None
    id_ = first(a, ["scenarioId", "scenario_id", "id", "workflowId", "workflow_id", "name"])
    verbe = "activation" if "activate" in act else "suppression" if "delete" in act else "lancement"
    return (5, f"{'Scénario Make' if make else 'Workflow n8n'} : {verbe} — {act}\nIdentifiant : {id_ or '(non indiqué)'}"
               + (f"\nDonnées envoyées : {cut(txt(a.get('data')), 300)}" if a.get("data") is not None else "")
               + "\nVérifie son nom, son état et ce qu'il fait avant d'accepter.")


def automatisation_http(cmd):
    make = re.search(r"hook\.[a-z0-9]+\.make\.com|hook\.make\.com|\.make\.com/api/v2/scenarios/\d+/(run|start)", cmd, re.I)
    n8n = re.search(r"n8n", cmd, re.I) and re.search(r"(/webhook/|/workflows/[^\s]*/activate|/executions)", cmd, re.I)
    if not make and not n8n:
        return None
    return (5, f"{'Make' if make else 'n8n'} lancé par une commande :\n{cut(cmd, 300)}")


# ---------- commandes et code ----------

SEP = r"\n|;|&&|\|\||\||\$\(|`"
PREFIXES = re.compile(r"^(?:(?:[A-Za-z_]\w*=\S*\s+)|(?:sudo|time|command|exec|nohup|env)\s+)*")
OUTILS_HTTP = re.compile(r"^(curl|wget|http|https|xh|wp)\b")
INTERPRETES = re.compile(r"^(python3?(\.\d+)?|node|deno|bun|php|ruby|perl)\b")
SHELLS = re.compile(r"^(bash|sh|zsh|dash)\b")
CODE_ECRITURE = re.compile(
    r"(\b(requests|httpx|session|client|s)\.(post|put|patch|delete|request)\s*\(|"
    r"\bfetch\s*\([\s\S]*?method\s*:\s*['\"](POST|PUT|PATCH|DELETE)|method\s*=\s*['\"](POST|PUT|PATCH|DELETE)|"
    r"\burlopen\s*\(|\b(subprocess|os\.system|os\.popen|execSync|spawnSync|spawn|exec)\b[\s\S]*\bcurl\b)", re.I)
ARG_CODE = re.compile(
    r"\b(python3?(?:\.\d+)?|node|deno|bun|php|ruby|perl|bash|sh|zsh|dash)\s+(?:-[A-Za-z]+\s+)*-(?:c|e)\s+"
    r"(?:'([^']*)'|\"((?:[^\"\\]|\\.)*)\")")


def premier_mot(seg):
    return PREFIXES.sub("", re.sub(r"^[({\s]+", "", seg.strip()))


def lances(cmd, profondeur=0):
    """Ne garde que ce qui est réellement lancé : un texte cité ne bloque rien."""
    sortie = []
    lignes = re.sub(r"\\\r?\n", " ", cmd).split("\n")
    gardees, i = [], 0
    while i < len(lignes):
        ligne = lignes[i]
        m = re.search(r"<<-?\s*(['\"]?)([A-Za-z_]\w*)\1", ligne)
        if not m:
            gardees.append(ligne)
            i += 1
            continue
        corps, j = [], i + 1
        while j < len(lignes) and lignes[j].strip() != m.group(2):
            corps.append(lignes[j])
            j += 1
        lanceur = premier_mot(re.split(SEP, ligne[:m.start()])[-1])
        if INTERPRETES.match(lanceur):
            sortie.append(("code", "\n".join(corps)))
        elif SHELLS.match(lanceur) and profondeur < 3:
            sortie += lances("\n".join(corps), profondeur + 1)
        gardees.append(ligne)
        i = j + 1

    def remplace(m):
        code = m.group(2) if m.group(2) is not None else (m.group(3) or "").replace('\\"', '"')
        if SHELLS.match(m.group(1)):
            if profondeur < 3:
                sortie.extend(lances(code, profondeur + 1))
        else:
            sortie.append(("code", code))
        return m.group(1)

    reste = ARG_CODE.sub(remplace, "\n".join(gardees))
    for seg in re.split(SEP, reste):
        if OUTILS_HTTP.match(premier_mot(seg)):
            sortie.append(("shell", premier_mot(seg)))
    return sortie


def commande(cmd, est_code=False):
    liste = [("code", cmd)] if est_code else lances(cmd)
    for type_, t in liste:
        if type_ == "code":
            if not CODE_ECRITURE.search(t):
                continue
            r = site_http(t, True) or dolibarr_http(t, True) or automatisation_http(t)
        else:
            r = site_http(t) or dolibarr_http(t) or automatisation_http(t)
        if r:
            return r
    return None


# ---------- point d'entrée ----------

def classify(tool, a):
    t = tool.lower()
    if "composio_multi_execute_tool" in t and isinstance(a.get("tools"), list):
        for x in a["tools"]:
            x = obj(x)
            args = dict(obj(x.get("arguments") or x.get("args") or x.get("input")))
            if x.get("account"):
                args["_compte"] = txt(x.get("account"))
            r = classify(txt(x.get("tool_slug") or x.get("slug") or x.get("name")), args)
            if r:
                return r
        return None
    if "composio_remote_workbench" in t:
        return commande(first(a, ["code_to_execute", "code", "script", "command"]), True)
    if isinstance(a.get("command"), str) and (t in ("bash", "shell") or "bash" in t or "shell" in t or "terminal" in t):
        return commande(a["command"])
    return email(tool, a) or dolibarr_mcp(tool, a) or social(tool, a) or automatisation(tool, a) or wordpress(tool, a)


SENSIBLE = re.compile(r"(gmail|dolibarr|facebook|instagram|buffer|wpcom|wordpress|solandvolt|frayservices|make\.com|scenarios_)", re.I)


def reponse(regle, resume):
    texte = f"fray-garde-fou, règle {regle} : accord de David requis avant cette action.\n\n{resume}"
    return {
        "decision": "ask_user",
        "reason": texte,
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "ask",
            "permissionDecisionReason": texte,
        },
    }


def main():
    brut = sys.stdin.read()
    try:
        data = json.loads(brut)
        tool = txt(data.get("tool_name") or data.get("toolName") or data.get("tool"))
        args = obj(data.get("tool_input") or data.get("toolInput") or data.get("input"))
        r = classify(tool, args)
    except Exception:
        if SENSIBLE.search(brut):
            print(json.dumps(reponse(0, "Contrôle en échec sur un appel qui semble sensible : accord demandé par prudence.")))
        return 0
    if r:
        print(json.dumps(reponse(r[0], r[1]), ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main())
