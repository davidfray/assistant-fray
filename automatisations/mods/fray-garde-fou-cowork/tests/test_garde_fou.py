"""Tests de l'extension Cowork fray-garde-fou : python3 -m unittest discover -s tests -v"""
import importlib.util
import json
import os
import subprocess
import sys
import tempfile
import unittest
from datetime import datetime

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPT = os.path.join(RACINE, "hooks", "scripts", "garde_fou.py")
spec = importlib.util.spec_from_file_location("garde_fou", SCRIPT)
gf = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gf)

SITE = "curl -X POST https://www.solandvolt.com/wp-json/wp/v2/pages/7 -d x=1"
DOLI = "curl -X POST https://erp.example/api/index.php/proposals -d '{\"socid\":1}'"
MAKE = "curl -X POST https://hook.eu2.make.com/abc -d x=1"


def regle(tool, args):
    r = gf.classify(tool, args)
    return r[0] if r else None


def texte(tool, args):
    r = gf.classify(tool, args)
    return r[1] if r else ""


class Emails(unittest.TestCase):
    def test_envoi_direct_200_caracteres(self):
        t = texte("mcp__Gmail__send_message", {"to": ["c@x.fr"], "subject": "Devis", "body": "x" * 250})
        self.assertIn("c@x.fr", t)
        self.assertIn("Devis", t)
        self.assertIn("x" * 200 + "…", t)
        self.assertNotIn("x" * 201, t)

    def test_brouillon_envoi_et_reponse(self):
        self.assertEqual(regle("mcp__Gmail__send_message", {"draftId": "r1"}), 1)
        self.assertEqual(regle("mcp__Gmail__reply", {"thread_id": "t", "body": "ok"}), 1)
        self.assertIsNone(regle("mcp__Gmail__create_draft", {"to": ["a@b.c"]}))
        self.assertIsNone(regle("mcp__Gmail__search_threads", {"q": "x"}))

    def test_composio(self):
        r = regle("mcp__Composio__COMPOSIO_MULTI_EXECUTE_TOOL",
                  {"tools": [{"tool_slug": "GMAIL_SEND_EMAIL", "arguments": {"recipient_email": "x@y.es", "subject": "S", "body": "b"}}]})
        self.assertEqual(r, 1)


class Dolibarr(unittest.TestCase):
    def test_api_tiers_ht_iva(self):
        t = texte("Bash", {"command": "curl -s -X POST \"https://erp.example/api/index.php/proposals\" --data "
                           "'{\"socid\":\"Client\",\"lines\":[{\"subprice\":2000,\"qty\":1,\"tva_tx\":10},"
                           "{\"subprice\":500,\"qty\":1,\"tva_tx\":\"10.000\"}]}'"})
        self.assertIn("création : devis", t)
        self.assertIn("Tiers : Client", t)
        self.assertIn("2 500,00 €", t)
        self.assertIn("IVA : 10 %", t)

    def test_tiers_numerique_et_suppression(self):
        self.assertIn("n° 42", texte("Bash", {"command": "curl -X POST https://erp.example/api/index.php/invoices -d '{\"socid\":42}'"}))
        d = texte("Bash", {"command": "curl -s -X DELETE https://erp.example/api/index.php/thirdparties/10"})
        self.assertIn("suppression : fiche de tiers", d)
        self.assertIn("Ne supprime jamais", d)

    def test_statut_devis_et_lecture(self):
        self.assertIn("changement de statut", texte("Bash", {"command": "curl -X POST https://erp.example/api/index.php/proposals/8/close -d '{}'"}))
        self.assertIsNone(regle("Bash", {"command": "curl -s https://erp.example/api/index.php/thirdparties?limit=5"}))


class Social(unittest.TestCase):
    def test_facebook_page_et_statut(self):
        t = texte("FACEBOOK_CREATE_POST", {"page_id": "1244233788769589", "message": "x", "published": False})
        self.assertIn("page Sol & Volt (Solandvolt)", t)
        self.assertIn("non publié", t)
        self.assertIn("ni Fray Services ni Sol & Volt", texte("FACEBOOK_CREATE_POST", {"page_id": "688555174347773", "message": "x"}))

    def test_instagram_conteneur_libre_publication_demandee(self):
        self.assertIsNone(regle("INSTAGRAM_POST_IG_USER_MEDIA", {"image_url": "https://x/y.jpg", "caption": "L"}))
        self.assertIsNone(regle("INSTAGRAM_GET_IG_USER_MEDIA", {}))
        with tempfile.TemporaryDirectory() as vide:
            ancien = os.getcwd()
            os.chdir(vide)
            try:
                self.assertEqual(regle("INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH", {"creation_id": "42"}), 3)
            finally:
                os.chdir(ancien)


