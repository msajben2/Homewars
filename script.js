// =========================================================================
// RODINNÁ HRA - HOME WARS (KOMPLETNÝ ENGINE - VERZIA 26.1.0 - FIX S-CLASS & JOKER)
// =========================================================================

(function() {
    var TAJNY_KOD_HESLA = "dGVzdGVyMTIzIQ=="; 
    var vstup = prompt("🔒 Vstup do kráľovstva zakázaný!\nZadaj tajné rodinné prístupové heslo:");
    var zadaneHeslo = vstup ? vstup.trim() : "";
    if (btoa(zadaneHeslo) !== TAJNY_KOD_HESLA) {
        alert("❌ Nesprávne heslo!");
        document.body.innerHTML = "<div style='display:flex; justify-content:center; align-items:center; height:100vh; background:#111; color:#ff4d4d; font-family:sans-serif; font-size:1.5em; font-weight:bold;'>🔒 Prístup odmietnutý. Stránka je chránená rodinným zámkom.</div>";
        throw new Error("Neautorizovaný prístup.");
    }
})();

var VERZIA = "26.1.0";

// =========================================================================
// 1. MASTER REGISTRY
// =========================================================================
var MASTER_REGISTRY = {
    // 🌟 12 PLATINOVÝCH KARIET
    "Katy": { row: 2, p: 6, isPlatinum: true, img: "Img/katy.webp", desc: "Kráľovná výhier.", abilityDesc: "💖 Pomoc: Pridáva +2b všetkým tvojim kartám a uberá -2b všetkým súperovým kartám." },
    "Nela": { row: 2, p: 1, isPlatinum: true, img: "Img/nela.webp", desc: "Ochranný štít.", abilityDesc: "🛡️ Štít: Zmrazí stôl! Kým je Nela v hre, žiadne karty nedostávajú percentuálne bonusy ani buffy." },
    "Michal": { row: 1, p: 5, isPlatinum: true, img: "Img/michal.webp", desc: "Obchodník.", abilityDesc: "📢 Obchodník: Ak nie je na stole Nela, dáva sám sebe samo-buff +100% k sile." },
    "Erik": { row: 1, p: 3, isPlatinum: true, img: "Img/erik.webp", desc: "Taktik.", abilityDesc: "📢 Buff: Po vyložení si vyberieš rad, ktorému pridá +50% k celkovej sile." },
    "Marek": { row: 1, p: 4, isPlatinum: true, img: "Img/marek.webp", desc: "Filozof.", abilityDesc: "🧹 Filozof: Zmatie zvolenú kartu súpera a pošle ju do archívu." },
    "Ďuri": { row: 1, p: 6, isPlatinum: true, img: "Img/duri.webp", desc: "Veterán.", abilityDesc: "🍺 Taktik: Ak je na stole Alkohol, posilňuje ženský 2. rad o +100%." },
    "Doktor": { row: 1, p: 5, isPlatinum: true, img: "Img/doktor.webp", desc: "Lekár.", abilityDesc: "🏥 Oživenie: Vráti do hry poslednú spálenú kartu z tvojho archívu." },
    "Sestrička": { row: 2, p: 3, isPlatinum: true, img: "Img/sestricka.webp", desc: "Ošetrovateľka.", abilityDesc: "🏥 Oživenie: Vráti do hry spálenú kartu z tvojho archívu." },
    "Sisa": { row: 2, p: 4, isPlatinum: true, img: "Img/sisa.webp", desc: "Dvorná dáma.", abilityDesc: "📢 Dvorná dáma: Zvyšuje silu celého mužského radu o +50%." },
    "Oli": { row: 2, p: 12, isPlatinum: true, img: "Img/oli.webp", desc: "Duchovná matka.", abilityDesc: "✝️ Imunita: Jej sila 12b je stála a nedá sa znížiť kúzlam." },
    "Kika": { row: 2, p: 3, isPlatinum: true, isSpy: true, img: "Img/kika.webp", desc: "Archivárka.", abilityDesc: "🕵️ Špión: Vykladá sa na súperovu stranu stola. Potiahne ti 2 nové karty." },
    "Zvedavá suseda": { row: 2, p: 7, isPlatinum: true, isSpy: true, img: "Img/zvedava-suseda.webp", desc: "Suseda.", abilityDesc: "🕵️ Špión: Vykladá sa na súperovu stranu stola a dá ti 2 nové karty." },

    // 🏆 UNIKÁTNA TURNAJOVÁ KARTA
    "Kráľovský Šampión": { row: 1, p: 8, isTournamentUnique: true, img: "Img/neviditelny-mario.webp", desc: "Unikátna turnajová trofej existujúca len v 1 kuse na celom serveri!", abilityDesc: "👑 Turnajový Unikát: Má základ 8b, v Dielni sa NIKDY nezničí (zhorí len Joker) a pri vyložení aktivuje všetky dostupné setové bonusy v rade!" },

    // 🃏 JOKER CARD
    "Joker Card": { row: 0, p: 0, isJoker: true, img: "Img/zlato.webp", desc: "Univerzálny kováčsky žolík.", abilityDesc: "🃏 Dielenský Žolík: Nedá sa s ním hrať v zápase, no v Dielni sa ková od F po A a nahradí akúkoľvek kartu pri kovaní!" },

    // 🔨 OBYČAJNÉ KOVÁČSKE JEDNOTKY
    "Neviditeľný Mário": { row: 1, p: 4, img: "Img/neviditelny-mario.webp", desc: "Tajuplný zbojník v kapucni." },
    "Martin": { row: 1, p: 4, img: "Img/martin.webp", desc: "Šikovný hraničiar a lovec." },
    "Timko": { row: 1, p: 1, img: "Img/tymko.webp", desc: "Obranný bojovník s dreveným mečom." },
    "Jaro": { row: 1, p: 5, img: "Img/jaro.webp", desc: "Zručný kováč." },
    "Lula": { row: 2, p: 4, img: "Img/lula.webp", desc: "Dvorná harfistka." },
    "Anka": { row: 2, p: 7, img: "Img/anka.webp", desc: "Správkyňa hradných kľúčov." },
    "Darinka": { row: 2, p: 5, img: "Img/darinka.webp", desc: "Majsterka tkáčka." },
    "Viera": { row: 2, p: 6, img: "Img/viera.webp", desc: "Hradná pekárka." },
    "Grobské Mravce": { row: 3, p: 1, img: "Img/grobske-mravce.webp", desc: "Húževnatá svorka lesných mravcov." },
    "Petržalské holuby": { row: 3, p: 1, img: "Img/petrzalske-holuby.webp", desc: "Rýchli hradní posli." },
    "Kabelkový pes": { row: 3, p: 3, img: "Img/kabelkovy-pes.webp", desc: "Panský miláčik usadený na vankúši." },
    "Patkaňe": { row: 3, p: 2, img: "Img/patkane.webp", desc: "Hladná pivničná svorka." },
    "Sviňa lesná": { row: 3, p: 4, img: "Img/svina-lesna.webp", desc: "Zúrivý lesný kanec." },
    "Zatúlaný tatranský medveď": { row: 3, p: 5, img: "Img/tatransky-medved.webp", desc: "Obrovská horská šelma." },
    "Pouličný mačiak": { row: 3, p: 3, img: "Img/poulicny-maciak.webp", desc: "Tichý potulný kocúr." },
    "Komáre": { row: 3, p: 3, img: "Img/komare.webp", desc: "Dotieravé hradné húfy komárov." },

    // PREDMETY
    "Alcohol": { row: 1, p: 0, isItem: true, img: "Img/alkohol.webp", desc: "Medovina pre 1. rad.", abilityDesc: "🛠️ Predmet: Pridáva +1b až +7b ku každej karte v 1. rade." },
    "Kvety": { row: 2, p: 0, isItem: true, img: "Img/kvety.webp", desc: "Kytica pre 2. rad.", abilityDesc: "🛠️ Predmet: Pridáva +1b až +7b ku každej karte v 2. rade." },
    "Medove Orechy": { row: 3, p: 0, isItem: true, img: "Img/medove-orechy.webp", desc: "Odmena pre 3. rad.", abilityDesc: "🛠️ Predmet: Pridáva +1b až +7b ku každej karte v 3. rade." },

    // KÚZLA
    "Musíme sa porozprávať": { row: 0, p: 0, isSpell: true, img: "Img/musime-sa-porozprávať.webp", desc: "Vážny rozhovor.", abilityDesc: "⚡ Zníži základ mužov na 1b." },
    "Upokoj sa": { row: 0, p: 0, isSpell: true, img: "Img/upokoj-sa.webp", desc: "Hnev.", abilityDesc: "⚡ Zníži základ žien na 1b." },
    "Ohnostroj": { row: 0, p: 0, isSpell: true, img: "Img/ohnostroj.webp", desc: "Rachot.", abilityDesc: "⚡ Zníži základ zvierat na 1b." },
    "Šicko v porádku": { row: 0, p: 0, isSpell: true, img: "Img/sicko-v-poradku.webp", desc: "Šašo.", abilityDesc: "⚡ Odstráni kúzla zo stola." }
};

var CLASS_CONFIG = {
    "F": { bonusPwr: 0, matName: "Koža", itemBonus: 1, coinFee: 10 },
    "E": { bonusPwr: 1, matName: "Drevo", itemBonus: 2, coinFee: 25 },
    "D": { bonusPwr: 1, matName: "Kov", itemBonus: 3, coinFee: 50 },
    "C": { bonusPwr: 2, matName: "Bronz", itemBonus: 4, coinFee: 100 },
    "B": { bonusPwr: 2, matName: "Striebro", itemBonus: 5, coinFee: 250 },
    "A": { bonusPwr: 2, matName: "Zlato", itemBonus: 6, coinFee: 500 },
    "S": { bonusPwr: 3, matName: "Mince", itemBonus: 7, coinFee: 0 }
};

