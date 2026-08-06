// =========================================================================
// RODINNÁ HRA - VERZIA 7.3.0 (1. ČASŤ: REGISTRE A HLAVNÁ MATEMATIKA)
// =========================================================================
(function() {
    function cyklusHash(str) {
        var hash = 0;
        if (str.length === 0) return hash;
        for (var i = 0; i < str.length; i++) {
            var chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; 
        }
        return hash;
    }

    // V kóde je iba tento matematický odtlačok. Textový originál tu nikde nie je.
    var TAJNY_HASH_HESLA = 356075196; 
    
    var zadaneHeslo = prompt("🔒 Vstup do kráľovstva zakázaný!\nZadaj tajné rodinné prístupové heslo:");
    
    if (!zadaneHeslo || cyklusHash(zadaneHeslo) !== TAJNY_HASH_HESLA) {
        alert("❌ Nesprávne heslo! Prístup bol trvalo zablokovaný.");
        document.body.innerHTML = "<div style='display:flex; justify-content:center; align-items:center; height:100vh; background:#111; color:#ff4d4d; font-family:sans-serif; font-size:1.5em; font-weight:bold;'>🔒 Prístup odmietnutý. Stránka je chránená rodinným zámkom.</div>";
        throw new Error("Zastavenie načítavania: Neautorizovaný prístup.");
    }
})();

var VERZIA = "7.3.0";

var MASTER_REGISTRY = {
    "Michal": { row: 1, p: 4 }, "Erik": { row: 1, p: 3 }, "Marek": { row: 1, p: 4 },
    "Duri": { row: 1, p: 6 }, "Doktor": { row: 1, p: 4 }, "Krcmar Boris": { row: 1, p: 5 }, 
    "Neviditelny Mario": { row: 1, p: 4 }, "Martin": { row: 1, p: 4 }, "Tymko": { row: 1, p: 1 }, "Jaro": { row: 1, p: 5 },
    "Oli": { row: 2, p: 8 }, "Sisa": { row: 2, p: 4 }, "Katy": { row: 2, p: 6 }, "Nela": { row: 2, p: 1 }, 
    "Lula": { row: 2, p: 4 }, "Anka": { row: 2, p: 7 }, "Darinka": { row: 2, p: 5 }, "Viera": { row: 2, p: 6 }, "Sestricka": { row: 2, p: 3 },
    "Kika": { row: 2, p: 3, isSpy: true }, "Zvedava suseda": { row: 2, p: 7, isSpy: true },
    "Grobske Mravce 1": { row: 3, p: 1 }, "Grobske Mravce 2": { row: 3, p: 1 }, "Grobske Mravce 3": { row: 3, p: 1 },
    "Petrzalske holuby 1": { row: 3, p: 1 }, "Petrzalske holuby 2": { row: 3, p: 1 }, "Petrzalske holuby 3": { row: 3, p: 1 },
    "Kabelkovy pes": { row: 3, p: 3 }, "Patkaňe": { row: 2, p: 2 }, "Sviňa lesná": { row: 3, p: 4 },
    "Zatúlaný tatranský medved": { row: 3, p: 5 }, "Pouličný mačiak": { row: 3, p: 3 }, "Komare": { row: 3, p: 3 },
    "Alcohol": { row: 1, p: 0 }, "Kvety": { row: 2, p: 0 }, "Medove Orechy": { row: 3, p: 0 },
    "Musíme sa porozprávať": { row: 0, p: 0 }, "Upokoj sa": { row: 0, p: 0 }, "Ohnostroj": { row: 0, p: 0 }, "Šicko v porádku": { row: 0, p: 0 }
};

var p1_played_cards = [], p2_played_cards = [];
var p1_erik_buff_row = null, p2_erik_buff_row = null;
var sc1 = 0, sc2 = 0, r1 = 0, r2 = 0, p1Pass = false, p2Pass = false, aktualnyHrac = 1, hracCakajuciNaAkciu = 0, blokujVykladanie = false;
var p1_full_deck = [], p2_full_deck = [], p1_draft_hand = [], p2_draft_hand = [];
var p1_used_mulligan = false, p2_used_mulligan = false, p1_confirmed_mulligan = false, p2_confirmed_mulligan = false;
var draft_faza = true; var p1_spalene = [], p2_spalene = [], neutralne_vplyvy = [];
var jeSingleplayer = false; var obtiaznostAI = "B"; var inventar = { mince: 500, karty: {}, zostava: [] };

function prepniSekciuVizualne(idSekcie) {
    if (!draft_faza && (p1_played_cards.length > 0 || p2_played_cards.length > 0 || p1_draft_hand.length > 0)) { alert("Uprostred zápasu nemôžeš opustiť bojové pole!"); return; }
    document.querySelectorAll('.sekcia-obsah').forEach(function(el) { el.classList.add('schovana-sekcia'); });
    document.querySelectorAll('.menu-tab').forEach(function(el) { el.classList.remove('aktivna-tab'); });
    var ciel = document.getElementById(idSekcie); if (ciel) ciel.classList.remove('schovana-sekcia');
    if (idSekcie === 'sekcia-hra') document.getElementById('menu-btn-hra').classList.add('aktivna-tab');
    if (idSekcie === 'sekcia-zostava') document.getElementById('menu-btn-zostava').classList.add('aktivna-tab');
    if (idSekcie === 'sekcia-dielna') document.getElementById('menu-btn-dielna').classList.add('aktivna-tab');
    if (idSekcie === 'sekcia-trhovisko') document.getElementById('menu-btn-trhovisko').classList.add('aktivna-tab');
}

function aktualizujStavZamkuMenu() {
    var menuEl = document.getElementById('hlavne-menu'); if (!menuEl) return;
    if (!draft_faza) { menuEl.classList.add('zamknute-menu'); } else { menuEl.classList.remove('zamknute-menu'); }
}

