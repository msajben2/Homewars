// =========================================================================
// RODINNÁ HRA - HOME WARS (KOMPLETNÝ ENGINE - VERZIA 28.1.0 - DYNAMIC STATS)
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

var VERZIA = "28.1.0";

// =========================================================================
// 1. MASTER REGISTRY (20 PLATINIEK + 19 OBYČAJNÝCH KARIET)
// =========================================================================
var MASTER_REGISTRY = {
    // 🌟 20 PLATINOVÝCH KARIET
    "Zvedavá suseda": { row: 2, p: 7, isPlatinum: true, isSpy: true, img: "Img/zvedava-suseda.webp", desc: "Suseda.", abilityDesc: "🕵️ Špión: Vykladá sa na súperovu stranu. Potiahne ti 2 nové karty." },
    "Ďuri": { row: 1, p: 6, isPlatinum: true, img: "Img/duri.webp", desc: "Veterán.", abilityDesc: "🍺 Taktik: Ak je na stole Alkohol, posilňuje ženský 2. rad o +100%." },
    "Makak": { row: 3, p: 2, isPlatinum: true, isSpy: true, img: "Img/makak.webp", desc: "Lesný šibal.", abilityDesc: "🕵️ Špión: Dáva súperovi len 2b a potiahne ti 2 nové karty!" },
    "Oli": { row: 2, p: 12, isPlatinum: true, img: "Img/oli.webp", desc: "Duchovná matka.", abilityDesc: "✝️ Imunita: Jej 12b sila je nedotknuteľná kúzlam aj spáleniu." },
    "Vinár Dávid": { row: 1, p: 4, isPlatinum: true, isSpy: true, img: "Img/david.webp", desc: "Kráľovský vinár.", abilityDesc: "🕵️ Špión: Vykladá sa súperovi do 1. radu a dá ti 2 nové karty." },
    "Sestrička": { row: 2, p: 3, isPlatinum: true, img: "Img/sestricka.webp", desc: "Ošetrovateľka.", abilityDesc: "🏥 Oživenie: Vráti do hry poslednú spálenú kartu z tvojho archívu." },
    "Vlk": { row: 3, p: 3, isPlatinum: true, img: "Img/vlk.webp", desc: "Vodca svorky.", abilityDesc: "🐾 Svorka: Zvyšuje silu všetkých zvierat v 3. rade o +50%." },
    "Erik": { row: 1, p: 3, isPlatinum: true, img: "Img/erik.webp", desc: "Taktik.", abilityDesc: "📢 Buff: Po vyložení pridá zvolenému radu +50% k celkovej sile." },
    "Sisa": { row: 2, p: 4, isPlatinum: true, img: "Img/sisa.webp", desc: "Dvorná dáma.", abilityDesc: "📢 Dvorná dáma: Zvyšuje silu celého mužského radu o +50%." },
    "Mária Trhovkyňa": { row: 2, p: 9, isPlatinum: true, isSpy: true, img: "Img/maria.webp", desc: "Trhovkyňa.", abilityDesc: "🕵️ Špión: Vyloží sa súperovi a potiahne ti 2 karty (daň 9b)." },
    "Nela": { row: 2, p: 1, isPlatinum: true, img: "Img/nela.webp", desc: "Ochranný štít.", abilityDesc: "🛡️ Štít: Zmrazí stôl! Vypne všetky percentuálne buffy a aury." },
    "Zatúlaný tatranský medveď": { row: 3, p: 5, isPlatinum: true, img: "Img/zatulany-tatransky-medved.webp", desc: "Horská šelma.", abilityDesc: "🔥 Dravec: Automaticky spáli najsilnejšiu kartu/karty na celom stole (okrem seba a Oli)." },
    "Jakub": { row: 1, p: 4, isPlatinum: true, img: "Img/jakub.webp", desc: "Pevnostný strážca.", abilityDesc: "🔥 Bojovník: Automaticky spáli najsilnejšiu kartu/karty na celom stole (okrem seba a Oli)." },
    "Kika": { row: 2, p: 3, isPlatinum: true, isSpy: true, img: "Img/kika.webp", desc: "Archivárka.", abilityDesc: "🕵️ Špión: Vykladá sa na súperovu stranu. Potiahne ti 2 nové karty." },
    "Doktor": { row: 1, p: 5, isPlatinum: true, img: "Img/doktor.webp", desc: "Lekár.", abilityDesc: "🏥 Oživenie: Vráti do hry poslednú spálenú kartu z tvojho archívu." },
    "Michal": { row: 1, p: 5, isPlatinum: true, img: "Img/michal.webp", desc: "Obchodník.", abilityDesc: "📢 Obchodník: Ak nie je na stole Nela, dáva sám sebe buff +100% k sile." },
    "Kornélia": { row: 2, p: 3, isPlatinum: true, img: "Img/kornelia.webp", desc: "Bylinkárka.", abilityDesc: "🏥 Oživenie: Vráti do hry poslednú spálenú kartu z tvojho archívu." },
    "Katy": { row: 1, p: 6, isPlatinum: true, img: "Img/katy.webp", desc: "Kráľovná výhier.", abilityDesc: "💖 Pomoc: Pridáva +2b tvojim kartám a uberá -2b všetkým súperovým kartám." },
    "Krčmár Boris": { row: 1, p: 4, isPlatinum: true, isSpy: true, img: "Img/krcmar-boris.webp", desc: "Hostinský.", abilityDesc: "🕵️ Špión: Vykladá sa súperovi do 1. radu a potiahne ti 2 nové karty." },
    "Marek": { row: 1, p: 4, isPlatinum: true, img: "Img/marek.webp", desc: "Filozof.", abilityDesc: "🧹 Filozof: Cielene zmatie vybranú kartu súpera a pošle ju do archívu." },

    // 🏆 UNIKÁTNA TURNAJOVÁ KARTA
    "Kráľovský Šampión": { row: 1, p: 8, isTournamentUnique: true, img: "Img/neviditelny-mario.webp", desc: "Unikátna turnajová trofej existujúca len v 1 kuse na celom serveri!", abilityDesc: "👑 Turnajový Unikát: Má základ 8b, v Dielni sa NIKDY nezničí a v rade aktivuje plný setový bonus +6b!" },

    // 🃏 JOKER CARD
    "Joker Card": { row: 0, p: 0, isJoker: true, img: "Img/zlato.webp", desc: "Univerzálny kováčsky žolík.", abilityDesc: "🃏 Dielenský Žolík: Nedá sa s ním hrať v zápase, no v Dielni ková od F po A a nahradí akúkoľvek kartu." },

    // 🔨 19 OBYČAJNÝCH KOVÁČSKYCH JEDNOTIEK (F ➔ S)
    // 1. Rad (Muži)
    "Dominik": { row: 1, p: 1, img: "Img/dominik.webp", desc: "Hradné dieťa s dreveným koníkom. Bonus mincí pri výhre." },
    "Marcus": { row: 1, p: 1, img: "Img/marcus.webp", desc: "Zvedavý chlapec s lienkou. Bonus mincí pri výhre." },
    "Timko": { row: 1, p: 1, img: "Img/tymko.webp", desc: "Obranný bojovník s dreveným mečom." },
    "Martin": { row: 1, p: 4, img: "Img/martin.webp", desc: "Šikovný hraničiar a lovec." },
    "Neviditeľný Mário": { row: 1, p: 4, img: "Img/neviditelny-mario.webp", desc: "Tajuplný zbojník v kapucni." },
    "Nicolas": { row: 1, p: 4, img: "Img/nicolas.webp", desc: "Mladý zručný kamenár." },
    "Jaro": { row: 1, p: 5, img: "Img/jaro.webp", desc: "Zručný kováč." },

    // 2. Rad (Ženy)
    "Lula": { row: 2, p: 4, img: "Img/lula.webp", desc: "Dvorná harfistka." },
    "Nika": { row: 2, p: 4, img: "Img/nika.webp", desc: "Hradná kuchárka pri kotli." },
    "Darinka": { row: 2, p: 5, img: "Img/darinka.webp", desc: "Majsterka tkáčka." },
    "Viera": { row: 2, p: 6, img: "Img/viera.webp", desc: "Hradná pekárka." },
    "Anka": { row: 2, p: 7, img: "Img/anka.webp", desc: "Správkyňa hradných kľúčov." },

    // 3. Rad (Zvieratá)
    "Grobské Mravce": { row: 3, p: 1, img: "Img/grobske-mravce.webp", desc: "Húževnatá svorka lesných mravcov." },
    "Petržalské holuby": { row: 3, p: 1, img: "Img/petrzalske-holuby.webp", desc: "Rýchli hradní posli." },
    "Patkaňe": { row: 3, p: 2, img: "Img/patkane.webp", desc: "Hladná pivničná svorka." },
    "Kabelkový pes": { row: 3, p: 3, img: "Img/kabelkovy-pes.webp", desc: "Panský miláčik usadený na vankúši." },
    "Pouličný mačiak": { row: 3, p: 3, img: "Img/poulicny-maciak.webp", desc: "Tichý potulný kocúr." },
    "Komáre": { row: 3, p: 3, img: "Img/komare.webp", desc: "Dotieravé hradné húfy komárov." },
    "Sviňa lesná": { row: 3, p: 4, img: "Img/svina-lesna.webp", desc: "Zúrivý lesný kanec." },
    "Pes ktorý prerástol kabelku": { row: 3, p: 4, img: "Img/pes.webp", desc: "Verný a mohutný strážny pes." },

    // PREDMETY
    "Alcohol": { row: 1, p: 0, isItem: true, img: "Img/alkohol.webp", desc: "Medovina pre 1. rad.", abilityDesc: "🛠️ Predmet: Pridáva +1b až +7b ku každej karte v 1. rade." },
    "Kvety": { row: 2, p: 0, isItem: true, img: "Img/kvety.webp", desc: "Kytica pre 2. rad.", abilityDesc: "🛠️ Predmet: Pridáva +1b až +7b ku každej karte v 2. rade." },
    "Medove Orechy": { row: 3, p: 0, isItem: true, img: "Img/medove-orechy.webp", desc: "Odmena pre 3. rad.", abilityDesc: "🛠️ Predmet: Pridáva +1b až +7b ku každej karte v 3. rade." },

    // KÚZLA
    "Musíme sa porozprávať": { row: 0, p: 0, isSpell: true, img: "Img/musime-sa-porozpravat.webp", desc: "Vážny rozhovor.", abilityDesc: "⚡ Zníži základ mužov na 1b." },
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

// 20 REBRÍČKOV
var simulačneRebríčky = {
    sampión: [ { hrac: "Hráč 1 (Ty)", skore: 12, inaktivny: false, titulCard: "Zvedavá suseda" }, { hrac: "Lord_Grob", skore: 8, inaktivny: false }, { hrac: "Mníchov_Master", skore: 1, inaktivny: false } ],
    nerozhodny: [ { hrac: "Mníchov_Master", skore: 5, inaktivny: false, titulCard: "Ďuri" }, { hrac: "Hráč 1 (Ty)", skore: 2, inaktivny: false }, { hrac: "Lord_Grob", skore: 0, inaktivny: false } ],
    nie_sampión: [ { hrac: "Lord_Grob", skore: 14, inaktivny: false, titulCard: "Makak" }, { hrac: "Hráč 1 (Ty)", skore: 4, inaktivny: false } ],
    sClass: [ { hrac: "Lord_Grob", skore: 3, inaktivny: false, titulCard: "Oli" }, { hrac: "Hráč 1 (Ty)", skore: 1, inaktivny: false } ],
    aClass: [ { hrac: "Hráč 1 (Ty)", skore: 5, inaktivny: false, titulCard: "Vinár Dávid" }, { hrac: "Lord_Grob", skore: 2, inaktivny: false } ],
    bClass: [ { hrac: "Mníchov_Master", skore: 7, inaktivny: false, titulCard: "Sestrička" }, { hrac: "Hráč 1 (Ty)", skore: 4, inaktivny: false } ],
    cClass: [ { hrac: "Lord_Grob", skore: 10, inaktivny: false, titulCard: "Vlk" }, { hrac: "Hráč 1 (Ty)", skore: 3, inaktivny: false } ],
    dClass: [ { hrac: "Hráč 1 (Ty)", skore: 15, inaktivny: false, titulCard: "Erik" }, { hrac: "Mníchov_Master", skore: 8, inaktivny: false } ],
    eClass: [ { hrac: "Mníchov_Master", skore: 20, inaktivny: false, titulCard: "Sisa" }, { hrac: "Lord_Grob", skore: 12, inaktivny: false } ],
    fClass: [ { hrac: "Hráč 1 (Ty)", skore: 45, inaktivny: false, titulCard: "Mária Trhovkyňa" }, { hrac: "Lord_Grob", skore: 30, inaktivny: false } ],
    detailista: [ { hrac: "Hráč 1 (Ty)", skore: 88, inaktivny: false, titulCard: "Nela" }, { hrac: "Mníchov_Master", skore: 50, inaktivny: false } ],
    majster_aukcii: [ { hrac: "Lord_Grob", skore: 450, inaktivny: false, titulCard: "Zatúlaný tatranský medveď" }, { hrac: "Hráč 1 (Ty)", skore: 250, inaktivny: false } ],
    demolator: [ { hrac: "Mníchov_Master", skore: 78, inaktivny: false, titulCard: "Jakub" }, { hrac: "Hráč 1 (Ty)", skore: 45, inaktivny: false } ],
    rozsafny: [ { hrac: "Hráč 1 (Ty)", skore: 1250, inaktivny: false, titulCard: "Kika" }, { hrac: "Lord_Grob", skore: 800, inaktivny: false } ],
    grill_majster: [ { hrac: "Lord_Grob", skore: 18, inaktivny: false, titulCard: "Doktor" }, { hrac: "Hráč 1 (Ty)", skore: 6, inaktivny: false } ],
    fenix: [ { hrac: "Hráč 1 (Ty)", skore: 9, inaktivny: false, titulCard: "Michal" }, { hrac: "Mníchov_Master", skore: 3, inaktivny: false } ],
    hazarder: [ { hrac: "Mníchov_Master", skore: 4, inaktivny: false, titulCard: "Kornélia" }, { hrac: "Hráč 1 (Ty)", skore: 1, inaktivny: false } ],
    duelovy_veteran: [ { hrac: "Hráč 1 (Ty)", skore: 35, inaktivny: false, titulCard: "Katy" }, { hrac: "Lord_Grob", skore: 20, inaktivny: false } ],
    terminator: [ { hrac: "Lord_Grob", skore: 50, inaktivny: false, titulCard: "Krčmár Boris" }, { hrac: "Hráč 1 (Ty)", skore: 22, inaktivny: false } ],
    plosny_zabijak: [ { hrac: "Hráč 1 (Ty)", skore: 14, inaktivny: false, titulCard: "Marek" }, { hrac: "Mníchov_Master", skore: 8, inaktivny: false } ]
};

var KATEGORIE_METADATA = {
    sampión: { title: "🥇 Šampión (Najviac výhier)", card: "Zvedavá suseda" },
    nerozhodny: { title: "🤝 Nerozhodný (Najviac remíz)", card: "Ďuri" },
    nie_sampión: { title: "💀 Nie-Šampión (Najviac prehier)", card: "Makak" },
    sClass: { title: "👑 S-Class majster (Vykované S)", card: "Oli" },
    aClass: { title: "💎 A-Class majster (Vykované A)", card: "Vinár Dávid" },
    bClass: { title: "🔮 B-Class majster (Vykované B)", card: "Sestrička" },
    cClass: { title: "📜 C-Class majster (Vykované C)", card: "Vlk" },
    dClass: { title: "🛡️ D-Class majster (Vykované D)", card: "Erik" },
    eClass: { title: "🌲 E-Class majster (Vykované E)", card: "Sisa" },
    fClass: { title: "📦 F-Class majster (Získané F)", card: "Mária Trhovkyňa" },
    detailista: { title: "🔨 Detailista (Pokusy vo Forge)", card: "Nela" },
    majster_aukcii: { title: "💰 Majster aukcií (Top ponuka)", card: "Zatúlaný tatranský medveď" },
    demolator: { title: "💥 Demolátor (Top skóre v 1 kole)", card: "Jakub" },
    rozsafny: { title: "💸 Rozšafný (Minuté mince)", card: "Kika" },
    grill_majster: { title: "🔥 Grill majster (Spálené karty)", card: "Doktor" },
    fenix: { title: "🕊️ Fénix (Oživené karty)", card: "Michal" },
    hazarder: { title: "🎲 Hazardér (Výhry o 1 bod)", card: "Kornélia" },
    duelovy_veteran: { title: "⚔️ Duelový veterán (PVP zápasy)", card: "Katy" },
    terminator: { title: "🤖 Terminátor (AI zápasy)", card: "Krčmár Boris" },
    plosny_zabijak: { title: "⚡ Plošný zabijak (Kúzla stola)", card: "Marek" }
};

var p1_played_cards = [], p2_played_cards = [];
var p1_erik_buff_row = null, p2_erik_buff_row = null;
var sc1 = 0, sc2 = 0, r1 = 0, r2 = 0, p1Pass = false, p2Pass = false, aktualnyHrac = 1;
var p1_draft_hand = [], p2_draft_hand = [];
var p1_spalene = [], p2_spalene = [], neutralne_vplyvy = [];
var jeSingleplayer = false; var obtiaznostAI = "B"; var blokujVykladanie = false;
var aktualnaStranaKnihy = 1;
var p1MulliganBonusScore = 0, p2MulliganBonusScore = 0;

// AUDIO ENGINE
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

// 🖼️ RENDERER KARTY S ČISTÝM VZHĽADOM
function vytvorHTMLKarty(meno, livePwr, cls, row, origPwr, isHidden) {
    if (isHidden) {
        return '<div class="karta-foto" style="background-image: url(\'Img/default.webp\');"></div><div class="karta-stitok-spodok"><div class="karta-nazov" style="color:#aaa;">🔒 Skrytá Karta</div></div>';
    }

    var reg = getRegistryCard(meno);
    var imgPath = reg.img || "Img/default.webp";
    var cisteMeno = meno.replace(/\s+\d+$/, "").trim();

    var html = "";
    if (livePwr !== "none") {
        html += "<div class='karta-kruh karta-kruh-pwr'>" + livePwr + "</div>";
    }
    
    var renderCls = reg.isPlatinum ? "PLATINUM" : (reg.isJoker ? "JOKER-" + cls : cls);
    html += "<div class='karta-kruh karta-kruh-cls cls-" + renderCls + "'>" + (reg.isPlatinum ? "P" : cls) + "</div>";
    html += "<button class='karta-btn-inspect' title='Zväčšiť kartu' onclick=\"event.stopPropagation(); otvorDetailKarty('" + meno.replace(/'/g, "\\'") + "', '" + cls + "');\">🔍</button>";
    html += "<div class='karta-foto' style=\"background-image: url('" + encodeURI(imgPath) + "');\"></div>";
    
    html += "<div class='karta-stitok-spodok'>";
    html += "  <div class='karta-nazov'>" + cisteMeno + "</div>";
    html += "</div>";

    return html;
}

// 🃏 GENEROVANIE UNIKÁTNEJ RUKY PRE ZÁPAS
function vygenerujRuku10Kariet() {
    var validKeys = Object.keys(MASTER_REGISTRY).filter(function(k) {
        var r = MASTER_REGISTRY[k];
        return !r.isJoker;
    });

    var hand = [];
    var addedPlatinum = {};

    while (hand.length < 10) {
        var k = validKeys[Math.floor(Math.random() * validKeys.length)];
        var reg = MASTER_REGISTRY[k];

        if (reg.isPlatinum) {
            if (!addedPlatinum[k]) {
                addedPlatinum[k] = true;
                hand.push({ n: k, cls: "F" });
            }
        } else {
            hand.push({ n: k, cls: "F" });
        }
    }

    return hand;
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
        cardDiv.className = "karta cls-" + (reg.isPlatinum ? "PLATINUM" : (reg.isJoker ? "JOKER-" + cls : cls));
        if (pNum !== aktualnyHrac || (pNum === 1 && p1Pass) || (pNum === 2 && p2Pass)) cardDiv.classList.add("karta-disabled");

        var isHidden = (pNum === 2 && jeSingleplayer);
        cardDiv.innerHTML = vytvorHTMLKarty(card.n, reg.isSpell || reg.isItem || reg.isJoker ? "none" : pwr, cls, reg.row, reg.p, isHidden);
        
        if (!isHidden) {
            cardDiv.onclick = function() { vylozitKartuZRuky(pNum, idx); };
        }
        handContainer.appendChild(cardDiv);
    });
}

