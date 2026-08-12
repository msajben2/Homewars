// =========================================================================
// RODINNÁ HRA - HOME WARS (VERZIA 13.0.0 - VIDEO TRUHLE & DEV CHEAT MENU)
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

var VERZIA = "13.0.0";

// =========================================================================
// 1. REGISTER KARIET (MASTER REGISTRY)
// =========================================================================
var MASTER_REGISTRY = {
    // PUTOVNÉ PLATINOVÉ KARTY
    "Katy": { row: 2, p: 6, isPlatinum: true, img: "Img/katy.webp", desc: "Kráľovná výhier. Vládne bojisku s neprekonateľnou autoritou.", abilityDesc: "💖 Pomoc: Pridáva +2b všetkým tvojim kartám a uberá -2b všetkým súperovým kartám." },
    "Nela": { row: 2, p: 1, isPlatinum: true, img: "Img/nela.webp", desc: "Ochranný štít podhradia. Zmrazí stôl pred násobnými kúzlam.", abilityDesc: "🛡️ Štít: Zmrazí stôl! Kým je Nela v hre, žiadne karty nedostávajú percentuálne bonusy ani buffy." },

    // ŠPECIÁLNE POSTAVY
    "Michal": { row: 1, p: 5, img: "Img/michal.webp", desc: "Bystrý obchodník. Váži zlato a pozná cenu každej veci.", abilityDesc: "📢 Obchodník: Ak nie je na stole Nela, dáva sám sebe samo-buff +100% k sile (z 5b na 10b)." },
    "Erik": { row: 1, p: 3, img: "Img/erik.webp", desc: "Geniálny taktik nad bojovou mapou.", abilityDesc: "📢 Buff: Po vyložení si vyberieš rad (1, 2 alebo 3), ktorému pridá +50% k celkovej sile." },
    "Marek": { row: 1, p: 4, img: "Img/marek.webp", desc: "Učený filozof vo fialovom plášti.", abilityDesc: "🧹 Filozof: Otravným filozofovaním zmatie zvolenú kartu súpera a pošle ju do archívu." },
    "Ďuri": { row: 1, p: 6, img: "Img/duri.webp", desc: "Veterán v plnej zbroji.", abilityDesc: "🍺 Taktik: Ak je na stole Alkohol, posilňuje ženský 2. rad o +100% (2x násobok bodov)." },
    "Doktor": { row: 1, p: 5, img: "Img/doktor.webp", desc: "Hradný alchymista a lekár.", abilityDesc: "🏥 Oživenie: Vráti do hry poslednú spálenú kartu z tvojho archívu." },
    "Sestrička": { row: 2, p: 3, img: "Img/sestricka.webp", desc: "Milosrdná ošetrovateľka.", abilityDesc: "🏥 Oživenie: Vráti do hry spálenú kartu z tvojho archívu." },
    "Sisa": { row: 2, p: 4, img: "Img/sisa.webp", desc: "Dvorná dáma motivujúca chlapov.", abilityDesc: "📢 Dvorná dáma: Zvyšuje silu celého mužského radu o +50%." },
    "Oli": { row: 2, p: 12, img: "Img/oli.webp", desc: "Duchovná matka chrámu.", abilityDesc: "✝️ Imunita: Jej sila 12b je stála a nedá sa znížiť kúzlam ani negatívnymi vplyvmi stola." },
    "Kika": { row: 2, p: 3, isSpy: true, img: "Img/kika.webp", desc: "Hradná archivárka.", abilityDesc: "🕵️ Špión: Vykladá sa na súperovu stranu stola. Potiahne ti 2 nové karty z balíčka." },
    "Zvedavá suseda": { row: 2, p: 7, isSpy: true, img: "Img/zvedava-suseda.webp", desc: "Pozorné oko podhradia.", abilityDesc: "🕵️ Špión: Vykladá sa na súperovu stranu stola a dá ti 2 nové karty z balíčka." },

    // OBYČAJNÉ JEDNOTKY (MUŽI)
    "Neviditeľný Mário": { row: 1, p: 4, img: "Img/neviditelny-mario.webp", desc: "Tajuplný zbojník v kapucni." },
    "Martin": { row: 1, p: 4, img: "Img/martin.webp", desc: "Šikovný hraničiar a lovec." },
    "Timko": { row: 1, p: 1, img: "Img/tymko.webp", desc: "Obranný bojovník s dreveným mečom." },
    "Jaro": { row: 1, p: 5, img: "Img/jaro.webp", desc: "Zručný kováč." },

    // OBYČAJNÉ JEDNOTKY (ŽENY)
    "Lula": { row: 2, p: 4, img: "Img/lula.webp", desc: "Dvorná harfistka." },
    "Anka": { row: 2, p: 7, img: "Img/anka.webp", desc: "Správkyňa hradných kľúčov." },
    "Darinka": { row: 2, p: 5, img: "Img/darinka.webp", desc: "Majsterka tkáčka." },
    "Viera": { row: 2, p: 6, img: "Img/viera.webp", desc: "Hradná pekárka." },

    // OBYČAJNÉ JEDNOTKY (ZVIERATÁ)
    "Grobské Mravce": { row: 3, p: 1, img: "Img/grobske-mravce.webp", desc: "Húževnatá svorka lesných mravcov." },
    "Petržalské holuby": { row: 3, p: 1, img: "Img/petrzalske-holuby.webp", desc: "Rýchli hradní posli." },
    "Kabelkový pes": { row: 3, p: 3, img: "Img/kabelkovy-pes.webp", desc: "Panský miláčik usadený na vankúši." },
    "Patkaňe": { row: 3, p: 2, img: "Img/patkane.webp", desc: "Hladná pivničná svorka." },
    "Sviňa lesná": { row: 3, p: 4, img: "Img/svina-lesna.webp", desc: "Zúrivý lesný kanec." },
    "Zatúlaný tatranský medveď": { row: 3, p: 5, img: "Img/tatransky-medved.webp", desc: "Obrovská horská šelma." },
    "Pouličný mačiak": { row: 3, p: 3, img: "Img/poulicny-maciak.webp", desc: "Tichý potulný kocúr." },
    "Komáre": { row: 3, p: 3, img: "Img/komare.webp", desc: "Dotieravé hradné húfy komárov." },

    // KONŠTANTNÉ ŠPECIÁLNE PREDMETY
    "Alcohol": { row: 1, p: 0, isItem: true, img: "Img/alkohol.webp", desc: "Medovina pre 1. rad (Muži).", abilityDesc: "🛠️ Predmet: Pridáva +1b až +7b ku každej karte v 1. rade." },
    "Kvety": { row: 2, p: 0, isItem: true, img: "Img/kvety.webp", desc: "Kytica pre 2. rad (Ženy).", abilityDesc: "🛠️ Predmet: Pridáva +1b až +7b ku každej karte v 2. rade." },
    "Medove Orechy": { row: 3, p: 0, isItem: true, img: "Img/medove-orechy.webp", desc: "Odmena pre 3. rad (Zvieratá).", abilityDesc: "🛠️ Predmet: Pridáva +1b až +7b ku každej karte v 3. rade." },

    // NEUTRÁLNE KÚZLA STOLA
    "Musíme sa porozprávať": { row: 0, p: 0, isSpell: true, img: "Img/musime-sa-porozpravat.webp", desc: "Vážny rozhovor zmrazí mužov.", abilityDesc: "⚡ Kúzlo: Zníži ZÁKLADNÚ silu všetkých mužov na 1b!" },
    "Upokoj sa": { row: 0, p: 0, isSpell: true, img: "Img/upokoj-sa.webp", desc: "Hnev v ženskom rade.", abilityDesc: "⚡ Kúzlo: Zníži ZÁKLADNÚ silu všetkých žien na 1b!" },
    "Ohnostroj": { row: 0, p: 0, isSpell: true, img: "Img/ohnostroj.webp", desc: "Rachot vyplaší zvieratá.", abilityDesc: "⚡ Kúzlo: Zníži ZÁKLADNÚ silu všetkých zvierat na 1b!" },
    "Šicko v porádku": { row: 0, p: 0, isSpell: true, img: "Img/sicko-v-poradku.webp", desc: "Dvorný šašo vyčistí stôl.", abilityDesc: "⚡ Očistenie: Odstráni všetky negatívne kúzla zo stola." }
};

