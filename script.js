// =====================================================================
// RODINNÁ HRA - HOME WARS (JAVASCRIPT ENGINE)
// =====================================================================

// =====================================================================
// [SEKCIA 1 - JS] MASTER REGISTRY, KONFIGURÁCIE A PREMENNÉ
// =====================================================================
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

var VERZIA = "36.0.0";

var MASTER_REGISTRY = {
    // 🌟 PLATINOVÉ KARTY
    "Zvedavá suseda": { row: 2, p: 7, isPlatinum: true, isSpy: true, img: "Img/zvedava-suseda.webp", desc: "Vidí a počuje všetko, čo sa v dedine šustne. Nič pred ňou neutajíš.", abilityDesc: "🕵️ <strong>Špión:</strong> Vykladá sa na súperovu stranu stola. Po vyložení si potiahneš 2 nové karty." },
    "Ďuri": { row: 1, p: 6, isPlatinum: true, img: "Img/duri.webp", desc: "Miestny veterán, ktorý má vždy v rukáve nejaký starý trik.", abilityDesc: "🍺 <strong>Taktik:</strong> Ak je na stole Alkohol, posilňuje celý ženský 2. rad o +100 %." },
    "Makak": { row: 3, p: 2, isPlatinum: true, isSpy: true, img: "Img/makak.webp", desc: "Lesný šibal, ktorý narobí viac škody ako úžitku.", abilityDesc: "🕵️ <strong>Špión:</strong> Dáva súperovi len 2 body a potiahne ti 2 nové karty do ruky." },
    "Oli": { row: 2, p: 12, isPlatinum: true, img: "Img/oli.webp", desc: "Duchovná matka dediny s neoblomnou vierou.", abilityDesc: "✝️ <strong>Imunita:</strong> Jej sila (12b) je absolútne nedotknuteľná kúzlam aj plošnému spáleniu." },
    "Vinár Dávid": { row: 1, p: 4, isPlatinum: true, isSpy: true, img: "Img/david.webp", desc: "Kráľovský vinár, ktorý vie, komu naliať čistého vína.", abilityDesc: "🕵️ <strong>Špión:</strong> Vykladá sa súperovi do 1. radu a potiahne ti 2 nové karty." },
    "Sestrička": { row: 2, p: 3, isPlatinum: true, img: "Img/sestricka.webp", desc: "Obetavá ošetrovateľka, pripravená pomôcť kedykoľvek.", abilityDesc: "🏥 <strong>Oživenie:</strong> Vráti do hry tebou vybranú spálenú kartu z archívu ohňa." },
    "Vlk": { row: 3, p: 3, isPlatinum: true, img: "Img/vlk.webp", desc: "Hrdý vodca lesnej svorky.", abilityDesc: "🐾 <strong>Svorka:</strong> Zvyšuje silu všetkých zvierat v 3. rade o +50 %." },
    "Erik": { row: 1, p: 3, isPlatinum: true, img: "Img/erik.webp", desc: "Taktik, ktorý dokáže motivovať svoje okolie k lepším výkonom.", abilityDesc: "📢 <strong>Buff:</strong> Po vyložení zvolíš rad, ktorému natrvalo pridá +50 % k celkovej sile." },
    "Sisa": { row: 2, p: 4, isPlatinum: true, img: "Img/sisa.webp", desc: "Dvorná dáma s vyberaným vkusom a autoritou.", abilityDesc: "📢 <strong>Dvorná dáma:</strong> Zvyšuje silu celého mužského radu o +50 %." },
    "Mária Trhovkyňa": { row: 2, p: 9, isPlatinum: true, isSpy: true, img: "Img/maria.webp", desc: "Skúsená trhovkyňa, ktorá za dobrú cenu predá aj vlastnú babku.", abilityDesc: "🕵️ <strong>Špión:</strong> Vyloží sa súperovi a potiahne ti 2 karty. (Cena za informácie je 9b súperovi)." },
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
    "Grobské Mravce": { row: 3, p: 1, img: "Img/grobske-mravce.webp", desc: "Húževnatá a nezastaviteľná svorka lesných mravcov.", abilityDesc: "💰 <strong>Bonus:</strong> Pri výhre prináša do pokladnice extra mince." },
    "Petržalské holuby": { row: 3, p: 1, img: "Img/petrzalske-holuby.webp", desc: "Rýchli hradní posli prenášajúci tajné správy.", abilityDesc: "💰 <strong>Bonus:</strong> Pri výhre prináša do pokladnice extra mince." },
    "Patkaňe": { row: 3, p: 2, img: "Img/patkane.webp", desc: "Hladná pivničná svorka drancujúca sýpky.", abilityDesc: "💰 <strong>Bonus:</strong> Pri výhre prináša do pokladnice extra mince." },
    "Kabelkový pes": { row: 3, p: 3, img: "Img/kabelkovy-pes.webp", desc: "Rozmaznaný panský miláčik usadený na vankúši.", abilityDesc: "💰 <strong>Bonus:</strong> Pri výhre prináša do pokladnice extra mince." },
    "Pouličný mačiak": { row: 3, p: 3, img: "Img/poulicny-maciak.webp", desc: "Tichý potulný kocúr sledujúci tiene.", abilityDesc: "💰 <strong>Bonus:</strong> Pri výhre prináša do pokladnice extra mince." },
    "Komáre": { row: 3, p: 3, img: "Img/komare.webp", desc: "Dotieravé hradné húfy sajúce krv nepriateľom.", abilityDesc: "💰 <strong>Bonus:</strong> Pri výhre prináša do pokladnice extra mince." },
    "Sviňa lesná": { row: 3, p: 4, img: "Img/svina-lesna.webp", desc: "Zúrivý lesný kanec ničiaci všetko, čo mu stojí v ceste." },
    "Pes ktorý prerástol kabelku": { row: 3, p: 4, img: "Img/pes.webp", desc: "Verný a mohutný strážny pes, z ktorého ide strach." },
    
    // PREDMETY A KÚZLA
    "Alcohol": { row: 1, p: 0, isItem: true, img: "Img/alkohol.webp", desc: "Silná medovina dodávajúca odvahu.", abilityDesc: "🛠️ <strong>Predmet:</strong> Pridáva +1b až +7b ku každej karte v 1. rade (podľa jej vzácnosti)." },
    "Kvety": { row: 2, p: 0, isItem: true, img: "Img/kvety.webp", desc: "Krásna kytica prinášajúca pokoj a odhodlanie.", abilityDesc: "🛠️ <strong>Predmet:</strong> Pridáva +1b až +7b ku každej karte v 2. rade (podľa jej vzácnosti)." },
    "Medove Orechy": { row: 3, p: 0, isItem: true, img: "Img/medove-orechy.webp", desc: "Sladká odmena pre zvieracích bojovníkov.", abilityDesc: "🛠️ <strong>Predmet:</strong> Pridáva +1b až +7b ku každej karte v 3. rade (podľa jej vzácnosti)." },
    "Musíme sa porozprávať": { row: 0, p: 0, isSpell: true, img: "Img/musime-sa-porozpravat.webp", desc: "Slová, z ktorých tuhne krv v žilách každému mužovi.", abilityDesc: "⚡ <strong>Kúzlo:</strong> Okamžite zníži základnú silu všetkých mužov (1. rad) oboch hráčov na 1b." },
    "Upokoj sa": { row: 0, p: 0, isSpell: true, img: "Img/upokoj-sa.webp", desc: "Najhoršia možná rada, ktorá vyvoláva nekontrolovateľný hnev.", abilityDesc: "⚡ <strong>Kúzlo:</strong> Okamžite zníži základnú silu všetkých žien (2. rad) oboch hráčov na 1b." },
    "Ohnostroj": { row: 0, p: 0, isSpell: true, img: "Img/ohnostroj.webp", desc: "Ohlušujúci rachot plašiaci zver široko-ďaleko.", abilityDesc: "⚡ <strong>Kúzlo:</strong> Okamžite zníži základnú silu všetkých zvierat (3. rad) oboch hráčov na 1b." },
    "Šicko v porádku": { row: 0, p: 0, isSpell: true, img: "Img/sicko-v-poradku.webp", desc: "Úsmev, ktorý vyrieši každú napätú situáciu.", abilityDesc: "⚡ <strong>Kúzlo:</strong> Okamžite vyčistí neutrálny rad od všetkých negatívnych kúziel stola!" }
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
    "F->E": { rate: 1.00, from: "F", nextClass: "E", reqMat: "Koža", reqMatCount: 3, coinFee: 10 }, 
    "E->D": { rate: 0.90, from: "E", nextClass: "D", reqMat: "Drevo", reqMatCount: 3, coinFee: 25 }, 
    "D->C": { rate: 0.80, from: "D", nextClass: "C", reqMat: "Kov", reqMatCount: 3, coinFee: 50 }, 
    "C->B": { rate: 0.70, from: "C", nextClass: "B", reqMat: "Bronz", reqMatCount: 3, coinFee: 100 }, 
    "B->A": { rate: 0.55, from: "B", nextClass: "A", reqMat: "Striebro", reqMatCount: 3, coinFee: 250 }, 
    "A->S": { rate: 0.40, from: "A", nextClass: "S", reqMat: "Zlato", reqMatCount: 3, coinFee: 500 } 
};

var STATNY_SKLAD_CENNIK = { "Koža": { price: 8, img: "Img/koza.webp" }, "Drevo": { price: 18, img: "Img/drevo.webp" }, "Kov": { price: 38, img: "Img/zelezo.webp" }, "Bronz": { price: 75, img: "Img/bronz.webp" }, "Striebro": { price: 180, img: "Img/striebro.webp" }, "Zlato": { price: 80, img: "Img/zlato.webp" } };
var PERGAMENY_CONFIG = { "none": { name: "Bez Zvitku", goldCost: 0, rateBonus: 0.00, saveCard: false }, "basic": { name: "Základný Zvitok", goldCost: 100, rateBonus: 0.10, saveCard: true }, "advanced": { name: "Pokročilý Zvitok", goldCost: 500, rateBonus: 0.25, saveCard: true }, "legendary": { name: "Legendárny Zvitok", goldCost: 1000, rateBonus: 0.55, saveCard: true } };