// 🎬 TRUHLICE
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

    overlay.innerHTML = '<video id="chest-video-element" src="' + videoSrc + '" playsinline></video><div id="chest-click-prompt" class="chest-prompt-text">🎬 KLIKNI PRE OTVORENIE TRUHLE</div>';

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
    var coinsEarned = 0, goldEarned = 0;
    var maxKariet = 0;
    var ziskaneSuroviny = {};

    if (typ === "vitaz") {
        coinsEarned = Math.floor(Math.random() * 151) + 150;
        goldEarned = Math.floor(Math.random() * 4) + 2;
        maxKariet = Math.floor(Math.random() * 4) + 3;
    } else {
        coinsEarned = Math.floor(Math.random() * 51) + 50;
        goldEarned = (Math.random() < 0.1) ? 1 : 0;
        maxKariet = Math.floor(Math.random() * 3) + 1;
    }

    var extraLowPwrCoins = 0;
    p1_played_cards.forEach(function(c) {
        var reg = getRegistryCard(c.n);
        if (!reg.isSpell && !reg.isItem && !reg.isJoker && !reg.isPlatinum) {
            if (reg.p === 1) extraLowPwrCoins += 50;
            else if (reg.p === 2) extraLowPwrCoins += 30;
            else if (reg.p === 3) extraLowPwrCoins += 20;
            else if (reg.p === 4) extraLowPwrCoins += 10;
        }
    });

    coinsEarned += extraLowPwrCoins;
    ziskaneSuroviny["Koža"] = (ziskaneSuroviny["Koža"] || 0) + 1;

    inventar.mince += coinsEarned;
    inventar.suroviny["Zlato"] = (inventar.suroviny["Zlato"] || 0) + goldEarned;
    Object.keys(ziskaneSuroviny).forEach(function(mat) {
        inventar.suroviny[mat] = (inventar.suroviny[mat] || 0) + ziskaneSuroviny[mat];
    });

    var odmenyHtml = '<div class="karta-surovina"><div class="surovina-badge">+' + coinsEarned + '</div><div class="surovina-foto" style="background-image: url(\'Img/mince.webp\');"></div><div class="surovina-stitok"><div class="surovina-nazov">Kopa Mincí' + (extraLowPwrCoins > 0 ? ' (+' + extraLowPwrCoins + ' bonus)' : '') + '</div></div></div>';

    if (goldEarned > 0) {
        odmenyHtml += '<div class="karta-surovina"><div class="surovina-badge">+' + goldEarned + 'g</div><div class="surovina-foto" style="background-image: url(\'Img/zlato.webp\');"></div><div class="surovina-stitok"><div class="surovina-nazov">Hruda Zlata</div></div></div>';
    }

    var dostupneFm = Object.keys(MASTER_REGISTRY).filter(function(m) {
        var r = MASTER_REGISTRY[m];
        return !r.isPlatinum && !r.isSpell && !r.isJoker;
    });

    for (var i = 0; i < maxKariet; i++) {
        var randCardName = dostupneFm[Math.floor(Math.random() * dostupneFm.length)];
        if (!inventar.karty[randCardName]) inventar.karty[randCardName] = { repliky: { "F": 0 }, aktivnaTrieda: "F" };
        if (typeof inventar.karty[randCardName].repliky !== "object") inventar.karty[randCardName].repliky = { "F": 0 };
        inventar.karty[randCardName].repliky["F"] = (inventar.karty[randCardName].repliky["F"] || 0) + 1;

        var reg = getRegistryCard(randCardName);
        var realPwr = getRealPower({ n: randCardName, cls: "F" });
        odmenyHtml += '<div class="karta cls-F">' + vytvorHTMLKarty(randCardName, realPwr, "F", reg.row, reg.p) + '</div>';
    }

    var rewardsBox = document.createElement("div");
    rewardsBox.className = "chest-rewards-modal";
    rewardsBox.innerHTML = '<h2>🎉 TRUHLA OTVORENÁ!</h2><p style="color:#aaa; font-size:1em;">Získal si odmeny z truhlice do svojej pokladnice:</p><div class="rewards-card-container">' + odmenyHtml + '</div><button onclick="zatvoritTruhluAOpustit(\'' + overlayElement.id + '\')" style="background:#10b981; color:#fff; border:none; padding:12px 35px; border-radius:6px; font-weight:bold; font-size:1.1em; cursor:pointer; margin-top:10px;">Zobrať Všetko do Batohu</button>';

    overlayElement.appendChild(rewardsBox);
    aktualizujPanelDielne();
    vykresliRozbalovaciBatoh();
}

