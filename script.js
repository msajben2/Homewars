// =====================================================================
// RODINNÁ HRA - HOME WARS (JAVASCRIPT ENGINE)
// =====================================================================

// =====================================================================
// [SEKCIA 1 - JS] MASTER REGISTRY, KONFIGURÁCIE A PREMENNÉ
// =====================================================================
var isAdmin = false;

var VERZIA = "36.0.0";

var MASTER_REGISTRY = {
    // 🌟 PLATINOVÉ KARTY
    "Zvedavá suseda": { row: 2, p: 7, isPlatinum: true, isSpy: true, img: "Img/zvedava-suseda.webp", desc: "Vidí a počuje všetko, čo sa v dedine šuchne. Nič pred ňou neutajíš.", abilityDesc: "🕵️ <strong>Špión:</strong> Vykladá sa na súperovu stranu stola. Po vyložení si potiahneš 2 nové karty." },
    "Ďuri": { row: 1, p: 6, isPlatinum: true, img: "Img/duri.webp", desc: "Miestny veterán, ktorý má vždy v rukáve nejaký starý trik.", abilityDesc: "🍺 <strong>Taktik:</strong> Ak je na stole Alkohol, posilňuje celý ženský 2. rad o +100 %." },
    "Makak": { row: 3, p: 2, isPlatinum: true, isSpy: true, img: "Img/makak.webp", desc: "Lesný šibal, ktorý narobí viac škody ako úžitku.", abilityDesc: "🕵️ <strong>Špión:</strong> Dáva súperovi len 2 body a potiahne ti 2 nové karty do ruky." },
    "Oli": { row: 2, p: 12, isPlatinum: true, img: "Img/oli.webp", desc: "Duchovná matka dediny s neoblomnou vierou.", abilityDesc: "✝️ <strong>Imunita:</strong> Jej sila (12b) je absolútne nedotknuteľná voči kúzlam aj plošnému spáleniu." },
    "Dávid": { row: 1, p: 4, isPlatinum: true, isSpy: true, img: "Img/david.webp", desc: "Kráľovský vinár, ktorý vie, komu naliať čistého vína.", abilityDesc: "🕵️ <strong>Špión:</strong> Vykladá sa súperovi do 1. radu a potiahne ti 2 nové karty." },
    "Sestrička": { row: 2, p: 3, isPlatinum: true, img: "Img/sestricka.webp", desc: "Obetavá ošetrovateľka, pripravená pomôcť kedykoľvek.", abilityDesc: "🏥 <strong>Oživenie:</strong> Vráti do hry tebou vybranú spálenú kartu z archívu ohňa." },
    "Vlk": { row: 3, p: 3, isPlatinum: true, img: "Img/vlk.webp", desc: "Hrdý vodca lesnej svorky.", abilityDesc: "🐾 <strong>Svorka:</strong> Zvyšuje silu všetkých zvierat v 3. rade o +50 %." },
    "Erik": { row: 1, p: 3, isPlatinum: true, img: "Img/erik.webp", desc: "Taktik, ktorý dokáže motivovať svoje okolie k lepším výkonom.", abilityDesc: "📢 <strong>Buff:</strong> Po vyložení zvolíš rad, ktorému do konca kola pridá +50 % k celkovej sile." },
    "Sisa": { row: 2, p: 4, isPlatinum: true, img: "Img/sisa.webp", desc: "Dvorná dáma s vyberaným vkusom a autoritou.", abilityDesc: "📢 <strong>Dvorná dáma:</strong> Zvyšuje silu celého mužského radu o +50 %." },
    "Mária": { row: 2, p: 9, isPlatinum: true, isSpy: true, img: "Img/maria.webp", desc: "Skúsená trhovkyňa, ktorá za dobrú cenu predá aj vlastnú babku.", abilityDesc: "🕵️ <strong>Špión:</strong> Vyloží sa súperovi a potiahne ti 2 karty. (Cena za informácie je 9b súperovi)." },
    "Nela": { row: 2, p: 1, isPlatinum: true, img: "Img/nela.webp", desc: "Ochranný štít rodiny, držiaci všetkých pokope.", abilityDesc: "🛡️ <strong>Štít:</strong> Zmrazí stôl! Okamžite vypne všetky percentuálne buffy a aury pre oboch hráčov." },
    "Zatúlaný tatranský medveď": { row: 3, p: 5, isPlatinum: true, img: "Img/zatulany-tatransky-medved.webp", desc: "Obrovská horská šelma zblúdená v dedine.", abilityDesc: "🔥 <strong>Dravec:</strong> Automaticky spáli najsilnejšiu kartu (alebo karty pri zhode) na celom stole (okrem seba a Oli)." },
    "Jakub": { row: 1, p: 4, isPlatinum: true, img: "Img/jakub.webp", desc: "Neúprosný pevnostný strážca.", abilityDesc: "🔥 <strong>Bojovník:</strong> Automaticky spáli najsilnejšiu kartu (alebo karty pri zhode) na celom stole (okrem seba a Oli)." },
    "Kika": { row: 2, p: 3, isPlatinum: true, isSpy: true, img: "Img/kika.webp", desc: "Zvedavá archivárka hľadajúca tajomstvá.", abilityDesc: "🕵️ <strong>Špión:</strong> Vykladá sa na súperovu stranu. Potiahne ti 2 nové karty." },
    "Doktor": { row: 1, p: 5, isPlatinum: true, img: "Img/doktor.webp", desc: "Skúsený lekár s dlhoročnou praxou.", abilityDesc: "🏥 <strong>Oživenie:</strong> Vráti do hry tebou vybranú spálenú kartu z archívu ohňa." },
    "Michal": { row: 1, p: 5, isPlatinum: true, img: "Img/michal.webp", desc: "Prefíkaný obchodník z ďalekých krajov.", abilityDesc: "📢 <strong>Obchodník:</strong> Ak nie je na stole Nela, dáva sám sebe buff +100 % k vlastnej sile." },
    "Kornélia": { row: 2, p: 3, isPlatinum: true, img: "Img/kornelia.webp", desc: "Tichá bylinkárka z okraja lesa.", abilityDesc: "🏥 <strong>Oživenie:</strong> Vráti do hry tebou vybranú spálenú kartu z archívu ohňa." },
    "Katy": { row: 2, p: 6, isPlatinum: true, img: "Img/katy.webp", desc: "Kráľovná výhier, ktorá prináša na stôl rovnováhu.", abilityDesc: "💖 <strong>Pomoc:</strong> Pridáva +2 body tvojim kartám a uberá -2 body všetkým súperovým kartám." },
    "Krčmár Boris": { row: 1, p: 4, isPlatinum: true, isSpy: true, img: "Img/krcmar-boris.webp", desc: "Hostinský, u ktorého sa zbiehajú všetky klebety.", abilityDesc: "🕵️ <strong>Špión:</strong> Vykladá sa súperovi do 1. radu a potiahne ti 2 nové karty." },
    "Marek": { row: 1, p: 4, isPlatinum: true, img: "Img/marek.webp", desc: "Zádumčivý filozof analyzujúci súperove ťahy.", abilityDesc: "🔥 <strong>Filozof:</strong> Automaticky spáli najsilnejšiu kartu (alebo karty pri zhode) na celom stole (okrem seba a Oli)." },
    "Kráľovský Šampión": { row: 1, p: 8, isTournamentUnique: true, img: "Img/neviditelny-mario.webp", desc: "Extrémne vzácna turnajová trofej. V kráľovstve existuje len jeden kus.", abilityDesc: "👑 <strong>Turnajový Unikát:</strong> Ková sa výhradne s Prízrakmi. Má obrovskú základnú silu a nepadá z bežných truhlíc." },
    "Prízrak": { row: 0, p: 0, isPrizrak: true, img: "Img/prizrak.webp", desc: "Tajuplná esencia z pradávnych čias.", abilityDesc: "👻 <strong>Kováčsky Prízrak:</strong> Neslúži na boj. V Dielni nahrádza akúkoľvek kartu pri kovaní (od F po A)." },
    
    // 🔨 OBYČAJNÉ KARTY
    "Dominik": { row: 1, p: 1, img: "Img/dominik.webp", desc: "Hradné dieťa hrajúce sa s dreveným koníkom.", abilityDesc: "💰 <strong>Bonus:</strong> Pri výhre prináša do pokladnice extra mince." },
    "Marcus": { row: 1, p: 1, img: "Img/marcus.webp", desc: "Zvedavý chlapec s obľúbenou lienkou na prste.", abilityDesc: "💰 <strong>Bonus:</strong> Pri výhre prináša do pokladnice extra mince." },
    "Timko": { row: 1, p: 1, img: "Img/tymko.webp", desc: "Mladý obranný bojovník cvičiaci s dreveným mečom.", abilityDesc: "💰 <strong>Bonus:</strong> Pri výhre prináša do pokladnice extra mince." },
    "Martin": { row: 1, p: 4, img: "Img/martin.webp", desc: "Šikovný hraničiar a skúsený lovec divokej zveri." },
    "Neviditeľný Mário": { row: 1, p: 4, img: "Img/neviditelny-mario.webp", desc: "Tajuplný zbojník skrývajúci tvár pod kapucňou." },
    "Nicolas": { row: 1, p: 4, img: "Img/nicolas.webp", desc: "Mladý zručný kamenár z podhradia." },
    "Jaro": { row: 1, p: 5, img: "Img/jaro.webp", desc: "Silný kováč, ktorý vykuje ten najlepší meč." },
    "Lula": { row: 2, p: 4, img: "Img/lula.webp", desc: "Dvorná harfistka hrajúca melancholické melódie." },
    "Nika": { row: 2, p: 4, img: "Img/nika.webp", desc: "Hradná kuchárka miešajúca tajné recepty pri kotli." },
    "Darinka": { row: 2, p: 5, img: "Img/darinka.webp", desc: "Majsterka tkáčka, z ktorej látok sa šijú kráľovské odevy." },
    "Viera": { row: 2, p: 6, img: "Img/viera.webp", desc: "Hradná pekárka, ktorej chlieb vonia na míle ďaleko." },
    "Anka": { row: 2, p: 7, img: "Img/anka.webp", desc: "Prísna správkyňa hradných kľúčov." },
    "Grobské mravce": { row: 3, p: 1, img: "Img/grobske-mravce.webp", desc: "Húževnatá a nezastaviteľná svorka lesných mravcov.", abilityDesc: "💰 <strong>Bonus:</strong> Pri výhre prináša do pokladnice extra mince." },
    "Petržalské holuby": { row: 3, p: 1, img: "Img/petrzalske-holuby.webp", desc: "Rýchli hradní posli prenášajúci tajné správy.", abilityDesc: "💰 <strong>Bonus:</strong> Pri výhre prináša do pokladnice extra mince." },
    "Potkany": { row: 3, p: 2, img: "Img/patkane.webp", desc: "Hladná pivničná svorka drancujúca sýpky.", abilityDesc: "💰 <strong>Bonus:</strong> Pri výhre prináša do pokladnice extra mince." },
    "Kabelkový pes": { row: 3, p: 3, img: "Img/kabelkovy-pes.webp", desc: "Rozmaznaný panský miláčik usadený na vankúši.", abilityDesc: "💰 <strong>Bonus:</strong> Pri výhre prináša do pokladnice extra mince." },
    "Pouličný kocúr": { row: 3, p: 3, img: "Img/poulicny-maciak.webp", desc: "Tichý potulný kocúr sledujúci tiene.", abilityDesc: "💰 <strong>Bonus:</strong> Pri výhre prináša do pokladnice extra mince." },
    "Komáre": { row: 3, p: 3, img: "Img/komare.webp", desc: "Dotieravé hradné húfy sajúce krv nepriateľom.", abilityDesc: "💰 <strong>Bonus:</strong> Pri výhre prináša do pokladnice extra mince." },
    "Divá sviňa": { row: 3, p: 4, img: "Img/svina-lesna.webp", desc: "Zúrivý lesný kanec ničiaci všetko, čo mu stojí v ceste." },
    "Pes, ktorý prerástol kabelku": { row: 3, p: 4, img: "Img/pes.webp", desc: "Verný a mohutný strážny pes, z ktorého ide strach." },
    
    // PREDMETY A KÚZLA
    "Alkohol": { row: 1, p: 0, isItem: true, img: "Img/alkohol.webp", desc: "Silná medovina dodávajúca odvahu.", abilityDesc: "🛠️ <strong>Predmet:</strong> Pridáva +1b až +7b ku každej karte v 1. rade (podľa jej vzácnosti)." },
    "Kvety": { row: 2, p: 0, isItem: true, img: "Img/kvety.webp", desc: "Krásna kytica prinášajúca pokoj a odhodlanie.", abilityDesc: "🛠️ <strong>Predmet:</strong> Pridáva +1b až +7b ku každej karte v 2. rade (podľa jej vzácnosti)." },
    "Medové orechy": { row: 3, p: 0, isItem: true, img: "Img/medove-orechy.webp", desc: "Sladká odmena pre zvieracích bojovníkov.", abilityDesc: "🛠️ <strong>Predmet:</strong> Pridáva +1b až +7b ku každej karte v 3. rade (podľa jej vzácnosti)." },
    "Musíme sa porozprávať": { row: 0, p: 0, isSpell: true, img: "Img/musime-sa-porozpravat.webp", desc: "Slová, z ktorých tuhne krv v žilách každému mužovi.", abilityDesc: "⚡ <strong>Kúzlo:</strong> Okamžite zníži základnú silu všetkých mužov (1. rad) oboch hráčov na 1b." },
    "Upokoj sa": { row: 0, p: 0, isSpell: true, img: "Img/upokoj-sa.webp", desc: "Najhoršia možná rada, ktorá vyvoláva nekontrolovateľný hnev.", abilityDesc: "⚡ <strong>Kúzlo:</strong> Okamžite zníži základnú silu všetkých žien (2. rad) oboch hráčov na 1b." },
    "Ohňostroj": { row: 0, p: 0, isSpell: true, img: "Img/ohnostroj.webp", desc: "Ohlušujúci rachot plašiaci zver široko-ďaleko.", abilityDesc: "⚡ <strong>Kúzlo:</strong> Okamžite zníži základnú silu všetkých zvierat (3. rad) oboch hráčov na 1b." },
    "Šicko v porádku": { row: 0, p: 0, isSpell: true, img: "Img/sicko-v-poradku.webp", desc: "Úsmev, ktorý vyrieši každú napätú situáciu.", abilityDesc: "⚡ <strong>Kúzlo:</strong> Okamžite vyčistí neutrálny rad od všetkých negatívnych kúziel stola!" },
    "Zvitok": { row: 0, p: 0, isZvitok: true, img: "Img/pergamen.webp", desc: "Zvyšuje šancu pri kovaní. Od D-Class chráni kartu pred spálením. Pri kovaní zvitkov sa nesmú používať ďalšie zvitky!" }
};

var CLASS_CONFIG = { 
    "F": { bonusPwr: 0, matName: "Koža", itemBonus: 1, itemDrop: {m: 0, g: 0, p: 0}, coinFee: 10 }, 
    "E": { bonusPwr: 1, matName: "Drevo", itemBonus: 1, itemDrop: {m: 25, g: 0, p: 0}, coinFee: 25 }, 
    "D": { bonusPwr: 2, matName: "Kov", itemBonus: 1, itemDrop: {m: 50, g: 0, p: 0}, coinFee: 50 }, 
    "C": { bonusPwr: 3, matName: "Bronz", itemBonus: 1, itemDrop: {m: 100, g: 0, p: 0}, coinFee: 100 }, 
    "B": { bonusPwr: 5, matName: "Striebro", itemBonus: 2, itemDrop: {m: 150, g: 1, p: 0}, coinFee: 250 }, 
    "A": { bonusPwr: 7, matName: "Zlato", itemBonus: 3, itemDrop: {m: 250, g: 2, p: 0}, coinFee: 500 }, 
    "S": { bonusPwr: 10, matName: "Mince", itemBonus: 4, itemDrop: {m: 500, g: 3, p: 1}, coinFee: 0 } 
};

var p1_pouzite_predmety = [];

var FORGE_RATES = { 
    "F->E": { rate: 0.90, from: "F", nextClass: "E", reqMat: "Koža", reqMatCount: 3, coinFee: 10 }, 
    "E->D": { rate: 0.80, from: "E", nextClass: "D", reqMat: "Drevo", reqMatCount: 3, coinFee: 25 }, 
    "D->C": { rate: 0.70, from: "D", nextClass: "C", reqMat: "Kov", reqMatCount: 3, coinFee: 50 }, 
    "C->B": { rate: 0.60, from: "C", nextClass: "B", reqMat: "Bronz", reqMatCount: 3, coinFee: 100 }, 
    "B->A": { rate: 0.50, from: "B", nextClass: "A", reqMat: "Striebro", reqMatCount: 3, coinFee: 250 }, 
    "A->S": { rate: 0.40, from: "A", nextClass: "S", reqMat: "Zlato", reqMatCount: 3, coinFee: 500 } 
};

var STATNY_SKLAD_CENNIK = { 
    "Koža": { price: 8, img: "Img/koza.webp" }, 
    "Drevo": { price: 18, img: "Img/drevo.webp" }, 
    "Kov": { price: 38, img: "Img/zelezo.webp" }, 
    "Bronz": { price: 75, img: "Img/bronz.webp" }, 
    "Striebro": { price: 180, img: "Img/striebro.webp" }, 
    "Zlato": { price: 80, img: "Img/zlato.webp" }, 
    "F-Zvitok": { price: 100, img: "Img/pergamen.webp" },
    "F-Prízrak": { price: 750, img: "Img/prizrak.webp" } // Vrátený Prízrak do skladu!
};

// --- NOVÁ FUNKCIA: Má hráč právo na túto Platinovú kartu? ---
function hracVlastniPlatinovku(kartaMeno) {
    var vlastni = false;
    Object.keys(simulačneRebríčky).forEach(function(kat) {
        var lidri = simulačneRebríčky[kat];
        // Ak si na 1. mieste (index 0) a nie si inaktívny, máš na ňu právo!
        if (lidri && lidri.length > 0 && lidri[0].hrac === "Hráč 1 (Ty)" && !lidri[0].inaktivny) {
            if (KATEGORIE_METADATA[kat] && KATEGORIE_METADATA[kat].card === kartaMeno) vlastni = true;
        }
    });
    return vlastni;
}
// -----------------------------------------------------------
var inventar = { mince: 500, suroviny: { "Koža": 15, "Drevo": 10, "Kov": 5, "Bronz": 2, "Striebro": 1, "Zlato": 20 }, karty: {}, prizraky: { "F": 10, "E": 5, "D": 5, "C": 5, "B": 5, "A": 5 }, zostava: [], starePlatinovky: [] };
var simulačneRebríčky = { 
    sampión: [], nerozhodny: [], nie_sampión: [], 
    sClass: [], aClass: [], bClass: [], cClass: [], dClass: [], eClass: [], fClass: [], 
    detailista: [], majster_aukcii: [], demolator: [], rozsafny: [], 
    grill_majster: [], fenix: [], hazarder: [], duelovy_veteran: [], 
    terminator: [], plosny_zabijak: [] 
};
var KATEGORIE_METADATA = { sampión: { title: "🥇 Šampión (Najviac výhier)", card: "Zvedavá suseda" }, nerozhodny: { title: "🤝 Nerozhodný (Najviac remíz)", card: "Ďuri" }, nie_sampión: { title: "💀 Nie-Šampión (Najviac prehier)", card: "Makak" }, sClass: { title: "👑 S-Class majster (Vykované S)", card: "Oli" }, aClass: { title: "💎 A-Class majster (Vykované A)", card: "Dávid" }, bClass: { title: "🔮 B-Class majster (Vykované B)", card: "Sestrička" }, cClass: { title: "📜 C-Class majster (Vykované C)", card: "Vlk" }, dClass: { title: "🛡️ D-Class majster (Vykované D)", card: "Erik" }, eClass: { title: "🌲 E-Class majster (Vykované E)", card: "Sisa" }, fClass: { title: "📦 F-Class majster (Získané F)", card: "Mária" }, detailista: { title: "🔨 Detailista (Pokusy vo Forge)", card: "Nela" }, majster_aukcii: { title: "💰 Majster aukcií (Top ponuka)", card: "Zatúlaný tatranský medveď" }, demolator: { title: "💥 Demolátor (Top skóre v 1 kole)", card: "Jakub" }, rozsafny: { title: "💸 Rozšafný (Minuté mince)", card: "Kika" }, grill_majster: { title: "🔥 Grill majster (Spálené karty)", card: "Doktor" }, fenix: { title: "🕊️ Fénix (Oživené karty)", card: "Michal" }, hazarder: { title: "🎲 Hazardér (Výhry o 1 bod)", card: "Kornélia" }, duelovy_veteran: { title: "⚔️ Duelový veterán (PVP zápasy)", card: "Katy" }, terminator: { title: "🤖 Terminátor (AI zápasy)", card: "Krčmár Boris" }, plosny_zabijak: { title: "⚡ Plošný zabijak (Kúzla stola)", card: "Marek" } };

var p1_played_cards = [], p2_played_cards = [];
var p1_celkove_karty_zapasu = [];
var p1_erik_buff_row = null, p2_erik_buff_row = null;
var sc1 = 0, sc2 = 0, r1 = 0, r2 = 0, p1Pass = false, p2Pass = false, aktualnyHrac = 1;
var p1_draft_hand = [], p2_draft_hand = [];
var p1_active_deck = [], p2_active_deck = [];
var p1_spalene = [], p2_spalene = [];
var p1_cakaren = [];
var p2_cakaren = []; 
var odhodene_karty_kola = []; 
var neutralne_vplyvy = [];
var jeSingleplayer = false; var obtiaznostAI = "B"; var blokujVykladanie = false;
var aktualnaStranaKnihy = 1;
var p1MulliganRound1Bonus = 0, p2MulliganRound1Bonus = 0;
var mulliganSelectedIndices = [];
var aktualnaZalozkaTrhu = "trh";

// AUDIO ENGINE PREMENNÉ
var hudbaSpustena = false; var audioMutedByUser = false; var currentTrackIndex = -1;
var audioTracks = [ "Audio/track1.mp3", "Audio/track2.mp3", "Audio/track3.mp3", "Audio/track4.mp3", "Audio/track5.mp3", "Audio/track6.mp3" ];

// =====================================================================
// [SEKCIA 2 - JS] RENDERER KARIET A DECKBUILDER (INVENTÁR)
// =====================================================================
function getRegistryCard(meno) { if (!meno) return {}; return MASTER_REGISTRY[meno] || {}; }

function getRealPower(card) {
    if (!card || !card.n) return 0;
    var reg = getRegistryCard(card.n);
    if (reg.isSpell || reg.isItem || reg.isPrizrak || reg.p === 0) return 0;
    var cls = card.cls || "F";
    var bonus = CLASS_CONFIG[cls] ? CLASS_CONFIG[cls].bonusPwr : 0;
    return Math.max(0, reg.p + bonus);
}

