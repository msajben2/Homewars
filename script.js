// =========================================================================
// RODINNÁ HRA - HOME WARS (KOMPLETNÝ ENGINE - VERZIA 22.2.0 - FULL UNUNCUT)
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

var VERZIA = "22.2.0";

// =========================================================================
// 1. REGISTER KARIET (MASTER REGISTRY)
// =========================================================================
var MASTER_REGISTRY = {
    // 🌟 12 PLATINOVÝCH KARIET SO SCHOPNOSŤAMI
    "Katy": { row: 2, p: 6, isPlatinum: true, img: "Img/katy.webp", desc: "Kráľovná výhier. Vládne bojisku s neprekonateľnou autoritou.", abilityDesc: "💖 Pomoc: Pridáva +2b všetkým tvojim kartám a uberá -2b všetkým súperovým kartám." },
    "Nela": { row: 2, p: 1, isPlatinum: true, img: "Img/nela.webp", desc: "Ochranný štít podhradia. Zmrazí stôl pred násobnými kúzlam.", abilityDesc: "🛡️ Štít: Zmrazí stôl! Kým je Nela v hre, žiadne karty nedostávajú percentuálne bonusy ani buffy." },
    "Michal": { row: 1, p: 5, isPlatinum: true, img: "Img/michal.webp", desc: "Bystrý obchodník. Váži zlato a pozná cenu každej veci.", abilityDesc: "📢 Obchodník: Ak nie je na stole Nela, dáva sám sebe samo-buff +100% k sile (z 5b na 10b)." },
    "Erik": { row: 1, p: 3, isPlatinum: true, img: "Img/erik.webp", desc: "Geniálny taktik nad bojovou mapou.", abilityDesc: "📢 Buff: Po vyložení si vyberieš rad (1, 2 alebo 3), ktorému pridá +50% k celkovej sile." },
    "Marek": { row: 1, p: 4, isPlatinum: true, img: "Img/marek.webp", desc: "Učený filozof vo fialovom plášti.", abilityDesc: "🧹 Filozof: Otravným filozofovaním zmatie zvolenú kartu súpera a pošle ju do archívu." },
    "Ďuri": { row: 1, p: 6, isPlatinum: true, img: "Img/duri.webp", desc: "Veterán v plnej zbroji.", abilityDesc: "🍺 Taktik: Ak je na stole Alkohol, posilňuje ženský 2. rad o +100% (2x násobok bodov)." },
    "Doktor": { row: 1, p: 5, isPlatinum: true, img: "Img/doktor.webp", desc: "Hradný alchymista a lekár.", abilityDesc: "🏥 Oživenie: Vráti do hry poslednú spálenú kartu z tvojho archívu." },
    "Sestrička": { row: 2, p: 3, isPlatinum: true, img: "Img/sestricka.webp", desc: "Milosrdná ošetrovateľka.", abilityDesc: "🏥 Oživenie: Vráti do hry spálenú kartu z tvojho archívu." },
    "Sisa": { row: 2, p: 4, isPlatinum: true, img: "Img/sisa.webp", desc: "Dvorná dáma motivujúca chlapov.", abilityDesc: "📢 Dvorná dáma: Zvyšuje silu celého mužského radu o +50%." },
    "Oli": { row: 2, p: 12, isPlatinum: true, img: "Img/oli.webp", desc: "Duchovná matka chrámu.", abilityDesc: "✝️ Imunita: Jej sila 12b je stála a nedá sa znížiť kúzlam ani negatívnymi vplyvmi stola." },
    "Kika": { row: 2, p: 3, isPlatinum: true, isSpy: true, img: "Img/kika.webp", desc: "Hradná archivárka.", abilityDesc: "🕵️ Špión: Vykladá sa na súperovu stranu stola. Potiahne ti 2 nové karty z balíčka." },
    "Zvedavá suseda": { row: 2, p: 7, isPlatinum: true, isSpy: true, img: "Img/zvedava-suseda.webp", desc: "Pozorné oko podhradia.", abilityDesc: "🕵️ Špión: Vykladá sa na súperovu stranu stola a dá ti 2 nové karty z balíčka." },

    // 🔨 OBYČAJNÉ KOVÁČSKE JEDNOTKY (MUŽI)
    "Neviditeľný Mário": { row: 1, p: 4, img: "Img/neviditelny-mario.webp", desc: "Tajuplný zbojník v kapucni." },
    "Martin": { row: 1, p: 4, img: "Img/martin.webp", desc: "Šikovný hraničiar a lovec." },
    "Timko": { row: 1, p: 1, img: "Img/tymko.webp", desc: "Obranný bojovník s dreveným mečom." },
    "Jaro": { row: 1, p: 5, img: "Img/jaro.webp", desc: "Zručný kováč." },

    // 🔨 OBYČAJNÉ KOVÁČSKE JEDNOTKY (ŽENY)
    "Lula": { row: 2, p: 4, img: "Img/lula.webp", desc: "Dvorná harfistka." },
    "Anka": { row: 2, p: 7, img: "Img/anka.webp", desc: "Správkyňa hradných kľúčov." },
    "Darinka": { row: 2, p: 5, img: "Img/darinka.webp", desc: "Majsterka tkáčka." },
    "Viera": { row: 2, p: 6, img: "Img/viera.webp", desc: "Hradná pekárka." },

    // 🔨 OBYČAJNÉ KOVÁČSKE JEDNOTKY (ZVIERATÁ)
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

    // KÚZLA - OPRAVA NÁZVU OBRÁZKA (BEZ DIAKRITIKY)
    "Musíme sa porozprávať": { row: 0, p: 0, isSpell: true, img: "Img/musime-sa-porozpravat.webp", desc: "Vážny rozhovor.", abilityDesc: "⚡ Zníži základ mužov na 1b." },
    "Upokoj sa": { row: 0, p: 0, isSpell: true, img: "Img/upokoj-sa.webp", desc: "Hnev.", abilityDesc: "⚡ Zníži základ žien na 1b." },
    "Ohnostroj": { row: 0, p: 0, isSpell: true, img: "Img/ohnostroj.webp", desc: "Rachot.", abilityDesc: "⚡ Zníži základ zvierat na 1b." },
    "Šicko v porádku": { row: 0, p: 0, isSpell: true, img: "Img/sicko-v-poradku.webp", desc: "Šašo.", abilityDesc: "⚡ Odstráni kúzla zo stola." }
};

