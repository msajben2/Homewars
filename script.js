// =========================================================================
// RODINNÁ HRA - HOME WARS (VERZIA 10.9.17 - FULL CLEANOVERLAY & AUDIO FIX)
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

var VERZIA = "10.9.17";

var MASTER_REGISTRY = {
    // POSTAVY A JEDNOTKY (MUŽI)
    "Michal": { row: 1, p: 4, img: "Img/michal.webp", desc: "Bystrý obchodník. Váži zlato a pozná presnú cenu každej veci v kráľovstve.", abilityDesc: "📢 Obchodník: Ak nie je na stole Nela, dáva sám sebe automatický samo-buff +100% k svojej základnej sile." },
    "Erik": { row: 1, p: 3, img: "Img/erik.webp", desc: "Geniálny taktik, ktorý plánuje každý krok nad bojovou mapou so šachovými figúrkami.", abilityDesc: "📢 Buff: Po vyložení si vyberieš jeden rad (1, 2 alebo 3), ktorému pridá +100% k základnej sile kariet." },
    "Marek": { row: 1, p: 4, img: "Img/marek.webp", desc: "Učený filozof vo fialovom plášti.", abilityDesc: "🧹 Filozof: Svojím otravným filozofovaním úplne zmatie zvolenú kartu súpera a odstráni ju z hry do archívu." },
    "Ďuri": { row: 1, p: 6, img: "Img/duri.webp", desc: "Veterán v plnej zbroji. Pevný a neoblomný pilier každej bitky.", abilityDesc: "📢 Taktik: Ak je na stole vyložený Alkohol, posilňuje úplne všetky tvoje rady o +50%." },
    "Doktor": { row: 1, p: 5, img: "Img/doktor.webp", desc: "Hradný alchymista a lekár, ktorý vie namiešať liečivý elixír aj nebezpečný jed.", abilityDesc: "🏥 Oživenie: Po vyložení ihneď vytiahne a vráti do hry poslednú spálenú kartu z tvojho archívu." },
    "Neviditeľný Mário": { row: 1, p: 4, img: "Img/neviditelny-mario.webp", desc: "Tajuplný zbojník v kapucni, ktorý nečakane udrie z tieňa a znova zmizne." },
    "Martin": { row: 1, p: 4, img: "Img/martin.webp", desc: "Šikovný hraničiar a lovec, ktorý sa potichu kráča tmavým lesom." },
    "Timko": { row: 1, p: 1, img: "Img/tymko.webp", desc: "Obranný štvorročný bojovník s dreveným mečom a obrovským odhodlaním." },
    "Jaro": { row: 1, p: 5, img: "Img/jaro.webp", desc: "Zručný kováč, z ktorého kovadliny vychádzajú tie najostrejšie meče." },
    
    // POSTAVY A JEDNOTKY (ŽENY)
    "Oli": { row: 2, p: 8, img: "Img/oli.webp", desc: "Duchovná matka chrámu, strážiaca svätý pokoj a imunitu pred kúzlam.", abilityDesc: "✝️ Imunita: Jej sila 8b je stála a nedá sa znížiť kúzlam ani negatívnymi vplyvmi stola." },
    "Sisa": { row: 2, p: 4, img: "Img/sisa.webp", desc: "Dvorná dáma, ktorá motivuje chlapov v boji.", abilityDesc: "📢 Dvorná dáma: Zvyšuje silu celého mužského radu o 100%." },
    "Katy": { row: 2, p: 6, img: "Img/katy.webp", desc: "Vždy pomôže, ako je treba – hladným dá chlieb, nevládnym pomocnú ruku.", abilityDesc: "💖 Pomoc: Pridáva +1b všetkým tvojim kartám na stole a uberá -1b všetkým súpeľovým kartám." },
    "Nela": { row: 2, p: 1, img: "Img/nela.webp", desc: "Malá princezná s ochranným amuletom.", abilityDesc: "🛡️ Štít: Zmrazí stôl! Kým je Nela v hre, žiadne karty nedostávajú percentuálne bonusy ani buffy." },
    "Lula": { row: 2, p: 4, img: "Img/lula.webp", desc: "Dvorná harfistka, ktorej čarovná hudba dokáže obmäkčiť aj srdce kata." },
    "Anka": { row: 2, p: 7, img: "Img/anka.webp", desc: "Správkyňa hradných kľúčov. Bez jej povolenia sa neotvoria žiadne dvere." },
    "Darinka": { row: 2, p: 5, img: "Img/darinka.webp", desc: "Majsterka tkáčka. Jej nádherné tkaniny chránia hradné dámy pred chladom." },
    "Viera": { row: 2, p: 6, img: "Img/viera.webp", desc: "Hradná pekárka starajúca sa o bohaté zásoby chleba pre celú posádku." },
    "Sestrička": { row: 2, p: 3, img: "Img/sestricka.webp", desc: "Milosrdná ošetrovateľka, ktorá stavia na nohy ranených bojovníkov z archívu.", abilityDesc: "🏥 Oživenie: Po vyložení oživí a vráti do hry kartu z tvojho hradného archívu." },
    "Kika": { row: 2, p: 3, isSpy: true, img: "Img/kika.webp", desc: "Tajuplná hradná archivárka so zvinutými kráľovskými dekrétmi.", abilityDesc: "🕵️ Špión: Vykladá sa na súperovu stranu stola! Za odmenu ti potiahne 2 karty (S-Class potiahne 3 karty!)." },
    "Zvedavá suseda": { row: 2, p: 7, isSpy: true, img: "Img/zvedava-suseda.webp", desc: "Pozorné oko podhradia. Z okna jej neunikne ani jediný klep.", abilityDesc: "🕵️ Špión: Vykladá sa na súperovu stranu stola a dá ti 2 nové karty z balíčka (S-Class dá 3 karty!)." },
    
    // ZVIERATÁ A SVORKY
    "Grobské Mravce 1": { row: 3, p: 1, img: "Img/grobske-mravce.webp", desc: "Húževnatá svorka lesných mravcov. Sú malé, no v obrovskom počte nepremožiteľné.", abilityDesc: "🤝 Svorka: Ak vyložíš 2 mravce, ich sila stúpne na 2b. Ak vyložíš všetky 3 mravce, ich sila stúpne na 4b za každého!" },
    "Grobské Mravce 2": { row: 3, p: 1, img: "Img/grobske-mravce.webp", desc: "Húževnatá svorka lesných mravcov.", abilityDesc: "🤝 Svorka: Spája silu s ostatnými mravcami na stole." },
    "Grobské Mravce 3": { row: 3, p: 1, img: "Img/grobske-mravce.webp", desc: "Húževnatá svorka lesných mravcov.", abilityDesc: "🤝 Svorka: Spája silu s ostatnými mravcami na stole." },
    
    "Petržalské holuby 1": { row: 3, p: 1, img: "Img/petrzalske-holuby.webp", desc: "Rýchli hradní posli prenášajúci tajné správy naprieč kráľovstvom.", abilityDesc: "🤝 Svorka: Fungujú rovnako ako mravce. Viac holubov na stole = znásobená sila!" },
    "Petržalské holuby 2": { row: 3, p: 1, img: "Img/petrzalske-holuby.webp", desc: "Rýchli hradní posli prenášajúci tajné správy.", abilityDesc: "🤝 Svorka: Násobí silu holubej letky." },
    "Petržalské holuby 3": { row: 3, p: 1, img: "Img/petrzalske-holuby.webp", desc: "Rýchli hradní posli prenášajúci tajné správy.", abilityDesc: "🤝 Svorka: Násobí silu holubej letky." },
    
    "Kabelkový pes": { row: 3, p: 3, img: "Img/kabelkovy-pes.webp", desc: "Panský miláčik usadený na hodvábnom vankúši. Breše viac, než hryzie." },
    "Patkaňe": { row: 3, p: 2, img: "Img/patkane.webp", desc: "Hladná pivničná svorka. Kde sa objavia, tam nastane chaos a zmätok." },
    "Sviňa lesná": { row: 3, p: 4, img: "Img/svina-lesna.webp", desc: "Zúrivý lesný kanec, ktorý zmetie všetko, čo mu stojí v ceste." },
    "Zatúlaný tatranský medveď": { row: 3, p: 5, img: "Img/tatransky-medved.webp", desc: "Obrovská horská šelma zosadajúca zo zasnežených štítov." },
    "Pouličný mačiak": { row: 3, p: 3, img: "Img/poulicny-maciak.webp", desc: "Tichý potulný kocúr obchádzajúci hradné múry a hľadajúci korisť." },
    "Komáre": { row: 3, p: 3, img: "Img/komare.webp", desc: "Dotieravé hradné húfy komárov neúprosne trápiace zvierací rad." },
    
    // NEUTRÁLNE KARTY A VPLYVY
    "Alcohol": { row: 1, p: 0, img: "Img/alkohol.webp", desc: "Súdok medoviny a pálenka pre mužský rad. Výrazne zvyšuje bojovú náladu.", abilityDesc: "🛠️ Predmet: Vykladá sa do 1. radu. Pridáva +50% až +100% k sile mužov." },
    "Kvety": { row: 2, p: 0, img: "Img/kvety.webp", desc: "Kytica čerstvých poľných kvetov pre radosť a povzbudenie ženského radu.", abilityDesc: "🛠️ Predmet: Vykladá sa do 2. radu. Posilňuje všetky ženy na tvojej strane." },
    "Medove Orechy": { row: 3, p: 0, img: "Img/medove-orechy.webp", desc: "Sladká odmena posilňujúca verný zvierací rad.", abilityDesc: "🛠️ Predmet: Vykladá sa do 3. radu. Zvyšuje silu zvierat." },
    "Musíme sa porozprávať": { row: 0, p: 0, img: "Img/musime-sa-porozpravat.webp", desc: "Vážny rozhovor s hradnou paňou okamžite zmrazí silu mužského radu.", abilityDesc: "⚡ Vplyv stola: Zníži silu všetkých mužov (v 1. rade oboch hráčov) na základný 1 bod!" },
    "Musime sa porozpravat": { row: 0, p: 0, img: "Img/musime-sa-porozpravat.webp", desc: "Vážny rozhovor s hradnou paňou okamžite zmrazí silu mužského radu.", abilityDesc: "⚡ Vplyv stola: Zníži silu všetkých mužov (v 1. rade oboch hráčov) na základný 1 bod!" },
    "Upokoj sa": { row: 0, p: 0, img: "Img/upokoj-sa.webp", desc: "Nevhodne zvolené slová vyvolajú obrovský hnev v ženskom rade!", abilityDesc: "⚡ Vplyv stola: Zníži silu všetkých žien (v 2. rade oboch hráčov) na 1 bod!" },
    "Ohnostroj": { row: 0, p: 0, img: "Img/ohnostroj.webp", desc: "Rachot svetlíc a výbuchov vyplaší celý zvierací rad.", abilityDesc: "⚡ Vplyv stola: Vyplaší a zníži silu všetkých zvierat na 1 bod!" },
    "Šicko v porádku": { row: 0, p: 0, img: "Img/sicko-v-poradku.webp", desc: "Dvorný šašo prinesie smiech a vyčistí všetky nepriaznivé vplyvy na stole.", abilityDesc: "⚡ Očistenie: Odstráni zo stola všetky negatívne vplyvy (Ohňostroj, Upokoj sa, Rozhovor)." }
};

