// =========================================================================
// RODINNÁ HRA - HOME WARS (VERZIA 9.2.0 - INSPECT LUPA & FORGE RITUÁL)
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

var VERZIA = "9.2.0";

// MASTER REGISTRAČNÁ TABUĽKA KARIET - GRAMATICKY OPRAVENÁ
var MASTER_REGISTRY = {
    // POSTAVY A JEDNOTKY (MUŽI)
    "Michal": { row: 1, p: 5, img: "Img/michal.png", desc: "Bystrý obchodník. Váži zlato a pozná presnú cenu každej veci v kráľovstve." },
    "Erik": { row: 1, p: 4, img: "Img/erik.png", desc: "Geniálny taktik, ktorý plánuje každý krok nad bojovou mapou so šachovými figúrkami." },
    "Marek": { row: 1, p: 4, img: "Img/marek.png", desc: "Učený filozof vo fialovom plášti. Svojimi rečami zmäti a odstráni každého protivníka." },
    "Duri": { row: 1, p: 6, img: "Img/duri.png", desc: "Veterán v plnej zbroji. Pevný a neoblomný pilier každej bitky." },
    "Doktor": { row: 1, p: 5, img: "Img/doktor.png", desc: "Hradný alchymista a lekár, ktorý vie namiešať liečivý elixír aj nebezpečný jed." },
    "Neviditelny Mario": { row: 1, p: 5, img: "Img/neviditelny-mario.png", desc: "Tajuplný zbojník v kapucni, ktorý nečakane udrie z tieňa a znova zmizne." },
    "Martin": { row: 1, p: 3, img: "Img/martin.png", desc: "Šikovný hraničiar a lovec, ktorý sa potichu kráča tmavým lesom." },
    "Tymko": { row: 1, p: 2, img: "Img/tymko.png", desc: "Obranný štvorročný bojovník s dreveným mečom a obrovským odhodlaním." },
    "Jaro": { row: 1, p: 3, img: "Img/jaro.png", desc: "Zručný kováč, z ktorého kovadliny vychádzajú tie najostrejšie meče." },
    
    // POSTAVY A JEDNOTKY (ŽENY)
    "Oli": { row: 2, p: 8, img: "Img/oli.png", desc: "Duchovná matka chrámu, strážiaca svätý pokoj a imunitu pred kúzlam." },
    "Sisa": { row: 2, p: 6, img: "Img/sisa.png", desc: "Mocná vládkyňa hradu pripíjajúca na víťazstvo svojho verného vojska." },
    "Katy": { row: 2, p: 2, img: "Img/katy.png", desc: "Dobrosrdečná pekárenská pomocníčka s čerstvým chlebom a láskavým srdcom." },
    "Nela": { row: 2, p: 6, img: "Img/nela.png", desc: "Malá princezná so žiariacim zvieraťom a magickým ochranným amuletom." },
    "Lula": { row: 2, p: 4, img: "Img/lula.png", desc: "Dvorná harfistka, ktorej čarovná hudba dokáže obmäkčiť aj srdce kata." },
    "Anka": { row: 2, p: 4, img: "Img/anka.png", desc: "Správkyňa hradných kľúčov. Bez jej povolenia sa neotvoria žiadne dvere." },
    "Darinka": { row: 2, p: 3, img: "Img/darinka.png", desc: "Majsterka tkáčka. Jej nádherné tkaniny chránia hradné dámy pred chladom." },
    "Viera": { row: 2, p: 2, img: "Img/viera.jpg", desc: "Hradná pekárka starajúca sa o bohaté zásoby chleba pre celú posádku." },
    "Sestricka": { row: 2, p: 3, img: "Img/sestricka.jpg", desc: "Milosrdná ošetrovateľka, ktorá stavia na nohy ranených bojovníkov z archívu." },
    "Kika": { row: 2, p: 5, isSpy: true, img: "Img/kika.jpg", desc: "Tajuplná hradná archivárka so zvinutými kráľovskými dekrétmi." },
    "Zvedava suseda": { row: 2, p: 1, isSpy: true, img: "Img/zvedava-suseda.jpg", desc: "Pozorné oko podhradia. Z okna jej neunikne ani jediný klep." },
    
    // ZVIERATÁ A SVORKY
    "Grobske Mravce 1": { row: 3, p: 1, img: "Img/grobske-mravce.jpg", desc: "Húževnatá svorka lesných mravcov. Sú malé, no v obrovskom počte nepremožiteľné." },
    "Grobske Mravce 2": { row: 3, p: 1, img: "Img/grobske-mravce.jpg", desc: "Húževnatá svorka lesných mravcov." },
    "Grobske Mravce 3": { row: 3, p: 1, img: "Img/grobske-mravce.jpg", desc: "Húževnatá svorka lesných mravcov." },
    "Petrzalske holuby 1": { row: 3, p: 2, img: "Img/petrzalske-holuby.png", desc: "Rýchli hradní posli prenášajúci tajné správy naprieč kráľovstvom." },
    "Petrzalske holuby 2": { row: 3, p: 2, img: "Img/petrzalske-holuby.png", desc: "Rýchli hradní posli prenášajúci tajné správy." },
    "Petrzalske holuby 3": { row: 3, p: 2, img: "Img/petrzalske-holuby.png", desc: "Rýchli hradní posli prenášajúci tajné správy." },
    "Kabelkovy pes": { row: 3, p: 2, img: "Img/kabelkovy-pes.png", desc: "Panský miláčik usadený na hodvábnom vankúši. Breše viac, než hryzie." },
    "Patkaňe": { row: 3, p: 1, img: "Img/patkane.jpg", desc: "Hladná pivničná svorka. Kde sa objavia, tam nastane chaos a zmätok." },
    "Sviňa lesná": { row: 3, p: 4, img: "Img/svina-lesna.png", desc: "Zúrivý lesný kanec, ktorý zmetie všetko, čo mu stojí v ceste." },
    "Zatúlaný tatranský medved": { row: 3, p: 5, img: "Img/tatransky-medved.png", desc: "Obrovská horská šelma zosadajúca zo zasnežených štítov." },
    "Pouličný mačiak": { row: 3, p: 2, img: "Img/poulicny-maciak.png", desc: "Tichý potulný kocúr obchádzajúci hradné múry a hľadajúci korisť." },
    "Komare": { row: 3, p: 1, img: "Img/komare.png", desc: "Oravské húfy komárov neúprosne trápiace zvierací rad." },
    
    // NEUTRÁLNE KARTY A VPLYVY
    "Alcohol": { row: 1, p: 0, img: "Img/alkohol.png", desc: "Súdok medoviny a pálenky pre mužský rad. Výrazne zvyšuje bojovú náladu." },
    "Kvety": { row: 2, p: 0, img: "Img/kvety.jpg", desc: "Kytica čerstvých poľných kvetov pre radosť a povzbudenie ženského radu." },
    "Medove Orechy": { row: 3, p: 0, img: "Img/medove-orechy.png", desc: "Sladká odmena posilňujúca verný zvierací rad." },
    "Musíme sa porozprávať": { row: 0, p: 0, img: "Img/musime-sa-porozpravat.png", desc: "Vážny rozhovor s hradnou paňou okamžite zmrazí silu mužského radu." },
    "Upokoj sa": { row: 0, p: 0, img: "Img/upokoj-sa.png", desc: "Nevhodne zvolené slová vyvolajú obrovský hnev v ženskom rade!" },
    "Ohnostroj": { row: 0, p: 0, img: "Img/ohnostroj.png", desc: "Rachot svetlíc a výbuchov vyplaší celý zvierací rad." },
    "Šicko v porádku": { row: 0, p: 0, img: "Img/sicko-v-poradku.jpg", desc: "Dvorný šašo prinesie smiech a vyčistí všetky nepriaznivé vplyvy na stole." }
};

var p1_played_cards = [], p2_played_cards = [];
var p1_erik_buff_row = null, p2_erik_buff_row = null;
var sc1 = 0, sc2 = 0, r1 = 0, r2 = 0, p1Pass = false, p2Pass = false, aktualnyHrac = 1, hracCakajuciNaAkciu = 0, blokujVykladanie = false;
var p1_full_deck = [], p2_full_deck = [], p1_draft_hand = [], p2_draft_hand = [];
var p1_used_mulligan = false, p2_used_mulligan = false, p1_confirmed_mulligan = false, p2_confirmed_mulligan = false;
var draft_faza = true; var p1_spalene = [], p2_spalene = [], neutralne_vplyvy = [];
var jeSingleplayer = false; var obtiaznostAI = "B"; var inventar = { mince: 500, karty: {}, zostava: [] };

function getRegistryCard(meno) {
    if (MASTER_REGISTRY[meno]) return MASTER_REGISTRY[meno];
    var zaklad = meno.replace(/\s\d$/, "");
    if (MASTER_REGISTRY[zaklad]) return MASTER_REGISTRY[zaklad];
    return MASTER_REGISTRY[meno] || {};
}

function isSpecialCard(name) {
    var spec = ["Musíme sa porozprávať", "Upokoj sa", "Ohnostroj", "Šicko v porádku", "Alcohol", "Kvety", "Medove Orechy"];
    return spec.indexOf(name) !== -1;
}