var inventar = { mince: 500, suroviny: { "Koža": 15, "Drevo": 10, "Kov": 5, "Bronz": 2, "Striebro": 1, "Zlato": 20 }, karty: {}, prizraky: { "F": 10, "E": 5, "D": 5, "C": 5, "B": 5, "A": 5 }, zostava: [] };
var simulačneRebríčky = { sampión: [ { hrac: "Hráč 1 (Ty)", skore: 12, inaktivny: false, titulCard: "Zvedavá suseda" }, { hrac: "Lord_Grob", skore: 8, inaktivny: false }, { hrac: "Mníchov_Master", skore: 1, inaktivny: false } ], nerozhodny: [ { hrac: "Mníchov_Master", skore: 5, inaktivny: false, titulCard: "Ďuri" }, { hrac: "Hráč 1 (Ty)", skore: 2, inaktivny: false }, { hrac: "Lord_Grob", skore: 0, inaktivny: false } ], nie_sampión: [ { hrac: "Lord_Grob", skore: 14, inaktivny: false, titulCard: "Makak" }, { hrac: "Hráč 1 (Ty)", skore: 4, inaktivny: false } ], sClass: [ { hrac: "Lord_Grob", skore: 3, inaktivny: false, titulCard: "Oli" }, { hrac: "Hráč 1 (Ty)", skore: 1, inaktivny: false } ], aClass: [ { hrac: "Hráč 1 (Ty)", skore: 5, inaktivny: false, titulCard: "Vinár Dávid" }, { hrac: "Lord_Grob", skore: 2, inaktivny: false } ], bClass: [ { hrac: "Mníchov_Master", skore: 7, inaktivny: false, titulCard: "Sestrička" }, { hrac: "Hráč 1 (Ty)", skore: 4, inaktivny: false } ], cClass: [ { hrac: "Lord_Grob", skore: 10, inaktivny: false, titulCard: "Vlk" }, { hrac: "Hráč 1 (Ty)", skore: 3, inaktivny: false } ], dClass: [ { hrac: "Hráč 1 (Ty)", skore: 15, inaktivny: false, titulCard: "Erik" }, { hrac: "Mníchov_Master", skore: 8, inaktivny: false } ], eClass: [ { hrac: "Mníchov_Master", skore: 20, inaktivny: false, titulCard: "Sisa" }, { hrac: "Lord_Grob", skore: 12, inaktivny: false } ], fClass: [ { hrac: "Hráč 1 (Ty)", skore: 45, inaktivny: false, titulCard: "Mária Trhovkyňa" }, { hrac: "Lord_Grob", skore: 30, inaktivny: false } ], detailista: [ { hrac: "Hráč 1 (Ty)", skore: 88, inaktivny: false, titulCard: "Nela" }, { hrac: "Mníchov_Master", skore: 50, inaktivny: false } ], majster_aukcii: [ { hrac: "Lord_Grob", skore: 450, inaktivny: false, titulCard: "Zatúlaný tatranský medveď" }, { hrac: "Hráč 1 (Ty)", skore: 250, inaktivny: false } ], demolator: [ { hrac: "Mníchov_Master", skore: 78, inaktivny: false, titulCard: "Jakub" }, { hrac: "Hráč 1 (Ty)", skore: 45, inaktivny: false } ], rozsafny: [ { hrac: "Hráč 1 (Ty)", skore: 1250, inaktivny: false, titulCard: "Kika" }, { hrac: "Lord_Grob", skore: 800, inaktivny: false } ], grill_majster: [ { hrac: "Lord_Grob", skore: 18, inaktivny: false, titulCard: "Doktor" }, { hrac: "Hráč 1 (Ty)", skore: 6, inaktivny: false } ], fenix: [ { hrac: "Hráč 1 (Ty)", skore: 9, inaktivny: false, titulCard: "Michal" }, { hrac: "Mníchov_Master", skore: 3, inaktivny: false } ], hazarder: [ { hrac: "Mníchov_Master", skore: 4, inaktivny: false, titulCard: "Kornélia" }, { hrac: "Hráč 1 (Ty)", skore: 1, inaktivny: false } ], duelovy_veteran: [ { hrac: "Hráč 1 (Ty)", skore: 35, inaktivny: false, titulCard: "Katy" }, { hrac: "Lord_Grob", skore: 20, inaktivny: false } ], terminator: [ { hrac: "Lord_Grob", skore: 50, inaktivny: false, titulCard: "Krčmár Boris" }, { hrac: "Hráč 1 (Ty)", skore: 22, inaktivny: false } ], plosny_zabijak: [ { hrac: "Hráč 1 (Ty)", skore: 14, inaktivny: false, titulCard: "Marek" }, { hrac: "Mníchov_Master", skore: 8, inaktivny: false } ] };
var KATEGORIE_METADATA = { sampión: { title: "🥇 Šampión (Najviac výhier)", card: "Zvedavá suseda" }, nerozhodny: { title: "🤝 Nerozhodný (Najviac remíz)", card: "Ďuri" }, nie_sampión: { title: "💀 Nie-Šampión (Najviac prehier)", card: "Makak" }, sClass: { title: "👑 S-Class majster (Vykované S)", card: "Oli" }, aClass: { title: "💎 A-Class majster (Vykované A)", card: "Vinár Dávid" }, bClass: { title: "🔮 B-Class majster (Vykované B)", card: "Sestrička" }, cClass: { title: "📜 C-Class majster (Vykované C)", card: "Vlk" }, dClass: { title: "🛡️ D-Class majster (Vykované D)", card: "Erik" }, eClass: { title: "🌲 E-Class majster (Vykované E)", card: "Sisa" }, fClass: { title: "📦 F-Class majster (Získané F)", card: "Mária Trhovkyňa" }, detailista: { title: "🔨 Detailista (Pokusy vo Forge)", card: "Nela" }, majster_aukcii: { title: "💰 Majster aukcií (Top ponuka)", card: "Zatúlaný tatranský medveď" }, demolator: { title: "💥 Demolátor (Top skóre v 1 kole)", card: "Jakub" }, rozsafny: { title: "💸 Rozšafný (Minuté mince)", card: "Kika" }, grill_majster: { title: "🔥 Grill majster (Spálené karty)", card: "Doktor" }, fenix: { title: "🕊️ Fénix (Oživené karty)", card: "Michal" }, hazarder: { title: "🎲 Hazardér (Výhry o 1 bod)", card: "Kornélia" }, duelovy_veteran: { title: "⚔️ Duelový veterán (PVP zápasy)", card: "Katy" }, terminator: { title: "🤖 Terminátor (AI zápasy)", card: "Krčmár Boris" }, plosny_zabijak: { title: "⚡ Plošný zabijak (Kúzla stola)", card: "Marek" } };

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
    if (livePwr !== "none" && !reg.isSpell && !reg.isItem && !reg.isPrizrak) html += "<div class='karta-kruh karta-kruh-pwr'>" + livePwr + "</div>";
    var renderCls = reg.isPlatinum ? "PLATINUM" : (reg.isPrizrak ? "PRIZRAK-" + cls : cls);
    html += "<div class='karta-kruh karta-kruh-cls cls-" + renderCls + "'>" + (reg.isPlatinum ? "P" : cls) + "</div>";
    html += "<button class='karta-btn-inspect' title='Zväčšiť kartu' onclick=\"event.stopPropagation(); otvorDetailKarty('" + meno.replace(/'/g, "\\'") + "');\">🔍</button>";
    html += "<div class='karta-foto' style=\"background-image: url('" + encodeURI(imgPath) + "');\"></div>";
    html += "<div class='karta-stitok-spodok'><div class='karta-nazov'>" + cisteMeno + "</div></div>";
    return html;
}

function automatickyDoplnitDefaultZostavu(showNotify) {
    var defaultPool = Object.keys(MASTER_REGISTRY).filter(function(k) { return !MASTER_REGISTRY[k].isPrizrak; });
    inventar.zostava = defaultPool.slice(0, 25);
    ulozitZostavuDoStorage();
    if (showNotify !== false) ukazOznamenie("⚡ PREDVOLENÁ ZOSTRAVA", "Zostava bola automaticky naplnená 25 základnými kartami!");
    vygenerujDeckbuilder(); aktualizujVsetkyStickyWallety();
}

function aktualizujVsetkyStickyWallety() {
    var walletIds = ["deckbuilder-sticky-wallet", "dielna-sticky-wallet", "obchod-sticky-wallet"];
    var html = '<div class="wallet-chip"><img src="Img/mince.webp" class="wallet-chip-img"> ' + inventar.mince + ' m</div>' +
               '<div class="wallet-chip"><img src="Img/zlato.webp" class="wallet-chip-img"> ' + (inventar.suroviny["Zlato"]||0) + ' oz Zlato</div>' +
               '<div class="wallet-chip"><img src="Img/koza.webp" class="wallet-chip-img"> ' + (inventar.suroviny["Koža"]||0) + ' oz Koža</div>' +
               '<div class="wallet-chip"><img src="Img/drevo.webp" class="wallet-chip-img"> ' + (inventar.suroviny["Drevo"]||0) + ' oz Drevo</div>' +
               '<div class="wallet-chip"><img src="Img/zelezo.webp" class="wallet-chip-img"> ' + (inventar.suroviny["Kov"]||0) + ' oz Kov</div>' +
               '<div class="wallet-chip"><img src="Img/bronz.webp" class="wallet-chip-img"> ' + (inventar.suroviny["Bronz"]||0) + ' oz Bronz</div>' +
               '<div class="wallet-chip"><img src="Img/striebro.webp" class="wallet-chip-img"> ' + (inventar.suroviny["Striebro"]||0) + ' oz Striebro</div>' +
               '<div class="wallet-chip"><img src="Img/prizrak.webp" class="wallet-chip-img"> ' + (inventar.prizraky["F"]||0) + 'x F-Prízrak</div>';
    walletIds.forEach(function(id) { var el = document.getElementById(id); if (el) el.innerHTML = html; });
    vykresliRozbalovaciBatoh();
    ulozitZostavuDoStorage();
}

function nacitatUlozenuZostavu() {
    try { 
        var ulozene = localStorage.getItem("homewars_cloud_save_v1"); 
        if (ulozene) {
            var data = JSON.parse(ulozene);
            inventar.mince = data.mince !== undefined ? data.mince : 500;
            inventar.suroviny = data.suroviny || { "Koža": 15, "Drevo": 10, "Kov": 5, "Bronz": 2, "Striebro": 1, "Zlato": 20 };
            inventar.karty = data.karty || {};
            inventar.prizraky = data.prizraky || { "F": 10, "E": 5, "D": 5, "C": 5, "B": 5, "A": 5 };
            inventar.zostava = data.zostava || [];
        }
    } catch(e) { console.error("Chyba načítavania Cloudu:", e); }
    
    if (!Array.isArray(inventar.zostava) || inventar.zostava.length < 25) {
        automatickyDoplnitDefaultZostavu(false);
    }
}

function ulozitZostavuDoStorage() { 
    try { localStorage.setItem("homewars_cloud_save_v1", JSON.stringify(inventar)); } catch(e) { console.error("Chyba ukladania:", e); } 
}

function prepniKartuVZostave(kartaMeno) {
    var idx = inventar.zostava.indexOf(kartaMeno);
    if (idx !== -1) inventar.zostava.splice(idx, 1); else inventar.zostava.push(kartaMeno);
    ulozitZostavuDoStorage(); vygenerujDeckbuilder();
}

function vygenerujDeckbuilder() {
    var e = document.getElementById("deckbuilder-zoznam"); var countEl = document.getElementById("deckbuilder-count"); var msgEl = document.getElementById("deckbuilder-msg");
    if (!e) return; e.innerHTML = "";
    var count = inventar.zostava.length;
    if (countEl) countEl.innerText = count;
    if (msgEl) msgEl.innerHTML = (count >= 25) ? "<span style='color:#10b981;'>✅ Zostava je pripravená na boj!</span>" : "<span style='color:#ff4d4d;'>⚠️ Potrebuješ ešte pridať " + (25 - count) + " kariet!</span>";

    Object.keys(MASTER_REGISTRY).forEach(function(t) {
        var reg = MASTER_REGISTRY[t]; if (reg.isPrizrak) return;
        var isVBaliku = (inventar.zostava.indexOf(t) !== -1);
        var wrap = document.createElement("div"); wrap.className = "karta-karta-wrapper " + (isVBaliku ? "deck-active-card" : "deck-inactive-card"); wrap.onclick = function() { prepniKartuVZostave(t); };
        
        var cardCls = "F";
        if (inventar.karty[t] && typeof inventar.karty[t].repliky === "object") {
            if (inventar.karty[t].repliky["S"] > 0) cardCls = "S";
            else if (inventar.karty[t].repliky["A"] > 0) cardCls = "A";
            else if (inventar.karty[t].repliky["B"] > 0) cardCls = "B";
            else if (inventar.karty[t].repliky["C"] > 0) cardCls = "C";
            else if (inventar.karty[t].repliky["D"] > 0) cardCls = "D";
            else if (inventar.karty[t].repliky["E"] > 0) cardCls = "E";
        }

        var div = document.createElement("div"); div.className = "karta cls-" + (reg.isPlatinum ? "PLATINUM" : cardCls);
        div.innerHTML = vytvorHTMLKarty(t, getRealPower({n:t, cls:cardCls}), cardCls, reg.row, reg.p, false); wrap.appendChild(div);
        var badge = document.createElement("div"); badge.style.marginTop = "8px"; badge.style.fontWeight = "bold"; badge.style.fontSize = "0.85em";
        badge.innerHTML = isVBaliku ? "<span style='color:#10b981;'>✅ V Zostave</span>" : "<span style='color:#888;'>+ Pridať do Zostavy</span>"; wrap.appendChild(badge);
        e.appendChild(wrap);
    });
    aktualizujVsetkyStickyWallety();
}