var FORGE_RATES = {
    "F->E": { rate: 1.00, from: "F", nextClass: "E", reqMat: "Koža", reqMatCount: 3, coinFee: 10 },
    "E->D": { rate: 0.90, from: "E", nextClass: "D", reqMat: "Drevo", reqMatCount: 3, coinFee: 25 },
    "D->C": { rate: 0.80, from: "D", nextClass: "C", reqMat: "Kov", reqMatCount: 3, coinFee: 50 },
    "C->B": { rate: 0.70, from: "C", nextClass: "B", reqMat: "Bronz", reqMatCount: 3, coinFee: 100 },
    "B->A": { rate: 0.55, from: "B", nextClass: "A", reqMat: "Striebro", reqMatCount: 3, coinFee: 250 },
    "A->S": { rate: 0.40, from: "A", nextClass: "S", reqMat: "Zlato", reqMatCount: 3, coinFee: 500 }
};

var PERGAMENY_CONFIG = {
    "none": { name: "Bez Zvitku", goldCost: 0, rateBonus: 0.00, saveCard: false },
    "basic": { name: "Základný Zvitok", goldCost: 100, rateBonus: 0.10, saveCard: true },
    "advanced": { name: "Pokročilý Zvitok", goldCost: 500, rateBonus: 0.25, saveCard: true },
    "legendary": { name: "Legendárny Zvitok", goldCost: 1000, rateBonus: 0.55, saveCard: true }
};

var inventar = {
    mince: 500,
    suroviny: { "Koža": 15, "Drevo": 10, "Kov": 5, "Bronz": 2, "Striebro": 1, "Zlato": 20 },
    karty: {},
    jokers: { "F": 10, "E": 5, "D": 5, "C": 5, "B": 5, "A": 5 },
    zostava: []
};

// 📊 10 REBRÍČKOV
var simulačneRebríčky = {
    vyhry: [ { hrac: "Hráč 1 (Ty)", skore: 12, inaktivny: false, titulCard: "Katy" }, { hrac: "Lord_Grob", skore: 8, inaktivny: false, titulCard: null }, { hrac: "Mníchov_Master", skore: 1, inaktivny: false, titulCard: "Vzbúrenec" } ],
    remizy: [ { hrac: "Mníchov_Master", skore: 5, inaktivny: false, titulCard: "Nela" }, { hrac: "Hráč 1 (Ty)", skore: 2, inaktivny: false, titulCard: null }, { hrac: "Lord_Grob", skore: 0, inaktivny: false, titulCard: "Šaman" } ],
    sClass: [ { hrac: "Lord_Grob", skore: 3, inaktivny: false, titulCard: "Michal" }, { hrac: "Hráč 1 (Ty)", skore: 1, inaktivny: false, titulCard: null }, { hrac: "Mníchov_Master", skore: 0, inaktivny: false, titulCard: "Žobrák" } ],
    aClass: [ { hrac: "Hráč 1 (Ty)", skore: 5, inaktivny: false }, { hrac: "Lord_Grob", skore: 2, inaktivny: false } ],
    bClass: [ { hrac: "Mníchov_Master", skore: 7, inaktivny: false }, { hrac: "Hráč 1 (Ty)", skore: 4, inaktivny: false } ],
    cClass: [ { hrac: "Lord_Grob", skore: 10, inaktivny: false }, { hrac: "Hráč 1 (Ty)", skore: 3, inaktivny: false } ],
    dClass: [ { hrac: "Hráč 1 (Ty)", skore: 15, inaktivny: false }, { hrac: "Mníchov_Master", skore: 8, inaktivny: false } ],
    eClass: [ { hrac: "Mníchov_Master", skore: 20, inaktivny: false }, { hrac: "Lord_Grob", skore: 12, inaktivny: false } ],
    fClass: [ { hrac: "Hráč 1 (Ty)", skore: 45, inaktivny: false }, { hrac: "Lord_Grob", skore: 30, inaktivny: false } ],
    pokusy: [ { hrac: "Hráč 1 (Ty)", skore: 88, inaktivny: false }, { hrac: "Mníchov_Master", skore: 50, inaktivny: false } ]
};

var p1_played_cards = [], p2_played_cards = [];
var p1_erik_buff_row = null, p2_erik_buff_row = null;
var sc1 = 0, sc2 = 0, r1 = 0, r2 = 0, p1Pass = false, p2Pass = false, aktualnyHrac = 1;
var p1_draft_hand = [], p2_draft_hand = [];
var p1_spalene = [], p2_spalene = [], neutralne_vplyvy = [];
var jeSingleplayer = false; var obtiaznostAI = "B"; var blokujVykladanie = false;
var aktualnaStranaKnihy = 1;
var p1MulliganBonusScore = 0, p2MulliganBonusScore = 0;

// AUDIO ENGINE S PAMÄŤOU STÍŠENIA ZVUKU
var hudbaSpustena = false;
var audioMutedByUser = false;
var audioTracks = [ "Audio/track1.mp3", "Audio/track2.mp3", "Audio/track3.mp3", "Audio/track4.mp3", "Audio/track5.mp3", "Audio/track6.mp3" ];
var currentTrackIndex = -1;

function getRegistryCard(meno) {
    if (!meno) return {};
    return MASTER_REGISTRY[meno] || {};
}

function getRealPower(card) {
    if (!card || !card.n) return 0;
    var reg = getRegistryCard(card.n);
    if (reg.isSpell || reg.isItem || reg.isJoker || reg.p === 0) return 0;
    
    var cls = card.cls || "F";
    var bonus = CLASS_CONFIG[cls] ? CLASS_CONFIG[cls].bonusPwr : 0;
    return Math.max(0, reg.p + bonus);
}

// 🏆 SIEŇ SLÁVY
function otvoriťStatistiky() {
    var el = document.getElementById("stats-modal");
    if (el) el.style.display = "flex";
    aktualizujRebríčkyATituly();
}

function aktualizujRebríčkyATituly() {
    Object.keys(simulačneRebríčky).forEach(function(key) {
        var list = simulačneRebríčky[key];
        list.sort(function(a, b) { return b.skore - a.skore; });

        list.forEach(function(item) { item.titulCard = null; });

        var aktivnyTop = list.find(function(item) { return !item.inaktivny; });
        if (aktivnyTop) {
            if (key === "vyhry") aktivnyTop.titulCard = "Katy";
            if (key === "remizy") aktivnyTop.titulCard = "Nela";
            if (key === "sClass") aktivnyTop.titulCard = "Michal";
        }

        var aktivniList = list.filter(function(item) { return !item.inaktivny; });
        if (aktivniList.length > 1) {
            var aktivnyLast = aktivniList[aktivniList.length - 1];
            if (key === "vyhry") aktivnyLast.titulCard = "Vzbúrenec";
            if (key === "remizy") aktivnyLast.titulCard = "Šaman";
            if (key === "sClass") aktivnyLast.titulCard = "Žobrák";
        }
    });

    vykresliGridStatistik();
}

function vykresliGridStatistik() {
    var container = document.getElementById("stats-grid-container");
    if (!container) return;

    var kategorie = [
        { key: "vyhry", nazov: "⚔️ Najviac Výhier" },
        { key: "remizy", nazov: "🤝 Najviac Remíz" },
        { key: "sClass", nazov: "👑 Najviac S-Class Kariet" },
        { key: "aClass", nazov: "💎 Najviac A-Class Kariet" },
        { key: "bClass", nazov: "🔮 Najviac B-Class Kariet" },
        { key: "cClass", nazov: "🥇 Najviac C-Class Kariet" },
        { key: "dClass", nazov: "🛡️ Najviac D-Class Kariet" },
        { key: "eClass", nazov: "📜 Najviac E-Class Kariet" },
        { key: "fClass", nazov: "📦 Najviac F-Class Kariet" },
        { key: "pokusy", nazov: "🔨 Kováčske Pokusy" }
    ];

    var html = "";

    kategorie.forEach(function(kat) {
        var zoznam = simulačneRebríčky[kat.key] || [];
        
        html += `
            <div class="leaderboard-column">
                <h3 class="leaderboard-title">${kat.nazov}</h3>
        `;

        zoznam.forEach(function(item, idx) {
            var rankClass = "";
            if (idx === 0) rankClass = "rank-1";
            else if (idx === 1) rankClass = "rank-2";
            else if (idx === 2) rankClass = "rank-3";
            if (idx === zoznam.length - 1) rankClass += " rank-last";

            var statusTxt = item.inaktivny ? " <span style='color:#ff4d4d;'>💤 (Inaktívny)</span>" : "";
            var platBadge = item.titulCard ? `<span class="plat-badge">👑 ${item.titulCard}</span>` : "";

            html += `
                <div class="leaderboard-item ${rankClass}">
                    <span><strong>#${idx + 1}</strong> ${item.hrac}${statusTxt}</span>
                    <span>${item.skore}b ${platBadge}</span>
                </div>
            `;
        });

        html += `</div>`;
    });

    container.innerHTML = html;
}