function getRealPower(card) {
    if (!card || isSpecialCard(card.n) || card.p === 0) return card.p;
    var bonus = 0;
    if (card.isSpy) {
        if ("B" === card.cls) bonus = -1;
        if ("A" === card.cls) bonus = -2;
        if ("S" === card.cls) bonus = -3;
    } else {
        if ("B" === card.cls) bonus = 1;
        if ("A" === card.cls) bonus = 2;
        if ("S" === card.cls) bonus = 3;
    }
    return Math.max(0, card.p + bonus);
}

function countMravce(list) { return list.filter(function(k) { return k && k.n && k.n.indexOf('Mravce') !== -1; }).length; }
function countHoluby(list) { return list.filter(function(k) { return k && k.n && k.n.indexOf('holuby') !== -1; }).length; }
function zratajRad(list, row) {
    var sum = 0;
    list.forEach(function(k) { if (k && k.row === row && "number" === typeof k.livePwr) sum += k.livePwr; });
    return sum;
}

function getRowLetterAndClass(row) {
    if (row === 1) return { text: "M", cls: "row-m" };
    if (row === 2) return { text: "Ž", cls: "row-z" };
    if (row === 3) return { text: "Z", cls: "row-a" };
    return { text: "⚡", cls: "row-n" };
}

function getAbilityBadge(meno) {
    if (meno === "Kika" || meno === "Zvedava suseda") return { text: "🕵️", title: "Špión" };
    if (meno === "Marek") return { text: "🧹", title: "Filozof" };
    if (meno === "Erik" || meno === "Sisa" || meno === "Michal" || meno === "Duri") return { text: "📢", title: "Buff / Taktik" };
    if (meno === "Katy") return { text: "💖", title: "Láskavosť" };
    if (meno === "Oli") return { text: "✝️", title: "Imunita" };
    if (meno === "Nela") return { text: "🛡️", title: "Amulet / Zámok" };
    if (meno === "Doktor" || meno === "Sestricka") return { text: "🏥", title: "Oživenie" };
    if (meno.indexOf("Mravce") !== -1 || meno.indexOf("holuby") !== -1) return { text: "🤝", title: "Svorka" };
    if (meno === "Alcohol" || meno === "Kvety" || meno === "Medove Orechy") return { text: "🛠️", title: "Predmet" };
    if (isSpecialCard(meno)) return { text: "⚡", title: "Vplyv stola" };
    return null;
}

// VYKRESLENIE KARTY S TLAČIDLOM PRE NÁHĽAD (🔍)
function vytvorHTMLKarty(meno, livePwr, cls, row, origPwr) {
    var rInfo = getRowLetterAndClass(row);
    var pwrClass = "";
    if (origPwr !== undefined && livePwr !== "none") {
        if (livePwr > origPwr) pwrClass = "buffed";
        else if (livePwr < origPwr) pwrClass = "debuffed";
    }

    var reg = getRegistryCard(meno);
    var imgPath = reg.img || "Img/default.jpg";
    var cisteMeno = meno.replace(/\s\d$/, "");

    var html = "";
    if (livePwr !== "none") {
        html += "<div class='karta-kruh karta-kruh-pwr " + pwrClass + "'>" + livePwr + "</div>";
    }
    html += "<div class='karta-kruh karta-kruh-cls cls-" + cls + "'>" + cls + "</div>";
    
    // Tlačidlo lupy pre zväčšenie
    html += "<button class='karta-btn-inspect' title='Zväčšiť kartu' onclick='event.stopPropagation(); otvorDetailKarty(\"" + meno + "\");'>🔍</button>";
    
    html += "<div class='karta-foto' style=\"background-image: url('" + encodeURI(imgPath) + "');\"></div>";
    html += "<div class='karta-nazov'>" + cisteMeno + "</div>";
    html += "<div class='karta-kruh karta-kruh-row " + rInfo.cls + "'>" + rInfo.text + "</div>";

    var ab = getAbilityBadge(meno);
    if (ab) {
        html += "<div class='karta-kruh karta-kruh-ability' title='" + ab.title + "'>" + ab.text + "</div>";
    }

    return html;
}

// OTTVORENIE DETAILU KARTY (ZOOM MODAL)
function otvorDetailKarty(meno) {
    var reg = getRegistryCard(meno);
    if (!reg) return;

    var modal = document.getElementById("card-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "card-modal";
        modal.className = "card-modal";
        modal.onclick = function() { modal.style.display = "none"; };
        document.body.appendChild(modal);
    }

    var cisteMeno = meno.replace(/\s\d$/, "");

    modal.innerHTML = `
        <div class="card-modal-content ${reg.cls || ''}" onclick="event.stopPropagation()">
            <span class="card-modal-close" onclick="document.getElementById('card-modal').style.display='none'">&times;</span>
            <div class="modal-foto" style="background-image: url('${encodeURI(reg.img)}');"></div>
            <h2>${cisteMeno}</h2>
            <div class="modal-stats">
                ${reg.p !== undefined ? `<span>Základná Sila: <strong>${reg.p}b</strong></span>` : ''}
                ${reg.row ? `<span>Rad: <strong>${reg.row}</strong></span>` : ''}
            </div>
            <p class="modal-desc">${reg.desc || 'Bez popisu.'}</p>
        </div>
    `;
    modal.style.display = "flex";
}

// MAGICKÝ RITUÁL KOVANIA VO FORGE (ANIMÁCIA)
function spustiKovaciRitual(meno, staraTrieda, novaTrieda, spotrebovaneRepliky) {
    var modal = document.getElementById("forge-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "forge-modal";
        modal.className = "forge-modal-overlay";
        document.body.appendChild(modal);
    }

    var reg = getRegistryCard(meno);
    var imgPath = reg.img || "Img/default.jpg";

    modal.innerHTML = `
        <div class="forge-ritual-box">
            <h2 class="forge-title">🔨 MAGICKÉ KOVANIE...</h2>
            <div class="forge-arena">
                <div class="forge-orb orb-1"></div>
                <div class="forge-orb orb-2"></div>
                <div class="forge-orb orb-3"></div>
                <div class="karta cls-${staraTrieda} forge-target-card" id="forge-target-card">
                    <div class="karta-foto" style="background-image: url('${encodeURI(imgPath)}');"></div>
                    <div class="karta-nazov">${meno}</div>
                </div>
            </div>
            <div class="forge-status">Spájanie ${spotrebovaneRepliky}x materiálu...</div>
        </div>
    `;
    modal.style.display = "flex";

    // Spustenie animácie
    setTimeout(function() {
        var card = document.getElementById("forge-target-card");
        if (card) {
            card.className = "karta cls-" + novaTrieda + " forge-target-card forge-sparkle-active";
            if (novaTrieda === "S") card.classList.add("karta-s-class-aura");
        }
    }, 1000);

    setTimeout(function() {
        modal.style.display = "none";
    }, 2800);
}

function prepniSekciuVizualne(sekciaId) {
    var sekcie = document.querySelectorAll('.sekcia-obsah');
    sekcie.forEach(function(s) { s.classList.add('schovana-sekcia'); });
    var ciel = document.getElementById(sekciaId);
    if (ciel) ciel.classList.remove('schovana-sekcia');

    var taby = document.querySelectorAll('.menu-tab');
    taby.forEach(function(t) { t.classList.remove('aktivna-tab'); });
    
    if (sekciaId === 'sekcia-hra') document.getElementById('menu-btn-hra').classList.add('aktivna-tab');
    if (sekciaId === 'sekcia-zostava') document.getElementById('menu-btn-zostava').classList.add('aktivna-tab');
    if (sekciaId === 'sekcia-dielna') document.getElementById('menu-btn-dielna').classList.add('aktivna-tab');
    if (sekciaId === 'sekcia-trhovisko') document.getElementById('menu-btn-trhovisko').classList.add('aktivna-tab');
}

function vytvorZoznamKariet(pNum) {
    var rawList = Object.keys(MASTER_REGISTRY);
    if (1 === pNum && 0 === Object.keys(inventar.karty).length) {
        rawList.forEach(function(m) { inventar.karty[m] = { replikyC: 1, aktivnaTrieda: "C" }; });
        inventar.zostava = rawList.slice(0, 30);
    }
    var fList = [];
    if (1 === pNum) {
        if (!inventar.zostava || 0 === inventar.zostava.length) { inventar.zostava = rawList.slice(0, 30); }
        fList = inventar.zostava;
    } else {
        fList = rawList.slice().sort(function() { return 0.5 - Math.random(); }).slice(0, 30);
    }
    return fList.map(function(m) {
        var dR = MASTER_REGISTRY[m]; var tK = "C";
        if (1 === pNum) { tK = inventar.karty[m] ? inventar.karty[m].aktivnaTrieda : "C"; } 
        else if (jeSingleplayer) {
            var r = Math.random() * 30;
            if ("B" === obtiaznostAI) tK = (r < 10) ? "B" : "C";
            else if ("A" === obtiaznostAI) tK = (r < 10) ? "A" : "B";
            else if ("S" === obtiaznostAI) tK = (r < 10) ? "S" : "A";
        }
        return { n: m.replace(/\s\d$/, ""), row: dR.row, p: dR.p, pNum: pNum, isSpy: dR.isSpy || false, cls: tK };
    });
}