// =========================================================================
// 2. KONFIGURÁCIE TRIED A KOVANIA
// =========================================================================
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
    "F->E": { rate: 1.00, nextClass: "E", reqMat: "Koža", reqMatCount: 3, coinFee: 10 },
    "E->D": { rate: 0.90, nextClass: "D", reqMat: "Drevo", reqMatCount: 3, coinFee: 25 },
    "D->C": { rate: 0.80, nextClass: "C", reqMat: "Kov", reqMatCount: 3, coinFee: 50 },
    "C->B": { rate: 0.70, nextClass: "B", reqMat: "Bronz", reqMatCount: 3, coinFee: 100 },
    "B->A": { rate: 0.55, nextClass: "A", reqMat: "Striebro", reqMatCount: 3, coinFee: 250 },
    "A->S": { rate: 0.40, nextClass: "S", reqMat: "Zlato", reqMatCount: 3, coinFee: 500 }
};

var PERGAMENY_CONFIG = {
    "none": { name: "Bez Zvitku", goldCost: 0, rateBonus: 0.00, saveCard: false },
    "basic": { name: "Základný Zvitok", goldCost: 100, rateBonus: 0.10, saveCard: true },
    "advanced": { name: "Pokročilý Zvitok", goldCost: 500, rateBonus: 0.25, saveCard: true },
    "legendary": { name: "Legendárny Zvitok", goldCost: 1000, rateBonus: 0.55, saveCard: true }
};