function zatvoritTruhluAOpustit(overlayId) {
    var el = document.getElementById(overlayId);
    if (el) el.remove();
    obnovitHudbuPoVideu();
    zobraziťObrazovku("hlavne-menu");
}

// 🔨 DIELŇA
function aktualizujPanelDielne() {
    var e = document.getElementById("dielna-zoznam");
    if (!e) return;
    e.innerHTML = "";

    var devBtnDiv = document.createElement("div");
    devBtnDiv.style.gridColumn = "1/-1";
    devBtnDiv.style.marginBottom = "15px";
    devBtnDiv.innerHTML = '<button onclick="devPridatSurovinyACheaty()" style="background:#8b5cf6; color:#fff; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; cursor:pointer; width:100%;">⚡ DEV CHEAT: Pridať 100 000 Mincí, Zlato & Suroviny pre Kovanie až po S-Class</button>';
    e.appendChild(devBtnDiv);

    var jokerWrapper = document.createElement("div");
    jokerWrapper.className = "karta-karta-wrapper";
    jokerWrapper.style.borderColor = "#a855f7";

    var jokerCardDiv = document.createElement("div");
    jokerCardDiv.className = "karta cls-JOKER-F";
    jokerCardDiv.innerHTML = vytvorHTMLKarty("Joker Card", "none", "F", 0, 0);

    var jokerCountsText = 'F:' + (inventar.jokers["F"]||0) + ' | E:' + (inventar.jokers["E"]||0) + ' | D:' + (inventar.jokers["D"]||0) + ' | C:' + (inventar.jokers["C"]||0) + ' | B:' + (inventar.jokers["B"]||0) + ' | A:' + (inventar.jokers["A"]||0);

    jokerWrapper.appendChild(jokerCardDiv);
    var jokerActions = document.createElement("div");
    jokerActions.style.width = "100%";
    jokerActions.innerHTML = '<div style="font-size:0.75em; margin:6px 0; color:#a855f7; text-align:center;">Joker Zásoby: <strong>' + jokerCountsText + '</strong></div><select id="step-select-JokerCard" style="width:100%; font-size:0.75em; margin-bottom:4px; background:#110e0c; color:#ffcc00; border:1px solid #5a4d3e; padding:3px;"><option value="F->E">F ➔ E (3xF JK | 10m | Koža)</option><option value="E->D">E ➔ D (3xE JK | 25m | Drevo)</option><option value="D->C">D ➔ C (3xD JK | 50m | Kov)</option><option value="C->B">C ➔ B (3xC JK | 100m | Bronz)</option><option value="B->A">B ➔ A (3xB JK | 250m | Striebro)</option></select><button class="btn-forge" style="background:#8b5cf6;" onclick="vylepsiKartuVoForge(\'Joker Card\', document.getElementById(\'step-select-JokerCard\').value, \'none\')">🔨 Vykovat Jokera</button>';
    jokerWrapper.appendChild(jokerActions);
    e.appendChild(jokerWrapper);

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

        var countsText = 'F:' + (cardData.repliky["F"] || 0) + ' | E:' + (cardData.repliky["E"] || 0) + ' | D:' + (cardData.repliky["D"] || 0) + ' | C:' + (cardData.repliky["C"] || 0) + ' | B:' + (cardData.repliky["B"] || 0) + ' | A:' + (cardData.repliky["A"] || 0);

        var actions = '<div style="font-size:0.75em; margin:6px 0; color:#ffcc00; text-align:center;">Počty: <strong>' + countsText + '</strong></div><label style="font-size:0.75em; color:#aaa;">Krok kovania:</label><select id="step-select-' + t.replace(/\s+/g, '') + '" style="width:100%; font-size:0.75em; margin-bottom:4px; background:#110e0c; color:#ffcc00; border:1px solid #5a4d3e; padding:3px;"><option value="F->E">F ➔ E (3xF | 10m | Koža)</option><option value="E->D">E ➔ D (3xE | 25m | Drevo)</option><option value="D->C">D ➔ C (3xD | 50m | Kov)</option><option value="C->B">C ➔ B (3xC | 100m | Bronz)</option><option value="B->A">B ➔ A (3xB | 250m | Striebro)</option><option value="A->S">A ➔ S (3xA | 500m | Zlato)</option></select><label style="font-size:0.75em; color:#aaa;">Zvitok ochrany:</label><select id="pergamen-select-' + t.replace(/\s+/g, '') + '" style="width:100%; font-size:0.75em; margin-bottom:6px; background:#110e0c; color:#ffcc00; border:1px solid #5a4d3e; padding:3px;"><option value="none">Bez Zvitku (0g / Risk)</option><option value="basic">Základný Zvitok (100g / +10%)</option><option value="advanced">Pokročilý Zvitok (500g / +25%)</option><option value="legendary">Legendárny Zvitok (1000g / +55%)</option></select><button class="btn-forge" onclick="vylepsiKartuVoForge(\'' + t.replace(/'/g, "\\'") + '\', document.getElementById(\'step-select-' + t.replace(/\s+/g, '') + '\').value, document.getElementById(\'pergamen-select-' + t.replace(/\s+/g, '') + '\').value)">🔨 Forge</button>';

        wrapper.appendChild(cardDiv);
        var actDiv = document.createElement("div");
        actDiv.style.width = "100%";
        actDiv.innerHTML = actions;
        wrapper.appendChild(actDiv);

        e.appendChild(wrapper);
    });
}

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

    ukazOznamenie("⚡ DEV CHEAT AKTIVOVANÝ", "Pridané mince, Zlato, suroviny a duplikáty pre testovanie kovania až po S-Class!");
    aktualizujPanelDielne();
    vykresliRozbalovaciBatoh();
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