function spustiDraft() {
    draft_faza = true;
    p1Pass = false; p2Pass = false;
    p1_erik_buff_row = null; p2_erik_buff_row = null;
    p1_full_deck = vytvorZoznamKariet(1); p2_full_deck = vytvorZoznamKariet(2);
    p1_draft_hand = []; p2_draft_hand = []; p1_used_mulligan = false; p2_used_mulligan = false; p1_confirmed_mulligan = false; p2_confirmed_mulligan = false;
    
    var r1El = document.getElementById("ruka-p1"), r2El = document.getElementById("ruka-p2");
    if(r1El) r1El.innerHTML = ""; if(r2El) r2El.innerHTML = "";

    for (var i = 0; i < 10; i++) {
        var p1Res = p1_full_deck.splice(Math.floor(Math.random() * p1_full_deck.length), 1)[0];
        var p2Res = p2_full_deck.splice(Math.floor(Math.random() * p2_full_deck.length), 1)[0];
        if (p1Res) p1_draft_hand.push(p1Res); if (p2Res) p2_draft_hand.push(p2Res);
    }
    
    if (document.getElementById("p1-mulligan-btn")) document.getElementById("p1-mulligan-btn").className = "";
    if (document.getElementById("p2-mulligan-btn")) document.getElementById("p2-mulligan-btn").className = "";
    if (document.getElementById("p1-pass-btn")) {
        document.getElementById("p1-pass-btn").innerText = "Potvrdiť ruku";
        document.getElementById("p1-pass-btn").style.background = "#28a745";
    }

    vykresliDraftOkna();
    var r2K = document.getElementById('kontajner-ruka-p2');
    if (r2K) { if (jeSingleplayer) r2K.classList.add('ruka-ai-skryta'); else r2K.classList.remove('ruka-ai-skryta'); }
    aktualizujStavZamkuMenu();
}

function aktualizujStavZamkuMenu() {
    var menuEl = document.getElementById('hlavne-menu'); if (!menuEl) return;
    if (!draft_faza) { menuEl.classList.add('zamknute-menu'); } else { menuEl.classList.remove('zamknute-menu'); }
}

function spustiPrepocty() {
    aktualizujStavZamkuMenu();
    var vsetky = p1_played_cards.concat(p2_played_cards).filter(function(k) { return k && "object" === typeof k && k.n; });
    var vTxt = " | Mince: " + inventar.mince;
    
    var vChlapov = neutralne_vplyvy.find(function(k) { return k && "Musíme sa porozprávať" === k.n; });
    var vZien = neutralne_vplyvy.find(function(k) { return k && "Upokoj sa" === k.n; });
    var vZvierat = neutralne_vplyvy.find(function(k) { return k && "Ohnostroj" === k.n; });

    if (vsetky.length === 0) {
        for (var k = 1; k <= 6; k++) { if (document.getElementById('s' + k)) document.getElementById('s' + k).innerText = "0 b"; }
        if (document.getElementById('body-skore')) { document.getElementById('body-skore').innerHTML = "Hráč 1: " + (p2_used_mulligan ? 7 : 0) + " b | Hráč 2: " + (p1_used_mulligan ? 7 : 0) + " b" + vTxt; }
        return;
    }
    
    var nelaPritomna = vsetky.some(function(k) { return k && k.n && -1 !== k.n.indexOf('Nela'); });
    var p1Katy = vsetky.some(function(k) { return k && k.n && -1 !== k.n.indexOf('Katy') && 1 === k.pNum; }), p2Katy = vsetky.some(function(k) { return k && k.n && -1 !== k.n.indexOf('Katy') && 2 === k.pNum; });
    var mC1 = countMravce(p1_played_cards), mC2 = countMravce(p2_played_cards), hC1 = countHoluby(p1_played_cards), hC2 = countHoluby(p2_played_cards);

    var sClassRiadkyBonus = { r1: 0, r2: 0, r3: 0, r4: 0, r5: 0, r6: 0 };
    vsetky.forEach(function(k) {
        if (k && "S" === k.cls && k.row > 0 && "none" !== k.livePwr) {
            var rId = (2 === k.pNum) ? (1 === k.row ? "r3" : (2 === k.row ? "r2" : "r1")) : (1 === k.row ? "r4" : (2 === k.row ? "r5" : "r6"));
            sClassRiadkyBonus[rId] = 0.5;
        }
    });

    for (var j = 0; j < vsetky.length; j++) {
        var c = vsetky[j]; 
        if (!c || "object" !== typeof c || !c.n || !c.id) continue;
        
        var el = document.getElementById(c.id); if (!el) continue;
        var cMeno = c.n;
        
        if ("S" === c.cls) el.classList.add("karta-s-class-aura"); else el.classList.remove("karta-s-class-aura");

        if (MASTER_REGISTRY[cMeno] && (0 === MASTER_REGISTRY[cMeno].row || "Alcohol" === cMeno || "Kvety" === cMeno || "Medove Orechy" === cMeno)) { 
            c.livePwr = "none"; 
            el.innerHTML = vytvorHTMLKarty(cMeno, "none", c.cls, c.row, c.p); 
            continue; 
        }
        if ("Oli" === cMeno) { 
            c.livePwr = 8; 
            el.innerHTML = vytvorHTMLKarty(cMeno, 8, c.cls, c.row, 8); 
            continue; 
        }

        var aZ = null;
        if (1 === c.row && vChlapov) aZ = vChlapov;
        if (2 === c.row && vZien) aZ = vZien;
        if ((3 === c.row || -1 !== cMeno.indexOf('Mravce') || -1 !== cMeno.indexOf('holuby')) && vZvierat) aZ = vZvierat;

        var zaklad = c.p;
        if (aZ) {
            if ("S" === aZ.cls) { zaklad = 0; } 
            else { zaklad = 1; }
        }

        if (-1 !== cMeno.indexOf('Mravce')) { 
            zaklad = (3 === (1 === c.pNum ? mC1 : mC2)) ? 4 : ((2 === (1 === c.pNum ? mC1 : mC2)) ? 2 : 1);
        } else if (-1 !== cMeno.indexOf('holuby')) { 
            zaklad = (3 === (1 === c.pNum ? hC1 : hC2)) ? 4 : ((2 === (1 === c.pNum ? hC1 : hC2)) ? 2 : 1);
        }

        if (c.isSpy) {
            if ("B" === c.cls) zaklad -= 1;
            if ("A" === c.cls) zaklad -= 2;
            if ("S" === c.cls) zaklad -= 3;
        } else {
            if ("B" === c.cls) zaklad += 1;
            if ("A" === c.cls) zaklad += 2;
            if ("S" === c.cls) zaklad += 3;
        }

        if ("Katy" !== cMeno && "Nela" !== cMeno && "Oli" !== cMeno) {
            if (1 === c.pNum) { if (p1Katy) zaklad += 1; if (p2Katy) zaklad -= 1; } 
            else { if (p2Katy) zaklad += 1; if (p1Katy) zaklad -= 1; }
        }
        zaklad = Math.max(0, zaklad);

        var pct = 0.0;
        var cId = (2 === c.pNum) ? (1 === c.row ? "r3" : (2 === c.row ? "r2" : "r1")) : (1 === c.row ? "r4" : (2 === c.row ? "r5" : "r6"));
        
        if (!nelaPritomna) {
            if ("Michal" === cMeno) pct += 1.0; 
            var pr = vsetky.find(function(k) { return k && k.pNum === c.pNum && k.row === c.row && ("Alcohol" === k.n || "Kvety" === k.n || "Medove Orechy" === k.n); });
            var dR = vsetky.some(function(k) { return k && -1 !== k.n.indexOf('Duri') && k.pNum === c.pNum && 1 === k.row; });

            if (pr) { var zB = ("S" === pr.cls) ? 1.0 : 0.5; pct += zB; if ("A" === c.cls || "S" === c.cls) pct += 0.5; }
            
            if (1 === c.row) { 
                if (vsetky.some(function(k) { return k && -1 !== k.n.indexOf('Sisa') && k.pNum === c.pNum; })) pct += 1.0; 
                if (dR && pr && "Alcohol" === pr.n && "Duri" !== cMeno) pct += 0.5; 
            }
            if ((1 === c.pNum ? p1_erik_buff_row : p2_erik_buff_row) !== null && c.row === parseInt(1 === c.pNum ? p1_erik_buff_row : p2_erik_buff_row, 10) && "Erik" !== cMeno) pct += 1.0;
            if ("S" !== c.cls) { pct += (sClassRiadkyBonus[cId] || 0); }
        }

        var medzivysledok = zaklad + Math.round(zaklad * pct);
        c.livePwr = Math.max(0, medzivysledok);
        
        el.innerHTML = vytvorHTMLKarty(cMeno, c.livePwr, c.cls, c.row, MASTER_REGISTRY[cMeno] ? MASTER_REGISTRY[cMeno].p : c.p);
    }

    for (var r = 1; r <= 6; r++) { 
        var elS = document.getElementById('s' + r); 
        if (elS) elS.innerText = zratajRad(r > 3 ? p1_played_cards : p2_played_cards, r > 3 ? r - 3 : (r === 1 ? 3 : (r === 2 ? 2 : 1))) + " b"; 
    }

    sc1 = p2_used_mulligan ? 7 : 0; p1_played_cards.forEach(function(card) { if (card && "number" == typeof card.livePwr) sc1 += card.livePwr; });
    sc2 = p1_used_mulligan ? 7 : 0; p2_played_cards.forEach(function(card) { if (card && "number" == typeof card.livePwr) sc2 += card.livePwr; });
    if (document.getElementById('body-skore')) { document.getElementById('body-skore').innerHTML = "Hráč 1: " + sc1 + " b | Hráč 2: " + sc2 + " b" + vTxt; }
}