class ExceptionInstagram(unittest.TestCase):
    def _avec_file(self, publications, args):
        with tempfile.TemporaryDirectory() as d:
            os.makedirs(os.path.join(d, "social", "instagram"))
            with open(os.path.join(d, "social", "instagram", "file-publication.json"), "w") as f:
                json.dump({"publications": publications}, f)
            ancien = os.getcwd()
            os.chdir(d)
            try:
                return gf.classify("INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH", args)
            finally:
                os.chdir(ancien)

    def test_post_valide_du_jour_passe(self):
        jour = gf.jour_madrid()
        r = self._avec_file([{"statut": "valide", "date": jour, "compte": "solandvolt"}],
                            {"creation_id": "42", "_compte": "instagram_izote-crepe"})
        self.assertIsNone(r)

    def test_autres_cas_demandent_accord(self):
        jour = gf.jour_madrid()
        # mauvais compte
        self.assertEqual(self._avec_file([{"statut": "valide", "date": jour, "compte": "fray"}],
                                         {"creation_id": "1", "_compte": "instagram_izote-crepe"})[0], 3)
        # pas validé
        self.assertEqual(self._avec_file([{"statut": "a_valider", "date": jour, "compte": "fray"}], {"creation_id": "1"})[0], 3)
        # autre jour
        self.assertEqual(self._avec_file([{"statut": "valide", "date": "2020-01-01", "compte": "fray"}], {"creation_id": "1"})[0], 3)
        # déjà publié
        self.assertEqual(self._avec_file([{"statut": "publie", "date": jour, "compte": "fray"}], {"creation_id": "1"})[0], 3)


class Sites(unittest.TestCase):
    def test_wordpress_connecteur(self):
        t = texte("mcp__WordPress_com__wpcom-mcp-pages-update", {"wpcom_site": "253853971", "id": 638, "title": "Aviso", "status": "publish"})
        self.assertIn("frayservices.com", t)
        self.assertIn("Type : page n° 638", t)
        self.assertIn("publish (en ligne)", t)
        self.assertIsNone(regle("mcp__WordPress_com__wpcom-mcp-pages-get", {"wpcom_site": "257165426", "id": 7}))
        self.assertIsNone(regle("mcp__WordPress_com__wpcom-mcp-pages-update", {"wpcom_site": "autre-site.fr", "id": 1}))

    def test_css_et_snippet(self):
        t = texte("mcp__WordPress_com__wpcom-global-styles-update",
                  {"wpcom_site": "257165426", "css_edits": [{"search": "/* a */", "replace": "/* a */ /* b */"}]})
        self.assertIn("remplace « /* a */ » par « /* a */ /* b */ »", t)
        u = "https://www.solandvolt.com/wp-json/code-snippets/v1/snippets/24"
        self.assertIn("ATTENTION", texte("Bash", {"command": f"curl -X POST {u} --data '{{\"code\":\"x\"}}'"}))
        self.assertNotIn("ATTENTION", texte("Bash", {"command": f"curl -X POST {u} --data '{{\"desc\":\"x\"}}'"}))

    def test_produit_et_rappel_pvp(self):
        t = texte("Bash", {"command": "curl -X PUT https://www.solandvolt.com/wp-json/wc/v3/products/87 --data '{\"regular_price\":\"229.00\"}'"})
        self.assertIn("prix normal 229,00 €", t)
        self.assertIn("PVP conseillé", t)

    def test_redirection_rank_math(self):
        self.assertIn("redirection (Rank Math)", texte("Bash", {"command": "curl -X POST https://www.solandvolt.com/wp-json/rankmath/v1/updateRedirection --data '{}'"}))