// 🎬 ANIMÁCIA KOVANIA
function spustitVideoAnimationKovania(meno, oldCls, nextCls, isSuccess, wasProtected) {
    pozastavitHudbuPreVideo();

    var overlay = document.createElement("div");
    overlay.id = "forge-video-overlay";

    var reg = getRegistryCard(meno);
    var oldPwr = getRealPower({ n: meno, cls: oldCls });
    var nextPwr = getRealPower({ n: meno, cls: nextCls });

    var fourthCardHtml = isSuccess ? '<div id="forge-card-4" class="karta cls-' + nextCls + ' forge-slot-card" style="opacity:0;">' + vytvorHTMLKarty(meno, nextPwr, nextCls, reg.row, reg.p) + '</div>' : '';

    overlay.innerHTML = '<div class="forge-stage-169"><video id="forge-video-element" src="Img/vylepsovanie.mp4" autoplay playsinline></video><div class="forge-cards-container"><div id="forge-card-1" class="karta cls-' + oldCls + ' forge-slot-card">' + vytvorHTMLKarty(meno, oldPwr, oldCls, reg.row, reg.p) + '</div><div id="forge-card-2" class="karta cls-' + oldCls + ' forge-slot-card">' + vytvorHTMLKarty(meno, oldPwr, oldCls, reg.row, reg.p) + '</div><div id="forge-card-3" class="karta cls-' + oldCls + ' forge-slot-card">' + vytvorHTMLKarty(meno, oldPwr, oldCls, reg.row, reg.p) + '</div>' + fourthCardHtml + '</div></div>';

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
            if (isSuccess) {
                inventar.jokers[oldCls] = Math.max(0, (inventar.jokers[oldCls] || 0) - 3);
                inventar.jokers[nextCls] = (inventar.jokers[nextCls] || 0) + 1;
                ukazOznamenie("🎉 JOKER ÚSPEŠNE VYKOVANÝ!", "Vykoval si nový <strong>Joker Card (" + nextCls + "-Class)</strong>!");
            } else {
                if (!wasProtected) {
                    inventar.jokers[oldCls] = Math.max(0, (inventar.jokers[oldCls] || 0) - 1);
                    ukazOznamenie("💥 KOVANIE ZLYHALO!", "1x Joker Card zhorel v plameňoch!");
                } else {
                    ukazOznamenie("🛡️ JOKER OCHRÁNENÝ!", "Zvitok ochrany zachránil tvoju Joker Kartu!");
                }
            }
        } else {
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

// 📦 TRHOVISKO
var aukcnyCasomeračInterval = null;
var aktualnyAnonymnyStrop = 250; 
var trhovaPriemernaCenaEMA = 210; 
var aktualnyVeduciHrac = "Lord_Grob_33";

function vygenerujSimulaciuTrhu() {
    var e = document.getElementById("obchod-regaly-zoznam");
    if (!e) return;

    var reg = MASTER_REGISTRY["Neviditeľný Mário"];
    var realPwr = getRealPower({ n: "Neviditeľný Mário", cls: "E" });

    e.innerHTML = '<div style="background:rgba(30,20,10,0.85); border:2px solid #d4af37; padding:15px; border-radius:10px; text-align:center; margin-bottom:20px;"><h3 style="color:#d4af37; margin-top:0;">👑 ANONYMNÉ AUKČNÉ TRHOVISKO</h3><p style="font-size:0.9em; color:#ccc;">Predávaj samostatné karty aj HOMOGÉNNE Balíčky (rovnaká karta & trieda)!</p><div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:10px;"><button onclick="ukazOznamenie(\'📦 Vytvoriť Balíček\', \'Predávaš 10x E-Class Neviditeľný Mário v balíku! Zalistovací poplatok vopred je 15 mincí!\')" class="btn-dev-action">📦 Predať Balíček (10x E-Mário)</button><button onclick="testSimulaciaPrihodeniaBota()" class="btn-dev-action">🤖 Simulovať prihodenie Bota</button><button onclick="testSimulaciaRychlychPredajov()" class="btn-dev-action">📊 Simulovať 10 predajov (EMA Indikátor)</button></div></div><div class="auction-card-box"><div class="karta cls-E">' + vytvorHTMLKarty("Neviditeľný Mário", realPwr, "E", reg.row, reg.p) + '</div><div style="flex-grow:1;"><h3 style="color:#ffcc00; margin:0 0 5px 0;">Neviditeľný Mário (E-Class) - 10x Balíček</h3><p style="margin:2px 0; color:#aaa; font-size:0.9em;">Predajca: <strong>Mníchov_Master</strong></p><div style="background:rgba(0,0,0,0.6); border:1px solid #5a4d3e; padding:12px; border-radius:6px; margin:10px 0; max-width:440px;"><div>⏱️ Čas aukcie: <span id="auction-timer" style="color:#ffcc00; font-weight:bold;">00:59:59</span> <small style="color:#888;">(Anti-Snipe: +3m)</small></div><div style="margin-top:4px;">👑 Aktuálne najvyššia ponuka (Vedie): <strong style="color:#ffcc00;" id="auction-leader">' + aktualnyVeduciHrac + '</strong></div><div style="margin-top:4px;">📊 Indikátor Ceny (EMA): <strong style="color:#3b82f6;">' + trhovaPriemernaCenaEMA + ' m</strong></div><div style="margin-top:4px;">💰 Okamžitý Výkup (Strop): <strong style="color:#10b981;">' + aktualnyAnonymnyStrop + ' m</strong></div></div><div style="display:flex; gap:10px;"><button onclick="anonymnePrihoditSumu(' + aktualnyAnonymnyStrop + ')" style="background:linear-gradient(180deg, #3b2d1d 0%, #21180e 100%); color:#ffcc00; border:1px solid #d4af37; padding:10px 18px; border-radius:6px; font-weight:bold; cursor:pointer;">🕵️ Anonymne Prihodiť</button><button onclick="okamziteOdkupitKartu(' + aktualnyAnonymnyStrop + ', \'Balíček 10x E-Mário\')" style="background:#10b981; color:#fff; border:none; padding:10px 18px; border-radius:6px; font-weight:bold; cursor:pointer;">⚡ Kúpiť Ihneď za ' + aktualnyAnonymnyStrop + 'm</button></div></div></div>';

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

// 🔊 AUDIO ENGINE
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

// 🛡️ DYNAMICKÝ VÝPOČET SILY KARTY NA STOLE S VŠETKÝMI BUFFMI
function vypocitajDynamickuSiluJednejKarty(card, pNum) {
    var reg = getRegistryCard(card.n);
    if (reg.isSpell || reg.isItem || reg.isJoker) return "none";

    var myCards = (pNum === 1) ? p1_played_cards : p2_played_cards;
    var oppCards = (pNum === 1) ? p2_played_cards : p1_played_cards;

    var isNelaOnTable = false;
    [p1_played_cards, p2_played_cards].forEach(function(list) {
        list.forEach(function(c) { if (c.n === "Nela") isNelaOnTable = true; });
    });

    var p1Katy = p1_played_cards.some(function(c) { return c.n === "Katy"; });
    var p2Katy = p2_played_cards.some(function(c) { return c.n === "Katy"; });
    var myKaty = (pNum === 1) ? p1Katy : p2Katy;
    var oppKaty = (pNum === 1) ? p2Katy : p1Katy;

    var itemBonus = 0;
    myCards.forEach(function(c) {
        var r = getRegistryCard(c.n);
        if (r.isItem && r.row === reg.row) {
            itemBonus += CLASS_CONFIG[c.cls || "F"].itemBonus;
        }
    });

    var rowSetBonus = vypocitajSetBonusRadu(reg.row, myCards);
    var basePwr = getRealPower(card);

    var rozhovor = neutralne_vplyvy.indexOf("Musíme sa porozprávať") !== -1;
    var upokojSa = neutralne_vplyvy.indexOf("Upokoj sa") !== -1;
    var ohnostroj = neutralne_vplyvy.indexOf("Ohnostroj") !== -1;

    if (card.n !== "Oli") {
        if (reg.row === 1 && rozhovor) basePwr = 1;
        if (reg.row === 2 && upokojSa) basePwr = 1;
        if (reg.row === 3 && ohnostroj) basePwr = 1;
    }

    basePwr += itemBonus + rowSetBonus;

    var rowMultiplier = 1.0;
    var hasAlkohol = myCards.some(function(c) { return c.n === "Alcohol"; });
    var hasSisa = myCards.some(function(c) { return c.n === "Sisa"; });
    var hasVlk = myCards.some(function(c) { return c.n === "Vlk"; });
    var myErikRow = (pNum === 1) ? p1_erik_buff_row : p2_erik_buff_row;

    if (!isNelaOnTable && card.n !== "Oli") {
        if (reg.row === 1 && hasSisa) rowMultiplier += 0.50;
        if (reg.row === 2 && card.n === "Ďuri" && hasAlkohol) rowMultiplier += 1.00;
        if (reg.row === 3 && hasVlk) rowMultiplier += 0.50;
        if (myErikRow === reg.row) rowMultiplier += 0.50;
        if (card.n === "Michal") rowMultiplier += 1.00;
    }

    var finalPwr = Math.round(basePwr * rowMultiplier);
    if (myKaty) finalPwr += 2;
    if (oppKaty) finalPwr -= 2;

    return Math.max(0, finalPwr);
}

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
    myCards.forEach(function(c) {
        var dynPwr = vypocitajDynamickuSiluJednejKarty(c, pNum);
        if (dynPwr !== "none") total += dynPwr;
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

    modal.innerHTML = '<div class="modal-content modal-bg-duha" style="max-width:1150px; height:90vh; display:flex; flex-direction:column; position:relative;" onclick="event.stopPropagation()"><span class="card-modal-close" onclick="document.getElementById(\'navod-modal\').style.display=\'none\'">&times;</span><div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #5a4d3e; padding-bottom:10px; margin-bottom:15px;"><h2 style="color:#d4af37; margin:0; font-size:1.6em; font-family:serif;">📖 KRONIKA A NÁVOD KRÁĽOVSTVA (Strana <span id=\'book-page-num\'>1</span> / 5)</h2><div><button onclick="posunStraneKnihy(-1)" style="background:#3b2d1d; color:#ffcc00; border:1px solid #d4af37; padding:6px 14px; border-radius:4px; cursor:pointer; font-weight:bold; margin-right:5px;">◀ Predošlá</button><button onclick="posunStraneKnihy(1)" style="background:#3b2d1d; color:#ffcc00; border:1px solid #d4af37; padding:6px 14px; border-radius:4px; cursor:pointer; font-weight:bold;">Ďalšia ▶</button></div></div><div id="book-content-container" style="flex-grow:1; overflow-y:auto; padding-right:10px;"></div></div>';
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
        container.innerHTML = '<h3 style="color:#ffcc00;">📜 KAPITOLA I: ŠANCE DROPINGU Z TRUHIEL & BONUSY</h3><p style="font-size:1.05em; line-height:1.6;">Odmeny dostávaš po dokončení zápasu. Slabé karty (základ 1b až 4b) na stole ti navyše generujú extra mincový bonus pri výhre!</p><div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-top:20px;"><div style="background:rgba(0,0,0,0.6); border:2px solid #5a4d3e; padding:18px; border-radius:10px;"><h4 style="color:#d4af37; margin-top:0;">📦 TRUHLA ÚČASTNÍKA</h4><ul style="line-height:1.8;"><li><strong>Mince:</strong> 50 až 100 mincí.</li><li><strong>Karty:</strong> 1× až 3× náhodná F-kópia.</li><li><strong>Tvrdená koža:</strong> 100% garancia.</li><li><strong>Zlato:</strong> 10 % šanca na 1g Zlata.</li></ul></div><div style="background:rgba(0,0,0,0.6); border:2px solid #5a4d3e; padding:18px; border-radius:10px;"><h4 style="color:#ffcc00; margin-top:0;">🏆 TRUHLA VÍŤAZA</h4><ul style="line-height:1.8;"><li><strong>Mince:</strong> 150 až 300 mincí.</li><li><strong>Karty (Balík):</strong> 3× až 6× F-kariet.</li><li><strong>Garantované Zlato:</strong> 2g až 5g Zlata.</li></ul></div></div>';
    } else if (aktualnaStranaKnihy === 2) {
        container.innerHTML = '<h3 style="color:#ffcc00;">🔨 KAPITOLA II: KOVÁČSKY STROM & JOKER CARD</h3><p style="font-size:1.05em; line-height:1.6;">Na kovanie potrebuješ 3 rovnocenné karty zvolenej triedy (alebo <strong>Joker Cards</strong>) + surovinu + poplatok. Joker sa ková samostatne od F po A a nahradí akúkoľvek kartu v Dielni!</p>';
    } else if (aktualnaStranaKnihy === 3) {
        container.innerHTML = '<h3 style="color:#ffcc00;">🛠️ KAPITOLA III: SETOVÉ BONUSY RADOV</h3><p style="font-size:1.05em; line-height:1.6;">Za určité počty vykovaných kariet v tom istom rade získavaš sčítateľné +1b bonusy pre celý rad:</p><ul><li><strong>1× S-Class:</strong> +1b pre celý rad</li><li><strong>2× A-Class:</strong> +1b pre celý rad</li><li><strong>3× B-Class:</strong> +1b pre celý rad</li><li><strong>4× C-Class:</strong> +1b pre celý rad</li><li><strong>5× D-Class:</strong> +1b pre celý rad</li><li><strong>6× E-Class:</strong> +1b pre celý rad</li></ul>';
    } else if (aktualnaStranaKnihy === 4) {
        container.innerHTML = '<h3 style="color:#ffcc00;">⚡ KAPITOLA IV: 20 PLATINOVÝCH KARIET & REBRÍČKY</h3><p style="font-size:1.05em; line-height:1.6;">V kráľovstve existuje presne 20 unikátnych Platinových kariet, z ktorých každá je naviazaná na 1. miesto v jednej z 20 kategórií Siene Slávy! Pri 7-dňovej inaktivite sa karta dočasne uvoľňuje 2. hráčovi v poradí.</p>';
    } else if (aktualnaStranaKnihy === 5) {
        container.innerHTML = '<h3 style="color:#ffcc00;">🛒 KAPITOLA V: ANONYMNÉ TRHOVISKO & AUKCIE</h3><p style="font-size:1.05em; line-height:1.6;">Aukcie prebiehajú anonymne s možnosťou Okamžitého výkupu. Na trh možno vyvesiť aj homogénne balíčky kariet rovnakej jednotky a rovnakej triedy!</p>';
    }
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
        html += '<div class="inventory-mini-card"><img src="' + item.img + '" class="inventory-mini-img" alt="' + item.name + '"><div class="inventory-mini-info"><span class="inventory-mini-title">' + item.name + '</span><span class="inventory-mini-val">' + item.val + '</span></div></div>';
    });

    el.innerHTML = html;
}