function vykresliDraftOkna() {
    var ind = document.getElementById('turn-indicator'); 
    if (draft_faza) {
        if (ind) ind.innerText = "MULLIGAN FÁZA - Hráči potvrdzujú ruku.";
        var r1 = document.getElementById('ruka-p1'); 
        if (r1) { 
            r1.innerHTML = ""; 
            p1_draft_hand.forEach(function(k) { 
                if (!k) return; 
                var d = document.createElement('div'); d.className = "karta karta-h1"; 
                if ("S" === k.cls) d.classList.add("karta-s-class-aura"); 
                var realPwr = getRealPower(k);
                d.innerHTML = vytvorHTMLKarty(k.n, realPwr, k.cls, k.row, k.p); 
                r1.appendChild(d); 
            }); 
        }
        var r2 = document.getElementById('ruka-p2'); 
        if (r2) { 
            r2.innerHTML = ""; 
            p2_draft_hand.forEach(function(k) { 
                if (!k) return; 
                var d = document.createElement('div'); d.className = "karta karta-h2"; 
                if ("S" === k.cls) d.classList.add("karta-s-class-aura"); 
                var realPwr2 = getRealPower(k);
                d.innerHTML = vytvorHTMLKarty(k.n, realPwr2, k.cls, k.row, k.p); 
                r2.appendChild(d); 
            }); 
        }
        var b1 = document.getElementById('p1-pass-btn'); if (b1) b1.style.display = p1_confirmed_mulligan ? "none" : "inline-block";
        var b2 = document.getElementById('p2-pass-btn'); if (b2) b2.style.display = (p2_confirmed_mulligan || jeSingleplayer) ? "none" : "inline-block";
    }
}

function preklopDraftDoRukyHTML() {
    var e = document.getElementById("ruka-p1"); 
    if (e) { 
        e.innerHTML = ""; 
        p1_draft_hand.forEach(function(t) { 
            if (!t) return; 
            var r = document.createElement("div"); r.className = "karta karta-h1"; 
            var realPwr = getRealPower(t);
            r.setAttribute("data-meno", t.n); r.setAttribute("data-pnum", "1"); r.setAttribute("data-row", t.row); r.setAttribute("data-pwr", realPwr); 
            if (t.isSpy) r.setAttribute("data-isspy", "true"); 
            if ("S" === t.cls) r.classList.add("karta-s-class-aura"); 
            r.innerHTML = vytvorHTMLKarty(t.n, realPwr, t.cls, t.row, t.p); 
            e.appendChild(r); 
        }); 
    }
    var t = document.getElementById("ruka-p2"); 
    if (t) { 
        t.innerHTML = ""; 
        p2_draft_hand.forEach(function(e) { 
            if (!e) return; 
            var r = document.createElement("div"); r.className = "karta karta-h2"; 
            var realPwr2 = getRealPower(e);
            r.setAttribute("data-meno", e.n); r.setAttribute("data-pnum", "2"); r.setAttribute("data-row", e.row); r.setAttribute("data-pwr", realPwr2); 
            if (e.isSpy) r.setAttribute("data-isspy", "true"); 
            if ("S" === e.cls) r.classList.add("karta-s-class-aura"); 
            r.innerHTML = vytvorHTMLKarty(e.n, realPwr2, e.cls, e.row, e.p); 
            t.appendChild(r); 
        }); 
    }
}

function potvrdMulliganRuku(pNum) { 
    if (draft_faza) { 
        if (1 === pNum) p1_confirmed_mulligan = true; else p2_confirmed_mulligan = true; 
        skontrolujUkoncenieMulliganu(); 
    } 
}

function Admin_vynutVymenu(e) { 
    if (draft_faza && !p1_confirmed_mulligan) { 
        if (1 === e) {
            p1_used_mulligan = true; p1_confirmed_mulligan = true; p1_draft_hand = []; 
            for (var t = 0; t < 10; t++) {
                if (p1_full_deck.length > 0) {
                    var kartaObj = p1_full_deck.splice(Math.floor(Math.random() * p1_full_deck.length), 1)[0];
                    if (kartaObj) p1_draft_hand.push(kartaObj);
                }
            }
        } else {
            p2_used_mulligan = true; p2_confirmed_mulligan = true; p2_draft_hand = []; 
            for (var t = 0; t < 10; t++) {
                if (p2_full_deck.length > 0) {
                    var kartaObj2 = p2_full_deck.splice(Math.floor(Math.random() * p2_full_deck.length), 1)[0];
                    if (kartaObj2) p2_draft_hand.push(kartaObj2);
                }
            }
        }
        skontrolujUkoncenieMulliganu(); 
    } 
}

function skontrolujUkoncenieMulliganu() {
    if (jeSingleplayer) p2_confirmed_mulligan = true;
    if (p1_confirmed_mulligan && p2_confirmed_mulligan) {
        draft_faza = false; 
        p1Pass = false; 
        p2Pass = false;
        aktualnyHrac = 1;
        blokujVykladanie = false;
        
        if (document.getElementById("p1-pass-btn")) {
            document.getElementById("p1-pass-btn").style.display = "inline-block";
            document.getElementById("p1-pass-btn").innerText = "Pass";
            document.getElementById("p1-pass-btn").style.background = "#dc3545";
        }
        if (document.getElementById("p1-mulligan-btn")) document.getElementById("p1-mulligan-btn").className = "schovany"; 
        if (document.getElementById("p2-mulligan-btn")) document.getElementById("p2-mulligan-btn").className = "schovany";
        
        if (document.getElementById('turn-indicator')) document.getElementById('turn-indicator').innerText = "Na ťahu: Hráč 1";
        
        preklopDraftDoRukyHTML(); spustiPrepocty(); aktualizujArchivyVizualne(); aktualizujPanelDielne();
    }
}

function dynamicDrawNewCard(e, t) {
    var r = 1 === e ? p1_full_deck : p2_full_deck, n = document.getElementById(1 === e ? "ruka-p1" : "ruka-p2");
    if ((t || (r && 0 !== r.length)) && n) { 
        var a = t; 
        if (!a) { 
            var i = r.splice(Math.floor(Math.random() * r.length), 1); 
            if (i && i.length > 0) a = i[0];
        } 
        if (a) { 
            var o = document.createElement("div"); o.className = "karta karta-nova " + (1 === e ? "karta-h1" : "karta-h2"); 
            var realPwr = getRealPower(a);
            o.setAttribute("data-meno", a.n); o.setAttribute("data-pnum", e.toString()); o.setAttribute("data-row", a.row); o.setAttribute("data-pwr", realPwr); 
            if (a.isSpy) o.setAttribute("data-isspy", "true"); 
            if ("S" === a.cls) o.classList.add("karta-s-class-aura"); 
            o.innerHTML = vytvorHTMLKarty(a.n, realPwr, a.cls, a.row, a.p); 
            n.appendChild(o); 
        } 
    }
}

function spustiSpyNakukanie(pNum) {
    var sR = document.getElementById(1 === pNum ? "ruka-p2" : "ruka-p1"); if (!sR) return; 
    var kS = sR.querySelectorAll('.karta'); if (0 === kS.length) return;
    var idxs = []; 
    var limit = Math.min(3, kS.length);
    while (idxs.length < limit) { 
        var r = Math.floor(Math.random() * kS.length); 
        if (-1 === idxs.indexOf(r)) idxs.push(r); 
    }
    idxs.forEach(function(idx) { kS[idx].style.background = "#d97706"; kS[idx].style.boxShadow = "0 0 15px #ffcc00"; });
    setTimeout(function() { idxs.forEach(function(idx) { if (kS[idx]) { kS[idx].style.background = "#444"; kS[idx].style.boxShadow = "none"; } }); }, 4000);
}

