/* Veri ve İş Analitiği — Hesap Atölyesi soru üreticileri.
   Her üretici her çağrıda yeni sayılarla 5 şıklı bir soru döndürür: {soru, tablo?, onculler?, kok?, secenekler, dogru, aciklama, cozum, celdirici, sayfa}.
   Yanlış şıklar sık yapılan hatalardan üretilir; açıklama hangi hatanın hangi sonucu verdiğini söyler.
   Kitap: Bölüm 1 s. 5–20, Bölüm 2 s. 21–46, Bölüm 3 s. 47–66. */
(() => {
  "use strict";
  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const sec = (a) => a[Math.floor(Math.random() * a.length)];
  const kar = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const yuv = (x, d = 2) => Math.round(x * 10 ** d) / 10 ** d;
  const tr = (x, d = 2) => Number(yuv(x, d)).toLocaleString("tr-TR", { maximumFractionDigits: d }).replace("-", "−");
  const topla = (a) => a.reduce((s, x) => s + x, 0);
  const ROMA = ["I", "II", "III"];
  const ONC = ["Yalnız I", "Yalnız II", "Yalnız III", "I ve II", "I ve III", "II ve III", "I, II ve III"];

  // 5 farklı şık: doğru + çeldiriciler; eksik kalırsa doğruya yakın sayılarla doldur
  function siklar(dogru, celdiriciler, bicim = (x) => tr(x), adim) {
    const out = [bicim(dogru)];
    celdiriciler.forEach((c) => { const s = bicim(c); if (Number.isFinite(c) && !out.includes(s) && out.length < 5) out.push(s); });
    const a = adim || Math.max(1, Math.abs(dogru) * 0.1);
    let k = 1;
    while (out.length < 5) { const c = bicim(dogru + (k % 2 ? 1 : -1) * Math.ceil(k / 2) * a); if (!out.includes(c)) out.push(c); k++; }
    return { secenekler: out, dogru: 0 };
  }
  function oncullu(dogruMu) { // [true,false,true] -> öncül şıkları
    const id = dogruMu.map((d, i) => (d ? ROMA[i] : null)).filter(Boolean);
    const ad = id.length === 1 ? "Yalnız " + id[0] : id.length === 2 ? id.join(" ve ") : "I, II ve III";
    const digerler = kar(ONC.filter((x) => x !== ad)).slice(0, 4);
    return { secenekler: [ad, ...digerler], dogru: 0 };
  }

  const G = [];
  const ekle = (g) => G.push(g);

  // =================== BÖLÜM 1 ===================
  ekle({ id: "amac", bolum: "b1", ad: "Amaç fonksiyonunun değeri", aciklama: "Z = aX1 + bX2'de optimal değerleri yerine koy", formul: ["amac"], uret() {
    const a = R(2, 16) * 5, b = R(2, 18) * 5;
    const x1 = sec([R(1, 20), R(2, 30) / 2, R(2, 25) / 10]), x2 = sec([R(1, 20), R(2, 30) / 2, R(2, 25) / 10]);
    const z = a * x1 + b * x2;
    return Object.assign(siklar(z, [a * x2 + b * x1, a * x1, b * x2, a * x1 + b * x2 + b, (a + b) * (x1 + x2)], undefined, 5), {
      soru: `Bir iş analistinin kâr maksimizasyonu modelinde amaç fonksiyonu Z = ${a} X1 + ${b} X2'dir. Optimal çözümü sağlayan değerler X1 = ${tr(x1)} ve X2 = ${tr(x2)} ise amaç fonksiyonunun optimal değeri kaçtır?`,
      cozum: [`${a} × ${tr(x1)} = ${tr(a * x1)}`, `${b} × ${tr(x2)} = ${tr(b * x2)}`, `Z = ${tr(a * x1)} + ${tr(b * x2)} = ${tr(z)}`],
      aciklama: "Her katsayı kendi değişkeniyle çarpılır ve toplanır.", celdirici: `${tr(a * x2 + b * x1)} katsayıları değişkenlerle yer değiştirince, ${tr(a * x1)} ikinci terimi unutunca çıkar.`, sayfa: "s. 13" });
  } });

  ekle({ id: "amac-ters", bolum: "b1", ad: "Hangi amaç fonksiyonu?", aciklama: "Optimal değer ve karar değişkenlerinden fonksiyonu bul", formul: ["amac"], uret() {
    const x1 = R(2, 9), x2 = R(2, 9); const a = R(2, 12) * 5, b = R(2, 12) * 5; const z = a * x1 + b * x2;
    const sec_ = [[a, b]]; let deneme = 0;
    while (sec_.length < 5 && deneme++ < 200) { const p = [R(1, 14) * 5, R(1, 14) * 5]; const v = p[0] * x1 + p[1] * x2; if (v !== z && !sec_.some((s) => s[0] === p[0] && s[1] === p[1])) sec_.push(p); }
    if (sec_.length < 5) return null;
    if (b * x1 + a * x2 !== z && a !== b && !sec_.some((s) => s[0] === b && s[1] === a)) sec_[1] = [b, a];
    return { secenekler: sec_.map(([p, q]) => `Z = ${p} X1 + ${q} X2`), dogru: 0,
      soru: `Optimal çözüm değeri ${z} olan ve karar değişkenleri X1 = ${x1}, X2 = ${x2} olan karar probleminin amaç fonksiyonu aşağıdakilerden hangisi olabilir?`,
      cozum: [`Her şıkta X1 = ${x1} ve X2 = ${x2} değerlerini yerine koy`, `Z = ${a} × ${x1} + ${b} × ${x2} = ${a * x1} + ${b * x2} = ${z}`, "Diğer şıklar farklı değer verir."],
      aciklama: "Şıkları tek tek dene; sonucu verilen optimal değeri veren fonksiyon doğrudur.", sayfa: "s. 13" };
  } });

  ekle({ id: "kar", bolum: "b1", ad: "Kredi kârı", aciklama: "X bankası örneğindeki kâr formülü", formul: ["kar"], uret() {
    const K = R(2, 12) * 5, g = sec([5, 10, 15, 20, 25, 40]) / 100, f = sec([30, 40, 42, 45, 48, 50, 55, 60, 70]) / 100;
    const gb = K * g, kar_ = (K - gb) * f - gb;
    return Object.assign(siklar(kar_, [(K - gb) * f, K * f, K * f - gb, (K - gb) * f - 2 * gb, K * (f - g)], (x) => tr(x, 3), 0.5), {
      soru: `Geri ödememe oranı %${tr(g * 100)}, faiz oranı %${tr(f * 100)} olan bir risk grubuna ${K} milyon TL kredi verilirse elde edilecek kâr kaç milyon TL olur? (Kâr = (Kredi − Geri ödenmeyen) × faiz − Geri ödenmeyen)`,
      cozum: [`Geri ödenmeyen = ${K} × ${tr(g)} = ${tr(gb, 3)}`, `(${K} − ${tr(gb, 3)}) × ${tr(f)} = ${tr((K - gb) * f, 3)}`, `Kâr = ${tr((K - gb) * f, 3)} − ${tr(gb, 3)} = ${tr(kar_, 3)}`],
      aciklama: "Geri ödenmeyen tutar iki kez düşülür: faiz hesaplanmadan önce ve sonda zarar olarak.",
      celdirici: `${tr((K - gb) * f, 3)} sondaki düşmeyi unutmak, ${tr(K * f, 3)} geri ödenmeyeni hiç hesaba katmamaktır.`, sayfa: "s. 12" });
  } });

  ekle({ id: "optimal", bolum: "b1", ad: "Optimal çözümü seç", aciklama: "Kriter tablosundan uygulanabilir ve optimal çözüm", uret() {
    let alt;
    for (let d = 0; d < 100; d++) {
      alt = [1, 2, 3, 4, 5].map((n) => ({ n, kar: R(50, 190) * 10 + R(0, 99) / 100, k: [0, 1, 2].map(() => Math.random() < 0.72) }));
      const uyg = alt.filter((a) => a.k.every(Boolean)); const enYuksek = alt.reduce((m, a) => (a.kar > m.kar ? a : m));
      if (uyg.length >= 2 && uyg.length <= 3 && !enYuksek.k.every(Boolean) && new Set(alt.map((a) => a.kar)).size === 5) break; alt = null;
    }
    if (!alt) return null;
    const uyg = alt.filter((a) => a.k.every(Boolean)); const opt = uyg.reduce((m, a) => (a.kar > m.kar ? a : m)); const enY = alt.reduce((m, a) => (a.kar > m.kar ? a : m));
    const sira = [opt.n, ...alt.filter((a) => a.n !== opt.n).map((a) => a.n)];
    return { secenekler: sira.map((n) => `Alternatif Çözüm ${n}`), dogru: 0,
      tablo: { basliklar: ["Alternatif", "Kâr (milyon TL)", "Kriter I", "Kriter II", "Kriter III"], satirlar: alt.map((a) => [`Alternatif Çözüm ${a.n}`, tr(a.kar), ...a.k.map((x) => (x ? "o" : "x"))]), baslik: "o: koşul sağlanır, x: koşul sağlanmaz" },
      tabloOnce: true, soru: "Yukarıdaki karar modeli sonuç tablosuna göre optimal çözüm hangisidir?",
      cozum: [`Bütün kriterleri sağlayanlar: ${uyg.map((a) => a.n).join(", ")}`, `Bunlar arasında kârı en yüksek olan: Alternatif Çözüm ${opt.n} (${tr(opt.kar)})`],
      aciklama: "Önce uygulanabilirlik (bütün kriterler o), sonra amaç (en yüksek kâr).",
      celdirici: `Alternatif Çözüm ${enY.n}: kârı en yüksek ama Kriter ${ROMA[enY.k.indexOf(false)]} sağlanmıyor (x), uygulanabilir değil.`, sayfa: "s. 12–13" };
  } });

  // =================== BÖLÜM 2 ===================
  const veri = (n, a = 2, b = 40) => Array.from({ length: n }, () => R(a, b));
  const medyanBul = (x) => { const s = x.slice().sort((p, q) => p - q); const n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
  const ceyrek = (s, k) => { const p = (k * (s.length + 1)) / 4; const t = Math.floor(p), o = p - t; if (t < 1) return s[0]; if (t >= s.length) return s[s.length - 1]; return s[t - 1] + o * (s[t] - s[t - 1]); };

  ekle({ id: "ort", bolum: "b2", ad: "Aritmetik ortalama", aciklama: "Toplam / gözlem sayısı", formul: ["ort"], uret() {
    const n = R(5, 7); const x = veri(n, 3, 60); const o = topla(x) / n;
    return Object.assign(siklar(o, [medyanBul(x), topla(x) / (n - 1), topla(x) / (n + 1), (Math.max(...x) + Math.min(...x)) / 2]), {
      soru: `İşletmedeki bir problemle ilgili veri seti şöyledir: ${x.join(", ")}. Veri setinin aritmetik ortalaması kaçtır?`,
      cozum: [`Toplam = ${x.join(" + ")} = ${topla(x)}`, `n = ${n}`, `x̄ = ${topla(x)} / ${n} = ${tr(o)}`], aciklama: "Bütün değerleri topla, gözlem sayısına böl.",
      celdirici: `${tr(medyanBul(x))} medyandır; ${tr(topla(x) / (n - 1))} n − 1'e bölmektir (bu varyansta yapılır, ortalamada değil).`, sayfa: "s. 31" });
  } });

  ekle({ id: "medyan", bolum: "b2", ad: "Medyan", aciklama: "Sırala, ortadakini al", formul: ["medyan"], uret() {
    const n = R(5, 8); const x = kar(veri(n, 1, 50)); const s = x.slice().sort((p, q) => p - q); const m = medyanBul(x);
    const sirasiz = n % 2 ? x[(n - 1) / 2] : (x[n / 2 - 1] + x[n / 2]) / 2;
    return Object.assign(siklar(m, [sirasiz, topla(x) / n, s[Math.floor(n / 2)], s[Math.floor(n / 2) - 1]], undefined, 0.5), {
      soru: `${x.join(", ")} veri setinin medyanı kaçtır?`,
      cozum: [`Küçükten büyüğe sırala: ${s.join(", ")}`, `n = ${n} → (n + 1) / 2 = ${tr((n + 1) / 2)}. sıra`, n % 2 ? `Medyan = ${m}` : `${tr(n / 2)}. ve ${tr(n / 2 + 1)}. değerlerin ortalaması: (${s[n / 2 - 1]} + ${s[n / 2]}) / 2 = ${tr(m)}`],
      aciklama: n % 2 ? "Tek sayıda gözlemde medyan tam ortadaki değerdir." : "Çift sayıda gözlemde medyan ortadaki iki değerin ortalamasıdır.",
      celdirici: `${tr(sirasiz)} veriyi sıralamadan ortadakini almaktır; ${tr(topla(x) / n)} aritmetik ortalamadır.`, sayfa: "s. 32–33" });
  } });

  ekle({ id: "medyan-degisim", bolum: "b2", ad: "Medyandaki değişim", aciklama: "Bir değer eklenince medyan ne kadar değişir? (2025 vize S7)", formul: ["medyan"], uret() {
    const n = sec([5, 7, 9]); const x = kar(veri(n, 4, 30).map((v) => v * 10)); const once = medyanBul(x);
    const s = x.slice().sort((p, q) => p - q); const ek = R(s[Math.floor(n / 2)] / 10, s[Math.floor(n / 2) + 1] / 10 + 3) * 10;
    const y = x.concat([ek]); const sonra = medyanBul(y); const fark = sonra - once;
    if (fark === 0) return null;
    const metin = (d) => (d === 0 ? "Değişmemiştir" : `${tr(Math.abs(d))} ${d > 0 ? "artmıştır" : "azalmıştır"}`);
    const adaylar = [fark, -fark, 2 * fark, fark / 2, 0, fark + 10, -2 * fark];
    const out = [metin(fark)]; adaylar.slice(1).forEach((d) => { const m = metin(d); if (!out.includes(m) && out.length < 5) out.push(m); });
    while (out.length < 5) out.push(metin(fark + out.length * 5));
    return { secenekler: out, dogru: 0,
      soru: `Bir işletmede departmanlardaki çalışan sayıları şöyledir: ${x.join(", ")}. ${ek} çalışanlı yeni bir departman açılırsa medyan değeri nasıl değişir?`,
      cozum: [`Önce: ${s.join(", ")} → medyan ${tr(once)}`, `Sonra: ${y.slice().sort((p, q) => p - q).join(", ")} → n = ${n + 1}, ortadaki iki değerin ortalaması ${tr(sonra)}`, `Değişim: ${tr(sonra)} − ${tr(once)} = ${tr(fark)}`],
      aciklama: "Tek sayıdan çift sayıya geçince medyan ortadaki iki değerin ortalaması olur.", sayfa: "s. 32–33" };
  } });

  ekle({ id: "mod", bolum: "b2", ad: "Mod", aciklama: "En sık tekrar eden değer", uret() {
    const m = R(10, 60); const diger = kar(Array.from(new Set(veri(8, 5, 70))).filter((v) => v !== m)).slice(0, 4);
    const x = kar([m, m, m, diger[0], diger[0], diger[1], diger[2], diger[3]]);
    return Object.assign(siklar(m, [diger[0], medyanBul(x), topla(x) / x.length, Math.max(...x)]), {
      soru: `${x.join(", ")} veri setinin modu kaçtır?`, cozum: [`${m} üç kez, ${diger[0]} iki kez, diğerleri birer kez geçiyor.`, `Mod = ${m}`],
      aciklama: "Mod en fazla tekrar eden gözlem değeridir.", celdirici: `${diger[0]} ikinci en sık değerdir; ${tr(topla(x) / x.length)} ortalamadır.`, sayfa: "s. 33" });
  } });

  ekle({ id: "iqr", bolum: "b2", ad: "Çeyrekler ve IQR", aciklama: "Kitabın (n+1)/4 yöntemiyle", formul: ["ceyrek"], uret() {
    const n = sec([5, 6, 7, 9, 11]); const s = Array.from(new Set(veri(n + 4, 1, 60))).slice(0, n).sort((p, q) => p - q);
    if (s.length < n) return null;
    const q1 = ceyrek(s, 1), q3 = ceyrek(s, 3), iqr = q3 - q1;
    const p1 = (n + 1) / 4, p3 = (3 * (n + 1)) / 4;
    const adim = (p, q) => { const t = Math.floor(p), o = p - t; return o ? `${tr(p)}. sıra: ${s[t - 1]} + ${tr(o)} × (${s[t]} − ${s[t - 1]}) = ${tr(q)}` : `${p}. sıra: ${tr(q)}`; };
    return Object.assign(siklar(iqr, [s[n - 1] - s[0], q3, s[Math.ceil(p3) - 1] - s[Math.floor(p1) - 1], s[Math.floor(p3) - 1] - s[Math.ceil(p1) - 1]], undefined, 0.5), {
      soru: `Küçükten büyüğe sıralanmış ${s.join(", ")} veri setinin çeyreklikler arası farkı (IQR) kaçtır?`,
      cozum: [`Q1 sırası = (${n} + 1) / 4 = ${tr(p1)} → ${adim(p1, q1)}`, `Q3 sırası = 3 × (${n} + 1) / 4 = ${tr(p3)} → ${adim(p3, q3)}`, `IQR = ${tr(q3)} − ${tr(q1)} = ${tr(iqr)}`],
      aciklama: "Sıra ondalıklıysa tam kısımdaki değere ondalık kadar fark eklenir.", celdirici: `${s[n - 1] - s[0]} aralıktır (maks − min), IQR değil.`, sayfa: "s. 35–36" });
  } });

  ekle({ id: "oms", bolum: "b2", ad: "Ortalama mutlak sapma", formul: ["oms"], aciklama: "|xᵢ − x̄| ortalaması", uret() {
    const n = 5; let x; do { x = veri(n, 1, 25); } while (topla(x) % n);
    const o = topla(x) / n; const sap = x.map((v) => Math.abs(v - o)); const oms = topla(sap) / n;
    const v = topla(x.map((t) => (t - o) ** 2)) / (n - 1);
    return Object.assign(siklar(oms, [topla(sap), topla(sap) / (n - 1), Math.sqrt(v), o], undefined, 0.4), {
      soru: `${x.join(", ")} veri setinin ortalama mutlak sapması kaçtır?`,
      cozum: [`x̄ = ${topla(x)} / ${n} = ${tr(o)}`, `Mutlak farklar: ${sap.map((t) => tr(t)).join(", ")} → toplam ${tr(topla(sap))}`, `OMS = ${tr(topla(sap))} / ${n} = ${tr(oms)}`],
      aciklama: "Farkların işaretini at (mutlak değer), ortalamasını al.", celdirici: `${tr(topla(sap))} toplamdır, bölmeyi unutma; ${tr(Math.sqrt(v))} standart sapmadır.`, sayfa: "s. 37" });
  } });

  ekle({ id: "varyans", bolum: "b2", ad: "Örneklem varyansı", aciklama: "n − 1'e bölmeyi unutma", formul: ["varyans"], uret() {
    const n = R(4, 6); let x; do { x = veri(n, 1, 30); } while (topla(x) % n);
    const o = topla(x) / n; const kare = x.map((v) => (v - o) ** 2); const ss = topla(kare); const v = ss / (n - 1);
    return Object.assign(siklar(v, [ss / n, Math.sqrt(v), ss, topla(x.map((t) => Math.abs(t - o))) / n]), {
      soru: `Bir işletmedeki problemle ilgili örneklem veri seti ${x.join(", ")} ise veri setinin varyansı kaçtır?`,
      cozum: [`x̄ = ${topla(x)} / ${n} = ${tr(o)}`, `(xᵢ − x̄)²: ${kare.map((t) => tr(t)).join(" + ")} = ${tr(ss)}`, `s² = ${tr(ss)} / (${n} − 1) = ${tr(v)}`],
      aciklama: "Örneklem varyansında farkların kareleri toplamı n − 1'e bölünür.", celdirici: `${tr(ss / n)} n'ye bölmektir (popülasyon formülü); ${tr(Math.sqrt(v))} standart sapmadır.`, sayfa: "s. 37–38" });
  } });

  ekle({ id: "olcek", bolum: "b2", ad: "Ölçek değişince standart sapma", aciklama: "Gözlemler bir sabitle çarpılırsa (2025 vize S14)", formul: ["ss"], uret() {
    const s0 = R(2, 12), V = s0 * s0, c = sec([2, 3, 5, 10, 100]); const s1 = s0 * c;
    return Object.assign(siklar(s1, [V * c, s0, V * c * c, s0 * c * c, V]), {
      soru: `İş analisti veri setindeki varyansı ${V} bulmuştur. Gözlem değerlerinin ${c} katına çıkarılması gerektiğini fark etmiştir. Buna göre veri setinin standart sapması kaçtır?`,
      cozum: [`Eski standart sapma = √${V} = ${s0}`, `Gözlemler × ${c} → standart sapma × ${c}`, `Yeni standart sapma = ${s0} × ${c} = ${s1}`],
      aciklama: `Ortalamadan farklar ${c} katına çıkar; kareler ${c * c} katına, karekök alınınca ${c} katı kalır.`, celdirici: `${V * c} varyansı ${c} ile çarpmaktır; önce karekök al.`, sayfa: "s. 37–38" });
  } });

  ekle({ id: "dk", bolum: "b2", ad: "Değişim katsayısı (öncüllü)", aciklama: "Ortalamaları farklı iki şirketi karşılaştır (2025 vize S8)", formul: ["dk"], uret() {
    let A, B, I, II, III;
    for (let d = 0; d < 100; d++) {
      A = { o: R(2, 12) * 5, s: R(1, 15) * 2 }; B = { o: R(2, 12) * 5, s: R(1, 25) * 2 };
      const da = A.s / A.o, db = B.s / B.o; I = da > db; II = db > 1; III = B.s ** 2 > A.s ** 2;
      if ((I || II || III) && da !== db && A.o !== B.o) break;
    }
    const da = A.s / A.o, db = B.s / B.o;
    return Object.assign(oncullu([I, II, III]), {
      onculler: ["A şirketinin değişim katsayısı, B şirketinin değişim katsayısından daha büyüktür.", "B şirketinin değişim katsayısı 1'den büyüktür.", "B şirketinin varyansı A şirketinin varyansından daha büyüktür."],
      kok: `A şirketinin ortalama ciro değişimi %${A.o}, standart sapması %${A.s}; B şirketinin ortalama ciro değişimi %${B.o}, standart sapması %${B.s} olarak verilmiştir. Yukarıdaki ifadelerden hangisi ya da hangileri doğrudur?`,
      cozum: [`DK_A = ${A.s} / ${A.o} = ${tr(da)}; DK_B = ${B.s} / ${B.o} = ${tr(db)} → I ${I ? "doğru" : "yanlış"}, II ${II ? "doğru" : "yanlış"}`, `Varyans: A = ${A.s}² = ${A.s ** 2}, B = ${B.s}² = ${B.s ** 2} → III ${III ? "doğru" : "yanlış"}`],
      aciklama: "DK = standart sapma / ortalama; varyans = standart sapmanın karesi.", sayfa: "s. 37–40" });
  } });

  ekle({ id: "goreli", bolum: "b2", ad: "Göreli frekans", aciklama: "Kalitatif veride sayıp yüzde bul (2025 vize S16)", formul: ["goreli"], uret() {
    const harfler = ["A", "B", "C", "D"]; const n = sec([20, 25, 40, 50]);
    const x = Array.from({ length: n }, () => sec(harfler)); const h = sec(harfler); const f = x.filter((v) => v === h).length;
    if (!f) return null; const g = (f / n) * 100;
    return Object.assign(siklar(g, [f, 25, (f / (n - f)) * 100, 100 - g], (v) => tr(v, 1), 5), {
      soru: `İşletmede üretilen dört markanın satış verisi (${x.join(", ")}) şeklindedir. Buna göre ${h} markasının göreli frekansı yüzde kaçtır?`,
      cozum: [`Toplam gözlem n = ${n}`, `${h} sayısı f = ${f}`, `(${f} / ${n}) × 100 = ${tr(g, 1)}`],
      aciklama: "Göreli frekans = (f / n) × 100.", celdirici: `${f} frekansın kendisidir; 25 ise dört markaya eşit bölünseydi çıkacak değer.`, sayfa: "s. 26–27" });
  } });

  ekle({ id: "kumulatif", bolum: "b2", ad: "Kümülatif göreli frekans", aciklama: "\"... yaşından küçükler yüzde kaç?\" (2025 vize S20)", uret() {
    const bas = sec([15, 18, 20]); const gen = 5; const k = 5; const f = Array.from({ length: k }, () => R(2, 12) * 250);
    const t = topla(f); const sinir = R(2, 4); const alt = topla(f.slice(0, sinir)); const sonuc = (alt / t) * 100;
    const ust = bas + sinir * gen;
    return Object.assign(siklar(sonuc, [(topla(f.slice(0, sinir + 1)) / t) * 100, (f[sinir - 1] / t) * 100, (topla(f.slice(0, sinir - 1)) / t) * 100, 100 - sonuc], (v) => tr(v, 1), 10), {
      tablo: { basliklar: ["Müşteri yaş grupları", "Satış adedi"], satirlar: f.map((v, i) => [`${bas + i * gen} - ${bas + (i + 1) * gen}`, v.toLocaleString("tr-TR")]) }, tabloOnce: true,
      soru: `Yukarıdaki tabloya göre ${ust} yaşından küçük müşteriler, satış yapılan müşterilerin yüzde kaçıdır?`,
      cozum: [`Toplam = ${t.toLocaleString("tr-TR")}`, `${ust} yaşından küçük: ${f.slice(0, sinir).map((v) => v.toLocaleString("tr-TR")).join(" + ")} = ${alt.toLocaleString("tr-TR")}`, `${alt.toLocaleString("tr-TR")} / ${t.toLocaleString("tr-TR")} × 100 = ${tr(sonuc, 1)}`],
      aciklama: "Üst sınırı istenen yaş olan sınıfa kadar (o dahil) topla: bu, kümülatif göreli frekanstır.", sayfa: "s. 23, 29" });
  } });

  ekle({ id: "agirlik", bolum: "b2", ad: "Ağırlıklı ortalama", aciklama: "Risk puanı (2025 vize S12)", formul: ["agirlik"], uret() {
    let w; do { w = [R(1, 7), R(1, 7), R(1, 7)].map((v) => v * 5); w.push(100 - topla(w)); } while (w[3] < 5);
    const p = w.map(() => R(2, 18) * 5); const sonuc = topla(w.map((v, i) => (v / 100) * p[i]));
    return Object.assign(siklar(sonuc, [topla(p) / 4, topla(w.map((v, i) => (v / 100) * p[3 - i])), sonuc + 2, sonuc - 1.5], (v) => tr(v, 2), 1), {
      soru: `İş analisti bir işin riskini A, B, C, D kriterleriyle ölçmektedir. Ağırlıklar sırasıyla şöyledir: %${w.join(", %")}. İş A'dan ${p[0]}, B'den ${p[1]}, C'den ${p[2]} ve D'den ${p[3]} puan aldıysa risk puanı kaçtır?`,
      cozum: [...w.map((v, i) => `${tr(v / 100)} × ${p[i]} = ${tr((v / 100) * p[i])}`), `Toplam = ${tr(sonuc)}`],
      aciklama: "Her puan kendi ağırlığıyla çarpılıp toplanır.", celdirici: `${tr(topla(p) / 4)} ağırlıksız ortalamadır.`, sayfa: "s. 32" });
  } });

  ekle({ id: "sinif", bolum: "b2", ad: "Sınıf sayısı ve aralığı", aciklama: "2ᵏ > n kuralı", formul: ["sinif"], uret() {
    const n = sec([20, 30, 40, 50, 60, 80, 100, 120, 150, 200, 250, 300, 500]); let k = 1; while (2 ** k <= n) k++;
    const mn = R(1, 30), mx = mn + R(4, 30) * k; const ar = (mx - mn) / k;
    const b = (kk) => `${kk} sınıf; ${tr((mx - mn) / kk)}`;
    const out = [b(k), b(k - 1), b(k + 1), `${k} sınıf; ${tr((mx - mn) / (k - 1))}`, `${n} sınıf; ${tr((mx - mn) / n)}`];
    return { secenekler: Array.from(new Set(out)).slice(0, 5).concat(out.length > new Set(out).size ? [b(k + 2)] : []).slice(0, 5), dogru: 0,
      soru: `En küçük değeri ${mn}, en büyük değeri ${mx} olan ${n} gözlemlik veri seti sınıflandırılacaktır. En az sınıf sayısı ve yaklaşık sınıf aralığı hangisidir?`,
      cozum: [`2^${k - 1} = ${2 ** (k - 1)} ≤ ${n}, 2^${k} = ${2 ** k} > ${n} → k = ${k}`, `Sınıf aralığı = (${mx} − ${mn}) / ${k} = ${tr(ar)}`],
      aciklama: "2ᵏ > n'yi sağlayan en küçük k; sınıf aralığı = (maks − min) / k.", celdirici: `${k - 1} sınıf: 2^${k - 1} = ${2 ** (k - 1)} gözlem sayısını geçmiyor.`, sayfa: "s. 27" };
  } });

  ekle({ id: "carpik", bolum: "b2", ad: "Dağılımın biçimi", aciklama: "Ortalama, medyan ve moddan çarpıklık", uret() {
    const tur = sec(["sag", "sol", "normal"]); const m = R(20, 60);
    const [ort, med, mod] = tur === "normal" ? [m, m, m] : tur === "sag" ? [m + R(6, 12), m + R(2, 5), m] : [m, m + R(2, 5), m + R(6, 12)];
    const ad = { sag: "Sağa çarpık", sol: "Sola çarpık", normal: "Normal dağılım" };
    return { secenekler: [ad[tur], ...["Sağa çarpık", "Sola çarpık", "Normal dağılım", "Yorum yapılamaz", "Düzgün dağılım"].filter((x) => x !== ad[tur]).slice(0, 4)], dogru: 0,
      soru: `Bir veri setinde aritmetik ortalama ${ort}, medyan ${med} ve mod ${mod} bulunmuştur. Veri dağılımı için ne söylenebilir?`,
      cozum: [tur === "normal" ? "Mod = medyan = ortalama → normal dağılım" : tur === "sag" ? `Mod (${mod}) < medyan (${med}) < ortalama (${ort}) → sağa çarpık` : `Ortalama (${ort}) < medyan (${med}) < mod (${mod}) → sola çarpık`],
      aciklama: "Ortalama en büyükse sağa, en küçükse sola çarpık.", sayfa: "s. 34–35" };
  } });

  // =================== BÖLÜM 3 ===================
  ekle({ id: "r", bolum: "b3", ad: "Korelasyon katsayısı", aciklama: "r = SSXY / √(SSX·SSY) (2025 vize S17)", formul: ["r"], uret() {
    const p = sec([20, 30, 40, 60, 80, 90, 100, 120]); const bolen = [];
    for (let i = 2; i * i <= p * p; i++) if ((p * p) % i === 0 && i <= p && i * 4 >= p) bolen.push(i);
    const ssx = sec(bolen), ssy = (p * p) / ssx; const r = sec([-0.9, -0.75, -0.6, -0.5, -0.4, -0.3, -0.2, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.75, 0.8, 0.9]);
    const ssxy = yuv(r * p, 2);
    return Object.assign(siklar(r, [ssxy / ssx, ssxy / ssy, -r, ssxy / (ssx + ssy)], (v) => tr(v, 2), 0.1), {
      soru: `X ve Y değişkenleri için SSX = ${tr(ssx)}, SSY = ${tr(ssy)} ve SSXY = ${tr(ssxy)} bulunmuştur. X ile Y arasındaki korelasyon katsayısı kaçtır?`,
      cozum: [`SSX × SSY = ${tr(ssx)} × ${tr(ssy)} = ${tr(p * p)}`, `√${tr(p * p)} = ${p}`, `r = ${tr(ssxy)} / ${p} = ${tr(r)}`],
      aciklama: "Paydada iki kareler toplamının çarpımının karekökü vardır.", celdirici: `${tr(ssxy / ssx)} yalnızca SSX'e bölmektir (bu β₁ hesabı).`, sayfa: "s. 51" });
  } });

  ekle({ id: "b1", bolum: "b3", ad: "Eğim β₁", aciklama: "β₁ = SSXY / SSX", formul: ["b1"], uret() {
    const ssx = R(2, 40) * 5; const b = sec([0.25, 0.4, 0.5, 0.6, 0.75, 0.8, 1.2, 1.5, 2, 2.5, 3, -0.5, -1.5]); const ssxy = ssx * b; const ssy = R(ssx / 5, ssx * 2) * 5;
    return Object.assign(siklar(b, [ssx / ssxy, ssxy / ssy, ssxy * ssx / 100, -b], (v) => tr(v, 2), 0.1), {
      soru: `Basit regresyon modelinde SSXY = ${tr(ssxy)}, bağımsız değişkenin kareler toplamı SSX = ${ssx} ve bağımlı değişkenin kareler toplamı SSY = ${ssy} olarak bulunmuştur. β₁ parametresi kaçtır?`,
      cozum: [`β₁ = SSXY / SSX`, `= ${tr(ssxy)} / ${ssx} = ${tr(b)}`], aciklama: "β₁ için yalnızca bağımsız değişkenin kareler toplamına bölünür; SSY kullanılmaz.",
      celdirici: `${tr(ssx / ssxy)} oranı ters kurmaktır; ${tr(ssxy / ssy)} bağımlı değişkenin kareler toplamına bölmektir.`, sayfa: "s. 56" });
  } });

  ekle({ id: "b0", bolum: "b3", ad: "Kesişim ve ortalama", aciklama: "Ȳ = β₀ + β₁X̄ (2025 vize S4)", formul: ["b0"], uret() {
    const b1 = sec([0.5, 1, 1.5, 2, 2.5, 3, 0.25]); const xb = R(2, 20) * 5; const b0 = R(1, 20) * 5; const yb = b0 + b1 * xb;
    if (Math.random() < 0.5) return Object.assign(siklar(yb, [b1 * xb, b0 * xb * b1, b0 + xb, yb - b0 * 2 > 0 ? b1 * xb - b0 : yb + b0]), {
      soru: `Basit regresyon modelinde bağımsız değişkenin ortalaması ${xb}, parametresi ${tr(b1)} ve kesişim değeri ${b0} ise bağımlı değişkenin ortalama değeri kaçtır?`,
      cozum: [`Ȳ = β₀ + β₁ × X̄`, `= ${b0} + ${tr(b1)} × ${xb} = ${b0} + ${tr(b1 * xb)} = ${tr(yb)}`], aciklama: "Regresyon doğrusu ortalamalardan geçer.",
      celdirici: `${tr(b1 * xb)} kesişimi eklemeyi unutmaktır.`, sayfa: "s. 56" });
    return Object.assign(siklar(b0, [yb + b1 * xb, b1 * xb, yb / b1, yb - b1]), {
      soru: `Basit regresyon modelinde bağımlı değişkenin ortalaması ${tr(yb)}, bağımsız değişkenin ortalaması ${xb} ve β₁ = ${tr(b1)} ise β₀ kaçtır?`,
      cozum: [`β₀ = Ȳ − β₁ × X̄`, `= ${tr(yb)} − ${tr(b1)} × ${xb} = ${tr(yb)} − ${tr(b1 * xb)} = ${b0}`], aciklama: "β₀ = Ȳ − β₁X̄.",
      celdirici: `${tr(yb + b1 * xb)} çarpımı çıkarmak yerine eklemektir.`, sayfa: "s. 56" });
  } });

  ekle({ id: "tahmin", bolum: "b3", ad: "Modelden tahmin", aciklama: "Değerleri modele yerleştir (2025 vize S13, S19)", formul: ["tahmin"], uret() {
    const b0 = sec([0, R(1, 12) * 5, R(10, 60)]); const b1 = sec([R(2, 20), R(2, 20) * 5, R(5, 30) / 4]); const b2 = sec([R(2, 20), R(2, 20) * 5, R(-8, -1), R(5, 30) / 10]);
    const x1 = R(1, 12), x2 = R(1, 12); const y = b0 + b1 * x1 + b2 * x2;
    const model = `${b0 ? tr(b0) + " + " : ""}${tr(b1)} X1 ${b2 < 0 ? "− " + tr(-b2) : "+ " + tr(b2)} X2`;
    return Object.assign(siklar(y, [b1 * x1 + b2 * x2, b0 + b1 * x2 + b2 * x1, b0 + b1 * x1 - b2 * x2, b0 + b1 * x1, b0 + (b1 + b2) * x1].filter((v) => Math.abs(v - y) > 1e-9), (v) => tr(v, 2), 5), {
      soru: `İş analistinin geliştirdiği tahmin uygulamasının modeli şudur: Ŷ = ${model}. İlgili personel birinci değişkene ${x1}, ikinci değişkene ${x2} değerini girerse sonuç ne olur?`,
      cozum: [b0 ? `Kesişim: ${tr(b0)}` : "Kesişim yok", `${tr(b1)} × ${x1} = ${tr(b1 * x1)}`, `${tr(b2)} × ${x2} = ${tr(b2 * x2)}`, `Ŷ = ${tr(y)}`],
      aciklama: "Her katsayıyı kendi değişkeniyle çarp, kesişimi ekle; eksi işaretli katsayıya dikkat.", celdirici: b0 ? `${tr(b1 * x1 + b2 * x2)} kesişimi (${tr(b0)}) eklemeyi unutmaktır.` : "Değişkenleri yer değiştirmek farklı sonuç verir.", sayfa: "s. 57, 60" });
  } });

  ekle({ id: "hata", bolum: "b3", ad: "Hata terimi", aciklama: "ε = Y − Ŷ", formul: ["hata"], uret() {
    const b0 = yuv(R(3000, 7000) / 100, 2), b1 = yuv(R(50, 300) / 100, 2); const x = R(3, 20); const yh = b0 + b1 * x; const Y = Math.round(yh + R(-15, 15));
    const e = Y - yh; if (Math.abs(e) < 0.05) return null;
    return Object.assign(siklar(e, [-e, yh, Y + yh, Y - b0], (v) => tr(v, 2), 1), {
      soru: `Ŷ = ${tr(b0)} + ${tr(b1)}X modelinde X = ${x} olan gözlemin gerçek değeri Y = ${Y} olarak gözlenmiştir. Bu gözlemin hata terimi kaçtır?`,
      cozum: [`Ŷ = ${tr(b0)} + ${tr(b1)} × ${x} = ${tr(yh)}`, `ε = Y − Ŷ = ${Y} − ${tr(yh)} = ${tr(e)}`],
      aciklama: "Hata terimi gözlenen eksi tahmin edilendir.", celdirici: `${tr(-e)} çıkarmayı ters yapmaktır (Ŷ − Y).`, sayfa: "s. 57" });
  } });

  ekle({ id: "r2", bolum: "b3", ad: "Açıklama gücü R²", aciklama: "SSR / SST", formul: ["r2"], uret() {
    const sst = R(10, 200) * 10; const r2 = R(20, 95) / 100; const ssr = yuv(sst * r2, 2); const sse = yuv(sst - ssr, 2);
    const verilen = sec(["sse", "ssr"]);
    return Object.assign(siklar(r2, [1 - r2, ssr / sse, sse / ssr, r2 * r2], (v) => tr(v, 2), 0.05), {
      tablo: { basliklar: ["", "SS"], satirlar: verilen === "ssr" ? [["Regresyon", tr(ssr)], ["Fark (hata)", tr(sse)], ["Toplam", tr(sst)]] : [["Fark (hata)", tr(sse)], ["Toplam", tr(sst)]] }, tabloOnce: true,
      soru: "Yukarıdaki ANOVA tablosuna göre modelin açıklama gücü (R²) kaçtır?",
      cozum: [verilen === "ssr" ? `SSR = ${tr(ssr)}` : `SSR = SST − SSE = ${tr(sst)} − ${tr(sse)} = ${tr(ssr)}`, `R² = SSR / SST = ${tr(ssr)} / ${tr(sst)} = ${tr(r2)}`],
      aciklama: "R² = SSR / SST = 1 − SSE / SST.", celdirici: `${tr(1 - r2)} SSE / SST'dir; açıklanamayan kısım.`, sayfa: "s. 58" });
  } });

  ekle({ id: "pdeger", bolum: "b3", ad: "Regresyon tablosu yorumu (öncüllü)", aciklama: "P-değeri ve tahmin (2025 vize S19)", formul: ["p", "tahmin"], uret() {
    const p = () => sec([0.001, 0.005, 0.01, 0.02, 0.03, 0.04, 0.06, 0.08, 0.12, 0.2, 0.35]);
    const k = { b0: R(2, 20), a: R(2, 30) / 4, b: R(2, 30) / 4, pb0: p(), pa: p(), pb: p() };
    const xa = R(2, 10), xb = R(2, 10); const dogruY = k.b0 + k.a * xa + k.b * xb; const ikinciDogru = Math.random() < 0.4; const iddia = ikinciDogru ? dogruY : k.a * xa + k.b * xb;
    const degisken = sec(["a", "b"]); const I = (degisken === "a" ? k.pa : k.pb) < 0.05; const III = k.pb0 >= 0.05;
    const dm = [I, ikinciDogru, III]; if (!dm.some(Boolean)) return null;
    return Object.assign(oncullu(dm), {
      tablo: { basliklar: ["", "Katsayılar", "P-değeri"], satirlar: [["Kesişim", tr(k.b0), tr(k.pb0, 3)], ["A değişkeni", tr(k.a), tr(k.pa, 3)], ["B değişkeni", tr(k.b), tr(k.pb, 3)]] }, tabloOnce: true,
      soru: "Yukarıda iş analistinin geliştirdiği regresyon modelinin sonuç tablosu gösterilmiştir. Buna göre;",
      onculler: [`${degisken.toUpperCase()} değişkeni katsayısı %5 anlamlılık düzeyinde sıfırdan farklıdır.`, `A değişkeni ${xa}, B değişkeni ${xb} değerini aldığında regresyon modelinin sonucu ${tr(iddia)} olur.`, "Kesişim değerinin %5 anlamlılık düzeyinde sıfırdan farklı olduğuna dair kanıt yoktur."],
      kok: "Yukarıdaki ifadelerden hangisi ya da hangileri doğrudur?",
      cozum: [`I: ${degisken.toUpperCase()} değişkeninin P-değeri ${tr(degisken === "a" ? k.pa : k.pb, 3)} ${I ? "< 0,05 → doğru" : "≥ 0,05 → yanlış"}`,
        `II: ${tr(k.b0)} + ${tr(k.a)} × ${xa} + ${tr(k.b)} × ${xb} = ${tr(dogruY)} → ${ikinciDogru ? "doğru" : `${tr(iddia)} değil, yanlış (kesişim eklenmemiş)`}`,
        `III: kesişimin P-değeri ${tr(k.pb0, 3)} ${III ? "≥ 0,05 → sıfırdan farklı olduğuna dair kanıt yok, doğru" : "< 0,05 → sıfırdan farklı, ifade yanlış"}`],
      aciklama: "P-değeri < 0,05 → katsayı %5 düzeyinde sıfırdan farklı. Tahminde kesişimi eklemeyi unutma.", sayfa: "s. 58–61" });
  } });

  // =================== BÖLÜM 4 ===================
  const fakt = (n) => (n <= 1 ? 1 : n * fakt(n - 1));
  const kenarTablo = (E, birim) => ({ basliklar: ["Yol", "Düğümden", "Düğüme", birim], satirlar: E.map(([a, b, w], i) => [String(i + 1), String(a), String(b), tr(w)]) });
  // rassal bağlı şebeke: n düğüm, önce yayılan ağaç sonra ek kenarlar
  function sebeke(n, ek, wmin, wmax) {
    const E = []; const var_ = (a, b) => E.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
    for (let v = 2; v <= n; v++) { const u = R(Math.max(1, v - 2), v - 1); E.push([u, v, R(wmin, wmax)]); }
    let d = 0; while (E.length < n - 1 + ek && d++ < 100) { const a = R(1, n - 1), b = R(a + 1, n); if (!var_(a, b)) E.push([a, b, R(wmin, wmax)]); }
    return E.sort((p, q) => p[0] - q[0] || p[1] - q[1]);
  }
  function dijkstra(n, E, s) {
    const d = Array(n + 1).fill(Infinity), on = Array(n + 1).fill(0), kal = new Set(); d[s] = 0;
    while (kal.size < n) { let u = -1; for (let v = 1; v <= n; v++) if (!kal.has(v) && (u < 0 || d[v] < d[u])) u = v; kal.add(u);
      E.forEach(([a, b, w]) => { [[a, b], [b, a]].forEach(([x, y]) => { if (x === u && d[u] + w < d[y]) { d[y] = d[u] + w; on[y] = u; } }); }); }
    return { d, on };
  }
  function prim(n, E) { // ağaç toplamı ve seçilen kenarlar (kitaptaki gibi başlangıçtan büyüyerek)
    const S = new Set([1]); const sec_ = [];
    while (S.size < n) { let en = null; E.forEach((e) => { const [a, b, w] = e; if (S.has(a) !== S.has(b) && (!en || w < en[2])) en = e; }); sec_.push(en); S.add(en[0]); S.add(en[1]); }
    return sec_;
  }

  ekle({ id: "gs-dongu", bolum: "b4", ad: "Gezgin satıcı: döngü sayısı", aciklama: "(m − 1)!", formul: ["dongu"], uret() {
    const s = R(3, 7), m = s + 1, dg = fakt(m - 1);
    return Object.assign(siklar(dg, [fakt(m), fakt(m - 2), m * (m - 1), (m - 1) * (m - 2), m * m], (x) => tr(x, 0), 1), {
      soru: `Bir kurye merkezden çıkıp ${s} müşteriye birer kez uğrayarak merkeze dönecektir. Merkez dahil düğüm sayısına göre olası bütün döngülerin sayısı kaçtır?`,
      cozum: [`m = ${s} müşteri + 1 merkez = ${m}`, `(m − 1)! = ${m - 1}!`, `${Array.from({ length: m - 1 }, (_, i) => m - 1 - i).join(" × ")} = ${tr(dg, 0)}`],
      aciklama: "Merkezi de say, bir eksiğinin faktöriyelini al.", celdirici: `${tr(fakt(m), 0)} = ${m}! (bir eksiltmeyi unutmak), ${tr(fakt(m - 2), 0)} merkezi saymamak.`, sayfa: "B4 s. 9" });
  } });

  ekle({ id: "gs", bolum: "b4", ad: "Gezgin satıcı: en kısa döngü", aciklama: "Bütün döngüleri yaz, en kısayı seç", formul: ["dongu"], uret() {
    const Y = ["M", "Ş1", "Ş2", "Ş3"]; const D = Y.map((_, i) => Y.map((_, j) => (i === j ? 0 : R(4, 20) / 10)));
    const perm = [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]];
    const uz = perm.map((p) => yuv(D[0][p[0]] + D[p[0]][p[1]] + D[p[1]][p[2]] + D[p[2]][0], 2));
    const en = Math.min(...uz); if (uz.filter((x) => x === en).length > 1) return null;
    const p = perm[uz.indexOf(en)]; const ad = (q) => ["M", ...q.map((i) => Y[i]), "M"].join("–");
    const ters = [...p].reverse(); const uzTers = uz[perm.findIndex((q) => q.join() === ters.join())];
    const enUzun = Math.max(...uz);
    return Object.assign(siklar(en, [uzTers, enUzun, ...uz], (x) => tr(x), 0.1), {
      tablo: { basliklar: ["Nereden \\ Nereye", ...Y], satirlar: Y.map((y, i) => [y, ...Y.map((_, j) => (i === j ? "-" : tr(D[i][j])))]) }, tabloOnce: true,
      soru: "Yukarıdaki tabloda merkez (M) ile üç şube arasındaki mesafeler (km) verilmiştir; gidiş ve dönüş mesafeleri farklı olabilir. Merkezden çıkıp her şubeye bir kez uğrayarak merkeze dönen en kısa döngü kaç km'dir?",
      cozum: [...perm.map((q, i) => `${ad(q)} = ${tr(uz[i])}`), `En kısa: ${ad(p)} = ${tr(en)} km`],
      aciklama: "4 düğüm → (4 − 1)! = 6 döngü. Her bağlantıyı satırdan (nereden) okuyup sütuna (nereye) git.", celdirici: `${tr(uzTers)} aynı döngünün ters yönü (${ad(ters)}); tablo simetrik olmadığı için farklıdır.`, sayfa: "B4 s. 8–10" });
  } });

  ekle({ id: "enkisa", bolum: "b4", ad: "En kısa yol", aciklama: "Kalıcı küme yöntemiyle 1'den son düğüme", formul: ["enkisa"], uret() {
    const n = R(5, 6), E = sebeke(n, R(2, 4), 2, 15); const { d, on } = dijkstra(n, E, 1);
    const yol = [n]; while (yol[0] !== 1) yol.unshift(on[yol[0]]);
    // açgözlü: her adımda en kısa bağlantıya git
    let u = 1, ac = 0; const gez = new Set([1]); while (u !== n) { const k = E.filter(([a, b]) => (a === u && !gez.has(b)) || (b === u && !gez.has(a))); if (!k.length) { ac = NaN; break; } const e = k.reduce((x, y) => (y[2] < x[2] ? y : x)); u = e[0] === u ? e[1] : e[0]; gez.add(u); ac += e[2]; }
    const dogrudan = E.find(([a, b]) => a === 1 && b === n);
    const agacT = topla(prim(n, E).map((e) => e[2]));
    return Object.assign(siklar(d[n], [ac, dogrudan ? dogrudan[2] : NaN, agacT, d[n - 1], d[n] + 2], (x) => tr(x, 0), 1), {
      tablo: kenarTablo(E, "Mesafe (km)"), tabloOnce: true,
      soru: `Yukarıdaki tabloda bir şebekedeki iki yönlü yollar ve uzunlukları verilmiştir. 1 nolu düğümden ${n} nolu düğüme en kısa yol kaç km'dir?`,
      cozum: [...Array.from({ length: n - 1 }, (_, i) => `1 → ${i + 2}: ${tr(d[i + 2], 0)}`), `Yol: ${yol.join("–")} = ${tr(d[n], 0)} km`],
      aciklama: "Kalıcı kümeye her adımda başlangıçtan toplam uzaklığı en küçük düğüm girer.",
      celdirici: `${Number.isFinite(ac) ? tr(ac, 0) + " her adımda en kısa bağlantıya gitmekle (açgözlü) çıkar; " : ""}${tr(agacT, 0)} en kısa yol ağacının toplamıdır.`, sayfa: "B4 s. 13–20" });
  } });

  ekle({ id: "agac", bolum: "b4", ad: "En kısa yol ağacı", aciklama: "Bütün düğümleri en az toplamla bağla", formul: ["agac"], uret() {
    const n = R(5, 6), E = sebeke(n, R(2, 4), 2, 15); const S = prim(n, E); const t = topla(S.map((e) => e[2]));
    const { d } = dijkstra(n, E, 1); const kalan = E.filter((e) => !S.includes(e)).map((e) => e[2]);
    const enKucukKalan = kalan.length ? Math.min(...kalan) : NaN;
    return Object.assign(siklar(t, [t + enKucukKalan, d[n], topla(d.slice(1)), t - Math.min(...S.map((e) => e[2]))], (x) => tr(x, 0), 1), {
      tablo: kenarTablo(E, "Kablo (km)"), tabloOnce: true,
      soru: "Yukarıdaki tabloda düğümler arasına döşenebilecek kablo hatları verilmiştir. Bütün düğümleri birbirine bağlamak için en kısa yol ağacı modeline göre en az kaç km kablo gerekir?",
      cozum: [...S.map((e) => `${e[0]}–${e[1]}: ${e[2]}`), `${n} düğüm → ${n - 1} bağlantı; toplam = ${S.map((e) => e[2]).join(" + ")} = ${tr(t, 0)}`],
      aciklama: "Seçili düğümlere bağlı, seçilmemiş düğümlerden bağlantısı en kısa olanı ekle; döngü kuran bağlantıyı alma.",
      celdirici: `${tr(t + enKucukKalan, 0)} döngü oluşturan bir bağlantıyı da almakla, ${tr(d[n], 0)} yalnızca 1'den ${n}'e en kısa yolla çıkar.`, sayfa: "B4 s. 21–28" });
  } });

  ekle({ id: "akis", bolum: "b4", ad: "Maksimum akış", aciklama: "Yolları bul, en küçük kapasite kadar gönder", formul: ["akis"], uret() {
    const k = (a, b) => R(a, b) * 100;
    const C = { "A-B": k(4, 15), "A-C": k(4, 15), "B-C": k(1, 5), "B-D": k(3, 12), "C-D": k(3, 12) };
    // A→B→D, A→C→D, A→B→C→D, A→C→B→D yollarıyla Edmonds-Karp yerine küçük şebekede doğrudan kesim hesabı
    const kesim = Math.min(C["A-B"] + C["A-C"], C["B-D"] + C["C-D"], C["A-B"] + C["C-D"], C["A-C"] + C["B-D"] + C["B-C"]);
    const yol2 = Math.min(C["A-B"], C["B-D"]) + Math.min(C["A-C"], C["C-D"]);
    if (kesim === yol2) return null; // B–C bağlantısı işe yaramalı
    const enKucuk = Math.min(...Object.values(C));
    return Object.assign(siklar(kesim, [yol2, C["A-B"] + C["A-C"], C["B-D"] + C["C-D"], enKucuk, Math.min(C["A-B"], C["B-D"])], (x) => tr(x, 0), 100), {
      tablo: { basliklar: ["Bağlantı", "Akış kapasitesi (birim)"], satirlar: Object.entries(C).map(([e, c]) => [e.replace("-", " → "), tr(c, 0)]) }, tabloOnce: true,
      soru: "Yukarıdaki tabloda bir boru hattı şebekesinin tek yönlü bağlantıları ve kapasiteleri verilmiştir. A noktasından D noktasına gönderilebilecek maksimum akış kaç birimdir? (B → C bağlantısı yalnızca B'den C'ye akış taşır.)",
      cozum: (() => { const c = { ...C }; const s = []; const gonder = (ad, yol) => { const m = Math.min(...yol.map((e) => c[e])); if (m > 0) { yol.forEach((e) => (c[e] -= m)); s.push(`${ad}: min = ${tr(m, 0)}`); } return m; };
        let t = gonder("A–B–D", ["A-B", "B-D"]) + gonder("A–C–D", ["A-C", "C-D"]) + gonder("A–B–C–D", ["A-B", "B-C", "C-D"]);
        s.push(`Hedefe akış sağlayan yol kalmadı → maksimum akış = ${tr(t, 0)}`); return t === kesim ? s : null; })(),
      aciklama: "Her yoldan o yoldaki en küçük kapasite kadar gönder, kapasitelerden düş; yol kalmayınca akışları topla.",
      celdirici: `${tr(yol2, 0)} B → C bağlantısını kullanmamakla, ${tr(C["A-B"] + C["A-C"], 0)} yalnızca A'dan çıkan kapasiteleri toplamakla çıkar.`, sayfa: "B4 s. 29–38" });
  } });

  // =================== BÖLÜM 5 ===================
  function proje() { // 5–6 faaliyet, rassal öncüller, CPM hesabı
    const n = R(5, 6), H = "ABCDEF".slice(0, n).split(""); const F = [];
    H.forEach((h, i) => { let on = []; if (i >= 2 || (i === 1 && Math.random() < 0.4)) { const ad = H.slice(0, i); on = kar(ad).slice(0, R(1, Math.min(2, ad.length))).sort(); } F.push({ h, on, t: R(2, 9) }); });
    // her faaliyetin ardılı olsun (son hariç tek bitiş sorun değil)
    F.forEach((f) => { f.es = Math.max(0, ...f.on.map((o) => F.find((x) => x.h === o).ef)); f.ef = f.es + f.t; });
    const T_ = Math.max(...F.map((f) => f.ef));
    [...F].reverse().forEach((f) => { const ard = F.filter((x) => x.on.includes(f.h)); f.ard = ard.map((x) => x.h); f.lf = ard.length ? Math.min(...ard.map((x) => x.ls)) : T_; f.ls = f.lf - f.t; f.s = f.ls - f.es; });
    return { F, T: T_, tablo: { basliklar: ["Faaliyet", "Öncül", "Süre (hafta)"], satirlar: F.map((f) => [f.h, f.on.join(", ") || "-", String(f.t)]) } };
  }
  const esSatir = (F) => F.map((f) => `${f.h}: ES = ${f.on.length ? `maks (${f.on.map((o) => F.find((x) => x.h === o).ef).join(", ")}) = ${f.es}` : "0"}, EF = ${f.ef}`);

  ekle({ id: "cpm-sure", bolum: "b5", ad: "Projenin tamamlanma süresi", aciklama: "ES = maks (öncül EF), EF = ES + süre", formul: ["es"], uret() {
    const P = proje(); const F = P.F; const top = topla(F.map((f) => f.t));
    // hata: öncüllerin en küçüğünü almak
    const k = {}; F.forEach((f) => { const es = f.on.length ? Math.min(...f.on.map((o) => k[o])) : 0; k[f.h] = es + f.t; });
    const hataMin = Math.max(...Object.values(k));
    return Object.assign(siklar(P.T, [hataMin, top, P.T - Math.min(...F.map((f) => f.t)), Math.max(...F.map((f) => f.t))], (x) => tr(x, 0), 1), {
      tablo: P.tablo, tabloOnce: true, soru: "Yukarıdaki tabloda bir projenin faaliyetleri, öncülleri ve süreleri verilmiştir. Kritik yol yöntemine (CPM) göre projenin beklenen tamamlanma süresi kaç haftadır?",
      cozum: [...esSatir(F), `Proje süresi = EF'lerin en büyüğü = ${P.T}`],
      aciklama: "Bütün öncüller bitmeden başlanamaz: ES öncüllerin EF'lerinin en büyüğüdür.", celdirici: `${tr(hataMin, 0)} öncüllerin en küçük EF'sini almakla, ${tr(top, 0)} bütün süreleri toplamakla çıkar.`, sayfa: "B5 s. 10–15" });
  } });

  ekle({ id: "cpm-bolluk", bolum: "b5", ad: "Bolluk zamanı", aciklama: "LF = min (ardıl LS), S = LS − ES", formul: ["lf", "bolluk"], uret() {
    const P = proje(); const F = P.F; const ad = F.filter((f) => f.s > 0); if (!ad.length) return null; const f = sec(ad);
    const lsMaks = f.ard.length ? Math.max(...f.ard.map((a) => F.find((x) => x.h === a).ls)) - f.t - f.es : NaN;
    return Object.assign(siklar(f.s, [0, lsMaks, f.lf - f.es, f.t, P.T - f.ef], (x) => tr(x, 0), 1), {
      tablo: P.tablo, tabloOnce: true, soru: `Yukarıdaki projede ${f.h} faaliyetinin bolluk zamanı kaç haftadır?`,
      cozum: [...esSatir(F), `Proje süresi = ${P.T}`, ...[...F].reverse().map((x) => `${x.h}: LF = ${x.ard.length ? `min (${x.ard.map((a) => F.find((y) => y.h === a).ls).join(", ")})` : "proje süresi"} = ${x.lf}, LS = ${x.ls}`), `S(${f.h}) = LS − ES = ${f.ls} − ${f.es} = ${f.s}`],
      aciklama: "İleri hesapla ES, geri hesapla LS bulunur; farkları bolluktur.", celdirici: `0 dersen faaliyeti kritik sanırsın${Number.isFinite(lsMaks) && lsMaks !== f.s ? `; ${tr(lsMaks, 0)} ardılların en büyük LS'sini almakla çıkar` : ""}.`, sayfa: "B5 s. 11, 15–18" });
  } });

  ekle({ id: "cpm-kritik", bolum: "b5", ad: "Kritik faaliyetler", aciklama: "Bolluğu 0 olanlar", formul: ["bolluk"], uret() {
    const P = proje(); const F = P.F; const kr = F.filter((f) => f.s === 0).map((f) => f.h).join(", ");
    const sec_ = new Set([kr]); let d = 0;
    while (sec_.size < 5 && d++ < 100) { const alt = kar(F.map((f) => f.h)).slice(0, R(2, F.length - 1)).sort().join(", "); sec_.add(alt); }
    if (sec_.size < 5) return null;
    return { secenekler: [...sec_], dogru: 0, tablo: P.tablo, tabloOnce: true,
      soru: "Yukarıdaki projede kritik faaliyetler hangileridir?",
      cozum: [...F.map((f) => `${f.h}: ES ${f.es}, LS ${f.ls} → S = ${f.s}`), `Kritik (S = 0): ${kr}; proje süresi ${P.T}`],
      aciklama: "Kritik faaliyetlerin bolluğu yoktur; süreleri toplamı proje süresine eşittir.", sayfa: "B5 s. 11, 18–19" };
  } });

  ekle({ id: "pert-mu", bolum: "b5", ad: "PERT ortalama süre", aciklama: "μ = (a + 4m + b) / 6", formul: ["pert"], uret() {
    let a, m, b, mu; let d = 0; do { a = R(2, 10); m = a + R(1, 8); b = m + R(1, 14); mu = (a + 4 * m + b) / 6; } while (!Number.isInteger(mu * 2) && d++ < 50);
    return Object.assign(siklar(mu, [(a + m + b) / 3, m, (a + 4 * m + b) / 3, (a + b) / 2], undefined, 0.5), {
      soru: `Bir faaliyetin iyimser koşullarda tamamlanma süresi ${a}, genellikle olan koşullarda ${m}, kötümser koşullarda ${b} haftadır. PERT'e göre faaliyetin ortalama (beklenen) süresi kaç haftadır?`,
      cozum: [`a + 4m + b = ${a} + ${4 * m} + ${b} = ${a + 4 * m + b}`, `μ = ${a + 4 * m + b} / 6 = ${tr(mu)}`],
      aciklama: "m 4 ile çarpılır, toplam 6'ya bölünür.", celdirici: `${tr((a + m + b) / 3)} basit ortalama, ${m} yalnız m'yi almaktır.`, sayfa: "B5 s. 21" });
  } });

  ekle({ id: "pert-var", bolum: "b5", ad: "PERT varyans / standart sapma", aciklama: "σ = (b − a) / 6", formul: ["pert"], uret() {
    const a = R(2, 12), k = R(1, 4), b = a + 6 * k, m = R(a + 1, b - 1); const varMi = Math.random() < 0.5; const s = k, v = k * k;
    const dogru = varMi ? v : s;
    return Object.assign(siklar(dogru, [varMi ? s : v, (b - a), (b - a) / 3, ((b - a) / 3) ** 2, m - a], (x) => tr(x), 1), {
      soru: `Bir faaliyetin iyimser süresi ${a}, genellikle olan süresi ${m}, kötümser süresi ${b} haftadır. PERT'e göre bu faaliyetin ${varMi ? "varyansı" : "standart sapması"} kaçtır?`,
      cozum: [`σ = (b − a) / 6 = (${b} − ${a}) / 6 = ${s}`, varMi ? `σ² = ${s}² = ${v}` : "Standart sapma soruluyor; kare alınmaz."],
      aciklama: "m bu hesaba girmez.", celdirici: varMi ? `${s} standart sapmadır, varyans için karesi alınır.` : `${v} varyanstır; standart sapma için kare alınmaz.`, sayfa: "B5 s. 21, 33" });
  } });

  ekle({ id: "pert-aralik", bolum: "b5", ad: "%95 güven aralığı", aciklama: "μp ± 1,96 σp", formul: ["aralik"], uret() {
    const n = R(3, 5); const k = Array.from({ length: n }, () => R(4, 16)); const s = sec([1, 1.5, 2, 2.5, 3, 4]); let vs; let d = 0;
    // kritik varyanslar toplamı s² olacak şekilde
    do { const v = s * s; const p = Array.from({ length: n - 1 }, () => yuv(Math.random() * v / n, 2)); vs = [...p, yuv(v - topla(p), 2)]; } while (vs.some((x) => x <= 0) && d++ < 50);
    const mu = topla(k), v = yuv(topla(vs), 2), sp = Math.sqrt(v);
    if (mu - 1.96 * v < 0) return null;
    const yaz_ = (lo, hi) => `${tr(lo)} ile ${tr(hi)}`;
    const ss = [yaz_(mu - 1.96 * sp, mu + 1.96 * sp), yaz_(mu - 1.96 * v, mu + 1.96 * v), yaz_(mu - sp, mu + sp), yaz_(mu - 1.96 * topla(vs.map(Math.sqrt)), mu + 1.96 * topla(vs.map(Math.sqrt))), yaz_(mu - 2 * 1.96 * sp, mu + 2 * 1.96 * sp)];
    if (new Set(ss).size < 5) return null;
    return { secenekler: ss, dogru: 0,
      tablo: { basliklar: ["Kritik faaliyet", "Ortalama süre (μ)", "Varyans (σ²)"], satirlar: k.map((x, i) => [String.fromCharCode(65 + i), String(x), tr(vs[i])]) }, tabloOnce: true,
      soru: "Yukarıda bir projenin kritik yolu üzerindeki faaliyetlerin PERT'e göre ortalama süreleri ve varyansları verilmiştir. Projenin %95 güven aralığında tamamlanma süresi aralığı hangisidir?",
      cozum: [`μp = ${k.join(" + ")} = ${mu}`, `σp² = ${vs.map((x) => tr(x)).join(" + ")} = ${tr(v)}`, `σp = √${tr(v)} = ${tr(sp)}`, `1,96 × ${tr(sp)} = ${tr(1.96 * sp)}`, `${mu} ± ${tr(1.96 * sp)} → ${ss[0]}`],
      aciklama: "Varyanslar toplanır, karekök alınır, 1,96 ile çarpılır.", celdirici: `${ss[1]} varyansı 1,96 ile çarpmakla, ${ss[3]} standart sapmaları toplamakla çıkar.`, sayfa: "B5 s. 22, 27–28" };
  } });

  window.ATOLYE = G;
})();