// 🧪 DEV CHEATY PRE KOVANIE AŽ PO S-CLASS
function devPridatSurovinyACheaty() {
    inventar.mince += 100000;
    inventar.suroviny["Koža"] = (inventar.suroviny["Koža"] || 0) + 100;
    inventar.suroviny["Drevo"] = (inventar.suroviny["Drevo"] || 0) + 100;
    inventar.suroviny["Kov"] = (inventar.suroviny["Kov"] || 0) + 100;
    inventar.suroviny["Bronz"] = (inventar.suroviny["Bronz"] || 0) + 100;
    inventar.suroviny["Striebro"] = (inventar.suroviny["Striebro"] || 0) + 100;
    inventar.suroviny["Zlato"] = (inventar.suroviny["Zlato"] || 0) + 5000;

    Object.keys(MASTER_REGISTRY).forEach(function(t) {
        var reg = MASTER_REGISTRY[t];
        if (!reg.isPlatinum && !reg.isSpell && !reg.isJoker) {
            if (!inventar.karty[t]) inventar.karty[t] = { repliky: {}, aktivnaTrieda: "F" };
            inventar.karty[t].repliky = { "F": 20, "E": 10, "D": 10, "C": 10, "B": 10, "A": 10 };
        }
    });

    inventar.karty["Kráľovský Šampión"] = { repliky: { "F": 1, "E": 3, "D": 3, "C": 3, "B": 3, "A": 3 }, aktivnaTrieda: "F" };

    ukazOznamenie("⚡ DEV CHEAT AKTIVOVANÝ", "Pridané mince, Zlato, suroviny a duplikáty F/E/D/C/B/A pre testovanie kovania až po S-Class!");
    aktualizujPanelDielne();
    vykresliRozbalovaciBatoh();
}