function ozivKartuZArchivu(pNum) {
    var list = (1 === pNum) ? p1_spalene : p2_spalene; 
    if (!list || 0 === list.length) return; 
    
    var k = list.pop(); 
    if (!k) return;
    
    var jeSpy = ("Zvedava suseda" === k.n || "Kika" === k.n); 
    var tPNum = jeSpy ? (1 === pNum ? 2 : 1) : pNum;
    var div = document.createElement('div'); 
    div.className = "karta karta-nova " + (1 === k.pNum ? "karta-h1" : "karta-h2"); 
    div.id = k.id;
    
    var realPwr = getRealPower(k);
    div.setAttribute('data-meno', k.n); 
    div.setAttribute('data-row', k.row); 
    div.setAttribute('data-pwr', realPwr); 
    if ("S" === k.cls) div.classList.add("karta-s-class-aura");
    
    div.innerHTML = vytvorHTMLKarty(k.n, realPwr, k.cls, k.row, k.p); 
    div.setAttribute('data-pnum', tPNum.toString()); 
    k.pNum = tPNum; 
    if (jeSpy) div.setAttribute('data-isspy', "true");
    
    var cId = (2 === tPNum) ? (1 === k.row ? "r3" : (2 === k.row ? "r2" : "r1")) : (1 === k.row ? "r4" : (2 === k.row ? "r5" : "r6")); 
    var rEl = document.getElementById(cId);
    
    if (rEl) { 
        rEl.appendChild(div); 
        if (1 === tPNum) p1_played_cards.push(k); else p2_played_cards.push(k); 
        if (jeSpy) { 
            dynamicDrawNewCard(pNum); dynamicDrawNewCard(pNum);
            if ("A" === k.cls || "S" === k.cls) spustiSpyNakukanie(pNum); 
        } 
        if (("Doktor" === k.n || "Sestricka" === k.n) && list.length > 0) {
            ozivKartuZArchivu(pNum); 
        }
    }
    aktualizujArchivyVizualne();
}

function aktualizujArchivyVizualne() {
    var z1 = document.getElementById("zoznam-p1");
    if (z1) {
        z1.innerHTML = p1_spalene.length === 0 ? "Zatiaľ prázdne." : p1_spalene.map(function(k) { return "<div class='archiv-polozka'>" + (k ? k.n : "") + " [" + (k ? k.cls : "") + "]</div>"; }).join("");
    }
    var z2 = document.getElementById("zoznam-p2");
    if (z2) {
        z2.innerHTML = p2_spalene.length === 0 ? "Zatiaľ prázdne." : p2_spalene.map(function(k) { return "<div class='archiv-polozka'>" + (k ? k.n : "") + " [" + (k ? k.cls : "") + "]</div>"; }).join("");
    }
}

function otvorTruhlu(jeVitaz, jeRemizaZapasu) {
    if (jeSingleplayer && !jeVitaz && !jeRemizaZapasu) { alert("Zápas proti AI skončil prehrou."); return; }
    var hMena = Object.keys(MASTER_REGISTRY); var pC = jeVitaz ? 3 : 10; var zMena = [];
    for (var i = 0; i < pC; i++) {
        var nMeno = hMena[Math.floor(Math.random() * hMena.length)]; var r = 100 * Math.random(); var vCls = "C";
        
        if (!isSpecialCard(nMeno)) {
            if (jeVitaz) { if (r < 0.5) vCls = "S"; else if (r < 10) vCls = "A"; else if (r < 30) vCls = "B"; } 
            else { if (r < 0.01) vCls = "S"; else if (r < 2) vCls = "A"; else if (r < 12) vCls = "B"; }
        }

        if (!inventar.karty[nMeno]) inventar.karty[nMeno] = { replikyC: 0, aktivnaTrieda: "C" };
        var pR = 1; if ("B" === vCls) pR = 5; if ("A" === vCls) pR = 25; if ("S" === vCls) pR = 125;
        inventar.karty[nMeno].replikyC += pR; zMena.push(nMeno.replace(/\s\d$/, "") + " (" + vCls + ")");
    }
    alert((jeVitaz ? "🏆 TRUHLA VÍŤAZA" : (jeRemizaZapasu ? "📦 TRUHLA ZA REMÍZU 2:2" : "📦 TRUHLA ÚČASTNÍKA")) + "\n" + zMena.join("\n")); 
    aktualizujPanelDielne();
}

function vyhodnot() {
    if (!jeSingleplayer && (r1 + r2 === 0)) {
        if (sc1 > sc2) { inventar.mince += 50; alert("🏆 Hráč 1 vyhráva 1. kolo! (+50m bonus)"); }
        else if (sc2 > sc1) { alert("🏆 Hráč 2 vyhráva 1. kolo!"); }
        else { inventar.mince += 50; alert("⚖️ Remíza v 1. kole! Obaja hráči získavajú +50m bonus"); }
    }

    if (sc1 > sc2) { r1++; if (!jeSingleplayer) { inventar.mince += 50; alert("Hráč 1 vyhráva kolo! (+50m)"); } else alert("Hráč 1 vyhráva!"); } 
    else if (sc2 > sc1) { r2++; alert("AI / Hráč 2 vyhráva kolo!"); } else { r1++; r2++; alert("Remíza! Bod pre oboch."); }
    
    if (document.getElementById('kola-skore')) document.getElementById('kola-skore').innerText = "Vyhraté kolá - Hráč 1: " + r1 + "/2 | Hráč 2: " + r2 + "/2";
    
    if (r1 >= 2 || r2 >= 2) {
        if (r1 >= 2 && r2 >= 2) { alert("Séria skončila remízou 2:2!"); otvorTruhlu(false, true); } 
        else { var h1V = (r1 >= 2); otvorTruhlu(h1V, false); alert("Koniec série! Víťaz: " + (h1V ? "Hráč 1" : "AI / Hráč 2")); }
        
        document.getElementById('hraci-stol-kontajner').classList.add('schovany'); 
        document.getElementById('predzapasove-menu').classList.remove('schovany');
        
        draft_faza = true; 
        r1 = 0; 
        r2 = 0;
        p1_erik_buff_row = null; p2_erik_buff_row = null;
        
        p1_spalene = []; p2_spalene = [];
        aktualizujArchivyVizualne();
        
        if (document.getElementById('kola-skore')) {
            document.getElementById('kola-skore').innerText = "Vyhraté kolá - Hráč 1: 0/2 | Hráč 2: 0/2";
        }
        
        aktualizujStavZamkuMenu(); 
    } else { resetStolaBezReloadu(true); }
}

function resetStolaBezReloadu(e) {
    p1Pass = false; 
    p2Pass = false; 
    p1_erik_buff_row = null; 
    p2_erik_buff_row = null;
    
    for (var t = 1; t <= 6; t++) { 
        var r = document.getElementById("r" + t); 
        if (r) { 
            var nazovRadu = "";
            if (t === 1) nazovRadu = "3. Rad (Zvieratá): ";
            else if (t === 2) nazovRadu = "2. Rad (Ženy): ";
            else if (t === 3) nazovRadu = "1. Rad (Muži): ";
            else if (t === 4) nazovRadu = "1. Rad (Muži): ";
            else if (t === 5) nazovRadu = "2. Rad (Ženy): ";
            else if (t === 6) nazovRadu = "3. Rad (Zvieratá): ";

            r.innerHTML = nazovRadu + "<span class='skore-rad' id='s" + t + "'>0 b</span>";
        } 
    }
    p1_played_cards = []; 
    p2_played_cards = []; 
    blokujVykladanie = false;
    
    var a = document.getElementById("neutralny-riadok"); 
    if (a) a.innerHTML = "⚡ Neutrálna zóna (Vplyvy stola)";
    
    document.getElementById("panel-erik").className = "schovany modal-overlay"; 
    document.getElementById("panel-marek").className = "schovany modal-overlay";
    
    sc1 = 0; 
    sc2 = 0; 
    hracCakajuciNaAkciu = 0; 
    aktualnyHrac = 1; 
    neutralne_vplyvy = [];
    
    if (e) {
        draft_faza = false; 
        dynamicDrawNewCard(1); 
        dynamicDrawNewCard(2);
        spustiPrepocty();
        if (document.getElementById('turn-indicator')) {
            document.getElementById('turn-indicator').innerText = "Na ťahu: Hráč 1";
        }
    } else { 
        p1_draft_hand = []; 
        p2_draft_hand = []; 
        p1_full_deck = vytvorZoznamKariet(1); 
        p2_full_deck = vytvorZoznamKariet(2); 
        draft_faza = true; 
        
        p1_spalene = []; p2_spalene = [];
        aktualizujArchivyVizualne();
        
        if (document.getElementById('kola-skore')) {
            document.getElementById('kola-skore').innerText = "Vyhraté kolá - Hráč 1: 0/2 | Hráč 2: 0/2";
        }
        
        spustiDraft(); 
    }
}