// CONFIGS
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
    zostava: []
};

var p1_played_cards = [], p2_played_cards = [];
var p1_erik_buff_row = null, p2_erik_buff_row = null;
var sc1 = 0, sc2 = 0, r1 = 0, r2 = 0, p1Pass = false, p2Pass = false, aktualnyHrac = 1;
var p1_draft_hand = [], p2_draft_hand = [];
var p1_spalene = [], p2_spalene = [], neutralne_vplyvy = [];
var jeSingleplayer = false; var obtiaznostAI = "B"; var blokujVykladanie = false;
var aktualnaStranaKnihy = 1;
var p1MulliganBonusScore = 0, p2MulliganBonusScore = 0;

// AUDIO PLAYLIST ENGINE
var hudbaSpustena = false;
var audioTracks = [
    "Audio/track1.mp3",
    "Audio/track2.mp3",
    "Audio/track3.mp3",
    "Audio/track4.mp3",
    "Audio/track5.mp3",
    "Audio/track6.mp3"
];
var currentTrackIndex = 0;

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

// ROZBALOVACÍ BATOH - ZLATO AŽ ZA STRIEBROM
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
        { name: "Zlato", val: (inventar.suroviny["Zlato"] || 0) + "g", img: "Img/zlato.webp" }
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

// STREDOVEKÉ OZNAMOVACIE OKNO
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

// 🔍 INTERAKTÍVNY NÁHĽAD KARTY S PREPÍNANÍM TRIED (F až S)
function otvorDetailKarty(meno, inicialnaTrieda) {
    var reg = getRegistryCard(meno);
    var modal = document.createElement("div");
    modal.className = "card-modal";
    modal.style.zIndex = "9999999";
    modal.onclick = function() { modal.remove(); };

    var zvolenaTrieda = inicialnaTrieda || "F";
    if (reg.isPlatinum) zvolenaTrieda = "PLATINUM";

    modal.innerHTML = `
        <div class="modal-content" style="text-align:center; max-width:580px; background:rgba(15,10,5,0.97);" onclick="event.stopPropagation()">
            <span class="card-modal-close" onclick="this.closest('.card-modal').remove()">&times;</span>
            <h2 style="color:#d4af37; margin-top:0; font-family:Georgia, serif;">🔍 DETAJLNÝ NÁHĽAD KARTY</h2>
            
            ${!reg.isPlatinum && !reg.isSpell ? `
                <div style="margin-bottom:15px;">
                    <label style="color:#aaa; font-size:0.9em; display:block; margin-bottom:6px;">Prepni náhľad triedy kováčstva:</label>
                    <div style="display:flex; justify-content:center; gap:6px; flex-wrap:wrap;">
                        ${["F","E","D","C","B","A","S"].map(function(cls) {
                            return `<button class="class-preview-btn ${cls === zvolenaTrieda ? 'active' : ''}" onclick="zmenNahladTriedy('${meno}', '${cls}')">${cls}-Class</button>`;
                        }).join("")}
                    </div>
                </div>
            ` : ''}

            <div style="display:flex; justify-content:center; margin:20px 0;">
                <div id="modal-card-preview-box" class="karta cls-${zvolenaTrieda}" style="transform: scale(1.7); transform-origin: center; margin:40px 0;">
                    ${vytvorHTMLKarty(meno, getRealPower({ n: meno, cls: zvolenaTrieda }), zvolenaTrieda, reg.row, reg.p)}
                </div>
            </div>

            <h3 style="color:#ffcc00; margin-top:45px; font-size:1.5em;">${meno}</h3>
            <p id="modal-card-desc" style="font-size:1.05em; line-height:1.6; color:#e0d0b0; background:rgba(0,0,0,0.5); padding:15px; border-radius:8px; border:1px solid #5a4d3e;">
                ${reg.abilityDesc || reg.desc || "Obyčajná bojová jednotka bez špeciálnej schopnosti."}
            </p>
        </div>
    `;

    document.body.appendChild(modal);
}

function zmenNahladTriedy(meno, cls) {
    var reg = getRegistryCard(meno);
    var previewBox = document.getElementById("modal-card-preview-box");
    if (!previewBox) return;

    previewBox.className = "karta cls-" + cls;
    previewBox.innerHTML = vytvorHTMLKarty(meno, getRealPower({ n: meno, cls: cls }), cls, reg.row, reg.p);

    var btns = document.querySelectorAll(".class-preview-btn");
    btns.forEach(function(b) {
        if (b.innerText.startsWith(cls)) b.classList.add("active");
        else b.classList.remove("active");
    });
}

// AUDIO PLAYLIST ENGINE
function prehratDalsiSong() {
    var audio = document.getElementById("bg-music");
    if (!audio) return;

    currentTrackIndex = Math.floor(Math.random() * audioTracks.length);
    audio.src = audioTracks[currentTrackIndex];
    audio.play().then(function() {
        hudbaSpustena = true;
    }).catch(function(e) {});

    audio.onended = function() {
        prehratDalsiSong();
    };
}

function spustitHudbuPoPrvomKliknuti() {
    if (!hudbaSpustena) {
        prehratDalsiSong();
    }
}

function prepniZvuk() {
    var audio = document.getElementById("bg-music");
    var btn = document.getElementById("mute-btn");
    if (!audio) return;
    if (audio.paused) {
        audio.play();
        hudbaSpustena = true;
        if (btn) btn.innerText = "🔊";
    } else {
        audio.pause();
        if (btn) btn.innerText = "🔇";
    }
}

function upravHlasitost(val) {
    var audio = document.getElementById("bg-music");
    if (audio) audio.volume = val;
}