// 🎬 ANIMÁCIA KOVANIA (S OPRAVENÝM ZASEKÁVANÍM S-CLASS)
function spustitVideoAnimationKovania(meno, oldCls, nextCls, isSuccess, wasProtected) {
    pozastavitHudbuPreVideo();

    var overlay = document.createElement("div");
    overlay.id = "forge-video-overlay";

    var reg = getRegistryCard(meno);
    var oldPwr = getRealPower({ n: meno, cls: oldCls });
    var nextPwr = getRealPower({ n: meno, cls: nextCls });

    var fourthCardHtml = isSuccess ? `
        <div id="forge-card-4" class="karta cls-${nextCls} forge-slot-card" style="opacity:0;">
            ${vytvorHTMLKarty(meno, nextPwr, nextCls, reg.row, reg.p)}
        </div>
    ` : '';

    overlay.innerHTML = `
        <div class="forge-stage-169">
            <video id="forge-video-element" src="Img/vylepsovanie.mp4" autoplay playsinline></video>
            <div class="forge-cards-container">
                <div id="forge-card-1" class="karta cls-${oldCls} forge-slot-card">${vytvorHTMLKarty(meno, oldPwr, oldCls, reg.row, reg.p)}</div>
                <div id="forge-card-2" class="karta cls-${oldCls} forge-slot-card">${vytvorHTMLKarty(meno, oldPwr, oldCls, reg.row, reg.p)}</div>
                <div id="forge-card-3" class="karta cls-${oldCls} forge-slot-card">${vytvorHTMLKarty(meno, oldPwr, oldCls, reg.row, reg.p)}</div>
                ${fourthCardHtml}
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    var card1 = document.getElementById("forge-card-1");
    var card2 = document.getElementById("forge-card-2");
    var card3 = document.getElementById("forge-card-3");
    var card4 = document.getElementById("forge-card-4");

    setTimeout(function() {
        if (card1) card1.style.opacity = "0";
        if (card2) card2.style.opacity = "0";
        if (card3) card3.style.opacity = "0";
    }, 3800);

    setTimeout(function() {
        if (isSuccess && card4) {
            card4.style.opacity = "1";
        }
    }, 7800);

    var vid = document.getElementById("forge-video-element");
    vid.onended = function() {
        if (reg.isJoker) {
            // SPRACOVANIE PRE JOKER CARD
            if (isSuccess) {
                inventar.jokers[oldCls] = Math.max(0, (inventar.jokers[oldCls] || 0) - 3);
                inventar.jokers[nextCls] = (inventar.jokers[nextCls] || 0) + 1;
                ukazOznamenie("🎉 JOKER ÚSPEŠNE VYKOVANÝ!", "Vykoval si nový <strong>Joker Card (" + nextCls + "-Class)</strong>!");
            } else {
                if (!wasProtected) {
                    inventar.jokers[oldCls] = Math.max(0, (inventar.jokers[oldCls] || 0) - 1);
                    ukazOznamenie("💥 KOVANIE ZLYHALO!", "1x Joker Card zhoral v plameňoch!");
                } else {
                    ukazOznamenie("🛡️ JOKER OCHRÁNENÝ!", "Zvitok ochrany zachránil tvoju Joker Kartu!");
                }
            }
        } else {
            // SPRACOVANIE PRE BEŽNÉ & TURNAJOVÉ KARTY (BEZ ZASEKNUTIA)
            var t = inventar.karty[meno];
            if (!t) { inventar.karty[meno] = { repliky: {}, aktivnaTrieda: "F" }; t = inventar.karty[meno]; }
            if (typeof t.repliky !== "object") t.repliky = {};

            if (isSuccess) {
                t.repliky[oldCls] = Math.max(0, (t.repliky[oldCls] || 0) - 3);
                t.aktivnaTrieda = nextCls;
                if (nextCls !== "S") {
                    t.repliky[nextCls] = (t.repliky[nextCls] || 0) + 1;
                }
                ukazOznamenie("🎉 KOVANIE ÚSPEŠNÉ!", "Karta <strong>" + meno + "</strong> bola povýšená na <strong>" + nextCls + "-Class</strong>!");
                
                if (nextCls === "S") {
                    vyhlasGlobalnySClassOznam("Hráč 1 (Ty)", meno);
                }
            } else {
                if (!wasProtected && !reg.isTournamentUnique) {
                    t.repliky[oldCls] = Math.max(0, (t.repliky[oldCls] || 0) - 1);
                    ukazOznamenie("💥 KOVANIE ZLYHALO!", "Suroviny zhoreli v plameňoch a prišiel si o 1 duplikát karty!");
                } else {
                    ukazOznamenie("🛡️ KARTA OCHRÁNENÁ!", "Kovanie zlyhalo, ale Zvitok alebo Turnajová Imunita ochránila tvoju kartu!");
                }
            }
        }

        overlay.remove();
        obnovitHudbuPoVideu();
        aktualizujPanelDielne();
        vykresliRozbalovaciBatoh();
    };
}

// 📦 ANONYMNÉ TRHOVISKO S MENOM VEDÚCEHO & ČISTÝMI BALÍČKAMI
var aukcnyCasomeračInterval = null;
var aktualnyAnonymnyStrop = 250; 
var trhovaPriemernaCenaEMA = 210; 
var aktualnyVeduciHrac = "Lord_Grob_33";

function vygenerujSimulaciuTrhu() {
    var e = document.getElementById("obchod-regaly-zoznam");
    if (!e) return;

    var reg = MASTER_REGISTRY["Neviditeľný Mário"];
    var realPwr = getRealPower({ n: "Neviditeľný Mário", cls: "E" });

    e.innerHTML = `
        <div style="background:#1e140a; border:2px solid #d4af37; padding:15px; border-radius:10px; text-align:center; margin-bottom:20px;">
            <h3 style="color:#d4af37; margin-top:0;">👑 ANONYMNÉ AUKČNÉ TRHOVISKO</h3>
            <p style="font-size:0.9em; color:#ccc;">Predávaj samostatné karty aj HOMOGÉNNE Balíčky (rovnaká karta & trieda)!</p>
            <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:10px;">
                <button onclick="ukazOznamenie('📦 Vytvoriť Balíček', 'Predávaš 10x E-Class Neviditeľný Mário v balíku! Zalistovací poplatok vopred je 15 mincí!')" class="btn-dev-action">📦 Predať Balíček (10x E-Mário)</button>
                <button onclick="testSimulaciaPrihodeniaBota()" class="btn-dev-action">🤖 Simulovať prihodenie Bota</button>
                <button onclick="testSimulaciaRychlychPredajov()" class="btn-dev-action">📊 Simulovať 10 predajov (EMA Indikátor)</button>
            </div>
        </div>

        <div class="auction-card-box">
            <div class="karta cls-E">
                ${vytvorHTMLKarty("Neviditeľný Mário", realPwr, "E", reg.row, reg.p)}
            </div>
            
            <div style="flex-grow:1;">
                <h3 style="color:#ffcc00; margin:0 0 5px 0;">Neviditeľný Mário (E-Class) - 10x Balíček</h3>
                <p style="margin:2px 0; color:#aaa; font-size:0.9em;">Predajca: <strong>Mníchov_Master</strong></p>
                
                <div style="background:rgba(0,0,0,0.5); border:1px solid #5a4d3e; padding:12px; border-radius:6px; margin:10px 0; max-width:440px;">
                    <div>⏱️ Čas aukcie: <span id="auction-timer" style="color:#ffcc00; font-weight:bold;">00:59:59</span> <small style="color:#888;">(Anti-Snipe: +3m)</small></div>
                    <div style="margin-top:4px;">👑 Aktuálne najvyššia ponuka (Vedie): <strong style="color:#ffcc00;" id="auction-leader">${aktualnyVeduciHrac}</strong></div>
                    <div style="margin-top:4px;">📊 Indikátor Ceny (EMA): <strong style="color:#3b82f6;">${trhovaPriemernaCenaEMA} m</strong></div>
                    <div style="margin-top:4px;">💰 Okamžitý Výkup (Strop): <strong style="color:#10b981;">${aktualnyAnonymnyStrop} m</strong></div>
                </div>

                <div style="display:flex; gap:10px;">
                    <button onclick="anonymnePrihoditSumu(${aktualnyAnonymnyStrop})" style="background:linear-gradient(180deg, #3b2d1d 0%, #21180e 100%); color:#ffcc00; border:1px solid #d4af37; padding:10px 18px; border-radius:6px; font-weight:bold; cursor:pointer;">🕵️ Anonymne Prihodiť</button>
                    <button onclick="okamziteOdkupitKartu(${aktualnyAnonymnyStrop}, 'Balíček 10x E-Mário')" style="background:#10b981; color:#fff; border:none; padding:10px 18px; border-radius:6px; font-weight:bold; cursor:pointer;">⚡ Kúpiť Ihneď za ${aktualnyAnonymnyStrop}m</button>
                </div>
            </div>
        </div>
    `;

    spustitOdpocitavanieAukcie();
}

function anonymnePrihoditSumu(stropVal) {
    var ponukaStr = prompt("Zadaj svoju tajnú anonymnú ponuku v minciach (Strop pre okamžitý výkup je " + stropVal + "m):");
    if (!ponukaStr) return;
    var ponuka = parseInt(ponukaStr);

    if (isNaN(ponuka) || ponuka <= 0) { ukazOznamenie("⚠️ CHYBA", "Zadaj platné číslo!"); return; }
    if (inventar.mince < ponuka) { ukazOznamenie("⚠️ NEDOSTATOK MINCÍ", "Nemáš dostatok mincí v batohu!"); return; }

    if (ponuka >= stropVal) {
        inventar.mince -= stropVal;
        ukazOznamenie("⚡ AUTOMATICKÝ VÝKUP!", "Tvoja ponuka (" + ponuka + "m) presiahla hodnotu Okamžitého výkupu (" + stropVal + "m). Položka je okamžite tvoja za " + stropVal + "m!");
        vykresliRozbalovaciBatoh();
    } else {
        aktualnyVeduciHrac = "Hráč 1 (Ty)";
        var lEl = document.getElementById("auction-leader");
        if (lEl) lEl.innerText = aktualnyVeduciHrac;
        ukazOznamenie("🕵️ PONUKA ZAREGISTROVANÁ", "Tvoja anonymná ponuka bola odoslaná! Teraz si na **1. mieste** ako najvyšší prihadzujúci!");
    }
}

function okamziteOdkupitKartu(stropVal, nazov) {
    if (inventar.mince < stropVal) { ukazOznamenie("⚠️ NEDOSTATOK MINCÍ", "Potrebuješ " + stropVal + "m na okamžitý výkup!"); return; }
    inventar.mince -= stropVal;
    ukazOznamenie("🎉 KÚPENÉ IHNEĎ!", "Zaplatil si " + stropVal + "m. Položka " + nazov + " ti pristala v batohu!");
    vykresliRozbalovaciBatoh();
}

function testSimulaciaPrihodeniaBota() {
    aktualnyVeduciHrac = "Bot_Tester_" + Math.floor(Math.random() * 100);
    var lEl = document.getElementById("auction-leader");
    if (lEl) lEl.innerText = aktualnyVeduciHrac;
    ukazOznamenie("🤖 PRIHODENIE BOTA", "Súper <strong>" + aktualnyVeduciHrac + "</strong> ťa práve prehodil a prevzal 1. miesto!");
}

function testSimulaciaRychlychPredajov() {
    trhovaPriemernaCenaEMA = Math.floor(Math.random() * 80) + 200;
    vygenerujSimulaciuTrhu();
    ukazOznamenie("📊 TEST EMA INDIKÁTORA", "Indikátor trhu sa prispôsobil na **" + trhovaPriemernaCenaEMA + " m**!");
}

function spustitOdpocitavanieAukcie() {
    if (aukcnyCasomeračInterval) clearInterval(aukcnyCasomeračInterval);
    var sekundyCelkom = 3599;
    aukcnyCasomeračInterval = setInterval(function() {
        var timerEl = document.getElementById("auction-timer");
        if (!timerEl) { clearInterval(aukcnyCasomeračInterval); return; }

        var h = Math.floor(sekundyCelkom / 3600);
        var m = Math.floor((sekundyCelkom % 3600) / 60);
        var s = sekundyCelkom % 60;

        timerEl.innerText = (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
        if (sekundyCelkom > 0) sekundyCelkom--;
        else clearInterval(aukcnyCasomeračInterval);
    }, 1000);
}

// 🔨 DIELŇA & KOVANIE JOKERA
function aktualizujPanelDielne() {
    var e = document.getElementById("dielna-zoznam");
    if (!e) return;
    e.innerHTML = "";

    var devBtnDiv = document.createElement("div");
    devBtnDiv.style.gridColumn = "1/-1";
    devBtnDiv.style.marginBottom = "15px";
    devBtnDiv.innerHTML = `<button onclick="devPridatSurovinyACheaty()" style="background:#8b5cf6; color:#fff; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; cursor:pointer; width:100%;">⚡ DEV CHEAT: Pridať 100 000 Mincí, Zlato & Suroviny pre Kovanie až po S-Class</button>`;
    e.appendChild(devBtnDiv);

    // PRIAME ZOBRAZENIE JOKER KARTY NA KOVANIE V DIELNI
    var jokerWrapper = document.createElement("div");
    jokerWrapper.className = "karta-karta-wrapper";
    jokerWrapper.style.borderColor = "#a855f7";

    var jokerCardDiv = document.createElement("div");
    jokerCardDiv.className = "karta cls-JOKER";
    jokerCardDiv.innerHTML = vytvorHTMLKarty("Joker Card", "none", "JK", 0, 0);

    var jokerCountsText = `F:${inventar.jokers["F"]||0} | E:${inventar.jokers["E"]||0} | D:${inventar.jokers["D"]||0} | C:${inventar.jokers["C"]||0} | B:${inventar.jokers["B"]||0} | A:${inventar.jokers["A"]||0}`;

    jokerWrapper.appendChild(jokerCardDiv);
    var jokerActions = document.createElement("div");
    jokerActions.style.width = "100%";
    jokerActions.innerHTML = `
        <div style="font-size:0.75em; margin:6px 0; color:#a855f7; text-align:center;">
            Joker Zásoby: <strong>${jokerCountsText}</strong>
        </div>
        <select id="step-select-JokerCard" style="width:100%; font-size:0.75em; margin-bottom:4px; background:#110e0c; color:#ffcc00; border:1px solid #5a4d3e; padding:3px;">
            <option value="F->E">F ➔ E (3xF JK | 10m | Koža)</option>
            <option value="E->D">E ➔ D (3xE JK | 25m | Drevo)</option>
            <option value="D->C">D ➔ C (3xD JK | 50m | Kov)</option>
            <option value="C->B">C ➔ B (3xC JK | 100m | Bronz)</option>
            <option value="B->A">B ➔ A (3xB JK | 250m | Striebro)</option>
        </select>
        <button class="btn-forge" style="background:#8b5cf6;" onclick="vylepsiKartuVoForge('Joker Card', document.getElementById('step-select-JokerCard').value, 'none')">🔨 Vykovat Jokera</button>
    `;
    jokerWrapper.appendChild(jokerActions);
    e.appendChild(jokerWrapper);

    // OBYČAJNÉ & TURNAJOVÉ KARTY
    Object.keys(MASTER_REGISTRY).forEach(function(t) {
        var reg = MASTER_REGISTRY[t];
        if (reg.isPlatinum || reg.isSpell || reg.isJoker) return;

        if (!inventar.karty[t]) inventar.karty[t] = { repliky: { "F": 1 }, aktivnaTrieda: "F" };
        var cardData = inventar.karty[t];

        if (typeof cardData.repliky !== "object") {
            var val = cardData.repliky || 0;
            cardData.repliky = { "F": val };
        }

        var wrapper = document.createElement("div");
        wrapper.className = "karta-karta-wrapper";

        var cardDiv = document.createElement("div");
        cardDiv.className = "karta cls-" + cardData.aktivnaTrieda;
        var realPwr = getRealPower({ n: t, cls: cardData.aktivnaTrieda });
        cardDiv.innerHTML = vytvorHTMLKarty(t, realPwr, cardData.aktivnaTrieda, reg.row, reg.p);

        var countsText = `F:${cardData.repliky["F"] || 0} | E:${cardData.repliky["E"] || 0} | D:${cardData.repliky["D"] || 0} | C:${cardData.repliky["C"] || 0} | B:${cardData.repliky["B"] || 0} | A:${cardData.repliky["A"] || 0}`;

        var actions = `
            <div style="font-size:0.75em; margin:6px 0; color:#ffcc00; text-align:center;">
                Počty: <strong>${countsText}</strong>
            </div>
            
            <label style="font-size:0.75em; color:#aaa;">Krok kovania:</label>
            <select id="step-select-${t.replace(/\s+/g, '')}" style="width:100%; font-size:0.75em; margin-bottom:4px; background:#110e0c; color:#ffcc00; border:1px solid #5a4d3e; padding:3px;">
                <option value="F->E">F ➔ E (3xF | 10m | Koža)</option>
                <option value="E->D">E ➔ D (3xE | 25m | Drevo)</option>
                <option value="D->C">D ➔ C (3xD | 50m | Kov)</option>
                <option value="C->B">C ➔ B (3xC | 100m | Bronz)</option>
                <option value="B->A">B ➔ A (3xB | 250m | Striebro)</option>
                <option value="A->S">A ➔ S (3xA | 500m | Zlato)</option>
            </select>

            <label style="font-size:0.75em; color:#aaa;">Zvitok ochrany:</label>
            <select id="pergamen-select-${t.replace(/\s+/g, '')}" style="width:100%; font-size:0.75em; margin-bottom:6px; background:#110e0c; color:#ffcc00; border:1px solid #5a4d3e; padding:3px;">
                <option value="none">Bez Zvitku (0g / Risk)</option>
                <option value="basic">Základný Zvitok (100g / +10%)</option>
                <option value="advanced">Pokročilý Zvitok (500g / +25%)</option>
                <option value="legendary">Legendárny Zvitok (1000g / +55%)</option>
            </select>

            <button class="btn-forge" onclick="vylepsiKartuVoForge('${t}', document.getElementById('step-select-${t.replace(/\s+/g, '')}').value, document.getElementById('pergamen-select-${t.replace(/\s+/g, '')}').value)">🔨 Forge</button>
        `;

        wrapper.appendChild(cardDiv);
        var actDiv = document.createElement("div");
        actDiv.style.width = "100%";
        actDiv.innerHTML = actions;
        wrapper.appendChild(actDiv);

        e.appendChild(wrapper);
    });
}

function vylepsiKartuVoForge(meno, transitionKey, pergamenType) {
    var cfg = FORGE_RATES[transitionKey];
    if (!cfg) return;

    var fromCls = cfg.from;
    var nextCls = cfg.nextClass;
    var reg = getRegistryCard(meno);

    if (reg.isJoker) {
        var countJokers = inventar.jokers[fromCls] || 0;
        if (countJokers < 3) { ukazOznamenie("⚠️ NEDOSTATOK JOKEROV", "Potrebuješ 3x " + fromCls + "-Joker Cards na povýšenie!"); return; }
    } else {
        var t = inventar.karty[meno];
        if (!t) return;
        var countCurrent = (typeof t.repliky === "object") ? (t.repliky[fromCls] || 0) : t.repliky;
        var countJoker = inventar.jokers[fromCls] || 0;

        if ((countCurrent + countJoker) < 3) {
            ukazOznamenie("⚠️ NEDOSTATOK KARIET", "Potrebuješ 3x rovnocenné karty (alebo Jokerov)!");
            return;
        }
    }

    var reqMat = cfg.reqMat;
    if ((inventar.suroviny[reqMat] || 0) < cfg.reqMatCount) {
        ukazOznamenie("⚠️ NEDOSTATOK SUROVÍN", "Potrebuješ " + cfg.reqMatCount + "x " + reqMat + "!");
        return;
    }

    if (inventar.mince < cfg.coinFee) {
        ukazOznamenie("⚠️ NEDOSTATOK MINCÍ", "Potrebuješ " + cfg.coinFee + "m za poplatok!");
        return;
    }

    var pCfg = PERGAMENY_CONFIG[pergamenType || "none"];
    inventar.mince -= cfg.coinFee;
    inventar.suroviny[reqMat] -= cfg.reqMatCount;

    var finalRate = Math.min(0.95, cfg.rate + pCfg.rateBonus);
    var roll = Math.random();
    var isSuccess = (roll <= finalRate);

    spustitVideoAnimationKovania(meno, fromCls, nextCls, isSuccess, pCfg.saveCard);
}

// 🎬 TRUHLICE OVERLAY WITH AUDIO MEMORY
function otvorTruhluVitaza() { spustitVideoAnimationTruhly("vitaz"); }
function otvorTruhluUcastnika() { spustitVideoAnimationTruhly("ucastnik"); }

function vyhodnotKoniecZapasu() {
    var typTruhly = (r1 >= 2 && r2 < 2) ? "vitaz" : "ucastnik";
    spustitVideoAnimationTruhly(typTruhly);
}

function spustitVideoAnimationTruhly(typ) {
    pozastavitHudbuPreVideo();

    var overlay = document.createElement("div");
    overlay.id = "chest-video-overlay";
    var videoSrc = (typ === "vitaz") ? "Img/truhlavitaza.mp4" : "Img/truhlaucastnika.mp4";

    overlay.innerHTML = `
        <video id="chest-video-element" src="${videoSrc}" autoplay playsinline></video>
        <div id="chest-click-prompt" class="chest-prompt-text">🎬 KLIKNI PRE SPENIE ANIMÁCIE TRUHLE</div>
    `;

    document.body.appendChild(overlay);

    var vid = document.getElementById("chest-video-element");
    var promptTxt = document.getElementById("chest-click-prompt");

    overlay.onclick = function() {
        if (vid.paused) {
            vid.play();
            promptTxt.style.display = "none";
        }
    };

    vid.onended = function() {
        doplnOdmenyAUpravUI(typ, overlay);
    };
}

function doplnOdmenyAUpravUI(typ, overlayElement) {
    var coinsEarned = (typ === "vitaz") ? Math.floor(Math.random() * 151) + 150 : Math.floor(Math.random() * 51) + 50;
    inventar.mince += coinsEarned;

    var rewardsBox = document.createElement("div");
    rewardsBox.className = "chest-rewards-modal";
    rewardsBox.innerHTML = `
        <h2>🎉 TRUHLA OTVORENÁ!</h2>
        <p style="color:#aaa;">Získal si +${coinsEarned} Mincí a suroviny!</p>
        <button onclick="zatvoritTruhluAOpustit('${overlayElement.id}')" style="background:#10b981; color:#fff; border:none; padding:12px 35px; border-radius:6px; font-weight:bold; cursor:pointer;">Zobrať Všetko</button>
    `;

    overlayElement.appendChild(rewardsBox);
    vykresliRozbalovaciBatoh();
}

function zatvoritTruhluAOpustit(overlayId) {
    var el = document.getElementById(overlayId);
    if (el) el.remove();
    obnovitHudbuPoVideu();
    zobraziťObrazovku("hlavne-menu");
}

// 🔊 AUDIO S PAMÄŤOU MANUÁLNEHO STÍŠENIA
function prepniZvuk() {
    var audio = document.getElementById("bg-music");
    var btn = document.getElementById("mute-btn");
    if (!audio) return;
    if (audio.paused) {
        audio.play();
        hudbaSpustena = true;
        audioMutedByUser = false;
        if (btn) btn.innerText = "🔊";
    } else {
        audio.pause();
        audioMutedByUser = true;
        if (btn) btn.innerText = "🔇";
    }
}

function pozastavitHudbuPreVideo() {
    var audio = document.getElementById("bg-music");
    if (audio && !audio.paused) audio.pause();
}

function obnovitHudbuPoVideu() {
    var audio = document.getElementById("bg-music");
    if (audio && audio.paused && hudbaSpustena && !audioMutedByUser) {
        audio.play().catch(function(e) {});
    }
}

function prehratDalsiSong() {
    var audio = document.getElementById("bg-music");
    if (!audio) return;

    var novyIndex;
    do {
        novyIndex = Math.floor(Math.random() * audioTracks.length);
    } while (novyIndex === currentTrackIndex && audioTracks.length > 1);

    currentTrackIndex = novyIndex;
    audio.src = audioTracks[currentTrackIndex];
    if (!audioMutedByUser) {
        audio.play().then(function() { hudbaSpustena = true; }).catch(function(e) {});
    }
    audio.onended = function() { prehratDalsiSong(); };
}

function spustitHudbuPoPrvomKliknuti() {
    if (!hudbaSpustena && !audioMutedByUser) prehratDalsiSong();
}

function upravHlasitost(val) {
    var audio = document.getElementById("bg-music");
    if (audio) audio.volume = val;
}

// 🛡️ SČÍTATEĽNÉ SETOVÉ BONUSY RADOV
function prepočitajSkoreStola() {
    var isNelaOnTable = false;
    [p1_played_cards, p2_played_cards].forEach(function(list) {
        list.forEach(function(c) { if (c.n === "Nela") isNelaOnTable = true; });
    });

    var p1Katy = p1_played_cards.some(function(c) { return c.n === "Katy"; });
    var p2Katy = p2_played_cards.some(function(c) { return c.n === "Katy"; });

    sc1 = vypocitajSiluHracovychKariet(1, p1_played_cards, p2_played_cards, isNelaOnTable, p1Katy, p2Katy, p1_erik_buff_row) + p1MulliganBonusScore;
    sc2 = vypocitajSiluHracovychKariet(2, p2_played_cards, p1_played_cards, isNelaOnTable, p2Katy, p1Katy, p2_erik_buff_row) + p2MulliganBonusScore;

    var el1 = document.getElementById("p1-score");
    var el2 = document.getElementById("p2-score");
    if (el1) el1.innerText = sc1;
    if (el2) el2.innerText = sc2;
}

function vypocitajSiluHracovychKariet(pNum, myCards, oppCards, isNela, myKaty, oppKaty, myErikRow) {
    var total = 0;
    var itemRow1 = 0, itemRow2 = 0, itemRow3 = 0;

    myCards.forEach(function(c) {
        var reg = getRegistryCard(c.n);
        if (reg.isItem) {
            var bonus = CLASS_CONFIG[c.cls || "F"].itemBonus;
            if (reg.row === 1) itemRow1 += bonus;
            if (reg.row === 2) itemRow2 += bonus;
            if (reg.row === 3) itemRow3 += bonus;
        }
    });

    var hasAlkohol = myCards.some(function(c) { return c.n === "Alcohol"; });
    var hasSisa = myCards.some(function(c) { return c.n === "Sisa"; });

    var rozhovor = neutralne_vplyvy.indexOf("Musíme sa porozprávať") !== -1;
    var upokojSa = neutralne_vplyvy.indexOf("Upokoj sa") !== -1;
    var ohnostroj = neutralne_vplyvy.indexOf("Ohnostroj") !== -1;

    var rowSetBonus1 = vypocitajSetBonusRadu(1, myCards);
    var rowSetBonus2 = vypocitajSetBonusRadu(2, myCards);
    var rowSetBonus3 = vypocitajSetBonusRadu(3, myCards);

    myCards.forEach(function(c) {
        var reg = getRegistryCard(c.n);
        if (reg.isSpell || reg.isItem || reg.isJoker) return;

        var basePwr = getRealPower(c);

        if (c.n !== "Oli") {
            if (reg.row === 1 && rozhovor) basePwr = 1;
            if (reg.row === 2 && upokojSa) basePwr = 1;
            if (reg.row === 3 && ohnostroj) basePwr = 1;
        }

        if (reg.row === 1) basePwr += itemRow1 + rowSetBonus1;
        if (reg.row === 2) basePwr += itemRow2 + rowSetBonus2;
        if (reg.row === 3) basePwr += itemRow3 + rowSetBonus3;

        var rowMultiplier = 1.0;
        if (!isNela && c.n !== "Oli") {
            if (reg.row === 1 && hasSisa) rowMultiplier += 0.50;
            if (reg.row === 2 && c.n === "Ďuri" && hasAlkohol) rowMultiplier += 1.00;
            if (myErikRow === reg.row) rowMultiplier += 0.50;
            if (c.n === "Michal") rowMultiplier += 1.00;
        }

        var finalPwr = Math.round(basePwr * rowMultiplier);
        if (myKaty) finalPwr += 2;
        if (oppKaty) finalPwr -= 2;

        total += Math.max(0, finalPwr);
    });

    return total;
}

function vypocitajSetBonusRadu(targetRow, cardList) {
    var cardsInRow = cardList.filter(function(c) {
        var r = getRegistryCard(c.n);
        return r.row === targetRow;
    });

    var countE = 0, countD = 0, countC = 0, countB = 0, countA = 0, countS = 0;
    var isTournamentUniqueInRow = false;

    cardsInRow.forEach(function(c) {
        var cls = c.cls || "F";
        var r = getRegistryCard(c.n);
        if (r.isTournamentUnique) isTournamentUniqueInRow = true;

        if (cls === "E") countE++;
        if (cls === "D") countD++;
        if (cls === "C") countC++;
        if (cls === "B") countB++;
        if (cls === "A") countA++;
        if (cls === "S") countS++;
    });

    if (isTournamentUniqueInRow) return 6;

    var bonusTotal = 0;
    if (countS >= 1) bonusTotal += 1;
    if (countA >= 2) bonusTotal += 1;
    if (countB >= 3) bonusTotal += 1;
    if (countC >= 4) bonusTotal += 1;
    if (countD >= 5) bonusTotal += 1;
    if (countE >= 6) bonusTotal += 1;

    return bonusTotal;
}

// 📖 KNIŽNÝ NÁVOD
function otvoriťNavodHry() {
    var modal = document.getElementById("navod-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "navod-modal";
        modal.className = "card-modal";
        modal.onclick = function() { modal.style.display = "none"; };
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div style="background:linear-gradient(135deg, #1c140c 0%, #0d0a07 100%); border:3px solid #d4af37; border-radius:16px; width:94vw; max-width:1150px; height:90vh; padding:25px; box-sizing:border-box; color:#e0d0b0; display:flex; flex-direction:column; position:relative; box-shadow:0 0 50px rgba(0,0,0,0.95);" onclick="event.stopPropagation()">
            <span class="card-modal-close" onclick="document.getElementById('navod-modal').style.display='none'" style="position:absolute; top:15px; right:25px; font-size:2.4em; color:#d4af37; cursor:pointer;">&times;</span>
            
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #5a4d3e; padding-bottom:10px; margin-bottom:15px;">
                <h2 style="color:#d4af37; margin:0; font-size:1.6em; font-family:serif;">📖 KRONIKA A NÁVOD KRÁĽOVSTVA (Strana <span id='book-page-num'>1</span> / 5)</h2>
                <div>
                    <button onclick="posunStraneKnihy(-1)" style="background:#3b2d1d; color:#ffcc00; border:1px solid #d4af37; padding:6px 14px; border-radius:4px; cursor:pointer; font-weight:bold; margin-right:5px;">◀ Predošlá</button>
                    <button onclick="posunStraneKnihy(1)" style="background:#3b2d1d; color:#ffcc00; border:1px solid #d4af37; padding:6px 14px; border-radius:4px; cursor:pointer; font-weight:bold;">Ďalšia ▶</button>
                </div>
            </div>

            <div id="book-content-container" style="flex-grow:1; overflow-y:auto; padding-right:10px;"></div>
        </div>
    `;
    modal.style.display = "flex";
    aktualnaStranaKnihy = 1;
    vykresliStraneKnihy();
}