// 🔍 DETAJL KARTY MODAL (VYČISTENÝ BEZ DUPLICITNÉHO MENA)
function otvorDetailKarty(meno, inicialnaTrieda) {
    var reg = getRegistryCard(meno);
    var modal = document.createElement("div");
    modal.className = "card-modal";
    modal.style.zIndex = "9999999";
    modal.onclick = function() { modal.remove(); };

    modal.innerHTML = '<div class="modal-content" style="text-align:center; max-width:580px; background:rgba(15,10,5,0.97);" onclick="event.stopPropagation()"><span class="card-modal-close" onclick="this.closest(\'.card-modal\').remove()">&times;</span><h2 style="color:#d4af37; margin-top:0; font-family:Georgia, serif;">🔍 DETAJLNÝ NÁHĽAD KARTY</h2><div style="display:flex; justify-content:center; margin:15px 0;"><div class="karta cls-' + inicialnaTrieda + '" style="transform: scale(1.55); transform-origin: center; margin:35px 0;">' + vytvorHTMLKarty(meno, getRealPower({ n: meno, cls: inicialnaTrieda }), inicialnaTrieda, reg.row, reg.p, false) + '</div></div><p style="font-size:1.05em; line-height:1.6; color:#e0d0b0; background:rgba(0,0,0,0.5); padding:15px; border-radius:8px; border:1px solid #5a4d3e; margin-top:35px;">' + (reg.abilityDesc || reg.desc || "Obyčajná bojová jednotka.") + '</p></div>';

    document.body.appendChild(modal);
}