function spustiTahAI() {
    if (!jeSingleplayer || p2Pass || draft_faza || blokujVykladanie) return; var rA = document.getElementById('ruka-p2'); if (!rA) return;
    var k = rA.querySelectorAll('.karta'); 
    
    if (0 === k.length) { p2Pass = true; hracPasolAI(); return; }
    spustiPrepocty(); 
    
    if (p1Pass && sc2 > sc1) { p2Pass = true; hracPasolAI(); return; }
    
    if (!(1 === r1 && 1 === r2)) {
        if ("B" === obtiaznostAI && sc2 > sc1 && sc2 - sc1 >= 20 && k.length <= 4) { p2Pass = true; hracPasolAI(); return; }
        if ("A" === obtiaznostAI && ((p1Pass && sc2 > sc1) || (sc2 > sc1 && sc2 - sc1 >= 15 && k.length <= 3))) { p2Pass = true; hracPasolAI(); return; }
        if ("S" === obtiaznostAI && ((p1Pass && sc2 > sc1) || (sc1 > sc2 && sc1 - sc2 > 18 && k.length <= 4 && 0 === r2))) { p2Pass = true; hracPasolAI(); return; }
    }
    var vK = null; var pst = []; var efk = [];
    for (var i = 0; i < k.length; i++) { 
        var mK = k[i].getAttribute('data-meno') || ""; 
        var rK = parseInt(k[i].getAttribute('data-row'), 10) || 0; 
        if (0 === rK || "Alcohol" === mK || "Kvety" === mK || "Medove Orechy" === mK) efk.push(k[i]); 
        else pst.push(k[i]); 
    }
    if (pst.length > 0) {
        if ("S" === obtiaznostAI) { var maxP = -1; for (var j = 0; j < pst.length; j++) { var pwr = parseInt(pst[j].getAttribute('data-pwr'), 10) || 0; if (pwr > maxP) { maxP = pwr; vK = pst[j]; } } } 
        else { var l = ("B" === obtiaznostAI && Math.random() < 0.4) ? Math.floor(Math.random() * pst.length) : 0; vK = pst[l]; }
    } else if (efk.length > 0) { if (p1Pass && sc1 > sc2) { p2Pass = true; hracPasolAI(); return; } vK = efk[0]; }
    if (vK) { setTimeout(function() { if (!p2Pass) vK.click(); }, 800); } else { p2Pass = true; hracPasolAI(); }
}

function hracPasolAI() { 
    alert("🤖 AI pasuje!"); 
    if (!p1Pass) aktualnyHrac = 1; 
    if (p1Pass && p2Pass) {
        vyhodnot(); 
    } else { 
        spustiPrepocty(); 
        if (document.getElementById('turn-indicator')) document.getElementById('turn-indicator').innerText = "Na ťahu: Hráč " + aktualnyHrac + " (AI Pasoval)";
    } 
}

function spustiMarekaAIJadro(bNum) {
    var sPole = (1 === bNum) ? p2_played_cards : p1_played_cards;
    var cls = sPole.filter(function(k) { return k && k.n && -1 === k.n.indexOf('Nela') && -1 === k.n.indexOf('Oli') && !isSpecialCard(k.n); });
    if (0 === cls.length) {
        blokujVykladanie = false;
        var povH = hracCakajuciNaAkciu; hracCakajuciNaAkciu = 0;
        ukonciTah(povH, "Marek bez cieľa");
        return;
    } 
    cls.sort(function(a, b) { return b.livePwr - a.livePwr; }); 
    var tK = cls[0];
    if (tK) { 
        var idx = sPole.findIndex(function(c) { return c && c.id === tK.id; }); 
        if (-1 !== idx) { 
            var el = document.getElementById(tK.id); if (el) el.remove(); 
            if (1 === tK.pNum) p1_spalene.push(tK); else p2_spalene.push(tK); 
            sPole.splice(idx, 1); 
            alert("🤖 AI Marek odstránil: " + tK.n); 
            
            blokujVykladanie = false;
            var povH = hracCakajuciNaAkciu; hracCakajuciNaAkciu = 0;
            aktualizujArchivyVizualne(); 
            ukonciTah(povH); 
        } 
    }
}

function spustiErikaAIJadro(bNum) {
    var p = (1 === bNum) ? p1_played_cards : p2_played_cards; 
    var r1b = zratajRad(p, 1), r2b = zratajRad(p, 2), r3b = zratajRad(p, 3);
    var rdy = [ { id: 1, p: r1b }, { id: 2, p: r2b }, { id: 3, p: r3b } ]; 
    rdy.sort(function(a, b) { return b.p - a.p; }); 
    var zR = rdy[0].id;
    if (1 === bNum) p1_erik_buff_row = zR; else p2_erik_buff_row = zR; 
    alert("🤖 AI Erik buffol Rad " + zR); 
    blokujVykladanie = false;
    var povH = hracCakajuciNaAkciu; hracCakajuciNaAkciu = 0;
    ukonciTah(povH);
}

function spustiMarekaLogiku() {
    spustiPrepocty(); 
    var sPole = (1 === hracCakajuciNaAkciu) ? p2_played_cards : p1_played_cards;
    
    if (sPole.some(function(k) { return k && k.n && -1 !== k.n.indexOf('Nela') && 2 === k.row; })) { 
        blokujVykladanie = false; var p = hracCakajuciNaAkciu; hracCakajuciNaAkciu = 0; 
        ukonciTah(p, "Marek zablokovaný Nelou"); return; 
    }

    var cls = sPole.filter(function(k) { 
        return k && k.n && -1 === k.n.indexOf('Nela') && -1 === k.n.indexOf('Oli') && !isSpecialCard(k.n); 
    });

    if (0 === cls.length) { 
        blokujVykladanie = false; var p = hracCakajuciNaAkciu; hracCakajuciNaAkciu = 0; 
        ukonciTah(p, "Marek nemá cieľ"); return; 
    }

    if (1 === cls.length) {
        var soleCard = cls[0];
        var idx = sPole.findIndex(function(c) { return c && c.id === soleCard.id; });
        if (-1 !== idx) {
            var el = document.getElementById(soleCard.id); if (el) el.remove();
            if (1 === soleCard.pNum) p1_spalene.push(soleCard); else p2_spalene.push(soleCard);
            sPole.splice(idx, 1);
            alert("🧹 Marek ufilozofoval cieľ: " + soleCard.n + " (" + soleCard.livePwr + "b)");
            
            blokujVykladanie = false;
            var povH = hracCakajuciNaAkciu; hracCakajuciNaAkciu = 0;
            aktualizujArchivyVizualne();
            ukonciTah(povH);
            return;
        }
    }

    var dd = document.getElementById("marek-dropdown"); if (!dd) return; dd.innerHTML = "";
    cls.forEach(function(k) { 
        var o = document.createElement("option"); o.value = k.id; 
        o.innerText = k.n + " (" + k.livePwr + "b)"; dd.appendChild(o); 
    });
    
    var pm = document.getElementById("panel-marek");
    if (pm) pm.classList.remove("schovany");
}

function hracStlacilPass(pNum) { 
    if (draft_faza) return; 
    
    if (1 === pNum) { p1Pass = true; aktualnyHrac = 2; } else { p2Pass = true; aktualnyHrac = 1; } 
    if (p1Pass && p2Pass) {
        vyhodnot(); 
    } else { 
        spustiPrepocty(); 
        if (document.getElementById('turn-indicator')) document.getElementById('turn-indicator').innerText = "Na ťahu: Hráč " + aktualnyHrac + (p1Pass ? " (Hráč 1 Pasoval)" : " (AI Pasoval)");
        if (jeSingleplayer && 2 === aktualnyHrac && !p2Pass) setTimeout(spustiTahAI, 800); 
    } 
}

function spustiErikaHtml(rad) { 
    if (1 === hracCakajuciNaAkciu) p1_erik_buff_row = parseInt(rad, 10); else p2_erik_buff_row = parseInt(rad, 10); 
    document.getElementById('panel-erik').classList.add('schovany'); 
    blokujVykladanie = false; 
    var pH = hracCakajuciNaAkciu; hracCakajuciNaAkciu = 0; ukonciTah(pH); 
}

function ukonciTah(pNum, info) { 
    if (!draft_faza) {
        var ruka1 = document.getElementById("ruka-p1");
        if (ruka1 && 0 === ruka1.querySelectorAll(".karta").length) {
            p1Pass = true;
        }
    }

    if (1 === pNum) {
        if (!p2Pass) aktualnyHrac = 2;
    } else {
        if (!p1Pass) aktualnyHrac = 1;
    }

    if (p1Pass && p2Pass) {
        vyhodnot();
        return;
    }

    spustiPrepocty(); 
    if (document.getElementById('turn-indicator')) document.getElementById('turn-indicator').innerText = "Na ťahu: Hráč " + aktualnyHrac + (info ? " | " + info : ""); 
    if (jeSingleplayer && 2 === aktualnyHrac && !p2Pass) setTimeout(spustiTahAI, 800); 
}