var p1_played_cards = [], p2_played_cards = [];
var p1_erik_buff_row = null, p2_erik_buff_row = null;
var sc1 = 0, sc2 = 0, r1 = 0, r2 = 0, p1Pass = false, p2Pass = false, aktualnyHrac = 1, hracCakajuciNaAkciu = 0, blokujVykladanie = false;
var p1_full_deck = [], p2_full_deck = [], p1_draft_hand = [], p2_draft_hand = [];
var p1_used_mulligan = false, p2_used_mulligan = false, p1_confirmed_mulligan = false, p2_confirmed_mulligan = false;
var draft_faza = true; var p1_spalene = [], p2_spalene = [], neutralne_vplyvy = [];
var jeSingleplayer = false; var obtiaznostAI = "B"; var inventar = { mince: 500, karty: {}, zostava: [] };

function getRegistryCard(meno) {
    if (!meno) return {};
    if (MASTER_REGISTRY[meno]) return MASTER_REGISTRY[meno];
    var cisty = meno.replace(/\s+\d+$/, "").trim();
    if (MASTER_REGISTRY[cisty]) return MASTER_REGISTRY[cisty];
    if (cisty.indexOf("Mravce") !== -1) return MASTER_REGISTRY["Grobské Mravce 1"];
    if (cisty.indexOf("holuby") !== -1) return MASTER_REGISTRY["Petržalské holuby 1"];
    return MASTER_REGISTRY[meno] || {};
}

function isSpecialCard(name) {
    var spec = ["Musíme sa porozprávať", "Musime sa porozpravat", "Upokoj sa", "Ohnostroj", "Šicko v porádku", "Alcohol", "Kvety", "Medove Orechy"];
    return spec.indexOf(name) !== -1;
}

function getRealPower(card) {
    if (!card || isSpecialCard(card.n) || card.p === 0) return 0;
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
    if (isSpecialCard(meno)) return null;
    if (meno === "Kika" || meno === "Zvedavá suseda") return { text: "ᛟ", title: "Špión" };
    if (meno === "Marek") return { text: "ᚠ", title: "Filozof" };
    if (meno === "Erik" || meno === "Sisa" || meno === "Michal" || meno === "Ďuri") return { text: "ᛏ", title: "Buff / Taktik" };
    if (meno === "Katy") return { text: "ᛒ", title: "Láskavosť" };
    if (meno === "Oli") return { text: "ᛖ", title: "Imunita" };
    if (meno === "Nela") return { text: "ᛉ", title: "Štít" };
    if (meno === "Doktor" || meno === "Sestrička") return { text: "ᛞ", title: "Oživenie" };
    if (meno.indexOf("Mravce") !== -1 || meno.indexOf("holuby") !== -1) return { text: "ᚷ", title: "Svorka" };
    return null;
}

function vytvorHTMLKarty(meno, livePwr, cls, row, origPwr) {
    var rInfo = getRowLetterAndClass(row);
    var pwrClass = "";
    if (origPwr !== undefined && livePwr !== "none") {
        if (livePwr > origPwr) pwrClass = "buffed";
        else if (livePwr < origPwr) pwrClass = "debuffed";
    }

    var reg = getRegistryCard(meno);
    var imgPath = reg.img || "Img/default.webp";
    var cisteMeno = meno.replace(/\s+\d+$/, "").trim();

    var html = "";
    if (livePwr !== "none") {
        html += "<div class='karta-kruh karta-kruh-pwr " + pwrClass + "'>" + livePwr + "</div>";
    }
    html += "<div class='karta-kruh karta-kruh-cls cls-" + cls + "'>" + cls + "</div>";
    html += "<button class='karta-btn-inspect' title='Zväčšiť kartu' onclick='event.stopPropagation(); otvorDetailKarty(\"" + meno + "\");'>🔍</button>";
    html += "<div class='karta-foto' style=\"background-image: url('" + encodeURI(imgPath) + "');\"></div>";
    
    html += "<div class='karta-stitok-spodok'>";
    html += "  <div class='karta-nazov'>" + cisteMeno + "</div>";
    if (reg.abilityDesc) {
        html += "  <div class='karta-popis-short'>" + reg.abilityDesc + "</div>";
    } else if (reg.desc) {
        html += "  <div class='karta-popis-short'>" + reg.desc + "</div>";
    }
    html += "</div>";

    html += "<div class='karta-kruh karta-kruh-row " + rInfo.cls + "'>" + rInfo.text + "</div>";

    var ab = getAbilityBadge(meno);
    if (ab) {
        html += "<div class='karta-kruh karta-kruh-ability' title='" + ab.title + "'>" + ab.text + "</div>";
    }

    return html;
}

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

    var cisteMeno = meno.replace(/\s+\d+$/, "").trim();
    var invCard = inventar.karty[cisteMeno] || inventar.karty[meno] || { aktivnaTrieda: "C" };
    var triedaRamu = invCard.aktivnaTrieda || "C";

    modal.innerHTML = `
        <div class="card-modal-content cls-${triedaRamu}" onclick="event.stopPropagation()" style="display:flex; flex-direction:column; justify-content:space-between; height:520px; padding:20px; box-sizing:border-box;">
            <span class="card-modal-close" onclick="document.getElementById('card-modal').style.display='none'">&times;</span>
            
            <div class="modal-foto" style="background-image: url('${encodeURI(reg.img)}'); height:260px; background-size:cover; background-position:center; border-radius:8px;"></div>
            
            <div style="background:rgba(17, 13, 6, 0.9); padding:12px; border-radius:8px; border:1px solid rgba(212,175,55,0.4); margin-top:10px;">
                <h2 style="margin:0 0 8px 0; font-size:1.5em; color:#d4af37; text-align:center;">${cisteMeno}</h2>
                <div class="modal-stats" style="display:flex; justify-content:space-around; font-size:0.9em; margin-bottom:8px; color:#e0d0b0;">
                    ${reg.p !== undefined ? `<span>Sila: <strong style="color:#ffcc00;">${reg.p}b</strong></span>` : ''}
                    ${reg.row ? `<span>Rad: <strong style="color:#ffcc00;">${reg.row}. Rad</strong></span>` : ''}
                    <span>Trieda: <strong style="color:#ffcc00;">${triedaRamu}</strong></span>
                </div>
                <p class="modal-desc" style="font-size:0.85em; margin:4px 0; color:#ccc; text-align:center;">${reg.desc || 'Bez popisu.'}</p>
                ${reg.abilityDesc ? `<div class="modal-ability-box" style="font-size:0.85em; margin-top:6px; color:#ffcc00; text-align:center;"><strong>Schopnosť:</strong> ${reg.abilityDesc}</div>` : ''}
            </div>
        </div>
    `;
    modal.style.display = "flex";
}

