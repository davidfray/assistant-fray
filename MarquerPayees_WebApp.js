/**
 * Fray Services — Marquage automatique factures payées / encaissées
 *
 * Sheet cible : "Tresorerie Fray services"
 * ID : 1k40WA42h5vmKeVTA2rfPZ23DCeHSiOx20aZUv7ffjAI
 *
 * DÉPLOIEMENT INITIAL (1 seule fois) :
 *   1. Ouvrir le sheet → Extensions → Apps Script
 *   2. Effacer tout → Coller ce code → Enregistrer (Ctrl+S)
 *   3. Exécuter menuToutPayees  → accepter les permissions → factures marquées
 *   4. Exécuter installTrigger  → automation quotidienne installée
 */

var SHEET_ID    = '1k40WA42h5vmKeVTA2rfPZ23DCeHSiOx20aZUv7ffjAI';
var TAB_SAISIES = 'SAISIES';
var TRIGGER_FN  = 'marquerToutPayees_auto';

var COL_REFERENCE  = 4;   // colonne E
var COL_FOURNISSEUR = 3;  // colonne D
var COL_PAYE       = 18;  // colonne S

// ─── Trigger automatique ───────────────────────────────────────────────────
function installTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === TRIGGER_FN) {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  ScriptApp.newTrigger(TRIGGER_FN)
    .timeBased()
    .everyDays(1)
    .atHour(23)
    .create();
  SpreadsheetApp.getUi().alert(
    'Trigger installe !\n\nmarquerToutPayees_auto() tournera chaque soir a 23h automatiquement.'
  );
}

function desinstallTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === TRIGGER_FN) {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  SpreadsheetApp.getUi().alert('Trigger supprime.');
}

function marquerToutPayees_auto() {
  marquerPayees([], 'Oui');
}

// ─── Fonction principale ───────────────────────────────────────────────────
function marquerPayees(refs, valeur) {
  if (!valeur) valeur = 'Oui';
  if (!refs)   refs   = [];

  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sh = ss.getSheetByName(TAB_SAISIES);
  if (!sh) throw new Error('Onglet SAISIES introuvable.');

  var lastRow = sh.getLastRow();
  if (lastRow < 2) return { updated: 0, skipped: 0, rows: [] };

  var data     = sh.getRange(2, 1, lastRow - 1, COL_PAYE + 1).getValues();
  var payeCol  = sh.getRange(2, COL_PAYE + 1, lastRow - 1, 1);
  var payeVals = payeCol.getValues();

  var updated = [];
  var skipped = [];

  for (var i = 0; i < data.length; i++) {
    var row     = data[i];
    var ref     = String(row[COL_REFERENCE]   || '').trim();
    var current = String(payeVals[i][0]       || '').trim().toLowerCase();

    if (current === 'oui' || current === 'yes') {
      skipped.push(ref);
      continue;
    }

    if (refs.length > 0) {
      var found = false;
      for (var j = 0; j < refs.length; j++) {
        if (refs[j] === ref) { found = true; break; }
      }
      if (!found) continue;
    }

    payeVals[i][0] = valeur;
    updated.push(ref + ' (' + String(row[COL_FOURNISSEUR] || '').trim() + ')');
  }

  payeCol.setValues(payeVals);
  SpreadsheetApp.flush();

  return { updated: updated.length, skipped: skipped.length, rows: updated };
}

// ─── Menu dans le sheet ────────────────────────────────────────────────────
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Tresorerie')
    .addItem('Marquer TOUTES les factures Paye', 'menuToutPayees')
    .addSeparator()
    .addItem('Marquer FA + AV comme Encaisse', 'menuEncaisserFaAv')
    .addSeparator()
    .addItem('Installer trigger automatique', 'installTrigger')
    .addItem('Supprimer trigger automatique', 'desinstallTrigger')
    .addToUi();
}

function menuToutPayees() {
  var r = marquerPayees([], 'Oui');
  SpreadsheetApp.getUi().alert(
    r.updated + ' facture(s) marquee(s) Paye = Oui\n(' + r.skipped + ' deja payees ignorees)'
  );
}

function menuEncaisserFaAv() {
  var ss   = SpreadsheetApp.openById(SHEET_ID);
  var sh   = ss.getSheetByName(TAB_SAISIES);
  var data = sh.getRange(2, COL_REFERENCE + 1, sh.getLastRow() - 1, 1).getValues();
  var refs = [];
  for (var i = 0; i < data.length; i++) {
    var ref = String(data[i][0]).trim();
    if (/^(FA|AV)/i.test(ref)) refs.push(ref);
  }
  var r = marquerPayees(refs, 'Oui');
  SpreadsheetApp.getUi().alert(
    r.updated + ' FA/AV encaissee(s)\n(' + r.skipped + ' deja marquees)'
  );
}

// ─── Endpoints Web App ─────────────────────────────────────────────────────
function doPost(e) {
  try {
    var body   = (e.postData && e.postData.contents) ? JSON.parse(e.postData.contents) : {};
    var refs   = Array.isArray(body.refs) ? body.refs : [];
    var valeur = body.valeur || 'Oui';
    var result = marquerPayees(refs, valeur);
    return _json({ success: true, updated: result.updated, skipped: result.skipped, rows: result.rows });
  } catch (err) {
    return _json({ success: false, error: err.message });
  }
}

function doGet(e) {
  try {
    var refsParam = e.parameter.refs ? e.parameter.refs.split(',') : [];
    var refs = [];
    for (var i = 0; i < refsParam.length; i++) refs.push(refsParam[i].trim());
    var valeur = e.parameter.valeur || 'Oui';
    var result = marquerPayees(refs, valeur);
    return _json({ success: true, updated: result.updated, skipped: result.skipped, rows: result.rows });
  } catch (err) {
    return _json({ success: false, error: err.message });
  }
}

function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