// =========================================================================
// 3. GLOBÁLNY INVENTÁR A STAV ZÁPASU
// =========================================================================
var inventar = {
    mince: 500,
    suroviny: { "Koža": 15, "Drevo": 10, "Kov": 5, "Bronz": 2, "Striebro": 1, "Zlato": 20 },
    karty: {},
    zostava: []
};

var p1_played_cards = [], p2_played_cards = [];
var p1_erik_buff_row = null, p2_erik_buff_row = null;
var sc1 = 0, sc2 = 0, r1 = 0, r2 = 0, p1Pass = false, p2Pass = false, aktualnyHrac = 1;
var p1_draft_hand = [], p2_draft_hand = [];
var p1_spalene = [], p2_spalene = [], neutralne_vplyvy = [];
var jeSingleplayer = false; var obtiaznostAI = "B"; var blokujVykladanie = false;
var aktualnaStranaKnihy = 1;

function getRegistryCard(meno) {
    if (!meno) return {};
    return MASTER_REGISTRY[meno] || {};
}

function getRealPower(card) {
    if (!card || !card.n) return 0;
    var reg = getRegistryCard(card.n);
    if (reg.isSpell || reg.isItem || reg.p === 0) return 0;
    
    var cls = card.cls || "F";
    var bonus = CLASS_CONFIG[cls] ? CLASS_CONFIG[cls].bonusPwr : 0;
    return Math.max(0, reg.p + bonus);
}

// =========================================================================
// 4. PREPÍNANIE OBRAZOVIEK
// =========================================================================
function zobraziťObrazovku(idObrazovky) {
    var obrazovky = ["hlavne-menu", "hracia-plocha", "dielna-modal", "obchod-modal", "navod-modal"];
    obrazovky.forEach(function(id) {
        var el = document.getElementById(id);
        if (el) {
            if (id === idObrazovky) {
                el.style.display = (id.includes("modal")) ? "flex" : "block";
            } else if (!id.includes("modal")) {
                el.style.display = "none";
            }
        }
    });
}

function spustitZapasLokálnePVP() {
    jeSingleplayer = false;
    inicializujNovyZapas();
}

function zobraziťMenuAI() {
    var obt = prompt("Vyber obtiažnosť AI:\nA - Ťažká\nB - Stredná\nC - Ľahká", "B");
    if (obt) {
        obtiaznostAI = obt.toUpperCase();
        spustitZapasProtiAI();
    }
}

function spustitZapasProtiAI() {
    jeSingleplayer = true;
    inicializujNovyZapas();
}

function otvoriťObchod() {
    var el = document.getElementById("obchod-modal");
    if (el) el.style.display = "flex";
    vygenerujSimulaciuTrhu();
}