function posunStraneKnihy(delta) {
    aktualnaStranaKnihy += delta;
    if (aktualnaStranaKnihy < 1) aktualnaStranaKnihy = 1;
    if (aktualnaStranaKnihy > 5) aktualnaStranaKnihy = 5;
    vykresliStraneKnihy();
}

function vykresliStraneKnihy() {
    var pNum = document.getElementById("book-page-num");
    var container = document.getElementById("book-content-container");
    if (!pNum || !container) return;

    pNum.innerText = aktualnaStranaKnihy;

    if (aktualnaStranaKnihy === 1) {
        container.innerHTML = `
            <h3 style="color:#ffcc00;">📜 KAPITOLA I: ŠANCE DROPINGU Z TRUHIEL</h3>
            <p style="font-size:1.05em; line-height:1.6;">Odmeny dostávaš po dokončení zápasu. Obsahujú mince, suroviny a reálne F-kópie kariet do batohu:</p>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-top:20px;">
                <div style="background:rgba(0,0,0,0.5); border:2px solid #5a4d3e; padding:18px; border-radius:10px;">
                    <h4 style="color:#d4af37; margin-top:0; font-size:1.2em;">📦 TRUHLA ÚČASTNÍKA</h4>
                    <ul style="line-height:1.8;">
                        <li><strong>Mince:</strong> 50 až 100 mincí (100% garancia).</li>
                        <li><strong>Karty:</strong> 1× až 3× náhodná F-kópia.</li>
                        <li><strong>Tvrdená koža:</strong> 100% garancia (1× Koža).</li>
                        <li><strong>Zlato:</strong> 10 % šanca na 1g Zlata.</li>
                    </ul>
                </div>
                <div style="background:rgba(0,0,0,0.5); border:2px solid #5a4d3e; padding:18px; border-radius:10px;">
                    <h4 style="color:#ffcc00; margin-top:0; font-size:1.2em;">🏆 TRUHLA VÍŤAZA</h4>
                    <ul style="line-height:1.8;">
                        <li><strong>Mince:</strong> 150 až 300 mincí (100% garancia).</li>
                        <li><strong>Karty (Balík):</strong> 3× až 6× F-kariet.</li>
                        <li><strong>Garantované Zlato:</strong> 2g až 5g Zlata.</li>
                        <li><strong>Jackpot (0.5 %):</strong> Drop 100× F-kariet naraz!</li>
                    </ul>
                </div>
            </div>
        `;
    } else if (aktualnaStranaKnihy === 2) {
        container.innerHTML = `
            <h3 style="color:#ffcc00;">🔨 KAPITOLA II: KOVÁČSKY STROM & JOKER CARD</h3>
            <p style="font-size:1.05em; line-height:1.6;">Na kovanie potrebuješ 3 rovnocenné karty zvolenej triedy (alebo <strong>Joker Cards</strong>) + surovinu + poplatok. Joker sa ková samostatne od F po A a nahradí akúkoľvek chýbajúcu kartu v Dielni!</p>
        `;
    } else if (aktualnaStranaKnihy === 3) {
        container.innerHTML = `
            <h3 style="color:#ffcc00;">🛠️ KAPITOLA III: SETOVÉ BONUSY RADOV</h3>
            <p style="font-size:1.05em; line-height:1.6;">Za určité počty vykovaných kariet v tom istom rade získavaš sčítateľné $+1\text{b}$ bonusy pre celý rad:</p>
            <ul>
                <li><strong>1× S-Class:</strong> +1b pre celý rad</li>
                <li><strong>2× A-Class:</strong> +1b pre celý rad</li>
                <li><strong>3× B-Class:</strong> +1b pre celý rad</li>
                <li><strong>4× C-Class:</strong> +1b pre celý rad</li>
                <li><strong>5× D-Class:</strong> +1b pre celý rad</li>
                <li><strong>6× E-Class:</strong> +1b pre celý rad</li>
            </ul>
        `;
    } else if (aktualnaStranaKnihy === 4) {
        container.innerHTML = `
            <h3 style="color:#ffcc00;">⚡ KAPITOLA IV: PLATINOVÉ & TURNAJOVÉ UNIKÁTY</h3>
            <p style="font-size:1.05em; line-height:1.6;">Platinové karty sú putovné trofeje viazané na rebríčky. Turnajové unikáty existujú len v 1 kuse na celom serveri, v Dielni sa nikdy nezničia a po 30 dňoch inaktivity idú do aukcie s odškodným.</p>
        `;
    } else if (aktualnaStranaKnihy === 5) {
        container.innerHTML = `
            <h3 style="color:#ffcc00;">🛒 KAPITOLA V: ANONYMNÉ TRHOVISKO & AUKCIE</h3>
            <p style="font-size:1.05em; line-height:1.6;">Aukcie prebiehajú anonymne s možnosťou Okamžitého výkupu. Na trh možno vyvesiť aj balíčky kariet rovnakej karty a rovnakej triedy!</p>
        `;
    }
}