function countMravce(pole) { var c = 0; if (!pole) return 0; for (var i = 0; i < pole.length; i++) { if (pole[i] && pole[i].n.indexOf('Grobske Mravce') !== -1) c++; } return c; }
function countHoluby(pole) { var c = 0; if (!pole) return 0; for (var i = 0; i < pole.length; i++) { if (pole[i] && pole[i].n.indexOf('Petrzalske holuby') !== -1) c++; } return c; }
function zratajRad(pole, rowNum) { var s = 0; for (var i = 0; i < pole.length; i++) { if (pole[i] && pole[i].row === rowNum && pole[i].livePwr !== "none") s += pole[i].livePwr; } return s; }

function aktualizujArchivyVizualne() {
    var e1 = document.getElementById('zoznam-p1'); if (e1) { e1.innerHTML = p1_spalene.length === 0 ? "Zatiaľ prázdne." : ""; p1_spalene.forEach(function(k) { var d = document.createElement('div'); d.className = "archiv-polozka"; d.innerText = "📄 " + k.n.replace(/\s\d$/, ""); e1.appendChild(d); }); }
    var e2 = document.getElementById('zoznam-p2'); if (e2) { e2.innerHTML = p2_spalene.length === 0 ? "Zatiaľ prázdne." : ""; p2_spalene.forEach(function(k) { var d = document.createElement('div'); d.className = "archiv-polozka"; d.innerText = "📄 " + k.n.replace(/\s\d$/, ""); e2.appendChild(d); }); }
}
// =========================================================================
// RODINNÁ HRA - VERZIA 7.3.0 (2. ČASŤ: VÝPOČTOVÉ JADRO S PRIORITOU ZÁKLADU)
// =========================================================================
function spustiPrepocty() {
    aktualizujStavZamkuMenu();
    var vsetky = p1_played_cards.concat(p2_played_cards).filter(function(k) { return k; });
    var h1H = p2_used_mulligan ? " <span style='color:#ff4d4d;'>[Handicap: +7 b]</span>" : "";
    var h2H = p1_used_mulligan ? " <span style='color:#ff4d4d;'>[Handicap: +7 b]</span>" : "";
    var vTxt = " | Mince: " + inventar.mince;
    
    var vChlapov = neutralne_vplyvy.find(function(k) { return k.n === "Musíme sa porozprávať"; });
    var vZien = neutralne_vplyvy.find(function(k) { return k.n === "Upokoj sa"; });
    var vZvierat = neutralne_vplyvy.find(function(k) { return k.n === "Ohnostroj"; });

    if (vsetky.length === 0) {
        for (var k = 1; k <= 6; k++) { if (document.getElementById('s' + k)) document.getElementById('s' + k).innerText = "0 b"; }
        if (document.getElementById('body-skore')) { document.getElementById('body-skore').innerHTML = "Hráč 1: " + (p2_used_mulligan ? 7 : 0) + " b | Hráč 2: " + (p1_used_mulligan ? 7 : 0) + " b" + vTxt; }
        return;
    }
    
    var nela = vsetky.some(function(k) { return k.n.indexOf('Nela') !== -1; });
    var p1Katy = vsetky.some(function(k) { return k.n.indexOf('Katy') !== -1 && k.pNum === 1; }), p2Katy = vsetky.some(function(k) { return k.n.indexOf('Katy') !== -1 && k.pNum === 2; });
    var mC1 = countMravce(p1_played_cards), mC2 = countMravce(p2_played_cards);
    var hC1 = countHoluby(p1_played_cards), hC2 = countHoluby(p2_played_cards);

    var sClassRiadkyBonus = { r1: 0, r2: 0, r3: 0, r4: 0, r5: 0, r6: 0 };
    vsetky.forEach(function(k) {
        if (k.cls === "S" && k.row > 0 && k.livePwr !== "none") {
            var rId = (k.pNum === 2) ? ((k.row === 1) ? "r1" : ((k.row === 2) ? "r2" : "r3")) : ((k.row === 1) ? "r4" : ((k.row === 2) ? "r5" : "r6"));
            sClassRiadkyBonus[rId] = 0.5;
        }
    });

    for (var j = 0; j < vsetky.length; j++) {
        var c = vsetky[j]; if (!c) continue;
        var el = document.getElementById(c.id); if (!el) continue;
        var cMeno = c.n.replace(/\s\d$/, "");
        
        if (c.cls === "S") { el.classList.add("karta-s-class-aura"); } else { el.classList.remove("karta-s-class-aura"); }

        if (MASTER_REGISTRY[c.n] && (MASTER_REGISTRY[c.n].row === 0 || cMeno === "Alcohol" || cMeno === "Kvety" || cMeno === "Medove Orechy")) { 
            c.livePwr = "none"; el.innerText = cMeno + " [" + c.cls + "]"; continue; 
        }
        if (cMeno === "Oli") { c.livePwr = 8; el.innerText = "8 - Oli (Imúnna) [" + c.cls + "]"; el.style.color = "#ffcc00"; continue; }

        var zaklad = c.p;
        if (c.isSpy) {
            if (c.cls === "B") zaklad = Math.max(0, zaklad - 1);
            if (c.cls === "A") zaklad = Math.max(0, zaklad - 2);
            if (c.cls === "S") zaklad = Math.max(0, zaklad - 3);
        } else {
            if (c.cls === "B") zaklad += 1;
            if (c.cls === "A") zaklad += 2;
            if (c.cls === "S") zaklad += 3;
        }

        if (cMeno.indexOf('Mravce') !== -1) { 
            var povodnyClsBonus = zaklad - c.p;
            zaklad = ((c.pNum === 1 ? mC1 : mC2) === 3) ? 4 : (((c.pNum === 1 ? mC1 : mC2) === 2) ? 2 : 1); 
            zaklad += povodnyClsBonus;
        } else if (cMeno.indexOf('holuby') !== -1) { 
            var povodnyClsBonus = zaklad - c.p;
            zaklad = ((c.pNum === 1 ? hC1 : hC2) === 3) ? 4 : (((c.pNum === 1 ? hC1 : hC2) === 2) ? 2 : 1); 
            zaklad += povodnyClsBonus;
        }

        var aZ = null;
        if (c.row === 1 && vChlapov) aZ = vChlapov;
        if (c.row === 2 && vZien) aZ = vZien;
        if ((c.row === 3 || cMeno.indexOf('Mravce') !== -1 || cMeno.indexOf('holuby') !== -1) && vZvierat) aZ = vZvierat;

        var bZ = false;
        if (aZ) {
            if ("S" === aZ.cls) {
                zaklad = ("S" === c.cls) ? 3 : 0;
                if ("S" !== c.cls) bZ = true;
            } else {
                zaklad = ("S" === c.cls) ? 4 : 1; 
            }
        }

        if (cMeno !== 'Katy') {
            if (c.pNum === 1) {
                if (p1Katy) zaklad += 1;
                if (p2Katy) zaklad -= 1;
            } else {
                if (p2Katy) zaklad += 1;
                if (p1Katy) zaklad -= 1;
            }
            zaklad = Math.max(0, zaklad);
        }

        var pct = 0;
        var cId = (c.pNum === 2) ? ((c.row === 1) ? "r1" : ((c.row === 2) ? "r2" : "r3")) : ((c.row === 1) ? "r4" : ((c.row === 2) ? "r5" : "r6"));
        
        if (!nela && !bZ) {
            if (cMeno === 'Michal') pct += 1.0; 
            
            var pr = vsetky.find(function(k) { return k.pNum === c.pNum && k.row === c.row && ("Alcohol" === k.n || "Kvety" === k.n || "Medove Orechy" === k.n); });
            var dR = vsetky.some(function(k) { return k.n.indexOf('Duri') !== -1 && k.pNum === c.pNum && k.row === 1; });

            if (pr) {
                var zB = ("S" === pr.cls) ? 1.0 : 0.5; 
                pct += zB;
                if ("A" === c.cls || "S" === c.cls) pct += 0.5;
            }
            if (c.row === 1) { 
                if (vsetky.some(function(k) { return k.n.indexOf('Sisa') !== -1 && k.pNum === c.pNum; }) && "Sisa" !== cMeno) pct += 1.0; 
                if (dR && pr && "Alcohol" === pr.n && "Duri" !== cMeno) pct += 0.5; 
            }
            if ((c.pNum === 1 ? p1_erik_buff_row : p2_erik_buff_row) !== null && c.row === parseInt(c.pNum === 1 ? p1_erik_buff_row : p2_erik_buff_row, 10) && "Erik" !== cMeno) pct += 1.0;
            if ("S" !== c.cls) { pct += sClassRiadkyBonus[cId]; }
        }

        var medzivysledok = zaklad + Math.ceil(zaklad * pct);
        c.livePwr = Math.max(0, medzivysledok);
        el.innerText = c.livePwr + " - " + cMeno + " [" + c.cls + "]";
        
        if ("B" === c.cls) el.style.color = "#cd7f32"; else if ("A" === c.cls) el.style.color = "#c0c0c0"; else if ("S" === c.cls) el.style.color = "#ffd700"; else el.style.color = "#fff";
    }
    for (var r = 1; r <= 6; r++) { var elS = document.getElementById('s' + r); if (elS) elS.innerText = zratajRad(r > 3 ? p1_played_cards : p2_played_cards, r > 3 ? r - 3 : r) + " b"; }
    sc1 = p2_used_mulligan ? 7 : 0; p1_played_cards.forEach(function(card) { if (card && typeof card.livePwr === 'number') sc1 += card.livePwr; });
    sc2 = p1_used_mulligan ? 7 : 0; p2_played_cards.forEach(function(card) { if (card && typeof card.livePwr === 'number') sc2 += card.livePwr; });
    if (document.getElementById('body-skore')) { document.getElementById('body-skore').innerHTML = "Hráč 1: " + sc1 + " b | Hráč 2: " + sc2 + " b" + vTxt; }
}
// =========================================================================
// RODINNÁ HRA - VERZIA 7.3.5 (3. ČASŤ: PREČISTENÝ MANAGEMENT DRAFTU)
// =========================================================================
function vytvorZoznamKariet(pNum) {
    var rawList = Object.keys(MASTER_REGISTRY);
    if (pNum === 1 && Object.keys(inventar.karty).length === 0) {
        rawList.forEach(function(m) { inventar.karty[m] = { replikyC: 1, aktivnaTrieda: "C" }; });
        inventar.zostava = rawList.slice(0, 30);
    }
    var fList = [];
    if (pNum === 1) {
        if (!inventar.zostava || inventar.zostava.length === 0) { inventar.zostava = rawList.slice(0, 30); }
        fList = inventar.zostava;
    } else { fList = rawList.slice().sort(function() { return 0.5 - Math.random(); }).slice(0, 30); }

    return fList.map(function(m) {
        var dR = MASTER_REGISTRY[m]; var tK = "C";
        if (pNum === 1) { tK = inventar.karty[m] ? inventar.karty[m].aktivnaTrieda : "C"; } 
        else if (jeSingleplayer) {
            var r = Math.random() * 30;
            if (obtiaznostAI === "B") tK = (r < 10) ? "B" : "C";
            else if (obtiaznostAI === "A") tK = (r < 10) ? "A" : "B";
            else if (obtiaznostAI === "S") tK = (r < 10) ? "S" : "A";
        }
        return { n: m.replace(/\s\d$/, ""), row: dR.row, p: dR.p, pNum: pNum, isSpy: dR.isSpy || false, cls: tK };
    });
}