function pripravBalicekPreZapas(pNum) {
    // Ak ide o Bota v singleplayeri, vygenerujeme mu vlastný dynamický balík
    if (pNum === 2 && jeSingleplayer) { return vygenerujUmeluInteligenciu(); }
    
    // Pre teba sa načíta normálna tvoja Zostava
    var pool = inventar.zostava.slice();
    for (var i = pool.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var temp = pool[i]; pool[i] = pool[j]; pool[j] = temp; }
    return pool;
} // koniec funkcie pripravBalicekPreZapas

// POMOCNÁ FUNKCIA: Presné škálovanie AI balíčka
function vygenerujUmeluInteligenciu() {
    var dostupneKarty = Object.keys(MASTER_REGISTRY).filter(function(k) {
        var r = MASTER_REGISTRY[k]; return !r.isPlatinum && !r.isSpell && !r.isPrizrak && !r.isTournamentUnique && !r.isItem;
    });
    var pool = [];
    
    function pridajDoBalika(trieda, pocet) {
        for(var i=0; i<pocet; i++) {
            if (dostupneKarty.length === 0) break; // Poistka, aby neťahal viac než existuje
            var randIndex = Math.floor(Math.random() * dostupneKarty.length);
            var randMeno = dostupneKarty[randIndex];
            // NOVÉ: Kartu odstránime zo zoznamu, takže ju AI dostane len raz
            dostupneKarty.splice(randIndex, 1); 
            pool.push({ n: randMeno, cls: trieda });
        }
    }
    
    if (obtiaznostAI === "A") { // ĽAHKÁ (A)
        pridajDoBalika("F", 10); pridajDoBalika("E", 10); pridajDoBalika("D", 5);
    } else if (obtiaznostAI === "B") { // STREDNÁ (B)
        pridajDoBalika("F", 5); pridajDoBalika("E", 5); pridajDoBalika("D", 5); pridajDoBalika("C", 5); pridajDoBalika("B", 5);
    } else { // ŤAŽKÁ (C)
        pridajDoBalika("D", 5); pridajDoBalika("C", 5); pridajDoBalika("B", 8); pridajDoBalika("A", 5); pridajDoBalika("S", 2);
    }
    
    for (var i = pool.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var temp = pool[i]; pool[i] = pool[j]; pool[j] = temp; }
    return pool;
} // koniec funkcie vygenerujUmeluInteligenciu

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
} // koniec funkcie vytiahniRukuZRozdanehoBalicka

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
function vyhodnotKoniecZapasu() { var typTruhly = (r1 >= 2 && r2 < 2) ? "vitaz" : "ucastnik"; spustitVideoAnimationTruhly(typTruhly); }

function spustitVideoAnimationTruhly(typ) {
    pozastavitHudbuPreVideo();
    var overlay = document.createElement("div"); overlay.id = "chest-video-overlay";
    var videoSrc = (typ === "vitaz") ? "Img/truhlavitaza.mp4" : "Img/truhlaucastnika.mp4";
    overlay.innerHTML = '<video id="chest-video-element" src="' + videoSrc + '" playsinline webkit-playsinline></video><div id="chest-click-prompt" class="chest-prompt-text">🎬 KLIKNI PRE OTVORENIE TRUHLE</div>';
    document.body.appendChild(overlay);
    var vid = document.getElementById("chest-video-element"); var promptTxt = document.getElementById("chest-click-prompt");
    overlay.onclick = function() { if (vid.paused) { vid.play().catch(function(){}); promptTxt.style.display = "none"; } };
    vid.onended = function() { doplnOdmenyAUpravUI(typ, overlay); };
}

function doplnOdmenyAUpravUI(typ, overlayElement) {
    var coinsEarned = 0, goldEarned = 0, maxKariet = 0, prizrakCount = 0, ziskaneSuroviny = {};
    if (typ === "vitaz") {
        coinsEarned = Math.floor(Math.random() * 151) + 150; goldEarned = Math.floor(Math.random() * 4) + 2; maxKariet = Math.floor(Math.random() * 4) + 3;
        var rollP = Math.random(); if (rollP <= 0.15) prizrakCount = 2; else if (rollP <= 0.75) prizrakCount = 1;
    } else {
        coinsEarned = Math.floor(Math.random() * 51) + 50; goldEarned = (Math.random() < 0.1) ? 1 : 0; maxKariet = Math.floor(Math.random() * 3) + 1;
        if (Math.random() <= 0.20) prizrakCount = 1;
    }

    var extraLowPwrCoins = 0;
    if (r1 >= 2) {
        p1_played_cards.forEach(function(c) {
            var reg = getRegistryCard(c.n);
            if (!reg.isSpell && !reg.isItem && !reg.isPrizrak && !reg.isPlatinum) {
                if (reg.p === 1) extraLowPwrCoins += 25; else if (reg.p === 2) extraLowPwrCoins += 15; else if (reg.p === 3) extraLowPwrCoins += 10; else if (reg.p === 4) extraLowPwrCoins += 5;
            }
        });
        extraLowPwrCoins = Math.min(125, extraLowPwrCoins);
    }
    
    var itemBonusCoins = 0;
    if (typ === "vitaz") {
        p1_pouzite_predmety.forEach(function(cls) {
            var drop = CLASS_CONFIG[cls].itemDrop;
            if (drop) { itemBonusCoins += drop.m; goldEarned += drop.g; prizrakCount += drop.p; }
        });
        coinsEarned += itemBonusCoins;
    }
    coinsEarned += extraLowPwrCoins; ziskaneSuroviny["Koža"] = (ziskaneSuroviny["Koža"] || 0) + 1;
    inventar.mince += coinsEarned; inventar.suroviny["Zlato"] = (inventar.suroviny["Zlato"] || 0) + goldEarned; inventar.prizraky["F"] = (inventar.prizraky["F"] || 0) + prizrakCount;
    Object.keys(ziskaneSuroviny).forEach(function(mat) { inventar.suroviny[mat] = (inventar.suroviny[mat] || 0) + ziskaneSuroviny[mat]; });

    var mincovyText = 'Kopa Mincí';
    if (extraLowPwrCoins > 0 || itemBonusCoins > 0) {
        mincovyText += '<br><small style="color:#aaa;">(';
        if (extraLowPwrCoins > 0) mincovyText += '+' + extraLowPwrCoins + ' za F-Karty';
        if (extraLowPwrCoins > 0 && itemBonusCoins > 0) mincovyText += ', ';
        if (itemBonusCoins > 0) mincovyText += '<span style="color:#10b981;">+' + itemBonusCoins + ' z Predmetov</span>';
        mincovyText += ')</small>';
    }
    
    var odmenyHtml = '<div class="karta-surovina"><div class="surovina-badge">+' + coinsEarned + '</div><div class="surovina-foto" style="background-image: url(\'Img/mince.webp\');"></div><div class="surovina-stitok"><div class="surovina-nazov">' + mincovyText + '</div></div></div>';
    if (goldEarned > 0) odmenyHtml += '<div class="karta-surovina"><div class="surovina-badge">+' + goldEarned + ' oz</div><div class="surovina-foto" style="background-image: url(\'Img/zlato.webp\');"></div><div class="surovina-stitok"><div class="surovina-nazov">Hruda Zlata</div></div></div>';
    if (prizrakCount > 0) odmenyHtml += '<div class="karta cls-PRIZRAK-F"><div class="karta-kruh karta-kruh-cls cls-PRIZRAK-F">F</div><div class="karta-foto" style="background-image: url(\'Img/prizrak.webp\');"></div><div class="karta-stitok-spodok"><div class="karta-nazov">Prízrak (+' + prizrakCount + 'x)</div></div></div>';

    var dostupneFm = Object.keys(MASTER_REGISTRY).filter(function(m) { var r = MASTER_REGISTRY[m]; return !r.isPlatinum && !r.isSpell && !r.isPrizrak && !r.isTournamentUnique; });
    for (var i = 0; i < maxKariet; i++) {
        var randCardName = dostupneFm[Math.floor(Math.random() * dostupneFm.length)];
        if (!inventar.karty[randCardName]) inventar.karty[randCardName] = { repliky: { "F": 0 }, aktivnaTrieda: "F" };
        if (typeof inventar.karty[randCardName].repliky !== "object") inventar.karty[randCardName].repliky = { "F": 0 };
        inventar.karty[randCardName].repliky["F"] = (inventar.karty[randCardName].repliky["F"] || 0) + 1;
        var reg = getRegistryCard(randCardName); var realPwr = getRealPower({ n: randCardName, cls: "F" });
        odmenyHtml += '<div class="karta cls-F">' + vytvorHTMLKarty(randCardName, realPwr, "F", reg.row, reg.p) + '</div>';
    }

    var rewardsBox = document.createElement("div"); rewardsBox.className = "chest-rewards-modal";
    rewardsBox.innerHTML = '<h2>🎉 TRUHLA OTVORENÁ!</h2><p style="color:#aaa; font-size:1em;">Získal si odmeny z truhlice do svojej pokladnice:</p><div class="rewards-card-container">' + odmenyHtml + '</div><button onclick="zatvoritTruhluAOpustit(\'' + overlayElement.id + '\')" style="background:#10b981; color:#fff; border:none; padding:12px 35px; border-radius:6px; font-weight:bold; font-size:1.1em; cursor:pointer; margin-top:10px;">Zobrať Všetko do Batohu</button>';
    overlayElement.appendChild(rewardsBox); aktualizujPanelDielne(); aktualizujVsetkyStickyWallety();
}

function zatvoritTruhluAOpustit(overlayId) { var el = document.getElementById(overlayId); if (el) el.remove(); obnovitHudbuPoVideu(); zobraziťObrazovku("hlavne-menu"); }