// 🖼️ RENDERER MALEJ KARTY
function vytvorHTMLKarty(meno, livePwr, cls, row, origPwr) {
    var reg = getRegistryCard(meno);
    var imgPath = reg.img || "Img/default.webp";
    var cisteMeno = meno.replace(/\s+\d+$/, "").trim();

    var html = "";
    if (livePwr !== "none") {
        html += "<div class='karta-kruh karta-kruh-pwr'>" + livePwr + "</div>";
    }
    
    var renderCls = reg.isPlatinum ? "PLATINUM" : (reg.isJoker ? "JOKER" : cls);
    html += "<div class='karta-kruh karta-kruh-cls cls-" + renderCls + "'>" + (reg.isPlatinum ? "P" : (reg.isJoker ? "JK" : cls)) + "</div>";
    html += "<button class='karta-btn-inspect' title='Zväčšiť kartu' onclick='event.stopPropagation(); otvorDetailKarty(\"" + meno + "\", \"" + cls + "\");'>🔍</button>";
    html += "<div class='karta-foto' style=\"background-image: url('" + encodeURI(imgPath) + "');\"></div>";
    
    html += "<div class='karta-stitok-spodok'>";
    html += "  <div class='karta-nazov'>" + cisteMeno + "</div>";
    html += "</div>";

    return html;
}