function spustiDraft() {
    p1_full_deck = vytvorZoznamKariet(1); p2_full_deck = vytvorZoznamKariet(2);
    p1_draft_hand = []; p2_draft_hand = []; p1_used_mulligan = false; p2_used_mulligan = false; p1_confirmed_mulligan = false; p2_confirmed_mulligan = false;
    for (var i = 0; i < 10; i++) {
        var p1Res = p1_full_deck.splice(Math.floor(Math.random() * p1_full_deck.length), 1)[0];
        var p2Res = p2_full_deck.splice(Math.floor(Math.random() * p2_full_deck.length), 1)[0];
        if (p1Res) p1_draft_hand.push(p1Res); if (p2Res) p2_draft_hand.push(p2Res);
    }
    vykresliDraftOkna();
    var r2K = document.getElementById('kontajner-ruka-p2');
    if (r2K) { if (jeSingleplayer) r2K.classList.add('ruka-ai-skryta'); else r2K.classList.remove('ruka-ai-skryta'); }
}

function vykresliDraftOkna() {
    var ind = document.getElementById('turn-indicator');
    if (draft_faza) {
        if (ind) ind.innerText = "MULLIGAN FÁZA - Hráči potvrdzujú ruku.";
        var r1 = document.getElementById('ruka-p1');
        if (r1) {
            r1.innerHTML = ""; p1_draft_hand.forEach(function(k) {
                if (!k) return; var d = document.createElement('div'); d.className = "karta karta-h1";
                if (k.cls === "S") d.classList.add("karta-s-class-aura"); 
                d.innerText = (k.p > 0 ? k.p + " - " + k.n : k.n) + " [" + k.cls + "]"; r1.appendChild(d);
            });
        }
        var r2 = document.getElementById('ruka-p2');
        if (r2) {
            r2.innerHTML = ""; p2_draft_hand.forEach(function(k) {
                if (!k) return; var d = document.createElement('div'); d.className = "karta karta-h2";
                if (k.cls === "S") d.classList.add("karta-s-class-aura");
                d.innerText = (k.p > 0 ? k.p + " - " + k.n : k.n) + " [" + k.cls + "]"; r2.appendChild(d);
            });
        }
        var b1 = document.getElementById('p1-pass-btn'); if (b1) b1.style.display = p1_confirmed_mulligan ? "none" : "inline-block";
        var b2 = document.getElementById('p2-pass-btn'); if (b2) b2.style.display = (p2_confirmed_mulligan || jeSingleplayer) ? "none" : "inline-block";
    }
}

