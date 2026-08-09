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
    var p1Katy = vsetky.some(function(k) { return k && k.n && -1 !== k.n.indexOf('Katy') && 1 === k.pNum; }), 
        p2Katy = vsetky.some(function(k) { return k && k.n && -1 !== k.n.indexOf('Katy') && 2 === k.pNum; });
    var mC1 = countMravce(p1_played_cards), mC2 = countMravce(p2_played_cards), 
        hC1 = countHoluby(p1_played_cards), hC2 = countHoluby(p2_played_cards);

    // Zistenie S-Class Aury na riadkoch
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

        // 1. Výpočet čistého základu karty aj s jej triednym bonusom
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

        // 2. NULOVANIE PERCENTUÁLNEHO BUFFU PRE KAŽDÚ KARTU
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
        
        // Odovzdávame triednyZaklad, aby kód vedel, či je karta NENORMÁLNE buffnutá kúzlom
        el.innerHTML = vytvorHTMLKarty(cMeno, c.livePwr, c.cls, c.row, triednyZaklad);
    }

    for (var r = 1; r <= 6; r++) { 
        var elS = document.getElementById('s' + r); 
        if (elS) elS.innerText = zratajRad(r > 3 ? p1_played_cards : p2_played_cards, r > 3 ? r - 3 : (r === 1 ? 3 : (r === 2 ? 2 : 1))) + " b"; 
    }

    sc1 = p2_used_mulligan ? 7 : 0; p1_played_cards.forEach(function(card) { if (card && "number" == typeof card.livePwr) sc1 += card.livePwr; });
    sc2 = p1_used_mulligan ? 7 : 0; p2_played_cards.forEach(function(card) { if (card && "number" == typeof card.livePwr) sc2 += card.livePwr; });
    if (document.getElementById('body-skore')) { document.getElementById('body-skore').innerHTML = "Hráč 1: " + sc1 + " b | Hráč 2: " + sc2 + " b" + vTxt; }
}