function vytvorHTMLKarty(meno, livePwr, cls, row, origPwr, isHidden) {
    if (isHidden) return '<div class="karta-foto" style="background-color:#1c130c; background-image:none; border:2px solid #5a4d3e;"><div style="display:flex; height:100%; align-items:center; justify-content:center; font-size:2.2em;">🛡️</div></div><div class="karta-stitok-spodok"><div class="karta-nazov" style="color:#aaa;">🔒 Skrytá Karta</div></div>';
    var reg = getRegistryCard(meno);
    var imgPath = reg.img || "Img/zlato.webp";
    var cisteMeno = meno.replace(/\s+\d+$/, "").trim();
    var html = "";
    if (livePwr !== "none" && !reg.isSpell && !reg.isItem && !reg.isPrizrak && !reg.isZvitok) html += "<div class='karta-kruh karta-kruh-pwr'>" + livePwr + "</div>";
    var safeCls = cls || "F";
    var renderCls = reg.isPlatinum ? "PLATINUM" : (reg.isPrizrak ? "PRIZRAK-" + safeCls : safeCls);
    html += "<div class='karta-kruh karta-kruh-cls cls-" + renderCls + "'>" + (reg.isPlatinum ? "P" : safeCls) + "</div>";
    
    // OPRAVA: Tu sme zmenili liveCls na cls
    html += "<button class='karta-btn-inspect' title='Zväčšiť kartu' onclick=\"event.stopPropagation(); otvorDetailKarty('" + meno.replace(/'/g, "\\'") + "', '" + cls + "');\">🔍</button>";
    
    html += "<div class='karta-foto' style=\"background-image: url('" + encodeURI(imgPath) + "');\"></div>";
    html += "<div class='karta-stitok-spodok'><div class='karta-nazov'>" + cisteMeno + "</div></div>";
    return html;
}

function automatickyDoplnitDefaultZostavu(showNotify) {
    // 1. Zistíme, aké karty hráč reálne VLASTNÍ (okrem Prízrakov a Zvitkov)
    var vlastneneKarty = Object.keys(MASTER_REGISTRY).filter(function(k) {
        var reg = MASTER_REGISTRY[k];
        if (reg.isPrizrak || reg.isZvitok) return false;
        
        if (reg.isPlatinum) return hracVlastniPlatinovku(k);
        
        var cData = inventar.karty[k];
        if (!cData) return false;
        if (reg.isTournamentUnique) return true; 
        
        // Má aspoň 1 fyzickú kópiu nejakej triedy?
        var maKopiu = false;
        if (cData.repliky) {
            ["F", "E", "D", "C", "B", "A", "S"].forEach(function(cls) {
                if (cData.repliky[cls] > 0) maKopiu = true;
            });
        }
        return maKopiu;
    });

    // 2. Skontrolujeme, koľko kariet chýba
    var aktualnyPocet = inventar.zostava.length;
    if (aktualnyPocet >= 28) {
        if (showNotify !== false) ukazOznamenie("✅ ZOSTAVA JE PLNÁ", "Tvoja zostava už má 28 kariet, nepotrebuješ ju dopĺňať.");
        return;
    }

    // 3. Vyfiltrujeme karty, ktoré EŠTE NEMÁ v zostave
    var kartyNaPridanie = vlastneneKarty.filter(function(k) {
        return inventar.zostava.indexOf(k) === -1;
    });

    // 4. Zamiešame karty na pridanie (aby to bolo náhodné)
    for (var i = kartyNaPridanie.length - 1; i > 0; i--) { 
        var j = Math.floor(Math.random() * (i + 1)); 
        var temp = kartyNaPridanie[i]; kartyNaPridanie[i] = kartyNaPridanie[j]; kartyNaPridanie[j] = temp; 
    }

    // 5. Doplníme iba chýbajúci počet!
    var chybajuceMiesto = 28 - aktualnyPocet;
    var pridaneKarty = 0;
    
    for (var i = 0; i < kartyNaPridanie.length && pridaneKarty < chybajuceMiesto; i++) {
        inventar.zostava.push(kartyNaPridanie[i]);
        pridaneKarty++;
    }

    ulozitZostavuDoStorage();
    
    if (showNotify !== false) {
        if (pridaneKarty < chybajuceMiesto) {
            ukazOznamenie("⚠️ NEDOSTATOK KARIET", "Doplnili sme " + pridaneKarty + " kariet, ale stále ti chýba " + (chybajuceMiesto - pridaneKarty) + " do 28. Musíš si otvoriť viac truhlíc!");
        } else {
            ukazOznamenie("⚡ ZOSTAVA DOPLNENÁ", "Úspešne sme ti do voľných miest doplnili " + pridaneKarty + " vlastnených kariet!");
        }
    }
    
    vygenerujDeckbuilder(); 
    aktualizujVsetkyStickyWallety();
}

function aktualizujVsetkyStickyWallety() {
    var walletIds = ["deckbuilder-sticky-wallet", "dielna-sticky-wallet", "obchod-sticky-wallet"];
    var html = '<div class="wallet-chip"><img src="Img/mince.webp" class="wallet-chip-img"> ' + inventar.mince + ' m</div>' +
               '<div class="wallet-chip"><img src="Img/zlato.webp" class="wallet-chip-img"> ' + (inventar.suroviny["Zlato"]||0) + ' oz Zlato</div>' +
               '<div class="wallet-chip"><img src="Img/striebro.webp" class="wallet-chip-img"> ' + (inventar.suroviny["Striebro"]||0) + ' oz Striebro</div>' +
               '<div class="wallet-chip"><img src="Img/bronz.webp" class="wallet-chip-img"> ' + (inventar.suroviny["Bronz"]||0) + ' oz Bronz</div>' +
               '<div class="wallet-chip"><img src="Img/zelezo.webp" class="wallet-chip-img"> ' + (inventar.suroviny["Kov"]||0) + ' oz Kov</div>' +
               '<div class="wallet-chip"><img src="Img/drevo.webp" class="wallet-chip-img"> ' + (inventar.suroviny["Drevo"]||0) + ' oz Drevo</div>' +
               '<div class="wallet-chip"><img src="Img/koza.webp" class="wallet-chip-img"> ' + (inventar.suroviny["Koža"]||0) + ' oz Koža</div>';
    walletIds.forEach(function(id) { var el = document.getElementById(id); if (el) el.innerHTML = html; });
    vykresliRozbalovaciBatoh();
    ulozitZostavuDoStorage();
}



var VERZIA = "36.1.0"; // Verzia s nepriestrelnou ekonomikou

// ... (TU ZOSTÁVA TVOJ MASTER_REGISTRY, CLASS_CONFIG A FORGE_RATES, tie nemeň) ...

// O kúsok nižšie nájdi funkciu nacitatUlozenuZostavu a zmeň ju takto:
function nacitatUlozenuZostavu() {
    try { 
        var ulozene = localStorage.getItem("homewars_cloud_save_v1"); 
        if (ulozene) {
            var data = JSON.parse(ulozene);
            inventar.mince = parseInt(data.mince);
            // Ochrana pred prepísaním mincí na "NaN" cez F12
            if (isNaN(inventar.mince) || inventar.mince < 0) inventar.mince = 500; 
            
            inventar.suroviny = data.suroviny || { "Koža": 15, "Drevo": 10, "Kov": 5, "Bronz": 2, "Striebro": 1, "Zlato": 20 };
            inventar.karty = data.karty || {};
            inventar.prizraky = data.prizraky || { "F": 10, "E": 5, "D": 5, "C": 5, "B": 5, "A": 5 };
            inventar.zostava = data.zostava || [];
        }
    } catch(e) { console.error("Chyba načítavania Cloudu:", e); }
    
    if (!Array.isArray(inventar.zostava) || inventar.zostava.length < 28) {
        automatickyDoplnitDefaultZostavu(false);
    }
}

function ulozitZostavuDoStorage() { 
    try { localStorage.setItem("homewars_cloud_save_v1", JSON.stringify(inventar)); } catch(e) { console.error("Chyba ukladania:", e); } 
}
function skontrolujPlatinovky() {
    var strateneKarty = [];
    var ziskaneKarty = [];
    
    Object.keys(simulačneRebríčky).forEach(function(kat) {
        var lidri = simulačneRebríčky[kat];
        var meta = KATEGORIE_METADATA[kat];
        if (!lidri || lidri.length === 0 || !meta) return;
        
        var kartaMeno = meta.card;
        var aktualnyLider = lidri[0];
        var jaVlastnim = (aktualnyLider.hrac === "Hráč 1 (Ty)" && !aktualnyLider.inaktivny);
        var malSomMinule = (inventar.starePlatinovky.indexOf(kartaMeno) !== -1);
        
        if (jaVlastnim && !malSomMinule) {
            inventar.starePlatinovky.push(kartaMeno);
            inventar.karty[kartaMeno] = { repliky: { "PLATINUM": 1 }, aktivnaTrieda: "PLATINUM" };
            ziskaneKarty.push(kartaMeno);
        } else if (!jaVlastnim && malSomMinule) {
            var idx = inventar.starePlatinovky.indexOf(kartaMeno);
            if (idx !== -1) inventar.starePlatinovky.splice(idx, 1);
            
            delete inventar.karty[kartaMeno];
            // VYTRHNUTIE ZO ZOSTAVY
            var zostavaIdx = inventar.zostava.indexOf(kartaMeno);
            if (zostavaIdx !== -1) inventar.zostava.splice(zostavaIdx, 1); 
            
            strateneKarty.push({ karta: kartaMeno, zlodej: aktualnyLider.hrac });
        } else if (jaVlastnim && malSomMinule) {
            if (!inventar.karty[kartaMeno]) inventar.karty[kartaMeno] = { repliky: { "PLATINUM": 1 }, aktivnaTrieda: "PLATINUM" };
        }
    });
    
    ulozitZostavuDoStorage();
    
    strateneKarty.forEach(function(s) {
        // TOTO JE VEREJNÝ OZNAM PRE CELÝ SERVER
        vyhlasGlobalnyOznam("📢 KRÁĽOVSKÝ PREVRAT", "Hráč <strong>" + s.zlodej + "</strong> zosadil z trónu pôvodného majiteľa a získal Platinovú kartu <strong>" + s.karta + "</strong>!");
        
        // TOTO JE SÚKROMNÁ FACKA PRE HRÁČA
        ukazOznamenie("⚠️ STRATA PLATINOVEJ TROFEJE!", "Hráč <strong>" + s.zlodej + "</strong> ťa prekonal v rebríčku a Kráľovský dvor ti nemilosrdne zhabal kartu <strong>" + s.karta + "</strong> z tvojho batohu!<br><br>Tvoja herná zostava má teraz menej ako 28 kariet. Pred ďalším zápasom musíš ísť do Deckbuilderu a doplniť chýbajúce miesto!");
    });
}

function vyhlasGlobalnyOznam(titulok, text) { 
    var banner = document.createElement("div"); banner.className = "global-announce-banner"; 
    banner.innerHTML = "<strong>" + titulok + ":</strong> " + text; 
    document.body.appendChild(banner); 
    setTimeout(function() { banner.remove(); }, 6000); 
}
function prepniKartuVZostave(kartaMeno) {
    var idx = inventar.zostava.indexOf(kartaMeno);
    if (idx !== -1) inventar.zostava.splice(idx, 1); else inventar.zostava.push(kartaMeno);
    ulozitZostavuDoStorage(); vygenerujDeckbuilder();
}

function vygenerujDeckbuilder() {
    var e = document.getElementById("deckbuilder-zoznam"); var countEl = document.getElementById("deckbuilder-count"); var msgEl = document.getElementById("deckbuilder-msg");
    if (!e) return; e.innerHTML = "";
    
    // Čistíme zostavu od Prízrakov, Zvitkov a Platinoviek, na ktoré hráč stratil nárok
    inventar.zostava = inventar.zostava.filter(function(karta) {
        var reg = MASTER_REGISTRY[karta];
        if (!reg || reg.isPrizrak || reg.isZvitok) return false;
        if (reg.isPlatinum && !hracVlastniPlatinovku(karta)) return false; 
        return true;
    });
    
    var count = inventar.zostava.length;
    if (countEl) countEl.innerText = count;
    if (msgEl) msgEl.innerHTML = (count >= 28) ? "<span style='color:#10b981;'>✅ Zostava je pripravená na boj!</span>" : "<span style='color:#ff4d4d;'>⚠️ Potrebuješ ešte pridať " + (28 - count) + " kariet!</span>";

    Object.keys(MASTER_REGISTRY).forEach(function(t) {
        var reg = MASTER_REGISTRY[t]; 
        // Skryjeme v UI Prízraky, Zvitky a Cudzie Platinovky
        if (reg.isPrizrak || reg.isZvitok) return;
        if (reg.isPlatinum && !hracVlastniPlatinovku(t)) return;
        
        var isVBaliku = (inventar.zostava.indexOf(t) !== -1);
        var cData = inventar.karty[t];
        var vlastneneTriedy = [];
        
        if (cData && typeof cData.repliky === "object") {
            ["F", "E", "D", "C", "B", "A", "S"].forEach(function(c) { if (cData.repliky[c] > 0) vlastneneTriedy.push(c); });
        }

        // 🛡️ OCHRANA: Skryjeme karty, ktoré hráč fyzicky nemá v batohu
        if (!reg.isPlatinum && !reg.isTournamentUnique && vlastneneTriedy.length === 0) return;
        if (reg.isTournamentUnique && !cData) return;

        var cardCls = "F";
        if (reg.isTournamentUnique) {
            cardCls = (cData && cData.aktivnaTrieda) ? cData.aktivnaTrieda : "F";
        } else if (vlastneneTriedy.length > 0) {
            if (cData.zvolenaTrieda && vlastneneTriedy.indexOf(cData.zvolenaTrieda) !== -1) {
                cardCls = cData.zvolenaTrieda;
            } else {
                cardCls = vlastneneTriedy[vlastneneTriedy.length - 1]; 
                if (cData) cData.zvolenaTrieda = cardCls;
            }
        }

        var wrap = document.createElement("div"); wrap.className = "karta-karta-wrapper " + (isVBaliku ? "deck-active-card" : "deck-inactive-card");
        var div = document.createElement("div"); div.className = "karta cls-" + (reg.isPlatinum ? "PLATINUM" : cardCls);
        div.innerHTML = vytvorHTMLKarty(t, getRealPower({n:t, cls:cardCls}), cardCls, reg.row, reg.p, false); 
        div.onclick = function() { prepniKartuVZostave(t); };
        wrap.appendChild(div);
        
        var badge = document.createElement("div"); badge.style.marginTop = "8px"; badge.style.fontWeight = "bold"; badge.style.fontSize = "0.85em"; badge.style.textAlign = "center";
        badge.innerHTML = isVBaliku ? "<span style='color:#10b981; cursor:pointer;' onclick='prepniKartuVZostave(\"" + t + "\")'>✅ V Zostave</span>" : "<span style='color:#888; cursor:pointer;' onclick='prepniKartuVZostave(\"" + t + "\")'>+ Pridať do Zostavy</span>"; 
        wrap.appendChild(badge);

        if (!reg.isTournamentUnique && !reg.isPlatinum && vlastneneTriedy.length > 1) {
            var btnZmena = document.createElement("button");
            btnZmena.innerHTML = "🔄 Zmeniť triedu";
            btnZmena.style.cssText = "margin-top:6px; background:#3b2d1d; color:#ffcc00; border:1px solid #d4af37; border-radius:4px; padding:4px 8px; font-size:0.8em; font-weight:bold; cursor:pointer; width:100%; transition: 0.2s;";
            btnZmena.onclick = function(event) { event.stopPropagation(); cykliTrieduKarty(t, vlastneneTriedy); };
            wrap.appendChild(btnZmena);
        }
        
        e.appendChild(wrap);
    });
    aktualizujVsetkyStickyWallety();
}

function cykliTrieduKarty(kartaName, vlastneneTriedy) {
    var cData = inventar.karty[kartaName];
    if (!cData || vlastneneTriedy.length === 0) return;
    var aktualna = cData.zvolenaTrieda || vlastneneTriedy[vlastneneTriedy.length - 1];
    var idx = vlastneneTriedy.indexOf(aktualna);
    var nextIdx = (idx + 1) % vlastneneTriedy.length; // Preskočí na ďalšiu v poradí a na konci sa vráti na začiatok
    cData.zvolenaTrieda = vlastneneTriedy[nextIdx];
    ulozitZostavuDoStorage();
    vygenerujDeckbuilder(); // Prekreslí obrazovku
}

function pripravBalicekPreZapas(pNum) {
    if (pNum === 2 && jeSingleplayer) { return vygenerujUmeluInteligenciu(); }
    
    var pool = [];
    inventar.zostava.forEach(function(kartaName) {
        if (inventar.karty[kartaName] && pool.indexOf(kartaName) === -1) {
            pool.push(kartaName);
        }
    });

    if (pool.length < 28) {
        console.warn("Dopĺňam balíček na 28 kariet (Highlander pravidlo).");
        var fallbackPool = Object.keys(MASTER_REGISTRY).filter(function(k) { 
            var r = MASTER_REGISTRY[k];
            return !r.isPrizrak && !r.isPlatinum && !r.isZvitok; 
        });
        
        for (var i = fallbackPool.length - 1; i > 0; i--) { 
            var j = Math.floor(Math.random() * (i + 1)); 
            var temp = fallbackPool[i]; fallbackPool[i] = fallbackPool[j]; fallbackPool[j] = temp; 
        }
        
        var fbIndex = 0;
        while(pool.length < 28 && fbIndex < fallbackPool.length) { 
            var kandidat = fallbackPool[fbIndex++];
            if (pool.indexOf(kandidat) === -1) {
                pool.push(kandidat); 
            }
        }
    }

    for (var i = pool.length - 1; i > 0; i--) { 
        var j = Math.floor(Math.random() * (i + 1)); 
        var temp = pool[i]; pool[i] = pool[j]; pool[j] = temp; 
    }
    return pool;
}

// POMOCNÁ FUNKCIA: Presné škálovanie AI balíčka
function vygenerujUmeluInteligenciu() {
    var dostupneKarty = Object.keys(MASTER_REGISTRY).filter(function(k) {
        var r = MASTER_REGISTRY[k]; 
        // Bot NEsmie ťahať: Platinovky, Turnajové unikáty, Prízraky a Zvitky
        return !r.isPlatinum && !r.isTournamentUnique && !r.isPrizrak && !r.isZvitok;
    });
    
    var pool = [];
    
    function pridajDoBalika(trieda, pocet) {
        for(var i=0; i<pocet; i++) {
            if (dostupneKarty.length === 0) break; // Poistka
            var randIndex = Math.floor(Math.random() * dostupneKarty.length);
            var randMeno = dostupneKarty[randIndex];
            
            dostupneKarty.splice(randIndex, 1); 
            pool.push({ n: randMeno, cls: trieda });
        }
    }
    
    if (obtiaznostAI === "Ľahká") { 
        pridajDoBalika("F", 10); pridajDoBalika("E", 9); pridajDoBalika("D", 9);
    } else if (obtiaznostAI === "Stredná") { 
        pridajDoBalika("F", 2); pridajDoBalika("E", 6); pridajDoBalika("D", 10); pridajDoBalika("C", 7); pridajDoBalika("B", 3);
    } else if (obtiaznostAI === "Ťažká") { 
        pridajDoBalika("D", 2); pridajDoBalika("C", 6); pridajDoBalika("B", 10); pridajDoBalika("A", 7); pridajDoBalika("S", 3);
    }
    
    for (var i = pool.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var temp = pool[i]; pool[i] = pool[j]; pool[j] = temp; }
    return pool;
}

function vygenerujDeckbuilder() {
    var e = document.getElementById("deckbuilder-zoznam"); var countEl = document.getElementById("deckbuilder-count"); var msgEl = document.getElementById("deckbuilder-msg");
    if (!e) return; e.innerHTML = "";
    
    inventar.zostava = inventar.zostava.filter(function(karta) {
        var reg = MASTER_REGISTRY[karta];
        if (!reg || reg.isPrizrak || reg.isZvitok) return false;
        if (reg.isPlatinum && !hracVlastniPlatinovku(karta)) return false; // 🛡️ Vykopne Platinovku, ktorú nevlastníš
        return true;
    });
    
    var count = inventar.zostava.length;
    if (countEl) countEl.innerText = count;
    if (msgEl) msgEl.innerHTML = (count >= 28) ? "<span style='color:#10b981;'>✅ Zostava je pripravená na boj!</span>" : "<span style='color:#ff4d4d;'>⚠️ Potrebuješ ešte pridať " + (28 - count) + " kariet!</span>";

    Object.keys(MASTER_REGISTRY).forEach(function(t) {
        var reg = MASTER_REGISTRY[t]; 
        // OPRAVA 2: Skryjeme v UI len Prízraky a Zvitky
        if (reg.isPrizrak || reg.isZvitok) return;
        if (reg.isPlatinum && !hracVlastniPlatinovku(t)) return; // 🛡️ Skryje Platinovky, na ktoré nemáš nárok
        var isVBaliku = (inventar.zostava.indexOf(t) !== -1);
        var cData = inventar.karty[t];
        var vlastneneTriedy = [];
        
        if (cData && typeof cData.repliky === "object") {
            ["F", "E", "D", "C", "B", "A", "S"].forEach(function(c) { if (cData.repliky[c] > 0) vlastneneTriedy.push(c); });
        }

        var cardCls = "F";
        if (reg.isTournamentUnique) {
            cardCls = (cData && cData.aktivnaTrieda) ? cData.aktivnaTrieda : "F";
        } else if (vlastneneTriedy.length > 0) {
            if (cData.zvolenaTrieda && vlastneneTriedy.indexOf(cData.zvolenaTrieda) !== -1) {
                cardCls = cData.zvolenaTrieda;
            } else {
                cardCls = vlastneneTriedy[vlastneneTriedy.length - 1]; 
                if (cData) cData.zvolenaTrieda = cardCls;
            }
        }

        var wrap = document.createElement("div"); wrap.className = "karta-karta-wrapper " + (isVBaliku ? "deck-active-card" : "deck-inactive-card");
        var div = document.createElement("div"); div.className = "karta cls-" + (reg.isPlatinum ? "PLATINUM" : cardCls);
        div.innerHTML = vytvorHTMLKarty(t, getRealPower({n:t, cls:cardCls}), cardCls, reg.row, reg.p, false); 
        div.onclick = function() { prepniKartuVZostave(t); };
        wrap.appendChild(div);
        
        var badge = document.createElement("div"); badge.style.marginTop = "8px"; badge.style.fontWeight = "bold"; badge.style.fontSize = "0.85em"; badge.style.textAlign = "center";
        badge.innerHTML = isVBaliku ? "<span style='color:#10b981; cursor:pointer;' onclick='prepniKartuVZostave(\"" + t + "\")'>✅ V Zostave</span>" : "<span style='color:#888; cursor:pointer;' onclick='prepniKartuVZostave(\"" + t + "\")'>+ Pridať do Zostavy</span>"; 
        wrap.appendChild(badge);

        if (!reg.isTournamentUnique && !reg.isPlatinum && vlastneneTriedy.length > 1) {
            var btnZmena = document.createElement("button");
            btnZmena.innerHTML = "🔄 Zmeniť triedu";
            btnZmena.style.cssText = "margin-top:6px; background:#3b2d1d; color:#ffcc00; border:1px solid #d4af37; border-radius:4px; padding:4px 8px; font-size:0.8em; font-weight:bold; cursor:pointer; width:100%; transition: 0.2s;";
            btnZmena.onclick = function(event) { event.stopPropagation(); cykliTrieduKarty(t, vlastneneTriedy); };
            wrap.appendChild(btnZmena);
        }

        e.appendChild(wrap);
    });
    aktualizujVsetkyStickyWallety();
}

function cykliTrieduKarty(kartaName, vlastneneTriedy) {
    var cData = inventar.karty[kartaName];
    if (!cData || vlastneneTriedy.length === 0) return;
    var aktualna = cData.zvolenaTrieda || vlastneneTriedy[vlastneneTriedy.length - 1];
    var idx = vlastneneTriedy.indexOf(aktualna);
    var nextIdx = (idx + 1) % vlastneneTriedy.length;
    cData.zvolenaTrieda = vlastneneTriedy[nextIdx];
    ulozitZostavuDoStorage();
    vygenerujDeckbuilder();
}

function pripravBalicekPreZapas(pNum) {
    if (pNum === 2 && jeSingleplayer) { return vygenerujUmeluInteligenciu(); }
    
    var pool = [];
    inventar.zostava.forEach(function(kartaName) {
        if (inventar.karty[kartaName] && pool.indexOf(kartaName) === -1) {
            pool.push(kartaName);
        }
    });

    if (pool.length < 28) {
        console.warn("Dopĺňam balíček na 28 kariet (Highlander pravidlo).");
        var fallbackPool = Object.keys(MASTER_REGISTRY).filter(function(k) { 
            var r = MASTER_REGISTRY[k];
            return !r.isPrizrak && !r.isPlatinum && !r.isZvitok; 
        });
        
        for (var i = fallbackPool.length - 1; i > 0; i--) { 
            var j = Math.floor(Math.random() * (i + 1)); 
            var temp = fallbackPool[i]; fallbackPool[i] = fallbackPool[j]; fallbackPool[j] = temp; 
        }
        
        var fbIndex = 0;
        while(pool.length < 28 && fbIndex < fallbackPool.length) { 
            var kandidat = fallbackPool[fbIndex++];
            if (pool.indexOf(kandidat) === -1) {
                pool.push(kandidat); 
            }
        }
    }

    for (var i = pool.length - 1; i > 0; i--) { 
        var j = Math.floor(Math.random() * (i + 1)); 
        var temp = pool[i]; pool[i] = pool[j]; pool[j] = temp; 
    }
    return pool;
}

// POMOCNÁ FUNKCIA: Presné škálovanie AI balíčka
function vygenerujUmeluInteligenciu() {
    var dostupneKarty = Object.keys(MASTER_REGISTRY).filter(function(k) {
        var r = MASTER_REGISTRY[k]; 
        return !r.isPlatinum && !r.isTournamentUnique && !r.isPrizrak && !r.isZvitok;
    });
    
    var pool = [];
    
    function pridajDoBalika(trieda, pocet) {
        for(var i=0; i<pocet; i++) {
            if (dostupneKarty.length === 0) break;
            var randIndex = Math.floor(Math.random() * dostupneKarty.length);
            var randMeno = dostupneKarty[randIndex];
            
            dostupneKarty.splice(randIndex, 1); 
            pool.push({ n: randMeno, cls: trieda });
        }
    }
    
    if (obtiaznostAI === "A") { 
        pridajDoBalika("F", 10); pridajDoBalika("E", 10); pridajDoBalika("D", 5);
    } else if (obtiaznostAI === "B") { 
        pridajDoBalika("F", 5); pridajDoBalika("E", 5); pridajDoBalika("D", 5); pridajDoBalika("C", 5); pridajDoBalika("B", 5);
    } else { 
        pridajDoBalika("D", 5); pridajDoBalika("C", 5); pridajDoBalika("B", 8); pridajDoBalika("A", 5); pridajDoBalika("S", 2);
    }
    
    for (var i = pool.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var temp = pool[i]; pool[i] = pool[j]; pool[j] = temp; }
    return pool;
}

function vytiahniRukuZRozdanehoBalicka(pNum) {
    var deck = (pNum === 1) ? p1_active_deck : p2_active_deck; var hand = [];
    for (var i = 0; i < 10; i++) { 
        if (deck.length > 0) { 
            var item = deck.pop();
            if (typeof item === "object") { hand.push(item); } 
            else {
                var cardCls = "F"; 
                if (pNum === 1 && inventar.karty[item]) {
                    var regItem = getRegistryCard(item);
                    if (regItem.isTournamentUnique) {
                        cardCls = inventar.karty[item].aktivnaTrieda || "F";
                    } else if (inventar.karty[item].zvolenaTrieda && inventar.karty[item].repliky[inventar.karty[item].zvolenaTrieda] > 0) {
                        cardCls = inventar.karty[item].zvolenaTrieda;
                    } else if (inventar.karty[item].repliky) {
                        var rep = inventar.karty[item].repliky;
                        if (rep["S"] > 0) cardCls = "S"; else if (rep["A"] > 0) cardCls = "A"; else if (rep["B"] > 0) cardCls = "B"; else if (rep["C"] > 0) cardCls = "C"; else if (rep["D"] > 0) cardCls = "D"; else if (rep["E"] > 0) cardCls = "E";
                    }
                }
                hand.push({ n: item, cls: cardCls }); 
            }
        } 
    }
    return hand;
}
   
function vykresliRukuHraca(pNum) {
    var handContainer = document.getElementById("p" + pNum + "-hand"); if (!handContainer) return;
    handContainer.innerHTML = ""; var hand = (pNum === 1) ? p1_draft_hand : p2_draft_hand;
    hand.forEach(function(card, idx) {
        var reg = getRegistryCard(card.n); var cls = card.cls || "F"; var pwr = getRealPower(card);
        var cardDiv = document.createElement("div"); var isHidden = (pNum === 2 && jeSingleplayer);
        if (isHidden) cardDiv.className = "karta cls-HIDDEN"; else cardDiv.className = "karta cls-" + (reg.isPlatinum ? "PLATINUM" : (reg.isPrizrak ? "PRIZRAK-" + cls : cls));
        if (pNum !== aktualnyHrac || (pNum === 1 && p1Pass) || (pNum === 2 && p2Pass)) cardDiv.classList.add("karta-disabled");
        cardDiv.innerHTML = vytvorHTMLKarty(card.n, reg.isSpell || reg.isItem || reg.isPrizrak ? "none" : pwr, cls, reg.row, reg.p, isHidden);
        if (!isHidden) cardDiv.onclick = function() { vylozitKartuZRuky(pNum, idx); };
        handContainer.appendChild(cardDiv);
    });
}

// =====================================================================
// [SEKCIA 3 - JS] TRUHLICE, ODMENY A KOVÁČSKA DIELŇA (FORGE)
// =====================================================================
function otvorTruhluVitaza() { spustitVideoAnimationTruhly("vitaz"); }
function otvorTruhluUcastnika() { spustitVideoAnimationTruhly("ucastnik"); }
var zapasSkoncilVlajka = false; // Poistka
function vyhodnotKoniecZapasu() { 
    if (zapasSkoncilVlajka) return; // Ak sa už truhla otvára, ignoruj ďalšie kliky
    zapasSkoncilVlajka = true;
    blokujVykladanie = true; // Zmrazí celý stôl
    var typTruhly = (r1 >= 2 && r2 < 2) ? "vitaz" : "ucastnik"; 
    spustitVideoAnimationTruhly(typTruhly); 
}

function spustitVideoAnimationTruhly(typ) {
    pozastavitHudbuPreVideo();
    var overlay = document.createElement("div"); overlay.id = "chest-video-overlay";
    var videoSrc = (typ === "vitaz") ? "Img/truhlavitaza.mp4" : "Img/truhlaucastnika.mp4";
    overlay.innerHTML = '<video id="chest-video-element" src="' + videoSrc + '" playsinline webkit-playsinline></video><div id="chest-click-prompt" class="chest-prompt-text">🎬 KLIKNI PRE OTVORENIE TRUHLE</div>';
    document.body.appendChild(overlay);
    var vid = document.getElementById("chest-video-element"); var promptTxt = document.getElementById("chest-click-prompt");
    overlay.onclick = function() { if (vid.paused) { vid.play().catch(function(){}); promptTxt.style.display = "none"; } };
    
    // Poistka proti zamrznutiu videa truhlice
    var videoSkoncilo = false;
    var vyhodnotVideo = function() {
        if (videoSkoncilo) return;
        videoSkoncilo = true;
        doplnOdmenyAUpravUI(typ, overlay);
    };
    vid.onended = vyhodnotVideo;
    setTimeout(vyhodnotVideo, 12000); // ⏱️ Ak video zlyhá, truhla sa otvorí sama po 6 sekundách
}

function doplnOdmenyAUpravUI(typ, overlayElement) {
    var coinsEarned = 0, goldEarned = 0, maxKariet = 0, prizrakCount = 0, ziskaneSuroviny = {};
    var zvitkyZiskane = 0; // Nové
    
    if (typ === "vitaz") {
        coinsEarned = Math.floor(Math.random() * 151) + 150; 
        goldEarned = Math.floor(Math.random() * 4) + 2; 
        maxKariet = Math.floor(Math.random() * 4) + 3;
        var rollP = Math.random(); if (rollP <= 0.15) prizrakCount = 2; else if (rollP <= 0.75) prizrakCount = 1;
        if (Math.random() <= 0.33) zvitkyZiskane += Math.floor(Math.random() * 50) + 1;
    } else {
        coinsEarned = Math.floor(Math.random() * 51) + 50; 
        goldEarned = (Math.random() < 0.1) ? 1 : 0; 
        maxKariet = Math.floor(Math.random() * 3) + 1;
        if (Math.random() <= 0.20) prizrakCount = 1;
        if (Math.random() <= 0.33) zvitkyZiskane += Math.floor(Math.random() * 20) + 1;
    }

    var extraLowPwrCoins = 0;
    var extraLowPwrGold = 0;
    var odohraneTriedy = { "F": 0, "E": 0, "D": 0, "C": 0, "B": 0, "A": 0, "S": 0 };
    var sanceNaZvitok = { "F": 0.03, "E": 0.06, "D": 0.09, "C": 0.12, "B": 0.15, "A": 0.18, "S": 0.21 };

    if (typ === "vitaz" && r1 >= 2) {
        // TOTO SME ZMENILI: Spojíme archív s posledným kolom
        var vsetkyKartyKolaAArchivu = p1_celkove_karty_zapasu.concat(p1_played_cards);
        
        vsetkyKartyKolaAArchivu.forEach(function(c) {
            var reg = getRegistryCard(c.n);
            if (!reg.isSpell && !reg.isItem && !reg.isPrizrak && !reg.isPlatinum) {
                var cls = c.cls || "F";
                // ... (zvyšok funkcie nechaj tak, ako je)
                odohraneTriedy[cls] = (odohraneTriedy[cls] || 0) + 1; 
                
                // Hod kockou na extra zvitok podľa sily karty
                if (Math.random() < (sanceNaZvitok[cls] || 0)) zvitkyZiskane++;

                var bPwr = reg.p;
                var currentCoins = 0, currentGold = 0;
                
                if (bPwr === 1) {
                    if (cls === "F") currentCoins = 5; else if (cls === "E") currentCoins = 10;
                    else if (cls === "D") currentCoins = 20; else if (cls === "C") currentCoins = 40;
                    else if (cls === "B") currentCoins = 80; else if (cls === "A") currentCoins = 150;
                    else if (cls === "S") { currentCoins = 250; currentGold = 1; }
                } else if (bPwr === 2) {
                    if (cls === "F") currentCoins = 3; else if (cls === "E") currentCoins = 5;
                    else if (cls === "D") currentCoins = 10; else if (cls === "C") currentCoins = 20;
                    else if (cls === "B") currentCoins = 40; else if (cls === "A") currentCoins = 80;
                    else if (cls === "S") currentCoins = 150;
                } else if (bPwr === 3) {
                    if (cls === "F") currentCoins = 1; else if (cls === "E") currentCoins = 2;
                    else if (cls === "D") currentCoins = 5; else if (cls === "C") currentCoins = 10;
                    else if (cls === "B") currentCoins = 20; else if (cls === "A") currentCoins = 40;
                    else if (cls === "S") currentCoins = 80;
                }
                
                // OPRAVA: Mince a zlato za tieto karty sa teraz krásne sčítavajú!
                if (currentCoins > 0) {
                    extraLowPwrCoins += currentCoins;
                    extraLowPwrGold += currentGold;
                }
            }
        });
        
        if (Math.floor(odohraneTriedy["F"] / 3) > 0) ziskaneSuroviny["Koža"] = Math.floor(odohraneTriedy["F"] / 3);
        if (Math.floor(odohraneTriedy["E"] / 3) > 0) ziskaneSuroviny["Drevo"] = Math.floor(odohraneTriedy["E"] / 3);
        if (Math.floor(odohraneTriedy["D"] / 3) > 0) ziskaneSuroviny["Kov"] = Math.floor(odohraneTriedy["D"] / 3);
        if (Math.floor(odohraneTriedy["C"] / 3) > 0) ziskaneSuroviny["Bronz"] = Math.floor(odohraneTriedy["C"] / 3);
        if (Math.floor(odohraneTriedy["B"] / 3) > 0) ziskaneSuroviny["Striebro"] = Math.floor(odohraneTriedy["B"] / 3);
        if (Math.floor(odohraneTriedy["A"] / 3) > 0) ziskaneSuroviny["Zlato"] = Math.floor(odohraneTriedy["A"] / 3);
    }

    goldEarned += extraLowPwrGold;
    var itemBonusCoins = 0;
    if (typ === "vitaz") {
        p1_pouzite_predmety.forEach(function(cls) {
            var drop = CLASS_CONFIG[cls].itemDrop;
            if (drop) { itemBonusCoins += drop.m; goldEarned += drop.g; prizrakCount += drop.p; }
        });
        coinsEarned += itemBonusCoins;
    }
    coinsEarned += extraLowPwrCoins;
    // ⚔️ PvP ADRENALÍNOVÝ MULTIPLIKÁTOR (+25% BONUS ZA HHRÁČA VS. HRÁČA)
    var pvpTextBonus = "";
    if (!jeSingleplayer) {
        coinsEarned = Math.floor(coinsEarned * 1.25); // +25 % mincí
        
        // 25% šanca na extra drop za to, že hráte proti sebe
        if (Math.random() <= 0.25) goldEarned += 1;
        if (Math.random() <= 0.25) prizrakCount += 1;
        if (Math.random() <= 0.25) zvitkyZiskane += 1;
        if (Math.random() <= 0.25) maxKariet += 1;
        
        pvpTextBonus = "<div style='color:#ffcc00; margin-top:8px; font-weight:bold; font-size:1.1em;'>⚔️ PvP BONUS AKTÍVNY! (+25%)</div>";
    } 
    
    // PRIDELENIE DO INVENTÁRA
    inventar.mince += coinsEarned; 
    inventar.suroviny["Zlato"] = (inventar.suroviny["Zlato"] || 0) + goldEarned; 
    inventar.prizraky["F"] = (inventar.prizraky["F"] || 0) + prizrakCount;
    Object.keys(ziskaneSuroviny).forEach(function(mat) { inventar.suroviny[mat] = (inventar.suroviny[mat] || 0) + ziskaneSuroviny[mat]; });
    
    // Uloženie F-Zvitkov
    if (zvitkyZiskane > 0) {
        if (!inventar.karty["Zvitok"]) inventar.karty["Zvitok"] = { repliky: { "F": 0 }, aktivnaTrieda: "F" };
        if (typeof inventar.karty["Zvitok"].repliky !== "object") inventar.karty["Zvitok"].repliky = { "F": 0 };
        inventar.karty["Zvitok"].repliky["F"] = (inventar.karty["Zvitok"].repliky["F"] || 0) + zvitkyZiskane;
    }

    var mincovyText = 'Kopa Mincí';
    if (extraLowPwrCoins > 0 || itemBonusCoins > 0) {
        mincovyText += '<br><small style="color:#aaa;">(';
        if (extraLowPwrCoins > 0) mincovyText += '+' + extraLowPwrCoins + ' za Top Farmára';
        if (extraLowPwrCoins > 0 && itemBonusCoins > 0) mincovyText += ', ';
        if (itemBonusCoins > 0) mincovyText += '<span style="color:#10b981;">+' + itemBonusCoins + ' z Predmetov</span>';
        mincovyText += ')</small>';
    }
    
    var odmenyHtml = '<div class="karta-surovina"><div class="surovina-badge">+' + coinsEarned + '</div><div class="surovina-foto" style="background-image: url(\'Img/mince.webp\');"></div><div class="surovina-stitok"><div class="surovina-nazov">' + mincovyText + '</div></div></div>';
    if (goldEarned > 0) odmenyHtml += '<div class="karta-surovina"><div class="surovina-badge">+' + goldEarned + ' oz</div><div class="surovina-foto" style="background-image: url(\'Img/zlato.webp\');"></div><div class="surovina-stitok"><div class="surovina-nazov">Hruda Zlata</div></div></div>';
    if (prizrakCount > 0) odmenyHtml += '<div class="karta cls-PRIZRAK-F"><div class="karta-kruh karta-kruh-cls cls-PRIZRAK-F">F</div><div class="karta-foto" style="background-image: url(\'Img/prizrak.webp\');"></div><div class="karta-stitok-spodok"><div class="karta-nazov">Prízrak (+' + prizrakCount + 'x)</div></div></div>';
    if (zvitkyZiskane > 0) odmenyHtml += '<div class="karta cls-F"><div class="karta-kruh karta-kruh-cls cls-F">F</div><div class="karta-foto" style="background-image: url(\'Img/pergamen.webp\');"></div><div class="karta-stitok-spodok"><div class="karta-nazov">F-Zvitok (+' + zvitkyZiskane + 'x)</div></div></div>';

    Object.keys(ziskaneSuroviny).forEach(function(mat) {
        var imgMap = { "Koža": "Img/koza.webp", "Drevo": "Img/drevo.webp", "Kov": "Img/zelezo.webp", "Bronz": "Img/bronz.webp", "Striebro": "Img/striebro.webp", "Zlato": "Img/zlato.webp" };
        if (ziskaneSuroviny[mat] > 0) {
            odmenyHtml += '<div class="karta-surovina" style="border-color:#10b981; box-shadow: 0 0 15px rgba(16, 185, 129, 0.4);"><div class="surovina-badge" style="background:#10b981; color:#fff;">+' + ziskaneSuroviny[mat] + ' oz</div><div class="surovina-foto" style="background-image: url(\'' + imgMap[mat] + '\');"></div><div class="surovina-stitok" style="background:rgba(16, 185, 129, 0.2);"><div class="surovina-nazov">Vyťažené: ' + mat + '</div></div></div>';
        }
    });

    var dostupneFm = Object.keys(MASTER_REGISTRY).filter(function(m) { var r = MASTER_REGISTRY[m]; return !r.isPlatinum && !r.isPrizrak && !r.isTournamentUnique && !r.isZvitok; });
    for (var i = 0; i < maxKariet; i++) {
        var randCardName = dostupneFm[Math.floor(Math.random() * dostupneFm.length)];
        if (!inventar.karty[randCardName]) inventar.karty[randCardName] = { repliky: { "F": 0 }, aktivnaTrieda: "F" };
        if (typeof inventar.karty[randCardName].repliky !== "object") inventar.karty[randCardName].repliky = { "F": 0 };
        inventar.karty[randCardName].repliky["F"] = (inventar.karty[randCardName].repliky["F"] || 0) + 1;
        var reg = getRegistryCard(randCardName); var realPwr = getRealPower({ n: randCardName, cls: "F" });
        odmenyHtml += '<div class="karta cls-F">' + vytvorHTMLKarty(randCardName, realPwr, "F", reg.row, reg.p) + '</div>';
    }

   
    var rewardsBox = document.createElement("div"); rewardsBox.className = "chest-rewards-modal";
    // Tu do HTML vkladáme náš pvpTextBonus priamo za nadpis
    rewardsBox.innerHTML = '<h2>🎉 TRUHLA OTVORENÁ!</h2><p style="color:#aaa; font-size:1em;">Získal si odmeny z truhlice do svojej pokladnice:</p>' + pvpTextBonus + '<div class="rewards-card-container">' + odmenyHtml + '</div><button onclick="zatvoritTruhluAOpustit(\'' + overlayElement.id + '\')" style="background:#10b981; color:#fff; border:none; padding:12px 35px; border-radius:6px; font-weight:bold; font-size:1.1em; cursor:pointer; margin-top:10px;">Zobrať Všetko do Batohu</button>';
    overlayElement.appendChild(rewardsBox); aktualizujPanelDielne(); aktualizujVsetkyStickyWallety();
    
}

function zatvoritTruhluAOpustit(overlayId) { var el = document.getElementById(overlayId); if (el) el.remove(); obnovitHudbuPoVideu(); zobraziťObrazovku("hlavne-menu"); }

function aktualizujPanelDielne() {
    var e = document.getElementById("dielna-zoznam"); if (!e) return; e.innerHTML = "";
   // Zobrazí fialové tlačidlo len ak si prihlásený ako Admin
    if (isAdmin) {
        var devBtnDiv = document.createElement("div"); devBtnDiv.style.gridColumn = "1/-1"; devBtnDiv.style.marginBottom = "15px";
        devBtnDiv.innerHTML = '<button onclick="devPridatSurovinyACheaty()" style="background:#8b5cf6; color:#fff; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; cursor:pointer; width:100%;">⚡ DEV CHEAT: Pridať Suroviny</button>'; e.appendChild(devBtnDiv);
    }
    

   // Načítanie fyzických zvitkov z inventára pre roletku
    var zData = (inventar.karty["Zvitok"] && inventar.karty["Zvitok"].repliky) ? inventar.karty["Zvitok"].repliky : {};
    var zvitkyHtml = '<option value="none">Bez Zvitku</option>';
    if (zData["F"] > 0) zvitkyHtml += '<option value="F">F-Zvitok (+5% & Ochrana) (Skladom: '+zData["F"]+'x)</option>';
    if (zData["E"] > 0) zvitkyHtml += '<option value="E">E-Zvitok (+10% & Ochrana) (Skladom: '+zData["E"]+'x)</option>';
    if (zData["D"] > 0) zvitkyHtml += '<option value="D">D-Zvitok (+20% & Ochrana) (Skladom: '+zData["D"]+'x)</option>';
    if (zData["C"] > 0) zvitkyHtml += '<option value="C">C-Zvitok (+30% & Ochrana) (Skladom: '+zData["C"]+'x)</option>';
    if (zData["B"] > 0) zvitkyHtml += '<option value="B">B-Zvitok (+40% & Ochrana) (Skladom: '+zData["B"]+'x)</option>';
    if (zData["A"] > 0) zvitkyHtml += '<option value="A">A-Zvitok (+50% & Ochrana) (Skladom: '+zData["A"]+'x)</option>';

    var topPrizrak = "F";
    ["S", "A", "B", "C", "D", "E"].forEach(function(c) { if (inventar.prizraky[c] > 0) topPrizrak = c; });

    var prizrakWrapper = document.createElement("div"); prizrakWrapper.className = "karta-karta-wrapper"; prizrakWrapper.style.borderColor = "#a855f7";
    var prizrakCardDiv = document.createElement("div"); prizrakCardDiv.className = "karta cls-PRIZRAK-" + topPrizrak; 
    prizrakCardDiv.innerHTML = vytvorHTMLKarty("Prízrak", "none", topPrizrak, 0, 0);
    var prizrakCountsText = 'F:' + (inventar.prizraky["F"]||0) + ' | E:' + (inventar.prizraky["E"]||0) + ' | D:' + (inventar.prizraky["D"]||0) + ' | C:' + (inventar.prizraky["C"]||0) + ' | B:' + (inventar.prizraky["B"]||0) + ' | A:' + (inventar.prizraky["A"]||0);
    prizrakWrapper.appendChild(prizrakCardDiv); var prizrakActions = document.createElement("div"); prizrakActions.style.width = "100%";
    
    prizrakActions.innerHTML = '<div style="font-size:0.75em; margin:6px 0; color:#a855f7; text-align:center;">Prízrak Zásoby: <strong>' + prizrakCountsText + '</strong></div><select id="step-select-Prizrak" style="width:100%; font-size:0.75em; margin-bottom:4px; background:#110e0c; color:#ffcc00; border:1px solid #5a4d3e; padding:3px;"><option value="F->E">F ➔ E (3xF | 10m | 3 oz Koža)</option><option value="E->D">E ➔ D (3xE | 25m | 3 oz Drevo)</option><option value="D->C">D ➔ C (3xD | 50m | 3 oz Kov)</option><option value="C->B">C ➔ B (3xC | 100m | 3 oz Bronz)</option><option value="B->A">B ➔ A (3xB | 250m | 3 oz Striebro)</option></select><label style="font-size:0.75em; color:#aaa;">Fyzický Zvitok:</label><select id="pergamen-select-Prizrak" style="width:100%; font-size:0.75em; margin-bottom:6px; background:#110e0c; color:#ffcc00; border:1px solid #5a4d3e; padding:3px;">' + zvitkyHtml + '</select><button class="btn-forge" style="background:#8b5cf6;" onclick="vylepsiKartuVoForge(\'Prízrak\', document.getElementById(\'step-select-Prizrak\').value, document.getElementById(\'pergamen-select-Prizrak\').value)">🔨 Vykuť Prízrak</button>';
    prizrakWrapper.appendChild(prizrakActions); e.appendChild(prizrakWrapper);

    Object.keys(MASTER_REGISTRY).forEach(function(t) {
        var reg = MASTER_REGISTRY[t]; if (reg.isPlatinum || reg.isPrizrak) return;
        
        // 🔒 FIX: Dielňa nesmie vytvoriť záznam pre Šampióna, ak ho hráč naozaj nemá!
        if (reg.isTournamentUnique && !inventar.karty[t]) return; 

        if (!inventar.karty[t]) inventar.karty[t] = { repliky: { "F": 0 }, aktivnaTrieda: "F" }; var cardData = inventar.karty[t];
        
        var topClass = "F";
        if (reg.isTournamentUnique) {
            topClass = cardData.aktivnaTrieda || "F";
        } else if (cardData.repliky && typeof cardData.repliky === "object") {
            if (cardData.repliky["S"] > 0) topClass = "S";
            else if (cardData.repliky["A"] > 0) topClass = "A";
            else if (cardData.repliky["B"] > 0) topClass = "B";
            else if (cardData.repliky["C"] > 0) topClass = "C";
            else if (cardData.repliky["D"] > 0) topClass = "D";
            else if (cardData.repliky["E"] > 0) topClass = "E";
        }

        var wrapper = document.createElement("div"); wrapper.className = "karta-karta-wrapper";
        var cardDiv = document.createElement("div"); cardDiv.className = "karta cls-" + topClass;
        var realPwr = getRealPower({ n: t, cls: topClass }); cardDiv.innerHTML = vytvorHTMLKarty(t, realPwr, topClass, reg.row, reg.p);
        
        var actions = '';
        var kovanieZvitkuBlok = reg.isZvitok ? '<div style="color:#ff4d4d; font-size:0.7em; text-align:center; margin-bottom:4px;">Na zvitky sa nesmú používať iné zvitky!</div><input type="hidden" id="pergamen-select-' + t.replace(/\s+/g, '') + '" value="none">' : '<label style="font-size:0.75em; color:#aaa;">Fyzický Zvitok:</label><select id="pergamen-select-' + t.replace(/\s+/g, '') + '" style="width:100%; font-size:0.75em; margin-bottom:4px; background:#110e0c; color:#ffcc00; border:1px solid #5a4d3e; padding:3px;">' + zvitkyHtml + '</select>';
        
        if (reg.isTournamentUnique) {
            var c = topClass;
            if (c === "S") { 
                actions = '<div style="font-size:0.75em; margin:6px 0; color:#10b981; text-align:center; font-weight:bold;">MAXIMÁLNA ÚROVEŇ (S-Class)</div>'; 
            } else {
                var nC = (c === "F") ? "E" : ((c === "E") ? "D" : ((c === "D") ? "C" : ((c === "C") ? "B" : "A")));
                var trKey = c + "->" + nC;
                actions = '<div style="font-size:0.75em; margin:6px 0; color:#ffcc00; text-align:center;">👑 Unikát: Potrebuješ 2x Prízrak ('+c+'-Class)</div>' + kovanieZvitkuBlok + '<button class="btn-forge" style="background:#10b981;" onclick="vylepsiKartuVoForge(\'' + t.replace(/'/g, "\\'") + '\', \'' + trKey + '\', document.getElementById(\'pergamen-select-' + t.replace(/\s+/g, '') + '\').value)">🔨 Povýšiť na ' + nC + '</button>';
            }
        } else {
            var countsText = 'F:' + (cardData.repliky["F"] || 0) + ' | E:' + (cardData.repliky["E"] || 0) + ' | D:' + (cardData.repliky["D"] || 0) + ' | C:' + (cardData.repliky["C"] || 0) + ' | B:' + (cardData.repliky["B"] || 0) + ' | A:' + (cardData.repliky["A"] || 0) + ' | S:' + (cardData.repliky["S"] || 0);
            var maxKovanie = reg.isZvitok ? '' : '<option value="A->S">A ➔ S (3xA | 500m | 3 oz Zlato)</option>';
            actions = '<div style="font-size:0.75em; margin:6px 0; color:#ffcc00; text-align:center;">' + countsText + '</div><select id="step-select-' + t.replace(/\s+/g, '') + '" style="width:100%; font-size:0.75em; margin-bottom:4px; background:#110e0c; color:#ffcc00; border:1px solid #5a4d3e; padding:3px;"><option value="F->E">F ➔ E (3xF | 10m | 3 oz Koža)</option><option value="E->D">E ➔ D (3xE | 25m | 3 oz Drevo)</option><option value="D->C">D ➔ C (3xD | 50m | 3 oz Kov)</option><option value="C->B">C ➔ B (3xC | 100m | 3 oz Bronz)</option><option value="B->A">B ➔ A (3xB | 250m | 3 oz Striebro)</option>' + maxKovanie + '</select>' + kovanieZvitkuBlok + '<select id="mix-select-' + t.replace(/\s+/g, '') + '" style="width:100%; font-size:0.75em; margin-bottom:6px; background:#110e0c; color:#a855f7; border:1px solid #a855f7; padding:3px;"><option value="3,0">3x Reálna Karta</option><option value="2,1">2x Karta + 1x Prízrak</option><option value="1,2">1x Karta + 2x Prízrak</option><option value="0,3">3x Prízrak</option></select><button class="btn-forge" onclick="vylepsiKartuVoForge(\'' + t.replace(/'/g, "\\'") + '\', document.getElementById(\'step-select-' + t.replace(/\s+/g, '') + '\').value, document.getElementById(\'pergamen-select-' + t.replace(/\s+/g, '') + '\').value, document.getElementById(\'mix-select-' + t.replace(/\s+/g, '') + '\').value)">🔨 Forge</button>';
        }

        wrapper.appendChild(cardDiv); var actDiv = document.createElement("div"); actDiv.style.width = "100%"; actDiv.innerHTML = actions; wrapper.appendChild(actDiv); e.appendChild(wrapper);
    });
}

        


function vylepsiKartuVoForge(meno, transitionKey, pergamenCls, mixValue) {
    if (window.jeKovanieAktivne) return; // Zabraňuje spamovaniu tlačidla!
    window.jeKovanieAktivne = true; 

    var cfg = FORGE_RATES[transitionKey]; if (!cfg) { window.jeKovanieAktivne = false; return; }
    var fromCls = cfg.from; var nextCls = cfg.nextClass; var reg = getRegistryCard(meno);

    if (reg.isPrizrak) {
        var countPrizraky = inventar.prizraky[fromCls] || 0;
        if (countPrizraky < 3) { window.jeKovanieAktivne = false; ukazOznamenie("⚠️ NEDOSTATOK PRÍZRAKOV", "Potrebuješ 3x " + fromCls + "-Prízrakov na povýšenie!"); return; }
    } else if (reg.isTournamentUnique) {
        var t = inventar.karty[meno];
        if (!t) { inventar.karty[meno] = { repliky: {}, aktivnaTrieda: "F" }; t = inventar.karty[meno]; }
        var aktualnaTriedaSkutocna = t.aktivnaTrieda || "F";
        if (aktualnaTriedaSkutocna !== fromCls) { window.jeKovanieAktivne = false; ukazOznamenie("⚠️ NESPRÁVNA TRIEDA", "Tvoj Kráľovský Šampión má aktuálne triedu <strong>" + aktualnaTriedaSkutocna + "-Class</strong>!"); return; }
        var countPrizraky = inventar.prizraky[fromCls] || 0;
        if (countPrizraky < 2) { window.jeKovanieAktivne = false; ukazOznamenie("⚠️ CHÝBAJÚ PRÍZRAKY", "Na povýšenie Kráľovského Šampióna potrebuješ 2x <strong>Prízrak (" + fromCls + "-Class)</strong>!"); return; }
    } else {
        var t = inventar.karty[meno]; if (!t) { window.jeKovanieAktivne = false; return; }
        var countCurrent = (typeof t.repliky === "object") ? (t.repliky[fromCls] || 0) : t.repliky;
        var countPrizrak = inventar.prizraky[fromCls] || 0;
        
        var reqReal = 3, reqPrizrak = 0;
        if (mixValue) { var pts = mixValue.split(","); reqReal = parseInt(pts[0]); reqPrizrak = parseInt(pts[1]); }
        if (reqReal + reqPrizrak !== 3 || reqReal < 0 || reqPrizrak < 0) { window.jeKovanieAktivne = false; ukazOznamenie("⛔ POKUS O PODVOD", "Zachytená manipulácia! Receptúra musí obsahovať presne 3 karty alebo prízraky!"); return; }
        if (countCurrent < reqReal) { window.jeKovanieAktivne = false; ukazOznamenie("⚠️ NEDOSTATOK KARIET", "Potrebuješ <strong>" + reqReal + "x Reálnu kartu</strong> (máš " + countCurrent + ")."); return; }
        if (countPrizrak < reqPrizrak) { window.jeKovanieAktivne = false; ukazOznamenie("⚠️ NEDOSTATOK PRÍZRAKOV", "Potrebuješ <strong>" + reqPrizrak + "x Prízrak</strong> (máš " + countPrizrak + ")."); return; }
    }

    var reqMat = cfg.reqMat;
    if ((inventar.suroviny[reqMat] || 0) < cfg.reqMatCount) { window.jeKovanieAktivne = false; ukazOznamenie("⚠️ NEDOSTATOK SUROVÍN", "Potrebuješ " + cfg.reqMatCount + " oz " + reqMat + "!"); return; }
    if (inventar.mince < cfg.coinFee) { window.jeKovanieAktivne = false; ukazOznamenie("⚠️ NEDOSTATOK MINCÍ", "Potrebuješ " + cfg.coinFee + "m za poplatok!"); return; }

    // Logika Fyzických Zvitkov
    var pBonus = 0;
    var saveCard = false;
    if (pergamenCls && pergamenCls !== "none") {
        if (!inventar.karty["Zvitok"] || !inventar.karty["Zvitok"].repliky[pergamenCls] || inventar.karty["Zvitok"].repliky[pergamenCls] < 1) {
            window.jeKovanieAktivne = false; ukazOznamenie("⚠️ CHYBA", "Nemáš v batohu žiadny " + pergamenCls + "-Zvitok!"); return;
        }
        inventar.karty["Zvitok"].repliky[pergamenCls]--; // Odrátanie použitého zvitku z inventára!
        
        saveCard = true; // VŠETKY zvitky teraz chránia kartu!
        
        if (pergamenCls === "F") pBonus = 0.05;
        else if (pergamenCls === "E") pBonus = 0.10;
        else if (pergamenCls === "D") pBonus = 0.20;
        else if (pergamenCls === "C") pBonus = 0.30;
        else if (pergamenCls === "B") pBonus = 0.40;
        else if (pergamenCls === "A") pBonus = 0.50;
    }

    inventar.mince -= cfg.coinFee; inventar.suroviny[reqMat] -= cfg.reqMatCount;
    var finalRate = Math.min(0.95, cfg.rate + pBonus); var roll = Math.random(); var isSuccess = (roll <= finalRate);
    spustitVideoAnimationKovania(meno, fromCls, nextCls, isSuccess, saveCard, mixValue);
}

function spustitVideoAnimationKovania(meno, oldCls, nextCls, isSuccess, wasProtected, mixValue) {
    pozastavitHudbuPreVideo();
    var overlay = document.createElement("div"); overlay.id = "forge-video-overlay";
    var reg = getRegistryCard(meno); var oldPwr = getRealPower({ n: meno, cls: oldCls }); var nextPwr = getRealPower({ n: meno, cls: nextCls });
    var slot1Html = "", slot2Html = "", slot3Html = "";

    var reqReal = 3, reqPrizrak = 0;
    if (mixValue) { var pts = mixValue.split(","); reqReal = parseInt(pts[0]); reqPrizrak = parseInt(pts[1]); }

    if (reg.isTournamentUnique) {
        slot1Html = '<div id="forge-card-1" class="karta cls-' + oldCls + ' forge-slot-card">' + vytvorHTMLKarty("Kráľovský Šampión", oldPwr, oldCls, 1, reg.p) + '</div>';
        slot2Html = '<div id="forge-card-2" class="karta cls-PRIZRAK-' + oldCls + ' forge-slot-card">' + vytvorHTMLKarty("Prízrak", "none", oldCls, 0, 0) + '</div>';
        slot3Html = '<div id="forge-card-3" class="karta cls-PRIZRAK-' + oldCls + ' forge-slot-card">' + vytvorHTMLKarty("Prízrak", "none", oldCls, 0, 0) + '</div>';
    } else {
        var s1Prizrak = (reqPrizrak >= 3);
        var s2Prizrak = (reqPrizrak >= 2);
        var s3Prizrak = (reqPrizrak >= 1);
        
        slot1Html = '<div id="forge-card-1" class="karta cls-' + (s1Prizrak ? 'PRIZRAK-' : '') + oldCls + ' forge-slot-card">' + (s1Prizrak ? vytvorHTMLKarty("Prízrak", "none", oldCls, 0, 0) : vytvorHTMLKarty(meno, oldPwr, oldCls, reg.row, reg.p)) + '</div>';
        slot2Html = '<div id="forge-card-2" class="karta cls-' + (s2Prizrak ? 'PRIZRAK-' : '') + oldCls + ' forge-slot-card">' + (s2Prizrak ? vytvorHTMLKarty("Prízrak", "none", oldCls, 0, 0) : vytvorHTMLKarty(meno, oldPwr, oldCls, reg.row, reg.p)) + '</div>';
        slot3Html = '<div id="forge-card-3" class="karta cls-' + (s3Prizrak ? 'PRIZRAK-' : '') + oldCls + ' forge-slot-card">' + (s3Prizrak ? vytvorHTMLKarty("Prízrak", "none", oldCls, 0, 0) : vytvorHTMLKarty(meno, oldPwr, oldCls, reg.row, reg.p)) + '</div>';
    }

    var fourthCardHtml = isSuccess ? '<div id="forge-card-4" class="karta cls-' + nextCls + ' forge-slot-card" style="opacity:0;">' + vytvorHTMLKarty(meno, nextPwr, nextCls, reg.row, reg.p) + '</div>' : '';
    overlay.innerHTML = '<div class="forge-stage-169"><video id="forge-video-element" src="Img/vylepsovanie.mp4" autoplay playsinline webkit-playsinline></video><div class="forge-cards-container">' + slot1Html + slot2Html + slot3Html + fourthCardHtml + '</div></div>';
    document.body.appendChild(overlay);

    var card1 = document.getElementById("forge-card-1"); var card2 = document.getElementById("forge-card-2"); var card3 = document.getElementById("forge-card-3"); var card4 = document.getElementById("forge-card-4");
    setTimeout(function() { if (card1) card1.style.opacity = "0"; if (card2) card2.style.opacity = "0"; if (card3) card3.style.opacity = "0"; }, 3800);
    setTimeout(function() { if (isSuccess && card4) card4.style.opacity = "1"; }, 12000);

    var vid = document.getElementById("forge-video-element"); if (vid) vid.play().catch(function(){});

    // POISTKA DIELNE
    var videoSkoncilo = false;
    var vyhodnotKovanie = function() {
        if (videoSkoncilo) return;
        videoSkoncilo = true;

        if (reg.isPrizrak) {
            if (isSuccess) {
                inventar.prizraky[oldCls] = Math.max(0, (inventar.prizraky[oldCls] || 0) - 3); inventar.prizraky[nextCls] = (inventar.prizraky[nextCls] || 0) + 1;
                ukazOznamenie("🎉 PRÍZRAK ÚSPEŠNE VYKOVANÝ!", "Vykoval si nový <strong>Prízrak (" + nextCls + "-Class)</strong>!");
            } else {
                if (!wasProtected) { inventar.prizraky[oldCls] = Math.max(0, (inventar.prizraky[oldCls] || 0) - 1); ukazOznamenie("💥 KOVANIE ZLYHALO!", "1x Prízrak zhorel v plameňoch!"); }
                else { ukazOznamenie("🛡️ PRÍZRAK OCHRÁNENÝ!", "Zvitok ochrany zachránil tvojho Prízraka!"); }
            }
        } else if (reg.isTournamentUnique) {
            var t = inventar.karty[meno];
            if (isSuccess) {
                inventar.prizraky[oldCls] = Math.max(0, (inventar.prizraky[oldCls] || 0) - 2); t.aktivnaTrieda = nextCls;
                ukazOznamenie("👑 KRÁĽOVSKÝ ŠAMPIÓN POVÝŠENÝ!", "Turnajová trofej <strong>Kráľovský Šampión</strong> bola povýšená na <strong>" + nextCls + "-Class</strong>!");
                if (nextCls === "S") vyhlasGlobalnySClassOznam("Hráč 1 (Ty)", meno);
            } else {
                if (!wasProtected) {
                    inventar.prizraky[oldCls] = Math.max(0, (inventar.prizraky[oldCls] || 0) - 1);
                    ukazOznamenie("💥 KOVANIE ZLYHALO!", "Kovanie zlyhalo a 1x Prízrak zhorel v ohni. <strong>Kráľovský Šampión</strong> je však nezničiteľný unikát a zostal zachovaný.");
                } else {
                    ukazOznamenie("🛡️ PRÍZRAK OCHRÁNENÝ!", "Kovanie zlyhalo, ale Zvitok ochrany úspešne zachránil tvojho Prízraka pred spálením!");
                }
            }
       } else {
            var t = inventar.karty[meno];
            var availableReal = t.repliky[oldCls] || 0; 
            var availablePrizrak = inventar.prizraky[oldCls] || 0;
            
            if (isSuccess) {
                t.repliky[oldCls] = Math.max(0, availableReal - reqReal);
                if (reqPrizrak > 0) inventar.prizraky[oldCls] = Math.max(0, availablePrizrak - reqPrizrak);
                t.aktivnaTrieda = nextCls; t.repliky[nextCls] = (t.repliky[nextCls] || 0) + 1;
                ukazOznamenie("🎉 KOVANIE ÚSPEŠNÉ!", "Karta <strong>" + meno + "</strong> povýšená na <strong>" + nextCls + "-Class</strong>!<br>(Použité: " + reqReal + "x Karta, " + reqPrizrak + "x Prízrak)");
                if (nextCls === "S") vyhlasGlobalnySClassOznam("Hráč 1 (Ty)", meno);
            } else {
                if (!wasProtected) {
                    if (reqPrizrak > 0 && availablePrizrak > 0) {
                        inventar.prizraky[oldCls] = Math.max(0, availablePrizrak - 1);
                        ukazOznamenie("💥 KOVANIE ZLYHALO!", "Suroviny zhoreli a prišiel si o 1x Prízrak! Tvoja reálna karta zostala v bezpečí.");
                    } else if (reqReal > 0 && availableReal > 0) {
                        t.repliky[oldCls] = Math.max(0, availableReal - 1);
                        ukazOznamenie("💥 KOVANIE ZLYHALO!", "Suroviny zhoreli a prišiel si o 1x Reálnu kartu!");
                    }
                } else {
                    ukazOznamenie("🛡️ KARTA OCHRÁNENÁ!", "Kovanie zlyhalo, ale Zvitok ochrany materiál zachránil!");
                }
            }
        }
        window.jeKovanieAktivne = false; overlay.remove(); obnovitHudbuPoVideu(); aktualizujPanelDielne(); aktualizujVsetkyStickyWallety();
    }; // Koniec vyhodnotKovanie

    vid.onended = vyhodnotKovanie;
    setTimeout(vyhodnotKovanie, 8500); // ⏱️ Poistka proti zamrznutiu Dielne
}


// =====================================================================
// [SEKCIA 4 - JS] TRHOVISKO, PREDAJ A SKLAD
// =====================================================================
var aukcnyCasomeračInterval = null; 
var aktualnaZalozkaTrhu = "trh";
var aktualnyTypPredaja = "karta"; // Prepínač pre formulár

// --- PAMÄŤ TRHU A ZÁZNAM PREDAJOV ---
var historiaPredajov = []; 

function zaznamenajPredajNaTrhu(predmet, trieda, pocet, celkovaCena) {
    var cenaZaKus = Math.round(celkovaCena / pocet);
    historiaPredajov.push({ predmet: predmet, trieda: trieda, pocet: pocet, cenaZaKus: cenaZaKus, cas: Date.now() });
    var pred24Hod = Date.now() - 86400000;
    historiaPredajov = historiaPredajov.filter(function(zaznam) { return zaznam.cas >= pred24Hod; });
}

// --- INTELIGENTNÝ PORADCA CENY (ROC A EMA) ---
var AKTIVNI_HRACI_SIMULACIA = 10; 

function vypocitajSemaforAEMA(predmet, trieda) {
    var relevantnePredaje = historiaPredajov.filter(function(z) { return z.predmet === predmet && (z.trieda === trieda || (!z.trieda && !trieda)); });
    var pocetPredanychKusov = 0;
    relevantnePredaje.forEach(function(z) { pocetPredanychKusov += z.pocet; });

    var indexLikvidity = pocetPredanychKusov / AKTIVNI_HRACI_SIMULACIA;
    var semafor = "🔴"; 
    if (indexLikvidity > 1.0) semafor = "🟢"; else if (indexLikvidity >= 0.1) semafor = "🟠"; 

    var emaCena = 0;
    if (relevantnePredaje.length > 0) {
        relevantnePredaje.sort(function(a, b) { return a.cas - b.cas; });
        emaCena = relevantnePredaje[0].cenaZaKus;
        var vahaNajnovsieho = 0.80; 
        for (var i = 1; i < relevantnePredaje.length; i++) { emaCena = (relevantnePredaje[i].cenaZaKus * vahaNajnovsieho) + (emaCena * (1 - vahaNajnovsieho)); }
    }
    return { semafor: semafor, il: indexLikvidity.toFixed(2), emaCena: Math.round(emaCena), predaneKusy: pocetPredanychKusov };
}

function ziskajFérovuCenu(typ, predmet, trieda) {
    // 1. SUROVINY
    if (typ === "surovina") {
        var trh = vypocitajSemaforAEMA(predmet, null);
        if (trh.semafor === "🟢") return { cena: trh.emaCena, zdroj: "EMA (Zelený trh - Aktívne obchody)", semafor: "🟢" };
        
        var skladCena = STATNY_SKLAD_CENNIK[predmet] ? STATNY_SKLAD_CENNIK[predmet].price : 10;
        if (trh.semafor === "🟠") return { cena: Math.round(skladCena * 0.75), zdroj: "Odhad z ťažby (Stredná likvidita)", semafor: "🟠" };
        
        return { cena: skladCena, zdroj: "Štátny Sklad (Nízka likvidita)", semafor: "🔴" };
    }

    // 2. PRÍZRAKY
    if (typ === "prizrak") {
        var trhPrizrak = vypocitajSemaforAEMA("Prízrak", trieda);
        if (trhPrizrak.semafor === "🟢") return { cena: trhPrizrak.emaCena, zdroj: "EMA (Zelený trh)", semafor: "🟢" };
        
        if (trhPrizrak.semafor === "🟠") {
            var dropPrizrak = { "F": 150, "E": 450, "D": 1350, "C": 4050, "B": 12150, "A": 36450 };
            return { cena: dropPrizrak[trieda] || 150, zdroj: "Teoretická Drop Hodnota z truhlíc", semafor: "🟠" };
        }
        
        var pRoc = vypocitajKaskadoveROC(trieda, true, "Prízrak"); 
        return { cena: pRoc, zdroj: "Kaskádové ROC (Ochrana proti inflácii)", semafor: "🔴" };
    }

    // 3. VŠETKY OSTATNÉ KARTY (Bojové, Kúzla, Predmety, Zvitky)
    if (typ === "karta") {
        var reg = getRegistryCard(predmet);
        var trhKarty = vypocitajSemaforAEMA(predmet, trieda);
        
        if (trhKarty.semafor === "🟢") return { cena: trhKarty.emaCena, zdroj: "EMA (Zelený trh - Čistá trhová cena)", semafor: "🟢" };
        
        // Zberateľské výnimky (Nekujú sa)
        if (reg.isPlatinum) return { cena: 10000, zdroj: "Zberateľská Hodnota", semafor: trhKarty.semafor }; 
        if (reg.isTournamentUnique) return { cena: 5000, zdroj: "Zberateľská Turnajová Hodnota", semafor: "🔴" };

        if (trhKarty.semafor === "🟠") {
            var dropCeny = { "F": 50, "E": 150, "D": 450, "C": 1350, "B": 4000, "A": 12000, "S": 36000 };
            return { cena: dropCeny[trieda] || 50, zdroj: "Teoretická Drop Hodnota z truhlíc", semafor: "🟠" };
        }

        // Ak je trh mŕtvy (Červený), nasadzujeme tvrdú výrobnú cenu z Dielne
        var roc = vypocitajKaskadoveROC(trieda, false, predmet);
        return { cena: roc, zdroj: "Kaskádové ROC (Výrobná cena v Dielni)", semafor: "🔴" };
    }
    
    return { cena: 10, zdroj: "Neznáme", semafor: "🔴" };
}

function vypocitajKaskadoveROC(cielovaTrieda, isPrizrak) {
    var roc = isPrizrak ? 750 : 150; 
    if (cielovaTrieda === "F") return roc;
    
    var postup = [
        { t: "E", mat: "Koža", count: 3, fee: 10, rate: 0.90 },
        { t: "D", mat: "Drevo", count: 3, fee: 25, rate: 0.80 },
        { t: "C", mat: "Kov", count: 3, fee: 50, rate: 0.70 },
        { t: "B", mat: "Bronz", count: 3, fee: 100, rate: 0.60 },
        { t: "A", mat: "Striebro", count: 3, fee: 250, rate: 0.50 },
        { t: "S", mat: "Zlato", count: 3, fee: 500, rate: 0.40 }
    ];

    for (var i = 0; i < postup.length; i++) {
        var krok = postup[i];
        var cenaSuroviny = STATNY_SKLAD_CENNIK[krok.mat] ? STATNY_SKLAD_CENNIK[krok.mat].price : 10;
        roc = ((3 * roc) + (krok.count * cenaSuroviny) + krok.fee) / krok.rate;
        if (krok.t === cielovaTrieda) return Math.round(roc);
    }
    return Math.round(roc);
}

var globalneAukcie = [];

function prepniZalozkuTrhu(tabName) {
    aktualnaZalozkaTrhu = tabName; 
    document.querySelectorAll(".btn-market-tab").forEach(function(b) { b.classList.remove("active-market-tab"); });
    if (tabName === "trh") document.getElementById("btn-tab-trh").classList.add("active-market-tab");
    if (tabName === "sklad") document.getElementById("btn-tab-sklad").classList.add("active-market-tab");
    if (tabName === "predaj") document.getElementById("btn-tab-predaj").classList.add("active-market-tab");
    vygenerujSimulaciuTrhu();
}

function vygenerujSimulaciuTrhu() {
    var e = document.getElementById("obchod-regaly-zoznam"); if (!e) return; e.innerHTML = ""; aktualizujVsetkyStickyWallety();

    if (aktualnaZalozkaTrhu === "trh") {
        var trhHtml = '<div style="background:rgba(30,20,10,0.85); border:2px solid #d4af37; padding:15px; border-radius:10px; text-align:center; margin-bottom:20px;"><h3 style="color:#d4af37; margin-top:0;">👑 AUKČNÉ TRHOVISKO HRÁČOV</h3><p style="font-size:0.9em; color:#ccc;">Systém je teraz napojený na reálnu databázu aukcií.</p></div>';
        
        if (globalneAukcie.length === 0) {
            trhHtml += '<div style="text-align:center; color:#aaa; margin-top:30px;">Momentálne nie sú na trhu žiadne ponuky od iných hráčov. Vyves prvú aukciu ty!</div>';
        } else {
            globalneAukcie.forEach(function(aukcia) {
                var jeMoja = (aukcia.predajca === "Hráč 1 (Ty)");
                var tlacidlaHtml = "";
                
                if (jeMoja) {
                    tlacidlaHtml = '<div style="color:#10b981; font-weight:bold; margin-top:10px; padding:8px; border:1px solid #10b981; border-radius:6px; background:rgba(16, 185, 129, 0.1);">📦 Tvoja vlastná ponuka, čaká na kupcov.</div>';
                } else {
                    tlacidlaHtml = '<div style="display:flex; gap:10px;"><button onclick="anonymnePrihoditSumu(\'' + aukcia.id + '\')" style="background:linear-gradient(180deg, #3b2d1d 0%, #21180e 100%); color:#ffcc00; border:1px solid #d4af37; padding:10px 18px; border-radius:6px; font-weight:bold; cursor:pointer;">🕵️ Prihodiť (Viac ako ' + aukcia.aktualnaPonuka + 'm)</button>';
                    
                    tlacidlaHtml += '</div>';
                }

                var vizualZobrazenie = "";
                var titulokZobrazenie = "";
                
                if (aukcia.typ === "karta") {
                    var reg = getRegistryCard(aukcia.predmet) || MASTER_REGISTRY["Neviditeľný Mário"]; 
                    var realPwr = getRealPower({ n: aukcia.predmet, cls: aukcia.trieda });
                    vizualZobrazenie = '<div class="karta cls-' + aukcia.trieda + '">' + vytvorHTMLKarty(aukcia.predmet, realPwr, aukcia.trieda, reg.row, reg.p) + '</div>';
                    titulokZobrazenie = aukcia.predmet + ' (' + aukcia.trieda + '-Class)';
                } else if (aukcia.typ === "prizrak") {
                    vizualZobrazenie = '<div class="karta cls-PRIZRAK-' + aukcia.trieda + '">' + vytvorHTMLKarty("Prízrak", "none", aukcia.trieda, 0, 0) + '</div>';
                    titulokZobrazenie = 'Prízrak (' + aukcia.trieda + '-Class)';
                } else {
                    // OPRAVA VIZUÁLU: Suroviny teraz používajú krásny veľký rámik karta-surovina!
                    var imgUrl = STATNY_SKLAD_CENNIK[aukcia.predmet] ? STATNY_SKLAD_CENNIK[aukcia.predmet].img : "Img/zlato.webp";
                    vizualZobrazenie = '<div class="karta-surovina" style="width: 140px !important; height: 210px !important; margin: 0; box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);"><div class="surovina-foto" style="background-image: url(\'' + imgUrl + '\'); height: 120px;"></div><div class="surovina-stitok" style="margin-top: 10px;"><div class="surovina-nazov">' + aukcia.predmet + '</div></div></div>';
                    titulokZobrazenie = aukcia.predmet + ' (Surovina)';
                }
                
                trhHtml += '<div class="auction-card-box" style="margin-bottom:15px; border:1px solid #5a4d3e; padding:15px; border-radius:8px; display:flex; gap:15px; align-items:center; background:rgba(0,0,0,0.4);">' + vizualZobrazenie + '<div style="flex-grow:1;"><h3 style="color:#ffcc00; margin:0 0 5px 0;">' + titulokZobrazenie + ' - ' + aukcia.pocet + 'x Balíček</h3><p style="margin:2px 0; color:#aaa; font-size:0.9em;">Predajca: <strong>' + aukcia.predajca + '</strong></p><div style="background:rgba(0,0,0,0.6); border:1px solid #5a4d3e; padding:12px; border-radius:6px; margin:10px 0; max-width:480px;"><div>⏱️ Čas aukcie: <span id="timer-' + aukcia.id + '" style="color:#ffcc00; font-weight:bold;">Počítam...</span></div><div style="margin-top:4px;">👑 Aktuálna ponuka (Vedie): <strong style="color:#ffcc00;">' + aukcia.veduciHrac + ' (' + aukcia.aktualnaPonuka + ' m)</strong></div></div>' + tlacidlaHtml + '</div></div>';
            });
        }
        e.innerHTML = trhHtml;
        spustitOdpocitavanieAukcie();

    } else if (aktualnaZalozkaTrhu === "sklad") {
        var skladHtml = '<div style="background:rgba(30,20,10,0.85); border:2px solid #d4af37; padding:15px; border-radius:10px; text-align:center; margin-bottom:15px;"><h3 style="color:#d4af37; margin-top:0;">🏛️ KRÁĽOVSKÝ ŠTÁTNY SKLAD (NÚDZOVÉ ZÁSOBY)</h3><p style="font-size:0.9em; color:#ccc;">Ak na trhu chýbajú suroviny, štát ti ich garantovane predá za mince.</p></div><div class="market-store-grid">';
        Object.keys(STATNY_SKLAD_CENNIK).forEach(function(mat) {
            var item = STATNY_SKLAD_CENNIK[mat];
            // Dynamická voľba jednotky: Ak je to Zvitok alebo Prízrak, dáme "ks", inak "oz"
            var jednotka = (mat === "F-Zvitok" || mat === "F-Prízrak") ? "ks" : "oz";
            
            skladHtml += '<div class="market-store-card"><img src="' + item.img + '" class="market-store-img"><strong style="color:#ffcc00; font-size:1em;">' + mat + '</strong><span style="color:#aaa; font-size:0.85em;">Cena: <strong style="color:#ffcc00;">' + item.price + ' m / 1 ' + jednotka + '</strong></span><div style="display:flex; gap:6px; margin-top:6px;"><button onclick="kupitSurovinuZoStatnehoSkladu(\'' + mat + '\', 1)" style="background:#3b2d1d; color:#ffcc00; border:1px solid #d4af37; padding:5px 8px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:0.8em;">+1 ' + jednotka + '</button><button onclick="kupitSurovinuZoStatnehoSkladu(\'' + mat + '\', 5)" style="background:#10b981; color:#fff; border:none; padding:5px 8px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:0.8em;">+5 ' + jednotka + '</button></div></div>';
        });
        skladHtml += '</div>'; e.innerHTML = skladHtml;
        
    } else if (aktualnaZalozkaTrhu === "predaj") {
        vykresliZalozkuPredaja();
    }
}

function vykresliZalozkuPredaja() {
    var e = document.getElementById("obchod-regaly-zoznam"); if (!e) return;
    
    // Pridali sme možnosť predávať Prízraky
    var typPredajaHtml = '<select class="sell-form-select" onchange="aktualnyTypPredaja = this.value; vykresliZalozkuPredaja();"><option value="karta" ' + (aktualnyTypPredaja==="karta"?"selected":"") + '>Karty z batohu</option><option value="surovina" ' + (aktualnyTypPredaja==="surovina"?"selected":"") + '>Suroviny (Koža, Kov...)</option><option value="prizrak" ' + (aktualnyTypPredaja==="prizrak"?"selected":"") + '>Prízraky</option></select>';
    var optionsHtml = "";
    
    if (aktualnyTypPredaja === "karta") {
        var dostupneKarty = Object.keys(inventar.karty).filter(function(k) { 
            // TOTO SME PRIDALI: Kontrola, či to nie je platinovka
            var reg = getRegistryCard(k);
            return typeof inventar.karty[k].repliky === "object" && (!reg || !reg.isPlatinum); 
        });
        dostupneKarty.forEach(function(k) { optionsHtml += '<option value="' + k + '">' + k + '</option>'; });
    } else if (aktualnyTypPredaja === "prizrak") {
        optionsHtml = '<option value="Prízrak">Prízrak</option>';
    } else {
        var dostupneSuroviny = Object.keys(inventar.suroviny).filter(function(s) { return inventar.suroviny[s] > 0; });
        dostupneSuroviny.forEach(function(s) { optionsHtml += '<option value="' + s + '">' + s + ' (' + inventar.suroviny[s] + ' oz)</option>'; });
    } // <--- TU BOLA DOPLNENÁ CHÝBAJÚCA ZÁTVORKA
    
    var formularPredaja = '<div class="sell-form-container"><h3 style="color:#ffcc00; margin-top:0; text-align:center; font-family:Georgia, serif;">📦 VYVESIŤ NOVÚ AUKCIU</h3>' +
        '<div class="sell-form-row"><label>1. Typ položky:</label>' + typPredajaHtml + '</div>' +
        '<div class="sell-form-row"><label>2. Vyber predmet:</label><select id="sell-item-select" class="sell-form-select" onchange="aktualizujDostupneTriedyPrePredaj()">' + optionsHtml + '</select></div>';
        
    if (aktualnyTypPredaja === "karta" || aktualnyTypPredaja === "prizrak") {
        formularPredaja += '<div class="sell-form-row"><label>Trieda:</label><select id="sell-class-select" class="sell-form-select" onchange="aktualizujMaxKusovPrePredaj()"></select></div>';
    }
    
    // SEMAFOR BOX
    formularPredaja += '<div id="sell-advice-box" style="margin: 15px 0; padding: 12px; background: rgba(0,0,0,0.6); border: 1px dashed #d4af37; border-radius: 6px; text-align: center; color: #ccc; font-size: 0.95em;">Načítavam analýzu trhu...</div>';

    // TEXTOVÉ POLÍČKO S ČÍSLAMI NAMIESTO POSUVNÍKA
    formularPredaja += '<div class="sell-form-row"><label>3. Počet kusov na predaj (Skladom: <span id="sell-max-stock" style="color:#ffcc00; font-weight:bold;">1</span>x):</label><input type="number" id="sell-count-input" class="sell-form-input" min="1" max="1" value="1" style="width:120px; font-weight:bold; font-size:1.1em; background:#110c08; color:#ffcc00;" oninput="aktualizujPoradcuCeny()"></div>' +
        '<div class="sell-form-row"><label>4. Vyvolávacia cena celkom (Predvyplnená trhom):</label><input type="number" id="sell-start-price" class="sell-form-input" value="10" min="1"></div>' +
        '<div class="sell-form-row"><label>5. Trvanie aukcie:</label><select id="sell-duration-select" class="sell-form-select"><option value="3600">1 Hodina</option><option value="21600">6 Hodín</option><option value="43200">12 Hodín</option><option value="86400">24 Hodín</option></select></div>' +
        '<div style="text-align:center; margin-top:15px;"><button onclick="odoslatPredajnyFormular()" style="background:#10b981; color:#fff; border:none; padding:12px 30px; border-radius:6px; font-weight:bold; font-size:1.05em; cursor:pointer; width:100%;">🚀 Potvrdiť a Vyvesiť na Trh</button></div></div>';
        
    e.innerHTML = formularPredaja; 
    setTimeout(aktualizujDostupneTriedyPrePredaj, 50);
}

function aktualizujDostupneTriedyPrePredaj() {
    var itemEl = document.getElementById("sell-item-select"); if (!itemEl) return;
    var itemName = itemEl.value; 
    var sel = document.getElementById("sell-class-select");
    
    if (aktualnyTypPredaja === "karta" && sel) {
        var cData = inventar.karty[itemName]; sel.innerHTML = "";
        var reg = getRegistryCard(itemName);
        
        if (cData) { 
            // 🔓 FIX: Výnimka pre vykreslenie Šampióna do roletky
            if (reg.isTournamentUnique) {
                sel.innerHTML += '<option value="' + cData.aktivnaTrieda + '">' + cData.aktivnaTrieda + '-Class (Unikát)</option>';
            } else {
                ["F", "E", "D", "C", "B", "A", "S"].forEach(function(cls) { 
                    if (cData.repliky && cData.repliky[cls] > 0) sel.innerHTML += '<option value="' + cls + '">' + cls + '-Class (' + cData.repliky[cls] + 'x)</option>'; 
                }); 
            }
        }
    } else if (aktualnyTypPredaja === "prizrak" && sel) {
        sel.innerHTML = "";
        ["F", "E", "D", "C", "B", "A"].forEach(function(cls) { if (inventar.prizraky[cls] > 0) sel.innerHTML += '<option value="' + cls + '">' + cls + '-Class (' + inventar.prizraky[cls] + 'x)</option>'; });
    }
    aktualizujMaxKusovPrePredaj();
}

function aktualizujMaxKusovPrePredaj() {
    var itemEl = document.getElementById("sell-item-select"); if (!itemEl) return;
    var itemName = itemEl.value; var max = 1;
    
    if (aktualnyTypPredaja === "karta") {
        var clsEl = document.getElementById("sell-class-select"); if (!clsEl) return;
        var cData = inventar.karty[itemName]; max = (cData && cData.repliky && cData.repliky[clsEl.value]) ? cData.repliky[clsEl.value] : 1;
    } else if (aktualnyTypPredaja === "prizrak") {
        var clsEl = document.getElementById("sell-class-select"); if (!clsEl) return;
        max = inventar.prizraky[clsEl.value] || 1;
    } else {
        max = inventar.suroviny[itemName] || 1;
    }
    
    var input = document.getElementById("sell-count-input"); var stockLabel = document.getElementById("sell-max-stock");
    if (input) { input.max = max; input.value = 1; }
    if (stockLabel) stockLabel.innerText = max;
    
    aktualizujPoradcuCeny();
}

function aktualizujPoradcuCeny() {
    var typ = aktualnyTypPredaja;
    var itemEl = document.getElementById("sell-item-select");
    var clsEl = document.getElementById("sell-class-select");
    var countEl = document.getElementById("sell-count-input");
    var adviceBox = document.getElementById("sell-advice-box");
    var priceInput = document.getElementById("sell-start-price");

    if (!itemEl || !countEl || !adviceBox) return;

    var predmet = itemEl.value;
    var trieda = ((typ === "karta" || typ === "prizrak") && clsEl) ? clsEl.value : null;
    var pocet = parseInt(countEl.value) || 1;

    if (!predmet || ((typ === "karta" || typ === "prizrak") && !trieda)) { adviceBox.innerHTML = "Vyberte predmet pre zobrazenie trhovej analýzy."; return; }

    var analyza = ziskajFérovuCenu(typ, predmet, trieda);
    var celkovaCena = analyza.cena * pocet;

    adviceBox.innerHTML = '<strong style="font-size:1.1em;">Semafor Likvidity: ' + analyza.semafor + '</strong><br>' +
                          '<span style="color:#ffcc00; font-weight:bold; font-size: 1.1em;">Odporúčaná cena: ' + analyza.cena + ' m / 1 ks</span> <br>' +
                          '<small style="color:#aaa;">' + analyza.zdroj + '</small>';

    if (priceInput) priceInput.value = celkovaCena;
}

function odoslatPredajnyFormular() {
    var itemName = document.getElementById("sell-item-select").value; 
    var cls = (aktualnyTypPredaja === "karta" || aktualnyTypPredaja === "prizrak") ? document.getElementById("sell-class-select").value : null;
    var count = parseInt(document.getElementById("sell-count-input").value); 
    var startPrice = parseInt(document.getElementById("sell-start-price").value);
    
    // 💡 Načítanie zvoleného času v sekundách
    var trvanie = parseInt(document.getElementById("sell-duration-select").value);
    
    if (isNaN(count) || count <= 0 || isNaN(startPrice) || startPrice <= 0 || startPrice > 1000000) { 
        ukazOznamenie("⚠️ CHYBA", "Zadaj platné čísla! (Maximálna vyvolávacia cena je 1 000 000 mincí)"); 
        return; 
    }
    
    var zalistovaciPoplatok = Math.max(1, Math.floor(startPrice * 0.05));
    if (inventar.mince < zalistovaciPoplatok) { 
        ukazOznamenie("⚠️ NEDOSTATOK MINCÍ", "Na vyvesenie tejto ponuky potrebuješ zaplatiť trhový poplatok " + zalistovaciPoplatok + "m!"); 
        return; 
    }
    inventar.mince -= zalistovaciPoplatok;

    if (aktualnyTypPredaja === "karta") {
        var reg = getRegistryCard(itemName);
        
        // OPRAVA PRE KRÁĽOVSKÉHO ŠAMPIÓNA
        if (reg.isTournamentUnique) {
            var aktCls = inventar.karty[itemName] ? inventar.karty[itemName].aktivnaTrieda : "F";
            if (!inventar.karty[itemName] || aktCls !== cls) {
                inventar.mince += zalistovaciPoplatok; // Vrátime peniaze za poplatok
                ukazOznamenie("⛔ CHYBA", "Túto unikátnu kartu nevlastníš v tejto triede!"); return;
            }
            delete inventar.karty[itemName]; // Šampión natrvalo odstránený z batohu!
        } else {
            // Bežné karty
            var countInBag = (inventar.karty[itemName] && inventar.karty[itemName].repliky) ? (inventar.karty[itemName].repliky[cls] || 0) : 0;
            if (count > countInBag) { inventar.mince += zalistovaciPoplatok; ukazOznamenie("⛔ PODVOD ZACHYTENÝ", "Nemáš dostatok kusov kariet na tento predaj!"); return; }
            
            var celkovyPocetKariet = 0; 
            Object.keys(inventar.karty[itemName].repliky).forEach(function(cKey) { 
                celkovyPocetKariet += inventar.karty[itemName].repliky[cKey]; 
            });
            
            if (!reg.isZvitok && !reg.isPrizrak && !reg.isPlatinum) {
                if ((celkovyPocetKariet - count) < 1) { 
                    inventar.mince += zalistovaciPoplatok;
                    ukazOznamenie("🛡️ OCHRANA INVENTÁRA", "Túto kartu (<strong>" + itemName + "</strong>) nemôžeš predať úplne celú!<br><br>Musí ti ostať vždy aspoň 1 kus (akejkoľvek triedy)."); 
                    return; 
                }
            }

            if (["C", "B", "A", "S"].indexOf(cls) !== -1) {
                var potvrdenie = confirm("⚠️ POZOR!\n\nChystáš sa vyvesiť na trh veľmi vzácnu kartu: " + itemName + " (" + cls + "-Class).\n\nSi si absolútne istý, že ju chceš predať?");
                if (!potvrdenie) { inventar.mince += zalistovaciPoplatok; return; }
            }

            inventar.karty[itemName].repliky[cls] -= count;
        }
        
    } else if (aktualnyTypPredaja === "prizrak") {
        var countInBagPrizrak = inventar.prizraky[cls] || 0;
        if (count > countInBagPrizrak) { inventar.mince += zalistovaciPoplatok; ukazOznamenie("⛔ PODVOD ZACHYTENÝ", "Nemáš dostatok prízrakov na tento predaj!"); return; }
        
        if (["C", "B", "A", "S"].indexOf(cls) !== -1) {
            var potvrdeniePrizrak = confirm("⚠️ POZOR!\n\nChystáš sa predať mimoriadne vzácny Prízrak (" + cls + "-Class).\n\nNaozaj chceš pokračovať?");
            if (!potvrdeniePrizrak) { inventar.mince += zalistovaciPoplatok; return; }
        }

        inventar.prizraky[cls] -= count;
    } else {
        var countInBagSuroviny = inventar.suroviny[itemName] || 0;
        if (count > countInBagSuroviny) { inventar.mince += zalistovaciPoplatok; ukazOznamenie("⛔ PODVOD ZACHYTENÝ", "Nemáš dostatok surovín na tento predaj!"); return; }
        inventar.suroviny[itemName] -= count;
    }

    // 💡 Nastavíme čas z výberu a výkupnú cenu natvrdo na 0
    globalneAukcie.push({ id: "aukcia_" + Date.now(), predajca: "Hráč 1 (Ty)", typ: aktualnyTypPredaja, predmet: itemName, trieda: cls, pocet: count, veduciHrac: "Nikto", aktualnaPonuka: startPrice, vykupnaCena: 0, casDoKonca: trvanie });
    ukazOznamenie("🎉 POLOŽKA ZALISTOVANÁ", "Aukcia bola úspešne vyvesená na Trhovisko!");
    prepniZalozkuTrhu("trh");
}

function kupitSurovinuZoStatnehoSkladu(mat, pocetOz) {
    pocetOz = parseInt(pocetOz, 10);
    if (isNaN(pocetOz) || pocetOz <= 0) return; // Ochrana pred hackerským nákupom do mínusu
    var item = STATNY_SKLAD_CENNIK[mat]; if (!item) return;
    var celkovaCena = item.price * pocetOz;
    if (inventar.mince < celkovaCena) { ukazOznamenie("⚠️ NEDOSTATOK MINCÍ", "Na nákup potrebuješ " + celkovaCena + " mincí!"); return; }
    inventar.mince -= celkovaCena; 
    if (mat === "F-Zvitok") {
        if (!inventar.karty["Zvitok"]) inventar.karty["Zvitok"] = { repliky: { "F": 0 }, aktivnaTrieda: "F" };
        inventar.karty["Zvitok"].repliky["F"] = (inventar.karty["Zvitok"].repliky["F"] || 0) + pocetOz;
    } else if (mat === "F-Prízrak") {
        inventar.prizraky["F"] = (inventar.prizraky["F"] || 0) + pocetOz;
    } else {
        inventar.suroviny[mat] = (inventar.suroviny[mat] || 0) + pocetOz;
    }
    ukazOznamenie("🏛️ NÁKUP", "Kúpil si **" + pocetOz + "x " + mat + "** za " + celkovaCena + " mincí!"); aktualizujVsetkyStickyWallety();
}

function pridelPredmetHracovi(aukcia) {
    if (aukcia.typ === "karta") {
        var reg = getRegistryCard(aukcia.predmet);
        // OPRAVA: Správne uloženie Šampióna pre kupca alebo vrátenie majiteľovi
        if (reg.isTournamentUnique) {
            inventar.karty[aukcia.predmet] = { repliky: {}, aktivnaTrieda: aukcia.trieda };
        } else {
            if (!inventar.karty[aukcia.predmet]) inventar.karty[aukcia.predmet] = { repliky: { "F": 0 }, aktivnaTrieda: "F" };
            if (typeof inventar.karty[aukcia.predmet].repliky !== "object") inventar.karty[aukcia.predmet].repliky = { "F": 0 };
            inventar.karty[aukcia.predmet].repliky[aukcia.trieda] = (inventar.karty[aukcia.predmet].repliky[aukcia.trieda] || 0) + aukcia.pocet;
        }
    } else if (aukcia.typ === "prizrak") {
        inventar.prizraky[aukcia.trieda] = (inventar.prizraky[aukcia.trieda] || 0) + aukcia.pocet;
    } else {
        inventar.suroviny[aukcia.predmet] = (inventar.suroviny[aukcia.predmet] || 0) + aukcia.pocet;
    }
}

function anonymnePrihoditSumu(aukciaId) {
    var aukcia = globalneAukcie.find(function(a) { return a.id === aukciaId; });
    if (!aukcia) { ukazOznamenie("⚠️ CHYBA", "Táto aukcia už neexistuje!"); return; }
    if (aukcia.predajca === "Hráč 1 (Ty)") { ukazOznamenie("⛔ ZAMIETNUTÉ", "Nemôžeš prihadzovať na svoju vlastnú aukciu!"); return; }

    var ponuka = parseInt(prompt("Zadaj svoju ponuku (Musí byť vyššia ako " + aukcia.aktualnaPonuka + "m):"));
    if (isNaN(ponuka) || ponuka <= aukcia.aktualnaPonuka) { ukazOznamenie("⚠️ CHYBA", "Musíš prihodiť platnú sumu!"); return; }
    
    // Zistíme, či má aktuálny hráč dosť peňazí na celú ponuku
    if (inventar.mince < ponuka) { ukazOznamenie("⚠️ NEDOSTATOK MINCÍ", "Nemáš dostatok mincí na túto ponuku!"); return; }

    // 1. Odpočítame novú sumu aktuálnemu hráčovi (Ty)
    inventar.mince -= ponuka; 
    
    // 2. VRÁTENIE MINCÍ PREDCHÁDZAJÚCEMU LÍDROVI
    if (aukcia.veduciHrac === "Hráč 1 (Ty)") {
        // Ak si sa z nejakého dôvodu prebil sám
        inventar.mince += aukcia.aktualnaPonuka;
    } else if (aukcia.veduciHrac !== "Nikto") {
        // MIESTO PRE FIREBASE: Tu povieme serveru, nech vráti peniaze inému hráčovi
        console.log("Pripravené pre Cloud: Vrátenie " + aukcia.aktualnaPonuka + "m hráčovi " + aukcia.veduciHrac);
    }

    // 3. Aktualizácia aukcie
    aukcia.aktualnaPonuka = ponuka; 
    aukcia.veduciHrac = "Hráč 1 (Ty)";
    
    ukazOznamenie("🕵️ PONUKA ZAREGISTROVANÁ", "Tvoja ponuka " + ponuka + "m ťa posunula na 1. miesto v aukcii!"); 
    vygenerujSimulaciuTrhu();
}

function spustitOdpocitavanieAukcie() {
    if (aukcnyCasomeračInterval) clearInterval(aukcnyCasomeračInterval); 
    aukcnyCasomeračInterval = setInterval(function() {
        // VYMAŽ TEN RIADOK: if (aktualnaZalozkaTrhu !== "trh") return;
        var ziveAukcie = []; var niecoSkoncilo = false;

        globalneAukcie.forEach(function(aukcia) {
            if (aukcia.casDoKonca > 0) {
                aukcia.casDoKonca--; 
                ziveAukcie.push(aukcia);
                
                // Aktualizujeme UI iba ak sme reálne na Trhu
                if (aktualnaZalozkaTrhu === "trh") {
                    var timerEl = document.getElementById("timer-" + aukcia.id);
                    if (timerEl) { 
                        var h = Math.floor(aukcia.casDoKonca / 3600); var m = Math.floor((aukcia.casDoKonca % 3600) / 60); var s = aukcia.casDoKonca % 60; 
                        timerEl.innerText = (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s); 
                    }
                }
            } else {
                niecoSkoncilo = true;
                // ... (zvyšok funkcie pre ukončenie aukcie nechaj presne tak, ako bol)
                if (aukcia.veduciHrac === "Nikto") {
                    if (aukcia.predajca === "Hráč 1 (Ty)") {
                        pridelPredmetHracovi(aukcia); 
                        ukazOznamenie("⏱️ AUKCIA SKONČILA (NEPREDANÉ)", "O tvoju aukciu (" + aukcia.pocet + "x " + aukcia.predmet + ") nikto neprejavil záujem. Veci sa ti vrátili do batohu.");
                    }
                } else {
                    var predmetNazov = (aukcia.typ === "karta" || aukcia.typ === "prizrak") ? aukcia.predmet : aukcia.predmet;
                    var predmetTrieda = (aukcia.typ === "karta" || aukcia.typ === "prizrak") ? aukcia.trieda : "F";
                    zaznamenajPredajNaTrhu(predmetNazov, predmetTrieda, aukcia.pocet, aukcia.aktualnaPonuka);

                    if (aukcia.predajca === "Hráč 1 (Ty)") {
                        var danTrznice = Math.floor(aukcia.aktualnaPonuka * 0.10); // 10% daň kráľovstvu
                        var cistyZisk = aukcia.aktualnaPonuka - danTrznice;
                        
                        inventar.mince += cistyZisk;
                        ukazOznamenie("💰 ÚSPEŠNÝ PREDAJ", "Hráč " + aukcia.veduciHrac + " vydražil tvoju aukciu (" + aukcia.pocet + "x " + aukcia.predmet + "). Po zaplatení 10% dane získavaš čistý zisk " + cistyZisk + "m!");
                    }
                    if (aukcia.veduciHrac === "Hráč 1 (Ty)") {
                        pridelPredmetHracovi(aukcia); 
                        ukazOznamenie("🏆 VYHRAL SI AUKCIU!", "Čas vypršal a tvoja ponuka " + aukcia.aktualnaPonuka + "m bola najvyššia. Získavaš " + aukcia.pocet + "x " + aukcia.predmet + "!");
                    }
                }
            }
        });
        if (niecoSkoncilo) { globalneAukcie = ziveAukcie; vygenerujSimulaciuTrhu(); aktualizujVsetkyStickyWallety(); }
        if (globalneAukcie.length === 0) clearInterval(aukcnyCasomeračInterval);
    }, 1000);
}
// =====================================================================
// [SEKCIA 5 - JS] HERNÁ LOGIKA A VÝPOČTY SILY
// =====================================================================
function vypocitajDynamickuSiluJednejKarty(card, pNum) {
    var reg = getRegistryCard(card.n);
    if (reg.isSpell || reg.isItem || reg.isPrizrak) return "none";

    var myCards = (pNum === 1) ? p1_played_cards : p2_played_cards;
    var isNelaOnTable = false;
    [p1_played_cards, p2_played_cards].forEach(function(list) { list.forEach(function(c) { if (c.n === "Nela") isNelaOnTable = true; }); });

    var myKaty = myCards.some(function(c) { return c.n === "Katy"; });
    var oppKaty = ((pNum === 1) ? p2_played_cards : p1_played_cards).some(function(c) { return c.n === "Katy"; });

    var itemBonus = 0;
    myCards.forEach(function(c) { var r = getRegistryCard(c.n); if (r.isItem && r.row === reg.row) itemBonus += CLASS_CONFIG[c.cls || "F"].itemBonus; });
    var rowSetBonus = vypocitajSetBonusRadu(reg.row, myCards, pNum); 
    var basePwr = getRealPower(card);

    if (card.n !== "Oli") {
        if (reg.row === 1 && neutralne_vplyvy.some(function(s){return s.n === "Musíme sa porozprávať";})) basePwr = 1;
        if (reg.row === 2 && neutralne_vplyvy.some(function(s){return s.n === "Upokoj sa";})) basePwr = 1;
        if (reg.row === 3 && neutralne_vplyvy.some(function(s){return s.n === "Ohňostroj";})) basePwr = 1;
    }

    basePwr += itemBonus + rowSetBonus;
    var rowMultiplier = 1.0;
    var hasAlkohol = myCards.some(function(c) { return c.n === "Alkohol"; });
    var myErikRow = (pNum === 1) ? p1_erik_buff_row : p2_erik_buff_row;

    if (!isNelaOnTable && card.n !== "Oli") {
        if (reg.row === 1 && myCards.some(function(c) { return c.n === "Sisa"; })) rowMultiplier += 0.50;
        if (reg.row === 2 && myCards.some(function(c) { return c.n === "Ďuri"; }) && hasAlkohol) rowMultiplier += 1.00;
        if (reg.row === 3 && myCards.some(function(c) { return c.n === "Vlk"; })) rowMultiplier += 0.50;
        if (myErikRow === reg.row) rowMultiplier += 0.50;
        if (card.n === "Michal") rowMultiplier += 1.00;
    }

    var finalPwr = Math.round(basePwr * rowMultiplier);
    if (myKaty) finalPwr += 2; if (oppKaty) finalPwr -= 2;
    return Math.max(0, finalPwr);
}

function prepočitajSkoreStola() {
    var isNelaOnTable = false;
    [p1_played_cards, p2_played_cards].forEach(function(list) { list.forEach(function(c) { if (c.n === "Nela") isNelaOnTable = true; }); });
    var p1Katy = p1_played_cards.some(function(c) { return c.n === "Katy"; }); var p2Katy = p2_played_cards.some(function(c) { return c.n === "Katy"; });

    sc1 = vypocitajSiluHracovychKariet(1, p1_played_cards, p2_played_cards, isNelaOnTable, p1Katy, p2Katy, p1_erik_buff_row) + p1MulliganRound1Bonus;
    sc2 = vypocitajSiluHracovychKariet(2, p2_played_cards, p1_played_cards, isNelaOnTable, p2Katy, p1Katy, p2_erik_buff_row) + p2MulliganRound1Bonus;

    var el1 = document.getElementById("p1-score"); var el2 = document.getElementById("p2-score");
    if (el1) el1.innerText = sc1; if (el2) el2.innerText = sc2;
}

function vypocitajSiluHracovychKariet(pNum, myCards, oppCards, isNela, myKaty, oppKaty, myErikRow) {
    var total = 0; myCards.forEach(function(c) { var dynPwr = vypocitajDynamickuSiluJednejKarty(c, pNum); if (dynPwr !== "none") total += dynPwr; }); return total;
}

function vypocitajSetBonusRadu(targetRow, cardList, pNum) {
    var cardsInRow = cardList.filter(function(c) { return getRegistryCard(c.n).row === targetRow; });
    var countE = 0, countD = 0, countC = 0, countB = 0, countA = 0, countS = 0;
    
    cardsInRow.forEach(function(c) {
        var cls = c.cls || "F";
        if (cls === "E") countE++; if (cls === "D") countD++; if (cls === "C") countC++; if (cls === "B") countB++; if (cls === "A") countA++; if (cls === "S") countS++;
    });
    
    var spellWeight = 0;
    var weights = { "F": 1, "E": 2, "D": 3, "C": 4, "B": 5, "A": 6, "S": 7 };
    
    neutralne_vplyvy.forEach(function(spell) {
        if (spell.owner !== pNum) { 
            if ((targetRow === 1 && spell.n === "Musíme sa porozprávať") ||
                (targetRow === 2 && spell.n === "Upokoj sa") ||
                (targetRow === 3 && spell.n === "Ohňostroj")) {
                var w = weights[spell.cls || "F"] || 1;
                if (w > spellWeight) spellWeight = w;
            }
        }
    });

    if (spellWeight >= 2) countE = 0;
    if (spellWeight >= 3) countD = 0;
    if (spellWeight >= 4) countC = 0;
    if (spellWeight >= 5) countB = 0;
    if (spellWeight >= 6) countA = 0;
    if (spellWeight >= 7) countS = 0;

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
    blokujVykladanie = true;
    if (pNum === 2 && jeSingleplayer) {
        if ((obtiaznostAI === "A") || (obtiaznostAI === "B" && Math.random() <= 0.65)) {
            var r1Points = p2_played_cards.filter(function(c){return getRegistryCard(c.n).row===1;}).length;
            var r2Points = p2_played_cards.filter(function(c){return getRegistryCard(c.n).row===2;}).length;
            var r3Points = p2_played_cards.filter(function(c){return getRegistryCard(c.n).row===3;}).length;
            p2_erik_buff_row = (r3Points >= r1Points && r3Points >= r2Points) ? 3 : ((r2Points >= r1Points) ? 2 : 1);
        } else p2_erik_buff_row = Math.floor(Math.random() * 3) + 1;
        ukazOznamenie("📢 ERIK BUFF (SÚPER)", "Súper zvolil posilnenie **" + p2_erik_buff_row + ". Radu** o +50%!");
        if (typeof callback === "function") callback(); return;
    }

    var modal = document.createElement("div"); modal.className = "custom-notify-overlay"; modal.style.zIndex = "999999";
    // Odstránené klikanie mimo - hráč MUSÍ vybrať alebo počkať na vypršanie
    modal.innerHTML = '<div class="custom-notify-box"><h3 class="custom-notify-title">📢 ERIK - VOĽBA RADU (+50%)</h3><p style="color:#ccc; font-size:0.9em; margin-bottom:10px;">Čas na výber: <strong id="erik-timer" style="color:#ff4d4d; font-size:1.2em;">10</strong> s</p><div style="display:flex; gap:8px; justify-content:center; margin-top:15px;"><button onclick="zvolErikRow(1)" class="btn-dev-action" style="background:#3b2d1d; color:#ffcc00; padding:10px; border:1px solid #d4af37; border-radius:6px; font-weight:bold; cursor:pointer;">1. Muži</button><button onclick="zvolErikRow(2)" class="btn-dev-action" style="background:#3b2d1d; color:#ffcc00; padding:10px; border:1px solid #d4af37; border-radius:6px; font-weight:bold; cursor:pointer;">2. Ženy</button><button onclick="zvolErikRow(3)" class="btn-dev-action" style="background:#3b2d1d; color:#ffcc00; padding:10px; border:1px solid #d4af37; border-radius:6px; font-weight:bold; cursor:pointer;">3. Zvieratá</button></div></div>';
    document.body.appendChild(modal);

    var timeLeft = 10;
    var erikInterval = setInterval(function() {
        timeLeft--;
        var tEl = document.getElementById("erik-timer");
        if (tEl) tEl.innerText = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(erikInterval);
            if (document.body.contains(modal)) {
                // Automatická voľba 1. radu ak hráč zaspal / spadol mu net
                window.zvolErikRow(1, true);
            }
        }
    }, 1000);

    window.zvolErikRow = function(r, isAuto) {
        blokujVykladanie = false;
        clearInterval(erikInterval);
        if (pNum === 1) p1_erik_buff_row = r; else p2_erik_buff_row = r;
        if (modal && document.body.contains(modal)) modal.remove(); 
        
        var msg = isAuto ? "Čas vypršal! Automaticky posilnený **1. Rad** o +50%." : "Posilnil si **" + r + ". Rad** o +50%!";
        ukazOznamenie(isAuto ? "⏱️ ČAS VYPRŠAL" : "📢 ERIK AKTIVOVANÝ", msg);
        
        if (typeof callback === "function") callback();
    };
}

// =====================================================================
// [SEKCIA 6 - JS] ZÁPAS, MULLIGAN A UMELÁ INTELIGENCIA
// =====================================================================
function spustitZapasLokálnePVP() { 
    if (inventar.zostava.length < 28) { 
        ukazOznamenie("⚠️ NEÚPLNÁ ZOSTRAVA", "Tvoja zostava má iba " + inventar.zostava.length + "/28 kariet. Doplň si balíček!"); 
        otvoriťDeckbuilder(); 
        return; 
    }
    jeSingleplayer = false; inicializujNovyZapas(); 
}

function zobraziťMenuAI() { 
    if (inventar.zostava.length < 28) { 
        ukazOznamenie("⚠️ NEÚPLNÁ ZOSTRAVA", "Tvoja zostava má iba " + inventar.zostava.length + "/28 kariet. Doplň si balíček!"); 
        otvoriťDeckbuilder(); 
        return; 
    }
    
    var obt = prompt("Vyber obtiažnosť bota:\n1 = Ľahká\n2 = Stredná\n3 = Ťažká", "2"); 
    if (obt) {
        if (obt === "1") obtiaznostAI = "Ľahká";
        else if (obt === "3") obtiaznostAI = "Ťažká";
        else obtiaznostAI = "Stredná"; // Ak zadá 2, alebo napíše nejaký preklep, dáme mu strednú
        
        spustitZapasProtiAI(); 
    } 
}

function spustitZapasProtiAI() { 
    if (inventar.zostava.length < 28) { 
        ukazOznamenie("⚠️ NEÚPLNÁ ZOSTRAVA", "Tvoja zostava má iba " + inventar.zostava.length + "/28 kariet. Doplň si balíček!"); 
        otvoriťDeckbuilder(); 
        return; 
    }
    jeSingleplayer = true; inicializujNovyZapas(); 
}

var cisloKola = 1;

function inicializujNovyZapas() {
    p1_pouzite_predmety = [];
    p1_played_cards = []; p2_played_cards = []; p1_spalene = []; p2_spalene = [];p1_cakaren = [];
    p2_cakaren = []; odhodene_karty_kola = [];p1_celkove_karty_zapasu = [];
    neutralne_vplyvy = []; p1_erik_buff_row = null; p2_erik_buff_row = null;
    r1 = 0; r2 = 0; sc1 = 0; sc2 = 0; p1Pass = false; p2Pass = false;
    zapasSkoncilVlajka = false;
    p1MulliganRound1Bonus = 0; p2MulliganRound1Bonus = 0; blokujVykladanie = false;
    
    cisloKola = 1;
    aktualnyHrac = (Math.random() < 0.5) ? 1 : 2; 

    p1_active_deck = pripravBalicekPreZapas(1); p2_active_deck = pripravBalicekPreZapas(2);
    p1_draft_hand = vytiahniRukuZRozdanehoBalicka(1); p2_draft_hand = vytiahniRukuZRozdanehoBalicka(2);

    zobraziťObrazovku("hracia-plocha"); vykresliHraciuPlochu(); otvorMulliganModal();
}

function otvorMulliganModal() {
    mulliganSelectedIndices = []; var modal = document.createElement("div"); modal.id = "mulligan-modal-overlay"; modal.className = "card-modal"; modal.style.zIndex = "99999";
    var cardsHtml = "";
    p1_draft_hand.forEach(function(c, idx) { var reg = getRegistryCard(c.n); cardsHtml += '<div id="mull-card-' + idx + '" class="karta cls-' + (reg.isPlatinum ? "PLATINUM" : c.cls) + '" onclick="prepniVyberMulliganKarty(' + idx + ')" style="cursor:pointer;">' + vytvorHTMLKarty(c.n, getRealPower(c), c.cls, reg.row, reg.p, false) + '</div>'; });
    modal.innerHTML = '<div class="modal-content" style="max-width:1200px; text-align:center;"><h2 style="color:#d4af37; margin-top:0;">🃏 CIELENÝ MULLIGAN</h2><p>Vyber 0 až 2 karty na výmenu. Súper získa +5b náskok v 1. kole!</p><div id="mulligan-cards-container" style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin:20px 0;">' + cardsHtml + '</div><div style="display:flex; gap:15px; justify-content:center;"><button onclick="potvrditMulliganAkciu(false)" style="background:#10b981; color:#fff; border:none; padding:12px 28px; border-radius:6px; font-weight:bold; cursor:pointer;">✅ Ponechať ruku</button><button onclick="potvrditMulliganAkciu(true)" style="background:#8b0000; color:#fff; border:1px solid #ff4d4d; padding:12px 28px; border-radius:6px; font-weight:bold; cursor:pointer;">🎲 Vymeniť vybrané</button></div></div>';
    document.body.appendChild(modal);
}

function prepniVyberMulliganKarty(idx) {
    var cardEl = document.getElementById("mull-card-" + idx); var pos = mulliganSelectedIndices.indexOf(idx);
    if (pos !== -1) { mulliganSelectedIndices.splice(pos, 1); if (cardEl) cardEl.classList.remove("karta-selected-mulligan"); }
    else { if (mulliganSelectedIndices.length >= 2) { ukazOznamenie("⚠️ MULLIGAN LIMIT", "Môžeš vymeniť maximálne 2 karty!"); return; } mulliganSelectedIndices.push(idx); if (cardEl) cardEl.classList.add("karta-selected-mulligan"); }
}

function potvrditMulliganAkciu(chceVymenu) {
    var el = document.getElementById("mulligan-modal-overlay"); 
    if (!el) return;
    el.remove();
    
    if (chceVymenu && mulliganSelectedIndices.length > 0) {
        mulliganSelectedIndices.sort(function(a, b) { return b - a; }); 
        var pocetVymen = mulliganSelectedIndices.length;
        
        // 1. Zoberieme karty z ruky a dočasne si ich uložíme
        var odlozeneKarty = [];
        mulliganSelectedIndices.forEach(function(idx) { 
            var vyhodenaKarta = p1_draft_hand.splice(idx, 1)[0];
            odlozeneKarty.push(vyhodenaKarta.n); // Uložíme si len jej meno
        });

        // 2. Potiahneme si z vrchu balíčka nové karty
        for (var i = 0; i < pocetVymen; i++) { 
            if (p1_active_deck.length > 0) { 
                var nK = p1_active_deck.pop(); 
                var cardCls = "F";
                if (inventar.karty[nK]) {
                    var regItem = getRegistryCard(nK);
                    if (regItem.isPlatinum) cardCls = "PLATINUM";
                    else if (regItem.isTournamentUnique) cardCls = inventar.karty[nK].aktivnaTrieda || "F";
                    else if (inventar.karty[nK].zvolenaTrieda) cardCls = inventar.karty[nK].zvolenaTrieda;
                    else if (inventar.karty[nK].repliky) {
                        var rep = inventar.karty[nK].repliky;
                        if (rep["S"] > 0) cardCls = "S"; else if (rep["A"] > 0) cardCls = "A"; else if (rep["B"] > 0) cardCls = "B"; else if (rep["C"] > 0) cardCls = "C"; else if (rep["D"] > 0) cardCls = "D"; else if (rep["E"] > 0) cardCls = "E";
                    }
                }
                p1_draft_hand.push({ n: nK, cls: cardCls }); 
            } 
        }

        // 3. Vrátime tie pôvodné odložené karty na spodok nášho balíčka!
        odlozeneKarty.forEach(function(kartaMeno) {
            p1_active_deck.unshift(kartaMeno); // unshift ich zasunie úplne na dno
        });

        p2MulliganRound1Bonus = (pocetVymen === 1) ? 2 : 5; 
        ukazOznamenie("🎲 MULLIGAN DOKONČENÝ", "Vymenil si " + pocetVymen + " kariet! Karty boli vrátené do balíčka. Súper získal +" + p2MulliganRound1Bonus + "b náskok v 1. kole.");
    } else { 
        ukazOznamenie("✅ RUKA POTVRDENÁ", "Ponechal si si pôvodnú ruku."); 
    }

    if (jeSingleplayer) {
        setTimeout(function() {
        vykresliHraciuPlochu();
        setTimeout(spravujAI, 800);
        }, 400);
    } else {
        vykresliHraciuPlochu();
    }
}

function vykresliStol() {
    for (var r = 1; r <= 3; r++) { var el1 = document.getElementById("p1-row" + r); var el2 = document.getElementById("p2-row" + r); if (el1) el1.innerHTML = ""; if (el2) el2.innerHTML = ""; }
    var neutralEl = document.getElementById("neutral-row");
    if (neutralEl) {
        neutralEl.innerHTML = '<span class="row-label-neutral">⚡ Neutrálne Kúzla Stola ⚡</span>';
        neutralne_vplyvy.forEach(function(spellObj) { 
            var div = document.createElement("div"); 
            div.className = "karta cls-" + (spellObj.cls || "F"); 
            div.innerHTML = vytvorHTMLKarty(spellObj.n, "none", spellObj.cls || "F", 0, 0, false); 
            neutralEl.appendChild(div); 
        });
    }
    p1_played_cards.forEach(function(c) {
        var reg = getRegistryCard(c.n); var tRow = document.getElementById("p1-row" + reg.row);
        if (tRow) { var div = document.createElement("div"); div.className = "karta cls-" + (reg.isPlatinum ? "PLATINUM" : (c.cls || "F")); div.innerHTML = vytvorHTMLKarty(c.n, vypocitajDynamickuSiluJednejKarty(c, 1), c.cls || "F", reg.row, reg.p, false); tRow.appendChild(div); }
    });
    p2_played_cards.forEach(function(c) {
        var reg = getRegistryCard(c.n); var tRow = document.getElementById("p2-row" + reg.row);
        if (tRow) { var div = document.createElement("div"); div.className = "karta cls-" + (reg.isPlatinum ? "PLATINUM" : (c.cls || "F")); div.innerHTML = vytvorHTMLKarty(c.n, vypocitajDynamickuSiluJednejKarty(c, 2), c.cls || "F", reg.row, reg.p, false); tRow.appendChild(div); }
    });
}

function aktualizujSpaleniskoUI() {
    var el1 = document.getElementById("p1-grave-count");
    var el2 = document.getElementById("p2-grave-count");
    if (el1) el1.innerText = p1_spalene.length;
    if (el2) el2.innerText = p2_spalene.length;
}

function vykresliHraciuPlochu() { 
    prepočitajSkoreStola(); 
    aktualizujKolaUI(); 
    vykresliStol(); 
    vykresliRukuHraca(1); 
    vykresliRukuHraca(2); 
    aktualizujSpaleniskoUI(); 
}
function aktualizujKolaUI() {
    var el1 = document.getElementById("p1-rounds");
    var el2 = document.getElementById("p2-rounds");
    if (el1) el1.innerText = "🔴".repeat(r1) || "⚪";
    if (el2) el2.innerText = "🔴".repeat(r2) || "⚪";
}

function vylozitKartuZRuky(pNum, cardIndex) {
    if (blokujVykladanie || pNum !== aktualnyHrac) return;
    var hand = (pNum === 1) ? p1_draft_hand : p2_draft_hand; 
    var myPlayed = (pNum === 1) ? p1_played_cards : p2_played_cards; 
    var oppPlayed = (pNum === 1) ? p2_played_cards : p1_played_cards;
    
    if (!hand || cardIndex < 0 || cardIndex >= hand.length) return;
    var card = hand.splice(cardIndex, 1)[0]; if (!card) return; var reg = getRegistryCard(card.n);

    if (reg.isPrizrak) { ukazOznamenie("⚠️ PRÍZRAK", "S Prízrakom sa nedá hrať v zápase!"); hand.splice(cardIndex, 0, card); return; }
    
    if (reg.isSpy) {
        oppPlayed.push(card); 
        tahatNoveKartyZBalicka(pNum, 2);
    } else if (reg.isSpell) {
        if (card.n === "Šicko v porádku") { 
    // PRELEJEME VŠETKY KÚZLA DO ARCHÍVU PRED ICH ZMAZANÍM
            odhodene_karty_kola = odhodene_karty_kola.concat(neutralne_vplyvy); 
            neutralne_vplyvy = []; 
            odhodene_karty_kola.push(card); 
} 
        else { neutralne_vplyvy.push({ n: card.n, cls: card.cls || "F", owner: pNum }); }
    } else {
        myPlayed.push(card);
        if (reg.isItem && pNum === 1) { p1_pouzite_predmety.push(card.cls || "F"); }
    }
    
    if (card.n === "Erik") {
        otvorErikBuffDialog(pNum, function() { vykresliHraciuPlochu(); pokracujPoVylozeni(pNum); });
        return; 
    }
    if (card.n === "Zatúlaný tatranský medveď" || card.n === "Jakub" || card.n === "Marek") {
        vykonajAutoSpalenie(card.n); 
    }
    if (card.n === "Sestrička" || card.n === "Doktor" || card.n === "Kornélia") {
        vykonajOzivenieZArchivu(pNum);
        return; 
    }

    vykresliHraciuPlochu(); pokracujPoVylozeni(pNum);
}

function pokracujPoVylozeni(pNum) {
    prepniHracov();
}

function vykonajAutoSpalenie(pôvodcaMeno) {
    var vsetkyKartyStola = [];
    p1_played_cards.forEach(function(c) { if (c.n !== pôvodcaMeno && c.n !== "Oli") vsetkyKartyStola.push({ karta: c, majitel: 1 }); });
    p2_played_cards.forEach(function(c) { if (c.n !== pôvodcaMeno && c.n !== "Oli") vsetkyKartyStola.push({ karta: c, majitel: 2 }); });
    
    if (vsetkyKartyStola.length === 0) return;
    
    var maxPwr = -1; 
    var cieleNaSpalenie = [];
    
    // 1. FÁZA ZAMERANIA: Iba si zapíšeme do zoznamu, kto zomrie (Nikto sa zatiaľ neničí)
    vsetkyKartyStola.forEach(function(zaznam) { 
        var dynPwr = vypocitajDynamickuSiluJednejKarty(zaznam.karta, zaznam.majitel); 
        if (dynPwr !== "none") {
            if (dynPwr > maxPwr) {
                maxPwr = dynPwr;
                cieleNaSpalenie = [zaznam.karta];
            } else if (dynPwr === maxPwr) {
                cieleNaSpalenie.push(zaznam.karta);
            }
        }
    });
    
    if (maxPwr <= 0) return;

    // 2. FÁZA POPRAVY: Teraz už len bezpečne odstránime všetky zamerané ciele naraz
    p1_played_cards = p1_played_cards.filter(function(c) { 
        if (cieleNaSpalenie.includes(c)) { p1_cakaren.push(c); return false; } 
        return true; 
    });
    
    p2_played_cards = p2_played_cards.filter(function(c) { 
        if (cieleNaSpalenie.includes(c)) { p2_cakaren.push(c); return false; } 
        return true; 
    });
}


function otvorSpalenisko(pNum, isReviving) {
    var arch = (pNum === 1) ? p1_spalene : p2_spalene;
    var modal = document.getElementById("graveyard-modal");
    var container = document.getElementById("graveyard-container");
    var subtitle = document.getElementById("graveyard-subtitle");
    if (!modal || !container) return;

    if (arch.length === 0) {
        ukazOznamenie("🔥 PRÁZDNY ARCHÍV", "V ohni sa nenachádzajú žiadne karty.");
        if (isReviving) { vykresliHraciuPlochu(); pokracujPoVylozeni(pNum); }
        return;
    }

    container.innerHTML = "";
    subtitle.innerHTML = isReviving ? "Vyber kartu, ktorú chceš oživiť z plameňov! <br><strong id='revive-timer' style='color:#ff4d4d; font-size:1.2em;'>10</strong> s (alebo zavri okno pre zrušenie)" : "Zoznam kariet, ktoré zhoreli v plameňoch.";
    subtitle.style.color = isReviving ? "#10b981" : "#ccc";

    if (window.reviveInterval) clearInterval(window.reviveInterval);
    var closeBtn = modal.querySelector(".card-modal-close");

    if (isReviving && pNum === 1) {
        // Ochrana krížika a kliknutia mimo okna - bezpečne zrušia oživovanie a odovzdajú ťah
        modal.onclick = function(e) { if(e.target === modal) window.zrusOzivovanie(pNum); };
        if (closeBtn) closeBtn.onclick = function() { window.zrusOzivovanie(pNum); };

        var timeLeft = 10;
        window.reviveInterval = setInterval(function() {
            timeLeft--;
            var tEl = document.getElementById("revive-timer");
            if (tEl) tEl.innerText = timeLeft;
            
            if (timeLeft <= 0) {
                ukazOznamenie("⏱️ ČAS VYPRŠAL", "Nestihol si oživiť žiadnu kartu.");
                window.zrusOzivovanie(pNum);
            }
        }, 1000);
    } else {
        // Obyčajné prezeranie spáleniska - krížik okno len zavrie (žiadna strata ťahu)
        modal.onclick = function(e) { if(e.target === modal) modal.style.display='none'; };
        if (closeBtn) closeBtn.onclick = function() { modal.style.display='none'; };
    }

    window.zrusOzivovanie = function(hracNum) {
        if (window.reviveInterval) clearInterval(window.reviveInterval);
        var m = document.getElementById("graveyard-modal");
        if (m) m.style.display = "none";
        blokujVykladanie = false; // 🔓 ODOMKNUTIE STOLA PRI ZRUŠENÍ
        vykresliHraciuPlochu();
        pokracujPoVylozeni(hracNum);
    };

    arch.forEach(function(c, idx) {
        var reg = getRegistryCard(c.n);
        var cardDiv = document.createElement("div");
        cardDiv.className = "karta-karta-wrapper";
        cardDiv.style.border = isReviving && pNum === 1 ? "2px solid #10b981" : "1px solid #4a3d2e";
        cardDiv.style.cursor = isReviving && pNum === 1 ? "pointer" : "default";
        
        var innerCard = document.createElement("div");
        innerCard.className = "karta cls-" + (reg.isPlatinum ? "PLATINUM" : (c.cls || "F"));
        innerCard.innerHTML = vytvorHTMLKarty(c.n, getRealPower(c), c.cls || "F", reg.row, reg.p, false);
        cardDiv.appendChild(innerCard);

        if (isReviving && pNum === 1) {
            cardDiv.onclick = function() { potvrdOzivenieKarty(pNum, idx); modal.style.display = "none"; };
        }
        container.appendChild(cardDiv);
    });

    modal.style.display = "flex";

    if (isReviving && pNum === 2 && jeSingleplayer) {
        setTimeout(function() {
            var bestIdx = 0; var maxPwr = -1;
            arch.forEach(function(c, i) { var p = getRealPower(c); if (p > maxPwr) { maxPwr = p; bestIdx = i; } });
            potvrdOzivenieKarty(2, bestIdx);
            modal.style.display = "none";
        }, 1200);
    }
}

function potvrdOzivenieKarty(pNum, index) {
    // 🛡️ Poistka proti spam-kliku (ak už modal mizne, ignorujeme)
    var modal = document.getElementById("graveyard-modal");
    if (!modal || modal.style.display === "none") return;
    modal.style.display = "none";

    if (window.reviveInterval) clearInterval(window.reviveInterval); 
    var arch = (pNum === 1) ? p1_spalene : p2_spalene;
    var myPlayed = (pNum === 1) ? p1_played_cards : p2_played_cards;
    var oppPlayed = (pNum === 1) ? p2_played_cards : p1_played_cards;
    var oživenaKarta = arch.splice(index, 1)[0];
    
    if (oživenaKarta) {
        var reg = getRegistryCard(oživenaKarta.n);
        if (reg.isSpy) { oppPlayed.push(oživenaKarta); tahatNoveKartyZBalicka(pNum, 2); } 
        else { myPlayed.push(oživenaKarta); }
        
        ukazOznamenie("🕊️ OŽIVENIE Z OHŇA!", "Z plameňov sa vrátila karta <strong>" + oživenaKarta.n + "</strong>!", function() {
            if (oživenaKarta.n === "Erik") {
                otvorErikBuffDialog(pNum, function() { vykresliHraciuPlochu(); pokracujPoVylozeni(pNum); });
                return; 
            }
            if (oživenaKarta.n === "Zatúlaný tatranský medveď" || oživenaKarta.n === "Jakub" || oživenaKarta.n === "Marek") {
                vykonajAutoSpalenie(oživenaKarta.n);
            }
            if (oživenaKarta.n === "Sestrička" || oživenaKarta.n === "Doktor" || oživenaKarta.n === "Kornélia") {
                vykonajOzivenieZArchivu(pNum);
                return; 
            }
            
            blokujVykladanie = false; // 🔓 ODOMKNUTIE STOLA PO OŽIVENÍ
            vykresliHraciuPlochu(); pokracujPoVylozeni(pNum);
        });
    } else {
        blokujVykladanie = false; // 🔓 ODOMKNUTIE STOLA
        vykresliHraciuPlochu(); pokracujPoVylozeni(pNum);
    }
}

function vykonajOzivenieZArchivu(pNum) {
    var arch = (pNum === 1) ? p1_spalene : p2_spalene;
    if (arch.length === 0) {
        ukazOznamenie("🏥 PRÁZDNY ARCHÍV OHŇA", "V tvojom archíve nie je žiadna jednotka na oživenie!", function() {
            vykresliHraciuPlochu(); pokracujPoVylozeni(pNum);
        });
        return;
    }
    blokujVykladanie = true; // 🔒 OCHRANA PRED FANTÓMOVOU RUKOU
    otvorSpalenisko(pNum, true);
}

function hracPassuje(pNum) {
    if (blokujVykladanie || pNum !== aktualnyHrac) return; // 🛡️ Zabraňuje passnúť, ak nie si na ťahu alebo beží animácia!
    if (pNum === 1) p1Pass = true; if (pNum === 2) p2Pass = true;
    if (p1Pass && p2Pass) skontrolujKoniecKola(); else prepniHracov();
}

function prepniHracov() {
    if (p1Pass && !p2Pass) aktualnyHrac = 2; else if (p2Pass && !p1Pass) aktualnyHrac = 1; else aktualnyHrac = (aktualnyHrac === 1) ? 2 : 1;
    vykresliHraciuPlochu(); spravujAI();
}

function spravujAI() { if (jeSingleplayer && aktualnyHrac === 2 && !p2Pass && !blokujVykladanie) setTimeout(vykonajTachAI, 1200); }

// --- DVOJVRSTVOVÝ MOZOG UMELEJ INTELIGENCIE ---

// =========================================================================
// --- DVOJVRSTVOVÝ MOZOG UMELEJ INTELIGENCIE (V3.0) ---
// =========================================================================

function vykonajTachAI() {
    if (p2Pass || blokujVykladanie) return;
    if (!p2_draft_hand || p2_draft_hand.length === 0) { hracPassuje(2); return; }

    var jeFinale = (r1 === 1 && r2 === 1);
    var aiMusiVyhrat = (r1 === 1 && r2 === 0);
    var hracMusiVyhrat = (r1 === 0 && r2 === 1);
    var rozdielKariet = p2_draft_hand.length - p1_draft_hand.length; // Kladné číslo = AI má viac kariet

    // =========================================================================
    // 1. VRSTVA: ŽELEZNÉ PRAVIDLÁ (Záchranné brzdy - Pud sebazáchovy)
    // =========================================================================
    
    if (p1Pass) {
        // Hráč passol a AI má viac bodov -> Výhra je vo vrecku, netreba míňať karty.
        if (sc2 > sc1) { hracPassuje(2); return; }
        
        // Hráč passol, AI prehráva. Oplatí sa to dobiehať?
        if (!aiMusiVyhrat && !jeFinale) {
            // Ak AI prehráva o viac ako 20 bodov, vzdá to, aby si ušetrilo karty na ďalšie kolá.
            if (sc1 > (sc2 + 20)) { hracPassuje(2); return; }
        }
    } else {
        // Hráč EŠTE HRÁ.
        
        // ZÁCHRANA RUKY 1: Ak AI prehráva o 20+ bodov v 1. kole, radšej utečie.
        if (!aiMusiVyhrat && !jeFinale && sc1 > (sc2 + 20)) { hracPassuje(2); return; }
        
        // ZÁCHRANA RUKY 2: Ochrana výhody (Card Advantage). 
        // Ak má AI o 2 karty menej ako hráč a nie je to finále, okamžite passuje.
        if (!aiMusiVyhrat && !jeFinale && rozdielKariet <= -2) {
            hracPassuje(2); return; 
        }

        // TAKTIKA 2. KOLA (Bleeding a Dry Pass) - Ak AI vyhralo 1. kolo:
        if (hracMusiVyhrat && !jeFinale) {
            if (obtiaznostAI === "Ťažká" || obtiaznostAI === "Stredná") {
                // Akonáhle má hráč viac kariet, alebo odskočil o 10 bodov, AI sa stiahne a šetrí na finále.
                if (rozdielKariet < 0 || sc1 > (sc2 + 10)) {
                    hracPassuje(2); return;
                }
            } else if (obtiaznostAI === "Ľahká") {
                // Ľahký bot hrá férovo, ale nesmie si zničiť ruku. Ak stráca karty a prehráva, vzdá to.
                if (rozdielKariet < 0 && sc1 > sc2) {
                    hracPassuje(2); return;
                }
            }
        }
    }

    // =========================================================================
    // 2. VRSTVA: MATEMATICKÝ SKÓROVACÍ SYSTÉM (Výber najlepšieho ťahu)
    // =========================================================================
    var najlepsiaKartaIdx = -1;
    var najvyssieSkore = -9999;
    
    p2_draft_hand.forEach(function(karta, index) {
        var skore = ohodnotKrokAI(karta, obtiaznostAI, jeFinale, hracMusiVyhrat);
        
        if (skore > najvyssieSkore || (skore === najvyssieSkore && Math.random() > 0.5)) {
            najvyssieSkore = skore;
            najlepsiaKartaIdx = index;
        }
    });

    // POSLEDNÁ POISTKA: Ak je najlepšia možná karta pre AI vyložene zlá (napr. mínusové skóre) 
    // a AI nemusí hrať za každú cenu, radšej passne.
    if (najvyssieSkore < 0 && !aiMusiVyhrat && !jeFinale && !p1Pass) {
        hracPassuje(2); return;
    }

    // Vyložíme víťaznú kartu, ktorú mozog vybral
    vylozitKartuZRuky(2, najlepsiaKartaIdx);
}

// --- POMOCNÁ FUNKCIA: KALKULAČKA HODNOTY ŤAHU ---
function ohodnotKrokAI(karta, obtiaznost, jeFinale, hracMusiVyhrat) {
    var reg = getRegistryCard(karta.n);
    var skore = 0;
    
    // 1. ZÁKLADNÁ MATEMATIKA (Akú hodnotu má táto karta práve teraz?)
    if (reg.isSpell) {
        if (karta.n === "Šicko v porádku") {
            skore = neutralne_vplyvy.length * 8; 
        } else {
            var cielovyRad = (karta.n === "Upokoj sa") ? 2 : (karta.n === "Ohňostroj" ? 3 : 1);
            var mojaSilaPred = 0, superSilaPred = 0, mojPocet = 0, superPocet = 0;
            
            p2_played_cards.forEach(function(c) { if(getRegistryCard(c.n).row===cielovyRad) { mojaSilaPred += getRealPower(c); mojPocet++; }});
            p1_played_cards.forEach(function(c) { if(getRegistryCard(c.n).row===cielovyRad) { superSilaPred += getRealPower(c); superPocet++; }});
            
            // Kúzlo zrazí všetky karty na 1 bod
            var zniceneSuperovi = superSilaPred - superPocet;
            var zniceneMne = mojaSilaPred - mojPocet;
            skore = zniceneSuperovi - zniceneMne; // Čistý zisk bodov pre AI
        }
    } else if (reg.isItem) {
        var mojPocet = p2_played_cards.filter(function(c) { return getRegistryCard(c.n).row === reg.row; }).length;
        skore = mojPocet * CLASS_CONFIG[karta.cls || "F"].itemBonus;
        if (mojPocet === 0) skore = -10; // Klátať predmet na prázdny rad je hlúposť
    } else {
        skore = vypocitajDynamickuSiluJednejKarty(karta, 2);
    }

    // 2. TAKTICKÁ ÚPRAVA PODĽA OBTIAŽNOSTI (Kedy kartu reálne zahrať?)
    if (obtiaznost === "Ťažká") { 
        // ŠACHISTA
        if (hracMusiVyhrat && !jeFinale) {
            // Bleeding: V 2. kole chce zahrať tie NAJSLABŠIE karty (F-Class), aby si šetril silné
            if (!reg.isSpell && !reg.isItem) {
                skore = 50 - skore; // Obrátená logika - čím slabšia karta, tým má lepšie skóre
            } else {
                skore = -100; // Zakazuje hrať kúzla v "oddychovom" 2. kole
            }
        } else {
            // Normálna hra: Svojimi najlepšími kúzlami šetrí na drvivý úder (>15 bodov)
            if (reg.isSpell && skore < 15) skore -= 50; 
        }
    } 
    else if (obtiaznost === "Stredná") { 
        // POKROČILÝ TAKTIK
        if (hracMusiVyhrat && !jeFinale) {
            // Mierny bleeding: Hrá normálne karty, ale zakážeme mu míňať kúzla
            if (reg.isSpell || reg.isItem) skore -= 20; 
        } else {
            // Kúzla čaká na aspoň 8-bodový profit
            if (reg.isSpell && skore < 8) skore -= 20;
        }
    } 
    else if (obtiaznost === "Ľahká") { 
        // SNAŽIVÝ AMATÉR (Nedočkavec)
        // Akonáhle mu kúzlo hodí aspoň drobný profit (>3 body), okamžite ho pálí. Nečaká.
        if (reg.isSpell && skore > 3) skore += 15;
    }

    return skore;
}

function skontrolujKoniecKola() {
    prepočitajSkoreStola(); blokujVykladanie = true;
    var textVysledku = "";
    poslednyVitazKola = 0; // Resetujeme pred vyhodnotením
    
    if (sc1 > sc2) { r1++; poslednyVitazKola = 1; textVysledku = "Tvoja výhra (" + sc1 + " : " + sc2 + ")"; } 
    else if (sc2 > sc1) { r2++; poslednyVitazKola = 2; textVysledku = "Súper vyhral (" + sc2 + " : " + sc1 + ")"; } 
    else { r1++; r2++; textVysledku = "Remíza, obaja majú korunku (" + sc1 + " : " + sc2 + ")"; }
    
    p1MulliganRound1Bonus = 0; p2MulliganRound1Bonus = 0;
    aktualizujKolaUI();
    
    ukazOznamenie("🏁 KONIEC KOLA", textVysledku, function() {
        if (r1 >= 2 || r2 >= 2) vyhodnotKoniecZapasu(); else pripravNoveKolo();
    });
}

function pripravNoveKolo() {
    // 🛡️ OPRAVA: Triedička! Bojové jednotky idú do hrobu (dajú sa oživiť), predmety a kúzla letia nenávratne preč.
    var jednotkyP1 = [], veciP1 = [];
    p1_played_cards.concat(p1_cakaren).forEach(function(c) {
        var reg = getRegistryCard(c.n);
        if (reg.isItem || reg.isSpell) veciP1.push(c); else jednotkyP1.push(c);
    });
    
    var jednotkyP2 = [], veciP2 = [];
    p2_played_cards.concat(p2_cakaren).forEach(function(c) {
        var reg = getRegistryCard(c.n);
        if (reg.isItem || reg.isSpell) veciP2.push(c); else jednotkyP2.push(c);
    });

    // 💀 OČISTEC A BOJISKO SA PRESÚVAJÚ DO HROBU (Už iba čisté bojové jednotky!)
    p1_spalene = p1_spalene.concat(jednotkyP1);
    p2_spalene = p2_spalene.concat(jednotkyP2);
    
    // 🗑️ Záchrana odhodených kariet (Teraz tam idú bezpečne všetky predmety a zvyšné kúzla stola)
    odhodene_karty_kola = odhodene_karty_kola.concat(veciP1).concat(veciP2).concat(neutralne_vplyvy);
    
    // 🔮 Extrahujeme hráčove kúzla z neutrálneho radu, aby za ne dostal XP a mince!
    var mojeKuzlaKola = neutralne_vplyvy.filter(function(spell) { return spell.owner === 1; });
    var superoveKuzlaKola = neutralne_vplyvy.filter(function(spell) { return spell.owner === 2; });
    
    // 💰 EKONOMIKA: Uložíme do histórie zápasu preživších, mŕtvych z čakárne aj kúzla! (Aby boli na konci odmeny)
    p1_celkove_karty_zapasu = p1_celkove_karty_zapasu.concat(p1_played_cards).concat(p1_cakaren).concat(mojeKuzlaKola);
    
    // 🧹 Bezpečné vyčistenie hracej plochy a čakárne pre nové kolo
    p1_played_cards = []; 
    p2_played_cards = []; 
    p1_cakaren = []; 
    p2_cakaren = []; 
    
    neutralne_vplyvy = []; 
    p1_erik_buff_row = null; 
    p2_erik_buff_row = null;
    p1Pass = false; 
    p2Pass = false; 
    blokujVykladanie = false;
    
    cisloKola++;
    if (cisloKola === 2) aktualnyHrac = 2;
    else if (cisloKola === 3) aktualnyHrac = 1;
    
    // 💡 Ťahá si IBA víťaz, a to presne 1 kartu (Ak je remíza, neťahá nikto)
    if (poslednyVitazKola === 1) tahatNoveKartyZBalicka(1, 1);
    else if (poslednyVitazKola === 2) tahatNoveKartyZBalicka(2, 1);
    
    vykresliHraciuPlochu();
    setTimeout(spravujAI, 1000);
}

// =====================================================================
// [SEKCIA 7 - JS] INICIALIZÁCIA A EXPORT FUNKCIÍ DO HTML
// =====================================================================
function prepniZvuk() {
    var audio = document.getElementById("bg-music"); var btn = document.getElementById("mute-btn"); if (!audio) return;
    if (audio.paused) { audio.play().catch(function(){}); hudbaSpustena = true; audioMutedByUser = false; if (btn) btn.innerText = "🔊"; }
    else { audio.pause(); audioMutedByUser = true; if (btn) btn.innerText = "🔇"; }
}
function pozastavitHudbuPreVideo() { var audio = document.getElementById("bg-music"); if (audio && !audio.paused) audio.pause(); }
function obnovitHudbuPoVideu() { var audio = document.getElementById("bg-music"); if (audio && audio.paused && hudbaSpustena && !audioMutedByUser) audio.play().catch(function(e) {}); }
function prehratDalsiSong() {
    var audio = document.getElementById("bg-music"); if (!audio) return; var novyIndex;
    do { novyIndex = Math.floor(Math.random() * audioTracks.length); } while (novyIndex === currentTrackIndex && audioTracks.length > 1);
    currentTrackIndex = novyIndex; audio.src = audioTracks[currentTrackIndex];
    if (!audioMutedByUser) audio.play().then(function() { hudbaSpustena = true; }).catch(function(e) {});
    audio.onended = function() { prehratDalsiSong(); };
}
function spustitHudbuPoPrvomKliknuti() { if (!hudbaSpustena && !audioMutedByUser) prehratDalsiSong(); }
function upravHlasitost(val) { var audio = document.getElementById("bg-music"); if (audio) audio.volume = val; }

function otvoriťNavodHry() {
    var modal = document.getElementById("navod-modal");
    if (!modal) { modal = document.createElement("div"); modal.id = "navod-modal"; modal.className = "card-modal"; modal.onclick = function() { modal.style.display = "none"; }; document.body.appendChild(modal); }
    
    // ZMENA: Návod má teraz 6 strán (namiesto 5)
    modal.innerHTML = '<div class="modal-content modal-bg-duha" style="max-width:1150px; height:90vh; display:flex; flex-direction:column; position:relative;" onclick="event.stopPropagation()"><span class="card-modal-close" onclick="document.getElementById(\'navod-modal\').style.display=\'none\'">&times;</span><div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #5a4d3e; padding-bottom:10px; margin-bottom:15px;"><h2 style="color:#d4af37; margin:0; font-size:1.6em; font-family:serif;">📖 KRONIKA A NÁVOD KRÁĽOVSTVA (Strana <span id=\'book-page-num\'>1</span> / 6)</h2><div><button onclick="posunStraneKnihy(-1)" style="background:#3b2d1d; color:#ffcc00; border:1px solid #d4af37; padding:6px 14px; border-radius:4px; cursor:pointer; font-weight:bold; margin-right:5px;">◀ Predošlá</button><button onclick="posunStraneKnihy(1)" style="background:#3b2d1d; color:#ffcc00; border:1px solid #d4af37; padding:6px 14px; border-radius:4px; cursor:pointer; font-weight:bold;">Ďalšia ▶</button></div></div><div id="book-content-container" style="flex-grow:1; overflow-y:auto; padding-right:10px;"></div></div>';
    
    modal.style.display = "flex"; aktualnaStranaKnihy = 1; vykresliStraneKnihy();
} // koniec funkcie otvoriťNavodHry

function posunStraneKnihy(delta) { 
    aktualnaStranaKnihy += delta; 
    if (aktualnaStranaKnihy < 1) aktualnaStranaKnihy = 1; 
    // ZMENA: Limit strán posunutý na 6
    if (aktualnaStranaKnihy > 6) aktualnaStranaKnihy = 6; 
    vykresliStraneKnihy(); 
} // koniec funkcie posunStraneKnihy

function vykresliStraneKnihy() {
    var pNum = document.getElementById("book-page-num"); var container = document.getElementById("book-content-container"); if (!pNum || !container) return;
    pNum.innerText = aktualnaStranaKnihy;
    
    if (aktualnaStranaKnihy === 1) {
        container.innerHTML = '<h3 style="color:#ffcc00;">📜 KAPITOLA I: CIEĽ HRY A ZÁPAS</h3><p>Cieľom hry je poraziť súpera získaním 2 víťazných koruniek. Zápas prebieha vykladaním kariet na stôl, čím buduješ svoju celkovú silu. Kolo vyhráva ten, kto má po pasovaní oboch hráčov vyššie skóre.</p><ul style="line-height:1.6;"><li><strong>Mulligan (Výmena kariet):</strong> Na začiatku si môžeš vymeniť 0 až 2 karty. Každá výmena ťa niečo stojí – súper získa výhodu! Za 1 vymenenú kartu dostane +2 body, za 2 karty získa +5 bodov (platí iba v 1. kole).</li><li><strong>Striedanie:</strong> Hru začína náhodne vyžrebovaný hráč. V 2. kole začína druhý hráč a v 3. kole opäť prvý.</li><li><strong>Remízy:</strong> Ak kolo skončí rovnakým skóre, obaja hráči získavajú korunku. Ak nastane celková absolútna remíza (2:2 na korunky), obaja hráči dostanú iba Truhlu účastníka.</li></ul>';
    } else if (aktualnaStranaKnihy === 2) {
        container.innerHTML = '<h3 style="color:#ffcc00;">⚔️ KAPITOLA II: KARTY, SYNERGIE A ZOSTAVA</h3><p>Pred zápasom si musíš poskladať balíček (Zostavu), ktorý musí obsahovať minimálne 28 kariet.</p><ul style="line-height:1.6;"><li><strong>Bojové jednotky:</strong> Patria do špecifických radov (1. rad Muži, 2. rad Ženy, 3. rad Zvieratá). Ich sila rastie vďaka Setovým bonusom (ak máš v rade viac kariet z rovnakej vzácnej triedy). Slabé F-karty (1-4b) ti pri výhre generujú extra mince!</li><li><strong>Predmety (Alkohol, Kvety...):</strong> Tieto karty pridávajú plošný bonus celému radu. Bonus závisí od ich vykovanej vzácnosti (od +1b pri F až po +7b pri S-Class).</li><li><strong>Kúzla stola:</strong> Ukladajú sa do špeciálneho Neutrálneho radu a ovplyvňujú oboch hráčov. Dokážu zraziť silu konkrétnych radov na 1 bod.</li><li><strong>Špióni a Oživovanie:</strong> Niektoré karty sa vykladajú na súperovu stranu stola, za čo získaš potiahnutie 2 nových kariet. Iné dokážu oživiť karty, ktoré boli zničené požiarom z boja.</li></ul>';
    } else if (aktualnaStranaKnihy === 3) {
        container.innerHTML = '<h3 style="color:#ffcc00;">🔨 KAPITOLA III: KOVÁČSKA DIELŇA A ZVITKY</h3><p>V Dielni môžeš zlučovať slabšie karty do silnejších tried (od F po S). Vyššia trieda má väčšiu základnú silu a odomyká silnejšie Setové bonusy na stole.</p><ul style="line-height:1.6;"><li><strong>Kovanie:</strong> Na vylepšenie potrebuješ vždy 3x rovnakú kartu (napr. 3x E-Class na D-Class) + poplatok v minciach + konkrétny remeselný materiál v unciach (oz).</li><li><strong>Prízrak:</strong> Slúži ako univerzálny "žolík". Môžeš ním nahradiť akúkoľvek bežnú kartu v procese kovania (od F po A).</li><li><strong>Riziko zničenia:</strong> S vyššou triedou klesá šanca na úspech. Ak kovanie zlyhá, stratíš suroviny aj jednu z kariet (zhorí)! Preto môžeš použiť <strong>Zvitky ochrany</strong>, ktoré si kúpiš za Zlato. Zvitok nielen zvýši šancu na úspech, ale kartu pri neúspechu ochráni pred zničením.</li></ul>';
    } else if (aktualnaStranaKnihy === 4) {
        container.innerHTML = '<h3 style="color:#ffcc00;">📦 KAPITOLA IV: TRUHLICE A DROP RATE</h3><p>Suroviny a nové karty získavaš otváraním truhlíc po každom zápase.</p><div style="display:flex; gap:15px; margin-top:10px;"><div style="background:rgba(0,0,0,0.5); padding:10px; border-radius:6px; flex:1;"><strong>Truhla Účastníka (Prehra/Remíza)</strong><br>- 50 až 100 mincí<br>- 1x až 3x F-karta<br>- 1 oz Kože (Garantované)<br>- 20 % šanca na Prízrak<br>- 10 % šanca na 1 oz Zlata</div><div style="background:rgba(0,0,0,0.5); padding:10px; border-radius:6px; flex:1; border:1px solid #d4af37;"><strong>Truhla Víťaza (Výhra)</strong><br>- 150 až 300 mincí<br>- 3x až 6x F-karta<br>- Garantované 2 oz až 5 oz Zlata<br>- 60 % šanca na 1x Prízrak<br>- 15 % šanca na 2x Prízrak</div></div>';
    } else if (aktualnaStranaKnihy === 5) {
        container.innerHTML = '<h3 style="color:#ffcc00;">🛒 KAPITOLA V: TRHOVISKO A SIEŇ SLÁVY</h3><p>Ekonomika kráľovstva stojí a padá na hráčoch.</p><ul style="line-height:1.6;"><li><strong>Trhovisko (Aukcie):</strong> Môžeš tu anonymne vyvesiť akýkoľvek balíček svojich kariet na predaj. Súťažíš s ostatnými, kto prihodí viac mincí. Ak nemáš trpezlivosť čakať, môžeš využiť tlačidlo na okamžitý výkup (Strop).</li><li><strong>Kráľovský Sklad:</strong> Ak ti pred kovaním chýbajú špecifické materiály (Koža, Drevo, Kov...), kráľovstvo ti ich garantovane kedykoľvek predá z núdzových zásob, no ceny môžu byť vysoké.</li><li><strong>Sieň Slávy (Platinové Karty):</strong> V hre existuje 20 vzácnych Platinových kariet. Nemôžeš ich získať bežným kovaním – získa ich len aktuálny líder v jednej z 20 herných štatistík! Ak líder prestane hrať na 7 dní, o svoju exkluzívnu kartu dočasne prichádza a získa ju druhý v poradí.</li></ul>';
    } else if (aktualnaStranaKnihy === 6) {
        // NOVÁ KAPITOLA O TRIEDACH
        container.innerHTML = '<h3 style="color:#ffcc00;">🌟 KAPITOLA VI: BONUSY TRIEDY (F až S)</h3><p>Povýšenie triedy karty (vzácnosti) mení 4 dôležité mechaniky:</p><div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:10px;"><div style="background:rgba(0,0,0,0.5); padding:10px; border-radius:6px; flex:1; min-width:250px;"><strong>1. Hrubá sila (Bojové jednotky)</strong><br>Priamy bonus k základnej sile:<br>• <strong>E:</strong> +1b<br>• <strong>D:</strong> +2b<br>• <strong>C:</strong> +3b<br>• <strong>B:</strong> +5b<br>• <strong>A:</strong> +7b<br>• <strong>S:</strong> +10b</div><div style="background:rgba(0,0,0,0.5); padding:10px; border-radius:6px; flex:1; min-width:250px;"><strong>2. Predmety a Loot (Pasívny príjem)</strong><br>Výhra s predmetmi generuje extra odmeny:<br>• <strong>E:</strong> +25 mincí<br>• <strong>D:</strong> +50 mincí<br>• <strong>C:</strong> +100 mincí<br>• <strong>B:</strong> +150 mincí, 1 oz Zlata<br>• <strong>A:</strong> +250 mincí, 2 oz Zlata<br>• <strong>S:</strong> +500 mincí, 3 oz Zlata, 1x Prízrak</div><div style="background:rgba(0,0,0,0.5); padding:10px; border-radius:6px; flex:1; min-width:250px;"><strong>3. Setové bonusy radu</strong><br>Pridajú +1b celému radu za splnenie podmienky:<br>• <strong>6x</strong> E-karta<br>• <strong>5x</strong> D-karta<br>• <strong>4x</strong> C-karta<br>• <strong>3x</strong> B-karta<br>• <strong>2x</strong> A-karta<br>• <strong>1x</strong> S-karta</div><div style="background:rgba(0,0,0,0.5); padding:10px; border-radius:6px; flex:1; min-width:250px;"><strong>4. Cena a materiál (Kovanie)</strong><br>Na vylepšenie triedy potrebuješ 3 rovnaké karty, mince a materiál:<br>• <strong>F➔E:</strong> 10m + 3 oz Koža<br>• <strong>E➔D:</strong> 25m + 3 oz Drevo<br>• <strong>D➔C:</strong> 50m + 3 oz Kov<br>• <strong>C➔B:</strong> 100m + 3 oz Bronz<br>• <strong>B➔A:</strong> 250m + 3 oz Striebro<br>• <strong>A➔S:</strong> 500m + 3 oz Zlato</div></div>';
    }
} // koniec funkcie vykresliStraneKnihy

function prepniRozbalovanieBatohu() { var el = document.getElementById("inventory-dropdown-content"); if (!el) return; if (el.style.display === "none" || el.style.display === "") { vykresliRozbalovaciBatoh(); el.style.display = "flex"; } else { el.style.display = "none"; } }
function vykresliRozbalovaciBatoh() {
    var el = document.getElementById("inventory-dropdown-content"); if (!el) return;
    var items = [ 
        { name: "Mince", val: inventar.mince + " m", img: "Img/mince.webp" }, 
        { name: "Zlato", val: (inventar.suroviny["Zlato"] || 0) + " oz", img: "Img/zlato.webp" },
        { name: "Striebro", val: (inventar.suroviny["Striebro"] || 0) + " oz", img: "Img/striebro.webp" },
        { name: "Bronz", val: (inventar.suroviny["Bronz"] || 0) + " oz", img: "Img/bronz.webp" },
        { name: "Kov", val: (inventar.suroviny["Kov"] || 0) + " oz", img: "Img/zelezo.webp" },
        { name: "Drevo", val: (inventar.suroviny["Drevo"] || 0) + " oz", img: "Img/drevo.webp" },
        { name: "Koža", val: (inventar.suroviny["Koža"] || 0) + " oz", img: "Img/koza.webp" } 
    ];
    var html = ""; 
    items.forEach(function(item) { html += '<div class="inventory-mini-card"><img src="' + item.img + '" class="inventory-mini-img"><div class="inventory-mini-info"><span class="inventory-mini-title">' + item.name + '</span><span class="inventory-mini-val">' + item.val + '</span></div></div>'; });
    el.innerHTML = html;
}

function otvorDetailKarty(n, vynutenaTrieda) {
    var reg = getRegistryCard(n); if (!reg) return;
    var modal = document.getElementById("card-detail-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "card-detail-modal";
        modal.className = "card-modal";
        modal.style.zIndex = "9999999";
        modal.onclick = function() { modal.style.display = "none"; };
        document.body.appendChild(modal);
    }

    // --- NOVÁ LOGIKA PRE TRIEDU ---
    var topClass = "F";
    if (vynutenaTrieda) {
        // Ak sme klikli na lupu na konkrétnej karte, použijeme presne túto triedu (rám)
        topClass = vynutenaTrieda;
    } else {
        // Ak sme klikli inak (bez špecifickej triedy), hra nájde najlepšiu dostupnú
        if (inventar && inventar.karty && inventar.karty[n] && typeof inventar.karty[n].repliky === "object") {
            if (inventar.karty[n].repliky["S"] > 0) topClass = "S";
            else if (inventar.karty[n].repliky["A"] > 0) topClass = "A";
            else if (inventar.karty[n].repliky["B"] > 0) topClass = "B";
            else if (inventar.karty[n].repliky["C"] > 0) topClass = "C";
            else if (inventar.karty[n].repliky["D"] > 0) topClass = "D";
            else if (inventar.karty[n].repliky["E"] > 0) topClass = "E";
        } else if (reg.isPlatinum) { topClass = "PLATINUM"; } else if (reg.isPrizrak) { topClass = "F"; }
    }
    // ------------------------------

    var realPwr = getRealPower({ n: n, cls: topClass });
    // htmlKarty už teraz vykreslí správny rám aj silu
    var htmlKarty = '<div class="karta cls-' + topClass + '" style="transform: scale(1.1); margin: 20px auto; position:relative; pointer-events:none;">' + vytvorHTMLKarty(n, realPwr, topClass, reg.row, reg.p) + '</div>';
    
    var textPribehu = reg.desc ? '<div style="font-style:italic; color:#ddd; margin-bottom:15px; font-size:1.1em; line-height:1.4;">"' + reg.desc + '"</div>' : '';
    var textSchopnosti = reg.abilityDesc ? '<div style="color:#ffcc00; margin-bottom:15px; font-size:1em; padding:10px; background:rgba(0,0,0,0.6); border:1px solid #d4af37; border-radius:6px;">' + reg.abilityDesc + '</div>' : '';
    var textStats = '<div style="color:#aaa; font-size:0.9em; border-top: 1px solid #444; padding-top: 10px;"><strong>Základná Sila:</strong> ' + reg.p + ' | <strong>Rad:</strong> ' + reg.row + '</div>';

    modal.innerHTML = '<div class="modal-content modal-bg-dedina" style="max-width: 450px; text-align: center; position: relative;" onclick="event.stopPropagation()">' +
                      '<span class="card-modal-close" onclick="document.getElementById(\'card-detail-modal\').style.display=\'none\'">&times;</span>' +
                      '<h2 style="color: #d4af37; margin-bottom: 10px;">👑 KRÁĽOVSKÝ NÁHĽAD</h2>' +
                      htmlKarty +
                      '<div style="padding: 10px;">' + textPribehu + textSchopnosti + textStats + '</div>' +
                      '</div>';

    modal.style.display = "flex";
}

function ukazOznamenie(titulok, sprava, callback) {
    var overlay = document.createElement("div"); overlay.className = "custom-notify-overlay";
    overlay.innerHTML = '<div class="custom-notify-box"><h3 class="custom-notify-title">' + titulok + '</h3><div class="custom-notify-msg">' + sprava + '</div><button class="custom-notify-btn">Rozumiem</button></div>';
    document.body.appendChild(overlay);
    var btn = overlay.querySelector(".custom-notify-btn");
    btn.onclick = function() { overlay.remove(); if (typeof callback === "function") callback(); };
}

function zobraziťObrazovku(idObrazovky) {
    // ANTI-GHOST OCHRANA: Ak odchádzame zo zápasu do menu, tvrdý reset enginu
    if (idObrazovky === "hlavne-menu" && document.getElementById("hracia-plocha").style.display !== "none") {
        blokujVykladanie = true; // Zastaví všetky ďalšie kliky
        p1Pass = true; p2Pass = true; // Uspí AI logiku
    }
    
    var obrazovky = ["hlavne-menu", "hracia-plocha", "dielna-modal", "obchod-modal", "navod-modal", "deckbuilder-modal", "stats-modal", "graveyard-modal", "mulligan-modal-overlay"];
    obrazovky.forEach(function(id) { 
        var el = document.getElementById(id); 
        if (el) {
            el.style.display = (id === idObrazovky) ? ((id.includes("modal") || id === "hracia-plocha") ? "flex" : "block") : ((!id.includes("modal")) ? "none" : el.style.display);
        }
    });
}

function otvoriťDeckbuilder() { document.getElementById("deckbuilder-modal").style.display = "flex"; vygenerujDeckbuilder(); }
function otvoriťObchod() { document.getElementById("obchod-modal").style.display = "flex"; prepniZalozkuTrhu("trh"); }
function otvoriťDielňu() { document.getElementById("dielna-modal").style.display = "flex"; aktualizujPanelDielne(); }
function otvoriťStatistiky() { document.getElementById("stats-modal").style.display = "flex"; vykresliGridStatistik(); }

function vykresliGridStatistik() {
    var container = document.getElementById("stats-grid-container"); if (!container) return; container.innerHTML = "";
    Object.keys(simulačneRebríčky).forEach(function(katKey) {
        var items = simulačneRebríčky[katKey] || []; var meta = KATEGORIE_METADATA[katKey] || { title: katKey, card: "Neznáma" };
        var col = document.createElement("div"); col.className = "leaderboard-column";
        var html = '<h3 class="leaderboard-title">' + meta.title + '</h3><div class="leaderboard-reward-tag">Platinová Trofej: 👑 ' + meta.card + '</div>';
        items.forEach(function(it, idx) {
            var rankCls = (idx === 0) ? "rank-1" : ((idx === 1) ? "rank-2" : ((idx === 2) ? "rank-3" : ""));
            var platBadge = (idx === 0 && !it.inaktivny) ? '<span class="plat-badge">👑 Vlastní</span>' : '';
            if (idx === 1 && items[0] && items[0].inaktivny) platBadge = '<span class="plat-badge" style="background:#ffd700;">👑 Zapožičaná</span>';
            var inactTag = it.inaktivny ? ' <span style="font-size:0.8em; color:#ff4d4d;">(💤 Inaktívny)</span>' : '';
            html += '<div class="leaderboard-item ' + rankCls + '"><span>#' + (idx + 1) + ' ' + it.hrac + inactTag + '</span><span><strong>' + it.skore + '</strong> ' + platBadge + '</span></div>';
        });
        col.innerHTML = html; container.appendChild(col);
    });
}

function vyhlasGlobalnySClassOznam(hracMeno, kartaMeno) { var banner = document.createElement("div"); banner.className = "global-announce-banner"; banner.innerHTML = "👑 <strong>KRÁĽOVSKÝ OZNAM:</strong> Hráč <strong>" + hracMeno + "</strong> vykoval <strong>S-Class</strong> kartu <strong>" + kartaMeno + "</strong>!"; document.body.appendChild(banner); setTimeout(function() { banner.remove(); }, 6000); }

document.addEventListener("DOMContentLoaded", function() {
    nacitatUlozenuZostavu(); 
    skontrolujPlatinovky(); // 💡 NOVÉ: Hneď po načítaní skontroluje trofeje
    zobraziťObrazovku("hlavne-menu");
    aktualizujPanelDielne(); vygenerujSimulaciuTrhu(); aktualizujVsetkyStickyWallety();
});

function tahatNoveKartyZBalicka(pNum, pocetKariet) {
    var deck = (pNum === 1) ? p1_active_deck : p2_active_deck;
    var hand = (pNum === 1) ? p1_draft_hand : p2_draft_hand;
    var potiahnute = 0;

    for (var i = 0; i < pocetKariet; i++) {
        if (deck.length > 0) {
            var item = deck.pop();
            if (typeof item === "object") { hand.push(item); } 
            else {
                var cardCls = "F"; 
                if (pNum === 1 && inventar.karty[item]) {
                    var regItem = getRegistryCard(item);
                    if (regItem.isTournamentUnique) {
                        cardCls = inventar.karty[item].aktivnaTrieda || "F";
                    } else if (inventar.karty[item].zvolenaTrieda) {
                        cardCls = inventar.karty[item].zvolenaTrieda; // NOVÉ
                    } else if (inventar.karty[item].repliky) {
                        var rep = inventar.karty[item].repliky;
                        if (rep["S"] > 0) cardCls = "S"; else if (rep["A"] > 0) cardCls = "A"; else if (rep["B"] > 0) cardCls = "B"; else if (rep["C"] > 0) cardCls = "C"; else if (rep["D"] > 0) cardCls = "D"; else if (rep["E"] > 0) cardCls = "E";
                    }
                }
                hand.push({ n: item, cls: cardCls });
            }
            potiahnute++;
        }
    }
    if (pNum === 1 && potiahnute > 0) {
        ukazOznamenie("🃏 ŤAHANIE KARIET", "Potiahol si si " + potiahnute + " nové karty z balíčka!");
    }
}
function devPridatSurovinyACheaty() {
    if (!isAdmin) return;
    inventar.mince += 10000;
    inventar.suroviny["Koža"] = (inventar.suroviny["Koža"] || 0) + 50;
    inventar.suroviny["Zlato"] = (inventar.suroviny["Zlato"] || 0) + 50;
    inventar.prizraky["F"] = (inventar.prizraky["F"] || 0) + 10;
    ukazOznamenie("⚡ DEV CHEAT", "Bolo ti pridaných 10 000 mincí a suroviny pre testovanie!");
    aktualizujVsetkyStickyWallety();
}
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
window.devPridatSurovinyACheaty = devPridatSurovinyACheaty;

// =====================================================================
// GWENT HOVER EFEKT (Optická ilúzia pre kompaktný stôl)
// =====================================================================
document.addEventListener('mouseover', function(e) {
    // Sledujeme, či myš vošla na nejakú kartu na stole alebo v tvojej ruke
    var kartaEl = e.target.closest('.board-row .karta, .p1-hand .karta');
    var preview = document.getElementById('gwent-hover-preview');
    
    if (!preview) return;

    // Ak myš ukazuje na kartu a nie je to skrytá karta súpera
    if (kartaEl && !kartaEl.classList.contains('cls-HIDDEN')) {
        // Skopírujeme kompletne celý HTML obsah malej karty (vrátane krúžkov!)
        preview.innerHTML = kartaEl.innerHTML;
        
        // Skopírujeme CSS triedy pre správny rámik (napr. cls-PLATINUM)
        preview.className = kartaEl.className;
        
        // Poistka: vrátime mu jeho ID, aby fungovalo tvoje CSS skrytie menovky
        preview.id = 'gwent-hover-preview';
        
        preview.style.display = 'block';
    } else {
        // Ak myš z karty odíde, náhľad okamžite zmizne
        preview.style.display = 'none';
    }
});