// FIX: NÁVOD AKO VEĽKÁ PREHĽADNÁ OBRAZOVKA (BEZ TESNÉHO RÁMU KARTY)
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
        <div style="background:rgba(15,12,8,0.95); border:2px solid #d4af37; border-radius:12px; width:90vw; max-width:1000px; height:85vh; padding:30px; box-sizing:border-box; color:#e0d0b0; display:flex; flex-direction:column; position:relative; box-shadow:0 0 40px rgba(0,0,0,0.9);" onclick="event.stopPropagation()">
            <span class="card-modal-close" onclick="document.getElementById('navod-modal').style.display='none'" style="position:absolute; top:15px; right:25px; font-size:2.2em; color:#d4af37; cursor:pointer;">&times;</span>
            <h2 style="color:#d4af37; border-bottom:2px solid #5a4d3e; padding-bottom:12px; margin-top:0; font-size:1.8em;">📜 NÁVOD, PRAVIDLÁ & SCHOPNOSTI KARIET</h2>
            <div style="text-align:left; font-size:1.0em; line-height:1.6; overflow-y:auto; padding-right:15px; flex-grow:1;">
                <h3 style="color:#ffcc00;">1. Cieľ Hry</h3>
                <p>Home Wars je stredoveká taktická kartová hra na 2 víťazné kolá. Vyhráva ten, kto na konci kola získa vyšší súčet bodov vo svojich troch radoch.</p>
                
                <h3 style="color:#ffcc00; margin-top:20px;">2. Pravidlá Vykladania & Radov</h3>
                <p>Karty sa vykladajú do 3 bojových radov: <strong>1. Rad (Muži)</strong>, <strong>2. Rad (Ženy)</strong> a <strong>3. Rad (Zvieratá)</strong>.</p>
                
                <h3 style="color:#ffcc00; margin-top:20px;">3. Dielna & Vylepšovanie Kariet (Forge)</h3>
                <p>Zbierajte repliky kariet z truhiel a vylepšujte ich v Dielni z C-Class na B (Bronz), A (Striebro) a S (Zlato). Vyššia trieda dáva karte permanentnú bonusovú silu a špeciálne efekty!</p>
            </div>
        </div>
    `;
    modal.style.display = "flex";
}

function prepniSekciuVizualne(sekciaId) {
    var duelBezi = document.getElementById("hraci-stol-kontajner") && !document.getElementById("hraci-stol-kontajner").classList.contains("schovany");
    
    if (duelBezi && sekciaId !== 'sekcia-hra') {
        alert("🔒 Zápas prebieha! Najprv musíte dokončiť duel alebo sa vzdať cez tlačidlo 'Vzdať zápas'!");
        return;
    }

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
    var rawList = Object.keys(MASTER_REGISTRY).filter(function(key) {
        return key !== "Grobské Mravce" && key !== "Petržalské holuby" && key !== "Musime sa porozpravat";
    });

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

    var shuffledIndices = Array.from({length: 30}, function(_, i) { return i; }).sort(function() { return 0.5 - Math.random(); });
    var top15Set = new Set(shuffledIndices.slice(0, 15));

    return fList.map(function(m, idx) {
        var dR = MASTER_REGISTRY[m]; var tK = "C";
        if (1 === pNum) { 
            tK = inventar.karty[m] ? inventar.karty[m].aktivnaTrieda : "C"; 
        } else {
            var jeVTop15 = top15Set.has(idx);
            if ("B" === obtiaznostAI) {
                tK = jeVTop15 ? "B" : "C";
            } else if ("A" === obtiaznostAI) {
                tK = jeVTop15 ? "A" : "B";
            } else if ("S" === obtiaznostAI) {
                tK = jeVTop15 ? "S" : "A";
            }
        }
        return { n: m.replace(/\s+\d+$/, "").trim(), row: dR.row, p: dR.p, pNum: pNum, isSpy: dR.isSpy || false, cls: tK };
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
    if (document.getElementById("p2-mulligan-btn")) document.getElementById("p2-mulligan-btn").className = "schovany";
    if (document.getElementById("p1-pass-btn")) {
        document.getElementById("p1-pass-btn").innerText = "Potvrdiť ruku";
        document.getElementById("p1-pass-btn").style.background = "#28a745";
    }

    if (jeSingleplayer) p2_confirmed_mulligan = true;

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
    
    var vChlapov = neutralne_vplyvy.find(function(k) { return k && ("Musíme sa porozprávať" === k.n || "Musime sa porozpravat" === k.n); });
    var vZien = neutralne_vplyvy.find(function(k) { return k && "Upokoj sa" === k.n; });
    var vZvierat = neutralne_vplyvy.find(function(k) { return k && "Ohnostroj" === k.n; });

    if (vsetky.length === 0) {
        for (var k = 1; k <= 6; k++) { if (document.getElementById('s' + k)) document.getElementById('s' + k).innerText = "0 b"; }
        if (document.getElementById('body-skore')) { document.getElementById('body-skore').innerHTML = "Hráč 1: 0 b | Hráč 2: 0 b" + vTxt; }
        return;
    }
    
    var nelaPritomna = vsetky.some(function(k) { return k && k.n && -1 !== k.n.indexOf('Nela'); });
    var p1Katy = vsetky.some(function(k) { return k && k.n && -1 !== k.n.indexOf('Katy') && 1 === k.pNum; }), 
        p2Katy = vsetky.some(function(k) { return k && k.n && -1 !== k.n.indexOf('Katy') && 2 === k.pNum; });
    var mC1 = countMravce(p1_played_cards), mC2 = countMravce(p2_played_cards), 
        hC1 = countHoluby(p1_played_cards), hC2 = countHoluby(p2_played_cards);

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

        var zaklad = MASTER_REGISTRY[cMeno] ? MASTER_REGISTRY[cMeno].p : c.p;
        if (aZ) {
            zaklad = ("S" === aZ.cls) ? 0 : 1;
        } else if (-1 !== cMeno.indexOf('Mravce')) { 
            zaklad = (3 === (1 === c.pNum ? mC1 : mC2)) ? 4 : ((2 === (1 === c.pNum ? mC1 : mC2)) ? 2 : 1);
        } else if (-1 !== cMeno.indexOf('holuby')) { 
            zaklad = (3 === (1 === c.pNum ? hC1 : hC2)) ? 4 : ((2 === (1 === c.pNum ? hC1 : hC2)) ? 2 : 1);
        }

        var triednyZaklad = zaklad;
        if (c.isSpy) {
            if ("B" === c.cls) triednyZaklad -= 1;
            if ("A" === c.cls) triednyZaklad -= 2;
            if ("S" === c.cls) triednyZaklad -= 3;
        } else {
            if ("B" === c.cls) triednyZaklad += 1;
            if ("A" === c.cls) triednyZaklad += 2;
            if ("S" === c.cls) triednyZaklad += 3;
        }
        triednyZaklad = Math.max(0, triednyZaklad);

        var aktualnyZaklad = triednyZaklad;
        if ("Katy" !== cMeno && "Nela" !== cMeno && "Oli" !== cMeno) {
            if (1 === c.pNum) { if (p1Katy) aktualnyZaklad += 1; if (p2Katy) aktualnyZaklad -= 1; } 
            else { if (p2Katy) aktualnyZaklad += 1; if (p1Katy) aktualnyZaklad -= 1; }
        }
        aktualnyZaklad = Math.max(0, aktualnyZaklad);

        var pct = 0.0;
        var cId = (2 === c.pNum) ? (1 === c.row ? "r3" : (2 === c.row ? "r2" : "r1")) : (1 === c.row ? "r4" : (2 === c.row ? "r5" : "r6"));
        
        if (!nelaPritomna) {
            if ("Michal" === cMeno) pct += 1.0; 
            var pr = vsetky.find(function(k) { return k && k.pNum === c.pNum && k.row === c.row && ("Alcohol" === k.n || "Kvety" === k.n || "Medove Orechy" === k.n); });
            var dR = vsetky.some(function(k) { return k && -1 !== k.n.indexOf('Ďuri') && k.pNum === c.pNum && 1 === k.row; });

            if (pr) { 
                var zB = ("S" === pr.cls) ? 1.0 : 0.5; 
                if ("A" === c.cls || "S" === c.cls) { zB = zB * 2; }
                pct += zB; 
            }
            
            if (1 === c.row) { 
                if (vsetky.some(function(k) { return k && -1 !== k.n.indexOf('Sisa') && k.pNum === c.pNum; })) pct += 1.0; 
                if (dR && pr && "Alcohol" === pr.n && "Ďuri" !== cMeno) pct += 0.5; 
            }
            if ((1 === c.pNum ? p1_erik_buff_row : p2_erik_buff_row) !== null && c.row === parseInt(1 === c.pNum ? p1_erik_buff_row : p2_erik_buff_row, 10) && "Erik" !== cMeno) pct += 1.0;
            
            if ("S" !== c.cls) { pct += (sClassRiadkyBonus[cId] || 0); }
        }

        var medzivysledok = aktualnyZaklad + Math.floor(aktualnyZaklad * pct);
        c.livePwr = Math.max(0, medzivysledok);
        
        el.innerHTML = vytvorHTMLKarty(cMeno, c.livePwr, c.cls, c.row, triednyZaklad);
    }

    for (var r = 1; r <= 6; r++) { 
        var elS = document.getElementById('s' + r); 
        if (elS) elS.innerText = zratajRad(r > 3 ? p1_played_cards : p2_played_cards, r > 3 ? r - 3 : (r === 1 ? 3 : (r === 2 ? 2 : 1))) + " b"; 
    }

    sc1 = 0; p1_played_cards.forEach(function(card) { if (card && "number" == typeof card.livePwr) sc1 += card.livePwr; });
    sc2 = 0; p2_played_cards.forEach(function(card) { if (card && "number" == typeof card.livePwr) sc2 += card.livePwr; });
    if (document.getElementById('body-skore')) { document.getElementById('body-skore').innerHTML = "Hráč 1: " + sc1 + " b | Hráč 2: " + sc2 + " b" + vTxt; }
}

function vykresliDraftOkna() {
    var ind = document.getElementById('turn-indicator'); 
    if (draft_faza) {
        if (ind) ind.innerText = "MULLIGAN FÁZA - Hráč potvrdzuje ruku.";
        var r1 = document.getElementById('ruka-p1'); 
        if (r1) { 
            r1.innerHTML = ""; 
            p1_draft_hand.forEach(function(k) { 
                if (!k) return; 
                var d = document.createElement('div'); d.className = "karta karta-h1 cls-" + k.cls; 
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
                var d = document.createElement('div'); d.className = "karta karta-h2 cls-" + k.cls; 
                if ("S" === k.cls) d.classList.add("karta-s-class-aura"); 
                var realPwr2 = getRealPower(k);
                d.innerHTML = vytvorHTMLKarty(k.n, realPwr2, k.cls, k.row, k.p); 
                r2.appendChild(d); 
            }); 
        }
        var b1 = document.getElementById('p1-pass-btn'); if (b1) b1.style.display = p1_confirmed_mulligan ? "none" : "inline-block";
        var b2 = document.getElementById('p2-pass-btn'); if (b2) b2.style.display = "none";
    }
}

function preklopDraftDoRukyHTML() {
    var e = document.getElementById("ruka-p1"); 
    if (e) { 
        e.innerHTML = ""; 
        p1_draft_hand.forEach(function(t) { 
            if (!t) return; 
            var r = document.createElement("div"); r.className = "karta karta-h1 cls-" + t.cls; 
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
            var r = document.createElement("div"); r.className = "karta karta-h2 cls-" + e.cls; 
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
            var o = document.createElement("div"); o.className = "karta karta-nova cls-" + a.cls + " " + (1 === e ? "karta-h1" : "karta-h2"); 
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
    setTimeout(function() { idxs.forEach(function(idx) { if (kS[idx]) { kS[idx].style.background = "#1a1612"; kS[idx].style.boxShadow = "none"; } }); }, 4000);
}

function ozivKartuZArchivu(pNum) {
    var list = (1 === pNum) ? p1_spalene : p2_spalene; 
    if (!list || 0 === list.length) return; 
    
    var k = list.pop(); 
    if (!k) return;
    
    var jeSpy = ("Zvedavá suseda" === k.n || "Kika" === k.n); 
    var tPNum = jeSpy ? (1 === pNum ? 2 : 1) : pNum;
    var div = document.createElement('div'); 
    div.className = "karta karta-nova cls-" + k.cls + " " + (1 === k.pNum ? "karta-h1" : "karta-h2"); 
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
            if ("S" === k.cls) dynamicDrawNewCard(pNum); 
            if ("A" === k.cls || "S" === k.cls) spustiSpyNakukanie(pNum); 
        } 
        if (("Doktor" === k.n || "Sestrička" === k.n) && list.length > 0) {
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

// =========================================================================
// CHROMA KEY ENGINE (VYČISTENÉ TMAVÉ POZADIE PRE TRUHLU)
// =========================================================================
function spustiChromaKeyVideo(containerEl, onVideoEnded) {
    containerEl.innerHTML = "";
    
    var video = document.createElement("video");
    video.src = "Img/truhla.mp4";
    video.playsInline = true;
    video.muted = true;
    video.crossOrigin = "anonymous";
    video.preload = "auto";

    var canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 480;
    canvas.style.cssText = "width:100%; height:100%; max-height:48vh; object-fit:contain; cursor:pointer;";
    containerEl.appendChild(canvas);

    var ctx = canvas.getContext("2d");
    var animFrameId = null;

    function renderFrame() {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        if (video.readyState >= 2) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            var frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var l = frame.data.length / 4;

            for (var i = 0; i < l; i++) {
                var r = frame.data[i * 4 + 0];
                var g = frame.data[i * 4 + 1];
                var b = frame.data[i * 4 + 2];

                if (g > 60 && g > r * 1.1 && g > b * 1.1) {
                    frame.data[i * 4 + 3] = 0; 
                } else if (g > r && g > b) {
                    var factor = (g - Math.max(r, b)) / g;
                    frame.data[i * 4 + 1] = Math.max(r, b);
                    frame.data[i * 4 + 3] = Math.floor(255 * (1 - factor));
                }
            }
            ctx.putImageData(frame, 0, 0);
        }
        
        if (!video.paused && !video.ended) {
            animFrameId = requestAnimationFrame(renderFrame);
        }
    }

    video.addEventListener("loadeddata", function() {
        renderFrame();
    });

    video.addEventListener("play", function() {
        renderFrame();
    });

    video.addEventListener("ended", function() {
        if (animFrameId) cancelAnimationFrame(animFrameId);
        if (onVideoEnded) onVideoEnded();
    });

    return {
        play: function() { video.play(); },
        element: canvas
    };
}

// =========================================================================
// HUDOBNÝ SYSTÉM (NEZÁVISLÝ AUDIO OVLÁDAČ DOSTUPNÝ AJ POČAS GAMEPLAYU)
// =========================================================================
var playlist = [
    { nazov: "Skladba 1", src: "Audio/track1.mp3" },
    { nazov: "Skladba 2", src: "Audio/track2.mp3" },
    { nazov: "Skladba 3", src: "Audio/track3.mp3" },
    { nazov: "Skladba 4", src: "Audio/track4.mp3" },
    { nazov: "Skladba 5", src: "Audio/track5.mp3" },
    { nazov: "Skladba 6", src: "Audio/track6.mp3" }
];

var aktualnyTrackIndex = 0;
var bgAudio = new Audio();
var jeMuted = false;
var naposledyNastavenaHlasitost = 0.3;
var ulozenyCasPrerutenia = 0;
var pauznuteKvoliAnimacii = false;

function inicializujHudobnySystem() {
    bgAudio.volume = naposledyNastavenaHlasitost;
    
    bgAudio.onended = function() {
        ulozenyCasPrerutenia = 0;
        dalsiaSkladba();
    };

    // OVLÁDAČ UPOZORNENÝ MIMO ZAMKNUTEJ HLAVIČKY (Dostupný aj počas zápasu)
    if (!document.getElementById("audio-control-panel")) {
        var audioBox = document.createElement("div");
        audioBox.id = "audio-control-panel";
        audioBox.style.cssText = "position: fixed; top: 12px; right: 15px; z-index: 999999; display: flex; align-items: center; gap: 8px; background: rgba(15, 12, 8, 0.85); backdrop-filter: blur(8px); padding: 5px 14px; border-radius: 20px; border: 1px solid #d4af37; box-shadow: 0 0 15px rgba(0,0,0,0.8);";
        
        audioBox.innerHTML = `
            <button id="btn-audio-mute" onclick="prepniMuteHudby()" style="background: none; border: none; font-size: 1.1em; cursor: pointer; color: #ffcc00;" title="Mute / Unmute">🔊</button>
            <input type="range" id="audio-volume-bar" min="0" max="1" step="0.01" value="0.3" oninput="zmenHlasitostHudby(this.value)" style="width: 70px; cursor: pointer; accent-color: #ffcc00;" title="Hlasitosť">
            <span id="audio-track-title" style="font-size: 0.75em; color: #d4af37; max-width: 100px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">🎵 Hudba...</span>
        `;
        document.body.appendChild(audioBox);
    }

    naciatajSkladbu(0);

    document.addEventListener('click', function spustiNaKlik() {
        if (bgAudio.paused && !pauznuteKvoliAnimacii && !jeMuted) {
            bgAudio.play().catch(function(e) {});
        }
        document.removeEventListener('click', spustiNaKlik);
    }, { once: true });
}

function naciatajSkladbu(index) {
    if (playlist.length === 0) return;
    aktualnyTrackIndex = index % playlist.length;
    var track = playlist[aktualnyTrackIndex];
    bgAudio.src = track.src;
    ulozenyCasPrerutenia = 0;
    
    var titleEl = document.getElementById("audio-track-title");
    if (titleEl) titleEl.innerText = "🎵 " + track.nazov;
    
    if (!jeMuted && !pauznuteKvoliAnimacii) {
        bgAudio.play().catch(function(e) {});
    }
}

function dalsiaSkladba() {
    naciatajSkladbu(aktualnyTrackIndex + 1);
}

function zmenHlasitostHudby(val) {
    var v = parseFloat(val);
    bgAudio.volume = v;
    naposledyNastavenaHlasitost = v;
    
    var btnMute = document.getElementById("btn-audio-mute");
    if (v === 0) {
        jeMuted = true;
        if (btnMute) btnMute.innerText = "🔇";
    } else {
        jeMuted = false;
        if (btnMute) btnMute.innerText = "🔊";
    }
}

function prepniMuteHudby() {
    var btnMute = document.getElementById("btn-audio-mute");
    var slider = document.getElementById("audio-volume-bar");

    if (jeMuted) {
        jeMuted = false;
        bgAudio.volume = naposledyNastavenaHlasitost > 0 ? naposledyNastavenaHlasitost : 0.3;
        if (slider) slider.value = bgAudio.volume;
        if (btnMute) btnMute.innerText = "🔊";
        if (!pauznuteKvoliAnimacii) bgAudio.play();
    } else {
        jeMuted = true;
        bgAudio.pause();
        if (btnMute) btnMute.innerText = "🔇";
    }
}

function pozastavHudbuPreAnimaciu() {
    if (!bgAudio.paused) {
        ulozenyCasPrerutenia = bgAudio.currentTime;
        pauznuteKvoliAnimacii = true;
        bgAudio.pause();
    }
}

function obnovHudbuPoAnimacii() {
    if (pauznuteKvoliAnimacii && !jeMuted) {
        pauznuteKvoliAnimacii = false;
        bgAudio.currentTime = ulozenyCasPrerutenia;
        bgAudio.play().catch(function(e) {});
    }
}

window.prepniMuteHudby = prepniMuteHudby;
window.zmenHlasitostHudby = zmenHlasitostHudby;

// =========================================================================
// OTVÁRANIE TRUHLICE S PREHĽADNÝM BOČNÝM PANELOM ODMIEN
// =========================================================================
function otvorTruhlu(jeVitaz, jeRemizaZapasu) {
    if (jeSingleplayer && !jeVitaz && !jeRemizaZapasu) { alert("Zápas proti AI skončil prehrou."); return; }
    
    pozastavHudbuPreAnimaciu();

    var hMena = Object.keys(MASTER_REGISTRY).filter(function(k) { return k !== "Musime sa porozpravat"; });
    var pocetZrebovani = jeVitaz ? 3 : 10;
    var ziskaneMince = jeVitaz ? 300 : 100;
    
    inventar.mince += ziskaneMince;
    var vyžrebovanéKartyZoznam = [];

    for (var i = 0; i < pocetZrebovani; i++) {
        var randomMeno = hMena[Math.floor(Math.random() * hMena.length)];
        var cisteMeno = randomMeno.replace(/\s+\d+$/, "").trim();
        var roll = Math.random() * 100;
        var davka = 1;

        if (jeVitaz) {
            if (roll < 0.5) davka = 100;
            else if (roll < 10.0) davka = 20;
            else if (roll < 30.0) davka = 5;
            else davka = 1;
        } else {
            if (roll < 0.01) davka = 100;
            else if (roll < 2.01) davka = 20;
            else if (roll < 12.01) davka = 5;
            else davka = 1;
        }

        if (!inventar.karty[randomMeno]) {
            inventar.karty[randomMeno] = { replikyC: 0, aktivnaTrieda: "C" };
        }
        inventar.karty[randomMeno].replikyC += davka;

        vyžrebovanéKartyZoznam.push({
            meno: cisteMeno,
            davka: davka,
            reg: getRegistryCard(cisteMeno)
        });
    }

    var cModal = document.getElementById("chest-anim-modal");
    if (!cModal) {
        cModal = document.createElement("div");
        cModal.id = "chest-anim-modal";
        cModal.style.cssText = "position:fixed; top:0; left:0; width:100vw; height:100vh; background:#050403; display:none; justify-content:center; align-items:center; z-index:99999;";
        cModal.onclick = function(e) {
            if (e.target === cModal) {
                obnovHudbuPoAnimacii();
                cModal.style.display = "none";
            }
        };
        document.body.appendChild(cModal);
    }

    var titulok = jeVitaz ? "🏆 TRUHLA VÍŤAZA" : (jeRemizaZapasu ? "📦 TRUHLA ZA REMÍZU" : "📦 TRUHLA ÚČASTNÍKA");

    var kartyHTML = "";
    var cardDelay = 0.08;
    vyžrebovanéKartyZoznam.forEach(function(drop) {
        var reg = drop.reg;
        var basePwr = isSpecialCard(drop.meno) ? "none" : reg.p;
        
        kartyHTML += `
            <div class="chest-card-wrapper" style="animation-delay: ${cardDelay}s; display: flex; flex-direction: column; align-items: center; margin: 10px;">
                <div class="karta cls-C chest-card-front">
                    ${vytvorHTMLKarty(drop.meno, basePwr, "C", reg.row, reg.p)}
                </div>
                <div style="background: #110d06; color: #ffcc00; border: 1px solid #ffcc00; padding: 4px 14px; border-radius: 12px; font-weight: bold; font-size: 1.0em; margin-top: 8px; box-shadow: 0 0 10px #000;">+${drop.davka}x</div>
            </div>
        `;
        cardDelay += 0.1;
    });

    cModal.innerHTML = `
        <div style="position:relative; width:100vw; height:100vh; display:flex; align-items:center; justify-content:center; padding:20px; box-sizing:border-box; pointer-events:none;" onclick="event.stopPropagation()">
            <span class="card-modal-close" onclick="obnovHudbuPoAnimacii(); document.getElementById('chest-anim-modal').style.display='none'" style="pointer-events:auto; position:absolute; top:20px; right:30px; font-size:2.2em; color:#d4af37; cursor:pointer; z-index:100;">&times;</span>
            
            <div id="chest-left-video-box" style="display:flex; flex-direction:column; align-items:center; justify-content:center; transition: all 0.6s ease; width:100%; max-width:650px;">
                <h2 id="chest-main-title" style="color:#d4af37; text-shadow:0 0 15px #ffcc00; font-size:2.2em; margin-bottom:20px;">${titulok}</h2>
                <div id="chest-video-container" style="width:100%; max-width:550px; pointer-events:auto; cursor:pointer;"></div>
                <div id="chest-click-prompt" style="color:#fff; font-size:1.3em; font-weight:bold; text-shadow:0 0 12px #ffcc00; margin-top:20px; pointer-events:auto; cursor:pointer; background:rgba(0,0,0,0.8); padding:12px 30px; border-radius:30px; border:2px solid #ffcc00;">✨ KLIKNI NA TRUHLU PRE OTVORENIE ✨</div>
            </div>

            <!-- PREHĽADNÁ TABUĽKA ODMEN BOKOM PO OTVORENÍ -->
            <div id="chest-rewards-box" style="display:none; flex-direction:column; align-items:center; z-index:10; pointer-events:auto; opacity:0; transition:opacity 0.8s ease; width:55%; max-width:800px; margin-left:30px;">
                <div id="chest-gold-text" style="color:#ffcc00; font-weight:bold; font-size:1.8em; margin-bottom:15px; text-shadow:0 0 12px #000;">🪙 Získané odmeny: +${ziskaneMince} Mincí</div>
                <div style="display:flex; flex-wrap:wrap; justify-content:center; max-height:65vh; overflow-y:auto; padding:20px; background:rgba(15,12,8,0.95); border-radius:12px; border:1px solid rgba(255,204,0,0.5); width:100%; box-shadow:0 0 30px rgba(0,0,0,0.9);">
                    ${kartyHTML}
                </div>
                <button id="chest-close-btn" onclick="obnovHudbuPoAnimacii(); document.getElementById('chest-anim-modal').style.display='none'" style="background:#28a745; color:#fff; border:none; padding:12px 40px; border-radius:8px; cursor:pointer; font-weight:bold; font-size:1.2em; margin-top:20px; box-shadow:0 0 15px #28a745;">Zozbierať odmeny</button>
            </div>
        </div>
    `;

    cModal.style.display = "flex";

    var videoBox = document.getElementById("chest-video-container");
    var promptText = document.getElementById("chest-click-prompt");
    var rewardsBox = document.getElementById("chest-rewards-box");
    var leftBox = document.getElementById("chest-left-video-box");

    var isPlayed = false;
    var chromaEngine = spustiChromaKeyVideo(videoBox, function() {
        if (leftBox) {
            leftBox.style.maxWidth = "350px";
        }
        rewardsBox.style.display = "flex";
        setTimeout(function() {
            rewardsBox.style.opacity = "1";
        }, 100);
    });

    function spustiOtvorenie(e) {
        if (e) e.stopPropagation();
        if (!isPlayed) {
            isPlayed = true;
            if (promptText) promptText.style.display = "none";
            chromaEngine.play();
        }
    }

    if (videoBox) videoBox.onclick = spustiOtvorenie;
    if (promptText) promptText.onclick = spustiOtvorenie;

    aktualizujPanelDielne();
}

// =========================================================================
// MAGICKÝ KOVÁČSKY RITUÁL V DIELNI
// =========================================================================
function spustiKovaciRitual(meno, staraTrieda, novaTrieda, spotrebovaneRepliky) {
    pozastavHudbuPreAnimaciu();

    var modal = document.getElementById("forge-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "forge-modal";
        modal.className = "forge-modal-overlay";
        modal.onclick = function(e) {
            if (e.target === modal) {
                obnovHudbuPoAnimacii();
                modal.style.display = "none";
            }
        };
        document.body.appendChild(modal);
    }

    var reg = getRegistryCard(meno);
    var invObj = inventar.karty[meno] || { replikyC: 0 };
    var aktualneRepliky = invObj.replikyC;

    var trvanieSekundy = 5; 
    if (novaTrieda === "A") trvanieSekundy = 10; 
    if (novaTrieda === "S") trvanieSekundy = 15; 

    var html = `
        <div class="forge-ritual-box" onclick="event.stopPropagation()">
            <span class="card-modal-close" onclick="obnovHudbuPoAnimacii(); document.getElementById('forge-modal').style.display='none'">&times;</span>
            <h2 class="forge-title">🔨 MAGICKÉ KOVANIE (${novaTrieda}-CLASS)</h2>
            
            <div class="forge-flow-container">
                <div class="forge-card-node">
                    <div class="forge-node-label">ZDROJ MATERIALU</div>
                    <div class="karta cls-C">
                        ${vytvorHTMLKarty(meno, reg.p, "C", reg.row, reg.p)}
                    </div>
                    <div class="forge-replica-badge" id="forge-replica-counter">Repliky: ${aktualneRepliky + spotrebovaneRepliky}</div>
                </div>

                <div class="forge-stream-box">
                    <canvas id="forge-stream-canvas" width="120" height="180"></canvas>
                    <div class="forge-arrow-icon">⬇</div>
                </div>

                <div class="forge-card-node" style="position:relative;">
                    <div class="forge-node-label">CIEĽOVÁ KARTA</div>
                    <div class="karta cls-${staraTrieda}" id="forge-target-card" style="transition: transform 0.5s ease, box-shadow 0.5s ease;">
                        ${vytvorHTMLKarty(meno, reg.p, staraTrieda, reg.row, reg.p)}
                    </div>
                    <div id="forge-glow-effect" style="position:absolute; top:0; left:0; width:100%; height:100%; border-radius:10px; pointer-events:none; opacity:0; transition:opacity 0.6s ease, box-shadow 0.6s ease;"></div>
                    <div class="forge-class-badge">Trieda: ${novaTrieda}</div>
                </div>
            </div>

            <button id="forge-done-btn" onclick="obnovHudbuPoAnimacii(); document.getElementById('forge-modal').style.display='none'" style="background:#28a745; color:#fff; border:none; padding:10px 25px; border-radius:6px; cursor:pointer; font-weight:bold; font-size:1em; margin-top:15px; box-shadow:0 0 12px #28a745; opacity:0; transition:opacity 0.5s ease;">Prevziať vylepšenú kartu</button>
        </div>
    `;
    
    modal.innerHTML = html;
    modal.style.display = "flex";

    var canvas = document.getElementById("forge-stream-canvas");
    if (canvas) {
        var ctx = canvas.getContext("2d");
        var iskry = [];
        
        var farbaHore = "#a0a0a0"; 
        var farbaDole = novaTrieda === "S" ? "#ffd700" : (novaTrieda === "A" ? "#e0e0e0" : "#cd7f32");
        
        for (var i = 0; i < 60; i++) {
            iskry.push({
                x: canvas.width / 2 + (Math.random() - 0.5) * 20,
                y: Math.random() * 20,
                speed: Math.random() * 4 + 2,
                size: Math.random() * 4 + 2
            });
        }

        var counterEl = document.getElementById("forge-replica-counter");
        var startCount = aktualneRepliky + spotrebovaneRepliky;
        
        var startCas = performance.now();
        var trvanieMs = trvanieSekundy * 1000;

        function animujPrud(terajsiCas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var elapsed = terajsiCas - startCas;
            var progress = Math.min(1.0, elapsed / trvanieMs);

            if (counterEl) {
                var currentVal = Math.round(startCount - (spotrebovaneRepliky * progress));
                counterEl.innerText = "Repliky: " + currentVal;
            }

            iskry.forEach(function(p) {
                p.y += p.speed;
                if (p.y > canvas.height) {
                    p.y = 0;
                    p.x = canvas.width / 2 + (Math.random() - 0.5) * 20;
                }

                var t = p.y / canvas.height;
                ctx.fillStyle = t < 0.5 ? farbaHore : farbaDole;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            if (progress < 1.0) {
                requestAnimationFrame(animujPrud);
            } else {
                var card = document.getElementById("forge-target-card");
                var glow = document.getElementById("forge-glow-effect");
                var btn = document.getElementById("forge-done-btn");
                
                if (card) {
                    card.className = "karta cls-" + novaTrieda + " forge-target-card";
                    if (novaTrieda === "S") card.classList.add("karta-s-class-aura");
                    card.innerHTML = vytvorHTMLKarty(meno, reg.p, novaTrieda, reg.row, reg.p);
                }

                if (glow) {
                    var shadowColor = "#cd7f32"; 
                    if (novaTrieda === "A") shadowColor = "#ffffff"; 
                    if (novaTrieda === "S") shadowColor = "#ffd700"; 

                    glow.style.boxShadow = "0 0 50px 20px " + shadowColor;
                    glow.style.opacity = "1";
                    
                    setTimeout(function() {
                        glow.style.opacity = "0.4";
                    }, 800);
                }

                if (btn) btn.style.opacity = "1";
            }
        }
        requestAnimationFrame(animujPrud);
    }
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
            alert("Málo replík na vylepšenie!"); 
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
    var kName = e.replace(/\s+\d+$/, "").trim();
    inventar.mince -= 3000; 
    if (!inventar.karty[e]) inventar.karty[e] = { replikyC: 0, aktivnaTrieda: "C" }; 
    inventar.karty[e].replikyC++; 
    alert("🛒 Kúpená C-kópiu: " + kName); 
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

// SMART DELTA AI ENGINE
function spustiTahAI() {
    if (!jeSingleplayer || p2Pass || draft_faza || blokujVykladanie) return; 
    var rA = document.getElementById('ruka-p2'); if (!rA) return;
    var k = rA.querySelectorAll('.karta'); 
    
    if (0 === k.length) { p2Pass = true; hracPasolAI(); return; }
    spustiPrepocty(); 
    
    if (p1Pass && sc2 > sc1) { p2Pass = true; hracPasolAI(); return; }
    
    var presnost = 0.65;
    if ("A" === obtiaznostAI) presnost = 0.80;
    if ("S" === obtiaznostAI) presnost = 0.95;

    var spraviChytryTah = Math.random() < presnost;

    var vK = null;
    var moznosti = Array.from(k);

    if (p1Pass && sc1 >= sc2) {
        var najlepsiKandidat = null;
        var maxPwr = -999;

        moznosti.forEach(function(c) {
            var mK = c.getAttribute('data-meno') || "";
            var pwr = parseInt(c.getAttribute('data-pwr'), 10) || 0;
            var isSpy = "true" === c.getAttribute('data-isspy');

            if (isSpy) return;

            var rowK = parseInt(c.getAttribute('data-row'), 10) || 0;
            if (0 === rowK || "Alcohol" === mK || "Kvety" === mK || "Medove Orechy" === mK) {
                var pocetJednotiekVRade = p2_played_cards.filter(function(pk) { return pk.row === rowK; }).length;
                if (pocetJednotiekVRade > 0) pwr = pocetJednotiekVRade * 2;
                else pwr = 0;
            }

            if (pwr > maxPwr && pwr > 0) {
                maxPwr = pwr;
                najlepsiKandidat = c;
            }
        });

        if (najlepsiKandidat) {
            vK = najlepsiKandidat;
        } else {
            p2Pass = true;
            hracPasolAI();
            return;
        }
    } else {
        if (spraviChytryTah) {
            var sorted = moznosti.sort(function(a, b) { 
                var pA = parseInt(a.getAttribute('data-pwr'), 10) || 0;
                var pB = parseInt(b.getAttribute('data-pwr'), 10) || 0;
                if ("true" === a.getAttribute('data-isspy')) pA += 10;
                if ("true" === b.getAttribute('data-isspy')) pB += 10;
                return pB - pA;
            });
            vK = sorted[0];
        } else {
            var idx = Math.floor(Math.random() * moznosti.length);
            vK = moznosti[idx];
        }
    }

    if (vK) { 
        setTimeout(function() { if (!p2Pass) vK.click(); }, 800); 
    } else { 
        p2Pass = true; 
        hracPasolAI(); 
    }
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
            
            var vylepsenaSila = reg.p;
            if (!isSpecialCard(t) && reg.p > 0) {
                if ("B" === r.aktivnaTrieda) vylepsenaSila += 1;
                if ("A" === r.aktivnaTrieda) vylepsenaSila += 2;
                if ("S" === r.aktivnaTrieda) vylepsenaSila += 3;
            }
            var basePwr = isSpecialCard(t) ? "none" : vylepsenaSila;
            
            cardDiv.innerHTML = vytvorHTMLKarty(t, basePwr, r.aktivnaTrieda, reg.row, reg.p);

            var ciel = 5;
            if (isSpecialCard(t)) ciel = 1000;
            else {
                if ("B" === r.aktivnaTrieda) ciel = 25;
                if ("A" === r.aktivnaTrieda) ciel = 125;
                if ("S" === r.aktivnaTrieda) ciel = 1;
            }
            
            var percento = ("S" === r.aktivnaTrieda && !isSpecialCard(t)) ? 100 : Math.min(100, Math.floor((r.replikyC / ciel) * 100));
            var barColor = percento >= 100 ? "#28a745" : "#ffcc00";

            var actions = "<div class='dielna-info' style='margin-top:6px; font-size:0.82em;'>Repliky: <strong>" + r.replikyC + " / " + (("S" === r.aktivnaTrieda && !isSpecialCard(t)) ? "MAX" : ciel) + "</strong></div>";
            actions += "<div class='forge-progress-bg'><div class='forge-progress-fill' style='width:" + percento + "%; background:" + barColor + ";'></div></div>";
            actions += "<div class='karta-akcie-box'><button class='btn-forge' " + (percento >= 100 ? "style='border-color:#28a745; box-shadow:0 0 10px #28a745;'" : "") + " onclick=\"vylepsiKartuVoForge('" + t + "')\">🔨 Forge</button>";
            actions += "<button class='btn-recycle' onclick=\"recyklujKartuDielne('" + t + "')\">♻️ Recyklovať</button></div>";

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
            if (t === "Musime sa porozpravat") return;
            var reg = MASTER_REGISTRY[t];
            var wrapper = document.createElement("div");
            wrapper.className = "karta-karta-wrapper";

            var cardDiv = document.createElement("div");
            cardDiv.className = "karta cls-C";
            var basePwr = isSpecialCard(t) ? "none" : reg.p;
            cardDiv.innerHTML = vytvorHTMLKarty(t, basePwr, "C", reg.row, reg.p);

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
            if (t === "Musime sa porozpravat") return;
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

// DEV CONSOLE MODULE
function inicializujDevConsole() {
    var header = document.querySelector("header");
    if (header && !document.getElementById("btn-dev-toggle")) {
        var btnDev = document.createElement("button");
        btnDev.id = "btn-dev-toggle";
        btnDev.className = "menu-tab";
        btnDev.style.cssText = "background: #7c2d12; color: #ffcc00; border-color: #d97706;";
        btnDev.innerHTML = "🛠️ DEV CONSOLE";
        btnDev.onclick = function() {
            var bar = document.getElementById("dev-bar");
            if (bar) bar.style.display = (bar.style.display === "none" || !bar.style.display) ? "flex" : "none";
        };
        header.appendChild(btnDev);
    }

    if (!document.getElementById("dev-bar")) {
        var devBar = document.createElement("div");
        devBar.id = "dev-bar";
        devBar.style.cssText = "display:none; background:#1e140a; border-bottom:2px solid #d97706; padding:8px 15px; gap:10px; align-items:center; flex-wrap:wrap; font-size:0.85em; z-index:999; position:relative;";
        
        var selectKarta = "<select id='dev-card-select' style='background:#2a2118; color:#fff; border:1px solid #5a4d3e; padding:4px; border-radius:4px;'>";
        Object.keys(MASTER_REGISTRY).forEach(function(k) {
            if (k === "Musime sa porozpravat") return;
            selectKarta += "<option value='" + k + "'>" + k + "</option>";
        });
        selectKarta += "</select>";

        devBar.innerHTML = `
            <span style="color:#d97706; font-weight:bold;">🛠️ TESTER:</span>
            ${selectKarta}
            <button onclick="devPridajKartuDoRuky()" style="background:#059669; color:#fff; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-weight:bold;">➕ Pridať do ruky</button>
            <button onclick="devTestPresetSisaKvety()" style="background:#d97706; color:#fff; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-weight:bold;">🧪 Test: Sisa A + Kvety</button>
            <button onclick="devPridajMince(5000)" style="background:#eab308; color:#000; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-weight:bold;">💰 +5000 Mincí</button>
            <button onclick="devPridajReplikyVsetkym(100)" style="background:#8b5cf6; color:#fff; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-weight:bold;">🛠️ +100 Replík</button>
            <button onclick="devVycistiStol()" style="background:#dc2626; color:#fff; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-weight:bold;">🧹 Vyčistiť stôl</button>
            
            <span style="color:#2563eb; font-weight:bold; margin-left:auto;">🤖 SIMULÁTOR AI:</span>
            <select id="sim-diff-select" style="background:#1e3a8a; color:#fff; border:1px solid #3b82f6; padding:4px; border-radius:4px; font-weight:bold;">
                <option value="B">AI Trieda B (65% Presnosť)</option>
                <option value="A">AI Trieda A (80% Presnosť)</option>
                <option value="S">AI Trieda S (95% Presnosť)</option>
            </select>
            <button onclick="devSpustiPokrociluSimulaciu(1000)" style="background:#2563eb; color:#fff; border:none; padding:4px 8px; border-radius:4px; cursor:pointer; font-weight:bold;">🚀 Odohrať 1000 zápasov</button>
        `;
        document.body.insertBefore(devBar, document.body.firstChild);
    }
}

function devPridajKartuDoRuky() {
    var sel = document.getElementById("dev-card-select");
    if (!sel) return;
    var meno = sel.value;
    var reg = MASTER_REGISTRY[meno];
    if (!reg) return;

    var inv = inventar.karty[meno] || { aktivnaTrieda: "C" };
    var kartaObj = { n: meno, row: reg.row, p: reg.p, pNum: 1, isSpy: reg.isSpy || false, cls: inv.aktivnaTrieda };
    dynamicDrawNewCard(1, kartaObj);
    spustiPrepocty();
}

function devPridajMince(pocet) {
    inventar.mince += pocet;
    var wallet = document.getElementById("wallet-p1");
    if (wallet) wallet.innerText = inventar.mince + " m";
    alert("💰 Pridaných " + pocet + " mincí!");
}

function devPridajReplikyVsetkym(pocet) {
    Object.keys(MASTER_REGISTRY).forEach(function(k) {
        if (!inventar.karty[k]) inventar.karty[k] = { replikyC: 0, aktivnaTrieda: "C" };
        inventar.karty[k].replikyC += pocet;
    });
    aktualizujPanelDielne();
    alert("🛠️ Pridaných " + pocet + " replík pre všetky karty!");
}

function devVycistiStol() {
    resetStolaBezReloadu(true);
}

function devTestPresetSisaKvety() {
    resetStolaBezReloadu(true);
    
    var sisaCard = { id: "dev_sisa", n: "Sisa", pNum: 1, row: 2, p: 4, livePwr: 6, cls: "A", isSpy: false };
    p1_played_cards.push(sisaCard);
    
    var kvetyCard = { id: "dev_kvety", n: "Kvety", pNum: 1, row: 2, p: 0, livePwr: "none", cls: "C", isSpy: false };
    p1_played_cards.push(kvetyCard);

    var r5 = document.getElementById("r5");
    if (r5) {
        r5.innerHTML = "2. Rad (Ženy): <span class='skore-rad' id='s5'>0 b</span>";
        
        var d1 = document.createElement("div");
        d1.className = "karta karta-h1 cls-A";
        d1.id = "dev_sisa";
        d1.innerHTML = vytvorHTMLKarty("Sisa", 6, "A", 2, 4);
        
        var d2 = document.createElement("div");
        d2.className = "karta karta-h1 cls-C";
        d2.id = "dev_kvety";
        d2.innerHTML = vytvorHTMLKarty("Kvety", "none", "C", 2, 0);

        r5.appendChild(d1);
        r5.appendChild(d2);
    }
    
    spustiPrepocty();
}

// FIX: VÝSLEDKY SIMULÁCIE AKO VEĽKÁ PREHĽADNÁ TABUĽKA BEZ RÁMOV
function devSpustiPokrociluSimulaciu(pocetZapasov) {
    var diffSelect = document.getElementById("sim-diff-select");
    var zvolenaDiff = diffSelect ? diffSelect.value : "S";

    var p1Vyhry = 0, p2Vyhry = 0, remizy = 0;
    var celkoveSkoreP1 = 0, celkoveSkoreP2 = 0;

    var kartaStats = {};

    var starySP = jeSingleplayer;
    var staryDiff = obtiaznostAI;
    jeSingleplayer = true;
    obtiaznostAI = zvolenaDiff;

    var presnostAI = 0.65;
    if ("A" === zvolenaDiff) presnostAI = 0.80;
    if ("S" === zvolenaDiff) presnostAI = 0.95;

    for (var i = 0; i < pocetZapasov; i++) {
        var deck1 = vytvorZoznamKariet(1);
        var deck2 = vytvorZoznamKariet(2);

        var hand1 = deck1.splice(0, 10);
        var hand2 = deck2.splice(0, 10);

        var sum1 = 0, sum2 = 0;
        var sCountP1 = 0, sCountP2 = 0;

        hand1.forEach(function(k) {
            var pwr = getRealPower(k);
            if (k.isSpy) sum2 += pwr;
            else sum1 += pwr;
            if ("S" === k.cls) sCountP1++;
        });

        hand2.forEach(function(k) {
            var pwr = getRealPower(k);
            if (k.isSpy) sum1 += pwr;
            else sum2 += pwr;
            if ("S" === k.cls) sCountP2++;
        });

        if (sCountP1 > 0) sum1 = Math.floor(sum1 * (1 + sCountP1 * 0.15));
        if (sCountP2 > 0) sum2 = Math.floor(sum2 * (1 + sCountP2 * 0.15));

        var aiTaktickyBonus = presnostAI * 0.18;
        sum2 = Math.floor(sum2 * (1 + aiTaktickyBonus));

        sum1 = Math.floor(sum1 * (0.85 + Math.random() * 0.15));

        celkoveSkoreP1 += sum1;
        celkoveSkoreP2 += sum2;

        var p1Vyhral = sum1 > sum2;
        if (p1Vyhral) p1Vyhry++;
        else if (sum2 > sum1) p2Vyhry++;
        else remizy++;

        hand1.forEach(function(k) {
            if (!kartaStats[k.n]) kartaStats[k.n] = { played: 0, wins: 0 };
            kartaStats[k.n].played++;
            if (p1Vyhral) kartaStats[k.n].wins++;
        });
    }

    jeSingleplayer = starySP;
    obtiaznostAI = staryDiff;

    var winRateP1 = ((p1Vyhry / pocetZapasov) * 100).toFixed(1);
    var winRateP2 = ((p2Vyhry / pocetZapasov) * 100).toFixed(1);

    var resModal = document.getElementById("sim-result-modal");
    if (!resModal) {
        resModal = document.createElement("div");
        resModal.id = "sim-result-modal";
        resModal.className = "card-modal";
        resModal.onclick = function() { resModal.style.display = "none"; };
        document.body.appendChild(resModal);
    }

    resModal.innerHTML = `
        <div style="background:rgba(15,12,8,0.96); border:2px solid #d4af37; border-radius:12px; width:80vw; max-width:800px; padding:30px; box-sizing:border-box; color:#e0d0b0; display:flex; flex-direction:column; position:relative; box-shadow:0 0 40px rgba(0,0,0,0.9);" onclick="event.stopPropagation()">
            <span class="card-modal-close" onclick="document.getElementById('sim-result-modal').style.display='none'" style="position:absolute; top:15px; right:25px; font-size:2.2em; color:#d4af37; cursor:pointer;">&times;</span>
            <h2 style="color:#d4af37; border-bottom:2px solid #5a4d3e; padding-bottom:12px; margin-top:0;">📊 VÝSLEDKY SIMULÁCIE (${pocetZapasov} DUELOV)</h2>
            <div style="text-align:left; background:rgba(0,0,0,0.6); padding:20px; border-radius:8px; line-height:2.0; font-size:1.1em; margin-top:15px;">
                <p>🎯 <strong>Obťažnosť AI:</strong> <span style="color:#ffcc00; font-weight:bold;">Trieda ${zvolenaDiff} (${(presnostAI * 100)}% Presnosť)</span></p>
                <hr style="border-color:#5a4d3e; margin:15px 0;">
                <p>🏆 <strong>Hráč 1 Výhry:</strong> <span style="color:#28a745; font-weight:bold;">${p1Vyhry} (${winRateP1}%)</span></p>
                <p>🤖 <strong>AI Výhry:</strong> <span style="color:#dc3545; font-weight:bold;">${p2Vyhry} (${winRateP2}%)</span></p>
                <p>⚖️ <strong>Remízy:</strong> ${remizy}</p>
            </div>
        </div>
    `;
    resModal.style.display = "flex";
}

document.addEventListener("DOMContentLoaded", function() {
    var e = document.getElementById("menu-btn-hra"), t = document.getElementById("menu-btn-zostava"), r = document.getElementById("menu-btn-dielna"), n = document.getElementById("menu-btn-trhovisko");
    if (e) e.addEventListener("click", function() { prepniSekciuVizualne("sekcia-hra") }); 
    if (t) t.addEventListener("click", function() { prepniSekciuVizualne("sekcia-zostava"), aktualizujZostavaPanel() }); 
    if (r) r.addEventListener("click", function() { prepniSekciuVizualne("sekcia-dielna"), aktualizujPanelDielne() }); 
    if (n) n.addEventListener("click", function() { prepniSekciuVizualne("sekcia-trhovisko"), vygenerujRegalyTrhoviska(), aktualizujPanelDielne() }); 
    
    var header = document.querySelector("header");
    if (header && !document.getElementById("menu-btn-navod")) {
        var btnNavod = document.createElement("button");
        btnNavod.id = "menu-btn-navod";
        btnNavod.className = "menu-tab";
        btnNavod.innerHTML = "📜 NÁVOD";
        btnNavod.onclick = otvoriťNavodHry;
        
        var navBox = document.createElement("div");
        navBox.className = "menu-nav-box";
        
        while (header.children.length > 0) {
            if (header.children[0].classList.contains("menu-wallet")) break;
            navBox.appendChild(header.children[0]);
        }
        navBox.appendChild(btnNavod);
        header.insertBefore(navBox, header.firstChild);
    }

    inicializujDevConsole();
    p1_full_deck = vytvorZoznamKariet(1); obnovPocitadlaZostavyVMenu();
    inicializujHudobnySystem();
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
                    r.className = "karta " + (1 === v ? "karta-h1" : "karta-h2") + " cls-" + g; 
                    if ("S" === g) r.classList.add("karta-s-class-aura"); 
                    
                    if (1 === v) p1_played_cards.push(_); else p2_played_cards.push(_); 
                    
                    if (l) { 
                        dynamicDrawNewCard(c); dynamicDrawNewCard(c);
                        if ("S" === g) dynamicDrawNewCard(c); 
                        if ("A" === g || "S" === g) { spustiSpyNakukanie(c); } 
                    } 
                    if ("Doktor" === u || "Sestrička" === u) ozivKartuZArchivu(c); 
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

// =========================================================================
// GLOBÁLNE PREPOJENIE FUNKCIÍ PRE HTML ONCLICK TLAČIDLÁ
// =========================================================================
window.spustitZapasLokálnePVP = spustitZapasLokálnePVP;
window.zobraziťMenuAI = zobraziťMenuAI;
window.spustitZapasProtiAI = spustitZapasProtiAI;
window.vzdajZapasUtek = vzdajZapasUtek;
window.Admin_vynutVymenu = Admin_vynutVymenu;
window.vylepsiKartuVoForge = vylepsiKartuVoForge;
window.recyklujKartuDielne = recyklujKartuDielne;
window.kupNahodnyBooster = kupNahodnyBooster;
window.kupKonkretnuKartu = kupKonkretnuKartu;
window.otvorTruhlu = otvorTruhlu;
window.otvorDetailKarty = otvorDetailKarty;

// Dev Console funkcie
window.devPridajKartuDoRuky = devPridajKartuDoRuky;
window.devPridajMince = devPridajMince;
window.devPridajReplikyVsetkym = devPridajReplikyVsetkym;
window.devVycistiStol = devVycistiStol;
window.devTestPresetSisaKvety = devTestPresetSisaKvety;
window.devSpustiPokrociluSimulaciu = devSpustiPokrociluSimulaciu;