// ROZBALOVACÍ BATOH
function prepniRozbalovanieBatohu() {
    var el = document.getElementById("inventory-dropdown-content");
    if (!el) return;
    if (el.style.display === "none" || el.style.display === "") {
        vykresliRozbalovaciBatoh();
        el.style.display = "flex";
    } else {
        el.style.display = "none";
    }
}

function vykresliRozbalovaciBatoh() {
    var el = document.getElementById("inventory-dropdown-content");
    if (!el) return;

    var items = [
        { name: "Mince", val: inventar.mince, img: "Img/mince.webp" },
        { name: "Koža", val: (inventar.suroviny["Koža"] || 0) + "x", img: "Img/koza.webp" },
        { name: "Drevo", val: (inventar.suroviny["Drevo"] || 0) + "x", img: "Img/drevo.webp" },
        { name: "Kov", val: (inventar.suroviny["Kov"] || 0) + "x", img: "Img/zelezo.webp" },
        { name: "Bronz", val: (inventar.suroviny["Bronz"] || 0) + "x", img: "Img/bronz.webp" },
        { name: "Striebro", val: (inventar.suroviny["Striebro"] || 0) + "x", img: "Img/striebro.webp" },
        { name: "Zlato", val: (inventar.suroviny["Zlato"] || 0) + "g", img: "Img/zlato.webp" },
        { name: "Jokers", val: (inventar.jokers["F"] || 0) + "x F-JK", img: "Img/zlato.webp" }
    ];

    var html = "";
    items.forEach(function(item) {
        html += `
            <div class="inventory-mini-card">
                <img src="${item.img}" class="inventory-mini-img" alt="${item.name}">
                <div class="inventory-mini-info">
                    <span class="inventory-mini-title">${item.name}</span>
                    <span class="inventory-mini-val">${item.val}</span>
                </div>
            </div>
        `;
    });

    el.innerHTML = html;
}

// DETAJL KARTY MODAL
function otvorDetailKarty(meno, inicialnaTrieda) {
    var reg = getRegistryCard(meno);
    var modal = document.createElement("div");
    modal.className = "card-modal";
    modal.style.zIndex = "9999999";
    modal.onclick = function() { modal.remove(); };

    modal.innerHTML = `
        <div class="modal-content" style="text-align:center; max-width:580px; background:rgba(15,10,5,0.97);" onclick="event.stopPropagation()">
            <span class="card-modal-close" onclick="this.closest('.card-modal').remove()">&times;</span>
            <h2 style="color:#d4af37; margin-top:0; font-family:Georgia, serif;">🔍 DETAJLNÝ NÁHĽAD KARTY</h2>
            
            <div style="display:flex; justify-content:center; margin:20px 0;">
                <div class="karta cls-${inicialnaTrieda}" style="transform: scale(1.6); transform-origin: center; margin:35px 0;">
                    ${vytvorHTMLKarty(meno, getRealPower({ n: meno, cls: inicialnaTrieda }), inicialnaTrieda, reg.row, reg.p)}
                </div>
            </div>

            <h3 style="color:#ffcc00; margin-top:40px; font-size:1.5em;">${meno}</h3>
            <p style="font-size:1.05em; line-height:1.6; color:#e0d0b0; background:rgba(0,0,0,0.5); padding:15px; border-radius:8px; border:1px solid #5a4d3e;">
                ${reg.abilityDesc || reg.desc || "Obyčajná bojová jednotka."}
            </p>
        </div>
    `;

    document.body.appendChild(modal);
}