function vylepsiKartuVoForge(e) { 
    var t = inventar.karty[e]; 
    if (t) { 
        var r = t.aktivnaTrieda, n = false, novaTrieda = "", spotrebovane = 0; 
        
        if (isSpecialCard(e)) {
            if ("C" === r && t.replikyC >= 1000) {
                t.replikyC -= 1000;
                t.aktivnaTrieda = "S";
                novaTrieda = "S";
                spotrebovane = 1000;
                n = true;
            } else if ("S" === r) {
                alert("Špeciálna karta je už na maximálnej triede S!");
                return;
            } else {
                alert("Na vykovanie špeciálnej karty na triedu S potrebuješ 1000 replík!");
                return;
            }
        } else {
            if ("C" === r && t.replikyC >= 5) { t.replikyC -= 5; t.aktivnaTrieda = "B"; novaTrieda = "B"; spotrebovane = 5; n = true; } 
            else if ("B" === r && t.replikyC >= 25) { t.replikyC -= 25; t.aktivnaTrieda = "A"; novaTrieda = "A"; spotrebovane = 25; n = true; } 
            else if ("A" === r && t.replikyC >= 125) { t.replikyC -= 125; t.aktivnaTrieda = "S"; novaTrieda = "S"; spotrebovane = 125; n = true; } 
        }

        if (n) { 
            spustiKovaciRitual(e, r, novaTrieda, spotrebovane);
            aktualizujPanelDielne(); 
            aktualizujZostavaPanel();
            if (!draft_faza) spustiPrepocty(); 
        } else {
            alert("Málo replík!"); 
        }
    } 
}

function recyklujKartuDielne(e) { 
    var t = inventar.karty[e]; 
    if (t && t.replikyC > 0) { 
        t.replikyC--; 
        inventar.mince += 15; 
        alert("♻ Recyklované (+15m)"); 
        aktualizujPanelDielne(); 
        aktualizujZostavaPanel();
    } 
}

function kupNahodnyBooster() { 
    if (inventar.mince < 100) { alert("Nemáš dostatok mincí!"); return; } 
    var e = Object.keys(MASTER_REGISTRY), t = e[Math.floor(Math.random() * e.length)]; 
    inventar.mince -= 100; 
    if (!inventar.karty[t]) inventar.karty[t] = { replikyC: 0, aktivnaTrieda: "C" }; 
    inventar.karty[t].replikyC++; 
    alert("🎁 Booster: " + t); 
    aktualizujPanelDielne(); 
    aktualizujZostavaPanel();
}

function kupKonkretnuKartu(e) { 
    if (inventar.mince < 3000) { alert("Nemáš dostatok mincí (potrebuješ 3000m)!"); return; } 
    var kName = e.replace(/\s\d$/, "");
    inventar.mince -= 3000; 
    if (!inventar.karty[e]) inventar.karty[e] = { replikyC: 0, aktivnaTrieda: "C" }; 
    inventar.karty[e].replikyC++; 
    alert("🛒 Kúpená C-kópia: " + kName); 
    aktualizujPanelDielne(); 
    aktualizujZostavaPanel();
}

function overMoznostStartuHry() { 
    if (!inventar.zostava || inventar.zostava.length < 30) { alert("Zostava musí mať 30 kariet!"); return false; } 
    return true; 
}

function zobraziťMenuAI() {
    var subMenu = document.getElementById("ai-difficulty-options");
    if (subMenu) subMenu.classList.remove("schovany");
}

function spustitZapasProtiAI(obtiaznost) { 
    if (overMoznostStartuHry()) { 
        jeSingleplayer = true; 
        obtiaznostAI = obtiaznost; 
        if (document.getElementById("rezim-zapasu-oznam")) document.getElementById("rezim-zapasu-oznam").innerText = "🤖 PROTI AI - Trieda " + obtiaznost; 
        document.getElementById("predzapasove-menu").className = "schovany"; 
        document.getElementById("hraci-stol-kontajner").className = ""; 
        r1 = 0; r2 = 0; 
        resetStolaBezReloadu(false); 
    } 
}

function spustitZapasLokálnePVP() { 
    if (overMoznostStartuHry()) { 
        jeSingleplayer = false; 
        if (document.getElementById("rezim-zapasu-oznam")) document.getElementById("rezim-zapasu-oznam").innerText = "👥 MULTIPLAYER 1v1"; 
        document.getElementById("predzapasove-menu").className = "schovany"; 
        document.getElementById("hraci-stol-kontajner").className = ""; 
        r1 = 0; r2 = 0; 
        resetStolaBezReloadu(false); 
    } 
}

function vzdajZapasUtek() { 
    if (confirm("Vzdať sériu a vrátiť sa do menu?")) { 
        document.getElementById("hraci-stol-kontajner").className = "schovany"; 
        document.getElementById("predzapasove-menu").className = ""; 
        draft_faza = true; 
        p1Pass = false; p2Pass = false;
        r1 = 0; r2 = 0; 
        p1_played_cards = []; p2_played_cards = []; neutralne_vplyvy = [];
        p1_draft_hand = []; p2_draft_hand = [];
        p1_confirmed_mulligan = false; p2_confirmed_mulligan = false;
        p1_erik_buff_row = null; p2_erik_buff_row = null;
        
        p1_spalene = []; p2_spalene = [];
        aktualizujArchivyVizualne();
        
        if (document.getElementById('kola-skore')) {
            document.getElementById('kola-skore').innerText = "Vyhraté kolá - Hráč 1: 0/2 | Hráč 2: 0/2";
        }
        
        aktualizujStavZamkuMenu(); 
    } 
}

function aktualizujPanelDielne(){
    var e = document.getElementById("dielna-zoznam");
    if(e){
        e.innerHTML = "";
        
        var simBox = document.createElement("div");
        simBox.style.cssText = "grid-column: 1 / -1; background: #2b2611; border: 2px dashed #ffcc00; padding: 12px; border-radius: 8px; margin-bottom: 15px; text-align: center;";
        simBox.innerHTML = "<h4 style='color:#ffcc00; margin:0 0 8px 0;'>🧪 SIMULÁTOR OTVÁRANIA TRUHIEL</h4>" +
            "<button onclick='otvorTruhlu(false, false)' style='background:#0d6efd; color:#fff; border:none; padding:8px 12px; margin:4px; border-radius:4px; cursor:pointer; font-weight:bold;'>📦 Simulovať Truhlu Účastníka</button>" +
            "<button onclick='otvorTruhlu(true, false)' style='background:#ffc107; color:#000; border:none; padding:8px 12px; margin:4px; border-radius:4px; cursor:pointer; font-weight:bold;'>🏆 Simulovať Truhlu Víťaza</button>";
        e.appendChild(simBox);

        Object.keys(inventar.karty).forEach(function(t){
            var r = inventar.karty[t];
            var reg = MASTER_REGISTRY[t] || { row: 0, p: 0 };
            var wrapper = document.createElement("div");
            wrapper.className = "karta-karta-wrapper";

            var cardDiv = document.createElement("div");
            cardDiv.className = "karta cls-" + r.aktivnaTrieda;
            if ("S" === r.aktivnaTrieda) cardDiv.classList.add("karta-s-class-aura");
            
            var basePwr = isSpecialCard(t) ? "none" : reg.p;
            cardDiv.innerHTML = vytvorHTMLKarty(t, basePwr, r.aktivnaTrieda, reg.row, reg.p);

            var actions = "<div class='dielna-info' style='margin-top:6px;'>Repliky: <strong>" + r.replikyC + "x</strong></div>";
            actions += "<div class='karta-akcie-box'><button class='btn-forge' onclick=\"vylepsiKartuVoForge('" + t + "')\">🔨 Forge</button>";
            actions += "<button class='btn-recycle' style='background:#b91c1c' onclick=\"recyklujKartuDielne('" + t + "')\">♻️ Recyklovať</button>";
            actions += "<button class='btn-recycle' style='font-size:.8em;' onclick=\"kupKonkretnuKartu('" + t + "')\">🎯 Kúpiť (3000 m)</button></div>";

            wrapper.appendChild(cardDiv);
            var actDiv = document.createElement("div");
            actDiv.style.width = "100%";
            actDiv.innerHTML = actions;
            wrapper.appendChild(actDiv);

            e.appendChild(wrapper);
        });
        var wallet = document.getElementById("wallet-p1");
        if (wallet) wallet.innerText = inventar.mince + " m";
    }
}

function vygenerujRegalyTrhoviska(){
    var e = document.getElementById("obchod-regaly-zoznam");
    if(e){
        e.innerHTML = "";
        Object.keys(MASTER_REGISTRY).forEach(function(t){
            var reg = MASTER_REGISTRY[t];
            var inv = inventar.karty[t] || { aktivnaTrieda: "C" };
            var wrapper = document.createElement("div");
            wrapper.className = "karta-karta-wrapper";

            var cardDiv = document.createElement("div");
            cardDiv.className = "karta cls-" + inv.aktivnaTrieda;
            var basePwr = isSpecialCard(t) ? "none" : reg.p;
            cardDiv.innerHTML = vytvorHTMLKarty(t, basePwr, inv.aktivnaTrieda, reg.row, reg.p);

            var actions = "<div style='font-size:0.85em; margin:6px 0;'>Cena: <strong>3000 m</strong></div>";
            actions += "<button class='btn-obchod-nakup' style='background:#28a745; width:100%; font-size:.85em;' onclick=\"kupKonkretnuKartu('" + t + "')\">🎯 Kúpiť C-kópiu</button>";

            wrapper.appendChild(cardDiv);
            var actDiv = document.createElement("div");
            actDiv.style.width = "100%";
            actDiv.innerHTML = actions;
            wrapper.appendChild(actDiv);

            e.appendChild(wrapper);
        });
    }
}