function preklopDraftDoRukyHTML() {
    var e = document.getElementById("ruka-p1");
    if (e) {
        e.innerHTML = ""; p1_draft_hand.forEach(function(t) {
            if (!t) return; var r = document.createElement("div"); r.className = "karta karta-h1";
            r.setAttribute("data-meno", t.n); r.setAttribute("data-pnum", "1"); r.setAttribute("data-row", t.row); r.setAttribute("data-pwr", t.p);
            if (t.isSpy) r.setAttribute("data-isspy", "true"); if ("S"===t.cls) r.classList.add("karta-s-class-aura");
            r.innerText = (t.p > 0 ? t.p + " - " + t.n : t.n) + " [" + t.cls + "]"; e.appendChild(r);
        });
    }
    var t = document.getElementById("ruka-p2");
    if (t) {
        t.innerHTML = ""; p2_draft_hand.forEach(function(e) {
            if (!e) return; var r = document.createElement("div"); r.className = "karta karta-h2";
            r.setAttribute("data-meno", e.n); r.setAttribute("data-pnum", "2"); r.setAttribute("data-row", e.row); r.setAttribute("data-pwr", e.p);
            if (e.isSpy) r.setAttribute("data-isspy", "true"); if ("S"===e.cls) r.classList.add("karta-s-class-aura");
            r.innerText = (e.p > 0 ? e.p + " - " + e.n : e.n) + " [" + e.cls + "]"; t.appendChild(r);
        });
    }
}
// =========================================================================
// RODINNÁ HRA - VERZIA 7.3.5 (4. ČASŤ: REFORMA SYNERGIÍ A VYHODNOCOVANIA)
// =========================================================================
function dynamicDrawNewCard(e, t) {
    var r = 1 === e ? p1_full_deck : p2_full_deck, n = document.getElementById(1 === e ? "ruka-p1" : "ruka-p2");
    if ((t || r && 0 !== r.length) && n) {
        var a = t; if (!a) { var i = r.splice(Math.floor(Math.random() * r.length), 1); if (i && i.length > 0) a = i[0]; }
        if (a) {
            var o = document.createElement("div"); o.className = "karta karta-nova " + (1 === e ? "karta-h1" : "karta-h2");
            o.setAttribute("data-meno", a.n); o.setAttribute("data-pnum", e.toString()); o.setAttribute("data-row", a.row); o.setAttribute("data-pwr", a.p);
            if (a.isSpy) o.setAttribute("data-isspy", "true"); if ("S" === a.cls) o.classList.add("karta-s-class-aura");
            o.innerText = (a.p > 0 ? a.p + " - " + a.n : a.n) + " [" + a.cls + "]"; n.appendChild(o);
        }
    }
}

function spustiSpyNakukanie(pNum) {
    var superRukaId = (pNum === 1) ? "ruka-p2" : "ruka-p1"; var superRukaEl = document.getElementById(superRukaId); if (!superRukaEl) return;
    var kartySupera = superRukaEl.querySelectorAll('.karta'); if (kartySupera.length === 0) return;
    var indexy = []; while (indexy.length < Math.min(3, kartySupera.length)) { var r = Math.floor(Math.random() * kartySupera.length); if (indexy.indexOf(r) === -1) indexy.push(r); }
    indexy.forEach(function(idx) { var k = kartySupera[idx]; k.style.background = "#d97706"; k.style.boxShadow = "0 0 15px #ffcc00"; });
    setTimeout(function() { indexy.forEach(function(idx) { var k = kartySupera[idx]; if (k) { k.style.background = "#444"; k.style.boxShadow = "none"; } }); }, 4000);
}

