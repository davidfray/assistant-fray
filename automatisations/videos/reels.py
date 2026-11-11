"""Génère les Reels Instagram (1080x1920, 30 i/s, H.264) à partir de photos réelles.

Usage : python3 reels.py <dossier_sortie> <dossier_polices> [nom_video ...]
Les photos sont téléchargées depuis frayservices.com et solandvolt.com.
Fray : charte bleu marine #0B2A5C / orange #F5A30B, Oswald + Lato.
Sol & Volt : charte solaire #3D2E0A / #C89B3C / #FAEEDA, police système, photo entière (jamais recadrée).
"""
import io, os, subprocess, sys, urllib.request
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1080, 1920
SC = 2  # rendu en 2x pour un zoom fluide
OUT, FONTS = sys.argv[1], sys.argv[2]
ONLY = set(sys.argv[3:])
FF = os.environ.get("FFMPEG", "ffmpeg")

def font(name, size, bold=False):
    if name == "oswald":
        f = ImageFont.truetype(os.path.join(FONTS, "Oswald%5Bwght%5D.ttf"), size * SC)
        f.set_variation_by_name("Bold")
        return f
    if name == "lato":
        return ImageFont.truetype(os.path.join(FONTS, "Lato-Bold.ttf" if bold else "Lato-Regular.ttf"), size * SC)
    return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf" % ("-Bold" if bold else ""), size * SC)

_cache = {}
def photo(url):
    if url not in _cache:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        _cache[url] = Image.open(io.BytesIO(urllib.request.urlopen(req, timeout=60).read())).convert("RGB")
    return _cache[url].copy()

def wrap(draw, text, f, maxw):
    lines = []
    for para in text.split("\n"):
        cur = ""
        for w in para.split(" "):
            t = (cur + " " + w).strip()
            if draw.textlength(t, font=f) <= maxw:
                cur = t
            else:
                lines.append(cur); cur = w
        lines.append(cur)
    return lines

def text_block(draw, text, f, color, y, maxw=W - 160, align="center", gap=1.18):
    lines = wrap(draw, text, f, maxw * SC)
    lh = int(f.size * gap)
    for ln in lines:
        tw = draw.textlength(ln, font=f)
        x = (W * SC - tw) / 2 if align == "center" else 80 * SC
        draw.text((x, y), ln, font=f, fill=color)
        y += lh
    return y

def cover(img):
    r = max(W * SC / img.width, H * SC / img.height)
    img = img.resize((int(img.width * r) + 1, int(img.height * r) + 1), Image.LANCZOS)
    x, y = (img.width - W * SC) // 2, (img.height - H * SC) // 2
    return img.crop((x, y, x + W * SC, y + H * SC))

# ---------- Fray Services ----------
NAVY, ORANGE, WHITE = (11, 42, 92), (245, 163, 11), (255, 255, 255)

def fray_footer(d):
    f = font("oswald", 34)
    t = "FRAY SERVICES · PALAMÓS"
    d.text(((W * SC - d.textlength(t, font=f)) / 2, 1700 * SC), t, font=f, fill=WHITE)

def fray_card(title, sub=None, small=None):
    im = Image.new("RGB", (W * SC, H * SC), NAVY)
    d = ImageDraw.Draw(im)
    d.rectangle([80 * SC, 560 * SC, 260 * SC, 576 * SC], fill=ORANGE)
    y = text_block(d, title, font("oswald", 92), WHITE, 620 * SC, align="left")
    if sub:
        y = text_block(d, sub, font("lato", 50), ORANGE, y + 40 * SC, align="left")
    if small:
        text_block(d, small, font("lato", 40), WHITE, y + 50 * SC, align="left")
    fray_footer(d)
    return im

def fray_photo(url, label, sub=None):
    im = cover(photo(url))
    d = ImageDraw.Draw(im, "RGBA")
    fl = font("oswald", 76)
    lines = wrap(d, label, fl, (W - 200) * SC)
    fs = font("lato", 42, bold=True)
    sublines = wrap(d, sub, fs, (W - 200) * SC) if sub else []
    h = len(lines) * int(fl.size * 1.15) + len(sublines) * int(fs.size * 1.25) + 90 * SC
    top = 260 * SC
    d.rectangle([60 * SC, top, (W - 60) * SC, top + h], fill=NAVY + (225,))
    d.rectangle([60 * SC, top, 76 * SC, top + h], fill=ORANGE)
    y = top + 40 * SC
    for ln in lines:
        d.text((110 * SC, y), ln, font=fl, fill=WHITE); y += int(fl.size * 1.15)
    for ln in sublines:
        d.text((110 * SC, y), ln, font=fs, fill=ORANGE); y += int(fs.size * 1.25)
    d.rectangle([0, 1670 * SC, W * SC, 1790 * SC], fill=NAVY + (200,))
    fray_footer(d)
    return im