function pozastavitHudbuPreVideo() {
    var audio = document.getElementById("bg-music");
    if (audio && !audio.paused) {
        audio.pause();
    }
}

function obnovitHudbuPoVideu() {
    var audio = document.getElementById("bg-music");
    if (audio && audio.paused && hudbaSpustena) {
        audio.play().catch(function(e) {});
    }
}

function zobraziťObrazovku(idObrazovky) {
    var obrazovky = ["hlavne-menu", "hracia-plocha", "dielna-modal", "obchod-modal", "navod-modal", "deckbuilder-modal"];
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

function otvoriťDeckbuilder() {
    var el = document.getElementById("deckbuilder-modal");
    if (el) el.style.display = "flex";
    vygenerujDeckbuilder();
}

function vygenerujDeckbuilder() {
    var e = document.getElementById("deckbuilder-zoznam");
    if (!e) return;
    e.innerHTML = "";
    Object.keys(MASTER_REGISTRY).forEach(function(t) {
        var reg = MASTER_REGISTRY[t];
        var div = document.createElement("div");
        div.className = "karta cls-" + (reg.isPlatinum ? "PLATINUM" : "F");
        div.innerHTML = vytvorHTMLKarty(t, getRealPower({n:t, cls:"F"}), "F", reg.row, reg.p);
        div.onclick = function() { ukazOznamenie("🎴 ZOSTAVA", "Karta <strong>" + t + "</strong> bola pridaná do tvojej bojovej zostavy!"); };
        e.appendChild(div);
    });
}

function spustitZapasLokálnePVP() {
    jeSingleplayer = false;
    inicializujNovyZapas();
}

function zobraziťMenuAI() {
    var obt = prompt("Vyber obtiažnosť AI:\nA - Ťažká (Inteligentná)\nB - Stredná (Vyvážená)\nC - Ľahká (Nováčik)", "B");
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

// INICIALIZÁCIA ZÁPASU & MULLIGAN
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
            <p style="font-size:1.1em; line-height:1.6; color:#ccc;">
                Preskúmaj svoju vytiahnutú ruku v spodnom rade.<br>
                Chceš si nechať tieto karty, alebo zariskuješ výmenu všetkých 10 kariet?
            </p>
            <div style="background:rgba(255,77,77,0.15); border:1px solid #ff4d4d; padding:10px; border-radius:6px; color:#ff9999; font-size:0.9em; margin:15px 0;">
                ⚠️ TREST ZA RISK: Ak odhodíš ruku, súper získa **+4b náskok do každého kola**!
            </div>
            <div class="mulligan-btn-group">
                <button onclick="potvrditMulliganRuku(false)" style="background:#10b981; color:#fff; border:none; padding:12px 25px; border-radius:6px; font-weight:bold; font-size:1em; cursor:pointer;">✅ Ponechať Ruku & Hrať</button>
                <button onclick="potvrditMulliganRuku(true)" style="background:#8b0000; color:#fff; border:1px solid #ff4d4d; padding:12px 25px; border-radius:6px; font-weight:bold; font-size:1em; cursor:pointer;">🎲 Odhodiť & Potiahnuť Nové (+4b Súper)</button>
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
        ukazOznamenie("🎲 MULLIGAN RISK", "Odhodil si ruku! Potiahol si 10 nových kariet. Súper získava +4b náskok do každého kola!");
    } else {
        ukazOznamenie("✅ RUKA POTVRDENÁ", "Zápas oficiálne začína. Si na ťahu!");
    }

    vykresliHraciuPlochu();
}