function ozivKartuZArchivu(pNum) {
    var list = (pNum === 1) ? p1_spalene : p2_spalene; if (!list || list.length === 0) return;
    var k = list.pop(); if (!k) return; var jeSpy = (k.n === "Zvedava suseda" || k.n === "Kika"); var targetPNum = jeSpy ? ((pNum === 1) ? 2 : 1) : pNum;
    var div = document.createElement('div'); div.className = "karta karta-nova " + (k.pNum === 1 ? "karta-h1" : "karta-h2"); div.id = k.id;
    div.setAttribute('data-meno', k.n); div.setAttribute('data-row', k.row); div.setAttribute('data-pwr', k.p); if (k.cls === "S") div.classList.add("karta-s-class-aura");
    div.innerText = (k.p > 0 ? k.p + " - " + k.n : k.n) + " [" + k.cls + "]"; div.setAttribute('data-pnum', targetPNum.toString()); k.pNum = targetPNum; if (jeSpy) div.setAttribute('data-isspy', "true");
    var cId = (targetPNum === 2) ? ((k.row === 1) ? "r1" : ((k.row === 2) ? "r2" : "r3")) : ((targetPNum === 1) ? "r4" : ((k.row === 2) ? "r5" : "r6"));
    var rEl = document.getElementById(cId);
    if (rEl) {
        rEl.appendChild(div); if (targetPNum === 1) { p1_played_cards.push(k); } else { p2_played_cards.push(k); }
        if (jeSpy) { var pocetKariet = (k.cls === "A" || k.cls === "S") ? 3 : 2; for(var i=0; i<pocetKariet; i++) { dynamicDrawNewCard(pNum); } if (k.cls === "A" || k.cls === "S") { spustiSpyNakukanie(pNum); } }
        if (k.n === "Doktor" || k.n === "Sestricka") { ozivKartuZArchivu(pNum); }
    }
    aktualizujArchivyVizualne();
}

function otvorTruhlu(jeVitaz, jeRemizaZapasu) {
    if (jeSingleplayer && !jeVitaz && !jeRemizaZapasu) { alert("Zápas proti AI skončil prehrou."); return; }
    var hratelneKartyMena = Object.keys(MASTER_REGISTRY); var pocetKariet = (jeVitaz) ? 3 : 10; var ziskaneMena = [];
    for (var i = 0; i < pocetKariet; i++) {
        var nahodneMeno = hratelneKartyMena[Math.floor(Math.random() * hratelneKartyMena.length)]; var r = Math.random() * 100; var vygenerovanaTrieda = "C";
        if (jeVitaz) { if (r < 0.5) vygenerovanaTrieda = "S"; else if (r < 10.0) vygenerovanaTrieda = "A"; else if (r < 30.0) vygenerovanaTrieda = "B"; } 
        else { if (r < 0.01) vygenerovanaTrieda = "S"; else if (r < 2.0) vygenerovanaTrieda = "A"; else if (r < 12.0) vygenerovanaTrieda = "B"; }
        if (!inventar.karty[nahodneMeno]) { inventar.karty[nahodneMeno] = { replikyC: 0, aktivnaTrieda: "C" }; }
        var pridaneRepliky = 1; if (vygenerovanaTrieda === "B") pridaneRepliky = 5; if (vygenerovanaTrieda === "A") pridaneRepliky = 25; if (vygenerovanaTrieda === "S") pridaneRepliky = 75;
        inventar.karty[nahodneMeno].replikyC += pridaneRepliky; var cistyNazovOznamu = nahodneMeno.replace(/\s\d$/, ""); ziskaneMena.push(cistyNazovOznamu + " (" + vygenerovanaTrieda + ")");
    }
    var nadpisOznamu = "📦 TRUHLA ÚČASTNÍKA SÉRIE";
    if (jeVitaz) { nadpisOznamu = jeSingleplayer ? "🏆 TRUHLA VÍŤAZA AI" : "🏆 TRUHLA VÍŤAZA SÉRIE"; } else if (jeRemizaZapasu) { nadpisOznamu = "📦 TRUHLA ÚČASTNÍKA ZA REMÍZU 2:2 S AI"; }
    alert(nadpisOznamu + " OBSAHOVALA:\n" + ziskaneMena.join("\n")); aktualizujPanelDielne();
}

function vyhodnot() {
    if (sc1 > sc2) { r1++; if (!jeSingleplayer) { inventar.mince += 50; alert("Hráč 1 vyhráva kolo! (+50m)"); } else { alert("Hráč 1 vyhráva kolo!"); } } 
    else if (sc2 > sc1) { r2++; alert("AI vyhráva kolo!"); } else { r1++; r2++; alert("Absolútna remíza! Bod pre oboch."); }
    if (document.getElementById('kola-skore')) document.getElementById('kola-skore').innerText = "Vyhraté kolá - Hráč 1: " + r1 + "/2 | Hráč 2: " + r2 + "/2";
    var zapasSkoncil = (r1 >= 2 || r2 >= 2);
    if (zapasSkoncil) {
        if (r1 >= 2 && r2 >= 2) { alert("Remíza 2:2! Získavaš truhlu účastníka."); otvorTruhlu(false, true); } 
        else { var h1V = (r1 >= 2); otvorTruhlu(h1V, false); alert("Zápas skončil! Víťaz: " + (h1V ? "Hráč 1" : "AI")); }
        document.getElementById('hraci-stol-kontajner').classList.add('schovany'); document.getElementById('predzapasove-menu').classList.remove('schovany');
        draft_faza = true; r1 = 0; r2 = 0;
    } else { p1Pass = false; p2Pass = false; resetStolaBezReloadu(true); }
}
// =========================================================================
// RODINNÁ HRA - VERZIA 7.3.5 (5. ČASŤ: INTELIGENTNÝ RADAR ROZHODOVANIA BOT)
// =========================================================================
function spustiTahAI() {
    if (!jeSingleplayer || p2Pass || draft_faza) return;
    var rukaAI = document.getElementById('ruka-p2'); if (!rukaAI) return;
    var karty = rukaAI.querySelectorAll('.karta');
    if (karty.length === 0) { p2Pass = true; hracPasolAI(); return; }

    spustiPrepocty();
    var jeFinale = (r1 === 1 && r2 === 1);

    if (p1Pass && sc2 > sc1) { p2Pass = true; hracPasolAI(); return; }

    if (!jeFinale) {
        if ("B" === obtiaznostAI) { if (sc2 > sc1 && (sc2 - sc1) >= 20 && karty.length <= 4) { p2Pass = true; hracPasolAI(); return; } } 
        else if ("A" === obtiaznostAI) { if (p1Pass && sc2 > sc1) { p2Pass = true; hracPasolAI(); return; } if (sc2 > sc1 && (sc2 - sc1) >= 15 && karty.length <= 3) { p2Pass = true; hracPasolAI(); return; } } 
        else if ("S" === obtiaznostAI) { if (p1Pass && sc2 > sc1) { p2Pass = true; hracPasolAI(); return; } if (sc1 > sc2 && (sc1 - sc2) > 18 && karty.length <= 4 && r2 === 0) { p2Pass = true; hracPasolAI(); return; } }
    }

    var vybranaKarta = null; var postavy = []; var efekty = [];
    for (var i = 0; i < karty.length; i++) {
        var mK = karty[i].getAttribute('data-meno') || ""; var rK = parseInt(karty[i].getAttribute('data-row'), 10) || 0;
        if (rK === 0 || "Alcohol" === mK || "Kvety" === mK || "Medove Orechy" === mK) { efekty.push(karty[i]); } else { postavy.push(karty[i]); }
    }

    if (postavy.length > 0) {
        if ("S" === obtiaznostAI) {
            var maxP = -1; for (var i = 0; i < postavy.length; i++) { var pwr = parseInt(postavy[i].getAttribute('data-pwr'), 10) || 0; if (pwr > maxP) { maxP = pwr; vybranaKarta = postavy[i]; } }
        } else {
            var idx = ("B" === obtiaznostAI && Math.random() < 0.4) ? Math.floor(Math.random() * postavy.length) : 0; vybranaKarta = postavy[idx];
        }
    } else if (efekty.length > 0) {
        if (p1Pass && sc1 > sc2) { p2Pass = true; hracPasolAI(); return; }
        vybranaKarta = efekty[0];
    }

    if (vybranaKarta) { setTimeout(function() { if (!p2Pass) vybranaKarta.click(); }, 800); } 
    else { p2Pass = true; hracPasolAI(); }
}

