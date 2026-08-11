/**
 * Fray Services — Marquage automatique factures payées / encaissées
 * Web App appelable depuis n8n, Make, ou manuellement via le menu du sheet
 *
 * Sheet cible : "Tresorerie Fray services"
 * ID : 1k40WA42h5vmKeVTA2rfPZ23DCeHSiOx20aZUv7ffjAI
 *
 * DÉPLOIEMENT :
 *   1. Extensions → Apps Script → coller ce code
 *   2. Déployer → Nouvelle version → Web App
 *      - Exécuter en tant que : Moi (david@frayservices.com)
 *      - Accès : Toute personne (pour que n8n puisse appeler sans OAuth)
 *   3. Copier l'URL de déploiement → la coller dans le nœud HTTP de n8n
 */

const SHEET_ID   = '1k40WA42h5vmKeVTA2rfPZ23DCeHSiOx20aZUv7ffjAI';
const TAB_SAISIES = 'SAISIES';

// ─── Colonnes (0-indexé, basé sur l'en-tête réel) ─────────────────────────
const COL = {
  ID         : 0,
  DATE_FACT  : 1,
  DATE_REC   : 2,
  FOURNISSEUR: 3,
  REFERENCE  : 4,
  HT         : 5,
  TVA        : 6,
  TTC        : 7,
  CATEGORIE  : 8,
  TYPE       : 9,
  MOIS       : 10,
  ANNEE      : 11,
  SOURCE     : 12,
  CONFIANCE  : 13,
  COMMENTAIRE: 14,
  STATUT     : 15,
  _STATUS    : 16,
  ROWS_CHECK : 17,
  PAYE       : 18,   // ← colonne S
};

// ─── Fonction principale ───────────────────────────────────────────────────
/**
 * @param {string[]} refs  - liste de références à marquer (ex: ["FA2605-0003","AV2605-0001"])
 *                           Si vide → marque TOUTES les lignes sans "Payé"
 * @param {string}   valeur - valeur à écrire dans Payé (défaut: "Oui")
 * @returns {{updated: number, skipped: number, rows: string[]}}
 */
function marquerPayees(refs, valeur) {
  valeur = valeur || 'Oui';
  refs   = refs   || [];

  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sh = ss.getSheetByName(TAB_SAISIES);
  if (!sh) throw new Error('Onglet "' + TAB_SAISIES + '" introuvable dans le sheet.');

  const lastRow  = sh.getLastRow();
  if (lastRow < 2) return { updated: 0, skipped: 0, rows: [] };

  const range    = sh.getRange(2, 1, lastRow - 1, COL.PAYE + 1);
  const data     = range.getValues();
  const payeCol  = sh.getRange(2, COL.PAYE + 1, lastRow - 1, 1);
  const payeVals = payeCol.getValues();

  const updated  = [];
  const skipped  = [];

  data.forEach(function(row, i) {
    const ref      = String(row[COL.REFERENCE] || '').trim();
    const current  = String(payeVals[i][0]     || '').trim().toLowerCase();
    const dejaPaye = (current === 'oui' || current === 'yes');

    if (dejaPaye) { skipped.push(ref); return; }

    // Si une liste de refs est fournie, ne traiter que celles-ci
    if (refs.length > 0 && !refs.includes(ref)) return;

    payeVals[i][0] = valeur;
    updated.push(ref + ' (' + String(row[COL.FOURNISSEUR] || '').trim() + ')');
  });

  // Écriture groupée (1 seul appel API → rapide)
  payeCol.setValues(payeVals);
  SpreadsheetApp.flush();

  return { updated: updated.length, skipped: skipped.length, rows: updated };
}

// ─── Endpoint n8n : POST ──────────────────────────────────────────────────
/**
 * Appel n8n → nœud HTTP Request :
 *   URL    : <url-deploiement>
 *   Method : POST
 *   Body   : { "refs": ["FA2605-0003","AV2605-0001"], "valeur": "Oui" }
 *            (refs vide = tout marquer)
 */
function doPost(e) {
  try {
    const body   = e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};
    const refs   = Array.isArray(body.refs)   ? body.refs   : [];
    const valeur = body.valeur || 'Oui';
    const result = marquerPayees(refs, valeur);
    return _json({ success: true,  ...result });
  } catch (err) {
    return _json({ success: false, error: err.message });
  }
}

// ─── Endpoint GET (test rapide dans le navigateur) ─────────────────────────
/**
 * Exemple : <url>?refs=FA2605-0003,AV2605-0001
 *           <url>              ← marque tout
 */
function doGet(e) {
  try {
    const refs   = e.parameter.refs ? e.parameter.refs.split(',').map(r => r.trim()) : [];
    const valeur = e.parameter.valeur || 'Oui';
    const result = marquerPayees(refs, valeur);
    return _json({ success: true, ...result });
  } catch (err) {
    return _json({ success: false, error: err.message });
  }
}

// ─── Menu dans le sheet ────────────────────────────────────────────────────
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('⚡ Trésorerie')
    .addItem('✅ Marquer TOUTES les factures Payé', 'menuToutPayees')
    .addSeparator()
    .addItem('🔵 Marquer FA + AV comme Encaissé', 'menuEncaisserFaAv')
    .addToUi();
}

function menuToutPayees() {
  const r = marquerPayees([], 'Oui');
  SpreadsheetApp.getUi().alert('✅ ' + r.updated + ' facture(s) marquée(s) Payé = Oui\n(' + r.skipped + ' déjà payées ignorées)');
}

function menuEncaisserFaAv() {
  // Marque spécifiquement les lignes dont la référence commence par FA ou AV
  const ss     = SpreadsheetApp.openById(SHEET_ID);
  const sh     = ss.getSheetByName(TAB_SAISIES);
  const data   = sh.getRange(2, COL.REFERENCE + 1, sh.getLastRow() - 1, 1).getValues();
  const refsFA = data.map(r => String(r[0]).trim()).filter(r => /^(FA|AV)/i.test(r));
  const r      = marquerPayees(refsFA, 'Oui');
  SpreadsheetApp.getUi().alert('🔵 ' + r.updated + ' FA/AV encaissée(s)\n(' + r.skipped + ' déjà marquées)');
}

// ─── Helper ───────────────────────────────────────────────────────────────
function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