function otvoriťDielňu() {
    var el = document.getElementById("dielna-modal");
    if (el) el.style.display = "flex";
    aktualizujPanelDielne();
}

function inicializujNovyZapas() {
    p1_played_cards = []; p2_played_cards = [];
    p1_spalene = []; p2_spalene = [];
    neutralne_vplyvy = [];
    p1_erik_buff_row = null; p2_erik_buff_row = null;
    r1 = 0; r2 = 0; sc1 = 0; sc2 = 0;
    p1Pass = false; p2Pass = false;
    aktualnyHrac = 1; blokujVykladanie = false;

    p1_draft_hand = [
        { n: "Martin", cls: "F" }, { n: "Sisa", cls: "F" }, { n: "Alcohol", cls: "F" },
        { n: "Kabelkový pes", cls: "F" }, { n: "Jaro", cls: "F" }, { n: "Musíme sa porozprávať", cls: "F" }
    ];
    p2_draft_hand = [
        { n: "Neviditeľný Mário", cls: "F" }, { n: "Lula", cls: "F" }, { n: "Kvety", cls: "F" },
        { n: "Pouličný mačiak", cls: "F" }, { n: "Timko", cls: "F" }, { n: "Ohnostroj", cls: "F" }
    ];

    zobraziťObrazovku("hracia-plocha");
    vykresliHraciuPlochu();
}