function hracPasolAI() { 
    alert("🤖 AI pasuje pre toto kolo!"); if (!p1Pass) { aktualnyHrac = 1; } 
    if (p1Pass && p2Pass) { vyhodnot(); } else { spustiPrepocty(); if (jeSingleplayer && 2 === aktualnyHrac && !p2Pass) { setTimeout(spustiTahAI, 800); } } 
}

function spustiMarekaAIJadro(botPNum) {
    var superP = (1 === botPNum) ? 2 : 1; var sPole = (1 === superP) ? p1_played_cards : p2_played_cards;
    var ciele = sPole.filter(function(k) { return k && -1 === k.n.indexOf('Nela') && -1 === k.n.indexOf('Oli') && "Alcohol" !== k.n && "Kvety" !== k.n && "Medove Orechy" !== k.n && k.livePwr > 0; });
    if (0 === ciele.length) { alert("🤖 AI Marek: Bez zmysluplného cieľa."); return; }
    ciele.sort(function(a, b) { return b.livePwr - a.livePwr; });
    var tKarta = ciele[0];
    if (tKarta) {
        var idx = sPole.findIndex(function(c) { return c && c.id === tKarta.id; });
        if (-1 !== idx) {
            var el = document.getElementById(tKarta.id); if (el) el.remove();
            if (1 === tKarta.pNum) p1_spalene.push(tKarta); else p2_spalene.push(tKarta);
            sPole.splice(idx, 1); alert("🤖 AI Marek ufilozofoval kartu: " + tKarta.n + " (" + tKarta.livePwr + "b)!"); aktualizujArchivyVizualne(); spustiPrepocty();
        }
    }
}

function spustiErikaAIJadro(botPNum) {
    var b1 = zratajRad((1 === botPNum ? p1_played_cards : p2_played_cards), 1); var b2 = zratajRad((1 === botPNum ? p1_played_cards : p2_played_cards), 2); var b3 = zratajRad((1 === botPNum ? p1_played_cards : p2_played_cards), 3);
    var rady = [ { id: 1, p: b1 }, { id: 2, p: b2 }, { id: 3, p: b3 } ]; rady.sort(function(a, b) { return b.p - a.p; });
    var zRad = rady[0].id;
    if (1 === botPNum) p1_erik_buff_row = zRad; else p2_erik_buff_row = zRad;
    alert("🤖 AI Erik zacielil svoju silu na svoj: Rad " + zRad + "!"); spustiPrepocty();
}
// =========================================================================
// RODINNÁ HRA - VERZIA 7.3.6 (6. ČASŤ: LOGIKA MAREKA, ERIKA A KONCA TAHU)
// =========================================================================
function spustiMarekaLogiku() {
    spustiPrepocty(); 
    var hCiel = (1 === hracCakajuciNaAkciu) ? 2 : 1; 
    var sPole = (1 === hCiel) ? p1_played_cards : p2_played_cards;
    if (sPole.some(function(k) { return k && -1 !== k.n.indexOf('Nela') && 2 === k.row; })) { 
        blokujVykladanie = false; var p = hracCakajuciNaAkciu; hracCakajuciNaAkciu = 0; ukonciTah(p, "Marek zablokovaný"); return; 
    }
    var ciele = sPole.filter(function(k) { return k && -1 === k.n.indexOf('Nela') && -1 === k.n.indexOf('Oli') && "Alcohol" !== k.n && "Kvety" !== k.n && "Medove Orechy" !== k.n && k.livePwr > 0; });
    if (0 === ciele.length) { 
        blokujVykladanie = false; var p = hracCakajuciNaAkciu; hracCakajuciNaAkciu = 0; ukonciTah(p, "Bez cieľa"); return; 
    }
    var dd = document.getElementById("marek-dropdown"); if (!dd) return; dd.innerHTML = "";
    ciele.forEach(function(k) { 
        var opt = document.createElement("option"); opt.value = k.id; opt.innerText = k.n.replace(/\s\d$/, "") + " (" + k.livePwr + "b)"; dd.appendChild(opt); 
    });
    var btn = document.getElementById("marek-burn-btn");
    if (btn) {
        btn.onclick = function(e) {
            e.stopPropagation(); var zId = dd.value; if (!zId) return;
            var idx = sPole.findIndex(function(c) { return c && c.id === zId; });
            if (-1 !== idx) {
                var k = sPole[idx]; var el = document.getElementById(k.id); if (el) el.remove();
                if (1 === k.pNum) p1_spalene.push(k); else p2_spalene.push(k);
                sPole.splice(idx, 1); document.getElementById('panel-marek').className = 'schovany';
                blokujVykladanie = false; var povH = hracCakajuciNaAkciu; hracCakajuciNaAkciu = 0;
                ukonciTah(povH, "Marek odložil " + k.n); aktualizujArchivyVizualne();
            }
        };
    }
    document.getElementById('panel-marek').className = '';
}

