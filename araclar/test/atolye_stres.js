// Hesap Atölyesi üreticilerini binlerce kez çalıştırır: 5 farklı şık, NaN/undefined yok, öncül/kök tutarlı.
global.window = {};
require("../../public/isan/atolye.js");
const G = window.ATOLYE; let hata = 0; const say = {};
for (const g of G) {
  let ok = 0, bos = 0;
  for (let i = 0; i < 3000; i++) {
    let q; try { q = g.uret(); } catch (e) { console.log(g.id, "HATA", e.message); hata++; break; }
    if (!q) { bos++; continue; }
    const s = q.secenekler; const metin = JSON.stringify(q);
    const sorun = [];
    if (!Array.isArray(s) || s.length !== 5) sorun.push("şık sayısı " + (s && s.length));
    if (new Set(s).size !== s.length) sorun.push("aynı şık");
    if (q.dogru !== 0) sorun.push("dogru 0 değil");
    if (/NaN|undefined|Infinity|null/.test(metin)) sorun.push("NaN/undefined");
    if (!q.sayfa || !q.aciklama) sorun.push("sayfa/açıklama yok");
    if (!q.soru && !q.kok) sorun.push("soru yok");
    if (sorun.length) { if (hata < 30) console.log(g.id, sorun.join(", "), s); hata++; } else ok++;
  }
  say[g.id] = `${ok} ok, ${bos} yeniden`;
}
console.log(say); console.log(G.length, "üretici;", hata ? hata + " hata" : "hata yok");
process.exit(hata ? 1 : 0);
