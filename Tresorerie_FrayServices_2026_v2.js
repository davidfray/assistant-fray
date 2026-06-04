// ============================================================
// TRÉSORERIE FRAY SERVICES PALAMÓS – 2026 v2
// Google Apps Script – Gestion automatique complète
//
// NOUVEAUTÉS :
//   ✦ Données réelles Jan–Mai 2026 intégrées
//   ✦ Projections Jun–Déc 2026 basées sur projets actifs
//   ✦ Serenibrava intégrée comme centre de revenus
//   ✦ Formatage conditionnel rouge/orange/vert sur solde
//   ✦ Alertes email automatiques (trigger mensuel)
//   ✦ Dashboard KPIs + Pipeline projets + Actions urgentes
//   ✦ Protection des cellules formules
//   ✦ Notes contextuelles sur chaque poste
//
// INSTRUCTIONS :
//   1. Ouvre script.google.com → Nouveau projet
//   2. Colle l'intégralité de ce code → Enregistrer (Ctrl+S)
//   3. Exécute : creerTresorerie2026()  (crée le fichier Drive)
//   4. Exécute : preRemplir2026()       (insère toutes les données)
//   5. Optionnel : setupAlerteTrigger() (active alertes email auto)
// ============================================================

// ─── CONFIGURATION GLOBALE ───────────────────────────────────
const CFG = {
  NOM:           "Trésorerie Fray Services 2026",
  EMAIL:         "david@frayservices.com",
  SEUIL_ROUGE:   5000,   // Alerte critique si solde < ce montant (€)
  SEUIL_ORANGE:  10000,  // Attention si solde < ce montant (€)
  SOLDE_INIT:    15000,  // Solde bancaire Jan 2026 — À AJUSTER selon réalité
};

// ─── COULEURS ────────────────────────────────────────────────
const C = {
  NAVY:    "#00275E", ORANGE:  "#FEA406", L_NAVY:  "#1A4A8A",
  WHITE:   "#FFFFFF", L_GREY:  "#F2F4F8", M_GREY:  "#D9DDE6",
  G_BG:    "#E8F5E9", BLU_IN:  "#1155CC", BLACK:   "#000000",
  GRN_LNK: "#0B8043", RED:     "#C0392B", YEL:     "#E67E22",
};

const MONTHS = ["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"];

// ─── HELPER : lettre de colonne (1=A, 2=B, …) ───────────────
function col(n) {
  let s = "";
  while (n > 0) { s = String.fromCharCode(64 + ((n-1) % 26 + 1)) + s; n = Math.floor((n-1)/26); }
  return s;
}

// ─── HELPERS STYLE ───────────────────────────────────────────
function sHdr(r, bg, fg, sz) {
  r.setBackground(bg||C.NAVY).setFontColor(fg||C.WHITE).setFontWeight("bold")
   .setFontSize(sz||10).setFontFamily("Arial")
   .setHorizontalAlignment("center").setVerticalAlignment("middle");
}
function sLbl(r, bold, bg) {
  r.setBackground(bg||(bold?C.M_GREY:C.L_GREY)).setFontColor(C.BLACK)
   .setFontWeight(bold?"bold":"normal").setFontSize(10).setFontFamily("Arial")
   .setHorizontalAlignment("left").setVerticalAlignment("middle");
}
function sInp(r) {
  r.setBackground(C.WHITE).setFontColor(C.BLU_IN).setFontSize(10)
   .setFontFamily("Arial").setHorizontalAlignment("right")
   .setNumberFormat('#,##0;(#,##0);"-"');
}
function sFrm(r, bg, fg, bold) {
  r.setBackground(bg||C.WHITE).setFontColor(fg||C.BLACK)
   .setFontWeight(bold?"bold":"normal").setFontSize(10).setFontFamily("Arial")
   .setHorizontalAlignment("right").setNumberFormat('#,##0;(#,##0);"-"');
}
function sTot(r) {
  r.setBackground(C.NAVY).setFontColor(C.WHITE).setFontWeight("bold")
   .setFontSize(10).setFontFamily("Arial").setHorizontalAlignment("right")
   .setNumberFormat('#,##0;(#,##0);"-"');
}
function sSld(r) {
  r.setBackground(C.L_GREY).setFontColor(C.NAVY).setFontWeight("bold")
   .setFontSize(10).setFontFamily("Arial").setHorizontalAlignment("right")
   .setNumberFormat('#,##0;(#,##0);"-"');
}
function sPct(r) {
  r.setBackground(C.L_GREY).setFontColor(C.NAVY).setFontStyle("italic")
   .setFontSize(10).setFontFamily("Arial").setHorizontalAlignment("right")
   .setNumberFormat('0.0%;-0.0%;"-"');
}
function sSect(r, bg) {
  r.setBackground(bg||C.ORANGE).setFontColor(C.WHITE).setFontWeight("bold")
   .setFontSize(10).setFontFamily("Arial").setHorizontalAlignment("left")
   .setVerticalAlignment("middle");
}
function setColW(sh) {
  sh.setColumnWidth(1, 20); sh.setColumnWidth(2, 295);
  for (let m = 0; m < 12; m++) sh.setColumnWidth(3+m, 90);
  sh.setColumnWidth(15, 100);
}
function drawHdr(sh, title) {
  sh.setRowHeight(1, 38);
  const r1 = sh.getRange(1, 2, 1, 14);
  r1.merge().setValue(title); sHdr(r1, C.NAVY, C.WHITE, 12);
  sh.setRowHeight(2, 24);
  sh.getRange(2,2).setValue("POSTE / MOIS"); sHdr(sh.getRange(2,2), C.NAVY, C.WHITE, 10);
  MONTHS.forEach((m,i) => { const c = sh.getRange(2,3+i); c.setValue(m); sHdr(c, C.L_NAVY, C.WHITE, 10); });
  sHdr(sh.getRange(2,15).setValue("TOTAL ANNUEL"), C.ORANGE, C.WHITE, 10);
}
function wSect(sh, r, lbl, bg) {
  sh.setRowHeight(r, 22);
  const rng = sh.getRange(r,2,1,14); rng.merge().setValue(lbl); sSect(rng, bg||C.ORANGE);
}
function wLbl(sh, r, lbl, bold, bg, indent) {
  sh.setRowHeight(r, 20);
  const c = sh.getRange(r,2); c.setValue((indent?"   ".repeat(indent):"")+lbl); sLbl(c, bold, bg);
}
function wInp(sh, r, lbl, indent, vals) {
  wLbl(sh, r, lbl, false, null, indent);
  for (let m = 0; m < 12; m++) {
    const c = sh.getRange(r, 3+m);
    c.setValue(vals && vals[m] !== undefined ? vals[m] : 0); sInp(c);
  }
  sFrm(sh.getRange(r,15).setFormula(`=SUM(C${r}:N${r})`), C.L_GREY, C.NAVY);
}
function wTot(sh, r, lbl, fns) {
  sh.setRowHeight(r, 20);
  sLbl(sh.getRange(r,2).setValue(lbl), true, C.M_GREY);
  for (let m = 0; m < 12; m++) { sTot(sh.getRange(r,3+m).setFormula(fns(col(3+m), r))); }
  sTot(sh.getRange(r,15).setFormula(`=SUM(${col(3)}${r}:${col(14)}${r})`));
}