class Automatisations(unittest.TestCase):
    def test_make_et_n8n(self):
        for outil in ("mcp__Make__scenarios_activate", "mcp__Make__scenarios_delete", "mcp__Make__scenarios_run"):
            self.assertEqual(regle(outil, {"scenarioId": 1}), 5)
        self.assertEqual(regle("mcp__n8n__execute_workflow", {"workflowId": "a"}), 5)
        self.assertEqual(regle("Bash", {"command": MAKE}), 5)

    def test_desactivation_et_lecture_libres(self):
        self.assertIsNone(regle("mcp__Make__scenarios_deactivate", {"scenarioId": 1}))
        self.assertIsNone(regle("mcp__Make__scenarios_list", {}))
        self.assertIsNone(regle("mcp__Make__scenarios_get", {"scenarioId": 1}))


class FauxPositifs(unittest.TestCase):
    def test_texte_cite_ne_bloque_rien(self):
        for c in (f"echo {MAKE}", f"printf '%s' \"{SITE}\"", f"grep -rn \"api/index.php/proposals\" . && grep -c \"{MAKE}\" notes.md",
                  f"git commit -m \"Test : {SITE}\"", f"cat > notes.md <<'EOF'\n{SITE}\n{DOLI}\nEOF\nwc -l notes.md",
                  f"python3 - <<'EOF'\ns = '''{DOLI}'''\nprint(s)\nEOF"):
            self.assertIsNone(regle("Bash", {"command": c}), c)

    def test_lecture_seule(self):
        self.assertIsNone(regle("Bash", {"command": "curl -s https://www.solandvolt.com/wp-json/wc/v3/products/87"}))
        self.assertIsNone(regle("mcp__Composio__COMPOSIO_REMOTE_WORKBENCH", {"code_to_execute": f"r = requests.get('https://www.solandvolt.com/')\nprint('{SITE}')"}))

    def test_vraies_ecritures_bloquees(self):
        self.assertEqual(regle("Bash", {"command": "cd /tmp && curl -X PUT https://www.solandvolt.com/wp-json/wc/v3/products/87 -d x=1"}), 4)
        self.assertEqual(regle("Bash", {"command": "R=$(curl -s -X POST https://hook.eu2.make.com/abc -d x=1)"}), 5)
        self.assertEqual(regle("Bash", {"command": "curl -s \\\n -X POST \\\n https://www.solandvolt.com/wp-json/rankmath/v1/updateMeta \\\n --data '{}'"}), 4)
        self.assertEqual(regle("Bash", {"command": f"bash -c '{SITE}'"}), 4)
        self.assertEqual(regle("Bash", {"command": "python3 - <<'EOF'\nimport requests\nrequests.post('https://www.solandvolt.com/wp-json/wc/v3/products/87', json={})\nEOF"}), 4)
        self.assertEqual(regle("mcp__Composio__COMPOSIO_REMOTE_WORKBENCH", {"code_to_execute": "requests.put('https://www.frayservices.com/wp-json/wp/v2/pages/10', json={})"}), 4)

    def test_outils_ordinaires(self):
        self.assertIsNone(regle("Read", {"file_path": "/x"}))
        self.assertIsNone(regle("Bash", {"command": "git status"}))


class DeBoutEnBout(unittest.TestCase):
    def _lance(self, entree):
        p = subprocess.run([sys.executable, SCRIPT], input=entree, capture_output=True, text=True, timeout=20)
        return p.returncode, p.stdout.strip()

    def test_demande_et_laisse_passer(self):
        code, sortie = self._lance(json.dumps({"tool_name": "mcp__Gmail__send_message", "tool_input": {"to": ["a@b.c"], "subject": "S", "body": "B"}}))
        self.assertEqual(code, 0)
        rep = json.loads(sortie)
        self.assertEqual(rep["decision"], "ask_user")
        self.assertEqual(rep["hookSpecificOutput"]["permissionDecision"], "ask")
        self.assertIn("a@b.c", rep["reason"])
        code, sortie = self._lance(json.dumps({"tool_name": "Read", "tool_input": {"file_path": "/x"}}))
        self.assertEqual((code, sortie), (0, ""))

    def test_entree_cassee(self):
        self.assertEqual(self._lance("pas du json"), (0, ""))
        code, sortie = self._lance('{"tool_name": "mcp__Gmail__send_message", "tool_input": [casse')
        self.assertEqual(code, 0)
        self.assertEqual(json.loads(sortie)["decision"], "ask_user")


if __name__ == "__main__":
    unittest.main()