function gamePassBtn(pNum) { 
    if (draft_faza) { potvrdDraftHrac(pNum); return; } 
    if (1 === pNum) { p1Pass = true; aktualnyHrac = 2; } else { p2Pass = true; aktualnyHrac = 1; } 
    if (p1Pass && p2Pass) vyhodnot(); 
    else { spustiPrepocty(); if (jeSingleplayer && 2 === aktualnyHrac && !p2Pass) { setTimeout(spustiTahAI, 800); } } 
}

function spustiErikaHtml(rad) { 
    if (1 === hracCakajuciNaAkciu) p1_erik_buff_row = parseInt(rad, 10); else p2_erik_buff_row = parseInt(rad, 10); 
    document.getElementById('panel-erik').className = 'schovany'; blokujVykladanie = false; 
    var povH = hracCakajuciNaAkciu; hracCakajuciNaAkciu = 0; ukonciTah(povH); 
}

function ukonciTah(pNum, info) { 
    if (1 === pNum) { if (!p2Pass) aktualnyHrac = 2; } else { if (!p1Pass) aktualnyHrac = 1; } 
    spustiPrepocty(); 
    if (document.getElementById('turn-indicator')) { 
        document.getElementById('turn-indicator').innerText = "Na ťahu: Hráč " + aktualnyHrac + (info ? " | (" + info + ")" : ""); 
    }
    if (jeSingleplayer && 2 === aktualnyHrac && !p2Pass) { setTimeout(spustiTahAI, 800); }
}
// =========================================================================
// RODINNÁ HRA - VERZIA 7.3.6 (7. ČASŤ: MANAGMENT DIELNE, KUTIA A OBCHODU)
// =========================================================================
function vylepsiKartuVoForge(e) {
    var t = inventar.karty[e]; if (t) {
        var r = t.aktivnaTrieda, n = false;
        if ("C" === r && t.replikyC >= 5) { t.replikyC -= 5; t.aktivnaTrieda = "B"; n = true; } 
        else if ("B" === r && t.replikyC >= 25) { t.replikyC -= 25; t.aktivnaTrieda = "A"; n = true; } 
        else if ("A" === r && t.replikyC >= 75) { t.replikyC -= 75; t.aktivnaTrieda = "S"; n = true; }
        if (n) { alert("🔨 Karta úspešne vykovaná na triedu " + t.aktivnaTrieda + "!"); aktualizujPanelDielne(); if (!draft_faza) spustiPrepocty(); } else { alert("Nedostatok replík!"); }
    }
}

function recyklujKartuDielne(e) {
    var t = inventar.karty[e]; if (t && t.replikyC > 0) { t.replikyC--; inventar.mince += 15; alert("♻️ Karta recyklovaná (+15m)!"); aktualizujPanelDielne(); } else { alert("Žiadne repliky!"); }
}

function kupNahodnyBooster() {
    if (inventar.mince < 100) { alert("Nedostatok mincí!"); return; }
    var e = Object.keys(MASTER_REGISTRY), t = e[Math.floor(Math.random() * e.length)];
    inventar.mince -= 100; if (!inventar.karty[t]) inventar.karty[t] = { replikyC: 0, aktivnaTrieda: "C" };
    inventar.karty[t].replikyC += 1; alert("🎁 Booster obsahoval: " + t.replace(/\s\d$/, "")); aktualizujPanelDielne();
}

function kupKonkretnuKartu(e) {
    if (inventar.mince < 3000) { alert("Nedostatok mincí!"); return; }
    inventar.mince -= 3000; if (!inventar.karty[e]) inventar.karty[e] = { replikyC: 0, aktivnaTrieda: "C" };
    inventar.karty[e].replikyC += 1; alert("🛒 Kúpené cielené: " + e.replace(/\s\d$/, "")); aktualizujPanelDielne();
}

function overMoznostStartuHry() {
    if (!inventar.zostava || inventar.zostava.length < 30) { alert("Tvoja zostava musí mať aspoň 30 kariet! (" + (inventar.zostava ? inventar.zostava.length : 0) + "/30)"); return false; }
    return true;
}

function vygenerujRegalyTrhoviska() {
    var e = document.getElementById("obchod-regaly-zoznam"); if (!e) return;
    e.innerHTML = ""; Object.keys(MASTER_REGISTRY).forEach(function(t) {
        var r = document.createElement("div"); r.className = "obchod-polozka-karta";
        var n = t.replace(/\s\d$/, ""), a = "<div class='karta-nazov'>" + n + "</div>";
        a += "<div class='karta-cena-label'>Cena: 3000 m</div>", a += "<button class='btn-obchod-nakup' style='background:#28a745;font-size:.85em;padding:6px' onclick=\"kupKonkretnuKartu('" + t + "')\">🎯 Kúpiť C-kopiu</button>", r.innerHTML = a, e.appendChild(r);
    });
}
// =========================================================================
// RODINNÁ HRA - VERZIA 7.3.6 (8. ČASŤ: INICIALIZÁCIA SÉRIÍ A KLIKACÍ ENGIN)
// =========================================================================
function spustitZapasProtiAI(e) { 
    if (overMoznostStartuHry()) { 
        jeSingleplayer = true; obtiaznostAI = e; 
        if (document.getElementById("rezim-zapasu-oznam")) {
            document.getElementById("rezim-zapasu-oznam").innerText = "🤖 SINGLEPLAYER - " + ("B" === e ? "BRONZ" : "A" === e ? "STRIEBRO" : "ZLATO"); 
        }
        document.getElementById("predzapasove-menu").className = "schovany"; 
        document.getElementById("hraci-stol-kontajner").className = ""; 
        r1 = 0; r2 = 0; resetStolaBezReloadu(false); 
    } 
}