function ukazOznamenie(titulok, sprava, callback) {
    var overlay = document.createElement("div");
    overlay.className = "custom-notify-overlay";
    
    overlay.innerHTML = `
        <div class="custom-notify-box">
            <h3 class="custom-notify-title">${titulok}</h3>
            <div class="custom-notify-msg">${sprava}</div>
            <button class="custom-notify-btn" id="notify-confirm-btn">Rozumiem</button>
        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById("notify-confirm-btn").onclick = function() {
        overlay.remove();
        if (typeof callback === "function") callback();
    };
}

function zobraziťObrazovku(idObrazovky) {
    var obrazovky = ["hlavne-menu", "hracia-plocha", "dielna-modal", "obchod-modal", "navod-modal", "deckbuilder-modal", "stats-modal"];
    obrazovky.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.style.display = (id === idObrazovky) ? ((id.includes("modal")) ? "flex" : "block") : ((!id.includes("modal")) ? "none" : el.style.display);
    });
}

function otvoriťDeckbuilder() { document.getElementById("deckbuilder-modal").style.display = "flex"; vygenerujDeckbuilder(); }
function otvoriťObchod() { document.getElementById("obchod-modal").style.display = "flex"; vygenerujSimulaciuTrhu(); }
function otvoriťDielňu() { document.getElementById("dielna-modal").style.display = "flex"; aktualizujPanelDielne(); }

function vygenerujDeckbuilder() {
    var e = document.getElementById("deckbuilder-zoznam");
    if (!e) return;
    e.innerHTML = "";
    Object.keys(MASTER_REGISTRY).forEach(function(t) {
        var reg = MASTER_REGISTRY[t];
        var div = document.createElement("div");
        div.className = "karta cls-" + (reg.isPlatinum ? "PLATINUM" : "F");
        div.innerHTML = vytvorHTMLKarty(t, getRealPower({n:t, cls:"F"}), "F", reg.row, reg.p);
        e.appendChild(div);
    });
}

function spustitZapasLokálnePVP() { jeSingleplayer = false; inicializujNovyZapas(); }
function zobraziťMenuAI() { var obt = prompt("Vyber obtiažnosť AI (A, B, C):", "B"); if (obt) { obtiaznostAI = obt.toUpperCase(); spustitZapasProtiAI(); } }
function spustitZapasProtiAI() { jeSingleplayer = true; inicializujNovyZapas(); }

function vygenerujRuku10Kariet() {
    var keys = Object.keys(MASTER_REGISTRY);
    var hand = [];
    for (var i = 0; i < 10; i++) {
        var k = keys[Math.floor(Math.random() * keys.length)];
        hand.push({ n: k, cls: "F" });
    }
    return hand;
}

function inicializujNovyZapas() {
    p1_played_cards = []; p2_played_cards = [];
    p1_spalene = []; p2_spalene = [];
    neutralne_vplyvy = [];
    p1_erik_buff_row = null; p2_erik_buff_row = null;
    r1 = 0; r2 = 0; sc1 = 0; sc2 = 0;
    p1Pass = false; p2Pass = false;
    p1MulliganBonusScore = 0; p2MulliganBonusScore = 0;
    aktualnyHrac = 1; blokujVykladanie = false;

    p1_draft_hand = vygenerujRuku10Kariet();
    p2_draft_hand = vygenerujRuku10Kariet();

    zobraziťObrazovku("hracia-plocha");
    vykresliHraciuPlochu();
    otvorMulliganModal();
}

function otvorMulliganModal() {
    var modal = document.createElement("div");
    modal.id = "mulligan-modal-overlay";
    modal.className = "card-modal";
    modal.style.zIndex = "99999";

    modal.innerHTML = `
        <div class="mulligan-modal-box">
            <h2 style="color:#d4af37; margin-top:0;">🃏 MULLIGAN FÁZA (10 Kariet)</h2>
            <p style="font-size:1.1em; line-height:1.6; color:#ccc;">Preskúmaj svoju ruku. Chceš vymeniť všetkých 10 kariet?</p>
            <div style="background:rgba(255,77,77,0.15); border:1px solid #ff4d4d; padding:10px; border-radius:6px; color:#ff9999; font-size:0.9em; margin:15px 0;">
                ⚠️ TREST ZA RISK: Súper získa +4b náskok!
            </div>
            <div class="mulligan-btn-group">
                <button onclick="potvrditMulliganRuku(false)" style="background:#10b981; color:#fff; border:none; padding:12px 25px; border-radius:6px; font-weight:bold; cursor:pointer;">✅ Hrať</button>
                <button onclick="potvrditMulliganRuku(true)" style="background:#8b0000; color:#fff; border:1px solid #ff4d4d; padding:12px 25px; border-radius:6px; font-weight:bold; cursor:pointer;">🎲 Vymeniť (+4b Súper)</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function potvrditMulliganRuku(chceRiskovat) {
    var el = document.getElementById("mulligan-modal-overlay");
    if (el) el.remove();

    if (chceRiskovat) {
        p1_draft_hand = vygenerujRuku10Kariet();
        p2MulliganBonusScore += 4;
        ukazOznamenie("🎲 MULLIGAN RISK", "Potiahol si 10 nových kariet! Súper má +4b náskok!");
    } else {
        ukazOznamenie("✅ RUKA POTVRDENÁ", "Zápas začína. Si na ťahu!");
    }

    vykresliHraciuPlochu();
}

function vykresliRukuHraca(pNum) {
    var handContainer = document.getElementById("p" + pNum + "-hand");
    if (!handContainer) return;

    handContainer.innerHTML = "";
    var hand = (pNum === 1) ? p1_draft_hand : p2_draft_hand;

    hand.forEach(function(card, idx) {
        var reg = getRegistryCard(card.n);
        var cls = card.cls || "F";
        var pwr = getRealPower(card);

        var cardDiv = document.createElement("div");
        cardDiv.className = "karta cls-" + (reg.isPlatinum ? "PLATINUM" : cls);
        if (pNum !== aktualnyHrac || (pNum === 1 && p1Pass) || (pNum === 2 && p2Pass)) cardDiv.classList.add("karta-disabled");

        cardDiv.innerHTML = vytvorHTMLKarty(card.n, reg.isSpell || reg.isItem || reg.isJoker ? "none" : pwr, cls, reg.row, reg.p);
        cardDiv.onclick = function() { vylozitKartuZRuky(pNum, idx); };
        handContainer.appendChild(cardDiv);
    });
}

function vykresliStol() {
    for (var r = 1; r <= 3; r++) {
        var el1 = document.getElementById("p1-row" + r);
        var el2 = document.getElementById("p2-row" + r);
        if (el1) el1.innerHTML = "";
        if (el2) el2.innerHTML = "";
    }

    var neutralEl = document.getElementById("neutral-row");
    if (neutralEl) neutralEl.innerHTML = "";

    p1_played_cards.forEach(function(c) {
        var reg = getRegistryCard(c.n);
        var targetRow = document.getElementById("p1-row" + reg.row);
        if (targetRow) {
            var div = document.createElement("div");
            div.className = "karta cls-" + (reg.isPlatinum ? "PLATINUM" : (c.cls || "F"));
            div.innerHTML = vytvorHTMLKarty(c.n, getRealPower(c), c.cls || "F", reg.row, reg.p);
            targetRow.appendChild(div);
        }
    });

    p2_played_cards.forEach(function(c) {
        var reg = getRegistryCard(c.n);
        var targetRow = document.getElementById("p2-row" + reg.row);
        if (targetRow) {
            var div = document.createElement("div");
            div.className = "karta cls-" + (reg.isPlatinum ? "PLATINUM" : (c.cls || "F"));
            div.innerHTML = vytvorHTMLKarty(c.n, getRealPower(c), c.cls || "F", reg.row, reg.p);
            targetRow.appendChild(div);
        }
    });
}

function vykresliHraciuPlochu() {
    prepočitajSkoreStola();
    aktualizujKolaUI();
    vykresliStol();
    vykresliRukuHraca(1);
    vykresliRukuHraca(2);
}

function vylozitKartuZRuky(pNum, cardIndex) {
    if (blokujVykladanie) return;
    if (pNum !== aktualnyHrac) return;

    var hand = (pNum === 1) ? p1_draft_hand : p2_draft_hand;
    var playedList = (pNum === 1) ? p1_played_cards : p2_played_cards;

    if (cardIndex < 0 || cardIndex >= hand.length) return;

    var card = hand.splice(cardIndex, 1)[0];
    var reg = getRegistryCard(card.n);

    if (reg.isJoker) {
        ukazOznamenie("⚠️ JOKER CARD", "S Joker Kartou sa nedá hrať v zápase!");
        hand.splice(cardIndex, 0, card);
        return;
    }

    if (reg.isSpell) {
        if (card.n === "Šicko v porádku") neutralne_vplyvy = [];
        else neutralne_vplyvy.push(card.n);
    } else {
        playedList.push(card);
    }

    vykresliHraciuPlochu();
    if ((pNum === 1 && !p2Pass) || (pNum === 2 && !p1Pass)) prepniHracov();
    else spravujAI();
}

function hracPassuje(pNum) {
    if (pNum === 1) p1Pass = true;
    if (pNum === 2) p2Pass = true;
    
    if (p1Pass && p2Pass) skontrolujKoniecKola();
    else prepniHracov();
}

function prepniHracov() {
    if (p1Pass && !p2Pass) aktualnyHrac = 2;
    else if (p2Pass && !p1Pass) aktualnyHrac = 1;
    else aktualnyHrac = (aktualnyHrac === 1) ? 2 : 1;

    vykresliHraciuPlochu();
    spravujAI();
}

function spravujAI() {
    if (jeSingleplayer && aktualnyHrac === 2 && !p2Pass && !blokujVykladanie) {
        setTimeout(vykonajTachAI, 1200);
    }
}

function vykonajTachAI() {
    if (p2Pass || blokujVykladanie) return;
    if (sc2 > sc1 && p1Pass) { hracPassuje(2); return; }
    if (p2_draft_hand.length === 0) { hracPassuje(2); return; }

    var chosenIndex = Math.floor(Math.random() * p2_draft_hand.length);
    vylozitKartuZRuky(2, chosenIndex);
}

function skontrolujKoniecKola() {
    prepočitajSkoreStola();
    blokujVykladanie = true;
    
    if (sc1 > sc2) r1++;
    else if (sc2 > sc1) r2++;
    else { r1++; r2++; }

    aktualizujKolaUI();
    if (r1 >= 2 || r2 >= 2) vyhodnotKoniecZapasu();
    else pripravNoveKolo();
}

function pripravNoveKolo() {
    p1_spalene = p1_spalene.concat(p1_played_cards);
    p2_spalene = p2_spalene.concat(p2_played_cards);
    p1_played_cards = []; p2_played_cards = [];
    neutralne_vplyvy = [];
    p1Pass = false; p2Pass = false; blokujVykladanie = false;

    vykresliHraciuPlochu();
}

function aktualizujKolaUI() {
    var el1 = document.getElementById("p1-rounds");
    var el2 = document.getElementById("p2-rounds");
    if (el1) el1.innerText = "🔴".repeat(r1) || "⚪";
    if (el2) el2.innerText = "🔴".repeat(r2) || "⚪";
}

// INICIALIZÁCIA DOM PO NAČÍTANÍ STRÁNKY
document.addEventListener("DOMContentLoaded", function() {
    zobraziťObrazovku("hlavne-menu");
    aktualizujPanelDielne();
    vygenerujSimulaciuTrhu();
    vykresliRozbalovaciBatoh();
});

// GLOBÁLNE PREPOJENIE FUNKCIÍ
window.spustitZapasLokálnePVP = spustitZapasLokálnePVP;
window.zobraziťMenuAI = zobraziťMenuAI;
window.spustitZapasProtiAI = spustitZapasProtiAI;
window.otvoriťObchod = otvoriťObchod;
window.otvoriťDielňu = otvoriťDielňu;
window.otvoriťDeckbuilder = otvoriťDeckbuilder;
window.otvoriťStatistiky = otvoriťStatistiky;
window.otvoriťNavodHry = otvoriťNavodHry;
window.posunStraneKnihy = posunStraneKnihy;
window.vylepsiKartuVoForge = vylepsiKartuVoForge;
window.devPridatSurovinyACheaty = devPridatSurovinyACheaty;
window.zatvoritTruhluAOpustit = zatvoritTruhluAOpustit;
window.hracPassuje = hracPassuje;
window.vylozitKartuZRuky = vylozitKartuZRuky;
window.zobraziťObrazovku = zobraziťObrazovku;
window.prepniZvuk = prepniZvuk;
window.upravHlasitost = upravHlasitost;
window.otvorTruhluVitaza = otvorTruhluVitaza;
window.otvorTruhluUcastnika = otvorTruhluUcastnika;
window.spustitHudbuPoPrvomKliknuti = spustitHudbuPoPrvomKliknuti;
window.potvrditMulliganRuku = potvrditMulliganRuku;
window.otvorDetailKarty = otvorDetailKarty;
window.ukazOznamenie = ukazOznamenie;
window.prepniRozbalovanieBatohu = prepniRozbalovanieBatohu;
window.anonymnePrihoditSumu = anonymnePrihoditSumu;
window.okamziteOdkupitKartu = okamziteOdkupitKartu;
window.testSimulaciaPrihodeniaBota = testSimulaciaPrihodeniaBota;
window.testSimulaciaRychlychPredajov = testSimulaciaRychlychPredajov;
window.testSimulaciaInaktivity = testSimulaciaInaktivity;
window.testSimulaciaPridatBota = testSimulaciaPridatBota;
window.testSimulaciaGlobalnyOznam = testSimulaciaGlobalnyOznam;
window.vykresliGridStatistik = vykresliGridStatistik;
window.aktualizujPanelDielne = aktualizujPanelDielne;