function ukazOznamenie(titulok, sprava, callback) {
    var overlay = document.createElement("div");
    overlay.className = "custom-notify-overlay";
    
    overlay.innerHTML = '<div class="custom-notify-box"><h3 class="custom-notify-title">' + titulok + '</h3><div class="custom-notify-msg">' + sprava + '</div><button class="custom-notify-btn" id="notify-confirm-btn">Rozumiem</button></div>';

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
        div.innerHTML = vytvorHTMLKarty(t, getRealPower({n:t, cls:"F"}), "F", reg.row, reg.p, false);
        e.appendChild(div);
    });
}

function otvoriťStatistiky() {
    document.getElementById("stats-modal").style.display = "flex";
    vykresliGridStatistik();
}

function vykresliGridStatistik() {
    var container = document.getElementById("stats-grid-container");
    if (!container) return;
    container.innerHTML = "";

    Object.keys(simulačneRebríčky).forEach(function(katKey) {
        var items = simulačneRebríčky[katKey] || [];
        var meta = KATEGORIE_METADATA[katKey] || { title: katKey, card: "Neznáma" };

        var col = document.createElement("div");
        col.className = "leaderboard-column";

        var html = '<h3 class="leaderboard-title">' + meta.title + '</h3>';
        html += '<div class="leaderboard-reward-tag">Platinová Trofej: 👑 ' + meta.card + '</div>';

        items.forEach(function(it, idx) {
            var rankCls = (idx === 0) ? "rank-1" : ((idx === 1) ? "rank-2" : ((idx === 2) ? "rank-3" : ""));
            var platBadge = (idx === 0 && !it.inaktivny) ? '<span class="plat-badge">👑 Vlastní</span>' : '';
            if (idx === 1 && items[0] && items[0].inaktivny) platBadge = '<span class="plat-badge" style="background:#ffd700;">👑 Zapožičaná</span>';
            var inactTag = it.inaktivny ? ' <span style="font-size:0.8em; color:#ff4d4d;">(💤 Inaktívny)</span>' : '';

            html += '<div class="leaderboard-item ' + rankCls + '"><span>#' + (idx + 1) + ' ' + it.hrac + inactTag + '</span><span><strong>' + it.skore + '</strong> ' + platBadge + '</span></div>';
        });

        col.innerHTML = html;
        container.appendChild(col);
    });
}