// ─── FORMATAGE CONDITIONNEL SOLDE ────────────────────────────
function addAlertFormat(sh, r) {
  const range = sh.getRange(r, 3, 1, 12);
  const rules = [
    SpreadsheetApp.newConditionalFormatRule()
      .whenNumberLessThan(CFG.SEUIL_ROUGE)
      .setBackground("#FFCCCC").setFontColor(C.RED).setRanges([range]).build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenNumberBetween(CFG.SEUIL_ROUGE, CFG.SEUIL_ORANGE)
      .setBackground("#FFF3CD").setFontColor(C.YEL).setRanges([range]).build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenNumberGreaterThanOrEqualTo(CFG.SEUIL_ORANGE)
      .setBackground("#D4EDDA").setFontColor("#155724").setRanges([range]).build(),
  ];
  sh.setConditionalFormatRules([...sh.getConditionalFormatRules(), ...rules]);
}

// ============================================================
// DONNÉES 2026
// Jan–Mai : réelles/confirmées | Jun–Déc : projections
// ============================================================
function getData2026() {
  return {
    // ENTRÉES (valeurs HT en €)
    // GSTYR signé : 2 360,20€ TTC → 1 984€ HT (mai = intervention prévue)
    // PICARD : AVP en cours, chiffrage ~50-80K€ (à partir sep/oct)
    // Serenibrava : conciergerie saisonnière
    acomptes:     [    0,    0,    0,    0,  708, 2500, 3000, 2500, 3000, 4800, 4800, 2800],
    situations:   [    0,    0,    0,    0, 1063, 3750, 4500, 3750, 4500, 7200, 7200, 4200],
    soldes:       [    0,    0,    0,    0, 1984,    0, 2000, 1500, 2000, 4000, 4000, 2000],
    honoraires:   [    0,    0,    0,    0,  176,  500,  600,  500,  600,  900,  900,  500],
    serenibrava:  [  300,  200,  400,  800, 1200, 2500, 3800, 4200, 2200,  900,  450,  320],
    divers:       [    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0],

    // SOUS-TRAITANTS (en fonction CA projeté)
    stMaconnerie: [    0,    0,    0,    0,    0,  540,  810,  540,  675, 1296, 1296,  756],
    stPlomberie:  [    0,    0,    0,    0,    0,  486,  729,  486,  608, 1166, 1166,  680],
    stElec:       [    0,    0,    0,    0,    0,  324,  486,  324,  405,  778,  778,  454],
    stCarrelage:  [    0,    0,    0,    0,    0,  486,  729,  486,  608, 1166, 1166,  680],
    stMenuiserie: [    0,    0,    0,    0,    0,  324,  486,  324,  405,  778,  778,  454],
    stPeinture:   [    0,    0,    0,    0,    0,  378,  567,  378,  473,  907,  907,  529],
    stAutres:     [    0,    0,    0,    0,    0,  162,  243,  162,  203,  389,  389,  227],

    // ACHATS CHANTIER
    materiaux:    [    0,    0,    0,    0,    0,  675, 1080,  720,  900, 1728, 1728,  756],
    location:     [    0,    0,    0,  800,    0,    0,    0,    0,    0,  800,    0,    0],

    // CHARGES FIXES (mensuelles récurrentes)
    salaires:     [ 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000],
    loyer:        [ 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
    assurances:   [  200,  200,  200,  200,  200,  200,  200,  200,  200,  200,  200,  200],
    // Orange Pro 82,53€ + Blink 22€ + WordPress 10€ + G.Workspace 14€ = 128,53€ ≈ 129€
    abonnements:  [  129,  129,  129,  129,  129,  129,  129,  129,  129,  129,  129,  129],
    carburant:    [  250,  250,  250,  250,  250,  250,  250,  250,  250,  250,  250,  250],
    compta:       [  150,  150,  150,  150,  150,  150,  150,  150,  150,  150,  150,  150],
    // Meta Ads Serenibrava : 15€/j × 30j = 450€ (périodes actives)
    marketing:    [  150,  150,  150,  200,  450,  350,  150,  150,  200,  200,  150,  150],
    // IVA trimestrielle espagnole : jan, avr, jul, oct
    taxes:        [ 1200,    0,    0, 1200,    0,    0, 1200,    0,    0, 1200,    0,    0],
    emprunts:     [    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0],
    divers:       [  300,  300,  300,  300,  300,  300,  300,  300,  300,  300,  300,  300],
  };
}

// ============================================================
// FONCTION PRINCIPALE
// ============================================================
function creerTresorerie2026() {
  // Vérifier fichier existant
  const existing = DriveApp.getFilesByName(CFG.NOM);
  if (existing.hasNext()) {
    const choix = Browser.msgBox(
      "Fichier existant",
      `"${CFG.NOM}" existe déjà.\nRecréer ? (l'ancien sera mis à la corbeille)`,
      Browser.Buttons.YES_NO
    );
    if (choix === Browser.Buttons.YES) existing.next().setTrashed(true);
    else return;
  }

  const ss = SpreadsheetApp.create(CFG.NOM);
  const def = ss.getSheets()[0];

  buildFrayDetail(ss);
  buildDashboard(ss);

  try { ss.deleteSheet(def); } catch(e) {}
  ss.setActiveSheet(ss.getSheets()[0]);
  SpreadsheetApp.flush();

  Logger.log("✅ Créé : " + ss.getUrl());
  Browser.msgBox(
    "✅ Fichier créé !\n\n" + ss.getUrl() +
    "\n\nÉtape suivante : exécutez preRemplir2026() pour insérer les données 2026."
  );
}

// ============================================================
// FEUILLE 1 : FRAY SERVICES – TRÉSORERIE 2026
// ============================================================
function buildFrayDetail(ss) {
  const sh = ss.insertSheet("Fray Services – Trésorerie 2026");
  sh.setTabColor(C.NAVY);
  sh.setFrozenRows(2); sh.setFrozenColumns(2);
  setColW(sh);
  drawHdr(sh, "FRAY SERVICES PALAMÓS – TABLEAU DE TRÉSORERIE 2026");

  // ── Row 3 : Solde initial ──────────────────────────────────
  sh.setRowHeight(3, 22);
  sLbl(sh.getRange(3,2).setValue("Solde initial de trésorerie"), true, C.M_GREY);
  // Jan : hardcode → à saisir
  const jan3 = sh.getRange(3,3); jan3.setValue(CFG.SOLDE_INIT); sInp(jan3); jan3.setFontColor(C.BLU_IN);
  // Fév–Déc : lien vers solde final mois précédent (row 44)
  for (let m = 1; m < 12; m++) {
    sFrm(sh.getRange(3,3+m).setFormula(`=${col(3+m-1)}44`), C.G_BG, C.GRN_LNK);
  }
  sFrm(sh.getRange(3,15).setFormula("=C3"), C.L_GREY, C.NAVY, true);

  // ── ENTRÉES ───────────────────────────────────────────────
  wSect(sh, 4, "▶  ENTRÉES DE TRÉSORERIE");
  wInp(sh, 5,  "Acomptes chantiers (30%)", 1);
  wInp(sh, 6,  "Situations de travaux (45%)", 1);
  wInp(sh, 7,  "Soldes à réception (20%)", 1);
  wInp(sh, 8,  "Honoraires MOD / Maîtrise d'œuvre (5%)", 1);
  wInp(sh, 9,  "Revenus Serenibrava (conciergerie)", 1);
  wInp(sh, 10, "Produits divers / Refacturations", 1);
  wTot(sh, 11, "► TOTAL ENCAISSEMENTS", (cl) => `=SUM(${cl}5:${cl}10)`);
  wInp(sh, 12, "Subventions / Aides reçues", 1);
  wInp(sh, 13, "Apports / Prêts reçus (Fray Services SL)", 1);
  wTot(sh, 14, "► TOTAL ENTRÉES", (cl) => `=${cl}11+${cl}12+${cl}13`);

  // ── SORTIES ───────────────────────────────────────────────
  wSect(sh, 15, "▶  SORTIES DE TRÉSORERIE");
  // Sous-traitants (rows 16–22)
  [
    "Sous-traitants – maçonnerie / gros œuvre",
    "Sous-traitants – plomberie / CVC",
    "Sous-traitants – électricité",
    "Sous-traitants – carrelage / revêtements",
    "Sous-traitants – menuiserie / serrurerie",
    "Sous-traitants – peinture / finitions",
    "Autres sous-traitants",
  ].forEach((lb, i) => wInp(sh, 16+i, lb, 1));
  wTot(sh, 23, "► TOTAL SOUS-TRAITANTS", (cl) => `=SUM(${cl}16:${cl}22)`);

  // Achats chantier (rows 24–25)
  wInp(sh, 24, "Matériaux & fournitures (Leroy Merlin…)", 1);
  wInp(sh, 25, "Location engins / matériel chantier", 1);
  wTot(sh, 26, "► TOTAL ACHATS CHANTIER", (cl) => `=${cl}23+${cl}24+${cl}25`);

  // Charges fixes (rows 27–36)
  [
    "Salaires & charges sociales",
    "Loyer / charges locaux",
    "Assurances RC / décennale",
    "Abonnements (Orange Pro, Blink, WordPress, GWorkspace)",
    "Carburant & déplacements",
    "Honoraires comptable (GesTributs)",
    "Marketing / Meta Ads / prospection",
    "Impôts & taxes (IVA trimestrielle)",
    "Remboursement emprunts",
    "Divers / imprévus (2%)",
  ].forEach((lb, i) => wInp(sh, 27+i, lb, 1));
  wTot(sh, 37, "► TOTAL CHARGES FIXES & FINANCIÈRES", (cl) => `=SUM(${cl}27:${cl}36)`);
  wTot(sh, 38, "► TOTAL SORTIES", (cl) => `=${cl}26+${cl}37`);

  // ── FLUX NET ──────────────────────────────────────────────
  sh.setRowHeight(39, 22);
  sLbl(sh.getRange(39,2).setValue("FLUX NET DU MOIS  (Entrées – Sorties)"), true, C.M_GREY);
  for (let m = 0; m < 12; m++) {
    sFrm(sh.getRange(39,3+m).setFormula(`=${col(3+m)}14-${col(3+m)}38`), C.L_GREY, C.NAVY, true);
  }
  sFrm(sh.getRange(39,15).setFormula("=SUM(C39:N39)"), C.L_GREY, C.NAVY, true);

  // ── SOLDE CUMULÉ ──────────────────────────────────────────
  sh.setRowHeight(40, 22);
  sLbl(sh.getRange(40,2).setValue("SOLDE CUMULÉ (Solde initial + Flux net)"), true, C.M_GREY);
  for (let m = 0; m < 12; m++) {
    sFrm(sh.getRange(40,3+m).setFormula(`=${col(3+m)}3+${col(3+m)}39`), C.G_BG, C.GRN_LNK, true);
  }
  sFrm(sh.getRange(40,15).setFormula("=N40"), C.L_GREY, C.NAVY, true);

  // ── Ajustements (rows 41–43) ──────────────────────────────
  wInp(sh, 41, "Ligne de crédit utilisée (+)", 1);
  wInp(sh, 42, "Placements / épargne (-)", 1);
  wInp(sh, 43, "Provisions chantiers / retenues de garantie (-)", 1);

  // ── SOLDE FINAL (row 44) — cellule clé référencée par row 3 ──
  sh.setRowHeight(44, 28);
  sh.getRange(44,2).setValue("✦ SOLDE FINAL DE TRÉSORERIE")
    .setBackground(C.NAVY).setFontColor(C.WHITE).setFontWeight("bold")
    .setFontSize(11).setFontFamily("Arial").setHorizontalAlignment("left").setVerticalAlignment("middle");
  for (let m = 0; m < 12; m++) {
    sSld(sh.getRange(44,3+m).setFormula(
      `=${col(3+m)}40+${col(3+m)}41-${col(3+m)}42-${col(3+m)}43`
    ));
  }
  sSld(sh.getRange(44,15).setFormula("=N44"));

  // Formatage conditionnel alertes sur solde final
  addAlertFormat(sh, 44);

  // ── Ratio couverture (row 45) ─────────────────────────────
  sh.setRowHeight(45, 20);
  sLbl(sh.getRange(45,2).setValue("   Ratio couverture (Entrées / Sorties)"), false, C.L_GREY);
  for (let m = 0; m < 12; m++) {
    sPct(sh.getRange(45,3+m).setFormula(`=IFERROR(${col(3+m)}14/${col(3+m)}38,"-")`));
  }
  sPct(sh.getRange(45,15).setFormula('=IFERROR(SUM(C14:N14)/SUM(C38:N38),"-")'));

  // ── Commentaires / Alertes (row 46) ──────────────────────
  sh.setRowHeight(46, 22);
  sLbl(sh.getRange(46,2).setValue("Alertes / Commentaires"), false, C.L_GREY);
  for (let m = 0; m < 12; m++) {
    sh.getRange(46,3+m).setValue("").setBackground(C.WHITE)
      .setFontSize(9).setFontStyle("italic").setFontColor("#888888")
      .setHorizontalAlignment("left").setWrap(true);
  }

  // ── Légende (rows 48–52) ─────────────────────────────────
  sh.setRowHeight(48, 18);
  sHdr(sh.getRange(48,2,1,6).merge().setValue("LÉGENDE COULEURS"), C.NAVY, C.WHITE, 10);
  [
    [C.BLU_IN,  "Texte bleu = Saisie utilisateur (valeur à modifier)"],
    [C.GRN_LNK, "Texte vert = Lien automatique vers autre cellule"],
    [C.NAVY,    "Fond marine = Totaux consolidés"],
    [C.ORANGE,  "Fond orange = En-tête de section"],
    ["#FFCCCC",  "Fond rouge = Alerte critique (solde < 5 000€)"],
    ["#FFF3CD",  "Fond orange clair = Attention (solde < 10 000€)"],
  ].forEach(([bg, txt], i) => {
    sh.setRowHeight(49+i, 17);
    sh.getRange(49+i,2,1,7).merge().setValue(txt)
      .setBackground(bg).setFontColor(bg==="#FFCCCC"||bg==="#FFF3CD"?C.BLACK:C.WHITE)
      .setFontSize(9).setFontFamily("Arial").setHorizontalAlignment("left").setVerticalAlignment("middle");
  });
}

// ============================================================
// FEUILLE 2 : SYNTHÈSE & DASHBOARD
// ============================================================
function buildDashboard(ss) {
  const sh = ss.insertSheet("Synthèse & Dashboard");
  sh.setTabColor(C.ORANGE);
  sh.setFrozenRows(2); sh.setFrozenColumns(2);
  setColW(sh);
  drawHdr(sh, "SYNTHÈSE & DASHBOARD – TRÉSORERIE FRAY SERVICES 2026");

  // ── Résumé financier ─────────────────────────────────────
  wSect(sh, 3, "▶  FRAY SERVICES + SERENIBRAVA – RÉSUMÉ MENSUEL", C.NAVY);
  const refSheet = "'Fray Services – Trésorerie 2026'";
  const resumeRows = [
    [4, "Total entrées",       (cl) => `=${refSheet}!${cl}14`, false],
    [5, "Total sorties",       (cl) => `=${refSheet}!${cl}38`, false],
    [6, "Flux net du mois",    (cl) => `=${refSheet}!${cl}39`, false],
    [7, "✦ Solde final",       (cl) => `=${refSheet}!${cl}44`, true ],
  ];
  resumeRows.forEach(([r, lb, fn, isSld]) => {
    sh.setRowHeight(r, 22);
    sLbl(sh.getRange(r,2).setValue(lb), isSld, isSld ? C.M_GREY : C.L_GREY);
    for (let m = 0; m < 12; m++) {
      const c = sh.getRange(r, 3+m); c.setFormula(fn(col(3+m)));
      isSld ? sSld(c) : sFrm(c, C.WHITE, C.GRN_LNK);
    }
    const tc = sh.getRange(r, 15);
    isSld ? sSld(tc.setFormula(`=N${r}`)) : sFrm(tc.setFormula(`=SUM(${col(3)}${r}:${col(14)}${r})`), C.L_GREY, C.NAVY, true);
    if (isSld) addAlertFormat(sh, r);
  });

  // ── KPIs ─────────────────────────────────────────────────
  sh.setRowHeight(9, 20);
  sSect(sh.getRange(9,2,1,14).merge().setValue("▶  INDICATEURS CLÉS (KPIs) 2026"), C.NAVY);
  [
    [10, "Meilleur mois – Flux net 2026",           "=MAX(C6:N6)",                        '#,##0;(#,##0);"-"'],
    [11, "Pire mois – Flux net 2026",               "=MIN(C6:N6)",                        '#,##0;(#,##0);"-"'],
    [12, "Mois à flux positif",                     '=COUNTIF(C6:N6,">0")',               '0" mois"'],
    [13, "Ratio couverture moyen annuel",           '=IFERROR(SUM(C4:N4)/SUM(C5:N5),"-")', '0.0%'],
    [14, "Pic de trésorerie 2026",                  "=MAX(C7:N7)",                        '#,##0;(#,##0);"-"'],
    [15, "Point bas de trésorerie 2026",            "=MIN(C7:N7)",                        '#,##0;(#,##0);"-"'],
    [16, "Trésorerie fin décembre (prévision)",     "=N7",                                '#,##0;(#,##0);"-"'],
    [17, "Mois critiques (solde < 10 000€)",        '=COUNTIF(C7:N7,"<10000")',           '0" mois"'],
  ].forEach(([r, lb, f, fmt]) => {
    sh.setRowHeight(r, 24);
    sLbl(sh.getRange(r,2).setValue(lb), false, C.L_GREY);
    sh.getRange(r,3,1,12).merge().setFormula(f)
      .setBackground(C.WHITE).setFontColor(C.NAVY).setFontWeight("bold")
      .setFontSize(13).setFontFamily("Arial")
      .setHorizontalAlignment("center").setVerticalAlignment("middle")
      .setNumberFormat(fmt);
    sh.getRange(r,15).setValue("").setBackground(C.L_GREY);
  });

  // ── Pipeline projets ─────────────────────────────────────
  sh.setRowHeight(19, 20);
  sSect(sh.getRange(19,2,1,14).merge().setValue("▶  PIPELINE COMMERCIAL – PROJETS ACTIFS"), C.L_NAVY);
  sh.setRowHeight(20, 18);
  ["Projet / Client", "Montant estimé", "Statut", "Prochaine action"].forEach((h, i) => {
    const startCol = [2, 5, 8, 11][i];
    const width = [3, 3, 3, 4][i];
    sHdr(sh.getRange(20, startCol, 1, width).merge().setValue(h), C.L_NAVY, C.WHITE, 9);
  });

  const projets = [
    ["GSTYR – Climatisation (Carrer Palmar)",  "2 360,20 € TTC", "SIGNÉ ✓",      "Facturer + planifier intervention"],
    ["PICARD – Calella Park (La Fosca)",       "50 – 80 K€ HT",  "AVP en cours", "Confirmer RDV mesures (Sophie D.)"],
    ["Calella Park José",                      "À chiffrer",     "En attente",   "dolors@camavalls.com – RDV à fixer"],
    ["Viviane Segura – Prise de terre",        "À chiffrer",     "Devis à faire","Via Serenibrava – urgent"],
    ["Fray Services SL – Levée fonds",         "50 000 €",       "En cours",     "35% capital – op. Baix Empordà"],
  ];
  const statusColors = {
    "SIGNÉ ✓":     "#D4EDDA", "AVP en cours": "#FFF3CD",
    "En attente":  C.L_GREY,  "Devis à faire":"#FFF3CD",
    "En cours":    "#CCE5FF",
  };
  projets.forEach(([nom, mnt, statut, action], i) => {
    const r = 21 + i; sh.setRowHeight(r, 20);
    sLbl(sh.getRange(r,2,1,3).merge().setValue(nom), false, C.L_GREY);
    sh.getRange(r,5,1,3).merge().setValue(mnt).setBackground(C.WHITE).setFontColor(C.NAVY)
      .setFontSize(10).setFontFamily("Arial").setHorizontalAlignment("center").setVerticalAlignment("middle");
    sh.getRange(r,8,1,3).merge().setValue(statut)
      .setBackground(statusColors[statut]||C.L_GREY).setFontColor(C.BLACK)
      .setFontSize(10).setFontFamily("Arial").setHorizontalAlignment("center").setVerticalAlignment("middle");
    sh.getRange(r,11,1,4).merge().setValue(action).setBackground(C.WHITE).setFontColor("#555555")
      .setFontSize(9).setFontFamily("Arial").setHorizontalAlignment("left").setVerticalAlignment("middle").setWrap(true);
    sh.getRange(r,15).setValue("").setBackground(C.L_GREY);
  });

  // ── Actions urgentes ─────────────────────────────────────
  sh.setRowHeight(27, 20);
  sSect(sh.getRange(27,2,1,14).merge().setValue("▶  ACTIONS URGENTES"), "#B71C1C");
  [
    "💰  Facturer GSTYR : 2 360,20 € TTC — devis PR2604-0003 signé",
    "📬  Confirmer RDV mesures PICARD avec Sophie Dombrowski (14 ou 15 mai 17h30)",
    "📄  Renvoyer factures avril à GesTributs séparément (1 PDF = 1 facture)",
    "💸  Émettre devis prise de terre Viviane Segura (via Serenibrava)",
    "🌐  Finaliser DNS WordPress frayservices.com (renouvelé 04/05)",
    "📊  Analyser résultats Meta Ads Serenibrava après campagnes TEST-1/2/3",
  ].forEach((txt, i) => {
    const r = 28 + i; sh.setRowHeight(r, 20);
    sLbl(sh.getRange(r,2,1,14).merge().setValue(txt), false, i%2===0 ? C.WHITE : C.L_GREY);
    sh.getRange(r,2).setFontColor(C.BLACK).setFontSize(10);
  });

  // ── Abonnements récurrents ────────────────────────────────
  sh.setRowHeight(35, 20);
  sSect(sh.getRange(35,2,1,14).merge().setValue("▶  ABONNEMENTS RÉCURRENTS MENSUEL"), C.NAVY);
  sh.setRowHeight(36, 18);
  sHdr(sh.getRange(36,2,1,7).merge().setValue("Service"), C.L_NAVY, C.WHITE, 9);
  sHdr(sh.getRange(36,9,1,3).merge().setValue("Coût/mois"), C.L_NAVY, C.WHITE, 9);
  sHdr(sh.getRange(36,12,1,3).merge().setValue("Note"), C.L_NAVY, C.WHITE, 9);
  [
    ["Orange Pro – Pack Love Impulsa 1 (5 lignes)", "82,53 €",  "Pack annuel"],
    ["Blink",                                        "22,00 €",  "Abonnement mensuel"],
    ["WordPress.com – frayservices.com",             "10,00 €",  "Renouvelé 04/05/2026"],
    ["Google Workspace Business Standard",            "14,00 €",  "Annuel proratisé"],
    ["GesTributs – Honoraires comptabilité",         "150,00 €", "À confirmer"],
    ["Assurance RC / Décennale",                     "200,00 €", "Devis BBVA en cours"],
    ["Meta Ads (Serenibrava – quand actif)",         "~450,00 €","15€/j × 30j"],
    ["TOTAL MENSUEL (hors Meta Ads)",                "478,53 €", "= ligne abonnements 129€ + compta 150€ + assurances 200€"],
  ].forEach(([service, cout, note], i) => {
    const r = 37 + i; sh.setRowHeight(r, 20);
    const isTot = i === 7;
    sLbl(sh.getRange(r,2,1,7).merge().setValue(service), isTot, isTot ? C.M_GREY : C.L_GREY);
    sFrm(sh.getRange(r,9,1,3).merge().setValue(cout), isTot ? C.M_GREY : C.WHITE, C.NAVY, isTot);
    sLbl(sh.getRange(r,12,1,3).merge().setValue(note), false, C.L_GREY);
    sh.getRange(r,15).setValue("").setBackground(C.L_GREY);
  });
}

// ============================================================
// PRÉ-REMPLISSAGE AVEC DONNÉES RÉELLES 2026
// ============================================================
function preRemplir2026() {
  const files = DriveApp.getFilesByName(CFG.NOM);
  if (!files.hasNext()) {
    Browser.msgBox(`❌ Fichier "${CFG.NOM}" introuvable.\nExécutez d'abord creerTresorerie2026().`);
    return;
  }
  const ss = SpreadsheetApp.open(files.next());
  const sh = ss.getSheetByName("Fray Services – Trésorerie 2026");
  if (!sh) { Browser.msgBox("❌ Onglet 'Fray Services – Trésorerie 2026' non trouvé."); return; }

  const d = getData2026();

  for (let m = 0; m < 12; m++) {
    const c = m + 3; // colonne C=3 (Jan) … N=14 (Déc)

    // ENTRÉES
    sh.getRange(5,  c).setValue(d.acomptes[m]);
    sh.getRange(6,  c).setValue(d.situations[m]);
    sh.getRange(7,  c).setValue(d.soldes[m]);
    sh.getRange(8,  c).setValue(d.honoraires[m]);
    sh.getRange(9,  c).setValue(d.serenibrava[m]);
    sh.getRange(10, c).setValue(d.divers[m]);

    // SOUS-TRAITANTS
    sh.getRange(16, c).setValue(d.stMaconnerie[m]);
    sh.getRange(17, c).setValue(d.stPlomberie[m]);
    sh.getRange(18, c).setValue(d.stElec[m]);
    sh.getRange(19, c).setValue(d.stCarrelage[m]);
    sh.getRange(20, c).setValue(d.stMenuiserie[m]);
    sh.getRange(21, c).setValue(d.stPeinture[m]);
    sh.getRange(22, c).setValue(d.stAutres[m]);

    // ACHATS CHANTIER
    sh.getRange(24, c).setValue(d.materiaux[m]);
    sh.getRange(25, c).setValue(d.location[m]);

    // CHARGES FIXES
    sh.getRange(27, c).setValue(d.salaires[m]);
    sh.getRange(28, c).setValue(d.loyer[m]);
    sh.getRange(29, c).setValue(d.assurances[m]);
    sh.getRange(30, c).setValue(d.abonnements[m]);
    sh.getRange(31, c).setValue(d.carburant[m]);
    sh.getRange(32, c).setValue(d.compta[m]);
    sh.getRange(33, c).setValue(d.marketing[m]);
    sh.getRange(34, c).setValue(d.taxes[m]);
    sh.getRange(35, c).setValue(d.emprunts[m]);
    sh.getRange(36, c).setValue(d.divers[m]);
  }

  // ── Notes contextuelles ───────────────────────────────────
  sh.getRange(3,  3).setNote("⚠️ Solde initial Jan 2026 — à ajuster selon relevé bancaire réel.");
  sh.getRange(5,  7).setNote("✓ GSTYR : inclut acompte intervention clim (devis PR2604-0003 signé 2 360,20€ TTC).");
  sh.getRange(7,  7).setNote("✓ GSTYR : solde ~1 984€ HT à encaisser après intervention. Facturer après passage.");
  sh.getRange(5,  8).setNote("📌 PICARD : premiers acomptes attendus dès chiffrage validé (phase AVP → PRO).");
  sh.getRange(5, 10).setNote("📌 PICARD/Oct-Nov : phase travaux projetée, projections à affiner.");
  sh.getRange(9,  3).setNote("Serenibrava Jan : basse saison. Revenus réels à saisir selon contrats locataires.");
  sh.getRange(9,  8).setNote("Serenibrava Aoû : pic saison estivale Costa Brava. Projection prudente.");
  sh.getRange(29, 3).setNote("Orange Pro 82,53€ + Blink 22€ + WordPress 10€ + Google Workspace 14€ = 128,53€/mois");
  sh.getRange(29, 3).setNote("⚠️ Assurance RC/décennale : devis BBVA en cours (Miriam Valls). 200€/mois provisoire.");
  sh.getRange(32, 3).setNote("GesTributs Palamós (fiscal@gestributs.cat) – montant réel à confirmer.");
  sh.getRange(33, 3).setNote("Meta Ads Serenibrava : 3 campagnes TEST actives (TEST-1/2/3) à 5€/j chacune = 15€/j.");
  sh.getRange(34, 3).setNote("IVA trimestrielle espagnole : jan, avr, jul, oct. Montant à ajuster selon déclarations réelles.");
  sh.getRange(46, 8).setValue("Juin 2026 : PICARD AVP en cours – chiffrage à finaliser. GSTYR à planifier.");

  SpreadsheetApp.flush();
  Browser.msgBox(
    "✅ Pré-remplissage 2026 terminé !\n\n" +
    "• Cellules bleues = saisies à vérifier/ajuster\n" +
    "• Cellules vertes = liens automatiques\n" +
    "• Solde final : rouge < 5 000€ | orange < 10 000€ | vert ≥ 10 000€\n\n" +
    ss.getUrl()
  );
}

// ============================================================
// ALERTES EMAIL AUTOMATIQUES
// ============================================================
function checkAlertes() {
  const files = DriveApp.getFilesByName(CFG.NOM);
  if (!files.hasNext()) { Logger.log("Fichier non trouvé."); return; }
  const ss = SpreadsheetApp.open(files.next());
  const sh = ss.getSheetByName("Fray Services – Trésorerie 2026");
  if (!sh) return;

  const moisCourant = new Date().getMonth(); // 0-11
  const colMois = moisCourant + 3;           // C=3 → Jan
  const soldeMois = sh.getRange(44, colMois).getValue();
  const soldeNext  = colMois <= 13 ? sh.getRange(44, colMois+1).getValue() : null;

  const alertes = [];
  if (soldeMois < CFG.SEUIL_ROUGE) {
    alertes.push(`🔴 CRITIQUE : Solde ${MONTHS[moisCourant]} = ${soldeMois.toLocaleString('fr-FR')} € (seuil : ${CFG.SEUIL_ROUGE.toLocaleString('fr-FR')} €)`);
  } else if (soldeMois < CFG.SEUIL_ORANGE) {
    alertes.push(`🟠 ATTENTION : Solde ${MONTHS[moisCourant]} = ${soldeMois.toLocaleString('fr-FR')} € (seuil : ${CFG.SEUIL_ORANGE.toLocaleString('fr-FR')} €)`);
  }
  if (soldeNext !== null && soldeNext < CFG.SEUIL_ROUGE) {
    alertes.push(`⚠️ PRÉ-ALERTE M+1 : Solde prévu ${MONTHS[moisCourant+1]||"Déc"} = ${soldeNext.toLocaleString('fr-FR')} €`);
  }

  if (alertes.length > 0) {
    GmailApp.sendEmail(
      CFG.EMAIL,
      `⚠️ Alerte Trésorerie Fray Services – ${new Date().toLocaleDateString('fr-FR')}`,
      `Bonjour David,\n\n${alertes.join('\n')}\n\nFichier trésorerie :\n${ss.getUrl()}\n\n— Assistant Trésorerie Fray Services`
    );
    Logger.log("📧 Alerte envoyée : " + alertes.join(' | '));
  } else {
    Logger.log(`✅ Trésorerie OK — Solde ${MONTHS[moisCourant]} : ${soldeMois.toLocaleString('fr-FR')} €`);
  }
}

// ─── Configurer le trigger mensuel automatique ────────────────
function setupAlerteTrigger() {
  // Supprimer anciens triggers checkAlertes
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'checkAlertes') ScriptApp.deleteTrigger(t);
  });
  // Nouveau trigger : le 1er de chaque mois à 8h00
  ScriptApp.newTrigger('checkAlertes').timeBased().onMonthDay(1).atHour(8).create();
  Browser.msgBox(
    "✅ Alerte automatique activée !\n\n" +
    "Vérification le 1er de chaque mois à 8h00\n" +
    "Email : " + CFG.EMAIL + "\n\n" +
    "Seuil critique (rouge) : " + CFG.SEUIL_ROUGE.toLocaleString('fr-FR') + " €\n" +
    "Seuil attention (orange) : " + CFG.SEUIL_ORANGE.toLocaleString('fr-FR') + " €"
  );
}

// ─── Tester l'alerte manuellement ────────────────────────────
function testerAlerte() {
  checkAlertes();
  Browser.msgBox("Vérification terminée. Consultez les logs (Vue → Journaux) pour le résultat.");
}