// HTML RENDERER A VYKLADANIE KARIET
function vytvorHTMLKarty(meno, livePwr, cls, row, origPwr) {
    var reg = getRegistryCard(meno);
    var imgPath = reg.img || "Img/default.webp";
    var cisteMeno = meno.replace(/\s+\d+$/, "").trim();

    var html = "";
    if (livePwr !== "none") {
        html += "<div class='karta-kruh karta-kruh-pwr'>" + livePwr + "</div>";
    }
    
    var renderCls = reg.isPlatinum ? "PLATINUM" : cls;
    html += "<div class='karta-kruh karta-kruh-cls cls-" + renderCls + "'>" + (reg.isPlatinum ? "P" : cls) + "</div>";
    html += "<button class='karta-btn-inspect' title='Zväčšiť kartu' onclick='event.stopPropagation(); otvorDetailKarty(\"" + meno + "\", \"" + cls + "\");'>🔍</button>";
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
        ukazOznamenie("⚠️ NIE SI NA ŤAHU", "Teraz je na ťahu Hráč " + aktualnyHrac + "!");
        return;
    }

    if ((pNum === 1 && p1Pass) || (pNum === 2 && p2Pass)) {
        ukazOznamenie("🏳️ PASSOVANÉ KOLO", "V tomto kole si už passol svoje ťahy!");
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
            ukazOznamenie("🧹 ŠAŠO OČISTIL STÔL", "Dvorný šašo odstránil všetky negatívne kúzla zo stola!");
        } else {
            neutralne_vplyvy.push(card.n);
            ukazOznamenie("⚡ VYLOŽENÉ KÚZLO", "Vyložil si kúzlo: <strong>" + card.n + "</strong>!");
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
    
    ukazOznamenie("🏳️ PASS", "Hráč " + pNum + " passol svoje ťahy v tomto kole.", function() {
        if (p1Pass && p2Pass) skontrolujKoniecKola();
        else prepniHracov();
    });
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

    ukazOznamenie("🏁 KONIEC KOLA", sprava, function() {
        aktualizujKolaUI();
        if (r1 >= 2 || r2 >= 2) vyhodnotKoniecZapasu();
        else pripravNoveKolo();
    });
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

// VIDEO TRUHLICE
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
    var coinsEarned = 0, goldEarned = 0;
    var maxKariet = 0;
    var ziskaneSuroviny = {};

    if (typ === "vitaz") {
        coinsEarned = Math.floor(Math.random() * 151) + 150;
        goldEarned = Math.floor(Math.random() * 4) + 2;
        maxKariet = Math.floor(Math.random() * 4) + 3;

        p1_played_cards.forEach(function(c) {
            var cls = c.cls || "F";
            if (cls === "E") ziskaneSuroviny["Drevo"] = (ziskaneSuroviny["Drevo"] || 0) + 1;
            if (cls === "D") ziskaneSuroviny["Kov"] = (ziskaneSuroviny["Kov"] || 0) + 1;
            if (cls === "C") ziskaneSuroviny["Bronz"] = (ziskaneSuroviny["Bronz"] || 0) + 1;
            if (cls === "B") ziskaneSuroviny["Striebro"] = (ziskaneSuroviny["Striebro"] || 0) + 1;
            if (cls === "A") ziskaneSuroviny["Zlato"] = (ziskaneSuroviny["Zlato"] || 0) + 1;
        });
    } else {
        coinsEarned = Math.floor(Math.random() * 51) + 50;
        goldEarned = (Math.random() < 0.1) ? 1 : 0;
        maxKariet = Math.floor(Math.random() * 3) + 1;
    }

    ziskaneSuroviny["Koža"] = (ziskaneSuroviny["Koža"] || 0) + 1;

    inventar.mince += coinsEarned;
    inventar.suroviny["Zlato"] = (inventar.suroviny["Zlato"] || 0) + goldEarned;
    Object.keys(ziskaneSuroviny).forEach(function(mat) {
        inventar.suroviny[mat] = (inventar.suroviny[mat] || 0) + ziskaneSuroviny[mat];
    });

    var odmenyHtml = `
        <div class="karta-surovina">
            <div class="surovina-badge">+${coinsEarned}</div>
            <div class="surovina-foto" style="background-image: url('Img/mince.webp');"></div>
            <div class="surovina-stitok">
                <div class="surovina-nazov">Kopa Mincí</div>
            </div>
        </div>
    `;

    if (goldEarned > 0) {
        odmenyHtml += `
            <div class="karta-surovina">
                <div class="surovina-badge">+${goldEarned}g</div>
                <div class="surovina-foto" style="background-image: url('Img/zlato.webp');"></div>
                <div class="surovina-stitok">
                    <div class="surovina-nazov">Hruda Zlata</div>
                </div>
            </div>
        `;
    }

    var surovinyMapInfo = {
        "Koža": { nazov: "Tvrdená Koža", img: "Img/koza.webp" },
        "Drevo": { nazov: "Kováčske Drevo", img: "Img/drevo.webp" },
        "Kov": { nazov: "Železný Kov", img: "Img/zelezo.webp" },
        "Bronz": { nazov: "Bronzový Odliatok", img: "Img/bronz.webp" },
        "Striebro": { nazov: "Strieborná Tehlička", img: "Img/striebro.webp" }
    };

    Object.keys(ziskaneSuroviny).forEach(function(matKey) {
        var info = surovinyMapInfo[matKey];
        if (info) {
            odmenyHtml += `
                <div class="karta-surovina">
                    <div class="surovina-badge">+${ziskaneSuroviny[matKey]}x</div>
                    <div class="surovina-foto" style="background-image: url('${info.img}');"></div>
                    <div class="surovina-stitok">
                        <div class="surovina-nazov">${info.nazov}</div>
                    </div>
                </div>
            `;
        }
    });

    var dostupneFm = Object.keys(MASTER_REGISTRY).filter(function(m) {
        var r = MASTER_REGISTRY[m];
        return !r.isPlatinum && !r.isSpell;
    });

    for (var i = 0; i < maxKariet; i++) {
        var randCardName = dostupneFm[Math.floor(Math.random() * dostupneFm.length)];
        if (!inventar.karty[randCardName]) inventar.karty[randCardName] = { repliky: { "F": 0 }, aktivnaTrieda: "F" };
        if (typeof inventar.karty[randCardName].repliky !== "object") inventar.karty[randCardName].repliky = { "F": 0 };
        inventar.karty[randCardName].repliky["F"] = (inventar.karty[randCardName].repliky["F"] || 0) + 1;

        var reg = getRegistryCard(randCardName);
        var realPwr = getRealPower({ n: randCardName, cls: "F" });
        odmenyHtml += `<div class="karta cls-F">${vytvorHTMLKarty(randCardName, realPwr, "F", reg.row, reg.p)}</div>`;
    }

    var rewardsBox = document.createElement("div");
    rewardsBox.className = "chest-rewards-modal";
    rewardsBox.innerHTML = `
        <h2>🎉 TRUHLA OTVORENÁ!</h2>
        <p style="color:#aaa; font-size:1em;">Získal si nasledujúce odmeny do svojej pokladnice:</p>
        <div class="rewards-card-container">
            ${odmenyHtml}
        </div>
        <button onclick="zatvoritTruhluAOpustit('${overlayElement.id}')" style="background:#10b981; color:#fff; border:none; padding:12px 35px; border-radius:6px; font-weight:bold; font-size:1.1em; cursor:pointer; margin-top:10px;">Zobrať Všetko do Batohu</button>
    `;

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

// VYHODNOCOVANIE STOLA
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

// KNIŽNÝ NÁVOD KRÁĽOVSTVA
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
                    <h4 style="color:#d4af37; margin-top:0; font-size:1.2em;">📦 TRUHLA ÚČASTNÍKA (Odohraný zápas)</h4>
                    <ul style="line-height:1.8;">
                        <li><strong>Mince:</strong> 50 až 100 mincí (100% garancia).</li>
                        <li><strong>Karty:</strong> 1× až 3× náhodná F-kópia z registra kariet.</li>
                        <li><strong>Tvrdená koža:</strong> 100% garancia (1× Koža).</li>
                        <li><strong>Zlato:</strong> 10 % šanca na 1g Zlata.</li>
                    </ul>
                </div>

                <div style="background:rgba(0,0,0,0.5); border:2px solid #5a4d3e; padding:18px; border-radius:10px;">
                    <h4 style="color:#ffcc00; margin-top:0; font-size:1.2em;">🏆 TRUHLA VÍŤAZA (Výhra v zápase)</h4>
                    <ul style="line-height:1.8;">
                        <li><strong>Mince:</strong> 150 až 300 mincí (100% garancia).</li>
                        <li><strong>Karty (Balík):</strong> 3× až 6× náhodných F-kópií kariet.</li>
                        <li><strong>Garantované Zlato:</strong> 2g až 5g Zlata do pokladnice.</li>
                        <li><strong>Jackpot (0.5 %):</strong> Obrovský drop 100× F-kariet naraz!</li>
                    </ul>
                </div>
            </div>
        `;
    } else if (aktualnaStranaKnihy === 2) {
        container.innerHTML = `
            <h3 style="color:#ffcc00;">🔨 KAPITOLA II: INTERAKTÍVNY KOVÁČSKY STROM KARIET</h3>
            <p style="font-size:0.95em;">Vyber si ktorúkoľvek triedu kováčstva! Na postúpenie potrebuješ presne **3 rovnocenné karty zvolenej triedy** + príslušnú surovinu + poplatok v minciach:</p>
            
            <div style="width:100%; height:58vh; overflow:auto; border:2px solid #d4af37; background:#0a0806; border-radius:10px; padding:20px; box-sizing:border-box; margin-top:10px;">
                <div style="min-width:1450px; display:flex; align-items:center; justify-content:space-between; position:relative;">
                    
                    <div style="background:#1e1810; border:2px solid #8b5a2b; padding:15px; border-radius:8px; width:180px; text-align:center;">
                        <h4 style="color:#8b5a2b; margin:0;">F-Class (Základ)</h4>
                        <p style="font-size:0.85em; color:#aaa;">Základ z truhlice<br>Sila: +0b<br>Surovina: -</p>
                    </div>

                    <div style="color:#d4af37; font-size:1.4em; font-weight:bold;">➔ 3× + 10m ➔</div>

                    <div style="background:#1e1810; border:2px solid #3b82f6; padding:15px; border-radius:8px; width:180px; text-align:center;">
                        <h4 style="color:#3b82f6; margin:0;">E-Class</h4>
                        <p style="font-size:0.85em; color:#aaa;">Sila: +1b<br>3× Koža | Šanca: 100%</p>
                    </div>

                    <div style="color:#d4af37; font-size:1.4em; font-weight:bold;">➔ 3× + 25m ➔</div>

                    <div style="background:#1e1810; border:2px solid #10b981; padding:15px; border-radius:8px; width:180px; text-align:center;">
                        <h4 style="color:#10b981; margin:0;">D-Class</h4>
                        <p style="font-size:0.85em; color:#aaa;">Sila: +1b<br>3× Drevo | Šanca: 90%</p>
                    </div>

                    <div style="color:#d4af37; font-size:1.4em; font-weight:bold;">➔ 3× + 50m ➔</div>

                    <div style="background:#1e1810; border:2px solid #f59e0b; padding:15px; border-radius:8px; width:180px; text-align:center;">
                        <h4 style="color:#f59e0b; margin:0;">C-Class</h4>
                        <p style="font-size:0.85em; color:#aaa;">Sila: +2b<br>3× Kov | Šanca: 80%</p>
                    </div>

                    <div style="color:#d4af37; font-size:1.4em; font-weight:bold;">➔ 3× + 100m ➔</div>

                    <div style="background:#1e1810; border:2px solid #8b5cf6; padding:15px; border-radius:8px; width:180px; text-align:center;">
                        <h4 style="color:#8b5cf6; margin:0;">B-Class</h4>
                        <p style="font-size:0.85em; color:#aaa;">Sila: +2b<br>3× Bronz | Šanca: 70%</p>
                    </div>

                    <div style="color:#d4af37; font-size:1.4em; font-weight:bold;">➔ 3× + 250m ➔</div>

                    <div style="background:#1e1810; border:2px solid #ec4899; padding:15px; border-radius:8px; width:180px; text-align:center;">
                        <h4 style="color:#ec4899; margin:0;">A-Class</h4>
                        <p style="font-size:0.85em; color:#aaa;">Sila: +2b<br>3× Striebro | Šanca: 55%</p>
                    </div>

                    <div style="color:#d4af37; font-size:1.4em; font-weight:bold;">➔ 3× + 500m ➔</div>

                    <div style="background:#2a1a08; border:3px solid #ffcc00; padding:15px; border-radius:8px; width:200px; text-align:center; box-shadow:0 0 20px rgba(255,204,0,0.5);">
                        <h4 style="color:#ffcc00; margin:0; font-size:1.1em;">👑 S-Class (LEGENDA)</h4>
                        <p style="font-size:0.85em; color:#fff;">Sila: +3b<br>3× Zlato | Šanca: 40%</p>
                    </div>

                </div>
            </div>
        `;
    } else if (aktualnaStranaKnihy === 3) {
        container.innerHTML = `
            <h3 style="color:#ffcc00;">🛠️ KAPITOLA III: SEPARÁTNY STROM PREDMETOV & ZVITKY OCHRANY</h3>
            
            <h4 style="color:#d4af37;">🍺 HOSTIŠTENSKÝ STROM PREDMETOV (Alcohol, Kvety, Orechy):</h4>
            <table style="width:100%; border-collapse:collapse; text-align:center; margin-bottom:20px; border:1px solid #5a4d3e;">
                <tr style="background:#2a1a08; color:#ffcc00;">
                    <th style="padding:8px; border:1px solid #5a4d3e;">Trieda Predmetu</th>
                    <th style="padding:8px; border:1px solid #5a4d3e;">Bonus pre Celý Rad</th>
                </tr>
                <tr><td style="padding:6px; border:1px solid #5a4d3e;">F-Class</td><td style="padding:6px; border:1px solid #5a4d3e;">+1b ku každej karte v rade</td></tr>
                <tr><td style="padding:6px; border:1px solid #5a4d3e;">E-Class</td><td style="padding:6px; border:1px solid #5a4d3e;">+2b ku každej karte v rade</td></tr>
                <tr><td style="padding:6px; border:1px solid #5a4d3e;">D-Class</td><td style="padding:6px; border:1px solid #5a4d3e;">+3b ku každej karte v rade</td></tr>
                <tr><td style="padding:6px; border:1px solid #5a4d3e;">C-Class</td><td style="padding:6px; border:1px solid #5a4d3e;">+4b ku každej karte v rade</td></tr>
                <tr><td style="padding:6px; border:1px solid #5a4d3e;">B-Class</td><td style="padding:6px; border:1px solid #5a4d3e;">+5b ku každej karte v rade</td></tr>
                <tr><td style="padding:6px; border:1px solid #5a4d3e;">A-Class</td><td style="padding:6px; border:1px solid #5a4d3e;">+6b ku každej karte v rade</td></tr>
                <tr style="color:#ffcc00; font-weight:bold;"><td style="padding:6px; border:1px solid #5a4d3e;">S-Class (LEGENDA)</td><td style="padding:6px; border:1px solid #5a4d3e;">+7b ku každej karte v rade!</td></tr>
            </table>

            <h4 style="color:#d4af37;">📜 ZVITKY OCHRANY ZA ZLATO:</h4>
            <table style="width:100%; border-collapse:collapse; text-align:center; border:1px solid #5a4d3e;">
                <tr style="background:#2a1a08; color:#ffcc00;">
                    <th style="padding:8px; border:1px solid #5a4d3e;">Typ Zvitku</th>
                    <th style="padding:8px; border:1px solid #5a4d3e;">Cena</th>
                    <th style="padding:8px; border:1px solid #5a4d3e;">Bonus Šance</th>
                    <th style="padding:8px; border:1px solid #5a4d3e;">Ochrana Karty</th>
                </tr>
                <tr><td style="padding:6px; border:1px solid #5a4d3e;">Bez Zvitku</td><td>0g</td><td>+0 %</td><td style="color:#ff4d4d;">❌ NIE (Stráca sa 1 karta)</td></tr>
                <tr><td style="padding:6px; border:1px solid #5a4d3e;">Základný Zvitok</td><td>100g</td><td>+10 %</td><td style="color:#10b981;">🛡️ ÁNO (Karta nezhorí)</td></tr>
                <tr><td style="padding:6px; border:1px solid #5a4d3e;">Pokročilý Zvitok</td><td>500g</td><td>+25 %</td><td style="color:#10b981;">🛡️ ÁNO (Karta nezhorí)</td></tr>
                <tr><td style="padding:6px; border:1px solid #5a4d3e;">Legendárny Zvitok</td><td>1000g</td><td>+55 %</td><td style="color:#10b981;">🛡️ ÁNO (Šanca A➔S až 95%!)</td></tr>
            </table>
        `;
    } else if (aktualnaStranaKnihy === 4) {
        container.innerHTML = `
            <h3 style="color:#ffcc00;">⚡ KAPITOLA IV: NEUTRÁLNE KÚZLA & PLATINOVÉ KARTY</h3>
            <p style="font-size:1.05em; line-height:1.6;">Dve kategórie kariet sa v Dielni **nikdy nevylepšujú** a nemajú triedy (F až S):</p>
            <ul style="line-height:1.8;">
                <li><strong>⚡ Neutrálne Kúzla Stola:</strong> (*Musíme sa porozprávať, Upokoj sa, Ohnostroj, Šicko v porádku*) sa vykladajú do stredového radu. Slúžia na zrazenie základnej sily celého radu súpera na **1b**!</li>
                <li><strong>👑 Platinové Putovné Karty (12 Postáv):</strong> (*Katy, Nela, Michal, Erik, Marek, Ďuri, Doktor, Sestrička, Sisa, Oli, Kika, Suseda*) majú stály **Platinový Rám**. Nedajú sa predávať ani kovať — sú to unikátne výhry viazané na rebríčky!</li>
            </ul>
        `;
    } else if (aktualnaStranaKnihy === 5) {
        container.innerHTML = `
            <h3 style="color:#ffcc00;">🛒 KAPITOLA V: PLAYER-DRIVEN TRHOVISKO & AUKCIÍ</h3>
            <p style="font-size:1.05em; line-height:1.6;">Ekonomika gry je vytvorená tak, aby bol každý hráč prepojený s trhom:</p>
            <ul style="line-height:1.8;">
                <li><strong>Výmena Duplikátov:</strong> Ak ti chýbajú kópie určitej karty do Dielne, kúpiš ich na Trhovisku od iných hráčov za mince.</li>
                <li><strong>Mincové Poplatky:</strong> Systém si účtuje 5% poplatok za zalistovanie aukcie a 10% daň z úspešného predaja pre ochranu mincí pred hyperinfláciou.</li>
                <li><strong>Výkup Dielne:</strong> Ak potrebuješ rýchle mince, Dielňa odkúpi akýkoľvek duplikát za výkupnú cenu (+3m).</li>
            </ul>
        `;
    }
}

// DIELŇA, ANIMÁCIA KOVANIA & DEV MENU
function devPridatSurovinyACheaty() {
    inventar.mince += 10000;
    inventar.suroviny["Koža"] = (inventar.suroviny["Koža"] || 0) + 100;
    inventar.suroviny["Drevo"] = (inventar.suroviny["Drevo"] || 0) + 100;
    inventar.suroviny["Kov"] = (inventar.suroviny["Kov"] || 0) + 100;
    inventar.suroviny["Bronz"] = (inventar.suroviny["Bronz"] || 0) + 100;
    inventar.suroviny["Striebro"] = (inventar.suroviny["Striebro"] || 0) + 100;
    inventar.suroviny["Zlato"] = (inventar.suroviny["Zlato"] || 0) + 1000;

    Object.keys(MASTER_REGISTRY).forEach(function(t) {
        var reg = MASTER_REGISTRY[t];
        if (!reg.isPlatinum) {
            if (!inventar.karty[t]) inventar.karty[t] = { repliky: {}, aktivnaTrieda: "F" };
            if (typeof inventar.karty[t].repliky !== "object") inventar.karty[t].repliky = {};
            inventar.karty[t].repliky["F"] = (inventar.karty[t].repliky["F"] || 0) + 10;
            inventar.karty[t].repliky["E"] = (inventar.karty[t].repliky["E"] || 0) + 5;
            inventar.karty[t].repliky["D"] = (inventar.karty[t].repliky["D"] || 0) + 3;
        }
    });

    ukazOznamenie("⚡ DEV CHEAT AKTIVOVANÝ", "Pridaných 10 000 mincí, 1000g Zlata, suroviny a duplikáty F/E/D ku všetkým kartám!");
    aktualizujPanelDielne();
    vykresliRozbalovaciBatoh();
}

function vylepsiKartuVoForge(meno, transitionKey, pergamenType) {
    var t = inventar.karty[meno];
    if (!t) return;

    var cfg = FORGE_RATES[transitionKey];
    if (!cfg) { ukazOznamenie("⚠️ CHYBA KOVANIA", "Neznámy kováčsky krok!"); return; }

    var fromCls = cfg.from;
    var nextCls = cfg.nextClass;

    var countCurrent = (typeof t.repliky === "object") ? (t.repliky[fromCls] || 0) : t.repliky;
    if (countCurrent < 3) { ukazOznamenie("⚠️ NEDOSTATOK KARIET", "Na tento krok potrebuješ presne **3x karty triedy " + fromCls + "**! (Máš: " + countCurrent + "x)"); return; }
    
    var reqMat = cfg.reqMat;
    if ((inventar.suroviny[reqMat] || 0) < cfg.reqMatCount) { ukazOznamenie("⚠️ NEDOSTATOK SUROVÍN", "Potrebuješ " + cfg.reqMatCount + "x " + reqMat + "!"); return; }

    if (inventar.mince < cfg.coinFee) { ukazOznamenie("⚠️ NEDOSTATOK MINCÍ", "Potrebuješ " + cfg.coinFee + " m za kováčsky poplatok!"); return; }

    var pCfg = PERGAMENY_CONFIG[pergamenType || "none"];
    if (pCfg.goldCost > 0 && (inventar.suroviny["Zlato"] || 0) < pCfg.goldCost) { ukazOznamenie("⚠️ NEDOSTATOK ZLATA", "Potrebuješ " + pCfg.goldCost + "g Zlata na tento zvitok!"); return; }

    inventar.mince -= cfg.coinFee;
    inventar.suroviny[reqMat] -= cfg.reqMatCount;
    if (pCfg.goldCost > 0) inventar.suroviny["Zlato"] -= pCfg.goldCost;

    var finalRate = Math.min(0.95, cfg.rate + pCfg.rateBonus);
    var roll = Math.random();
    var isSuccess = (roll <= finalRate);

    spustitVideoAnimationKovania(meno, fromCls, nextCls, isSuccess, pCfg.saveCard);
}

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
        <video id="forge-video-element" src="Img/vylepsovanie.mp4" autoplay playsinline></video>
        <div class="forge-cards-container">
            <div id="forge-card-1" class="karta cls-${oldCls} forge-slot-card">${vytvorHTMLKarty(meno, oldPwr, oldCls, reg.row, reg.p)}</div>
            <div id="forge-card-2" class="karta cls-${oldCls} forge-slot-card">${vytvorHTMLKarty(meno, oldPwr, oldCls, reg.row, reg.p)}</div>
            <div id="forge-card-3" class="karta cls-${oldCls} forge-slot-card">${vytvorHTMLKarty(meno, oldPwr, oldCls, reg.row, reg.p)}</div>
            ${fourthCardHtml}
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
        var t = inventar.karty[meno];
        if (typeof t.repliky !== "object") {
            var oldVal = t.repliky || 0;
            t.repliky = { "F": oldVal };
        }

        if (isSuccess) {
            t.repliky[oldCls] = Math.max(0, (t.repliky[oldCls] || 0) - 3);
            t.repliky[nextCls] = (t.repliky[nextCls] || 0) + 1;
            t.aktivnaTrieda = nextCls;
            ukazOznamenie("🎉 KOVANIE ÚSPEŠNÉ!", "Karta <strong>" + meno + "</strong> bola úspešne povýšená na <strong>" + nextCls + "-Class</strong>!");
        } else {
            if (!wasProtected) {
                t.repliky[oldCls] = Math.max(0, (t.repliky[oldCls] || 0) - 1);
                ukazOznamenie("💥 KOVANIE ZLYHALO!", "Suroviny zhoreli v plameňoch a prišiel si o 1 duplikát karty!");
            } else {
                ukazOznamenie("🛡️ ZVITOK OCHRÁNIL KARTU!", "Kovanie zlyhalo, ale Zvitok za Zlato ochránil tvoje karty pred zničením!");
            }
        }

        overlay.remove();
        obnovitHudbuPoVideu();
        aktualizujPanelDielne();
        vykresliRozbalovaciBatoh();
    };
}

function recyklujKartuDielne(meno) {
    var t = inventar.karty[meno];
    if (t) {
        var curCls = t.aktivnaTrieda || "F";
        var countCurrent = (typeof t.repliky === "object") ? (t.repliky[curCls] || 0) : t.repliky;
        if (countCurrent > 0) {
            if (typeof t.repliky === "object") t.repliky[curCls]--;
            else t.repliky--;
            inventar.mince += 3;
            ukazOznamenie("♻️ VÝKUP", "Predané systému za výkupnú cenu (+3 mince)!");
            aktualizujPanelDielne();
            vykresliRozbalovaciBatoh();
        }
    }
}

// TRHOVISKO A AUKCIE
var aukcnyCasomeračInterval = null;
var aktualnaPonukaMinci = 120;

function vygenerujSimulaciuTrhu() {
    var e = document.getElementById("obchod-regaly-zoznam");
    if (!e) return;

    var reg = MASTER_REGISTRY["Neviditeľný Mário"];
    var realPwr = getRealPower({ n: "Neviditeľný Mário", cls: "E" });

    e.innerHTML = `
        <div style="background:#1e140a; border:2px solid #d4af37; padding:15px; border-radius:10px; text-align:center; margin-bottom:20px;">
            <h3 style="color:#d4af37; margin-top:0;">👑 HRÁČSKE AUKČNÉ TRHOVISKO</h3>
            <p style="font-size:0.9em; color:#ccc;">Ponúkaj a draž vzácne karty s ostatnými hráčmi v reálnom čase!</p>
            <button onclick="ukazOznamenie('🛒 Vytvoriť Aukciu', 'Tvoja karta bola úspešne zalistovaná na trh s poplatkom 5% mincí!')" style="background:#10b981; color:#fff; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; cursor:pointer;">➕ Vytvoriť Novú 24h Aukciu</button>
        </div>

        <div class="auction-card-box">
            <div class="karta cls-E">
                ${vytvorHTMLKarty("Neviditeľný MARIO 1", realPwr, "E", reg.row, reg.p)}
            </div>
            
            <div style="flex-grow:1;">
                <h3 style="color:#ffcc00; margin:0 0 5px 0;">Neviditeľný Mário (E-Class)</h3>
                <p style="margin:2px 0; color:#aaa; font-size:0.9em;">Predajca: <strong>Lord_Grob_33</strong></p>
                
                <div style="background:rgba(0,0,0,0.5); border:1px solid #5a4d3e; padding:10px; border-radius:6px; margin:10px 0; max-width:320px;">
                    <div>⏱️ Čas do konca aukcie: <span id="auction-timer" style="color:#ffcc00; font-weight:bold;">23:59:59</span></div>
                    <div style="margin-top:5px;">💰 Najvyššia ponuka: <span id="auction-price" style="color:#10b981; font-weight:bold; font-size:1.1em;">${aktualnaPonukaMinci} m</span></div>
                </div>

                <button onclick="prihoditDoAukcie(10)" style="background:linear-gradient(180deg, #3b2d1d 0%, #21180e 100%); color:#ffcc00; border:1px solid #d4af37; padding:8px 18px; border-radius:6px; font-weight:bold; cursor:pointer;">💸 Prihodiť +10 Mincí</button>
            </div>
        </div>
    `;

    spustitOdpocitavanieAukcie();
}

function prihoditDoAukcie(suma) {
    if (inventar.mince < (aktualnaPonukaMinci + suma)) {
        ukazOznamenie("⚠️ NEDOSTATOK MINCÍ", "Nemáš dostatok mincí na prihodenie do tejto aukcie!");
        return;
    }
    aktualnaPonukaMinci += suma;
    var priceEl = document.getElementById("auction-price");
    if (priceEl) priceEl.innerText = aktualnaPonukaMinci + " m";
    ukazOznamenie("🎉 PRIHODENIE ÚSPEŠNÉ!", "Tvoja ponuka " + aktualnaPonukaMinci + " m bola akceptovaná. Si najvyšší prihadzujúci!");
}

function spustitOdpocitavanieAukcie() {
    if (aukcnyCasomeračInterval) clearInterval(aukcnyCasomeračInterval);
    
    var sekundyCelkom = 24 * 3600 - 1;
    aukcnyCasomeračInterval = setInterval(function() {
        var timerEl = document.getElementById("auction-timer");
        if (!timerEl) {
            clearInterval(aukcnyCasomeračInterval);
            return;
        }

        var h = Math.floor(sekundyCelkom / 3600);
        var m = Math.floor((sekundyCelkom % 3600) / 60);
        var s = sekundyCelkom % 60;

        timerEl.innerText = (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
        
        if (sekundyCelkom > 0) sekundyCelkom--;
        else clearInterval(aukcnyCasomeračInterval);
    }, 1000);
}

function aktualizujPanelDielne() {
    var e = document.getElementById("dielna-zoznam");
    if (!e) return;
    e.innerHTML = "";

    var devBtnDiv = document.createElement("div");
    devBtnDiv.style.gridColumn = "1/-1";
    devBtnDiv.style.marginBottom = "15px";
    devBtnDiv.innerHTML = `<button onclick="devPridatSurovinyACheaty()" style="background:#8b5cf6; color:#fff; border:none; padding:10px 20px; border-radius:6px; font-weight:bold; cursor:pointer; width:100%;">⚡ DEV MENU: Pridať 10 000 Mincí & Suroviny pre Testovanie</button>`;
    e.appendChild(devBtnDiv);

    Object.keys(MASTER_REGISTRY).forEach(function(t) {
        var reg = MASTER_REGISTRY[t];
        if (reg.isPlatinum || reg.isSpell) return;

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

        var curCls = cardData.aktivnaTrieda || "F";

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
            <button class="btn-recycle" style="margin-top:4px;" onclick="recyklujKartuDielne('${t}')">♻️ Výkup (+3m)</button>
        `;

        wrapper.appendChild(cardDiv);
        var actDiv = document.createElement("div");
        actDiv.style.width = "100%";
        actDiv.innerHTML = actions;
        wrapper.appendChild(actDiv);

        e.appendChild(wrapper);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    zobraziťObrazovku("hlavne-menu");
    aktualizujPanelDielne();
    vygenerujSimulaciuTrhu();
    vykresliRozbalovaciBatoh();
});

// GLOBÁLNE PREPOJENIA
window.spustitZapasLokálnePVP = spustitZapasLokálnePVP;
window.zobraziťMenuAI = zobraziťMenuAI;
window.spustitZapasProtiAI = spustitZapasProtiAI;
window.otvoriťObchod = otvoriťObchod;
window.otvoriťDielňu = otvoriťDielňu;
window.otvoriťDeckbuilder = otvoriťDeckbuilder;
window.otvoriťNavodHry = otvoriťNavodHry;
window.posunStraneKnihy = posunStraneKnihy;
window.vylepsiKartuVoForge = vylepsiKartuVoForge;
window.recyklujKartuDielne = recyklujKartuDielne;
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
window.zmenNahladTriedy = zmenNahladTriedy;
window.ukazOznamenie = ukazOznamenie;
window.prepniRozbalovanieBatohu = prepniRozbalovanieBatohu;
window.prihoditDoAukcie = prihoditDoAukcie;