function spustitZapasLokálnePVP() { 
    if (overMoznostStartuHry()) { 
        jeSingleplayer = false; 
        if (document.getElementById("rezim-zapasu-oznam")) {
            document.getElementById("rezim-zapasu-oznam").innerText = "👥 LOKÁLNY MULTIPLAYER 1v1"; 
        }
        document.getElementById("predzapasove-menu").className = "schovany"; 
        document.getElementById("hraci-stol-kontajner").className = ""; 
        r1 = 0; r2 = 0; resetStolaBezReloadu(false); 
    } 
}

function vzdajZapasUtek() { 
    if (confirm("Vzdať celú sériu?")) { 
        document.getElementById("hraci-stol-kontajner").className = "schovany"; 
        document.getElementById("predzapasove-menu").className = ""; 
        draft_faza = true; r1 = 0; r2 = 0; aktualizujStavZamkuMenu(); 
    } 
}

document.addEventListener("DOMContentLoaded", function() {
    var e = document.getElementById("menu-btn-hra"), t = document.getElementById("menu-btn-zostava"), r = document.getElementById("menu-btn-dielna"), n = document.getElementById("menu-btn-trhovisko");
    if (e) e.addEventListener("click", function() { prepniSekciuVizualne("sekcia-hra") }); 
    if (t) t.addEventListener("click", function() { prepniSekciuVizualne("sekcia-zostava"), aktualizujZostavaPanel() }); 
    if (r) r.addEventListener("click", function() { prepniSekciuVizualne("sekcia-dielna"), aktualizujPanelDielne() }); 
    if (n) n.addEventListener("click", function() { prepniSekciuVizualne("sekcia-trhovisko"), vygenerujRegalyTrhoviska(), aktualizujPanelDielne() });
    p1_full_deck = vytvorZoznamKariet(1); 
    obnovPocitadlaZostavyVMenu();
});

document.addEventListener("click", function(e) {
    var t = e.composedPath() || [], r = null; 
    for (var n = 0; n < t.length; n++) { 
        var a = t[n]; if (a) { 
            if ("p1-pass-btn" === a.id) { gamePassBtn(1); return; } 
            if ("p2-pass-btn" === a.id) { gamePassBtn(2); return; } 
            if ("p1-mulligan-btn" === a.id) { Admin_vynutVymenu(1); return; } 
            if ("p2-mulligan-btn" === a.id) { Admin_vynutVymenu(2); return; } 
            if ("eb1" === a.id) { spustiErikaHtml(1); return; } 
            if ("eb2" === a.id) { spustiErikaHtml(2); return; } 
            if ("eb3" === a.id) { spustiErikaHtml(3); return; } 
            a.classList && a.classList.contains("karta") && (r = a) 
        } 
    }
    if (!draft_faza) {
        var i = !document.getElementById("panel-erik").classList.contains("schovany") || !document.getElementById("panel-marek").classList.contains("schovany"), o = r ? r.closest(".karta") : null;
        if (o && !blokujVykladanie && !i) {
            var u = o.getAttribute("data-meno") || "", c = parseInt(o.getAttribute("data-pnum"), 10) || 0, s = parseInt(o.getAttribute("data-row"), 10) || 0, d = parseInt(o.getAttribute("data-pwr"), 10) || 0, l = "true" === o.getAttribute("data-isspy");
            if (c === aktualnyHrac && (1 !== c || !p1Pass) && (2 !== c || !p2Pass) && !o.parentNode.classList.contains("riadok") && "neutralny-riadok" !== o.parentNode.id) {
                var f = Math.floor(1e6 * Math.random()).toString(16), p = (new Date).getTime().toString(16), m = "c_" + c + "*" + u.replace(/\s+/g, "") + "*" + p + "_" + f; o.id = m;
                if (0 === s) {
                    var k = document.getElementById("neutralny-riadok"); k && ("Šicko v porádku" === u ? (neutralne_vplyvy = [], k.innerHTML = "⚡ Neutrálna zóna (Vplyvy stola)", o.remove()) : (0 === neutralne_vplyvy.length && (k.innerHTML = ""), k.appendChild(o), neutralne_vplyvy.push({ id: m, n: u, pNum: c, row: 0, p: 0, livePwr: "none" })));
                    ukonciTah(c); return;
                }
                var v = l ? (1 === c ? 2 : 1) : c, h = vytvorZoznamKariet(c).find(function(e) { return e.n === u }), g = h ? h.cls : "C", _ = { id: m, n: u, pNum: v, row: s, p: d, livePwr: d, cls: g, isSpy: l }, x = 2 === v ? (1 === s ? "r1" : 2 === s ? "r2" : "r3") : (1 === s ? "r4" : 2 === s ? "r5" : "r6"), E = document.getElementById(x);
                if (E) { E.appendChild(o), o.className = "karta " + (1 === c ? "karta-h1" : "karta-h2"), "S" === g && o.classList.add("karta-s-class-aura"), 1 === v ? p1_played_cards.push(_) : p2_played_cards.push(_), l && (dynamicDrawNewCard(c), dynamicDrawNewCard(c), ("A" === g || "S" === g) && (dynamicDrawNewCard(c), spustiSpyNakukanie(c))), ("Doktor" === u || "Sestricka" === u) && ozivKartuZArchivu(c) }
                if ("Erik" === u) { hracCakajuciNaAkciu = c; blokujVykladanie = true; setTimeout(function() { 1 === c ? document.getElementById("panel-erik").className = "" : spustiErikaAIJadro(2) }, 10); } 
                else if ("Marek" === u) { hracCakajuciNaAkciu = c; blokujVykladanie = true; setTimeout(function() { 1 === c ? spustiMarekaLogiku() : spustiMarekaAIJadro(2) }, 10); } 
                else ukonciTah(c);
            }
        }
    }
});

spustiDraft();