function aktualizujZostavaPanel(){
    var e = document.getElementById("zostava-mriezka");
    if(e){
        e.innerHTML = "";
        Object.keys(MASTER_REGISTRY).forEach(function(t){
            var reg = MASTER_REGISTRY[t];
            var n = inventar.zostava.indexOf(t) !== -1;
            var inv = inventar.karty[t] || { aktivnaTrieda: "C" };

            var wrapper = document.createElement("div");
            wrapper.className = "karta-karta-wrapper" + (n ? " v-zostave" : "");

            var cardDiv = document.createElement("div");
            cardDiv.className = "karta cls-" + inv.aktivnaTrieda;
            if ("S" === inv.aktivnaTrieda) cardDiv.classList.add("karta-s-class-aura");
            var basePwr = isSpecialCard(t) ? "none" : reg.p;
            cardDiv.innerHTML = vytvorHTMLKarty(t, basePwr, inv.aktivnaTrieda, reg.row, reg.p);

            var label = "<div class='status-label' style='margin-top:8px; font-weight:bold; color:" + (n ? "#4ade80" : "#f87171") + ";'>" + (n ? "✓ V ZOSTAVE" : " ODOBRATÁ") + "</div>";

            wrapper.appendChild(cardDiv);
            var lblDiv = document.createElement("div");
            lblDiv.innerHTML = label;
            wrapper.appendChild(lblDiv);

            wrapper.onclick = function(evt){
                // Ak nebolo kliknuté na lupu, prepne sa stav zostavy
                if (evt.target.classList.contains("karta-btn-inspect")) return;
                var idx = inventar.zostava.indexOf(t);
                if(idx !== -1){
                    inventar.zostava.splice(idx, 1);
                } else {
                    inventar.zostava.push(t);
                }
                aktualizujZostavaPanel();
                obnovPocitadlaZostavyVMenu();
            };

            e.appendChild(wrapper);
        });
    }
}

function obnovPocitadlaZostavyVMenu() {
    var btnZostava = document.getElementById('menu-btn-zostava'); var pStranka = document.getElementById('zostava-pocitadlo-stranka');
    var aktualnyPocet = inventar.zostava ? inventar.zostava.length : 0; if (btnZostava) btnZostava.innerHTML = "🎴 MOJA ZOSTAVA (" + aktualnyPocet + ")";
    if (pStranka) { if (aktualnyPocet < 30) { pStranka.innerText = aktualnyPocet + " / 30"; pStranka.style.color = "#dc3545"; } else { pStranka.innerText = aktualnyPocet + " kariet"; pStranka.style.color = "#28a745"; } }
}

document.addEventListener("DOMContentLoaded", function() {
    var e = document.getElementById("menu-btn-hra"), t = document.getElementById("menu-btn-zostava"), r = document.getElementById("menu-btn-dielna"), n = document.getElementById("menu-btn-trhovisko");
    if (e) e.addEventListener("click", function() { prepniSekciuVizualne("sekcia-hra") }); 
    if (t) t.addEventListener("click", function() { prepniSekciuVizualne("sekcia-zostava"), aktualizujZostavaPanel() }); 
    if (r) r.addEventListener("click", function() { prepniSekciuVizualne("sekcia-dielna"), aktualizujPanelDielne() }); 
    if (n) n.addEventListener("click", function() { prepniSekciuVizualne("sekcia-trhovisko"), vygenerujRegalyTrhoviska(), aktualizujPanelDielne() }); 
    p1_full_deck = vytvorZoznamKariet(1); obnovPocitadlaZostavyVMenu();
});

document.addEventListener("click", function(e) {
    var t = e.composedPath() || [], r = null; 
    
    for (var n = 0; n < t.length; n++) { 
        var a = t[n]; 
        if (a) { 
            if ("p1-pass-btn" === a.id) { 
                if (draft_faza) { potvrdMulliganRuku(1); } else { hracStlacilPass(1); }
                return; 
            } 
            if ("p2-pass-btn" === a.id) { 
                if (draft_faza) { potvrdMulliganRuku(2); } else { hracStlacilPass(2); }
                return; 
            } 
            if ("p1-mulligan-btn" === a.id) { Admin_vynutVymenu(1); return; } 
            if ("eb1" === a.id) { spustiErikaHtml(1); return; } 
            if ("eb2" === a.id) { spustiErikaHtml(2); return; } 
            if ("eb3" === a.id) { spustiErikaHtml(3); return; } 
            if (a.classList && a.classList.contains("karta")) { r = a; } 
        } 
    }
    
    // VYKLADANIE KARTY POČAS HRY
    if (r && !draft_faza) {
        var jeVRuke = r.parentNode && (r.parentNode.id === "ruka-p1" || r.parentNode.id === "ruka-p2");
        var i = !document.getElementById("panel-erik").classList.contains("schovany") || !document.getElementById("panel-marek").classList.contains("schovany");

        if (jeVRuke && !blokujVykladanie && !i) {
            var u = r.getAttribute("data-meno") || "", 
                c = parseInt(r.getAttribute("data-pnum"), 10) || 1, 
                s = parseInt(r.getAttribute("data-row"), 10) || 0, 
                d = parseInt(r.getAttribute("data-pwr"), 10) || 0, 
                l = "true" === r.getAttribute("data-isspy");

            if (c === aktualnyHrac && ((1 === c && !p1Pass) || (2 === c && !p2Pass))) {
                var f = Math.floor(1e6 * Math.random()).toString(16), 
                    p = (new Date).getTime().toString(16), 
                    m = "c_" + c + "*" + u.replace(/\s+/g, "") + "*" + p + "_" + f; 
                r.id = m;

                if (0 === s) {
                    var k = document.getElementById("neutralny-riadok"); 
                    if (k) {
                        if ("Šicko v porádku" === u) {
                            neutralne_vplyvy = []; 
                            k.innerHTML = "⚡ Neutrálna zóna (Vplyvy stola)"; 
                            r.remove();
                        } else {
                            if (0 === neutralne_vplyvy.length) k.innerHTML = ""; 
                            k.appendChild(r); 
                            neutralne_vplyvy.push({ id: m, n: u, pNum: c, row: 0, p: 0, livePwr: "none" });
                        }
                    }
                    ukonciTah(c); 
                    return;
                }
                
                var v = l ? (1 === c ? 2 : 1) : c;
                var h = vytvorZoznamKariet(c).find(function(item) { return item.n === u; });
                var g = h ? h.cls : "C";
                var _ = { id: m, n: u, pNum: v, row: s, p: d, livePwr: d, cls: g, isSpy: l };
                
                var x = (2 === v) 
                    ? (1 === s ? "r3" : (2 === s ? "r2" : "r1")) 
                    : (1 === s ? "r4" : (2 === s ? "r5" : "r6"));
                
                var E = document.getElementById(x);
                
                if (E) { 
                    E.appendChild(r); 
                    r.className = "karta " + (1 === v ? "karta-h1" : "karta-h2"); 
                    if ("S" === g) r.classList.add("karta-s-class-aura"); 
                    
                    if (1 === v) p1_played_cards.push(_); else p2_played_cards.push(_); 
                    
                    if (l) { 
                        dynamicDrawNewCard(c); 
                        dynamicDrawNewCard(c); 
                        if ("A" === g || "S" === g) { spustiSpyNakukanie(c); } 
                    } 
                    if ("Doktor" === u || "Sestricka" === u) ozivKartuZArchivu(c); 
                }
                
                if ("Erik" === u) { 
                    hracCakajuciNaAkciu = c; 
                    blokujVykladanie = true; 
                    setTimeout(function() { 1 === c ? document.getElementById("panel-erik").classList.remove("schovany") : spustiErikaAIJadro(2); }, 10); 
                } else if ("Marek" === u) { 
                    hracCakajuciNaAkciu = c; 
                    blokujVykladanie = true; 
                    setTimeout(function() { 1 === c ? spustiMarekaLogiku() : spustiMarekaAIJadro(2); }, 10); 
                } else {
                    ukonciTah(c);
                }
            }
        }
    }
});

document.getElementById("marek-burn-btn").addEventListener("click", function(e) {
    e.stopPropagation(); 
    var dd = document.getElementById("marek-dropdown"); 
    var zId = dd.value; 
    if (!zId) return;
    
    var sPole = (1 === hracCakajuciNaAkciu) ? p2_played_cards : p1_played_cards;
    var idx = sPole.findIndex(function(c) { return c && c.id === zId; });
    if (-1 !== idx) {
        var k = sPole[idx]; 
        var el = document.getElementById(k.id); 
        if (el) el.remove();
        
        if (1 === k.pNum) p1_spalene.push(k); else p2_spalene.push(k);
        sPole.splice(idx, 1); 
        
        document.getElementById('panel-marek').classList.add('schovany');
        blokujVykladanie = false;
        var povH = hracCakajuciNaAkciu; 
        hracCakajuciNaAkciu = 0;
        
        aktualizujArchivyVizualne();
        ukonciTah(povH);
    }
});

spustiDraft();