function testSimulaciaInaktivity() {
    Object.keys(simulačneRebríčky).forEach(function(k) {
        if (simulačneRebríčky[k][0]) simulačneRebríčky[k][0].inaktivny = !simulačneRebríčky[k][0].inaktivny;
    });
    vykresliGridStatistik();
    ukazOznamenie("⏩ TEST INAKTIVITY", "Stav inaktivity lídrov bol prepnutý. Platinové karty boli dočasne presunuté 2. hráčom v poradí!");
}

function testSimulaciaPridatBota() {
    var rKey = Object.keys(simulačneRebríčky)[Math.floor(Math.random() * Object.keys(simulačneRebríčky).length)];
    var botName = "Bot_" + Math.floor(Math.random() * 900 + 100);
    var botScore = Math.floor(Math.random() * 50) + 10;
    simulačneRebríčky[rKey].push({ hrac: botName, skore: botScore, inaktivny: false });
    simulačneRebríčky[rKey].sort(function(a, b) { return b.skore - a.skore; });
    vykresliGridStatistik();
    ukazOznamenie("🤖 TEST BOT", "Do rebríčka " + rKey + " pribudol " + botName + " so skóre " + botScore + "!");
}

function testSimulaciaGlobalnyOznam() {
    vyhlasGlobalnySClassOznam("Hráč 1 (Ty)", "Nicolas");
}

function vyhlasGlobalnySClassOznam(hracMeno, kartaMeno) {
    var banner = document.createElement("div");
    banner.className = "global-announce-banner";
    banner.innerHTML = "👑 <strong>KRÁĽOVSKÝ OZNAM SERVERA:</strong> Hráč <strong>" + hracMeno + "</strong> práve vykoval legendárnu <strong>S-Class</strong> kartu <strong>" + kartaMeno + "</strong>! 🏆";
    document.body.appendChild(banner);
    setTimeout(function() { banner.remove(); }, 6000);
}

function spustitZapasLokálnePVP() { jeSingleplayer = false; inicializujNovyZapas(); }
function zobraziťMenuAI() { var obt = prompt("Vyber obtiažnosť AI (A, B, C):", "B"); if (obt) { obtiaznostAI = obt.toUpperCase(); spustitZapasProtiAI(); } }
function spustitZapasProtiAI() { jeSingleplayer = true; inicializujNovyZapas(); }

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

    modal.innerHTML = '<div class="custom-notify-box" style="max-width:500px;"><h2 style="color:#d4af37; margin-top:0;">🃏 MULLIGAN FÁZA (10 Kariet)</h2><p style="font-size:1.05em; line-height:1.6; color:#ccc;">Preskúmaj svoju ruku. Chceš vymeniť všetkých 10 kariet?</p><div style="background:rgba(255,77,77,0.15); border:1px solid #ff4d4d; padding:10px; border-radius:6px; color:#ff9999; font-size:0.9em; margin:15px 0;">⚠️ TREST ZA RISK: Súper získa +4b náskok!</div><div style="display:flex; gap:12px; justify-content:center;"><button onclick="potvrditMulliganRuku(false)" style="background:#10b981; color:#fff; border:none; padding:10px 22px; border-radius:6px; font-weight:bold; cursor:pointer;">✅ Hrať</button><button onclick="potvrditMulliganRuku(true)" style="background:#8b0000; color:#fff; border:1px solid #ff4d4d; padding:10px 22px; border-radius:6px; font-weight:bold; cursor:pointer;">🎲 Vymeniť (+4b Súper)</button></div></div>';

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