FR = "https://frayservices.com/wp-content/uploads/"
# ---------- Sol & Volt ----------
SBG, SGOLD, SLIGHT, INK = (61, 46, 10), (200, 155, 60), (250, 238, 218), (20, 32, 28)

def sv_logo(d, color):
    f = font("sys", 36, bold=True)
    t = "S O L A N D V O L T"
    d.text(((W * SC - d.textlength(t, font=f)) / 2, 1720 * SC), t, font=f, fill=color)

def sv_card(fr, es=None, num=None):
    im = Image.new("RGB", (W * SC, H * SC), SBG)
    d = ImageDraw.Draw(im)
    y = 560 * SC
    if num:
        y = text_block(d, num, font("sys", 120, bold=True), SGOLD, y - 140 * SC)
    y = text_block(d, fr, font("sys", 70, bold=True), SLIGHT, y + 20 * SC)
    if es:
        d.rectangle([(W / 2 - 60) * SC, y + 40 * SC, (W / 2 + 60) * SC, y + 46 * SC], fill=SGOLD)
        text_block(d, es, font("sys", 46), SGOLD, y + 90 * SC)
    sv_logo(d, SLIGHT)
    return im

def sv_photo(url, fr, es=None):
    im = Image.new("RGB", (W * SC, H * SC), SLIGHT)
    p = photo(url)
    box = (W - 120) * SC
    r = min(box / p.width, 900 * SC / p.height)
    p = p.resize((int(p.width * r), int(p.height * r)), Image.LANCZOS)
    im.paste(p, ((W * SC - p.width) // 2, 300 * SC + (900 * SC - p.height) // 2))
    d = ImageDraw.Draw(im)
    d.rectangle([0, 1260 * SC, W * SC, H * SC], fill=SBG)
    y = text_block(d, fr, font("sys", 56, bold=True), SLIGHT, 1310 * SC)
    if es:
        text_block(d, es, font("sys", 40), SGOLD, y + 20 * SC)
    sv_logo(d, SLIGHT)
    return im

SV = "https://www.solandvolt.com/wp-content/uploads/"

VIDEOS = {
    "fray-salle-de-bain": [
        (fray_card, ("Une salle de bain refaite à Palamós", "Les 4 étapes, en photos de nos chantiers.")),
        (fray_photo, (FR + "2026/11/sdb_avant_web.jpg", "AVANT", "Murs et sol mis à nu")),
        (fray_photo, (FR + "2026/04/20251218_165223-rotated.jpg", "1. Démolition", "Dépose complète, évacuation des gravats")),
        (fray_photo, (FR + "2026/04/20251212_174619-rotated.jpg", "2. Plomberie", "Arrivées et évacuations neuves")),
        (fray_photo, (FR + "2026/04/20260415_184822-rotated.jpg", "3. Électricité", "Gaines encastrées dans les murs")),
        (fray_photo, (FR + "2026/04/20251219_174348-rotated.jpg", "4. Carrelage", "Pose au croisillon, joints réguliers")),
        (fray_photo, (FR + "2026/11/sdb_apres_web.jpg", "APRÈS", "Douche à l'italienne, miroir LED")),
        (fray_card, ("Un seul interlocuteur, en français.", "Réponse sous 24 h.", "Envoyez 3 photos de votre salle de bain en message privé.")),
    ],
    "fray-toit-terrasse": [
        (fray_card, ("Toit-terrasse : l'étanchéité refaite", "Un chantier à Palamós, de l'avant à l'après.")),
        (fray_photo, (FR + "2026/04/20251125_151717-rotated.jpg", "AVANT", "Étanchéité usée, risque d'infiltration")),
        (fray_photo, (FR + "2026/04/20251125_143809-rotated.jpg", "PENDANT", "Nouvelle étanchéité bitumineuse")),
        (fray_photo, (FR + "2026/04/20251125_162210-1-rotated.jpg", "PENDANT", "Relevés et angles traités")),
        (fray_photo, (FR + "2026/04/20251125_162210-rotated.jpg", "APRÈS", "Terrasse étanche, vue sur Palamós")),
        (fray_card, ("Une tache au plafond ?", "Ne laissez pas passer l'hiver.", "Envoyez l'adresse et 3 photos en message privé. Réponse sous 24 h.")),
    ],
    "sv-combien-de-wh": [
        (sv_card, ("Coupure de courant : de combien de Wh avez-vous besoin ?", "Corte de luz: ¿cuántos Wh necesita?")),
        (sv_card, ("Box internet, 10 W en continu", "Router, 10 W continuo", "240 Wh")),
        (sv_card, ("Réfrigérateur, par jour", "Nevera, al día", "200 à 350 Wh")),
        (sv_card, ("Éclairage LED et recharges", "Iluminación LED y cargas", "220 Wh")),
        (sv_card, ("Total pour une journée", "Total para un día", "660 à 810 Wh")),
        (sv_photo, (SV + "2026/10/ECF0040_55689-scaled.jpg", "EcoFlow DELTA 3 : 1 024 Wh LiFePO4\n799 € TTC", "Envío a España peninsular: 3 a 5 días laborables")),
        (sv_card, ("Le calcul complet pour votre résidence secondaire : lien en bio.", "Guía completa: enlace en la bio.")),
    ],
    "sv-sok-206ah": [
        (sv_card, ("Une batterie pour le van, le bateau ou la maison isolée", "Una batería para la furgoneta, el barco o la casa aislada")),
        (sv_photo, (SV + "2026/10/sok-sk12v206h-batterie-lifepo4-12v-206ah-chauffante.webp", "SOK 12 V 206 Ah LiFePO4\n2 637 Wh", "Batería LiFePO4 12 V 206 Ah")),
        (sv_card, ("Chauffage intégré : la charge reprend au-dessus de 5 °C, même en hiver", "Calefacción integrada: la carga se reanuda por encima de 5 °C")),
        (sv_card, ("Bluetooth et BMS intégrés", "Bluetooth y BMS integrados")),
        (sv_card, ("585 € TTC\nGarantie 3 ans\nLivraison France et Espagne : 3 à 5 jours ouvrés", "585 € IVA incl. · Garantía 3 años · Envío 3 a 5 días laborables")),
        (sv_card, ("Fiche complète : lien en bio.", "Ficha completa: enlace en la bio.")),
    ],
}

DUR, FADE, FPS = 3.0, 0.4, 30

def render(name, scenes):
    tmp = os.path.join(OUT, "_" + name)
    os.makedirs(tmp, exist_ok=True)
    clips = []
    for i, (fn, args) in enumerate(scenes):
        png = os.path.join(tmp, "%02d.png" % i)
        fn(*args).save(png)
        clip = os.path.join(tmp, "%02d.mp4" % i)
        frames = int(DUR * FPS)
        # zoom lent de 1.00 à 1.06
        zp = "zoompan=z='1+0.06*on/%d':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=%d:s=%dx%d:fps=%d" % (frames, frames, W, H, FPS)
        subprocess.run([FF, "-y", "-loglevel", "error", "-loop", "1", "-i", png, "-vf", zp + ",format=yuv420p",
                        "-frames:v", str(frames), "-c:v", "libx264", "-crf", "20", clip], check=True)
        clips.append(clip)
    # enchaînement en fondu
    inputs, filt, last, off = [], [], "[0:v]", 0.0
    for c in clips:
        inputs += ["-i", c]
    for i in range(1, len(clips)):
        off += DUR - FADE
        lab = "[v%d]" % i
        filt.append("%s[%d:v]xfade=transition=fade:duration=%s:offset=%.2f%s" % (last, i, FADE, off, lab))
        last = lab
    total = DUR * len(clips) - FADE * (len(clips) - 1)
    out = os.path.join(OUT, name + ".mp4")
    subprocess.run([FF, "-y", "-loglevel", "error", *inputs,
                    "-f", "lavfi", "-t", "%.2f" % total, "-i", "anullsrc=r=44100:cl=stereo",
                    "-filter_complex", ";".join(filt), "-map", last, "-map", "%d:a" % len(clips),
                    "-c:v", "libx264", "-profile:v", "high", "-crf", "21", "-pix_fmt", "yuv420p", "-r", str(FPS),
                    "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", "-shortest", out], check=True)
    # vignette de couverture = première scène
    Image.open(os.path.join(tmp, "00.png")).resize((W, H), Image.LANCZOS).convert("RGB").save(os.path.join(OUT, name + "-couverture.jpg"), quality=90)
    print(out, "%.1f s" % total)

for name, scenes in VIDEOS.items():
    if not ONLY or name in ONLY:
        render(name, scenes)