function aktualizujPanelDielne() {
    var e = document.getElementById("dielna-zoznam"); if (!e) return; e.innerHTML = "";
    var devBtnDiv = document.createElement("div"); devBtnDiv.style.gridColumn = "1/-1"; devBtnDiv.style.marginBottom = "15px";
    devBtnDiv.innerHTML = '<button onclick="devPridatSurovinyACheaty()" style="background:#8b5cf6; color:#fff; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; cursor:pointer; width:100%;">⚡ DEV CHEAT: Pridať Suroviny</button>'; e.appendChild(devBtnDiv);

    var topPrizrak = "F";
    ["S", "A", "B", "C", "D", "E"].forEach(function(c) { if (inventar.prizraky[c] > 0) topPrizrak = c; });

    var prizrakWrapper = document.createElement("div"); prizrakWrapper.className = "karta-karta-wrapper"; prizrakWrapper.style.borderColor = "#a855f7";
    var prizrakCardDiv = document.createElement("div"); prizrakCardDiv.className = "karta cls-PRIZRAK-" + topPrizrak; 
    prizrakCardDiv.innerHTML = vytvorHTMLKarty("Prízrak", "none", topPrizrak, 0, 0);
    var prizrakCountsText = 'F:' + (inventar.prizraky["F"]||0) + ' | E:' + (inventar.prizraky["E"]||0) + ' | D:' + (inventar.prizraky["D"]||0) + ' | C:' + (inventar.prizraky["C"]||0) + ' | B:' + (inventar.prizraky["B"]||0) + ' | A:' + (inventar.prizraky["A"]||0);
    prizrakWrapper.appendChild(prizrakCardDiv); var prizrakActions = document.createElement("div"); prizrakActions.style.width = "100%";
    
    prizrakActions.innerHTML = '<div style="font-size:0.75em; margin:6px 0; color:#a855f7; text-align:center;">Prízrak Zásoby: <strong>' + prizrakCountsText + '</strong></div><select id="step-select-Prizrak" style="width:100%; font-size:0.75em; margin-bottom:4px; background:#110e0c; color:#ffcc00; border:1px solid #5a4d3e; padding:3px;"><option value="F->E">F ➔ E (3xF | 10m | 3 oz Koža)</option><option value="E->D">E ➔ D (3xE | 25m | 3 oz Drevo)</option><option value="D->C">D ➔ C (3xD | 50m | 3 oz Kov)</option><option value="C->B">C ➔ B (3xC | 100m | 3 oz Bronz)</option><option value="B->A">B ➔ A (3xB | 250m | 3 oz Striebro)</option></select><label style="font-size:0.75em; color:#aaa;">Zvitok ochrany:</label><select id="pergamen-select-Prizrak" style="width:100%; font-size:0.75em; margin-bottom:6px; background:#110e0c; color:#ffcc00; border:1px solid #5a4d3e; padding:3px;"><option value="none">Bez Zvitku</option><option value="basic">Základný Zvitok</option><option value="advanced">Pokročilý Zvitok</option><option value="legendary">Legendárny Zvitok</option></select><button class="btn-forge" style="background:#8b5cf6;" onclick="vylepsiKartuVoForge(\'Prízrak\', document.getElementById(\'step-select-Prizrak\').value, document.getElementById(\'pergamen-select-Prizrak\').value)">🔨 Vykuť Prízrak</button>';
    prizrakWrapper.appendChild(prizrakActions); e.appendChild(prizrakWrapper);

    Object.keys(MASTER_REGISTRY).forEach(function(t) {
        var reg = MASTER_REGISTRY[t]; if (reg.isPlatinum || reg.isSpell || reg.isPrizrak) return;
        if (!inventar.karty[t]) inventar.karty[t] = { repliky: { "F": 1 }, aktivnaTrieda: "F" }; var cardData = inventar.karty[t];
        
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
        if (reg.isTournamentUnique) {
            var c = topClass;
            if (c === "S") { 
                actions = '<div style="font-size:0.75em; margin:6px 0; color:#10b981; text-align:center; font-weight:bold;">MAXIMÁLNA ÚROVEŇ (S-Class)</div>'; 
            } else {
                var nC = (c === "F") ? "E" : ((c === "E") ? "D" : ((c === "D") ? "C" : ((c === "C") ? "B" : "A")));
                var trKey = c + "->" + nC;
                actions = '<div style="font-size:0.75em; margin:6px 0; color:#ffcc00; text-align:center;">👑 Unikát: Potrebuješ 2x Prízrak ('+c+'-Class)</div><label style="font-size:0.75em; color:#aaa;">Zvitok ochrany:</label><select id="pergamen-select-' + t.replace(/\s+/g, '') + '" style="width:100%; font-size:0.75em; margin-bottom:6px; background:#110e0c; color:#ffcc00; border:1px solid #5a4d3e; padding:3px;"><option value="none">Bez Zvitku</option><option value="basic">Základný Zvitok</option><option value="advanced">Pokročilý Zvitok</option><option value="legendary">Legendárny Zvitok</option></select><button class="btn-forge" style="background:#10b981;" onclick="vylepsiKartuVoForge(\'' + t.replace(/'/g, "\\'") + '\', \'' + trKey + '\', document.getElementById(\'pergamen-select-' + t.replace(/\s+/g, '') + '\').value)">🔨 Povýšiť na ' + nC + '</button>';
            }
        } else {
            var countsText = 'F:' + (cardData.repliky["F"] || 0) + ' | E:' + (cardData.repliky["E"] || 0) + ' | D:' + (cardData.repliky["D"] || 0) + ' | C:' + (cardData.repliky["C"] || 0) + ' | B:' + (cardData.repliky["B"] || 0) + ' | A:' + (cardData.repliky["A"] || 0) + ' | S:' + (cardData.repliky["S"] || 0);
            actions = '<div style="font-size:0.75em; margin:6px 0; color:#ffcc00; text-align:center;">' + countsText + '</div><select id="step-select-' + t.replace(/\s+/g, '') + '" style="width:100%; font-size:0.75em; margin-bottom:4px; background:#110e0c; color:#ffcc00; border:1px solid #5a4d3e; padding:3px;"><option value="F->E">F ➔ E (3xF | 10m | 3 oz Koža)</option><option value="E->D">E ➔ D (3xE | 25m | 3 oz Drevo)</option><option value="D->C">D ➔ C (3xD | 50m | 3 oz Kov)</option><option value="C->B">C ➔ B (3xC | 100m | 3 oz Bronz)</option><option value="B->A">B ➔ A (3xB | 250m | 3 oz Striebro)</option><option value="A->S">A ➔ S (3xA | 500m | 3 oz Zlato)</option></select><select id="pergamen-select-' + t.replace(/\s+/g, '') + '" style="width:100%; font-size:0.75em; margin-bottom:4px; background:#110e0c; color:#ffcc00; border:1px solid #5a4d3e; padding:3px;"><option value="none">Bez Zvitku</option><option value="basic">Základný Zvitok</option><option value="advanced">Pokročilý Zvitok</option><option value="legendary">Legendárny Zvitok</option></select><label style="font-size:0.75em; color:#a855f7;">Receptúra (Suroviny):</label><select id="mix-select-' + t.replace(/\s+/g, '') + '" style="width:100%; font-size:0.75em; margin-bottom:6px; background:#110e0c; color:#a855f7; border:1px solid #a855f7; padding:3px;"><option value="3,0">3x Reálna Karta</option><option value="2,1">2x Karta + 1x Prízrak</option><option value="1,2">1x Karta + 2x Prízrak</option><option value="0,3">3x Prízrak</option></select><button class="btn-forge" onclick="vylepsiKartuVoForge(\'' + t.replace(/'/g, "\\'") + '\', document.getElementById(\'step-select-' + t.replace(/\s+/g, '') + '\').value, document.getElementById(\'pergamen-select-' + t.replace(/\s+/g, '') + '\').value, document.getElementById(\'mix-select-' + t.replace(/\s+/g, '') + '\').value)">🔨 Forge</button>';
        }

        wrapper.appendChild(cardDiv); var actDiv = document.createElement("div"); actDiv.style.width = "100%"; actDiv.innerHTML = actions; wrapper.appendChild(actDiv); e.appendChild(wrapper);
    });
} // koniec funkcie aktualizujPanelDielne

        

function devPridatSurovinyACheaty() {
    inventar.mince += 100000; inventar.suroviny["Koža"] = (inventar.suroviny["Koža"] || 0) + 100; inventar.suroviny["Drevo"] = (inventar.suroviny["Drevo"] || 0) + 100; inventar.suroviny["Kov"] = (inventar.suroviny["Kov"] || 0) + 100; inventar.suroviny["Bronz"] = (inventar.suroviny["Bronz"] || 0) + 100; inventar.suroviny["Striebro"] = (inventar.suroviny["Striebro"] || 0) + 100; inventar.suroviny["Zlato"] = (inventar.suroviny["Zlato"] || 0) + 5000;
    inventar.prizraky["F"] = (inventar.prizraky["F"] || 0) + 30; inventar.prizraky["E"] = (inventar.prizraky["E"] || 0) + 20; inventar.prizraky["D"] = (inventar.prizraky["D"] || 0) + 15; inventar.prizraky["C"] = (inventar.prizraky["C"] || 0) + 10; inventar.prizraky["B"] = (inventar.prizraky["B"] || 0) + 10; inventar.prizraky["A"] = (inventar.prizraky["A"] || 0) + 10;
    Object.keys(MASTER_REGISTRY).forEach(function(t) { var reg = MASTER_REGISTRY[t]; if (!reg.isPlatinum && !reg.isSpell && !reg.isPrizrak && !reg.isTournamentUnique) { if (!inventar.karty[t]) inventar.karty[t] = { repliky: {}, aktivnaTrieda: "F" }; inventar.karty[t].repliky = { "F": 20, "E": 10, "D": 10, "C": 10, "B": 10, "A": 10 }; } });
    if (!inventar.karty["Kráľovský Šampión"]) inventar.karty["Kráľovský Šampión"] = { repliky: { "F": 1 }, aktivnaTrieda: "F" };
    ukazOznamenie("⚡ DEV CHEAT AKTIVOVANÝ", "Pridané mince, Zlato (oz), Prízraky, suroviny (oz) a duplikáty!");
    aktualizujPanelDielne(); aktualizujVsetkyStickyWallety();
}

function vylepsiKartuVoForge(meno, transitionKey, pergamenType, mixValue) {
    var cfg = FORGE_RATES[transitionKey]; if (!cfg) return;
    var fromCls = cfg.from; var nextCls = cfg.nextClass; var reg = getRegistryCard(meno);

    if (reg.isPrizrak) {
        var countPrizraky = inventar.prizraky[fromCls] || 0;
        if (countPrizraky < 3) { ukazOznamenie("⚠️ NEDOSTATOK PRÍZRAKOV", "Potrebuješ 3x " + fromCls + "-Prízrakov na povýšenie!"); return; }
    } else if (reg.isTournamentUnique) {
        var t = inventar.karty[meno];
        if (!t) { inventar.karty[meno] = { repliky: {}, aktivnaTrieda: "F" }; t = inventar.karty[meno]; }
        var aktualnaTriedaSkutocna = t.aktivnaTrieda || "F";
        if (aktualnaTriedaSkutocna !== fromCls) { ukazOznamenie("⚠️ NESPRÁVNA TRIEDA", "Tvoj Kráľovský Šampión má aktuálne triedu <strong>" + aktualnaTriedaSkutocna + "-Class</strong>!"); return; }
        var countPrizraky = inventar.prizraky[fromCls] || 0;
        if (countPrizraky < 2) { ukazOznamenie("⚠️ CHÝBAJÚ PRÍZRAKY", "Na povýšenie Kráľovského Šampióna potrebuješ 2x <strong>Prízrak (" + fromCls + "-Class)</strong>!"); return; }
    } else {
        var t = inventar.karty[meno]; if (!t) return;
        var countCurrent = (typeof t.repliky === "object") ? (t.repliky[fromCls] || 0) : t.repliky;
        var countPrizrak = inventar.prizraky[fromCls] || 0;
        
        var reqReal = 3, reqPrizrak = 0;
        if (mixValue) { var pts = mixValue.split(","); reqReal = parseInt(pts[0]); reqPrizrak = parseInt(pts[1]); }
        
        if (countCurrent < reqReal) { ukazOznamenie("⚠️ NEDOSTATOK KARIET", "Pre túto receptúru potrebuješ <strong>" + reqReal + "x Reálnu kartu</strong> (máš len " + countCurrent + ")."); return; }
        if (countPrizrak < reqPrizrak) { ukazOznamenie("⚠️ NEDOSTATOK PRÍZRAKOV", "Pre túto receptúru potrebuješ <strong>" + reqPrizrak + "x Prízrak</strong> (máš len " + countPrizrak + ")."); return; }
    }

    var reqMat = cfg.reqMat;
    if ((inventar.suroviny[reqMat] || 0) < cfg.reqMatCount) { ukazOznamenie("⚠️ NEDOSTATOK SUROVÍN", "Potrebuješ " + cfg.reqMatCount + " oz " + reqMat + "!"); return; }
    if (inventar.mince < cfg.coinFee) { ukazOznamenie("⚠️ NEDOSTATOK MINCÍ", "Potrebuješ " + cfg.coinFee + "m za poplatok!"); return; }

    var pCfg = PERGAMENY_CONFIG[pergamenType || "none"];
    inventar.mince -= cfg.coinFee; inventar.suroviny[reqMat] -= cfg.reqMatCount;
    var finalRate = Math.min(0.95, cfg.rate + pCfg.rateBonus); var roll = Math.random(); var isSuccess = (roll <= finalRate);
    spustitVideoAnimationKovania(meno, fromCls, nextCls, isSuccess, pCfg.saveCard, mixValue);
}

function spustitVideoAnimationKovania(meno, oldCls, nextCls, isSuccess, wasProtected,mixValue) {
    pozastavitHudbuPreVideo();
    var overlay = document.createElement("div"); overlay.id = "forge-video-overlay";
    var reg = getRegistryCard(meno); var oldPwr = getRealPower({ n: meno, cls: oldCls }); var nextPwr = getRealPower({ n: meno, cls: nextCls });
    var slot1Html = "", slot2Html = "", slot3Html = "";

    if (reg.isTournamentUnique) {
        slot1Html = '<div id="forge-card-1" class="karta cls-' + oldCls + ' forge-slot-card">' + vytvorHTMLKarty("Kráľovský Šampión", oldPwr, oldCls, 1, reg.p) + '</div>';
        slot2Html = '<div id="forge-card-2" class="karta cls-PRIZRAK-' + oldCls + ' forge-slot-card">' + vytvorHTMLKarty("Prízrak", "none", oldCls, 0, 0) + '</div>';
        slot3Html = '<div id="forge-card-3" class="karta cls-PRIZRAK-' + oldCls + ' forge-slot-card">' + vytvorHTMLKarty("Prízrak", "none", oldCls, 0, 0) + '</div>';
    } else {
        slot1Html = '<div id="forge-card-1" class="karta cls-' + oldCls + ' forge-slot-card">' + vytvorHTMLKarty(meno, oldPwr, oldCls, reg.row, reg.p) + '</div>';
        slot2Html = '<div id="forge-card-2" class="karta cls-' + oldCls + ' forge-slot-card">' + vytvorHTMLKarty(meno, oldPwr, oldCls, reg.row, reg.p) + '</div>';
        slot3Html = '<div id="forge-card-3" class="karta cls-' + oldCls + ' forge-slot-card">' + vytvorHTMLKarty(meno, oldPwr, oldCls, reg.row, reg.p) + '</div>';
    }

    var fourthCardHtml = isSuccess ? '<div id="forge-card-4" class="karta cls-' + nextCls + ' forge-slot-card" style="opacity:0;">' + vytvorHTMLKarty(meno, nextPwr, nextCls, reg.row, reg.p) + '</div>' : '';
    overlay.innerHTML = '<div class="forge-stage-169"><video id="forge-video-element" src="Img/vylepsovanie.mp4" autoplay playsinline webkit-playsinline></video><div class="forge-cards-container">' + slot1Html + slot2Html + slot3Html + fourthCardHtml + '</div></div>';
    document.body.appendChild(overlay);

    var card1 = document.getElementById("forge-card-1"); var card2 = document.getElementById("forge-card-2"); var card3 = document.getElementById("forge-card-3"); var card4 = document.getElementById("forge-card-4");
    setTimeout(function() { if (card1) card1.style.opacity = "0"; if (card2) card2.style.opacity = "0"; if (card3) card3.style.opacity = "0"; }, 3800);
    setTimeout(function() { if (isSuccess && card4) card4.style.opacity = "1"; }, 7800);

    var vid = document.getElementById("forge-video-element"); if (vid) vid.play().catch(function(){});

    vid.onended = function() {
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
                // NOVÉ: Kontrola zvitku - ak nebol chránený, Prízrak zhorí. Ak bol, zachráni sa!
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
            
            var reqReal = 3, reqPrizrak = 0;
            if (mixValue) { var pts = mixValue.split(","); reqReal = parseInt(pts[0]); reqPrizrak = parseInt(pts[1]); }

            if (isSuccess) {
                t.repliky[oldCls] = Math.max(0, availableReal - reqReal);
                if (reqPrizrak > 0) inventar.prizraky[oldCls] = Math.max(0, availablePrizrak - reqPrizrak);
                t.aktivnaTrieda = nextCls; if (nextCls !== "S") t.repliky[nextCls] = (t.repliky[nextCls] || 0) + 1;
                ukazOznamenie("🎉 KOVANIE ÚSPEŠNÉ!", "Karta <strong>" + meno + "</strong> povýšená na <strong>" + nextCls + "-Class</strong>!<br>(Použité: " + reqReal + "x Karta, " + reqPrizrak + "x Prízrak)");
                if (nextCls === "S") vyhlasGlobalnySClassOznam("Hráč 1 (Ty)", meno);
            } else {
                if (!wasProtected) {
                    if (reqReal > 0 && availableReal > 0) {
                        t.repliky[oldCls] = Math.max(0, availableReal - 1);
                        ukazOznamenie("💥 KOVANIE ZLYHALO!", "Suroviny zhoreli a prišiel si o 1x Reálnu kartu!");
                    } else if (reqPrizrak > 0 && availablePrizrak > 0) {
                        inventar.prizraky[oldCls] = Math.max(0, availablePrizrak - 1);
                        ukazOznamenie("💥 KOVANIE ZLYHALO!", "Suroviny zhoreli a prišiel si o 1x Prízrak!");
                    }
                } else {
                    ukazOznamenie("🛡️ KARTA OCHRÁNENÁ!", "Kovanie zlyhalo, ale Zvitok ochrany materiál zachránil!");
                }
            }
        }
        overlay.remove(); obnovitHudbuPoVideu(); aktualizujPanelDielne(); aktualizujVsetkyStickyWallety();
    };
}

// =====================================================================
// [SEKCIA 4 - JS] TRHOVISKO, PREDAJ A SKLAD
// =====================================================================
var aukcnyCasomeračInterval = null; var aktualnyAnonymnyStrop = 250; var trhovaPriemernaCenaEMA = 210; var pocetRealnychPredajovEMA = 0; var aktualnyVeduciHrac = "Lord_Grob_33"; var hracovaAktivnaPonukaNaTrhu = 0;

function prepniZalozkuTrhu(tabName) {
    aktualnaZalozkaTrhu = tabName; document.querySelectorAll(".btn-market-tab").forEach(function(b) { b.classList.remove("active-market-tab"); });
    if (tabName === "trh") document.getElementById("btn-tab-trh").classList.add("active-market-tab");
    if (tabName === "sklad") document.getElementById("btn-tab-sklad").classList.add("active-market-tab");
    if (tabName === "predaj") document.getElementById("btn-tab-predaj").classList.add("active-market-tab");
    vygenerujSimulaciuTrhu();
}

function vygenerujSimulaciuTrhu() {
    var e = document.getElementById("obchod-regaly-zoznam"); if (!e) return; e.innerHTML = ""; aktualizujVsetkyStickyWallety();

    if (aktualnaZalozkaTrhu === "trh") {
        var aukcnaKarta = (Math.random() > 0.5) ? "Neviditeľný Mário" : "Kráľovský Šampión";
        var aukcnaTrieda = (aukcnaKarta === "Kráľovský Šampión") ? "A" : "E";
        var reg = getRegistryCard(aukcnaKarta) || MASTER_REGISTRY["Neviditeľný Mário"]; 
        var realPwr = getRealPower({ n: aukcnaKarta, cls: aukcnaTrieda });
        
        trhovaPriemernaCenaEMA = 210; 
        if (aukcnaTrieda === "A") trhovaPriemernaCenaEMA = 850;
        if (reg.isTournamentUnique) { trhovaPriemernaCenaEMA = trhovaPriemernaCenaEMA * 10; } 
        aktualnyAnonymnyStrop = Math.floor(trhovaPriemernaCenaEMA * 1.2); 

        var emaTypLabel = (pocetRealnychPredajovEMA >= 3) ? '<span style="color:#10b981; font-size:0.8em;">(🛒 Reálna trhová cena)</span>' : '<span style="color:#f59e0b; font-size:0.8em;">(⚙️ Vypočítaná obstarávacia cena)</span>';
        var textKusov = (aukcnaKarta === "Kráľovský Šampión") ? "1x Unikát" : "10x Balíček";
        e.innerHTML = '<div style="background:rgba(30,20,10,0.85); border:2px solid #d4af37; padding:15px; border-radius:10px; text-align:center; margin-bottom:20px;"><h3 style="color:#d4af37; margin-top:0;">👑 ANONYMNÉ AUKČNÉ TRHOVISKO</h3><p style="font-size:0.9em; color:#ccc;">Súťaž o vzácne položky od iných hráčov na serveri!</p><div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:10px;"><button onclick="testSimulaciaPrihodeniaBota()" class="btn-dev-action">🤖 Simulovať prihodenie Bota</button><button onclick="testSimulaciaRychlychPredajov()" class="btn-dev-action">📊 Simulovať reálny predaj (Prepnúť EMA)</button></div></div><div class="auction-card-box"><div class="karta cls-' + aukcnaTrieda + '">' + vytvorHTMLKarty(aukcnaKarta, realPwr, aukcnaTrieda, reg.row, reg.p) + '</div><div style="flex-grow:1;"><h3 style="color:#ffcc00; margin:0 0 5px 0;">' + aukcnaKarta + ' (' + aukcnaTrieda + '-Class) - 10x Balíček</h3><p style="margin:2px 0; color:#aaa; font-size:0.9em;">Predajca: <strong>Mníchov_Master</strong></p><div style="background:rgba(0,0,0,0.6); border:1px solid #5a4d3e; padding:12px; border-radius:6px; margin:10px 0; max-width:480px;"><div>⏱️ Čas aukcie: <span id="auction-timer" style="color:#ffcc00; font-weight:bold;">00:59:59</span> <small style="color:#888;">(Anti-Snipe: +3m)</small></div><div style="margin-top:4px;">👑 Aktuálne najvyššia ponuka (Vedie): <strong style="color:#ffcc00;" id="auction-leader">' + aktualnyVeduciHrac + '</strong></div><div style="margin-top:4px;">📊 Indikátor Ceny (EMA): <strong style="color:#3b82f6;">' + trhovaPriemernaCenaEMA + ' m</strong> ' + emaTypLabel + '</div><div style="margin-top:4px;">💰 Okamžitý Výkup (Strop): <strong style="color:#10b981;">' + aktualnyAnonymnyStrop + ' m</strong></div></div><div style="display:flex; gap:10px;"><button onclick="anonymnePrihoditSumu(' + aktualnyAnonymnyStrop + ')" style="background:linear-gradient(180deg, #3b2d1d 0%, #21180e 100%); color:#ffcc00; border:1px solid #d4af37; padding:10px 18px; border-radius:6px; font-weight:bold; cursor:pointer;">🕵️ Anonymne Prihodiť</button><button onclick="okamziteOdkupitKartu(' + aktualnyAnonymnyStrop + ', \'Balíček 10x ' + aukcnaTrieda + '-' + aukcnaKarta + '\')" style="background:#10b981; color:#fff; border:none; padding:10px 18px; border-radius:6px; font-weight:bold; cursor:pointer;">⚡ Kúpiť Ihneď za ' + aktualnyAnonymnyStrop + 'm</button></div></div></div>';
        spustitOdpocitavanieAukcie();
    } else if (aktualnaZalozkaTrhu === "sklad") {
        var skladHtml = '<div style="background:rgba(30,20,10,0.85); border:2px solid #d4af37; padding:15px; border-radius:10px; text-align:center; margin-bottom:15px;"><h3 style="color:#d4af37; margin-top:0;">🏛️ KRÁĽOVSKÝ ŠTÁTNY SKLAD (NÚDZOVÉ ZÁSOBY)</h3><p style="font-size:0.9em; color:#ccc;">Ak na trhu chýbajú suroviny, štát ti ich garantovane predá za mince.</p></div><div class="market-store-grid">';
        Object.keys(STATNY_SKLAD_CENNIK).forEach(function(mat) {
            var item = STATNY_SKLAD_CENNIK[mat];
            skladHtml += '<div class="market-store-card"><img src="' + item.img + '" class="market-store-img"><strong style="color:#ffcc00; font-size:1em;">' + mat + '</strong><span style="color:#aaa; font-size:0.85em;">Cena: <strong style="color:#ffcc00;">' + item.price + ' m / 1 oz</strong></span><div style="display:flex; gap:6px; margin-top:6px;"><button onclick="kupitSurovinuZoStatnehoSkladu(\'' + mat + '\', 1)" style="background:#3b2d1d; color:#ffcc00; border:1px solid #d4af37; padding:5px 8px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:0.8em;">+1 oz</button><button onclick="kupitSurovinuZoStatnehoSkladu(\'' + mat + '\', 5)" style="background:#10b981; color:#fff; border:none; padding:5px 8px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:0.8em;">+5 oz</button></div></div>';
        });
        skladHtml += '</div>'; e.innerHTML = skladHtml;
    } else if (aktualnaZalozkaTrhu === "predaj") {
        var dostupneKarty = Object.keys(inventar.karty).filter(function(k) { return typeof inventar.karty[k].repliky === "object"; });
        var optionsHtml = ""; dostupneKarty.forEach(function(k) { optionsHtml += '<option value="' + k + '">' + k + '</option>'; });
        var predajHtml = '<div class="sell-form-container"><h3 style="color:#ffcc00; margin-top:0; text-align:center; font-family:Georgia, serif;">📦 VYVESIŤ NOVÚ AUKCIU NA TRHOVISKO</h3><div class="sell-form-row"><label>1. Vyber kartu z batohu:</label><select id="sell-card-select" class="sell-form-select" onchange="aktualizujDostupneTriedyPrePredaj()">' + optionsHtml + '</select></div><div class="sell-form-row"><label>2. Vyber triedu karty:</label><select id="sell-class-select" class="sell-form-select" onchange="aktualizujMaxKusovPrePredaj()"><option value="F">F-Class</option><option value="E">E-Class</option><option value="D">D-Class</option><option value="C">C-Class</option><option value="B">B-Class</option><option value="A">A-Class</option></select></div><div class="sell-form-row"><label>3. Počet kusov v balíku: <strong id="sell-count-label" style="color:#ffcc00;">1x</strong> (Skladom: <span id="sell-max-stock">1</span>x)</label><input type="range" id="sell-count-range" min="1" max="1" value="1" style="width:100%;" oninput="document.getElementById(\'sell-count-label\').innerText = this.value + \'x\';"></div><div class="sell-form-row"><label>4. Cena Okamžitého výkupu (m):</label><input type="number" id="sell-price-input" class="sell-form-input" value="35" min="1"></div><div style="text-align:center; margin-top:15px;"><button onclick="odoslatPredajnyFormular()" style="background:#10b981; color:#fff; border:none; padding:12px 30px; border-radius:6px; font-weight:bold; font-size:1.05em; cursor:pointer; width:100%;">🚀 Potvrdiť a Vyvesiť na Trh</button></div></div>';
        predajHtml += '<h4 style="color:#d4af37; text-align:center;">📋 PREHĽAD TVOJICH ZÁSOB V BATOHU</h4><div class="dielna-grid">';
        Object.keys(inventar.karty).forEach(function(kName) {
            var cData = inventar.karty[kName]; var reg = getRegistryCard(kName);
            if (typeof cData.repliky === "object") {
                Object.keys(cData.repliky).forEach(function(cls) {
                    var count = cData.repliky[cls] || 0;
                    if (count > 0) {
                        var isInDeck = (inventar.zostava.indexOf(kName) !== -1); var deckTag = isInDeck ? '<span style="color:#ff4d4d; font-size:0.75em; display:block;">⚠️ V BALÍČKU</span>' : '';
                        predajHtml += '<div class="karta-karta-wrapper"><div class="karta cls-' + cls + '">' + vytvorHTMLKarty(kName, getRealPower({n:kName, cls:cls}), cls, reg.row, reg.p, false) + '</div><div style="font-size:0.8em; margin:6px 0; color:#ffcc00; text-align:center;">Na sklade: <strong>' + count + 'x</strong>' + deckTag + '</div></div>';
                    }
                });
            }
        });
        predajHtml += '</div>'; e.innerHTML = predajHtml; setTimeout(aktualizujDostupneTriedyPrePredaj, 50);
    }
}

function aktualizujDostupneTriedyPrePredaj() {
    var kNameEl = document.getElementById("sell-card-select"); if (!kNameEl) return;
    var kName = kNameEl.value; var cData = inventar.karty[kName]; var sel = document.getElementById("sell-class-select");
    if (!sel || !cData) return; sel.innerHTML = "";
    ["F", "E", "D", "C", "B", "A"].forEach(function(cls) { if (cData.repliky && cData.repliky[cls] > 0) sel.innerHTML += '<option value="' + cls + '">' + cls + '-Class (' + cData.repliky[cls] + 'x)</option>'; });
    aktualizujMaxKusovPrePredaj();
}

function aktualizujMaxKusovPrePredaj() {
    var kNameEl = document.getElementById("sell-card-select"); var clsEl = document.getElementById("sell-class-select");
    if (!kNameEl || !clsEl) return; var kName = kNameEl.value; var cls = clsEl.value; var cData = inventar.karty[kName];
    var max = (cData && cData.repliky && cData.repliky[cls]) ? cData.repliky[cls] : 1;
    var range = document.getElementById("sell-count-range"); var stockLabel = document.getElementById("sell-max-stock"); var countLabel = document.getElementById("sell-count-label");
    if (range) { range.max = max; range.value = 1; }
    if (stockLabel) stockLabel.innerText = max; if (countLabel) countLabel.innerText = "1x";
}

function odoslatPredajnyFormular() {
    var kName = document.getElementById("sell-card-select").value; var cls = document.getElementById("sell-class-select").value;
    var count = parseInt(document.getElementById("sell-count-range").value); var price = parseInt(document.getElementById("sell-price-input").value);
    if (isNaN(price) || price <= 0) { ukazOznamenie("⚠️ CHYBA", "Zadaj platnú cenu!"); return; }
    
    // NOVÉ: Tvrdý blok predaja, ak je karta v zostave!
    if (inventar.zostava.indexOf(kName) !== -1) { 
        ukazOznamenie("⛔ ZAMIETNUTÉ", "Karta <strong>" + kName + "</strong> je v tvojej bojovej zostave!<br>Ak ju chceš predať, musíš ju najprv vybrať z balíčka v Deckbuilderi."); 
        return; 
    }

    inventar.karty[kName].repliky[cls] -= count;
    var hasRemaining = false; Object.keys(inventar.karty[kName].repliky).forEach(function(cKey) { if (inventar.karty[kName].repliky[cKey] > 0) hasRemaining = true; });
    if (!hasRemaining) { inventar.karty[kName].repliky["F"] = 1; inventar.karty[kName].aktivnaTrieda = "F"; }

    ukazOznamenie("🎉 POLOŽKA ZALISTOVANÁ", "Balík **" + count + "x " + kName + " (" + cls + "-Class)** bol vyvesený na trh za " + price + " mincí!");
    vygenerujSimulaciuTrhu(); aktualizujVsetkyStickyWallety(); vygenerujDeckbuilder();
} // koniec funkcie odoslatPredajnyFormular

function kupitSurovinuZoStatnehoSkladu(mat, pocetOz) {
    var item = STATNY_SKLAD_CENNIK[mat]; if (!item) return;
    var celkovaCena = item.price * pocetOz;
    if (inventar.mince < celkovaCena) { ukazOznamenie("⚠️ NEDOSTATOK MINCÍ", "Na nákup potrebuješ " + celkovaCena + " mincí!"); return; }
    inventar.mince -= celkovaCena; inventar.suroviny[mat] = (inventar.suroviny[mat] || 0) + pocetOz;
    ukazOznamenie("🏛️ NÁKUP", "Kúpil si **" + pocetOz + " oz " + mat + "** za " + celkovaCena + " mincí!"); aktualizujVsetkyStickyWallety();
}

function anonymnePrihoditSumu(stropVal) {
    var ponuka = parseInt(prompt("Zadaj svoju tajnú anonymnú ponuku (Strop výkupu: " + stropVal + "m):"));
    if (isNaN(ponuka) || ponuka <= 0) { ukazOznamenie("⚠️ CHYBA", "Zadaj platné číslo!"); return; }
    if (inventar.mince < ponuka) { ukazOznamenie("⚠️ NEDOSTATOK MINCÍ", "Nemáš dostatok mincí!"); return; }

    if (ponuka >= stropVal) {
        inventar.mince -= stropVal; hracovaAktivnaPonukaNaTrhu = 0; pocetRealnychPredajovEMA++;
        ukazOznamenie("⚡ AUTOMATICKÝ VÝKUP!", "Položka je okamžite tvoja za " + stropVal + "m!"); aktualizujVsetkyStickyWallety();
    } else {
        inventar.mince -= ponuka; hracovaAktivnaPonukaNaTrhu = ponuka; aktualnyVeduciHrac = "Hráč 1 (Ty)";
        var lEl = document.getElementById("auction-leader"); if (lEl) lEl.innerText = aktualnyVeduciHrac;
        ukazOznamenie("🕵️ PONUKA ZAREGISTROVANÁ", "Tvoja ponuka " + ponuka + "m ťa posunula na 1. miesto!"); aktualizujVsetkyStickyWallety();
    }
}

function okamziteOdkupitKartu(stropVal, nazov) {
    if (inventar.mince < stropVal) { ukazOznamenie("⚠️ NEDOSTATOK MINCÍ", "Potrebuješ " + stropVal + "m!"); return; }
    
    // Zistenie, čo vlastne kupujeme z 'nazov' (napr. "Balíček 10x E-Neviditeľný Mário")
    var pocet = nazov.includes("10x") ? 10 : 1;
    var triedaKarty = nazov.includes("-") ? nazov.split("-")[0].slice(-1) : "F";
    var menoKarty = nazov.includes("-") ? nazov.substring(nazov.indexOf("-") + 1) : "Prízrak";

    // Pridanie nakúpenej karty do inventára hráča
    if (!inventar.karty[menoKarty]) inventar.karty[menoKarty] = { repliky: { "F": 0 }, aktivnaTrieda: "F" };
    if (typeof inventar.karty[menoKarty].repliky !== "object") inventar.karty[menoKarty].repliky = { "F": 0 };
    inventar.karty[menoKarty].repliky[triedaKarty] = (inventar.karty[menoKarty].repliky[triedaKarty] || 0) + pocet;
    
    // Odpočítanie mincí a vyčistenie ponuky
    inventar.mince -= stropVal; hracovaAktivnaPonukaNaTrhu = 0; pocetRealnychPredajovEMA++;
    
    // Krásne oznámenie o úspechu
    ukazOznamenie("🎉 KÚPENÉ IHNEĎ!", "Zaplatil si " + stropVal + "m. Tvoj batoh sa rozšíril o:<br><br><strong style='color:#10b981; font-size:1.1em;'>" + pocet + "x " + menoKarty + " (" + triedaKarty + "-Class)</strong>"); 
    
    // Obnova UI
    vygenerujSimulaciuTrhu(); 
    aktualizujVsetkyStickyWallety();
} // koniec funkcie okamziteOdkupitKartu

function testSimulaciaPrihodeniaBota() {
    aktualnyVeduciHrac = "Bot_Tester_" + Math.floor(Math.random() * 100);
    var lEl = document.getElementById("auction-leader"); if (lEl) lEl.innerText = aktualnyVeduciHrac;
    if (hracovaAktivnaPonukaNaTrhu > 0) {
        inventar.mince += hracovaAktivnaPonukaNaTrhu;
        ukazOznamenie("🤖 PREBITIE PONUKY", "Súper ťa prehodil! Tvojich **" + hracovaAktivnaPonukaNaTrhu + " m** ti bolo vrátených späť!");
        hracovaAktivnaPonukaNaTrhu = 0; aktualizujVsetkyStickyWallety();
    } else { ukazOznamenie("🤖 PRIHODENIE BOTA", "Súper práve prevzal 1. miesto na trhu!"); }
}

function testSimulaciaRychlychPredajov() {
    pocetRealnychPredajovEMA = 5; trhovaPriemernaCenaEMA = Math.floor(Math.random() * 60) + 190; vygenerujSimulaciuTrhu();
    ukazOznamenie("📊 PREPNUTIE EMA", "Indikátor prepnutý na Reálnu trhovú cenu: **" + trhovaPriemernaCenaEMA + " m**!");
}

function spustitOdpocitavanieAukcie() {
    if (aukcnyCasomeračInterval) clearInterval(aukcnyCasomeračInterval); var sekundyCelkom = 3599;
    aukcnyCasomeračInterval = setInterval(function() {
        var timerEl = document.getElementById("auction-timer"); if (!timerEl) { clearInterval(aukcnyCasomeračInterval); return; }
        var h = Math.floor(sekundyCelkom / 3600); var m = Math.floor((sekundyCelkom % 3600) / 60); var s = sekundyCelkom % 60;
        timerEl.innerText = (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
        if (sekundyCelkom > 0) sekundyCelkom--; else clearInterval(aukcnyCasomeračInterval);
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
    var rowSetBonus = vypocitajSetBonusRadu(reg.row, myCards); var basePwr = getRealPower(card);

    if (card.n !== "Oli") {
        if (reg.row === 1 && neutralne_vplyvy.indexOf("Musíme sa porozprávať") !== -1) basePwr = 1;
        if (reg.row === 2 && neutralne_vplyvy.indexOf("Upokoj sa") !== -1) basePwr = 1;
        if (reg.row === 3 && neutralne_vplyvy.indexOf("Ohnostroj") !== -1) basePwr = 1;
    }

    basePwr += itemBonus + rowSetBonus;
    var rowMultiplier = 1.0;
    var hasAlkohol = myCards.some(function(c) { return c.n === "Alcohol"; });
    var myErikRow = (pNum === 1) ? p1_erik_buff_row : p2_erik_buff_row;

    if (!isNelaOnTable && card.n !== "Oli") {
        if (reg.row === 1 && myCards.some(function(c) { return c.n === "Sisa"; })) rowMultiplier += 0.50;
        if (reg.row === 2 && card.n === "Ďuri" && hasAlkohol) rowMultiplier += 1.00;
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

function vypocitajSetBonusRadu(targetRow, cardList) {
    var cardsInRow = cardList.filter(function(c) { return getRegistryCard(c.n).row === targetRow; });
    var countE = 0, countD = 0, countC = 0, countB = 0, countA = 0, countS = 0;
    
    cardsInRow.forEach(function(c) {
        var cls = c.cls || "F";
        if (cls === "E") countE++; if (cls === "D") countD++; if (cls === "C") countC++; if (cls === "B") countB++; if (cls === "A") countA++; if (cls === "S") countS++;
    });
    
    var bonusTotal = 0;
    if (countS >= 1) bonusTotal += 1; 
    if (countA >= 2) bonusTotal += 1; 
    if (countB >= 3) bonusTotal += 1; 
    if (countC >= 4) bonusTotal += 1; 
    if (countD >= 5) bonusTotal += 1; 
    if (countE >= 6) bonusTotal += 1;
    
    return bonusTotal;
} // koniec funkcie vypocitajSetBonusRadu

function otvorErikBuffDialog(pNum, callback) {
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
    modal.innerHTML = '<div class="custom-notify-box"><h3 class="custom-notify-title">📢 ERIK - VOĽBA RADU (+50%)</h3><div style="display:flex; gap:8px; justify-content:center; margin-top:15px;"><button onclick="zvolErikRow(1)" class="btn-dev-action">1. Muži</button><button onclick="zvolErikRow(2)" class="btn-dev-action">2. Ženy</button><button onclick="zvolErikRow(3)" class="btn-dev-action">3. Zvieratá</button></div></div>';
    document.body.appendChild(modal);

    window.zvolErikRow = function(r) {
        if (pNum === 1) p1_erik_buff_row = r; else p2_erik_buff_row = r;
        modal.remove(); ukazOznamenie("📢 ERIK AKTIVOVANÝ", "Posilnil si **" + r + ". Rad** o +50%!");
        if (typeof callback === "function") callback();
    };
}

// =====================================================================
// [SEKCIA 6 - JS] ZÁPAS, MULLIGAN A UMELÁ INTELIGENCIA
// =====================================================================
function spustitZapasLokálnePVP() { 
    if (inventar.zostava.length < 25) { ukazOznamenie("⚠️ NEÚPLNÁ ZOSTRAVA", "Potrebuješ aspoň 25 kariet v zostave!"); return; }
    jeSingleplayer = false; inicializujNovyZapas(); 
}

function zobraziťMenuAI() { 
    if (inventar.zostava.length < 25) { ukazOznamenie("⚠️ NEÚPLNÁ ZOSTRAVA", "Potrebuješ aspoň 25 kariet v zostave!"); return; }
    var obt = prompt("Vyber obtiažnosť AI (A, B, C):", "B"); if (obt) { obtiaznostAI = obt.toUpperCase(); spustitZapasProtiAI(); } 
}

function spustitZapasProtiAI() { 
    if (inventar.zostava.length < 25) { ukazOznamenie("⚠️ NEÚPLNÁ ZOSTRAVA", "Potrebuješ aspoň 25 kariet v zostave!"); return; }
    jeSingleplayer = true; inicializujNovyZapas(); 
}

var cisloKola = 1;

function inicializujNovyZapas() {
    p1_pouzite_predmety = [];
    p1_played_cards = []; p2_played_cards = []; p1_spalene = []; p2_spalene = []; odhodene_karty_kola = [];
    neutralne_vplyvy = []; p1_erik_buff_row = null; p2_erik_buff_row = null;
    r1 = 0; r2 = 0; sc1 = 0; sc2 = 0; p1Pass = false; p2Pass = false;
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
    var el = document.getElementById("mulligan-modal-overlay"); if (el) el.remove();
    if (chceVymenu && mulliganSelectedIndices.length > 0) {
        mulliganSelectedIndices.sort(function(a, b) { return b - a; }); var pocetVymen = mulliganSelectedIndices.length;
        mulliganSelectedIndices.forEach(function(idx) { p1_draft_hand.splice(idx, 1); });
        for (var i = 0; i < pocetVymen; i++) { 
            if (p1_active_deck.length > 0) { 
                var nK = p1_active_deck.pop(); 
                var cardCls = "F";
                if (inventar.karty[nK]) {
                    var regItem = getRegistryCard(nK);
                    if (regItem.isTournamentUnique) {
                        cardCls = inventar.karty[nK].aktivnaTrieda || "F";
                    } else if (inventar.karty[nK].repliky) {
                        var rep = inventar.karty[nK].repliky;
                        if (rep["S"] > 0) cardCls = "S"; else if (rep["A"] > 0) cardCls = "A"; else if (rep["B"] > 0) cardCls = "B"; else if (rep["C"] > 0) cardCls = "C"; else if (rep["D"] > 0) cardCls = "D"; else if (rep["E"] > 0) cardCls = "E";
                    }
                }
                p1_draft_hand.push({ n: nK, cls: cardCls }); 
            } 
        }
        // NOVÉ: Presný výpočet bodov (1 karta = 2b, 2 karty = 5b)
        p2MulliganRound1Bonus = (pocetVymen === 1) ? 2 : 5; 
        ukazOznamenie("🎲 MULLIGAN DOKONČENÝ", "Vymenil si " + pocetVymen + " kariet! Súper získal +" + p2MulliganRound1Bonus + "b náskok v 1. kole.");
    } else { 
        ukazOznamenie("✅ RUKA POTVRDENÁ", "Ponechal si si pôvodnú ruku."); 
    }

    if (jeSingleplayer) {
        setTimeout(function() {
            vyhodnotAIMulligan();
            vykresliHraciuPlochu();
            setTimeout(spravujAI, 800);
        }, 400);
    } else {
        vykresliHraciuPlochu();
    }
} // koniec funkcie potvrditMulliganAkciu

function vyhodnotAIMulligan() {
    var weakIndices = [];
    p2_draft_hand.forEach(function(c, idx) { var reg = getRegistryCard(c.n); if (!reg.isSpell && !reg.isSpy && !reg.isItem && getRealPower(c) <= 2) weakIndices.push(idx); });
    if (weakIndices.length >= 2) {
        var toSwap = weakIndices.slice(0, 2); toSwap.sort(function(a, b) { return b - a; });
        toSwap.forEach(function(idx) { p2_draft_hand.splice(idx, 1); });
        for (var i = 0; i < 2; i++) { if (p2_active_deck.length > 0) { var nK = p2_active_deck.pop(); p2_draft_hand.push({ n: nK, cls: "F" }); } }
        p1MulliganRound1Bonus = 5; ukazOznamenie("🤖 AI MULLIGAN", "Súper vymenil 2 najslabšie karty! Získavaš +5b náskok v 1. kole.");
    }
}

function vykresliStol() {
    for (var r = 1; r <= 3; r++) { var el1 = document.getElementById("p1-row" + r); var el2 = document.getElementById("p2-row" + r); if (el1) el1.innerHTML = ""; if (el2) el2.innerHTML = ""; }
    var neutralEl = document.getElementById("neutral-row");
    if (neutralEl) {
        neutralEl.innerHTML = '<span class="row-label-neutral">⚡ Neutrálne Kúzla Stola ⚡</span>';
        neutralne_vplyvy.forEach(function(spellName) { var div = document.createElement("div"); div.className = "karta cls-F"; div.innerHTML = vytvorHTMLKarty(spellName, "none", "F", 0, 0, false); neutralEl.appendChild(div); });
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
        if (card.n === "Šicko v porádku") { neutralne_vplyvy = []; odhodene_karty_kola.push(card); } 
        else { neutralne_vplyvy.push(card.n); }
    } else {
        myPlayed.push(card);
        if (reg.isItem && pNum === 1) { p1_pouzite_predmety.push(card.cls || "F"); }
    }

    // --- NOVÉ: AKTIVÁCIA ŠPECIÁLNYCH SCHOPNOSTÍ ---
    if (card.n === "Erik") {
        otvorErikBuffDialog(pNum, function() { vykresliHraciuPlochu(); pokracujPoVylozeni(pNum); });
        return; // Zastavíme ťah a čakáme na tvoj výber radu
    }
    if (card.n === "Zatúlaný tatranský medveď" || card.n === "Jakub" || card.n === "Marek") {
        vykonajAutoSpalenie(card.n); // Spáli najsilnejšiu kartu
    }
    if (card.n === "Sestrička" || card.n === "Doktor" || card.n === "Kornélia") {
        vykonajOzivenieZArchivu(pNum);
        return; // Zastavíme ťah a čakáme, kým vyberieš kartu z ohňa
    }

    vykresliHraciuPlochu(); pokracujPoVylozeni(pNum);
} // koniec funkcie vylozitKartuZRuky

function pokracujPoVylozeni(pNum) {
    prepniHracov();
}

function vykonajAutoSpalenie(pôvodcaMeno) {
    var vsetkyKartyStola = [];
    p1_played_cards.forEach(function(c) { if (c.n !== pôvodcaMeno && c.n !== "Oli") vsetkyKartyStola.push(c); });
    p2_played_cards.forEach(function(c) { if (c.n !== pôvodcaMeno && c.n !== "Oli") vsetkyKartyStola.push(c); });
    if (vsetkyKartyStola.length === 0) return;
    var maxPwr = -1; vsetkyKartyStola.forEach(function(c) { var p = getRealPower(c); if (p > maxPwr) maxPwr = p; });
    if (maxPwr <= 0) return;

    p1_played_cards = p1_played_cards.filter(function(c) { if (c.n !== pôvodcaMeno && c.n !== "Oli" && getRealPower(c) === maxPwr) { p1_spalene.push(c); return false; } return true; });
    p2_played_cards = p2_played_cards.filter(function(c) { if (c.n !== pôvodcaMeno && c.n !== "Oli" && getRealPower(c) === maxPwr) { p2_spalene.push(c); return false; } return true; });
}

function vykonajCieleneSpalenieMarekom(pNum) {
    var oppCards = (pNum === 1) ? p2_played_cards : p1_played_cards; var oppSpalene = (pNum === 1) ? p2_spalene : p1_spalene;
    var targetable = oppCards.filter(function(c) { return c.n !== "Oli"; }); if (targetable.length === 0) return;
    var victim = targetable[Math.floor(Math.random() * targetable.length)]; var vIdx = oppCards.indexOf(victim);
    if (vIdx !== -1) { oppCards.splice(vIdx, 1); oppSpalene.push(victim); }
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
    subtitle.innerText = isReviving ? "Vyber kartu, ktorú chceš oživiť z plameňov!" : "Zoznam kariet, ktoré zhoreli v plameňoch.";
    subtitle.style.color = isReviving ? "#10b981" : "#ccc";

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
    var arch = (pNum === 1) ? p1_spalene : p2_spalene;
    var myPlayed = (pNum === 1) ? p1_played_cards : p2_played_cards;
    var oppPlayed = (pNum === 1) ? p2_played_cards : p1_played_cards;
    var oživenaKarta = arch.splice(index, 1)[0];
    
    if (oživenaKarta) {
        var reg = getRegistryCard(oživenaKarta.n);
        if (reg.isSpy) { oppPlayed.push(oživenaKarta); tahatNoveKartyZBalicka(pNum, 2); } 
        else { myPlayed.push(oživenaKarta); }
        ukazOznamenie("🕊️ OŽIVENIE Z OHŇA!", "Z plameňov sa vrátila karta <strong>" + oživenaKarta.n + "</strong>!", function() {
            vykresliHraciuPlochu(); pokracujPoVylozeni(pNum);
        });
    } else {
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
    otvorSpalenisko(pNum, true);
}

function hracPassuje(pNum) {
    if (pNum === 1) p1Pass = true; if (pNum === 2) p2Pass = true;
    if (p1Pass && p2Pass) skontrolujKoniecKola(); else prepniHracov();
}

function prepniHracov() {
    if (p1Pass && !p2Pass) aktualnyHrac = 2; else if (p2Pass && !p1Pass) aktualnyHrac = 1; else aktualnyHrac = (aktualnyHrac === 1) ? 2 : 1;
    vykresliHraciuPlochu(); spravujAI();
}

function spravujAI() { if (jeSingleplayer && aktualnyHrac === 2 && !p2Pass && !blokujVykladanie) setTimeout(vykonajTachAI, 1200); }

function vykonajTachAI() {
    if (p2Pass || blokujVykladanie) return;
    
    if (p1Pass && sc2 > sc1) { hracPassuje(2); return; } 
    if (sc2 > (sc1 + 20) && p2_draft_hand.length < 10) { hracPassuje(2); return; } 
    if (!p2_draft_hand || p2_draft_hand.length === 0) { hracPassuje(2); return; } 
    
    // --- NOVÉ: TAKTICKÝ ÚSTUP AI ---
    // Ak AI prehráva o viac ako 25 bodov a ty ešte nemáš vyhraté kolo (r1 === 0), 
    // radšej passne a ušetrí si karty na ďalšie kolá.
    if (sc1 > (sc2 + 25) && r1 === 0) {
        hracPassuje(2); 
        return;
    }
    
    // --- INTELIGENTNÝ VÝBER KARTY ---
    var chosenIndex = -1;
    var safeIndices = [];
    
    p2_draft_hand.forEach(function(c, i) {
        if (c.n !== "Marek" && c.n !== "Jakub" && c.n !== "Zatúlaný tatranský medveď") safeIndices.push(i);
    });
    
    if (sc1 === 0 && safeIndices.length > 0) {
        chosenIndex = safeIndices[Math.floor(Math.random() * safeIndices.length)];
    } else {
        chosenIndex = Math.floor(Math.random() * p2_draft_hand.length);
    }
    
    vylozitKartuZRuky(2, chosenIndex);
} // koniec funkcie vykonajTachAI

function skontrolujKoniecKola() {
    prepočitajSkoreStola(); blokujVykladanie = true;
    var textVysledku = "";
    if (sc1 > sc2) { r1++; textVysledku = "Tvoja výhra (" + sc1 + " : " + sc2 + ")"; } 
    else if (sc2 > sc1) { r2++; textVysledku = "Súper vyhral (" + sc2 + " : " + sc1 + ")"; } 
    else { r1++; r2++; textVysledku = "Remíza, obaja majú korunku (" + sc1 + " : " + sc2 + ")"; }
    
    p1MulliganRound1Bonus = 0; p2MulliganRound1Bonus = 0;
    aktualizujKolaUI();
    
    ukazOznamenie("🏁 KONIEC KOLA", textVysledku, function() {
        if (r1 >= 2 || r2 >= 2) vyhodnotKoniecZapasu(); else pripravNoveKolo();
    });
}

function pripravNoveKolo() {
    odhodene_karty_kola = odhodene_karty_kola.concat(p1_played_cards).concat(p2_played_cards);
    p1_played_cards = []; p2_played_cards = []; neutralne_vplyvy = []; p1_erik_buff_row = null; p2_erik_buff_row = null;
    p1Pass = false; p2Pass = false; blokujVykladanie = false;
    
    cisloKola++;
    if (cisloKola === 2) aktualnyHrac = 2;
    else if (cisloKola === 3) aktualnyHrac = 1;
    
    tahatNoveKartyZBalicka(1, 2); 
    tahatNoveKartyZBalicka(2, 2);
    
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
        container.innerHTML = '<h3 style="color:#ffcc00;">⚔️ KAPITOLA II: KARTY, SYNERGIE A ZOSTAVA</h3><p>Pred zápasom si musíš poskladať balíček (Zostavu), ktorý musí obsahovať minimálne 25 kariet.</p><ul style="line-height:1.6;"><li><strong>Bojové jednotky:</strong> Patria do špecifických radov (1. rad Muži, 2. rad Ženy, 3. rad Zvieratá). Ich sila rastie vďaka Setovým bonusom (ak máš v rade viac kariet z rovnakej vzácnej triedy). Slabé F-karty (1-4b) ti pri výhre generujú extra mince!</li><li><strong>Predmety (Alkohol, Kvety...):</strong> Tieto karty pridávajú plošný bonus celému radu. Bonus závisí od ich vykovanej vzácnosti (od +1b pri F až po +7b pri S-Class).</li><li><strong>Kúzla stola:</strong> Ukladajú sa do špeciálneho Neutrálneho radu a ovplyvňujú oboch hráčov. Dokážu zraziť silu konkrétnych radov na 1 bod.</li><li><strong>Špióni a Oživovanie:</strong> Niektoré karty sa vykladajú na súperovu stranu stola, za čo získaš potiahnutie 2 nových kariet. Iné dokážu oživiť karty, ktoré boli zničené požiarom z boja.</li></ul>';
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
    var items = [ { name: "Mince", val: inventar.mince, img: "Img/mince.webp" }, { name: "Koža", val: (inventar.suroviny["Koža"] || 0) + " oz", img: "Img/koza.webp" }, { name: "Zlato", val: (inventar.suroviny["Zlato"] || 0) + " oz", img: "Img/zlato.webp" }, { name: "Prízraky", val: (inventar.prizraky["F"] || 0) + "x F", img: "Img/prizrak.webp" } ];
    var html = ""; items.forEach(function(item) { html += '<div class="inventory-mini-card"><img src="' + item.img + '" class="inventory-mini-img"><div class="inventory-mini-info"><span class="inventory-mini-title">' + item.name + '</span><span class="inventory-mini-val">' + item.val + '</span></div></div>'; });
    el.innerHTML = html;
}

function otvorDetailKarty(n) {
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

    var topClass = "F";
    if (inventar && inventar.karty && inventar.karty[n] && typeof inventar.karty[n].repliky === "object") {
        if (inventar.karty[n].repliky["S"] > 0) topClass = "S";
        else if (inventar.karty[n].repliky["A"] > 0) topClass = "A";
        else if (inventar.karty[n].repliky["B"] > 0) topClass = "B";
        else if (inventar.karty[n].repliky["C"] > 0) topClass = "C";
        else if (inventar.karty[n].repliky["D"] > 0) topClass = "D";
        else if (inventar.karty[n].repliky["E"] > 0) topClass = "E";
    } else if (reg.isPlatinum) { topClass = "PLATINUM"; } else if (reg.isPrizrak) { topClass = "F"; }

    var realPwr = getRealPower({ n: n, cls: topClass });
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
    var obrazovky = ["hlavne-menu", "hracia-plocha", "dielna-modal", "obchod-modal", "navod-modal", "deckbuilder-modal", "stats-modal"];
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

function testSimulaciaInaktivity() { Object.keys(simulačneRebríčky).forEach(function(k) { if (simulačneRebríčky[k][0]) simulačneRebríčky[k][0].inaktivny = !simulačneRebríčky[k][0].inaktivny; }); vykresliGridStatistik(); ukazOznamenie("⏩ TEST INAKTIVITY", "Stav inaktivity lídrov bol prepnutý."); }
function testSimulaciaPridatBota() { var rKey = Object.keys(simulačneRebríčky)[Math.floor(Math.random() * Object.keys(simulačneRebríčky).length)]; var botName = "Bot_" + Math.floor(Math.random() * 900 + 100); var botScore = Math.floor(Math.random() * 50) + 10; simulačneRebríčky[rKey].push({ hrac: botName, skore: botScore, inaktivny: false }); simulačneRebríčky[rKey].sort(function(a, b) { return b.skore - a.skore; }); vykresliGridStatistik(); ukazOznamenie("🤖 TEST BOT", "Do rebríčka " + rKey + " pribudol " + botName + "!"); }
function testSimulaciaGlobalnyOznam() { vyhlasGlobalnySClassOznam("Hráč 1 (Ty)", "Nicolas"); }
function vyhlasGlobalnySClassOznam(hracMeno, kartaMeno) { var banner = document.createElement("div"); banner.className = "global-announce-banner"; banner.innerHTML = "👑 <strong>KRÁĽOVSKÝ OZNAM:</strong> Hráč <strong>" + hracMeno + "</strong> vykoval <strong>S-Class</strong> kartu <strong>" + kartaMeno + "</strong>!"; document.body.appendChild(banner); setTimeout(function() { banner.remove(); }, 6000); }

document.addEventListener("DOMContentLoaded", function() {
    nacitatUlozenuZostavu(); zobraziťObrazovku("hlavne-menu");
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
} // koniec funkcie tahatNoveKartyZBalicka

window.spustitZapasLokálnePVP = spustitZapasLokálnePVP; window.zobraziťMenuAI = zobraziťMenuAI; window.spustitZapasProtiAI = spustitZapasProtiAI; window.otvoriťObchod = otvoriťObchod; window.otvoriťDielňu = otvoriťDielňu; window.otvoriťDeckbuilder = otvoriťDeckbuilder; window.otvoriťStatistiky = otvoriťStatistiky; window.otvoriťNavodHry = otvoriťNavodHry; window.posunStraneKnihy = posunStraneKnihy; window.vylepsiKartuVoForge = vylepsiKartuVoForge; window.devPridatSurovinyACheaty = devPridatSurovinyACheaty; window.zatvoritTruhluAOpustit = zatvoritTruhluAOpustit; window.hracPassuje = hracPassuje; window.vylozitKartuZRuky = vylozitKartuZRuky; window.zobraziťObrazovku = zobraziťObrazovku; window.prepniZvuk = prepniZvuk; window.upravHlasitost = upravHlasitost; window.otvorTruhluVitaza = otvorTruhluVitaza; window.otvorTruhluUcastnika = otvorTruhluUcastnika; window.spustitHudbuPoPrvomKliknuti = spustitHudbuPoPrvomKliknuti; window.otvorDetailKarty = otvorDetailKarty; window.ukazOznamenie = ukazOznamenie; window.prepniRozbalovanieBatohu = prepniRozbalovanieBatohu; window.anonymnePrihoditSumu = anonymnePrihoditSumu; window.okamziteOdkupitKartu = okamziteOdkupitKartu; window.testSimulaciaPrihodeniaBota = testSimulaciaPrihodeniaBota; window.testSimulaciaRychlychPredajov = testSimulaciaRychlychPredajov; window.testSimulaciaInaktivity = testSimulaciaInaktivity; window.testSimulaciaPridatBota = testSimulaciaPridatBota; window.testSimulaciaGlobalnyOznam = testSimulaciaGlobalnyOznam; window.vykresliGridStatistik = vykresliGridStatistik; window.aktualizujPanelDielne = aktualizujPanelDielne; window.automatickyDoplnitDefaultZostavu = automatickyDoplnitDefaultZostavu; window.prepniKartuVZostave = prepniKartuVZostave; window.prepniVyberMulliganKarty = prepniVyberMulliganKarty; window.potvrditMulliganAkciu = potvrditMulliganAkciu; window.prepniZalozkuTrhu = prepniZalozkuTrhu; window.kupitSurovinuZoStatnehoSkladu = kupitSurovinuZoStatnehoSkladu; window.aktualizujDostupneTriedyPrePredaj = aktualizujDostupneTriedyPrePredaj; window.aktualizujMaxKusovPrePredaj = aktualizujMaxKusovPrePredaj; window.odoslatPredajnyFormular = odoslatPredajnyFormular;