// ⚡ VYKRESLENIE STOLA S DYNAMICKÝM PREPOČÍTAVANÍM BODOV V KRÚŽKU
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
            var dynPwr = vypocitajDynamickuSiluJednejKarty(c, 1);
            var div = document.createElement("div");
            div.className = "karta cls-" + (reg.isPlatinum ? "PLATINUM" : (c.cls || "F"));
            div.innerHTML = vytvorHTMLKarty(c.n, dynPwr, c.cls || "F", reg.row, reg.p, false);
            targetRow.appendChild(div);
        }
    });

    p2_played_cards.forEach(function(c) {
        var reg = getRegistryCard(c.n);
        var targetRow = document.getElementById("p2-row" + reg.row);
        if (targetRow) {
            var dynPwr = vypocitajDynamickuSiluJednejKarty(c, 2);
            var div = document.createElement("div");
            div.className = "karta cls-" + (reg.isPlatinum ? "PLATINUM" : (c.cls || "F"));
            div.innerHTML = vytvorHTMLKarty(c.n, dynPwr, c.cls || "F", reg.row, reg.p, false);
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

// VYKLADANIE KARIET
function vylozitKartuZRuky(pNum, cardIndex) {
    if (blokujVykladanie) return;
    if (pNum !== aktualnyHrac) return;

    var hand = (pNum === 1) ? p1_draft_hand : p2_draft_hand;
    var myPlayed = (pNum === 1) ? p1_played_cards : p2_played_cards;
    var oppPlayed = (pNum === 1) ? p2_played_cards : p1_played_cards;

    if (cardIndex < 0 || cardIndex >= hand.length) return;

    var card = hand.splice(cardIndex, 1)[0];
    var reg = getRegistryCard(card.n);

    if (reg.isJoker) {
        ukazOznamenie("⚠️ JOKER CARD", "S Joker Kartou sa nedá hrať v zápase!");
        hand.splice(cardIndex, 0, card);
        return;
    }

    if (reg.isSpy) {
        oppPlayed.push(card);
        tahatNoveKartyZBalicka(pNum, 2);
        ukazOznamenie("🕵️ ŠPIÓN VYLOŽENÝ", "Karta <strong>" + card.n + "</strong> bola vyložená na súperovu stranu stola a potiahol si 2 nové karty!");
    } else if (reg.isSpell) {
        if (card.n === "Šicko v porádku") neutralne_vplyvy = [];
        else neutralne_vplyvy.push(card.n);
    } else {
        myPlayed.push(card);

        if (card.n === "Zatúlaný tatranský medveď" || card.n === "Jakub") {
            vykonajAutoSpalenie(card.n);
        }

        if (card.n === "Doktor" || card.n === "Sestrička" || card.n === "Kornélia") {
            vykonajOzivenieZArchivu(pNum);
        }
    }

    vykresliHraciuPlochu();
    if ((pNum === 1 && !p2Pass) || (pNum === 2 && !p1Pass)) prepniHracov();
    else spravujAI();
}

function tahatNoveKartyZBalicka(pNum, count) {
    var hand = (pNum === 1) ? p1_draft_hand : p2_draft_hand;
    var validKeys = Object.keys(MASTER_REGISTRY).filter(function(k) { return !MASTER_REGISTRY[k].isJoker; });

    for (var i = 0; i < count; i++) {
        var randKey = validKeys[Math.floor(Math.random() * validKeys.length)];
        hand.push({ n: randKey, cls: "F" });
    }
}

function vykonajAutoSpalenie(pôvodcaMeno) {
    var vsetkyKartyStola = [];
    p1_played_cards.forEach(function(c) { if (c.n !== pôvodcaMeno && c.n !== "Oli") vsetkyKartyStola.push(c); });
    p2_played_cards.forEach(function(c) { if (c.n !== pôvodcaMeno && c.n !== "Oli") vsetkyKartyStola.push(c); });

    if (vsetkyKartyStola.length === 0) return;

    var maxPwr = -1;
    vsetkyKartyStola.forEach(function(c) {
        var p = getRealPower(c);
        if (p > maxPwr) maxPwr = p;
    });

    if (maxPwr <= 0) return;

    var spalenychKariet = 0;
    p1_played_cards = p1_played_cards.filter(function(c) {
        if (c.n !== pôvodcaMeno && c.n !== "Oli" && getRealPower(c) === maxPwr) {
            p1_spalene.push(c);
            spalenychKariet++;
            return false;
        }
        return true;
    });

    p2_played_cards = p2_played_cards.filter(function(c) {
        if (c.n !== pôvodcaMeno && c.n !== "Oli" && getRealPower(c) === maxPwr) {
            p2_spalene.push(c);
            spalenychKariet++;
            return false;
        }
        return true;
    });

    if (spalenychKariet > 0) {
        ukazOznamenie("🔥 PLOŠNÉ SPÁLENIE!", "Karta <strong>" + pôvodcaMeno + "</strong> spálila v plameňoch <strong>" + spalenychKariet + "</strong> najsilnejších kariet na stole (sila " + maxPwr + "b)!");
    }
}

function vykonajOzivenieZArchivu(pNum) {
    var arch = (pNum === 1) ? p1_spalene : p2_spalene;
    var myPlayed = (pNum === 1) ? p1_played_cards : p2_played_cards;

    if (arch.length === 0) {
        ukazOznamenie("🏥 PRÁZDNY ARCHÍV", "V tvojom archíve spálených kariet sa nenachádza žiadna jednotka na oživenie!");
        return;
    }

    var oživenaKarta = arch.pop();
    myPlayed.push(oživenaKarta);
    ukazOznamenie("🕊️ OŽIVENIE!", "Z archívu bola úspešne vrátená do boja karta <strong>" + oživenaKarta.n + "</strong>!");
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
// =========================================================================
// 🎛️ ŽIVÉ LADENIE ROZMEROV A OBRÁZKA KARIET
// =========================================================================
function aplikujTuning() {
    var sizeVal = document.getElementById("tune-bg-size").value;
    var posX = document.getElementById("tune-pos-x").value;
    var posY = document.getElementById("tune-pos-y").value;
    var cardW = document.getElementById("tune-card-w").value;
    var cardH = document.getElementById("tune-card-h").value;

    // Aktualizácia textov v paneli
    document.getElementById("lbl-bg-size").innerText = sizeVal + "%";
    document.getElementById("lbl-pos-x").innerText = posX + "%";
    document.getElementById("lbl-pos-y").innerText = posY + "%";
    document.getElementById("lbl-card-w").innerText = cardW + "px";
    document.getElementById("lbl-card-h").innerText = cardH + "px";

    // Aplikovanie na všetky karty na obrazovke
    var karty = document.querySelectorAll(".karta");
    karty.forEach(function(k) {
        k.style.width = cardW + "px";
        k.style.height = cardH + "px";
    });

    var fotky = document.querySelectorAll(".karta-foto");
    fotky.forEach(function(f) {
        f.style.backgroundSize = sizeVal + "% auto";
        f.style.backgroundPosition = posX + "% " + posY + "%";
    });

    // Výpis do poľa
    var cssText = "W: " + cardW + "px | H: " + cardH + "px | Size: " + sizeVal + "% | Pos: " + posX + "% " + posY + "%";
    var outEl = document.getElementById("tune-output-css");
    if (outEl) outEl.innerText = cssText;
}

// Spustenie pri štarte pre inicializáciu hodnôt
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(aplikujTuning, 300);
});

window.aplikujTuning = aplikujTuning;
