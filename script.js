// =========================================================================
// RODINNÁ HRA - HOME WARS (KOMPLETNÝ ENGINE - VERZIA 33.0.0 - STABLE FORGE & BATTLE)
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

var VERZIA = "33.0.0";

// =========================================================================
// 1. MASTER REGISTRY
// =========================================================================
var MASTER_REGISTRY = {
    // 🌟 20 PLATINOVÝCH KARIET
    "Zvedavá suseda": { row: 2, p: 7, isPlatinum: true, isSpy: true, img: "Img/zvedava-suseda.webp", desc: "Suseda.", abilityDesc: "🕵️ Špión: Vykladá sa na súperovu stranu. Potiahne ti 2 nové karty." },
    "Ďuri": { row: 1, p: 6, isPlatinum: true, img: "Img/duri.webp", desc: "Veterán.", abilityDesc: "🍺 Taktik: Ak je na stole Alkohol, posilňuje ženský 2. rad o +100%." },
    "Makak": { row: 3, p: 2, isPlatinum: true, isSpy: true, img: "Img/makak.webp", desc: "Lesný šibal.", abilityDesc: "🕵️ Špión: Dáva súperovi len 2b a potiahne ti 2 nové karty!" },
    "Oli": { row: 2, p: 12, isPlatinum: true, img: "Img/oli.webp", desc: "Duchovná matka.", abilityDesc: "✝️ Imunita: Jej 12b sila je nedotknuteľná kúzlam aj spáleniu." },
    "Vinár Dávid": { row: 1, p: 4, isPlatinum: true, isSpy: true, img: "Img/david.webp", desc: "Kráľovský vinár.", abilityDesc: "🕵️ Špión: Vykladá sa súperovi do 1. radu a dá ti 2 nové karty." },
    "Sestrička": { row: 2, p: 3, isPlatinum: true, img: "Img/sestricka.webp", desc: "Ošetrovateľka.", abilityDesc: "🏥 Oživenie: Vráti do hry poslednú spálenú kartu z tvojho archívu ohňa." },
    "Vlk": { row: 3, p: 3, isPlatinum: true, img: "Img/vlk.webp", desc: "Vodca svorky.", abilityDesc: "🐾 Svorka: Zvyšuje silu všetkých zvierat v 3. rade o +50%." },
    "Erik": { row: 1, p: 3, isPlatinum: true, img: "Img/erik.webp", desc: "Taktik.", abilityDesc: "📢 Buff: Po vyložení zvolíš rad, ktorému pridá +50% k celkovej sile." },
    "Sisa": { row: 2, p: 4, isPlatinum: true, img: "Img/sisa.webp", desc: "Dvorná dáma.", abilityDesc: "📢 Dvorná dáma: Zvyšuje silu celého mužského radu o +50%." },
    "Mária Trhovkyňa": { row: 2, p: 9, isPlatinum: true, isSpy: true, img: "Img/maria.webp", desc: "Trhovkyňa.", abilityDesc: "🕵️ Špión: Vyloží sa súperovi a potiahne ti 2 karty (daň 9b)." },
    "Nela": { row: 2, p: 1, isPlatinum: true, img: "Img/nela.webp", desc: "Ochranný štít.", abilityDesc: "🛡️ Štít: Zmrazí stôl! Vypne všetky percentuálne buffy a aury." },
    "Zatúlaný tatranský medveď": { row: 3, p: 5, isPlatinum: true, img: "Img/zatulany-tatransky-medved.webp", desc: "Horská šelma.", abilityDesc: "🔥 Dravec: Automaticky spáli najsilnejšiu kartu/karty na celom stole (okrem seba a Oli)." },
    "Jakub": { row: 1, p: 4, isPlatinum: true, img: "Img/jakub.webp", desc: "Pevnostný strážca.", abilityDesc: "🔥 Bojovník: Automaticky spáli najsilnejšiu kartu/karty na celom stole (okrem seba a Oli)." },
    "Kika": { row: 2, p: 3, isPlatinum: true, isSpy: true, img: "Img/kika.webp", desc: "Archivárka.", abilityDesc: "🕵️ Špión: Vykladá sa na súperovu stranu. Potiahne ti 2 nové karty." },
    "Doktor": { row: 1, p: 5, isPlatinum: true, img: "Img/doktor.webp", desc: "Lekár.", abilityDesc: "🏥 Oživenie: Vráti do hry poslednú spálenú kartu z tvojho archívu ohňa." },
    "Michal": { row: 1, p: 5, isPlatinum: true, img: "Img/michal.webp", desc: "Obchodník.", abilityDesc: "📢 Obchodník: Ak nie je na stole Nela, dáva sám sebe buff +100% k sile." },
    "Kornélia": { row: 2, p: 3, isPlatinum: true, img: "Img/kornelia.webp", desc: "Bylinkárka.", abilityDesc: "🏥 Oživenie: Vráti do hry poslednú spálenú kartu z tvojho archívu ohňa." },
    "Katy": { row: 1, p: 6, isPlatinum: true, img: "Img/katy.webp", desc: "Kráľovná výhier.", abilityDesc: "💖 Pomoc: Pridáva +2b tvojim kartám a uberá -2b všetkým súperovým kartám." },
    "Krčmár Boris": { row: 1, p: 4, isPlatinum: true, isSpy: true, img: "Img/krcmar-boris.webp", desc: "Hostinský.", abilityDesc: "🕵️ Špión: Vykladá sa súperovi do 1. radu a potiahne ti 2 nové karty." },
    "Marek": { row: 1, p: 4, isPlatinum: true, img: "Img/marek.webp", desc: "Filozof.", abilityDesc: "🧹 Filozof: Cielene zmatie vybranú kartu súpera a pošle ju do ohňa." },

    // 🏆 UNIKÁTNA TURNAJOVÁ KARTA
    "Kráľovský Šampión": { row: 1, p: 8, isTournamentUnique: true, img: "Img/neviditelny-mario.webp", desc: "Unikátna turnajová trofej existujúca len v 1 kuse na celom serveri!", abilityDesc: "👑 Turnajový Unikát: Má základ 8b, v Dielni sa NIKDY nezničí a v rade aktivuje plný setový bonus +6b!" },

    // 🃏 JOKER CARD
    "Joker Card": { row: 0, p: 0, isJoker: true, img: "Img/zlato.webp", desc: "Univerzálny kováčsky žolík.", abilityDesc: "🃏 Dielenský Žolík: Nedá sa s ním hrať v zápase, no v Dielni ková od F po A a nahradí akúkoľvek kartu." },

    // 🔨 19 OBYČAJNÝCH KOVÁČSKYCH JEDNOTIEK (F ➔ S)
    "Dominik": { row: 1, p: 1, img: "Img/dominik.webp", desc: "Hradné dieťa s dreveným koníkom. Bonus mincí pri výhre." },
    "Marcus": { row: 1, p: 1, img: "Img/marcus.webp", desc: "Zvedavý chlapec s lienkou. Bonus mincí pri výhre." },
    "Timko": { row: 1, p: 1, img: "Img/tymko.webp", desc: "Obranný bojovník s dreveným mečom." },
    "Martin": { row: 1, p: 4, img: "Img/martin.webp", desc: "Šikovný hraničiar a lovec." },
    "Neviditeľný Mário": { row: 1, p: 4, img: "Img/neviditelny-mario.webp", desc: "Tajuplný zbojník v kapucni." },
    "Nicolas": { row: 1, p: 4, img: "Img/nicolas.webp", desc: "Mladý zručný kamenár." },
    "Jaro": { row: 1, p: 5, img: "Img/jaro.webp", desc: "Zručný kováč." },

    "Lula": { row: 2, p: 4, img: "Img/lula.webp", desc: "Dvorná harfistka." },
    "Nika": { row: 2, p: 4, img: "Img/nika.webp", desc: "Hradná kuchárka pri kotli." },
    "Darinka": { row: 2, p: 5, img: "Img/darinka.webp", desc: "Majsterka tkáčka." },
    "Viera": { row: 2, p: 6, img: "Img/viera.webp", desc: "Hradná pekárka." },
    "Anka": { row: 2, p: 7, img: "Img/anka.webp", desc: "Správkyňa hradných kľúčov." },

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
    "Šicko v porádku": { row: 0, p: 0, isSpell: true, img: "Img/sicko-v-poradku.webp", desc: "Šašo.", abilityDesc: "⚡ Vyčistí stôl od všetkých neutrálnych kúziel!" }
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

var STATNY_SKLAD_CENNIK = {
    "Koža": { price: 8, img: "Img/koza.webp" },
    "Drevo": { price: 18, img: "Img/drevo.webp" },
    "Kov": { price: 38, img: "Img/zelezo.webp" },
    "Bronz": { price: 75, img: "Img/bronz.webp" },
    "Striebro": { price: 180, img: "Img/striebro.webp" },
    "Zlato": { price: 80, img: "Img/zlato.webp" }
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
var p1_active_deck = [], p2_active_deck = [];
var p1_spalene = [], p2_spalene = []; 
var odhodene_karty_kola = []; 
var neutralne_vplyvy = [];
var jeSingleplayer = false; var obtiaznostAI = "B"; var blokujVykladanie = false;
var aktualnaStranaKnihy = 1;
var p1MulliganRound1Bonus = 0, p2MulliganRound1Bonus = 0;
var mulliganSelectedIndices = [];
var aktualnaZalozkaTrhu = "trh";

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

// 🖼️ RENDERER KARTY (BEZPEČNÝ FALLBACK BEZ 404)
function vytvorHTMLKarty(meno, livePwr, cls, row, origPwr, isHidden) {
    if (isHidden) {
        return '<div class="karta-foto" style="background-color:#1c130c; background-image:none; border:2px solid #5a4d3e;"><div style="display:flex; height:100%; align-items:center; justify-content:center; font-size:2em;">🛡️</div></div><div class="karta-stitok-spodok"><div class="karta-nazov" style="color:#aaa;">🔒 Skrytá Karta</div></div>';
    }

    var reg = getRegistryCard(meno);
    var imgPath = reg.img || "Img/zlato.webp";
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

// =========================================================================
// 🎒 STICKY WALLET
// =========================================================================
function aktualizujVsetkyStickyWallety() {
    var walletIds = ["deckbuilder-sticky-wallet", "dielna-sticky-wallet", "obchod-sticky-wallet"];
    var html = '<div class="wallet-chip"><img src="Img/mince.webp" class="wallet-chip-img"> ' + inventar.mince + ' m</div>' +
               '<div class="wallet-chip"><img src="Img/zlato.webp" class="wallet-chip-img"> ' + (inventar.suroviny["Zlato"]||0) + ' oz Zlato</div>' +
               '<div class="wallet-chip"><img src="Img/koza.webp" class="wallet-chip-img"> ' + (inventar.suroviny["Koža"]||0) + ' oz Koža</div>' +
               '<div class="wallet-chip"><img src="Img/drevo.webp" class="wallet-chip-img"> ' + (inventar.suroviny["Drevo"]||0) + ' oz Drevo</div>' +
               '<div class="wallet-chip"><img src="Img/zelezo.webp" class="wallet-chip-img"> ' + (inventar.suroviny["Kov"]||0) + ' oz Kov</div>' +
               '<div class="wallet-chip"><img src="Img/bronz.webp" class="wallet-chip-img"> ' + (inventar.suroviny["Bronz"]||0) + ' oz Bronz</div>' +
               '<div class="wallet-chip"><img src="Img/striebro.webp" class="wallet-chip-img"> ' + (inventar.suroviny["Striebro"]||0) + ' oz Striebro</div>' +
               '<div class="wallet-chip"><img src="Img/zlato.webp" class="wallet-chip-img"> ' + (inventar.jokers["F"]||0) + 'x F-JK</div>';

    walletIds.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.innerHTML = html;
    });

    vykresliRozbalovaciBatoh();
}

// =========================================================================
// 🎴 DECKBUILDER & ZOSTRAVA
// =========================================================================
function nacitatUlozenuZostavu() {
    try {
        var ulozene = localStorage.getItem("homewars_deck_v1");
        if (ulozene) {
            inventar.zostava = JSON.parse(ulozene);
        }
    } catch(e) {}

    if (!Array.isArray(inventar.zostava) || inventar.zostava.length < 25) {
        automatickyDoplnitDefaultZostavu(false);
    }
}

function ulozitZostavuDoStorage() {
    try {
        localStorage.setItem("homewars_deck_v1", JSON.stringify(inventar.zostava));
    } catch(e) {}
}

function automatickyDoplnitDefaultZostavu(showNotify) {
    var defaultPool = Object.keys(MASTER_REGISTRY).filter(function(k) {
        return !MASTER_REGISTRY[k].isJoker;
    });

    inventar.zostava = defaultPool.slice(0, 25);
    ulozitZostavuDoStorage();
    if (showNotify !== false) {
        ukazOznamenie("⚡ PREDVOLENÁ ZOSTRAVA", "Zostava bola automaticky naplnená 25 základnými kartami!");
    }
    vygenerujDeckbuilder();
    aktualizujVsetkyStickyWallety();
}

function prepniKartuVZostave(kartaMeno) {
    var idx = inventar.zostava.indexOf(kartaMeno);
    if (idx !== -1) {
        inventar.zostava.splice(idx, 1);
    } else {
        inventar.zostava.push(kartaMeno);
    }
    ulozitZostavuDoStorage();
    vygenerujDeckbuilder();
}

function vygenerujDeckbuilder() {
    var e = document.getElementById("deckbuilder-zoznam");
    var countEl = document.getElementById("deckbuilder-count");
    var msgEl = document.getElementById("deckbuilder-msg");
    if (!e) return;
    e.innerHTML = "";

    var count = inventar.zostava.length;
    if (countEl) countEl.innerText = count;

    if (msgEl) {
        if (count >= 25) {
            msgEl.innerHTML = "<span style='color:#10b981;'>✅ Zostava je pripravená na boj!</span>";
        } else {
            msgEl.innerHTML = "<span style='color:#ff4d4d;'>⚠️ Potrebuješ ešte pridať " + (25 - count) + " kariet!</span>";
        }
    }

    Object.keys(MASTER_REGISTRY).forEach(function(t) {
        var reg = MASTER_REGISTRY[t];
        if (reg.isJoker) return;

        var isVBaliku = (inventar.zostava.indexOf(t) !== -1);

        var wrap = document.createElement("div");
        wrap.className = "karta-karta-wrapper " + (isVBaliku ? "deck-active-card" : "deck-inactive-card");
        wrap.onclick = function() { prepniKartuVZostave(t); };

        var cardCls = (inventar.karty[t] && inventar.karty[t].aktivnaTrieda) ? inventar.karty[t].aktivnaTrieda : "F";
        var div = document.createElement("div");
        div.className = "karta cls-" + (reg.isPlatinum ? "PLATINUM" : cardCls);
        div.innerHTML = vytvorHTMLKarty(t, getRealPower({n:t, cls:cardCls}), cardCls, reg.row, reg.p, false);
        wrap.appendChild(div);

        var badge = document.createElement("div");
        badge.style.marginTop = "8px";
        badge.style.fontWeight = "bold";
        badge.style.fontSize = "0.85em";
        badge.innerHTML = isVBaliku ? "<span style='color:#10b981;'>✅ V Zostave</span>" : "<span style='color:#888;'>+ Pridať do Zostavy</span>";
        wrap.appendChild(badge);

        e.appendChild(wrap);
    });

    aktualizujVsetkyStickyWallety();
}

function pripravBalicekPreZapas(pNum) {
    var pool = inventar.zostava.slice();
    for (var i = pool.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = pool[i]; pool[i] = pool[j]; pool[j] = temp;
    }
    return pool;
}

function vytiahniRukuZRozdanehoBalicka(pNum) {
    var deck = (pNum === 1) ? p1_active_deck : p2_active_deck;
    var hand = [];
    for (var i = 0; i < 10; i++) {
        if (deck.length > 0) {
            var cardName = deck.pop();
            var cardCls = (pNum === 1 && inventar.karty[cardName] && inventar.karty[cardName].aktivnaTrieda) ? inventar.karty[cardName].aktivnaTrieda : "F";
            hand.push({ n: cardName, cls: cardCls });
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

    overlay.innerHTML = '<video id="chest-video-element" src="' + videoSrc + '" playsinline webkit-playsinline muted></video><div id="chest-click-prompt" class="chest-prompt-text">🎬 KLIKNI PRE OTVORENIE TRUHLE</div>';

    document.body.appendChild(overlay);

    var vid = document.getElementById("chest-video-element");
    var promptTxt = document.getElementById("chest-click-prompt");

    overlay.onclick = function() {
        if (vid.paused) {
            vid.play().catch(function(){});
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
    if (r1 >= 2) {
        p1_played_cards.forEach(function(c) {
            var reg = getRegistryCard(c.n);
            if (!reg.isSpell && !reg.isItem && !reg.isJoker && !reg.isPlatinum) {
                if (reg.p === 1) extraLowPwrCoins += 25;
                else if (reg.p === 2) extraLowPwrCoins += 15;
                else if (reg.p === 3) extraLowPwrCoins += 10;
                else if (reg.p === 4) extraLowPwrCoins += 5;
            }
        });
        extraLowPwrCoins = Math.min(125, extraLowPwrCoins);
    }

    coinsEarned += extraLowPwrCoins;
    ziskaneSuroviny["Koža"] = (ziskaneSuroviny["Koža"] || 0) + 1;

    inventar.mince += coinsEarned;
    inventar.suroviny["Zlato"] = (inventar.suroviny["Zlato"] || 0) + goldEarned;
    Object.keys(ziskaneSuroviny).forEach(function(mat) {
        inventar.suroviny[mat] = (inventar.suroviny[mat] || 0) + ziskaneSuroviny[mat];
    });

    var odmenyHtml = '<div class="karta-surovina"><div class="surovina-badge">+' + coinsEarned + '</div><div class="surovina-foto" style="background-image: url(\'Img/mince.webp\');"></div><div class="surovina-stitok"><div class="surovina-nazov">Kopa Mincí' + (extraLowPwrCoins > 0 ? ' (+' + extraLowPwrCoins + ' bonus)' : '') + '</div></div></div>';

    if (goldEarned > 0) {
        odmenyHtml += '<div class="karta-surovina"><div class="surovina-badge">+' + goldEarned + ' oz</div><div class="surovina-foto" style="background-image: url(\'Img/zlato.webp\');"></div><div class="surovina-stitok"><div class="surovina-nazov">Hruda Zlata</div></div></div>';
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
    aktualizujVsetkyStickyWallety();
}

function zatvoritTruhluAOpustit(overlayId) {
    var el = document.getElementById(overlayId);
    if (el) el.remove();
    obnovitHudbuPoVideu();
    zobraziťObrazovku("hlavne-menu");
}

// =========================================================================
// 🔨 DIELŇA & KOVANIE
// =========================================================================
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
    jokerActions.innerHTML = '<div style="font-size:0.75em; margin:6px 0; color:#a855f7; text-align:center;">Joker Zásoby: <strong>' + jokerCountsText + '</strong></div><select id="step-select-JokerCard" style="width:100%; font-size:0.75em; margin-bottom:4px; background:#110e0c; color:#ffcc00; border:1px solid #5a4d3e; padding:3px;"><option value="F->E">F ➔ E (3xF JK | 10m | 3 oz Koža)</option><option value="E->D">E ➔ D (3xE JK | 25m | 3 oz Drevo)</option><option value="D->C">D ➔ C (3xD JK | 50m | 3 oz Kov)</option><option value="C->B">C ➔ B (3xC JK | 100m | 3 oz Bronz)</option><option value="B->A">B ➔ A (3xB JK | 250m | 3 oz Striebro)</option></select><button class="btn-forge" style="background:#8b5cf6;" onclick="vylepsiKartuVoForge(\'Joker Card\', document.getElementById(\'step-select-JokerCard\').value, \'none\')">🔨 Vykovat Jokera</button>';
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

        var actions = '<div style="font-size:0.75em; margin:6px 0; color:#ffcc00; text-align:center;">Počty: <strong>' + countsText + '</strong></div><label style="font-size:0.75em; color:#aaa;">Krok kovania:</label><select id="step-select-' + t.replace(/\s+/g, '') + '" style="width:100%; font-size:0.75em; margin-bottom:4px; background:#110e0c; color:#ffcc00; border:1px solid #5a4d3e; padding:3px;"><option value="F->E">F ➔ E (3xF | 10m | 3 oz Koža)</option><option value="E->D">E ➔ D (3xE | 25m | 3 oz Drevo)</option><option value="D->C">D ➔ C (3xD | 50m | 3 oz Kov)</option><option value="C->B">C ➔ B (3xC | 100m | 3 oz Bronz)</option><option value="B->A">B ➔ A (3xB | 250m | 3 oz Striebro)</option><option value="A->S">A ➔ S (3xA | 500m | 3 oz Zlato)</option></select><label style="font-size:0.75em; color:#aaa;">Zvitok ochrany:</label><select id="pergamen-select-' + t.replace(/\s+/g, '') + '" style="width:100%; font-size:0.75em; margin-bottom:6px; background:#110e0c; color:#ffcc00; border:1px solid #5a4d3e; padding:3px;"><option value="none">Bez Zvitku (0 oz Zlata / Risk)</option><option value="basic">Základný Zvitok (100 oz Zlata / +10%)</option><option value="advanced">Pokročilý Zvitok (500 oz Zlata / +25%)</option><option value="legendary">Legendárny Zvitok (1000 oz Zlata / +55%)</option></select><button class="btn-forge" onclick="vylepsiKartuVoForge(\'' + t.replace(/'/g, "\\'") + '\', document.getElementById(\'step-select-' + t.replace(/\s+/g, '') + '\').value, document.getElementById(\'pergamen-select-' + t.replace(/\s+/g, '') + '\').value)">🔨 Forge</button>';

        wrapper.appendChild(cardDiv);
        var actDiv = document.createElement("div");
        actDiv.style.width = "100%";
        actDiv.innerHTML = actions;
        wrapper.appendChild(actDiv);

        e.appendChild(wrapper);
    });

    aktualizujVsetkyStickyWallety();
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

    ukazOznamenie("⚡ DEV CHEAT AKTIVOVANÝ", "Pridané mince, Zlato (oz), suroviny (oz) a duplikáty!");
    aktualizujPanelDielne();
    aktualizujVsetkyStickyWallety();
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
        ukazOznamenie("⚠️ NEDOSTATOK SUROVÍN", "Potrebuješ " + cfg.reqMatCount + " oz " + reqMat + "!");
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

// 📱 100% RESPONZÍVNA ANIMÁCIA KOVANIA (MOBIL & PC FIX)
function spustitVideoAnimationKovania(meno, oldCls, nextCls, isSuccess, wasProtected) {
    pozastavitHudbuPreVideo();

    var overlay = document.createElement("div");
    overlay.id = "forge-video-overlay";

    var reg = getRegistryCard(meno);
    var oldPwr = getRealPower({ n: meno, cls: oldCls });
    var nextPwr = getRealPower({ n: meno, cls: nextCls });

    var fourthCardHtml = isSuccess ? '<div id="forge-card-4" class="karta cls-' + nextCls + ' forge-slot-card" style="opacity:0;">' + vytvorHTMLKarty(meno, nextPwr, nextCls, reg.row, reg.p) + '</div>' : '';

    overlay.innerHTML = '<div class="forge-stage-169"><video id="forge-video-element" src="Img/vylepsovanie.mp4" autoplay playsinline webkit-playsinline muted></video><div class="forge-cards-container"><div id="forge-card-1" class="karta cls-' + oldCls + ' forge-slot-card">' + vytvorHTMLKarty(meno, oldPwr, oldCls, reg.row, reg.p) + '</div><div id="forge-card-2" class="karta cls-' + oldCls + ' forge-slot-card">' + vytvorHTMLKarty(meno, oldPwr, oldCls, reg.row, reg.p) + '</div><div id="forge-card-3" class="karta cls-' + oldCls + ' forge-slot-card">' + vytvorHTMLKarty(meno, oldPwr, oldCls, reg.row, reg.p) + '</div>' + fourthCardHtml + '</div></div>';

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
    vid.play().catch(function(){});

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

            var availableReal = t.repliky[oldCls] || 0;
            var realToDeduct = Math.min(3, availableReal);
            var jokersToDeduct = 3 - realToDeduct;

            if (isSuccess) {
                t.repliky[oldCls] = Math.max(0, availableReal - realToDeduct);
                if (jokersToDeduct > 0) {
                    inventar.jokers[oldCls] = Math.max(0, (inventar.jokers[oldCls] || 0) - jokersToDeduct);
                }
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
                    if (availableReal > 0) {
                        t.repliky[oldCls] = Math.max(0, availableReal - 1);
                    } else {
                        inventar.jokers[oldCls] = Math.max(0, (inventar.jokers[oldCls] || 0) - 1);
                    }
                    ukazOznamenie("💥 KOVANIE ZLYHALO!", "Suroviny zhoreli v plameňoch a prišiel si o 1 kartu!");
                } else {
                    ukazOznamenie("🛡️ KARTA OCHRÁNENÁ!", "Kovanie zlyhalo, ale Zvitok alebo Turnajová Imunita ochránila tvoju kartu!");
                }
            }
        }

        overlay.remove();
        obnovitHudbuPoVideu();
        aktualizujPanelDielne();
        aktualizujVsetkyStickyWallety();
    };
}

// =========================================================================
// 📦 TRHOVISKO & PREDAJNÝ FORMULÁR
// =========================================================================
var aukcnyCasomeračInterval = null;
var aktualnyAnonymnyStrop = 250; 
var trhovaPriemernaCenaEMA = 210; 
var pocetRealnychPredajovEMA = 0;
var aktualnyVeduciHrac = "Lord_Grob_33";
var hracovaAktivnaPonukaNaTrhu = 0;

function prepniZalozkuTrhu(tabName) {
    aktualnaZalozkaTrhu = tabName;
    document.querySelectorAll(".btn-market-tab").forEach(function(b) { b.classList.remove("active-market-tab"); });
    
    if (tabName === "trh") document.getElementById("btn-tab-trh").classList.add("active-market-tab");
    if (tabName === "sklad") document.getElementById("btn-tab-sklad").classList.add("active-market-tab");
    if (tabName === "predaj") document.getElementById("btn-tab-predaj").classList.add("active-market-tab");

    vygenerujSimulaciuTrhu();
}

function vygenerujSimulaciuTrhu() {
    var e = document.getElementById("obchod-regaly-zoznam");
    if (!e) return;
    e.innerHTML = "";

    aktualizujVsetkyStickyWallety();

    if (aktualnaZalozkaTrhu === "trh") {
        var reg = MASTER_REGISTRY["Neviditeľný Mário"];
        var realPwr = getRealPower({ n: "Neviditeľný Mário", cls: "E" });
        var emaTypLabel = (pocetRealnychPredajovEMA >= 3) ? '<span style="color:#10b981; font-size:0.8em;">(🛒 Reálna trhová cena)</span>' : '<span style="color:#f59e0b; font-size:0.8em;">(⚙️ Vypočítaná obstarávacia cena)</span>';

        e.innerHTML = '<div style="background:rgba(30,20,10,0.85); border:2px solid #d4af37; padding:15px; border-radius:10px; text-align:center; margin-bottom:20px;"><h3 style="color:#d4af37; margin-top:0;">👑 ANONYMNÉ AUKČNÉ TRHOVISKO</h3><p style="font-size:0.9em; color:#ccc;">Súťaž o vzácne položky od iných hráčov na serveri!</p><div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:10px;"><button onclick="testSimulaciaPrihodeniaBota()" class="btn-dev-action">🤖 Simulovať prihodenie Bota</button><button onclick="testSimulaciaRychlychPredajov()" class="btn-dev-action">📊 Simulovať reálny predaj (Prepnúť EMA)</button></div></div><div class="auction-card-box"><div class="karta cls-E">' + vytvorHTMLKarty("Neviditeľný Mário", realPwr, "E", reg.row, reg.p) + '</div><div style="flex-grow:1;"><h3 style="color:#ffcc00; margin:0 0 5px 0;">Neviditeľný Mário (E-Class) - 10x Balíček</h3><p style="margin:2px 0; color:#aaa; font-size:0.9em;">Predajca: <strong>Mníchov_Master</strong></p><div style="background:rgba(0,0,0,0.6); border:1px solid #5a4d3e; padding:12px; border-radius:6px; margin:10px 0; max-width:480px;"><div>⏱️ Čas aukcie: <span id="auction-timer" style="color:#ffcc00; font-weight:bold;">00:59:59</span> <small style="color:#888;">(Anti-Snipe: +3m)</small></div><div style="margin-top:4px;">👑 Aktuálne najvyššia ponuka (Vedie): <strong style="color:#ffcc00;" id="auction-leader">' + aktualnyVeduciHrac + '</strong></div><div style="margin-top:4px;">📊 Indikátor Ceny (EMA): <strong style="color:#3b82f6;">' + trhovaPriemernaCenaEMA + ' m</strong> ' + emaTypLabel + '</div><div style="margin-top:4px;">💰 Okamžitý Výkup (Strop): <strong style="color:#10b981;">' + aktualnyAnonymnyStrop + ' m</strong></div></div><div style="display:flex; gap:10px;"><button onclick="anonymnePrihoditSumu(' + aktualnyAnonymnyStrop + ')" style="background:linear-gradient(180deg, #3b2d1d 0%, #21180e 100%); color:#ffcc00; border:1px solid #d4af37; padding:10px 18px; border-radius:6px; font-weight:bold; cursor:pointer;">🕵️ Anonymne Prihodiť</button><button onclick="okamziteOdkupitKartu(' + aktualnyAnonymnyStrop + ', \'Balíček 10x E-Mário\')" style="background:#10b981; color:#fff; border:none; padding:10px 18px; border-radius:6px; font-weight:bold; cursor:pointer;">⚡ Kúpiť Ihneď za ' + aktualnyAnonymnyStrop + 'm</button></div></div></div>';

        spustitOdpocitavanieAukcie();
    } else if (aktualnaZalozkaTrhu === "sklad") {
        var skladHtml = '<div style="background:rgba(30,20,10,0.85); border:2px solid #d4af37; padding:15px; border-radius:10px; text-align:center; margin-bottom:15px;"><h3 style="color:#d4af37; margin-top:0;">🏛️ KRÁĽOVSKÝ ŠTÁTNY SKLAD (NÚDZOVÉ ZÁSOBY)</h3><p style="font-size:0.9em; color:#ccc;">Ak na trhu chýbajú suroviny, štát ti ich garantovane predá za mince.</p></div><div class="market-store-grid">';

        Object.keys(STATNY_SKLAD_CENNIK).forEach(function(mat) {
            var item = STATNY_SKLAD_CENNIK[mat];
            skladHtml += '<div class="market-store-card"><img src="' + item.img + '" class="market-store-img"><strong style="color:#ffcc00; font-size:1em;">' + mat + '</strong><span style="color:#aaa; font-size:0.85em;">Cena: <strong style="color:#ffcc00;">' + item.price + ' m / 1 oz</strong></span><div style="display:flex; gap:6px; margin-top:6px;"><button onclick="kupitSurovinuZoStatnehoSkladu(\'' + mat + '\', 1)" style="background:#3b2d1d; color:#ffcc00; border:1px solid #d4af37; padding:5px 8px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:0.8em;">+1 oz</button><button onclick="kupitSurovinuZoStatnehoSkladu(\'' + mat + '\', 5)" style="background:#10b981; color:#fff; border:none; padding:5px 8px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:0.8em;">+5 oz</button></div></div>';
        });

        skladHtml += '</div>';
        e.innerHTML = skladHtml;
    } else if (aktualnaZalozkaTrhu === "predaj") {
        var dostupneKarty = Object.keys(inventar.karty).filter(function(k) {
            var cData = inventar.karty[k];
            return typeof cData.repliky === "object";
        });

        var optionsHtml = "";
        dostupneKarty.forEach(function(k) {
            optionsHtml += '<option value="' + k + '">' + k + '</option>';
        });

        var predajHtml = '<div class="sell-form-container"><h3 style="color:#ffcc00; margin-top:0; text-align:center; font-family:Georgia, serif;">📦 VYVESIŤ NOVÚ AUKCIU NA TRHOVISKO</h3><div class="sell-form-row"><label>1. Vyber kartu z batohu:</label><select id="sell-card-select" class="sell-form-select" onchange="aktualizujDostupneTriedyPrePredaj()">' + optionsHtml + '</select></div><div class="sell-form-row"><label>2. Vyber triedu karty:</label><select id="sell-class-select" class="sell-form-select" onchange="aktualizujMaxKusovPrePredaj()"><option value="F">F-Class</option><option value="E">E-Class</option><option value="D">D-Class</option><option value="C">C-Class</option><option value="B">B-Class</option><option value="A">A-Class</option></select></div><div class="sell-form-row"><label>3. Počet kusov v balíku: <strong id="sell-count-label" style="color:#ffcc00;">1x</strong> (Skladom: <span id="sell-max-stock">1</span>x)</label><input type="range" id="sell-count-range" min="1" max="1" value="1" style="width:100%;" oninput="document.getElementById(\'sell-count-label\').innerText = this.value + \'x\';"></div><div class="sell-form-row"><label>4. Cena Okamžitého výkupu (m):</label><input type="number" id="sell-price-input" class="sell-form-input" value="35" min="1"></div><div style="text-align:center; margin-top:15px;"><button onclick="odoslatPredajnyFormular()" style="background:#10b981; color:#fff; border:none; padding:12px 30px; border-radius:6px; font-weight:bold; font-size:1.05em; cursor:pointer; width:100%;">🚀 Potvrdiť a Vyvesiť na Trh</button></div></div>';

        predajHtml += '<h4 style="color:#d4af37; text-align:center;">📋 PREHĽAD TVOJICH ZÁSOB V BATOHU</h4><div class="dielna-grid">';

        Object.keys(inventar.karty).forEach(function(kName) {
            var cData = inventar.karty[kName];
            var reg = getRegistryCard(kName);
            if (typeof cData.repliky === "object") {
                Object.keys(cData.repliky).forEach(function(cls) {
                    var count = cData.repliky[cls] || 0;
                    if (count > 0) {
                        var isInDeck = (inventar.zostava.indexOf(kName) !== -1);
                        var deckTag = isInDeck ? '<span style="color:#ff4d4d; font-size:0.75em; display:block;">⚠️ V BALÍČKU</span>' : '';
                        predajHtml += '<div class="karta-karta-wrapper"><div class="karta cls-' + cls + '">' + vytvorHTMLKarty(kName, getRealPower({n:kName, cls:cls}), cls, reg.row, reg.p, false) + '</div><div style="font-size:0.8em; margin:6px 0; color:#ffcc00; text-align:center;">Na sklade: <strong>' + count + 'x</strong>' + deckTag + '</div></div>';
                    }
                });
            }
        });

        predajHtml += '</div>';
        e.innerHTML = predajHtml;
        setTimeout(aktualizujDostupneTriedyPrePredaj, 50);
    }
}

function aktualizujDostupneTriedyPrePredaj() {
    var kNameEl = document.getElementById("sell-card-select");
    if (!kNameEl) return;
    var kName = kNameEl.value;
    var cData = inventar.karty[kName];
    var sel = document.getElementById("sell-class-select");
    if (!sel || !cData) return;
    sel.innerHTML = "";

    ["F", "E", "D", "C", "B", "A"].forEach(function(cls) {
        if (cData.repliky && cData.repliky[cls] > 0) {
            sel.innerHTML += '<option value="' + cls + '">' + cls + '-Class (' + cData.repliky[cls] + 'x)</option>';
        }
    });

    aktualizujMaxKusovPrePredaj();
}

function aktualizujMaxKusovPrePredaj() {
    var kNameEl = document.getElementById("sell-card-select");
    var clsEl = document.getElementById("sell-class-select");
    if (!kNameEl || !clsEl) return;
    var kName = kNameEl.value;
    var cls = clsEl.value;
    var cData = inventar.karty[kName];
    var max = (cData && cData.repliky && cData.repliky[cls]) ? cData.repliky[cls] : 1;

    var range = document.getElementById("sell-count-range");
    var stockLabel = document.getElementById("sell-max-stock");
    var countLabel = document.getElementById("sell-count-label");

    if (range) {
        range.max = max;
        range.value = 1;
    }
    if (stockLabel) stockLabel.innerText = max;
    if (countLabel) countLabel.innerText = "1x";
}

function odoslatPredajnyFormular() {
    var kName = document.getElementById("sell-card-select").value;
    var cls = document.getElementById("sell-class-select").value;
    var count = parseInt(document.getElementById("sell-count-range").value);
    var price = parseInt(document.getElementById("sell-price-input").value);

    if (isNaN(price) || price <= 0) {
        ukazOznamenie("⚠️ CHYBA", "Zadaj platnú cenu!");
        return;
    }

    var isInDeck = (inventar.zostava.indexOf(kName) !== -1);
    if (isInDeck) {
        var potvrd = confirm("⚠️ KARTA JE V BALÍČKU!\nTúto kartu (" + kName + ") máš zaradenú vo svojej zápasovej zostave!\n\nNaozaj ju chceš vyvesiť na trh?");
        if (!potvrd) return;
    }

    inventar.karty[kName].repliky[cls] -= count;
    
    var hasRemaining = false;
    Object.keys(inventar.karty[kName].repliky).forEach(function(cKey) {
        if (inventar.karty[kName].repliky[cKey] > 0) hasRemaining = true;
    });

    if (!hasRemaining) {
        inventar.karty[kName].repliky["F"] = 1;
        inventar.karty[kName].aktivnaTrieda = "F";
    }

    ukazOznamenie("🎉 POLOŽKA ZALISTOVANÁ", "Balík **" + count + "x " + kName + " (" + cls + "-Class)** bol vyvesený na anonymný trh za " + price + " mincí!");
    vygenerujSimulaciuTrhu();
    aktualizujVsetkyStickyWallety();
    vygenerujDeckbuilder();
}

function kupitSurovinuZoStatnehoSkladu(mat, pocetOz) {
    var item = STATNY_SKLAD_CENNIK[mat];
    if (!item) return;

    var celkovaCena = item.price * pocetOz;
    if (inventar.mince < celkovaCena) {
        ukazOznamenie("⚠️ NEDOSTATOK MINCÍ", "Na nákup " + pocetOz + " oz " + mat + " potrebuješ " + celkovaCena + " mincí!");
        return;
    }

    inventar.mince -= celkovaCena;
    inventar.suroviny[mat] = (inventar.suroviny[mat] || 0) + pocetOz;
    ukazOznamenie("🏛️ NÁKUP ZO ŠTÁTNEHO SKLADU", "Kúpil si **" + pocetOz + " oz " + mat + "** za " + celkovaCena + " mincí!");
    aktualizujVsetkyStickyWallety();
}

function anonymnePrihoditSumu(stropVal) {
    var ponukaStr = prompt("Zadaj svoju tajnú anonymnú ponuku v minciach (Strop pre okamžitý výkup je " + stropVal + "m):");
    if (!ponukaStr) return;
    var ponuka = parseInt(ponukaStr);

    if (isNaN(ponuka) || ponuka <= 0) { ukazOznamenie("⚠️ CHYBA", "Zadaj platné číslo!"); return; }
    if (inventar.mince < ponuka) { ukazOznamenie("⚠️ NEDOSTATOK MINCÍ", "Nemáš dostatok mincí v batohu!"); return; }

    if (ponuka >= stropVal) {
        inventar.mince -= stropVal;
        hracovaAktivnaPonukaNaTrhu = 0;
        pocetRealnychPredajovEMA++;
        ukazOznamenie("⚡ AUTOMATICKÝ VÝKUP!", "Tvoja ponuka (" + ponuka + "m) presiahla hodnotu Okamžitého výkupu (" + stropVal + "m). Položka je okamžite tvoja za " + stropVal + "m!");
        aktualizujVsetkyStickyWallety();
    } else {
        inventar.mince -= ponuka;
        hracovaAktivnaPonukaNaTrhu = ponuka;
        aktualnyVeduciHrac = "Hráč 1 (Ty)";
        var lEl = document.getElementById("auction-leader");
        if (lEl) lEl.innerText = aktualnyVeduciHrac;
        ukazOznamenie("🕵️ PONUKA ZAREGISTROVANÁ", "Tvoja ponuka " + ponuka + "m bola rezervovaná z batohu a teraz si na **1. mieste**!");
        aktualizujVsetkyStickyWallety();
    }
}

function okamziteOdkupitKartu(stropVal, nazov) {
    if (inventar.mince < stropVal) { ukazOznamenie("⚠️ NEDOSTATOK MINCÍ", "Potrebuješ " + stropVal + "m na okamžitý výkup!"); return; }
    inventar.mince -= stropVal;
    hracovaAktivnaPonukaNaTrhu = 0;
    pocetRealnychPredajovEMA++;
    ukazOznamenie("🎉 KÚPENÉ IHNEĎ!", "Zaplatil si " + stropVal + "m. Položka " + nazov + " ti pristala v batohu!");
    aktualizujVsetkyStickyWallety();
}

function testSimulaciaPrihodeniaBota() {
    aktualnyVeduciHrac = "Bot_Tester_" + Math.floor(Math.random() * 100);
    var lEl = document.getElementById("auction-leader");
    if (lEl) lEl.innerText = aktualnyVeduciHrac;

    if (hracovaAktivnaPonukaNaTrhu > 0) {
        inventar.mince += hracovaAktivnaPonukaNaTrhu;
        ukazOznamenie("🤖 PREBITIE PONUKY", "Súper <strong>" + aktualnyVeduciHrac + "</strong> ťa prehodil! Tvojich **" + hracovaAktivnaPonukaNaTrhu + " m** ti bolo vrátených späť do batohu!");
        hracovaAktivnaPonukaNaTrhu = 0;
        aktualizujVsetkyStickyWallety();
    } else {
        ukazOznamenie("🤖 PRIHODENIE BOTA", "Súper <strong>" + aktualnyVeduciHrac + "</strong> práve prevzal 1. miesto na trhu!");
    }
}

function testSimulaciaRychlychPredajov() {
    pocetRealnychPredajovEMA = 5;
    trhovaPriemernaCenaEMA = Math.floor(Math.random() * 60) + 190;
    vygenerujSimulaciuTrhu();
    ukazOznamenie("📊 PREPNUTIE EMA INDIKÁTORA", "Prebehlo 5 reálnych transakcií! Indikátor sa prepol na **(🛒 Reálna trhová cena)** s hodnotou **" + trhovaPriemernaCenaEMA + " m**!");
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
        audio.play().catch(function(){});
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

// =========================================================================
// 🛡️ DYNAMICKÝ PREPOČET SILY
// =========================================================================
function vypocitajDynamickuSiluJednejKarty(card, pNum) {
    var reg = getRegistryCard(card.n);
    if (reg.isSpell || reg.isItem || reg.isJoker) return "none";

    var myCards = (pNum === 1) ? p1_played_cards : p2_played_cards;
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

    sc1 = vypocitajSiluHracovychKariet(1, p1_played_cards, p2_played_cards, isNelaOnTable, p1Katy, p2Katy, p1_erik_buff_row) + p1MulliganRound1Bonus;
    sc2 = vypocitajSiluHracovychKariet(2, p2_played_cards, p1_played_cards, isNelaOnTable, p2Katy, p1Katy, p2_erik_buff_row) + p2MulliganRound1Bonus;

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

function otvorErikBuffDialog(pNum, callback) {
    if (pNum === 2 && jeSingleplayer) {
        var roll = Math.random();
        var chooseBest = (obtiaznostAI === "A") || (obtiaznostAI === "B" && roll <= 0.65);
        if (chooseBest) {
            var r1Points = p2_played_cards.filter(function(c){return getRegistryCard(c.n).row === 1;}).length;
            var r2Points = p2_played_cards.filter(function(c){return getRegistryCard(c.n).row === 2;}).length;
            var r3Points = p2_played_cards.filter(function(c){return getRegistryCard(c.n).row === 3;}).length;
            if (r3Points >= r1Points && r3Points >= r2Points) p2_erik_buff_row = 3;
            else if (r2Points >= r1Points) p2_erik_buff_row = 2;
            else p2_erik_buff_row = 1;
        } else {
            p2_erik_buff_row = Math.floor(Math.random() * 3) + 1;
        }
        ukazOznamenie("📢 ERIK BUFF (SÚPER)", "Súper zvolil posilnenie **" + p2_erik_buff_row + ". Radu** o +50%!");
        if (typeof callback === "function") callback();
        return;
    }

    var modal = document.createElement("div");
    modal.className = "custom-notify-overlay";
    modal.style.zIndex = "999999";
    modal.innerHTML = '<div class="custom-notify-box"><h3 class="custom-notify-title">📢 ERIK - VOĽBA RADU (+50%)</h3><p>Ktorý rad chceš natrvalo posilniť o +50%?</p><div style="display:flex; gap:8px; justify-content:center; margin-top:15px;"><button onclick="zvolErikRow(1)" class="btn-dev-action">1. Muži</button><button onclick="zvolErikRow(2)" class="btn-dev-action">2. Ženy</button><button onclick="zvolErikRow(3)" class="btn-dev-action">3. Zvieratá</button></div></div>';
    document.body.appendChild(modal);

    window.zvolErikRow = function(r) {
        if (pNum === 1) p1_erik_buff_row = r;
        else p2_erik_buff_row = r;
        modal.remove();
        ukazOznamenie("📢 ERIK AKTIVOVANÝ", "Posilnil si **" + r + ". Rad** o +50%!");
        if (typeof callback === "function") callback();
    };
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
        container.innerHTML = '<h3 style="color:#ffcc00;">📜 KAPITOLA I: ŠANCE DROPINGU Z TRUHIEL & BONUSY</h3><p style="font-size:1.05em; line-height:1.6;">Odmeny dostávaš po dokončení zápasu. Všetky suroviny sa evidujú v Unciach (oz). Slabé karty (základ 1b až 4b) na stole ti navyše generujú extra mincový bonus pri výhre!</p><div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-top:20px;"><div style="background:rgba(0,0,0,0.6); border:2px solid #5a4d3e; padding:18px; border-radius:10px;"><h4 style="color:#d4af37; margin-top:0;">📦 TRUHLA ÚČASTNÍKA</h4><ul style="line-height:1.8;"><li><strong>Mince:</strong> 50 až 100 mincí.</li><li><strong>Karty:</strong> 1× až 3× náhodná F-kópia.</li><li><strong>Tvrdená koža:</strong> 100% garancia (1 oz).</li><li><strong>Zlato:</strong> 10 % šanca na 1 oz Zlata.</li></ul></div><div style="background:rgba(0,0,0,0.6); border:2px solid #5a4d3e; padding:18px; border-radius:10px;"><h4 style="color:#ffcc00; margin-top:0;">🏆 TRUHLA VÍŤAZA</h4><ul style="line-height:1.8;"><li><strong>Mince:</strong> 150 až 300 mincí.</li><li><strong>Karty (Balík):</strong> 3× až 6× F-kariet.</li><li><strong>Garantované Zlato:</strong> 2 oz až 5 oz Zlata.</li></ul></div></div>';
    } else if (aktualnaStranaKnihy === 2) {
        container.innerHTML = '<h3 style="color:#ffcc00;">🔨 KAPITOLA II: KOVÁČSKY STROM & JOKER CARD</h3><p style="font-size:1.05em; line-height:1.6;">Na kovanie potrebuješ 3 rovnocenné karty zvolenej triedy (alebo <strong>Joker Cards</strong>) + 3 oz suroviny + poplatok. Joker sa ková samostatne od F po A a nahradí akúkoľvek kartu v Dielni!</p>';
    } else if (aktualnaStranaKnihy === 3) {
        container.innerHTML = '<h3 style="color:#ffcc00;">🛠️ KAPITOLA III: SETOVÉ BONUSY RADOV</h3><p style="font-size:1.05em; line-height:1.6;">Za určité počty vykovaných kariet v tom istom rade získavaš sčítateľné +1b bonusy pre celý rad:</p><ul><li><strong>1× S-Class:</strong> +1b pre celý rad</li><li><strong>2× A-Class:</strong> +1b pre celý rad</li><li><strong>3× B-Class:</strong> +1b pre celý rad</li><li><strong>4× C-Class:</strong> +1b pre celý rad</li><li><strong>5× D-Class:</strong> +1b pre celý rad</li><li><strong>6× E-Class:</strong> +1b pre celý rad</li></ul>';
    } else if (aktualnaStranaKnihy === 4) {
        container.innerHTML = '<h3 style="color:#ffcc00;">⚡ KAPITOLA IV: 20 PLATINOVÝCH KARIET & REBRÍČKY</h3><p style="font-size:1.05em; line-height:1.6;">V kráľovstve existuje presne 20 unikátnych Platinových kariet, z ktorých každá je naviazaná na 1. miesto v jednej z 20 kategórií Siene Slávy! Pri 7-dňovej inaktivite sa karta dočasne uvoľňuje 2. hráčovi v poradí.</p>';
    } else if (aktualnaStranaKnihy === 5) {
        container.innerHTML = '<h3 style="color:#ffcc00;">🛒 KAPITOLA V: TRHOVISKO & KRÁĽOVSKÝ SKLAD</h3><p style="font-size:1.05em; line-height:1.6;">Aukcie prebiehajú anonymne. Ak ti chýbajú suroviny na kovanie, Kráľovský štátny sklad ti ich kedykoľvek predá za mince!</p>';
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
        { name: "Koža", val: (inventar.suroviny["Koža"] || 0) + " oz", img: "Img/koza.webp" },
        { name: "Drevo", val: (inventar.suroviny["Drevo"] || 0) + " oz", img: "Img/drevo.webp" },
        { name: "Kov", val: (inventar.suroviny["Kov"] || 0) + " oz", img: "Img/zelezo.webp" },
        { name: "Bronz", val: (inventar.suroviny["Bronz"] || 0) + " oz", img: "Img/bronz.webp" },
        { name: "Striebro", val: (inventar.suroviny["Striebro"] || 0) + " oz", img: "Img/striebro.webp" },
        { name: "Zlato", val: (inventar.suroviny["Zlato"] || 0) + " oz", img: "Img/zlato.webp" },
        { name: "Jokers", val: (inventar.jokers["F"] || 0) + "x F-JK", img: "Img/zlato.webp" }
    ];

    var html = "";
    items.forEach(function(item) {
        html += '<div class="inventory-mini-card"><img src="' + item.img + '" class="inventory-mini-img" alt="' + item.name + '"><div class="inventory-mini-info"><span class="inventory-mini-title">' + item.name + '</span><span class="inventory-mini-val">' + item.val + '</span></div></div>';
    });

    el.innerHTML = html;
}

// 🔍 DETAJL KARTY MODAL
function otvorDetailKarty(meno, inicialnaTrieda) {
    var reg = getRegistryCard(meno);
    var modal = document.createElement("div");
    modal.className = "card-modal";
    modal.style.zIndex = "9999999";
    modal.onclick = function() { modal.remove(); };

    modal.innerHTML = '<div class="modal-content" style="text-align:center; max-width:580px; background:rgba(15,10,5,0.97);" onclick="event.stopPropagation()"><span class="card-modal-close" onclick="this.closest(\'.card-modal\').remove()">&times;</span><h2 style="color:#d4af37; margin-top:0; font-family:Georgia, serif;">🔍 DETAJLNÝ NÁHĽAD KARTY</h2><div style="display:flex; justify-content:center; margin:15px 0;"><div class="karta cls-' + inicialnaTrieda + '" style="transform: scale(1.15); transform-origin: center; margin:20px 0;">' + vytvorHTMLKarty(meno, getRealPower({ n: meno, cls: inicialnaTrieda }), inicialnaTrieda, reg.row, reg.p, false) + '</div></div><p style="font-size:1.05em; line-height:1.6; color:#e0d0b0; background:rgba(0,0,0,0.5); padding:15px; border-radius:8px; border:1px solid #5a4d3e; margin-top:20px;">' + (reg.abilityDesc || reg.desc || "Obyčajná bojová jednotka.") + '</p></div>';

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
function otvoriťObchod() { document.getElementById("obchod-modal").style.display = "flex"; prepniZalozkuTrhu("trh"); }
function otvoriťDielňu() { document.getElementById("dielna-modal").style.display = "flex"; aktualizujPanelDielne(); }

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

// =========================================================================
// ⚔️ INICIALIZÁCIA ZÁPASU & BEZPEČNÝ ENGINE
// =========================================================================
function spustitZapasLokálnePVP() { 
    if (inventar.zostava.length < 25) {
        ukazOznamenie("⚠️ NEÚPLNÁ ZOSTRAVA", "Na vstup do zápasu potrebuješ mať v Deckbuilderi aspoň 25 kariet! (Aktuálne: " + inventar.zostava.length + ")");
        return;
    }
    jeSingleplayer = false; 
    inicializujNovyZapas(); 
}

function zobraziťMenuAI() { 
    if (inventar.zostava.length < 25) {
        ukazOznamenie("⚠️ NEÚPLNÁ ZOSTRAVA", "Na vstup do zápasu potrebuješ mať v Deckbuilderi aspoň 25 kariet! (Aktuálne: " + inventar.zostava.length + ")");
        return;
    }
    var obt = prompt("Vyber obtiažnosť AI (A, B, C):", "B"); 
    if (obt) { obtiaznostAI = obt.toUpperCase(); spustitZapasProtiAI(); } 
}

function spustitZapasProtiAI() { 
    if (inventar.zostava.length < 25) {
        ukazOznamenie("⚠️ NEÚPLNÁ ZOSTRAVA", "Na vstup do zápasu potrebuješ mať v Deckbuilderi aspoň 25 kariet! (Aktuálne: " + inventar.zostava.length + ")");
        return;
    }
    jeSingleplayer = true; 
    inicializujNovyZapas(); 
}

function inicializujNovyZapas() {
    p1_played_cards = []; p2_played_cards = [];
    p1_spalene = []; p2_spalene = [];
    odhodene_karty_kola = [];
    neutralne_vplyvy = [];
    p1_erik_buff_row = null; p2_erik_buff_row = null;
    r1 = 0; r2 = 0; sc1 = 0; sc2 = 0;
    p1Pass = false; p2Pass = false;
    p1MulliganRound1Bonus = 0; p2MulliganRound1Bonus = 0;
    aktualnyHrac = 1; blokujVykladanie = false;

    p1_active_deck = pripravBalicekPreZapas(1);
    p2_active_deck = pripravBalicekPreZapas(2);

    p1_draft_hand = vytiahniRukuZRozdanehoBalicka(1);
    p2_draft_hand = vytiahniRukuZRozdanehoBalicka(2);

    zobraziťObrazovku("hracia-plocha");
    vykresliHraciuPlochu();
    otvorMulliganModal();
}

function otvorMulliganModal() {
    mulliganSelectedIndices = [];
    var modal = document.createElement("div");
    modal.id = "mulligan-modal-overlay";
    modal.className = "card-modal";
    modal.style.zIndex = "99999";

    var cardsHtml = "";
    p1_draft_hand.forEach(function(c, idx) {
        var reg = getRegistryCard(c.n);
        cardsHtml += '<div id="mull-card-' + idx + '" class="karta cls-' + (reg.isPlatinum ? "PLATINUM" : c.cls) + '" onclick="prepniVyberMulliganKarty(' + idx + ')" style="cursor:pointer;">' + vytvorHTMLKarty(c.n, getRealPower(c), c.cls, reg.row, reg.p, false) + '</div>';
    });

    modal.innerHTML = '<div class="modal-content" style="max-width:1200px; text-align:center;"><h2 style="color:#d4af37; margin-top:0;">🃏 CIELENÝ MULLIGAN (Vyber 0 až 2 karty na výmenu)</h2><p style="color:#ccc; font-size:1em; margin-bottom:15px;">Klikni na kartu, ktorú chceš vymeniť (max 2 karty). Ak vymeníš karty, súper získa +5b náskok <strong>iba v 1. kole</strong>!</p><div id="mulligan-cards-container" style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin:20px 0;">' + cardsHtml + '</div><div style="display:flex; gap:15px; justify-content:center; margin-top:15px;"><button onclick="potvrditMulliganAkciu(false)" style="background:#10b981; color:#fff; border:none; padding:12px 28px; border-radius:6px; font-weight:bold; cursor:pointer; font-size:1.05em;">✅ Ponechať ruku (0:0)</button><button id="btn-mull-swap" onclick="potvrditMulliganAkciu(true)" style="background:#8b0000; color:#fff; border:1px solid #ff4d4d; padding:12px 28px; border-radius:6px; font-weight:bold; cursor:pointer; font-size:1.05em;">🎲 Vymeniť vybrané karty (+5b Súper)</button></div></div>';

    document.body.appendChild(modal);
}

function prepniVyberMulliganKarty(idx) {
    var cardEl = document.getElementById("mull-card-" + idx);
    var pos = mulliganSelectedIndices.indexOf(idx);

    if (pos !== -1) {
        mulliganSelectedIndices.splice(pos, 1);
        if (cardEl) cardEl.classList.remove("karta-selected-mulligan");
    } else {
        if (mulliganSelectedIndices.length >= 2) {
            ukazOznamenie("⚠️ MULLIGAN LIMIT", "Môžeš vymeniť maximálne 2 karty!");
            return;
        }
        mulliganSelectedIndices.push(idx);
        if (cardEl) cardEl.classList.add("karta-selected-mulligan");
    }
}

function potvrditMulliganAkciu(chceVymenu) {
    var el = document.getElementById("mulligan-modal-overlay");
    if (el) el.remove();

    if (chceVymenu && mulliganSelectedIndices.length > 0) {
        mulliganSelectedIndices.sort(function(a, b) { return b - a; });
        var pocetVymen = mulliganSelectedIndices.length;

        mulliganSelectedIndices.forEach(function(idx) {
            p1_draft_hand.splice(idx, 1);
        });

        for (var i = 0; i < pocetVymen; i++) {
            if (p1_active_deck.length > 0) {
                var novaKarta = p1_active_deck.pop();
                p1_draft_hand.push({ n: novaKarta, cls: (inventar.karty[novaKarta] ? inventar.karty[novaKarta].aktivnaTrieda : "F") });
            }
        }

        p2MulliganRound1Bonus = 5;
        ukazOznamenie("🎲 MULLIGAN DOKONČENÝ", "Vymenil si " + pocetVymen + " kariet! Súper získal +5b náskok v 1. kole.");
    } else {
        ukazOznamenie("✅ RUKA POTVRDENÁ", "Ponechal si si pôvodnú ruku.");
    }

    if (jeSingleplayer) {
        vyhodnotAIMulligan();
    }

    vykresliHraciuPlochu();
}

function vyhodnotAIMulligan() {
    var weakIndices = [];
    p2_draft_hand.forEach(function(c, idx) {
        var reg = getRegistryCard(c.n);
        if (!reg.isSpell && !reg.isSpy && !reg.isItem && getRealPower(c) <= 2) {
            weakIndices.push(idx);
        }
    });

    if (weakIndices.length >= 2) {
        var toSwap = weakIndices.slice(0, 2);
        toSwap.sort(function(a, b) { return b - a; });
        toSwap.forEach(function(idx) { p2_draft_hand.splice(idx, 1); });
        for (var i = 0; i < 2; i++) {
            if (p2_active_deck.length > 0) {
                var newKarta = p2_active_deck.pop();
                p2_draft_hand.push({ n: newKarta, cls: "F" });
            }
        }
        p1MulliganRound1Bonus = 5;
        ukazOznamenie("🤖 AI MULLIGAN", "Súper vymenil 2 najslabšie karty! Získavaš +5b náskok v 1. kole.");
    }
}

function vykresliStol() {
    for (var r = 1; r <= 3; r++) {
        var el1 = document.getElementById("p1-row" + r);
        var el2 = document.getElementById("p2-row" + r);
        if (el1) el1.innerHTML = "";
        if (el2) el2.innerHTML = "";
    }

    var neutralEl = document.getElementById("neutral-row");
    if (neutralEl) {
        neutralEl.innerHTML = '<span class="row-label-neutral">⚡ Neutrálne Kúzla Stola ⚡</span>';
        neutralne_vplyvy.forEach(function(spellName) {
            var reg = getRegistryCard(spellName);
            var div = document.createElement("div");
            div.className = "karta cls-F";
            div.innerHTML = vytvorHTMLKarty(spellName, "none", "F", 0, 0, false);
            neutralEl.appendChild(div);
        });
    }

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

// ⚔️ SPOĽAHLIVÉ VYKLADANIE BEZ CRASHU
function vylozitKartuZRuky(pNum, cardIndex) {
    if (blokujVykladanie) return;
    if (pNum !== aktualnyHrac) return;

    var hand = (pNum === 1) ? p1_draft_hand : p2_draft_hand;
    var myPlayed = (pNum === 1) ? p1_played_cards : p2_played_cards;
    var oppPlayed = (pNum === 1) ? p2_played_cards : p1_played_cards;

    if (!hand || cardIndex < 0 || cardIndex >= hand.length) return;

    var card = hand.splice(cardIndex, 1)[0];
    if (!card) return;

    var reg = getRegistryCard(card.n);

    if (reg.isJoker) {
        ukazOznamenie("⚠️ JOKER CARD", "S Joker Kartou sa nedá hrať v zápase!");
        hand.splice(cardIndex, 0, card);
        return;
    }

    if (reg.isSpy) {
        oppPlayed.push(card);
        tahatNoveKartyZBalicka(pNum, 2);
        ukazOznamenie("🕵️ ŠPIÓN VYLOŽENÝ", "Karta <strong>" + card.n + "</strong> bola vyložená na súperovu stranu stola a potiahol si 2 nové karty!", function() {
            vykresliHraciuPlochu();
            pokracujPoVylozeni(pNum);
        });
        return;
    } else if (reg.isSpell) {
        if (card.n === "Šicko v porádku") {
            neutralne_vplyvy = [];
            odhodene_karty_kola.push(card);
            ukazOznamenie("⚡ ŠICKO V PORÁDKU", "Všetky neutrálne kúzla boli vyčistené zo stola!", function() {
                vykresliHraciuPlochu();
                pokracujPoVylozeni(pNum);
            });
            return;
        } else {
            neutralne_vplyvy.push(card.n);
            ukazOznamenie("⚡ KÚZLO STOLA", "Bolo aktivované neutrálne kúzlo <strong>" + card.n + "</strong>!", function() {
                vykresliHraciuPlochu();
                pokracujPoVylozeni(pNum);
            });
            return;
        }
    } else {
        myPlayed.push(card);

        if (card.n === "Zatúlaný tatranský medveď" || card.n === "Jakub") {
            vykonajAutoSpalenie(card.n, function() {
                vykresliHraciuPlochu();
                pokracujPoVylozeni(pNum);
            });
            return;
        }

        if (card.n === "Marek") {
            vykonajCieleneSpalenieMarekom(pNum);
        }

        if (card.n === "Doktor" || card.n === "Sestrička" || card.n === "Kornélia") {
            vykonajOzivenieZArchivu(pNum);
        }

        if (card.n === "Erik") {
            otvorErikBuffDialog(pNum, function() {
                vykresliHraciuPlochu();
                pokracujPoVylozeni(pNum);
            });
            return;
        }
    }

    vykresliHraciuPlochu();
    pokracujPoVylozeni(pNum);
}

function pokracujPoVylozeni(pNum) {
    if ((pNum === 1 && !p2Pass) || (pNum === 2 && !p1Pass)) prepniHracov();
    else spravujAI();
}

function tahatNoveKartyZBalicka(pNum, count) {
    var hand = (pNum === 1) ? p1_draft_hand : p2_draft_hand;
    var deck = (pNum === 1) ? p1_active_deck : p2_active_deck;

    for (var i = 0; i < count; i++) {
        if (deck.length > 0) {
            var cardName = deck.pop();
            var cardCls = (pNum === 1 && inventar.karty[cardName] && inventar.karty[cardName].aktivnaTrieda) ? inventar.karty[cardName].aktivnaTrieda : "F";
            hand.push({ n: cardName, cls: cardCls });
        }
    }
}

// 🔥 AUTO-SPÁLENIE BEZ RACE-CONDITION
function vykonajAutoSpalenie(pôvodcaMeno, callback) {
    var vsetkyKartyStola = [];
    p1_played_cards.forEach(function(c) { if (c.n !== pôvodcaMeno && c.n !== "Oli") vsetkyKartyStola.push(c); });
    p2_played_cards.forEach(function(c) { if (c.n !== pôvodcaMeno && c.n !== "Oli") vsetkyKartyStola.push(c); });

    if (vsetkyKartyStola.length === 0) {
        if (typeof callback === "function") callback();
        return;
    }

    var maxPwr = -1;
    vsetkyKartyStola.forEach(function(c) {
        var p = getRealPower(c);
        if (p > maxPwr) maxPwr = p;
    });

    if (maxPwr <= 0) {
        if (typeof callback === "function") callback();
        return;
    }

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
        ukazOznamenie("🔥 PLOŠNÉ SPÁLENIE!", "Karta <strong>" + pôvodcaMeno + "</strong> spálila v plameňoch <strong>" + spalenychKariet + "</strong> najsilnejších kariet na stole (sila " + maxPwr + "b)!", function() {
            if (typeof callback === "function") callback();
        });
    } else {
        if (typeof callback === "function") callback();
    }
}

function vykonajCieleneSpalenieMarekom(pNum) {
    var oppCards = (pNum === 1) ? p2_played_cards : p1_played_cards;
    var oppSpalene = (pNum === 1) ? p2_spalene : p1_spalene;

    var targetable = oppCards.filter(function(c) { return c.n !== "Oli"; });
    if (targetable.length === 0) return;

    var victim = targetable[Math.floor(Math.random() * targetable.length)];
    var vIdx = oppCards.indexOf(victim);
    if (vIdx !== -1) {
        oppCards.splice(vIdx, 1);
        oppSpalene.push(victim);
        ukazOznamenie("🧹 MAREK FILOZOF", "Marek zmanipuloval a poslal do ohňa súperovu kartu <strong>" + victim.n + "</strong>!");
    }
}

function vykonajOzivenieZArchivu(pNum) {
    var arch = (pNum === 1) ? p1_spalene : p2_spalene;
    var myPlayed = (pNum === 1) ? p1_played_cards : p2_played_cards;

    if (arch.length === 0) {
        ukazOznamenie("🏥 PRÁZDNY ARCHÍV OHŇA", "V tvojom archíve spálených kariet sa nenachádza žiadna jednotka na oživenie!");
        return;
    }

    var oživenaKarta = arch.pop();
    myPlayed.push(oživenaKarta);
    ukazOznamenie("🕊️ OŽIVENIE Z OHŇA!", "Z plameňov bola úspešne oživená a vrátená do boja karta <strong>" + oživenaKarta.n + "</strong>!");
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
    if (!p2_draft_hand || p2_draft_hand.length === 0) { hracPassuje(2); return; }

    var chosenIndex = Math.floor(Math.random() * p2_draft_hand.length);
    vylozitKartuZRuky(2, chosenIndex);
}

function skontrolujKoniecKola() {
    prepočitajSkoreStola();
    blokujVykladanie = true;
    
    if (sc1 > sc2) r1++;
    else if (sc2 > sc1) r2++;
    else { r1++; r2++; }

    p1MulliganRound1Bonus = 0;
    p2MulliganRound1Bonus = 0;

    aktualizujKolaUI();
    if (r1 >= 2 || r2 >= 2) vyhodnotKoniecZapasu();
    else pripravNoveKolo();
}

function pripravNoveKolo() {
    odhodene_karty_kola = odhodene_karty_kola.concat(p1_played_cards).concat(p2_played_cards);
    p1_played_cards = []; p2_played_cards = [];
    neutralne_vplyvy = [];
    p1_erik_buff_row = null; p2_erik_buff_row = null;
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
    nacitatUlozenuZostavu();
    zobraziťObrazovku("hlavne-menu");
    aktualizujPanelDielne();
    vygenerujSimulaciuTrhu();
    aktualizujVsetkyStickyWallety();
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
window.automatickyDoplnitDefaultZostavu = automatickyDoplnitDefaultZostavu;
window.prepniKartuVZostave = prepniKartuVZostave;
window.prepniVyberMulliganKarty = prepniVyberMulliganKarty;
window.potvrditMulliganAkciu = potvrditMulliganAkciu;
window.prepniZalozkuTrhu = prepniZalozkuTrhu;
window.kupitSurovinuZoStatnehoSkladu = kupitSurovinuZoStatnehoSkladu;
window.aktualizujDostupneTriedyPrePredaj = aktualizujDostupneTriedyPrePredaj;
window.aktualizujMaxKusovPrePredaj = aktualizujMaxKusovPrePredaj;
window.odoslatPredajnyFormular = odoslatPredajnyFormular;