// =========================================================================
// 5. HTML RENDERER A VYKLADANIE KARIET
// =========================================================================
function vytvorHTMLKarty(meno, livePwr, cls, row, origPwr) {
    var reg = getRegistryCard(meno);
    var imgPath = reg.img || "Img/default.webp";
    var cisteMeno = meno.replace(/\s+\d+$/, "").trim();

    var html = "";
    if (livePwr !== "none") {
        html += "<div class='karta-kruh karta-kruh-pwr'>" + livePwr + "</div>";
    }
    
    var renderCls = reg.isPlatinum ? "PLATINUM" : cls;
    html += "<div class='karta-kruh karta-kruh-cls cls-" + renderCls + "'>" + renderCls + "</div>";
    html += "<button class='karta-btn-inspect' title='Zväčšiť kartu' onclick='event.stopPropagation(); alert(\"" + cisteMeno + ": " + (reg.abilityDesc || reg.desc || "") + "\");'>🔍</button>";
    html += "<div class='karta-foto' style=\"background-image: url('" + encodeURI(imgPath) + "');\"></div>";
    
    html += "<div class='karta-stitok-spodok'>";
    html += "  <div class='karta-nazov'>" + cisteMeno + "</div>";
    if (reg.abilityDesc) {
        html += "  <div class='karta-popis-short'>" + reg.abilityDesc + "</div>";
    } else if (reg.desc) {
        html += "  <div class='karta-popis-short'>" + reg.desc + "</div>";
    }
    html += "</div>";

    return html;
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
        if (pNum !== aktualnyHrac || (pNum === 1 && p1Pass) || (pNum === 2 && p2Pass)) {
            cardDiv.classList.add("karta-disabled");
        }

        cardDiv.innerHTML = vytvorHTMLKarty(card.n, reg.isSpell || reg.isItem ? "none" : pwr, cls, reg.row, reg.p);
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

    neutralne_vplyvy.forEach(function(spellName) {
        if (neutralEl) {
            var div = document.createElement("div");
            div.className = "karta cls-F";
            div.innerHTML = vytvorHTMLKarty(spellName, "none", "F", 0, 0);
            neutralEl.appendChild(div);
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
    if (pNum !== aktualnyHrac) {
        alert("⚠️ Teraz je na ťahu Hráč " + aktualnyHrac + "!");
        return;
    }

    if ((pNum === 1 && p1Pass) || (pNum === 2 && p2Pass)) {
        alert("🏳️ V tomto kole si už passol!");
        return;
    }

    var hand = (pNum === 1) ? p1_draft_hand : p2_draft_hand;
    var playedList = (pNum === 1) ? p1_played_cards : p2_played_cards;

    if (cardIndex < 0 || cardIndex >= hand.length) return;

    var card = hand.splice(cardIndex, 1)[0];
    var reg = getRegistryCard(card.n);

    if (reg.isSpell) {
        if (card.n === "Šicko v porádku") {
            neutralne_vplyvy = [];
            alert("🧹 Dvorný šašo vyčistil stôl!");
        } else {
            neutralne_vplyvy.push(card.n);
            alert("⚡ Vyložené kúzlo: " + card.n + "!");
        }
    } else {
        playedList.push(card);
    }

    vykresliHraciuPlochu();

    if ((pNum === 1 && !p2Pass) || (pNum === 2 && !p1Pass)) prepniHracov();
    else spravujAI();
}

function hracPassuje(pNum) {
    if (blokujVykladanie) return;
    if (pNum === 1 && !p1Pass) p1Pass = true;
    if (pNum === 2 && !p2Pass) p2Pass = true;
    
    alert("🏳️ Hráč " + pNum + " passol svoje ťahy v tomto kole.");
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
    
    var sprava = "";
    if (sc1 > sc2) { r1++; sprava = "🏆 Kolo vyhráva Hráč 1! (" + sc1 + " vs " + sc2 + ")"; }
    else if (sc2 > sc1) { r2++; sprava = "🏆 Kolo vyhráva Hráč 2! (" + sc2 + " vs " + sc1 + ")"; }
    else { r1++; r2++; sprava = "🤝 Remíza v kole! (" + sc1 + " vs " + sc2 + ")"; }

    alert(sprava);
    aktualizujKolaUI();

    if (r1 >= 2 || r2 >= 2) vyhodnotKoniecZapasu();
    else pripravNoveKolo();
}

function pripravNoveKolo() {
    p1_spalene = p1_spalene.concat(p1_played_cards);
    p2_spalene = p2_spalene.concat(p2_played_cards);
    p1_played_cards = []; p2_played_cards = [];
    neutralne_vplyvy = [];
    p1_erik_buff_row = null; p2_erik_buff_row = null;
    p1Pass = false; p2Pass = false; blokujVykladanie = false;

    vykresliHraciuPlochu();
}

// =========================================================================
// 6. VIDEO TRUHLICOVÝ SYSTEM
// =========================================================================
function vyhodnotKoniecZapasu() {
    var typTruhly = (r1 >= 2 && r2 < 2) ? "vitaz" : "ucastnik";
    spustitVideoAnimationTruhly(typTruhly);
}

function spustitVideoAnimationTruhly(typ) {
    var overlay = document.createElement("div");
    overlay.id = "chest-video-overlay";

    var videoSrc = (typ === "vitaz") ? "Img/truhlavitaza.mp4" : "Img/truhlaucastnika.mp4";

    overlay.innerHTML = `
        <video id="chest-video-element" src="${videoSrc}" playsinline></video>
        <div id="chest-click-prompt" class="chest-prompt-text">🎬 KLIKNI PRE OTVORENIE TRUHLE</div>
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
    var coinsEarned = 0, goldEarned = 0, matEarned = "";
    
    if (typ === "vitaz") {
        coinsEarned = Math.floor(Math.random() * 151) + 150;
        goldEarned = Math.floor(Math.random() * 4) + 2;
        inventar.mince += coinsEarned;
        inventar.suroviny["Zlato"] = (inventar.suroviny["Zlato"] || 0) + goldEarned;
        matEarned = `+ ${coinsEarned} Mincí<br>+ ${goldEarned}g Zlata<br>+ 3x F-Kópie Kariet`;
    } else {
        coinsEarned = Math.floor(Math.random() * 51) + 50;
        inventar.mince += coinsEarned;
        inventar.suroviny["Koža"] = (inventar.suroviny["Koža"] || 0) + 1;
        matEarned = `+ ${coinsEarned} Mincí<br>+ 1x Tvrdená Koža<br>+ 1x F-Kópia Karty`;
    }

    var rewardsBox = document.createElement("div");
    rewardsBox.className = "chest-rewards-modal";
    rewardsBox.innerHTML = `
        <h2>🎉 TRUHLA OTVORENÁ!</h2>
        <div style="font-size:1.3em; margin:20px 0; line-height:1.6; color:#fff;">${matEarned}</div>
        <button onclick="zatvoritTruhluAOpustit('${overlayElement.id}')" style="background:#10b981; color:#fff; border:none; padding:12px 25px; border-radius:6px; font-weight:bold; font-size:1.1em; cursor:pointer;">Zobrať Odmeny</button>
    `;

    overlayElement.appendChild(rewardsBox);
    aktualizujPanelDielne();
}

function zatvoritTruhluAOpustit(overlayId) {
    var el = document.getElementById(overlayId);
    if (el) el.remove();
    zobraziťObrazovku("hlavne-menu");
}

// =========================================================================
// 7. VYHODNOCOVACÍ ENGINE STOLA (STACK & CALCULATIONS)
// =========================================================================
function prepočitajSkoreStola() {
    var isNelaOnTable = false;
    [p1_played_cards, p2_played_cards].forEach(function(list) {
        list.forEach(function(c) { if (c.n === "Nela") isNelaOnTable = true; });
    });

    var p1Katy = p1_played_cards.some(function(c) { return c.n === "Katy"; });
    var p2Katy = p2_played_cards.some(function(c) { return c.n === "Katy"; });

    sc1 = vypocitajSiluHracovychKariet(1, p1_played_cards, p2_played_cards, isNelaOnTable, p1Katy, p2Katy, p1_erik_buff_row);
    sc2 = vypocitajSiluHracovychKariet(2, p2_played_cards, p1_played_cards, isNelaOnTable, p2Katy, p1Katy, p2_erik_buff_row);

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

    myCards.forEach(function(c) {
        var reg = getRegistryCard(c.n);
        if (reg.isSpell || reg.isItem) return;

        var basePwr = getRealPower(c);

        if (c.n !== "Oli") {
            if (reg.row === 1 && rozhovor) basePwr = 1;
            if (reg.row === 2 && upokojSa) basePwr = 1;
            if (reg.row === 3 && ohnostroj) basePwr = 1;
        }

        if (reg.row === 1) basePwr += itemRow1;
        if (reg.row === 2) basePwr += itemRow2;
        if (reg.row === 3) basePwr += itemRow3;

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

function aktualizujKolaUI() {
    var el1 = document.getElementById("p1-rounds");
    var el2 = document.getElementById("p2-rounds");
    if (el1) el1.innerText = "🔴".repeat(r1) || "⚪";
    if (el2) el2.innerText = "🔴".repeat(r2) || "⚪";
}

// =========================================================================
// 8. KNIŽNÝ NÁVOD KRÁĽOVSTVA
// =========================================================================
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
            <h3 style="color:#ffcc00;">📜 KAPITOLA I: TRUHLICE A DROP PRAVDEPODOBNOSTI</h3>
            <p>Suroviny a F-kópie kariet získavaš priamo pri otváraní zápasových truhiel!</p>
        `;
    } else if (aktualnaStranaKnihy === 2) {
        container.innerHTML = `
            <h3 style="color:#ffcc00;">🔨 KAPITOLA II: STROM KOVANIA (729 F-KARIET)</h3>
            <p style="font-size:0.85em;">Cesta z F-Class až na S-Class vyžaduje duplikáty a kováčske suroviny.</p>
        `;
    } else {
        container.innerHTML = `<h3 style="color:#ffcc00;">📜 KAPITOLA ${aktualnaStranaKnihy}</h3><p>Podrobnosti o pravidlách hry a ekonomike.</p>`;
    }
}

// =========================================================================
// 9. DIELŇA, DEV CHEAT MENU A KOVANIE
// =========================================================================
function devPridatSurovinyACheaty() {
    inventar.mince += 10000;
    inventar.suroviny["Koža"] = (inventar.suroviny["Koža"] || 0) + 100;
    inventar.suroviny["Drevo"] = (inventar.suroviny["Drevo"] || 0) + 100;
    inventar.suroviny["Kov"] = (inventar.suroviny["Kov"] || 0) + 100;
    inventar.suroviny["Bronz"] = (inventar.suroviny["Bronz"] || 0) + 100;
    inventar.suroviny["Striebro"] = (inventar.suroviny["Striebro"] || 0) + 100;
    inventar.suroviny["Zlato"] = (inventar.suroviny["Zlato"] || 0) + 1000;

    Object.keys(MASTER_REGISTRY).forEach(function(t) {
        if (!inventar.karty[t]) inventar.karty[t] = { repliky: 0, aktivnaTrieda: "F" };
        inventar.karty[t].repliky += 10;
    });

    alert("⚡ DEV CHEAT AKTIVOVANÝ: Pridaných 10 000 mincí, 1000g Zlata, suroviny a +10 duplikátov zo všetkých kariet!");
    aktualizujPanelDielne();
}

function vylepsiKartuVoForge(meno, pergamenType) {
    var t = inventar.karty[meno];
    if (!t) return;

    var curClass = t.aktivnaTrieda || "F";
    var transitionKey = curClass + "->" + (curClass === "F" ? "E" : (curClass === "E" ? "D" : (curClass === "D" ? "C" : (curClass === "C" ? "B" : (curClass === "B" ? "A" : "S")))));
    
    var cfg = FORGE_RATES[transitionKey];
    if (!cfg) { alert("Karta je už na maximálnej S-Class!"); return; }

    if (t.repliky < 3) { alert("Potrebuješ 3 rovnocenné duplikáty tejto triedy!"); return; }
    
    var reqMat = cfg.reqMat;
    if ((inventar.suroviny[reqMat] || 0) < cfg.reqMatCount) { alert("Nedostatok suroviny: " + reqMat + " (potrebuješ " + cfg.reqMatCount + "x)!"); return; }

    if (inventar.mince < cfg.coinFee) { alert("Nedostatok mincí na kováčsky poplatok! Potrebuješ " + cfg.coinFee + " m."); return; }

    var pCfg = PERGAMENY_CONFIG[pergamenType || "none"];
    if (pCfg.goldCost > 0 && (inventar.suroviny["Zlato"] || 0) < pCfg.goldCost) { alert("Nedostatok Zlata na tento zvitok!"); return; }

    inventar.mince -= cfg.coinFee;
    inventar.suroviny[reqMat] -= cfg.reqMatCount;
    if (pCfg.goldCost > 0) inventar.suroviny["Zlato"] -= pCfg.goldCost;

    var finalRate = Math.min(0.95, cfg.rate + pCfg.rateBonus);
    var roll = Math.random();

    if (roll <= finalRate) {
        t.repliky -= 3;
        t.aktivnaTrieda = cfg.nextClass;
        alert("🎉 KOVANIE ÚSPEŠNÉ! Karta bola povýšená na " + cfg.nextClass + "-Class!");
    } else {
        if (!pCfg.saveCard) {
            t.repliky -= 1;
            alert("💥 KOVANIE ZLYHALO! Suroviny a poplatok zhoreli a prišiel si o 1 duplikát karty!");
        } else {
            alert("🛡️ KOVANIE ZLYHALO! Zvitok za Zlato však ochránil tvoje karty. Zhoreli len suroviny a poplatok!");
        }
    }

    aktualizujPanelDielne();
}

function recyklujKartuDielne(meno) {
    var t = inventar.karty[meno];
    if (t && t.repliky > 0) {
        t.repliky--;
        inventar.mince += 3;
        alert("♻️ Predané systému za výkupnú cenu (+3 mince)!");
        aktualizujPanelDielne();
    }
}

function vygenerujSimulaciuTrhu() {
    var e = document.getElementById("obchod-regaly-zoznam");
    if (!e) return;
    e.innerHTML = `
        <div style="grid-column: 1/-1; background:#1e140a; border:2px solid #d4af37; padding:15px; border-radius:8px; text-align:center; margin-bottom:15px;">
            <h3 style="color:#d4af37; margin-top:0;">🛒 SIMULÁTOR PLAYER-DRIVEN TRHU & AUKCIÍ</h3>
            <button onclick="alert('⚡ Ponuka zavesená na 24-hodinovú aukciu!')" style="background:#10b981; color:#fff; border:none; padding:8px 16px; border-radius:4px; font-weight:bold; cursor:pointer;">➕ Vytvoriť novú 24h Aukciu</button>
        </div>
    `;
}

function aktualizujPanelDielne() {
    var e = document.getElementById("dielna-zoznam");
    if (!e) return;
    e.innerHTML = "";

    // Dev tlačidlo na pridanie surovín
    var devBtnDiv = document.createElement("div");
    devBtnDiv.style.gridColumn = "1/-1";
    devBtnDiv.style.marginBottom = "15px";
    devBtnDiv.innerHTML = `<button onclick="devPridatSurovinyACheaty()" style="background:#8b5cf6; color:#fff; border:none; padding:10px 200px; border-radius:6px; font-weight:bold; cursor:pointer; width:100%;">⚡ DEV MENU: Pridať 10 000 Mincí & Suroviny pre Testovanie</button>`;
    e.appendChild(devBtnDiv);

    Object.keys(MASTER_REGISTRY).forEach(function(t) {
        var reg = MASTER_REGISTRY[t];
        if (reg.isPlatinum || reg.isSpell) return;

        if (!inventar.karty[t]) inventar.karty[t] = { repliky: 1, aktivnaTrieda: "F" };
        var cardData = inventar.karty[t];

        var wrapper = document.createElement("div");
        wrapper.className = "karta-karta-wrapper";

        var cardDiv = document.createElement("div");
        cardDiv.className = "karta cls-" + cardData.aktivnaTrieda;
        var realPwr = getRealPower({ n: t, cls: cardData.aktivnaTrieda });
        cardDiv.innerHTML = vytvorHTMLKarty(t, realPwr, cardData.aktivnaTrieda, reg.row, reg.p);

        var curCls = cardData.aktivnaTrieda || "F";
        var nextFee = CLASS_CONFIG[curCls] ? CLASS_CONFIG[curCls].coinFee : 0;

        var actions = `
            <div style="font-size:0.8em; margin:6px 0;">Kópie: <strong>${cardData.repliky} / 3</strong> | Trieda: <strong>${cardData.aktivnaTrieda}</strong></div>
            <select id="pergamen-select-${t.replace(/\s+/g, '')}" style="width:100%; font-size:0.75em; margin-bottom:4px; background:#110e0c; color:#ffcc00; border:1px solid #5a4d3e;">
                <option value="none">Bez Zvitku (0g / Risk)</option>
                <option value="basic">Základný Zvitok (100g / +10%)</option>
                <option value="advanced">Pokročilý Zvitok (500g / +25%)</option>
                <option value="legendary">Legendárny Zvitok (1000g / +55%)</option>
            </select>
            <button class="btn-forge" onclick="vylepsiKartuVoForge('${t}', document.getElementById('pergamen-select-${t.replace(/\s+/g, '')}').value)">🔨 Forge (${nextFee}m)</button>
            <button class="btn-recycle" style="margin-top:4px;" onclick="recyklujKartuDielne('${t}')">♻️ Výkup (+3m)</button>
        `;

        wrapper.appendChild(cardDiv);
        var actDiv = document.createElement("div");
        actDiv.style.width = "100%";
        actDiv.innerHTML = actions;
        wrapper.appendChild(actDiv);

        e.appendChild(wrapper);
    });

    var wallet = document.getElementById("wallet-p1");
    if (wallet) wallet.innerText = inventar.mince + " m | Zlato: " + (inventar.suroviny["Zlato"] || 0) + "g";
}

document.addEventListener("DOMContentLoaded", function() {
    zobraziťObrazovku("hlavne-menu");
    aktualizujPanelDielne();
    vygenerujSimulaciuTrhu();
});

// GLOBÁLNE PREPOJENIA
window.spustitZapasLokálnePVP = spustitZapasLokálnePVP;
window.zobraziťMenuAI = zobraziťMenuAI;
window.spustitZapasProtiAI = spustitZapasProtiAI;
window.otvoriťObchod = otvoriťObchod;
window.otvoriťDielňu = otvoriťDielňu;
window.otvoriťNavodHry = otvoriťNavodHry;
window.posunStraneKnihy = posunStraneKnihy;
window.vylepsiKartuVoForge = vylepsiKartuVoForge;
window.recyklujKartuDielne = recyklujKartuDielne;
window.devPridatSurovinyACheaty = devPridatSurovinyACheaty;
window.zatvoritTruhluAOpustit = zatvoritTruhluAOpustit;
window.hracPassuje = hracPassuje;
window.vylozitKartuZRuky = vylozitKartuZRuky;
window.zobraziťObrazovku = zobraziťObrazovku;
