/* ANKUZEF Defteri — ortak motor
   Ders sayfası: <body data-ders="isan"> ; ana sayfa: <body data-sayfa="ana">
   Veri: <kod>/ders.json, <kod>/bolumler/*.json, <kod>/sorular/*.json, isteğe bağlı <kod>/atolye.js (window.ATOLYE)
   İlerleme kişiye özel: localStorage "ankuzef:<profil>:<ders>:<anahtar>"
   Gezinme: soldaki tahta menü (telefonda ☰ ile açılır) + çalışma yolu:
   1 Konu çalış → 2 Çıkmış sorular → 3 Gözden Geçirelim → 4 Tahmini denemeler → 5 Deneme sınavı; yanında Tekrar ve Araçlar. */
(() => {
  "use strict";
  const GUN = 864e5;
  const ARALIK = [1, 3, 7, 14];          // gün: aralıklı tekrar kutuları
  const HARF = ["A", "B", "C", "D", "E", "F"];
  const HEDEF = 75;

  // ---------- yardımcılar ----------
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const kac = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const duz = (s) => String(s ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const karistir = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const simdi = () => Date.now();
  const yuzde = (d, t) => (t ? Math.round((d / t) * 100) : 0);
  const LS = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* depolama kapalı olabilir */ } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { } },
    keys() { try { return Object.keys(localStorage); } catch (e) { return []; } },
  };
  // ---------- tema (bütün cihaz için ortak; kişiye bağlı değil) ----------
  // Defter: tahta menü + açık defter sayfası (varsayılan). Gece ve Tahta: Ela'nın defterindeki koyu temalar.
  const TEMALAR = [["defter", "Defter", "#f7f4ea"], ["gece", "Gece", "#121833"], ["tahta", "Tahta", "#1d3a31"]];
  const TEMA_RENK = { defter: "#15232a", gece: "#121833", tahta: "#1d3a31" };
  const tema = () => { const t = LS.get("ankuzef:tema", "defter"); return TEMA_RENK[t] ? t : "defter"; };
  function temaUygula(t) {
    if (t === "defter") delete document.documentElement.dataset.tema; else document.documentElement.dataset.tema = t;
    const m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = TEMA_RENK[t];
  }
  const temaSecHTML = () => `<div class="temalar" role="group" aria-label="Görünüm">${TEMALAR.map(([id, ad, r]) => `<button type="button" data-tema-sec="${id}" aria-pressed="${id === tema()}"><i style="background:${r}"></i>${ad}</button>`).join("")}</div>`;
  function temaBagla(kok) {
    $$("[data-tema-sec]", kok).forEach((b) => (b.onclick = () => {
      LS.set("ankuzef:tema", b.dataset.temaSec); temaUygula(b.dataset.temaSec);
      $$("[data-tema-sec]").forEach((x) => x.setAttribute("aria-pressed", x.dataset.temaSec === b.dataset.temaSec));
    }));
  }
  temaUygula(tema());

  const AY = `<svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true"><path d="M22 4a13 13 0 1 0 8 22A11 11 0 0 1 22 4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="27" cy="7" r="1.2" fill="currentColor"/><circle cx="31" cy="14" r=".9" fill="currentColor"/><circle cx="24" cy="13" r=".7" fill="currentColor"/></svg>`;

  // ---------- profil ----------
  const PROFIL_VARSAYILAN = ["Şengül", "Kemal"];
  const profiller = () => LS.get("ankuzef:profiller", PROFIL_VARSAYILAN);
  const profil = () => LS.get("ankuzef:profil", null);

  function profilSecHTML() {
    const p = profiller();
    return `<h1>Kim çalışıyor?</h1>
      <p class="soluk">İlerleme, yanlış defteri ve tekrar takvimi kişiye göre ayrı tutulur. Bu cihazda seçtiğin kişi hatırlanır.</p>
      <div class="dugmeler">${p.map((x) => `<button class="dugme ikincil" data-profil="${kac(x)}">${kac(x)}</button>`).join("")}</div>
      <form class="dugmeler" data-profil-ekle><input class="girdi" name="ad" placeholder="Yeni kişi adı" maxlength="20" aria-label="Yeni kişi adı"><button class="dugme ikincil">Kişi ekle</button></form>`;
  }
  function profilBagla(kok, sonra) {
    $$("[data-profil]", kok).forEach((b) => (b.onclick = () => { LS.set("ankuzef:profil", b.dataset.profil); sonra(); }));
    const f = $("[data-profil-ekle]", kok);
    if (f) f.onsubmit = (e) => {
      e.preventDefault(); const ad = f.ad.value.trim(); if (!ad) return;
      const p = profiller(); if (!p.includes(ad)) { p.push(ad); LS.set("ankuzef:profiller", p); }
      LS.set("ankuzef:profil", ad); sonra();
    };
  }

  // =====================================================================
  // ANA SAYFA (ders listesi)
  // =====================================================================
  async function anaSayfa() {
    const kok = $("#uygulama");
    const dersler = await (await fetch("dersler.json", { cache: "no-cache" })).json();
    const ciz = () => {
      const p = profil();
      const govde = !p ? profilSecHTML() : `
        <h1>Merhaba ${kac(p)}</h1>
        <p class="soluk">Dersini seç. Her derste aynı yol var: konuyu çalış, çıkmış soruları çöz, kitabın Gözden Geçirelim sorularına bak, tahmini denemelerle kendini dene, sonunda süreli deneme sınavına gir.</p>
        <ul class="satirlar">${dersler.map((d) => `<li><a class="satir ${d.hazir ? "" : "kapali"}" href="${d.hazir ? d.kod + "/" : "#"}">
            <span><span class="ad">${kac(d.ad)}</span><br><span class="alt">${kac(d.kodu || "")}${d.ogrenciler ? " · " + d.ogrenciler.map(kac).join(", ") + " alıyor" : ""}</span></span>
            <span class="sag">${d.hazir ? "Aç" : "Hazırlanıyor"}</span></a></li>`).join("")}</ul>
        <p class="kucuk soluk">Şu an: <b>${kac(p)}</b> · <a href="#" data-profil-degis>kişiyi değiştir</a></p>
        <p class="alt-bilgi">İlerleme bu tarayıcıda saklanır. Cihaz değiştirirken ders içindeki Ayarlar'dan yedek al.</p>`;
      kok.innerHTML = `<div class="tek"><div class="ust-satir"><a class="marka" href="./">${AY}<span>ANKUZEF Defteri</span></a>${temaSecHTML()}</div><main class="defter">${govde}</main></div>`;
      temaBagla(kok);
      if (!p) profilBagla(kok, ciz);
      const d = $("[data-profil-degis]", kok); if (d) d.onclick = (e) => { e.preventDefault(); LS.del("ankuzef:profil"); ciz(); };
    };
    ciz();
  }

  // =====================================================================
  // DERS SAYFASI — veri ve kayıt
  // =====================================================================
  const S = { ders: null, bolumler: {}, sira: [], sorular: [], soruIndex: {}, atolye: [] };
  const anahtar = (k) => `ankuzef:${profil()}:${S.ders.kod}:${k}`;
  const oku = (k, d) => LS.get(anahtar(k), d);
  const yaz = (k, v) => LS.set(anahtar(k), v);

  async function dersYukle() {
    const al = async (u) => { const r = await fetch(u, { cache: "no-cache" }); if (!r.ok) throw new Error(u + " yüklenemedi"); return r.json(); };
    S.ders = await al("ders.json");
    for (const b of S.ders.bolumler) {
      S.sira.push(b.id);
      S.bolumler[b.id] = b.hazir ? Object.assign({}, b, await al("bolumler/" + b.id + ".json")) : Object.assign({}, b);
      (S.bolumler[b.id].sorular || []).forEach((q, i) => S.sorular.push(Object.assign({ id: `${b.id}-k${String(i + 1).padStart(2, "0")}`, kaynak: "konu", bolum: b.id }, q)));
    }
    for (const f of S.ders.soruDosyalari || []) {
      const v = await al("sorular/" + f);
      (v.sorular || []).forEach((q) => S.sorular.push(Object.assign({ kaynak: v.kaynak, sinav: v.sinav, sinavTur: v.sinavTur, deneme: v.deneme, denemeAd: v.ad }, q)));
    }
    S.sorular.forEach((q) => (S.soruIndex[q.id] = q));
    S.atolye = (window.ATOLYE || []).slice();
  }

  const kapsam = () => oku("kapsam", S.ders.varsayilanKapsam || "vize");
  const kapsamBolumleri = () => S.ders.kapsamlar[kapsam()].bolumler;
  const kapsamAd = () => S.ders.kapsamlar[kapsam()].ad;
  const kapsamda = (q) => kapsamBolumleri().includes(q.bolum);
  // bütün soruları kapsamda olan tahmini denemeler (final denemesi vize kapsamında görünmez)
  const denemelerKapsamda = () => { const t = S.sorular.filter((q) => q.kaynak === "tahmin"); return [...new Set(t.map((q) => q.deneme))].filter((d) => t.filter((q) => q.deneme === d).every(kapsamda)); };
  const vizeBolumleri = () => (S.ders.kapsamlar.vize || { bolumler: [] }).bolumler;
  const bAd = (bid) => (S.bolumler[bid] ? `Bölüm ${S.bolumler[bid].no}` : "");

  function soruKaydet(q, dogruMu, tekrarModu) {
    const st = oku("soru", {}); const k = st[q.id] || { d: 0, y: 0 };
    if (k.d + k.y === 0) k.ilk = dogruMu;
    dogruMu ? k.d++ : k.y++; k.son = simdi(); st[q.id] = k; yaz("soru", st);
    const yd = oku("yanlis", {});
    if (!dogruMu) yd[q.id] = { kutu: 0, sonraki: simdi() + GUN, eklendi: (yd[q.id] && yd[q.id].eklendi) || simdi(), sayi: ((yd[q.id] && yd[q.id].sayi) || 0) + 1 };
    else if (yd[q.id] && !yd[q.id].ogrenildi && (tekrarModu || simdi() >= yd[q.id].sonraki - GUN / 2)) {
      const e = yd[q.id]; e.kutu++;
      if (e.kutu >= ARALIK.length) e.ogrenildi = simdi(); else e.sonraki = simdi() + ARALIK[e.kutu] * GUN;
    }
    yaz("yanlis", yd);
  }
  const yanlisBekleyen = () => { const yd = oku("yanlis", {}); return Object.keys(yd).filter((id) => S.soruIndex[id] && !yd[id].ogrenildi && yd[id].sonraki <= simdi()); };
  const yanlisAcik = () => { const yd = oku("yanlis", {}); return Object.keys(yd).filter((id) => S.soruIndex[id] && !yd[id].ogrenildi && kapsamda(S.soruIndex[id])); };

  const kartAnahtar = (b, ad) => b + "|" + ad;
  function kartKaydet(b, ad, biliyor) {
    const kt = oku("kart", {}); const k = kt[kartAnahtar(b, ad)] || { kutu: -1 };
    if (biliyor) { k.kutu = Math.min(k.kutu + 1, ARALIK.length); k.sonraki = simdi() + ARALIK[Math.min(k.kutu, ARALIK.length - 1)] * GUN; }
    else { k.kutu = 0; k.sonraki = simdi() + GUN; k.zor = (k.zor || 0) + 1; }
    k.son = simdi(); kt[kartAnahtar(b, ad)] = k; yaz("kart", kt);
  }
  function kartDurum(bid) {
    const kt = oku("kart", {}); const kartlar = S.bolumler[bid].kartlar || [];
    let ogrenilen = 0, bekleyen = 0, gorulen = 0;
    kartlar.forEach((k) => { const e = kt[kartAnahtar(bid, k.ad)]; if (!e) return; gorulen++; if (e.kutu >= 2) ogrenilen++; if (e.sonraki <= simdi()) bekleyen++; });
    return { toplam: kartlar.length, ogrenilen, bekleyen, gorulen };
  }
  function bekleyenKartlar() {
    const out = []; const kt = oku("kart", {});
    kapsamBolumleri().forEach((bid) => (S.bolumler[bid].kartlar || []).forEach((k) => { const e = kt[kartAnahtar(bid, k.ad)]; if (e && e.sonraki <= simdi()) out.push({ bid, k }); }));
    return out;
  }
  function soruDurum(liste) {
    const st = oku("soru", {}); let cozulen = 0, dogru = 0;
    liste.forEach((q) => { const e = st[q.id]; if (e) { cozulen++; if (e.ilk) dogru++; } });
    return { toplam: liste.length, cozulen, dogru };
  }
  // bölüm adımlarının tamamlanma işareti
  const adimOku = (bid) => (oku("adim", {})[bid] || {});
  function adimIsaretle(bid, adim) { const a = oku("adim", {}); a[bid] = a[bid] || {}; if (!a[bid][adim]) { a[bid][adim] = simdi(); yaz("adim", a); menuCiz(); } }

  // soru kümeleri
  const Q = {
    cikmis: () => S.sorular.filter((q) => q.kaynak === "cikmis"),
    // vize kapsamında yalnız vize sınavları + final/büt'te çıkan vize konuları; final kapsamında hepsi
    cikmisKapsam: () => S.sorular.filter((q) => q.kaynak === "cikmis" && kapsamda(q)),
    finalVize: () => S.sorular.filter((q) => q.kaynak === "cikmis" && q.sinavTur !== "Vize" && vizeBolumleri().includes(q.bolum)),
    gozden: (bid) => S.sorular.filter((q) => q.kaynak === "gozden" && (!bid || q.bolum === bid)),
    tahmin: () => S.sorular.filter((q) => q.kaynak === "tahmin"),
    konu: (bid) => S.sorular.filter((q) => q.kaynak === "konu" && q.bolum === bid),
  };
  const sinavListesi = () => { // kapsamda gösterilecek tam sınavlar
    const ad = [...new Set(Q.cikmis().map((q) => q.sinav))];
    return ad.filter((s) => { const qs = Q.cikmis().filter((q) => q.sinav === s); return kapsam() === "final" ? qs.some(kapsamda) : qs.every((q) => vizeBolumleri().includes(q.bolum)); });
  };

  // =====================================================================
  // KABUK: tahta menü
  // =====================================================================
  const BOLUM_ADIM = [["ozet", "Özet"], ["kartlar", "Kavram kartları"], ["ciftler", "Karıştırılanlar"], ["formul", "Formüller"], ["hesap", "Hesap"], ["test", "Konu testi"], ["gozden", "Gözden Geçirelim"], ["cikmis", "Çıkmış"]];
  function bolumAdimlari(bid) {
    const b = S.bolumler[bid];
    const var_ = { ozet: 1, kartlar: (b.kartlar || []).length, ciftler: (b.ciftler || []).length, formul: (b.formuller || []).length, hesap: S.atolye.filter((g) => g.bolum === bid).length, test: Q.konu(bid).length, gozden: Q.gozden(bid).length, cikmis: S.sorular.filter((q) => q.kaynak === "cikmis" && q.bolum === bid).length };
    return BOLUM_ADIM.filter(([id]) => var_[id]).map(([id, ad]) => [id, ad, var_[id]]);
  }
  function yolDurum() { // 5 adımlık çalışma yolunun ilerlemesi
    const bl = kapsamBolumleri().filter((id) => S.bolumler[id].hazir);
    const konuT = bl.reduce((a, id) => a + bolumAdimlari(id).filter(([x]) => !["gozden", "cikmis"].includes(x)).length, 0);
    const konuD = bl.reduce((a, id) => a + Object.keys(adimOku(id)).filter((x) => !["gozden", "cikmis"].includes(x)).length, 0);
    const c = soruDurum(Q.cikmisKapsam()), g = soruDurum(Q.gozden().filter(kapsamda)), t = soruDurum(Q.tahmin().filter(kapsamda));
    const den = oku("denemeler", []).filter((x) => x.kapsam === kapsam());
    return [
      { no: 1, id: "konu", ad: "Konu çalış", alt: "Bölüm bölüm: özet, kartlar, karıştırılanlar, formüller, hesap, konu testi", d: konuD, t: konuT, href: "#konu" },
      { no: 2, id: "cikmis", ad: "Çıkmış sorular", alt: "Gerçek sınav soruları, doğru cevap fosforlu", d: c.cozulen, t: c.toplam, href: "#cikmis" },
      { no: 3, id: "gozden", ad: "Gözden Geçirelim", alt: "Kitabın bölüm sonu soruları, açıklamalı", d: g.cozulen, t: g.toplam, href: "#gozden" },
      { no: 4, id: "tahmin", ad: "Tahmini denemeler", alt: "Henüz sorulmamış konulardan, sınav biçiminde", d: t.cozulen, t: t.toplam, href: "#tahmin" },
      { no: 5, id: "deneme", ad: "Deneme sınavı", alt: "Süreli, gerçek sınav uzunluğunda; sonunda 75 çizgisi", d: den.length ? 1 : 0, t: 1, href: "#deneme", ek: den.length ? `${den.length} deneme, son ${yuzde(den[den.length - 1].d, den[den.length - 1].n)}` : "" },
    ];
  }
  function aktifYol() { const h = location.hash.replace(/^#/, "").split("/"); return { yol: h[0] || "", a: h[1], b: h[2] }; }

  function menuCiz() {
    const m = $("#menu"); if (!m || !S.ders) return;
    const { yol, a, b } = aktifYol();
    const yolAktif = { konu: yol === "konu" || yol === "b", cikmis: yol === "cikmis", gozden: yol === "gozden", tahmin: yol === "tahmin", deneme: yol === "deneme" };
    const tekrarSay = yanlisBekleyen().filter((id) => kapsamda(S.soruIndex[id])).length + bekleyenKartlar().length;
    const cur = (kosul) => (kosul ? ' aria-current="page"' : "");
    const altKonu = yolAktif.konu ? `<ul class="alt-menu">${kapsamBolumleri().map((bid) => {
      const bo = S.bolumler[bid]; const aktif = yol === "b" && a === bid;
      if (!bo.hazir) return `<li><a href="#b/${bid}/ozet">${bAd(bid)} <span class="tik">yakında</span></a></li>`;
      const ad = adimOku(bid); const adimlar = bolumAdimlari(bid);
      return `<li><a href="#b/${bid}/ozet"${cur(aktif && false)}>${bAd(bid)}: ${kac(bo.baslik)}</a>
        ${aktif ? `<ul class="alt-menu">${adimlar.map(([id, adi], i) => `<li><a href="#b/${bid}/${id}"${cur(b === id)}>${i + 1}. ${adi}${ad[id] ? '<span class="tik">✓</span>' : ""}</a></li>`).join("")}</ul>` : ""}</li>`;
    }).join("")}</ul>` : "";
    const altCikmis = yolAktif.cikmis ? `<ul class="alt-menu">${sinavListesi().map((s) => `<li><a href="#cikmis/${encodeURIComponent(s)}"${cur(decodeURIComponent(a || "") === s)}>${kac(s)}</a></li>`).join("")}
      ${kapsam() === "vize" && Q.finalVize().length ? `<li><a href="#cikmis/finalvize"${cur(a === "finalvize")}>Finalde çıkmış vize soruları</a></li>` : ""}
      <li><a href="#cikmis/kapsam"${cur(a === "kapsam")}>Hepsi karışık</a></li></ul>` : "";
    const altGozden = yolAktif.gozden ? `<ul class="alt-menu">${kapsamBolumleri().filter((bid) => Q.gozden(bid).length).map((bid) => `<li><a href="#gozden/${bid}"${cur(a === bid)}>${bAd(bid)}${soruDurum(Q.gozden(bid)).cozulen === Q.gozden(bid).length ? '<span class="tik">✓</span>' : ""}</a></li>`).join("")}</ul>` : "";
    const altTahmin = yolAktif.tahmin ? `<ul class="alt-menu">${denemelerKapsamda().map((d) => `<li><a href="#tahmin/${d}"${cur(a === d)}>${kac(Q.tahmin().find((q) => q.deneme === d).denemeAd)}</a></li>`).join("")}<li><a href="#tahmin/hepsi"${cur(a === "hepsi")}>Hepsi karışık</a></li></ul>` : "";
    const alt = { konu: altKonu, cikmis: altCikmis, gozden: altGozden, tahmin: altTahmin, deneme: "" };
    m.innerHTML = `<a class="marka" href="../">${AY}<span>ANKUZEF Defteri</span></a>
      <p class="marka-alt">${kac(S.ders.ad)}${S.ders.dersKodu ? " · " + kac(S.ders.dersKodu) : ""}</p>
      <div class="kapsam-sec" role="group" aria-label="Hangi sınava çalışıyorsun?">${Object.entries(S.ders.kapsamlar).map(([id, x]) => `<button data-kapsam="${id}" aria-pressed="${id === kapsam()}">${kac(x.ad)}</button>`).join("")}</div>
      <nav aria-label="Ders menüsü">
        <a class="mi" href="#"${cur(yol === "")}><span class="mno ikon">⌂</span>Ana sayfa</a>
        <div class="menu-grup">Çalışma yolu</div>
        <ol>${yolDurum().map((y) => `<li><a class="mi" href="${y.href}"${cur(yolAktif[y.id])}><span class="mno">${y.no}</span>${y.ad}</a>${alt[y.id]}</li>`).join("")}</ol>
        <div class="menu-grup">Her gün</div>
        <a class="mi" href="#tekrar"${cur(yol === "tekrar")}><span class="mno ikon">↻</span>Günün tekrarı${tekrarSay ? `<span class="msay">${tekrarSay}</span>` : ""}</a>
        <a class="mi" href="#yanlis"${cur(yol === "yanlis")}><span class="mno ikon">✎</span>Yanlış defterim</a>
        <div class="menu-grup">Araçlar</div>
        <a class="mi" href="#atolye"${cur(yol === "atolye")}><span class="mno ikon">±</span>Hesap Atölyesi</a>
        <a class="mi" href="#ozet"${cur(yol === "ozet")}><span class="mno ikon">≡</span>Sınav öncesi özet</a>
        <a class="mi" href="#ayar"${cur(yol === "ayar")}><span class="mno ikon">⚙</span>Ayarlar ve yedek</a>
      </nav>
      <div class="menu-alt">Çalışan: <b>${kac(profil())}</b> <button data-profil-degis>değiştir</button></div>`;
    $$("[data-kapsam]", m).forEach((x) => (x.onclick = () => { yaz("kapsam", x.dataset.kapsam); if (aktifYol().yol === "b" && !kapsamBolumleri().includes(aktifYol().a)) location.hash = "#konu"; else yonlendir(); }));
    $("[data-profil-degis]", m).onclick = () => { LS.del("ankuzef:profil"); location.hash = ""; dersBaslat(); };
    const ub = $(".ust-bar .baslik"); if (ub) ub.textContent = S.ders.ad;
  }
  function menuKapat() { const m = $("#menu"); if (m) m.classList.remove("acik"); const p = $(".perde"); if (p) p.remove(); const b = $(".menu-ac"); if (b) b.setAttribute("aria-expanded", "false"); }
  function menuAc() {
    const m = $("#menu"); m.classList.add("acik"); $(".menu-ac").setAttribute("aria-expanded", "true");
    const p = document.createElement("div"); p.className = "perde"; p.onclick = menuKapat; document.body.appendChild(p);
    const ilk = $(".mi[aria-current]", m) || $(".mi", m); if (ilk) ilk.focus();
  }

  // =====================================================================
  // SORU GÖSTERİMİ
  // =====================================================================
  function tabloHTML(t) {
    if (!t) return "";
    return `<div class="tablo-sar"><table class="veri">${t.baslik ? `<caption class="soluk kucuk">${t.baslik}</caption>` : ""}
      ${t.basliklar ? `<thead><tr>${t.basliklar.map((x) => `<th>${x}</th>`).join("")}</tr></thead>` : ""}
      <tbody>${t.satirlar.map((r) => `<tr>${r.map((x) => `<td>${x}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  }
  function etiketler(q) {
    const e = [];
    if (q.kaynak === "cikmis") {
      e.push(`<span class="etiket cikmis">Çıkmış · ${kac(q.sinav)}${q.no ? " · S" + q.no : ""}</span>`);
      if (q.sinavTur && q.sinavTur !== "Vize" && vizeBolumleri().includes(q.bolum)) e.push(`<span class="etiket">${kac(q.sinavTur)}'de çıkan vize konusu</span>`);
    } else if (q.kaynak === "gozden") e.push(`<span class="etiket gozden">Gözden Geçirelim · kitap S${q.kitapNo}</span>`);
    else if (q.kaynak === "tahmin") e.push(`<span class="etiket tahmin">Tahmin · henüz sorulmadı</span>`);
    else if (q.kaynak === "atolye") e.push(`<span class="etiket">Hesap Atölyesi</span>`);
    else e.push(`<span class="etiket">Konu testi</span>`);
    if (q.bolum && S.bolumler[q.bolum]) e.push(`<span>${bAd(q.bolum)}</span>`);
    return e.join("");
  }
  function soruGovde(q) {
    const sm = q.soru ? `<div class="soru-metin">${q.soru}</div>` : "";
    return `${q.tabloOnce ? tabloHTML(q.tablo) + sm : sm + tabloHTML(q.tablo)}
      ${q.onculler ? `<ul class="onculler">${q.onculler.map((o, i) => `<li><b>${["I", "II", "III", "IV"][i]}.</b> ${o}</li>`).join("")}</ul>` : ""}
      ${q.kok ? `<div class="soru-metin">${q.kok}</div>` : ""}`;
  }
  function sikSirasi(q, karistirSik) { const s = q.secenekler.map((_, i) => i); return karistirSik && !q.sabitSik ? karistir(s) : s; }
  function geriBildirimHTML(q, secilenAsil, sira) {
    const dogruMu = secilenAsil === q.dogru;
    const b = q.bolum && S.bolumler[q.bolum];
    return `<div class="geri ${dogruMu ? "" : "yanlis"}" role="status">
      <h3>${dogruMu ? "Doğru." : secilenAsil == null ? "Boş bıraktın." : "Yanlış."} Cevap ${HARF[sira.indexOf(q.dogru)]}) ${q.secenekler[q.dogru]}</h3>
      ${q.aciklama ? `<p>${q.aciklama}</p>` : ""}
      ${q.celdirici ? `<p><b>Çeldirici:</b> ${q.celdirici}</p>` : ""}
      ${q.cozum ? `<ol class="adimlar">${q.cozum.map((x) => `<li>${x}</li>`).join("")}</ol>` : ""}
      ${q.kitapNotu ? `<div class="not">${q.kitapNotu}</div>` : ""}
      <p class="kucuk soluk">${q.sayfa ? "Kitap: " + kac(q.sayfa) : ""}${q.kaynak === "gozden" ? ` · kitabın cevap anahtarı: ${kac(q.kitapCevap)}` : ""}${b && b.hazir ? ` · <a href="#b/${b.id}/ozet">${bAd(b.id)} özetine bak</a>` : ""}</p>
    </div>`;
  }

  // ---------- test çalıştırıcı ----------
  // ayar: {baslik, sorular, mod: "anlik"|"sinav", sureDk, karistirSik, tekrarModu, devamAnahtar, donus, kayitTur, bitince}
  const BITINCE = {}; // devam ettirilen testlerin bitince işleri (kaydedilemeyen fonksiyonlar)
  function testBaslat(ayar) {
    const kok = $("#icerik");
    if (ayar.devamAnahtar && ayar.bitince) BITINCE[ayar.devamAnahtar] = ayar.bitince;
    const T = ayar.devam || { ids: ayar.sorular.map((q) => q.id), i: 0, cevap: {}, sira: {}, bitti: false, basla: simdi() };
    ayar.sorular.forEach((q) => { if (!T.sira[q.id]) T.sira[q.id] = sikSirasi(q, ayar.karistirSik); });
    const sor = (id) => S.soruIndex[id] || ayar.sorular.find((q) => q.id === id);
    const sakla = () => { if (ayar.devamAnahtar) yaz("devam:" + ayar.devamAnahtar, { T, ayar: Object.assign({}, ayar, { sorular: undefined, devam: undefined, bitince: undefined }) }); };
    const sil = () => ayar.devamAnahtar && LS.del(anahtar("devam:" + ayar.devamAnahtar));
    let saat = null;

    function ciz() {
      if (T.bitti) return rapor();
      const q = sor(T.ids[T.i]); const sira = T.sira[q.id]; const cev = T.cevap[q.id];
      const anlikCevapli = ayar.mod === "anlik" && cev !== undefined;
      kok.innerHTML = `${ayar.donus ? `<a class="geri-link" href="${ayar.donus}">← Testten çık (kaldığın yer saklanır)</a>` : ""}
        <div class="ilerleme-yazi"><span>${kac(ayar.baslik)}</span><span>Soru ${T.i + 1} / ${T.ids.length}${ayar.mod === "sinav" ? ` · <span class="sayac" data-saat></span>` : ""}</span></div>
        <div class="cubuk" aria-hidden="true"><i style="width:${yuzde(T.i + (anlikCevapli ? 1 : 0), T.ids.length)}%"></i></div>
        <article class="kutu" style="margin-top:12px">
          <div class="soru-ust">${etiketler(q)}</div>
          ${soruGovde(q)}
          <ul class="secenekler">${sira.map((asil, j) => {
            let c = "";
            if (anlikCevapli) { if (asil === q.dogru) c = "dogru-sik"; else if (asil === cev) c = "yanlis-sik"; }
            else if (ayar.mod === "sinav" && cev === asil) c = "secili";
            return `<li><button class="secenek ${c}" data-sik="${asil}" ${anlikCevapli ? "disabled" : ""}><span class="harf">${HARF[j]})</span><span class="metin">${q.secenekler[asil]}</span></button></li>`;
          }).join("")}</ul>
          ${anlikCevapli ? geriBildirimHTML(q, cev, sira) : ""}
        </article>
        <div class="dugmeler">
          ${ayar.mod === "sinav" ? `<button class="dugme ikincil" data-onceki ${T.i === 0 ? "disabled" : ""}>Önceki</button>` : ""}
          ${ayar.mod === "anlik" && !anlikCevapli ? `<button class="dugme ikincil" data-bos>Bilmiyorum, cevabı göster</button>` : ""}
          ${ayar.mod === "sinav" || anlikCevapli ? `<button class="dugme" data-sonraki>${T.i === T.ids.length - 1 ? (ayar.mod === "sinav" ? "Sınavı bitir" : "Sonucu gör") : "Sonraki soru"}</button>` : ""}
          ${ayar.mod === "sinav" && T.i !== T.ids.length - 1 ? `<button class="dugme ikincil" data-bitir>Sınavı bitir</button>` : ""}
        </div>
        ${ayar.mod === "sinav" ? `<div class="harita" aria-label="Sorular">${T.ids.map((id, j) => `<button data-git="${j}" class="${T.cevap[id] !== undefined ? "dolu" : ""} ${j === T.i ? "simdi" : ""}" aria-label="Soru ${j + 1}">${j + 1}</button>`).join("")}</div>` : ""}`;
      $$("[data-sik]", kok).forEach((x) => (x.onclick = () => {
        const asil = +x.dataset.sik;
        if (ayar.mod === "anlik") { T.cevap[q.id] = asil; soruKaydet(q, asil === q.dogru, ayar.tekrarModu); }
        else T.cevap[q.id] = T.cevap[q.id] === asil ? undefined : asil;
        sakla(); ciz();
        if (ayar.mod === "anlik") { const g = $(".geri", kok); if (g) g.scrollIntoView({ block: "nearest", behavior: "smooth" }); }
      }));
      const bos = $("[data-bos]", kok); if (bos) bos.onclick = () => { T.cevap[q.id] = null; soruKaydet(q, false, ayar.tekrarModu); sakla(); ciz(); };
      const on = $("[data-onceki]", kok); if (on) on.onclick = () => { T.i--; sakla(); ciz(); };
      const so = $("[data-sonraki]", kok); if (so) so.onclick = () => { if (T.i === T.ids.length - 1) bitir(); else { T.i++; sakla(); ciz(); window.scrollTo({ top: 0 }); } };
      const bt = $("[data-bitir]", kok); if (bt) bt.onclick = () => { const bosSay = T.ids.filter((id) => T.cevap[id] === undefined).length; if (!bosSay || bt.dataset.emin) bitir(); else { bt.dataset.emin = "1"; bt.textContent = `${bosSay} boş soru var. Yine de bitir`; } };
      $$("[data-git]", kok).forEach((x) => (x.onclick = () => { T.i = +x.dataset.git; sakla(); ciz(); }));
      if (ayar.mod === "sinav") saatGuncelle();
    }
    function saatGuncelle() {
      clearInterval(saat);
      const tik = () => {
        const kalan = Math.max(0, T.basla + ayar.sureDk * 60e3 - simdi()); const el = $("[data-saat]", kok);
        if (!el) return clearInterval(saat);
        el.textContent = `${Math.floor(kalan / 60e3)}:${String(Math.floor((kalan % 60e3) / 1e3)).padStart(2, "0")}`;
        if (kalan <= 0) { clearInterval(saat); bitir(); }
      };
      tik(); saat = setInterval(tik, 1000);
    }
    function bitir() {
      clearInterval(saat);
      if (ayar.mod === "sinav") T.ids.forEach((id) => soruKaydet(sor(id), T.cevap[id] === sor(id).dogru, false));
      T.bitti = true; T.bitis = simdi(); sil();
      const d = T.ids.filter((id) => T.cevap[id] === sor(id).dogru).length;
      const bol = {}; T.ids.forEach((id) => { const q = sor(id); const b = q.bolum || "-"; bol[b] = bol[b] || [0, 0]; bol[b][1]++; if (T.cevap[id] === q.dogru) bol[b][0]++; });
      if (ayar.kayitTur) { const g = oku(ayar.kayitTur, []); g.push({ t: simdi(), ad: ayar.baslik, d, n: T.ids.length, bol, kapsam: kapsam(), sureSn: Math.round((T.bitis - T.basla) / 1000) }); yaz(ayar.kayitTur, g.slice(-50)); }
      const f = ayar.bitince || (ayar.devamAnahtar && BITINCE[ayar.devamAnahtar]); if (f) f();
      T.ozet = { d, bol }; menuCiz(); rapor();
    }
    function rapor() {
      const n = T.ids.length; const d = T.ozet ? T.ozet.d : T.ids.filter((id) => T.cevap[id] === sor(id).dogru).length;
      const puan = yuzde(d, n); const yanlislar = T.ids.filter((id) => T.cevap[id] !== sor(id).dogru);
      const bol = T.ozet ? T.ozet.bol : {};
      kok.innerHTML = `<h1>${kac(ayar.baslik)}</h1>
        <div class="kutu"><p style="font-size:2rem;font-weight:700;margin:0">${puan} <span class="soluk" style="font-size:1rem">/ 100 · ${d} doğru, ${n - d} yanlış ya da boş</span></p>
          <div class="hedef" title="Hedef çizgisi: ${HEDEF}"><i style="width:${puan}%"></i><s></s></div>
          <p class="kucuk soluk">Sarı çizgi hedefin: ${HEDEF}. ${puan >= HEDEF ? "Hedefin üstündesin." : `Hedefe ${Math.ceil(((HEDEF - puan) / 100) * n)} doğru daha.`}${ayar.mod === "sinav" ? " Puan, her sorunun eşit değerde ve yanlışın doğruyu götürmediği varsayımıyla hesaplandı." : ""}</p>
        </div>
        ${Object.keys(bol).length > 1 ? `<div class="kutu"><h3>Bölümlere göre</h3><table class="veri rapor-tablo" style="width:100%"><tr><th>Bölüm</th><th>Doğru</th></tr>
          ${Object.entries(bol).map(([b, [x, t]]) => `<tr><td>${S.bolumler[b] ? `${bAd(b)}: ${kac(S.bolumler[b].baslik)}` : "Diğer"}</td><td>${x} / ${t}</td></tr>`).join("")}</table></div>` : ""}
        <div class="dugmeler">
          ${yanlislar.length ? `<button class="dugme" data-yeniden>Yanlışları yeniden çöz (${yanlislar.length})</button>` : ""}
          ${ayar.sonraki ? `<a class="dugme ${yanlislar.length ? "ikincil" : ""}" href="${ayar.sonraki[0]}">Sıradaki: ${kac(ayar.sonraki[1])}</a>` : ""}
          <a class="dugme ikincil" href="${ayar.donus || "#"}">Geri dön</a>
        </div>
        ${ayar.mod === "sinav" && yanlislar.length ? `<h2>Yanlışların ve boşların</h2>${yanlislar.map((id) => { const q = sor(id); const sira = T.sira[id];
          return `<article class="kutu"><div class="soru-ust">${etiketler(q)}</div>${soruGovde(q)}
            <ul class="secenekler">${sira.map((asil, j) => `<li><div class="secenek ${asil === q.dogru ? "dogru-sik" : asil === T.cevap[id] ? "yanlis-sik" : ""}"><span class="harf">${HARF[j]})</span><span class="metin">${q.secenekler[asil]}</span></div></li>`).join("")}</ul>
            ${geriBildirimHTML(q, T.cevap[id] ?? null, sira)}</article>`; }).join("")}` : ""}`;
      const y = $("[data-yeniden]", kok);
      if (y) y.onclick = () => testBaslat({ baslik: "Yanlışlar: " + ayar.baslik, sorular: yanlislar.map(sor), mod: "anlik", karistirSik: true, donus: ayar.donus });
      window.scrollTo({ top: 0 });
    }
    ciz();
  }
  function devamVarsa(ad) { const v = oku("devam:" + ad, null); return v && v.T && !v.T.bitti ? v : null; }
  function devamEt(ad) {
    const v = devamVarsa(ad); if (!v) return false;
    const sorular = v.T.ids.map((id) => S.soruIndex[id]).filter(Boolean);
    if (sorular.length !== v.T.ids.length) { LS.del(anahtar("devam:" + ad)); return false; }
    testBaslat(Object.assign({}, v.ayar, { sorular, devam: v.T })); return true;
  }
  // test giriş kutusu: başlat / devam et
  function testGiris(s, { metin, ad, sorular, ayar }) {
    const sd = soruDurum(sorular); const dv = devamVarsa(ad);
    s.insertAdjacentHTML("beforeend", `<div class="kutu"><p>${metin}</p><p class="soluk kucuk">Çözdüğün: ${sd.cozulen} / ${sd.toplam}${sd.cozulen ? ` · ilk denemede doğru: ${sd.dogru}` : ""}</p>
      <div class="dugmeler">${dv ? `<button class="dugme" data-devam="${ad}">Kaldığın yerden devam et (soru ${dv.T.i + 1})</button>` : ""}<button class="dugme ${dv ? "ikincil" : ""}" data-basla="${ad}">${dv ? "Baştan başla" : "Başla"}</button></div></div>`);
    const kutu = s.lastElementChild;
    $("[data-basla]", kutu).onclick = () => { LS.del(anahtar("devam:" + ad)); testBaslat(Object.assign({ sorular, devamAnahtar: ad }, ayar)); };
    const d = $("[data-devam]", kutu); if (d) d.onclick = () => { if (ayar.bitince) BITINCE[ad] = ayar.bitince; devamEt(ad); };
  }

  // =====================================================================
  // GÖRÜNÜMLER
  // =====================================================================
  function pano() {
    const k = $("#icerik");
    const bek = yanlisBekleyen().filter((id) => kapsamda(S.soruIndex[id])).length + bekleyenKartlar().length;
    const den = oku("denemeler", []).filter((x) => x.kapsam === kapsam());
    const son = den.slice(-3); const ort = son.length ? Math.round(son.reduce((a, x) => a + yuzde(x.d, x.n), 0) / son.length) : null;
    const tarih = oku("sinavTarihi", {})[kapsam()];
    const gunKaldi = tarih ? Math.ceil((new Date(tarih + "T09:00") - simdi()) / GUN) : null;
    const yol = yolDurum(); const simdiki = yol.find((y) => y.d < y.t) || yol[yol.length - 1];
    k.innerHTML = `
      <h1>${gunKaldi != null ? (gunKaldi > 0 ? `${kac(kapsamAd())} sınavına ${gunKaldi} gün` : gunKaldi === 0 ? "Sınav bugün" : `${kac(kapsamAd())} sınavı geçti`) : `${kac(kapsamAd())} hazırlığı`}</h1>
      <p class="soluk">${kac(S.ders.ad)}. Aşağıdaki yolu sırayla izle; her adımda nerede kaldığın saklanır.${tarih ? "" : ` <a href="#ayar">Sınav tarihini gir</a>, kaç gün kaldığı burada görünsün.`}</p>
      <ol class="yol">${yol.map((y) => `<li><a href="${y.href}" class="${y.d >= y.t && y.t ? "tamam" : y === simdiki ? "simdi" : ""}">
        <span class="yno">${y.no}</span>
        <span><span class="yad">${y.ad}</span>${y === simdiki ? '<span class="etiket-simdi">sıradaki</span>' : ""}<br><span class="yalt">${y.alt}</span></span>
        <span class="ysag">${y.id === "deneme" ? (y.ek || "henüz yok") : `${y.d} / ${y.t}`}${y.id !== "deneme" ? `<span class="cubuk"><i style="width:${yuzde(y.d, y.t)}%"></i></span>` : ""}</span></a></li>`).join("")}</ol>
      <div class="kutu">
        <h2>Bugün</h2>
        <p>${bek ? `Tekrar zamanı gelen ${bek} kart ve soru var.` : "Bugün tekrar zamanı gelen kart ya da soru yok."}</p>
        ${ort != null ? `<p>Son ${son.length} deneme ortalaman: <b>${ort}</b></p><div class="hedef"><i style="width:${ort}%"></i><s></s></div><p class="kucuk soluk">Sarı çizgi ${HEDEF} puan.</p>` : ""}
        <div class="dugmeler"><a class="dugme" href="${simdiki.href}">Devam et: ${simdiki.ad}</a>${bek ? `<a class="dugme ikincil" href="#tekrar">Günün tekrarı (${bek})</a>` : ""}</div>
      </div>`;
  }

  // ---------- 1. Konu çalış ----------
  function konuSayfa() {
    const k = $("#icerik");
    k.innerHTML = `<h1>1. Konu çalış</h1>
      <p class="soluk">Her bölümde ${BOLUM_ADIM.length} adım var: özet, kavram kartları, karıştırılan kavramlar, formüller, hesap alıştırmaları, konu testi, kitabın Gözden Geçirelim soruları ve o bölümden çıkmış sorular. Adımları sırayla yap; biten adım işaretlenir.</p>
      <ul class="satirlar">${kapsamBolumleri().map((id) => {
        const b = S.bolumler[id];
        if (!b.hazir) return `<li><a class="satir" href="#b/${id}/ozet"><span class="no">${b.no}</span><span><span class="ad">${kac(b.baslik)}</span><br><span class="alt">Konu anlatımı hazırlanıyor · Gözden Geçirelim ve çıkmış soruları hazır</span></span></a></li>`;
        const ad = bolumAdimlari(id); const bit = ad.filter(([x]) => adimOku(id)[x]).length;
        return `<li><a class="satir" href="#b/${id}/${(ad.find(([x]) => !adimOku(id)[x]) || ad[0])[0]}"><span class="no">${b.no}</span>
          <span style="flex:1"><span class="ad">${kac(b.baslik)}</span><br><span class="alt">${kac(b.sayfalar)} · ${bit} / ${ad.length} adım</span>
          <span class="cubuk" style="margin-top:6px"><i style="width:${yuzde(bit, ad.length)}%"></i></span></span><span class="sag">${bit ? "Devam et" : "Başla"}</span></a></li>`;
      }).join("")}</ul>`;
  }
  function bolum(bid, sekme) {
    const b = S.bolumler[bid]; const k = $("#icerik");
    if (!b) { location.hash = "#konu"; return; }
    const adimlar = bolumAdimlari(bid);
    if (!b.hazir) {
      k.innerHTML = `<a class="geri-link" href="#konu">← Bölümler</a><h1>${bAd(bid)}: ${kac(b.baslik)}</h1>
        <p>Bu bölümün konu anlatımı hazırlanıyor. Bu arada:</p>
        <div class="dugmeler">${Q.gozden(bid).length ? `<a class="dugme" href="#gozden/${bid}">Gözden Geçirelim (${Q.gozden(bid).length} soru)</a>` : ""}<a class="dugme ikincil" href="#cikmis">Çıkmış sorular</a></div>`;
      return;
    }
    sekme = adimlar.find(([id]) => id === sekme) ? sekme : "ozet";
    const i = adimlar.findIndex(([id]) => id === sekme); const sonraki = adimlar[i + 1];
    const ad = adimOku(bid);
    k.innerHTML = `<a class="geri-link" href="#konu">← Bölümler</a>
      <h1>${bAd(bid)}: ${kac(b.baslik)}</h1><p class="soluk kucuk">${kac(b.sayfalar)} · ${b.sinav ? b.sinav.map(kac).join(", ") + " konusu" : ""}</p>
      <nav class="adimlar-serit" aria-label="Bölüm adımları">${adimlar.map(([id, adi], j) => `<a href="#b/${bid}/${id}" class="${ad[id] ? "tamam" : ""}"${id === sekme ? ' aria-current="step"' : ""}><span class="ano">${ad[id] ? "✓" : j + 1}</span>${adi}</a>`).join("")}</nav>
      <h2>${i + 1}. ${adimlar[i][1]}</h2>
      <div id="sekme"></div>
      <div class="siradaki">${sonraki ? `<a class="dugme fosfor-d" href="#b/${bid}/${sonraki[0]}">Sıradaki adım: ${sonraki[1]}</a>` : (() => { const sb = kapsamBolumleri()[kapsamBolumleri().indexOf(bid) + 1]; return sb && S.bolumler[sb].hazir ? `<a class="dugme fosfor-d" href="#b/${sb}/ozet">Sıradaki: ${bAd(sb)}</a>` : `<a class="dugme fosfor-d" href="#cikmis">Sıradaki: 2. Çıkmış sorular</a>`; })()}</div>`;
    const cur = $(`.adimlar-serit [aria-current]`, k); if (cur) cur.scrollIntoView({ block: "nearest", inline: "center" });
    const s = $("#sekme");
    ({ ozet: ozetSekme, kartlar: kartSekme, ciftler: ciftSekme, formul: formulSekme, hesap: hesapSekme, test: testSekme, gozden: gozdenSekme, cikmis: cikmisSekme })[sekme](b, s);
    if (sekme === "ozet" || sekme === "formul") adimIsaretle(bid, sekme);
  }
  function ozetHTML(b) {
    return `<div class="ozet">${(b.ozet || []).map((o) => `<h3>${o.baslik} ${o.sayfa ? `<span class="sayfa-no">${kac(o.sayfa)}</span>` : ""}</h3>
      ${o.metin ? `<p>${o.metin}</p>` : ""}${o.maddeler ? `<ul>${o.maddeler.map((m) => `<li>${m}</li>`).join("")}</ul>` : ""}${o.tablo ? tabloHTML(o.tablo) : ""}`).join("")}
      ${(b.kitapNotlari || []).map((n) => `<div class="not">${n}</div>`).join("")}</div>`;
  }
  function ozetSekme(b, s) {
    s.innerHTML = `<div class="kutu">${ozetHTML(b)}</div>
      ${b.akildaKalsin ? `<div class="kutu"><h3>Akılda kalsın</h3><ul>${b.akildaKalsin.map((x) => `<li>${x}</li>`).join("")}</ul></div>` : ""}`;
  }

  // ---------- kavram kartları ----------
  function kartSekme(b, s, liste, donus) {
    const kt = oku("kart", {});
    let deste = liste || (b.kartlar || []).map((k) => ({ bid: b.id, k }));
    if (!liste) {
      const puan = (x) => { const e = kt[kartAnahtar(x.bid, x.k.ad)]; return !e ? 1 : e.sonraki <= simdi() ? 0 : 2 + e.kutu; };
      deste = deste.map((x, i) => [x, i]).sort((a, z) => puan(a[0]) - puan(z[0]) || a[1] - z[1]).map((x) => x[0]);
    }
    let i = 0, acik = false, sonuc = { b: 0, y: 0 };
    const ciz = () => {
      if (i >= deste.length) {
        if (typeof donus === "function") return donus();
        if (b) adimIsaretle(b.id, "kartlar");
        s.innerHTML = `<div class="kutu"><h3>Deste bitti</h3><p>${sonuc.b} kartı biliyordun, ${sonuc.y} kart tekrar gelecek. Bilmediklerin yarın Günün tekrarı'nda.</p>
          <div class="dugmeler"><button class="dugme ikincil" data-bastan>Desteyi yeniden aç</button></div></div>`;
        $("[data-bastan]", s).onclick = () => { i = 0; sonuc = { b: 0, y: 0 }; ciz(); };
        return;
      }
      const { bid, k } = deste[i]; const e = kt[kartAnahtar(bid, k.ad)];
      s.innerHTML = `<div class="ilerleme-yazi"><span>Kart ${i + 1} / ${deste.length}${liste ? ` · ${bAd(bid)}` : ""}</span><span>${e ? (e.kutu >= 2 ? "öğrenildi" : "tekrar") : "yeni"}</span></div>
        <div class="kart" aria-live="polite">
          <div class="kart-ad">${k.ad}</div>
          ${acik ? `<p>${k.tanim}</p>${k.ornek ? `<p class="soluk"><b>Örnek:</b> ${k.ornek}</p>` : ""}${k.akil ? `<span class="akil fosfor">${k.akil}</span>` : ""}${k.sayfa ? `<p class="kucuk soluk" style="margin-top:8px">${kac(k.sayfa)}</p>` : ""}`
            : `<p class="gizli">Önce tanımı aklından söyle, sonra kartı aç.</p>`}
        </div>
        <div class="dugmeler">${acik ? `<button class="dugme" data-bil="1">Biliyordum</button><button class="dugme ikincil" data-bil="0">Bilmiyordum</button>` : `<button class="dugme" data-ac>Kartı aç</button><button class="dugme ikincil" data-gec>Atla</button>`}</div>`;
      const ac = $("[data-ac]", s); if (ac) ac.onclick = () => { acik = true; ciz(); };
      const gc = $("[data-gec]", s); if (gc) gc.onclick = () => { i++; ciz(); };
      $$("[data-bil]", s).forEach((x) => (x.onclick = () => {
        const bil = x.dataset.bil === "1"; kartKaydet(bid, k.ad, bil); bil ? sonuc.b++ : sonuc.y++;
        if (!bil && !deste[i].tekrar) deste.push(Object.assign({}, deste[i], { tekrar: true }));
        acik = false; i++; ciz();
      }));
    };
    ciz();
  }

  // ---------- karıştırılan çiftler ----------
  function ciftSekme(b, s) {
    const ciftler = b.ciftler || [];
    s.innerHTML = `<p class="soluk">Sınavda en çok bu ikililer karıştırılır. Önce farkı oku, sonra her ifadenin hangisine ait olduğunu seç.</p>
      <ul class="satirlar">${ciftler.map((c, i) => `<li><button class="satir" data-cift="${i}"><span><span class="ad">${c.a.ad} / ${c.b.ad}</span><br><span class="alt">${c.sorular.length} ifade</span></span></button></li>`).join("")}</ul>
      <div class="dugmeler"><button class="dugme" data-hepsi>Hepsini karışık çalış</button></div>`;
    $$("[data-cift]", s).forEach((x) => (x.onclick = () => ciftCalis(b, s, [ciftler[+x.dataset.cift]])));
    $("[data-hepsi]", s).onclick = () => ciftCalis(b, s, ciftler, true);
  }
  function ciftCalis(b, s, ciftler, karisik) {
    let liste = []; ciftler.forEach((c) => c.sorular.forEach((q) => liste.push({ c, q })));
    liste = karistir(liste); let i = 0, d = 0, cev = null;
    const ciz = () => {
      if (i >= liste.length) {
        if (karisik || ciftler.length === b.ciftler.length) adimIsaretle(b.id, "ciftler");
        s.innerHTML = `<div class="kutu"><h3>${d} / ${liste.length} doğru</h3><div class="dugmeler"><button class="dugme" data-tekrar>Yeniden çalış</button><button class="dugme ikincil" data-liste>Listeye dön</button></div></div>`;
        $("[data-tekrar]", s).onclick = () => ciftCalis(b, s, ciftler, karisik); $("[data-liste]", s).onclick = () => ciftSekme(b, s); return;
      }
      const { c, q } = liste[i]; const secenek = [["a", c.a.ad], ["b", c.b.ad]].concat(c.ikisi ? [["ikisi", "İkisi de"]] : []);
      s.innerHTML = `<div class="ilerleme-yazi"><span>${karisik ? "Karışık" : kac(duz(c.a.ad)) + " / " + kac(duz(c.b.ad))}</span><span>${i + 1} / ${liste.length}</span></div>
        <div class="cift-kutu"><div><b>${c.a.ad}</b><br>${c.a.tanim}</div><div><b>${c.b.ad}</b><br>${c.b.tanim}</div></div>
        <div class="kutu"><div class="soru-metin">${q.ifade}</div>
          <div class="dugmeler">${secenek.map(([id, ad]) => `<button class="dugme ${cev === null || id !== q.cevap ? "ikincil" : ""}" data-c="${id}" ${cev !== null ? "disabled" : ""}>${ad}</button>`).join("")}</div>
          ${cev !== null ? `<div class="geri ${cev === q.cevap ? "" : "yanlis"}"><h3>${cev === q.cevap ? "Doğru." : "Yanlış."} ${q.cevap === "ikisi" ? "İkisi de" : c[q.cevap].ad}</h3>${q.neden ? `<p>${q.neden}</p>` : ""}${c.fark ? `<p class="kucuk"><b>Fark:</b> ${c.fark}</p>` : ""}</div>
            <div class="dugmeler"><button class="dugme" data-sonraki>Sonraki</button></div>` : ""}
        </div>`;
      $$("[data-c]", s).forEach((x) => (x.onclick = () => { cev = x.dataset.c; if (cev === q.cevap) d++; ciz(); }));
      const so = $("[data-sonraki]", s); if (so) { so.onclick = () => { cev = null; i++; ciz(); }; so.focus({ preventScroll: true }); }
    };
    ciz();
  }

  // ---------- formüller ----------
  function formulHTML(f) {
    return `<div class="kutu"><h3>${f.ad} ${f.sayfa ? `<span class="sayfa-no">${kac(f.sayfa)}</span>` : ""}</h3><div class="formul">${f.formul}</div>
      ${f.aciklama ? `<p>${f.aciklama}</p>` : ""}${f.ornek ? `<p class="soluk"><b>Örnek:</b> ${f.ornek}</p>` : ""}${f.tuzak ? `<div class="not"><b>Tuzak:</b> ${f.tuzak}</div>` : ""}</div>`;
  }
  function formulSekme(b, s) { s.innerHTML = (b.formuller || []).map(formulHTML).join(""); }

  // ---------- hesap atölyesi ----------
  function hesapSekme(b, s) { atolyeListe(s, S.atolye.filter((g) => g.bolum === b.id), location.hash, () => adimIsaretle(b.id, "hesap")); }
  function atolyeListe(s, gens, donus, bitince) {
    const st = oku("atolye", {});
    s.innerHTML = `<p class="soluk">Her soruda sayılar değişir. Cevapladıktan sonra adım adım çözüm açılır; yanlış şıklar sık yapılan hatalardan üretilir.</p>
      <div class="dugmeler"><button class="dugme" data-karisik>Karışık 10 soru</button></div>
      <ul class="satirlar">${gens.map((g) => { const e = st[g.id] || { d: 0, y: 0 }; return `<li><a class="satir" href="#atolye/${g.id}"><span><span class="ad">${g.ad}</span><br><span class="alt">${g.aciklama || ""}</span></span><span class="sag">${e.d + e.y ? `${e.d}/${e.d + e.y} doğru` : "yeni"}</span></a></li>`; }).join("")}</ul>`;
    $("[data-karisik]", s).onclick = () => atolyeCalis(s, gens, donus, 10, bitince);
  }
  function atolyeCalis(s, gens, donus, adet, bitince) {
    let i = 0, d = 0;
    const tek = gens.length === 1;
    const yeni = () => {
      if (adet && i >= adet) {
        if (bitince) bitince();
        s.innerHTML = `<div class="kutu"><h3>${d} / ${adet} doğru</h3><div class="dugmeler"><button class="dugme" data-tekrar>Yeni 10 soru</button><a class="dugme ikincil" href="${donus}">Listeye dön</a></div></div>`;
        $("[data-tekrar]", s).onclick = () => atolyeCalis(s, gens, donus, adet, bitince); return;
      }
      const g = tek ? gens[0] : gens[Math.floor(Math.random() * gens.length)];
      let q; try { q = g.uret(); } catch (e) { console.error(e); q = null; }
      if (!q) return yeni();
      q = Object.assign({ id: "atolye:" + g.id, kaynak: "atolye", bolum: g.bolum }, q);
      const sira = sikSirasi(q, true); let cev;
      const kaydet = (ok) => { const st = oku("atolye", {}); const e = st[g.id] || { d: 0, y: 0 }; ok ? e.d++ : e.y++; st[g.id] = e; yaz("atolye", st); if (ok) d++; };
      const ciz = () => {
        s.innerHTML = `<div class="ilerleme-yazi"><span>${g.ad}</span><span>${adet ? `${i + 1} / ${adet}` : `${d} doğru`}</span></div>
          <article class="kutu"><div class="soru-ust">${etiketler(q)}</div>${soruGovde(q)}
          <ul class="secenekler">${sira.map((asil, j) => `<li><button class="secenek ${cev === undefined ? "" : asil === q.dogru ? "dogru-sik" : asil === cev ? "yanlis-sik" : ""}" data-sik="${asil}" ${cev !== undefined ? "disabled" : ""}><span class="harf">${HARF[j]})</span><span class="metin">${q.secenekler[asil]}</span></button></li>`).join("")}</ul>
          ${cev !== undefined ? geriBildirimHTML(q, cev, sira) : ""}</article>
          <div class="dugmeler">${cev === undefined ? `<button class="dugme ikincil" data-bos>Çözümü göster</button>` : `<button class="dugme" data-yeni>${adet && i === adet - 1 ? "Sonucu gör" : "Yeni soru"}</button>`}<a class="dugme ikincil" href="${donus}">Listeye dön</a></div>`;
        $$("[data-sik]", s).forEach((x) => (x.onclick = () => { cev = +x.dataset.sik; kaydet(cev === q.dogru); ciz(); }));
        const bs = $("[data-bos]", s); if (bs) bs.onclick = () => { cev = null; kaydet(false); ciz(); };
        const yn = $("[data-yeni]", s); if (yn) { yn.onclick = () => { i++; yeni(); window.scrollTo({ top: 0 }); }; yn.focus({ preventScroll: true }); }
      };
      ciz();
    };
    yeni();
  }
  function atolyeSayfa(gid) {
    const k = $("#icerik");
    const gens = S.atolye.filter((g) => kapsamBolumleri().includes(g.bolum));
    if (gid) {
      const g = S.atolye.find((x) => x.id === gid); if (!g) { location.hash = "#atolye"; return; }
      k.innerHTML = `<a class="geri-link" href="#atolye">← Hesap Atölyesi</a><h1>${g.ad}</h1><div id="sekme"></div>`;
      const f = (S.bolumler[g.bolum].formuller || []).filter((x) => (g.formul || []).includes(x.id));
      atolyeCalis($("#sekme"), [g], "#atolye", 0);
      if (f.length) k.insertAdjacentHTML("beforeend", `<details class="kutu"><summary>Formülü hatırla</summary>${f.map(formulHTML).join("")}</details>`);
      return;
    }
    k.innerHTML = `<h1>Hesap Atölyesi</h1><p class="soluk">Sınavdaki hesap sorularının her türü, sayıları değişerek. Konu çalış'taki "Hesap" adımıyla aynı alıştırmalar; burada bütün bölümler bir arada.</p>
      <div class="dugmeler"><button class="dugme" data-hepsi>Tüm türlerden karışık 10 soru</button></div>
      ${kapsamBolumleri().map((bid) => { const gs = gens.filter((g) => g.bolum === bid); return gs.length ? `<h2>${bAd(bid)}: ${kac(S.bolumler[bid].baslik)}</h2><div data-b="${bid}"></div>` : ""; }).join("")}`;
    kapsamBolumleri().forEach((bid) => { const el = $(`[data-b="${bid}"]`, k); if (el) { atolyeListe(el, gens.filter((g) => g.bolum === bid), "#atolye"); const kb = $("[data-karisik]", el); if (kb) kb.parentElement.remove(); } });
    $("[data-hepsi]", k).onclick = () => { k.innerHTML = `<a class="geri-link" href="#atolye">← Hesap Atölyesi</a><h1>Karışık hesap</h1><div id="sekme"></div>`; atolyeCalis($("#sekme"), gens, "#atolye", 10); };
  }

  // ---------- bölüm içi testler ----------
  function testSekme(b, s) {
    testGiris(s, { metin: `${Q.konu(b.id).length} soru, sınavdaki gibi 5 şık. Cevabı seçince hemen doğru/yanlış, açıklama ve en güçlü çeldiricinin neden yanlış olduğu çıkar.`, ad: "konu:" + b.id, sorular: karistir(Q.konu(b.id)),
      ayar: { baslik: `${bAd(b.id)} konu testi`, mod: "anlik", karistirSik: true, donus: `#b/${b.id}/test`, kayitTur: "konuTest", bitince: () => adimIsaretle(b.id, "test"), sonraki: [`#b/${b.id}/gozden`, "Gözden Geçirelim"] } });
  }
  function gozdenSekme(b, s) {
    testGiris(s, { metin: `Kitabın ${bAd(b.id)} sonundaki ${Q.gozden(b.id).length} Gözden Geçirelim sorusu. Bu sorular ya da çok benzerleri sınavda çıkabiliyor. Kitaptaki sırayla gelir; her soruda kitabın cevap anahtarı da yazılı.`, ad: "gozden:" + b.id, sorular: Q.gozden(b.id),
      ayar: { baslik: `Gözden Geçirelim: ${bAd(b.id)}`, mod: "anlik", karistirSik: false, donus: `#b/${b.id}/gozden`, kayitTur: "gozdenTest", bitince: () => adimIsaretle(b.id, "gozden"), sonraki: [`#b/${b.id}/cikmis`, "Çıkmış"] } });
  }
  function cikmisSekme(b, s) {
    const qs = S.sorular.filter((q) => q.kaynak === "cikmis" && q.bolum === b.id);
    s.innerHTML = `<ul class="soluk">${[...new Set(qs.map((q) => q.sinav))].map((x) => `<li>${kac(x)}: ${qs.filter((q) => q.sinav === x).length} soru</li>`).join("")}</ul>`;
    testGiris(s, { metin: `Bu bölümün konusundan çıkmış ${qs.length} soru (vize, final ve bütünleme).`, ad: "cikmisb:" + b.id, sorular: qs,
      ayar: { baslik: `${bAd(b.id)} çıkmış sorular`, mod: "anlik", karistirSik: false, donus: `#b/${b.id}/cikmis`, bitince: () => adimIsaretle(b.id, "cikmis") } });
  }

  // ---------- 2. Çıkmış sorular ----------
  function cikmisSayfa(alt) {
    const k = $("#icerik");
    if (alt) {
      const a = decodeURIComponent(alt);
      let qs, ad, aciklama;
      if (a === "kapsam") { qs = karistir(Q.cikmisKapsam()); ad = `${kapsamAd()} konularından çıkmışların hepsi`; aciklama = "Bütün çıkmış sınavlardan, kapsamdaki bölümlerin soruları karışık sırayla."; }
      else if (a === "finalvize") { qs = Q.finalVize().sort((x, y) => x.sinav.localeCompare(y.sinav, "tr") || x.no - y.no); ad = "Finalde çıkmış vize soruları"; aciklama = "Final ve bütünleme sınavlarında çıkan, konusu Bölüm 1–3 olan sorular. Vize çalışırken bunları da çöz."; }
      else { qs = Q.cikmis().filter((q) => q.sinav === a).sort((x, y) => x.no - y.no); ad = a; aciklama = "Sorular sınavdaki sırayla ve şıklarla gelir. Doğru şık, sınav kâğıdındaki gibi fosforlu kalemle işaretlenir."; }
      if (!qs.length) { location.hash = "#cikmis"; return; }
      k.innerHTML = `<a class="geri-link" href="#cikmis">← Çıkmış sorular</a><h1>${kac(ad)}</h1>`;
      testGiris(k, { metin: `${qs.length} soru. ${aciklama}`, ad: "cikmis:" + a, sorular: qs, ayar: { baslik: ad, mod: "anlik", karistirSik: false, donus: "#cikmis/" + encodeURIComponent(a), kayitTur: "cikmisTest", sonraki: ["#gozden", "3. Gözden Geçirelim"] } });
      return;
    }
    const gecmis = oku("cikmisTest", []);
    const satir = (href, adi, alt_, n, anahtar_) => { const g = gecmis.filter((y) => y.ad === anahtar_); const en = g.length ? Math.max(...g.map((y) => yuzde(y.d, y.n))) : null;
      return `<li><a class="satir" href="${href}"><span><span class="ad">${kac(adi)}</span><br><span class="alt">${alt_}</span></span><span class="sag">${n} soru${en != null ? `<br>en iyi ${en}` : ""}</span></a></li>`; };
    const fv = kapsam() === "vize" ? Q.finalVize() : [];
    k.innerHTML = `<h1>2. Çıkmış sorular</h1>
      <p class="soluk">Önce gerçek sınav sorularını çöz: bir sonraki sınavın sorularının nasıl olacağını en iyi bunlar gösterir; bazen aynı soru tekrar çıkar. Her soruda anlık doğru/yanlış, açıklama ve kitap sayfası var.</p>
      <h2>${kac(kapsamAd())} sınavları</h2>
      <ul class="satirlar">${sinavListesi().map((s) => { const qs = Q.cikmis().filter((q) => q.sinav === s); return satir(`#cikmis/${encodeURIComponent(s)}`, s, `Bölüm ${[...new Set(qs.map((q) => S.bolumler[q.bolum]?.no))].sort().join(", ")}`, qs.length, s); }).join("")}</ul>
      ${fv.length ? `<h2>Finalde çıkmış vize soruları</h2><ul class="satirlar">${satir("#cikmis/finalvize", "Final ve bütünlemede çıkan vize konuları", [...new Set(fv.map((q) => q.sinav))].map(kac).join(", "), fv.length, "Finalde çıkmış vize soruları")}</ul>` : ""}
      <h2>Karışık</h2>
      <ul class="satirlar">${satir("#cikmis/kapsam", `${kapsamAd()} konularından çıkmışların hepsi`, "Bütün sınavlardan, karışık sırayla", Q.cikmisKapsam().length, `${kapsamAd()} konularından çıkmışların hepsi`)}</ul>
      ${S.ders.cikmisNot ? `<div class="not">${S.ders.cikmisNot}</div>` : ""}
      <div class="siradaki"><a class="dugme fosfor-d" href="#gozden">Sıradaki: 3. Gözden Geçirelim</a></div>`;
  }

  // ---------- 3. Gözden Geçirelim ----------
  function gozdenSayfa(bid) {
    const k = $("#icerik");
    if (bid) {
      const qs = Q.gozden(bid); if (!qs.length) { location.hash = "#gozden"; return; }
      k.innerHTML = `<a class="geri-link" href="#gozden">← Gözden Geçirelim</a><h1>Gözden Geçirelim: ${bAd(bid)}</h1><p class="soluk">${kac(S.bolumler[bid].baslik)}</p>`;
      const sb = kapsamBolumleri().filter((x) => Q.gozden(x).length)[kapsamBolumleri().filter((x) => Q.gozden(x).length).indexOf(bid) + 1];
      testGiris(k, { metin: `${qs.length} soru, kitaptaki sırayla. Her soruda kitabın cevap anahtarı yazılı; anahtarda hata varsa ayrıca belirtildi.`, ad: "gozden:" + bid, sorular: qs,
        ayar: { baslik: `Gözden Geçirelim: ${bAd(bid)}`, mod: "anlik", karistirSik: false, donus: "#gozden/" + bid, kayitTur: "gozdenTest", bitince: () => S.bolumler[bid].hazir && adimIsaretle(bid, "gozden"), sonraki: sb ? [`#gozden/${sb}`, `Gözden Geçirelim ${bAd(sb)}`] : ["#tahmin", "4. Tahmini denemeler"] } });
      return;
    }
    k.innerHTML = `<h1>3. Gözden Geçirelim</h1>
      <p class="soluk">Kitabın her bölüm sonundaki soruları. Sınavda bunlar ya da çok benzerleri çıkabiliyor (2025-26 finalin 17. sorusu, Bölüm 5'in 3. sorusunun aynı tipi). Sorular kitaptaki bilgi ve sayılarla, kendi ifademizle yazıldı; numara ve cevap anahtarı kitaptaki gibi.</p>
      <ul class="satirlar">${kapsamBolumleri().filter((id) => Q.gozden(id).length).map((id) => { const sd = soruDurum(Q.gozden(id));
        return `<li><a class="satir" href="#gozden/${id}"><span class="no">${S.bolumler[id].no}</span><span style="flex:1"><span class="ad">${kac(S.bolumler[id].baslik)}</span><br><span class="alt">${sd.toplam} soru · çözdüğün ${sd.cozulen}${sd.cozulen ? ` · ilk denemede doğru ${sd.dogru}` : ""}</span>
          <span class="cubuk" style="margin-top:6px"><i style="width:${yuzde(sd.cozulen, sd.toplam)}%"></i></span></span></a></li>`; }).join("")}</ul>
      <div class="siradaki"><a class="dugme fosfor-d" href="#tahmin">Sıradaki: 4. Tahmini denemeler</a></div>`;
  }

  // ---------- 4. Tahmini denemeler ----------
  function tahminSayfa(alt) {
    const k = $("#icerik");
    const tum = Q.tahmin();
    if (alt) {
      const qs = alt === "hepsi" ? karistir(tum.filter(kapsamda)) : tum.filter((q) => q.deneme === alt);
      if (!qs.length) { location.hash = "#tahmin"; return; }
      const ad = alt === "hepsi" ? "Tahmini soruların hepsi" : qs[0].denemeAd;
      k.innerHTML = `<a class="geri-link" href="#tahmin">← Tahmini denemeler</a><h1>${kac(ad)}</h1>`;
      testGiris(k, { metin: `${qs.length} soru, çıkmış sınavın biçiminde. Bunlar tahmindir; sınavda çıkacağı garanti değil.`, ad: "tahmin:" + alt, sorular: qs,
        ayar: { baslik: ad, mod: "anlik", karistirSik: true, donus: "#tahmin/" + alt, kayitTur: "tahminTest", sonraki: ["#deneme", "5. Deneme sınavı"] } });
      return;
    }
    const gecmis = oku("tahminTest", []);
    const den = denemelerKapsamda();
    k.innerHTML = `<h1>4. Tahmini denemeler</h1>
      <p class="soluk">Çıkmış sınavın biçiminde (5 şık, öncüllü ve hesap soruları) ama henüz sorulmamış konulardan yazıldı. Tahmindir; gerçek sınavda çıkacağı garanti değildir.</p>
      <ul class="satirlar">${den.map((x) => { const qs = tum.filter((q) => q.deneme === x); const g = gecmis.filter((y) => y.ad === qs[0].denemeAd); const en = g.length ? Math.max(...g.map((y) => yuzde(y.d, y.n))) : null;
        return `<li><a class="satir" href="#tahmin/${x}"><span><span class="ad">${kac(qs[0].denemeAd)}</span><br><span class="alt">${qs.length} soru</span></span><span class="sag">${en != null ? "en iyi " + en : ""}</span></a></li>`; }).join("")}
        <li><a class="satir" href="#tahmin/hepsi"><span><span class="ad">Hepsi karışık</span><br><span class="alt">${kac(kapsamAd())} kapsamındaki tüm tahmini sorular</span></span><span class="sag">${tum.filter(kapsamda).length} soru</span></a></li></ul>
      ${!den.length ? `<p class="bos">${kac(kapsamAd())} için tahmini deneme henüz hazırlanmadı.</p>` : ""}
      <div class="siradaki"><a class="dugme fosfor-d" href="#deneme">Sıradaki: 5. Deneme sınavı</a></div>`;
  }

  // ---------- 5. Deneme sınavı ----------
  function denemeSayfa() {
    const k = $("#icerik");
    const ayar = S.ders.kapsamlar[kapsam()].deneme;
    const dv = devamVarsa("deneme:" + kapsam());
    const gecmis = oku("denemeler", []).filter((x) => x.kapsam === kapsam());
    k.innerHTML = `<h1>5. Deneme sınavı</h1>
      <p class="soluk">${kac(kapsamAd())} için ${ayar.soru} soru, gerçek sınavın bölüm dağılımıyla: ${Object.entries(ayar.dagilim).map(([b, n]) => `${bAd(b)}'den ${n}`).join(", ")}. Sınav bitene kadar doğru cevap gösterilmez.</p>
      ${dv ? `<div class="kutu"><p>Yarım kalmış bir denemen var (soru ${dv.T.i + 1} / ${dv.T.ids.length}).</p><div class="dugmeler"><button class="dugme" data-devam>Kaldığın yerden devam et</button></div></div>` : ""}
      <form class="kutu" data-ayar>
        <label class="secim">Süre <input class="girdi" type="number" name="sure" min="5" max="180" value="${oku("denemeSure", ayar.sureDk)}" style="width:5em"> dakika</label>
        <p class="kucuk soluk" style="margin:0 0 8px">${kac(ayar.sureNot || "")}</p>
        <label class="secim"><input type="checkbox" name="cikmis" checked> Çıkmış sorular</label>
        <label class="secim"><input type="checkbox" name="gozden" checked> Gözden Geçirelim soruları</label>
        <label class="secim"><input type="checkbox" name="tahmin" checked> Tahmini sorular</label>
        <label class="secim"><input type="checkbox" name="konu" checked> Konu testi soruları</label>
        <label class="secim"><input type="checkbox" name="yeni" checked> Önce hiç çözmediğim sorular</label>
        <div class="dugmeler"><button class="dugme">${dv ? "Yeni deneme başlat" : "Sınavı başlat"}</button></div>
      </form>
      ${gecmis.length ? `<h2>Önceki denemeler</h2><div class="kutu"><table class="veri rapor-tablo" style="width:100%"><tr><th>Tarih</th><th>Süre</th><th>Puan</th></tr>${gecmis.slice().reverse().map((x) => `<tr><td>${new Date(x.t).toLocaleDateString("tr-TR")}</td><td>${Math.round(x.sureSn / 60)} dk</td><td><b>${yuzde(x.d, x.n)}</b></td></tr>`).join("")}</table></div>` : ""}`;
    const d = $("[data-devam]", k); if (d) d.onclick = () => devamEt("deneme:" + kapsam());
    $("[data-ayar]", k).onsubmit = (e) => {
      e.preventDefault(); const f = e.target; const kaynaklar = ["cikmis", "gozden", "tahmin", "konu"].filter((x) => f[x].checked);
      if (!kaynaklar.length) return; const sure = Math.max(5, +f.sure.value || ayar.sureDk); yaz("denemeSure", sure);
      const st = oku("soru", {}); const secilen = [];
      Object.entries(ayar.dagilim).forEach(([b, n]) => {
        const havuz = karistir(S.sorular.filter((q) => q.bolum === b && kaynaklar.includes(q.kaynak)));
        if (f.yeni.checked) havuz.sort((a, z) => (st[a.id] ? 1 : 0) - (st[z.id] ? 1 : 0));
        secilen.push(...havuz.slice(0, n));
      });
      if (!secilen.length) return;
      LS.del(anahtar("devam:deneme:" + kapsam()));
      testBaslat({ baslik: `Deneme sınavı (${kapsamAd()})`, sorular: karistir(secilen), mod: "sinav", sureDk: sure, karistirSik: true, devamAnahtar: "deneme:" + kapsam(), donus: "#deneme", kayitTur: "denemeler" });
    };
  }

  // ---------- günün tekrarı ----------
  function tekrarSayfa() {
    const k = $("#icerik");
    const kartlar = bekleyenKartlar(); const sorular = yanlisBekleyen().map((id) => S.soruIndex[id]).filter(kapsamda);
    k.innerHTML = `<h1>Günün tekrarı</h1><p class="soluk">Bilmediğin kartlar ertesi gün, yanlış yaptığın sorular 1, 3, 7 ve 14 gün sonra buraya gelir. Her gün birkaç dakika yeter.</p><div id="sekme"></div>`;
    const s = $("#sekme");
    if (!kartlar.length && !sorular.length) {
      s.innerHTML = `<div class="kutu bos"><p>Bugün tekrar zamanı gelen kart ya da soru yok.</p><div class="dugmeler" style="justify-content:center"><a class="dugme" href="#">Çalışma yoluna dön</a></div></div>`; return;
    }
    const sorulara = () => {
      if (!sorular.length) { s.innerHTML = `<div class="kutu"><h3>Tekrar bitti</h3><p>Bugünlük bu kadar.</p><a class="dugme" href="#">Ana sayfaya dön</a></div>`; menuCiz(); return; }
      testBaslat({ baslik: "Günün tekrarı: sorular", sorular: karistir(sorular), mod: "anlik", karistirSik: true, tekrarModu: true, donus: "#tekrar" });
    };
    s.innerHTML = `<div class="kutu"><p>${kartlar.length} kart ve ${sorular.length} soru tekrar zamanında. Önce kartlar, sonra daha önce yanlış yaptığın sorular.</p>
      <div class="dugmeler"><button class="dugme" data-basla>Başla</button></div></div>`;
    $("[data-basla]", s).onclick = () => (kartlar.length ? kartSekme(null, s, karistir(kartlar), sorulara) : sorulara());
  }

  // ---------- yanlış defteri ----------
  function yanlisSayfa() {
    const k = $("#icerik"); const yd = oku("yanlis", {});
    const ids = Object.keys(yd).filter((id) => S.soruIndex[id] && kapsamda(S.soruIndex[id]));
    const acik = ids.filter((id) => !yd[id].ogrenildi).sort((a, z) => yd[z].sayi - yd[a].sayi);
    const ogr = ids.filter((id) => yd[id].ogrenildi);
    const gun = (t) => { const g = Math.ceil((t - simdi()) / GUN); return g <= 0 ? "bugün" : g === 1 ? "yarın" : g + " gün sonra"; };
    const kay = { cikmis: "çıkmış", gozden: "Gözden Geçirelim", tahmin: "tahmin", konu: "konu testi" };
    k.innerHTML = `<h1>Yanlış defterim</h1>
      <p class="soluk">Yanlış yaptığın soru 1 gün sonra yeniden gelir. Doğru bildikçe aralık 3, 7 ve 14 güne çıkar; 14 gün sonra da doğruysa öğrenildi sayılır.</p>
      ${acik.length ? `<div class="dugmeler"><button class="dugme" data-hepsi>Açıkların hepsini şimdi çöz (${acik.length})</button></div>` : `<p class="bos">Açık yanlışın yok.</p>`}
      <ul class="satirlar">${acik.map((id) => { const q = S.soruIndex[id]; const metin = duz((q.soru || "") + " " + (q.kok || ""));
        return `<li><div class="satir"><span style="flex:1"><span class="alt">${bAd(q.bolum)} · ${kay[q.kaynak] || ""} · ${yd[id].sayi} kez yanlış</span><br>${kac(metin.slice(0, 120))}${metin.length > 120 ? "…" : ""}</span><span class="sag">${gun(yd[id].sonraki)}</span></div></li>`; }).join("")}</ul>
      ${ogr.length ? `<p class="soluk">Öğrenildi: ${ogr.length} soru.</p>` : ""}`;
    const h = $("[data-hepsi]", k); if (h) h.onclick = () => testBaslat({ baslik: "Yanlış defteri", sorular: acik.map((id) => S.soruIndex[id]), mod: "anlik", karistirSik: true, donus: "#yanlis" });
  }

  // ---------- sınav öncesi özet ----------
  function ozetSayfa() {
    const k = $("#icerik");
    const bl = kapsamBolumleri().map((id) => S.bolumler[id]).filter((b) => b.hazir);
    k.innerHTML = `<h1>${kac(kapsamAd())} özeti</h1>
      <div class="dugmeler"><button class="dugme" onclick="window.print()">Yazdır ya da PDF olarak kaydet</button></div>
      ${bl.map((b) => `<section class="kutu"><h2>${bAd(b.id)}: ${kac(b.baslik)}</h2>
        ${b.akildaKalsin ? `<ul>${b.akildaKalsin.map((x) => `<li>${x}</li>`).join("")}</ul>` : ""}
        ${(b.formuller || []).length ? `<h3>Formüller</h3>${b.formuller.map((f) => `<p><b>${f.ad}:</b></p><div class="formul">${f.formul}</div>`).join("")}` : ""}
        ${(b.ciftler || []).length ? `<h3>Karıştırma</h3><ul>${b.ciftler.map((c) => `<li><b>${c.a.ad} / ${c.b.ad}:</b> ${c.fark}</li>`).join("")}</ul>` : ""}
      </section>`).join("")}`;
  }

  // ---------- ayarlar ----------
  function ayarSayfa() {
    const k = $("#icerik"); const t = oku("sinavTarihi", {});
    k.innerHTML = `<h1>Ayarlar ve yedek</h1>
      <div class="kutu"><h2>Sınav tarihleri</h2><form data-tarih>${Object.entries(S.ders.kapsamlar).map(([id, x]) => `<label class="secim">${kac(x.ad)} <input class="girdi" type="date" name="${id}" value="${t[id] || ""}"></label>`).join("")}
        <div class="dugmeler"><button class="dugme">Tarihleri kaydet</button></div></form></div>
      <div class="kutu"><h2>Görünüm</h2><p class="soluk">Defter: tahta menü ve açık defter sayfası. Gece ve Tahta: koyu temalar. Seçim bu cihazdaki bütün derslerde geçerli.</p>${temaSecHTML()}</div>
      <div class="kutu"><h2>Kişi</h2><p>Şu an: <b>${kac(profil())}</b></p><button class="dugme ikincil" data-kisi>Kişiyi değiştir</button></div>
      <div class="kutu"><h2>Yedek</h2><p class="soluk">İlerleme bu tarayıcıda tutulur. Başka cihaza geçerken yedeği indir, öbür cihazda geri yükle.</p>
        <div class="dugmeler"><button class="dugme" data-indir>Yedeği indir</button><label class="dugme ikincil">Yedekten geri yükle<input type="file" accept="application/json" data-yukle hidden></label></div>
        <p data-mesaj class="kucuk"></p></div>
      <div class="kutu"><h2>Bu dersteki ilerlemeyi sıfırla</h2><p class="soluk">Kartlar, sorular, yanlış defteri ve denemeler silinir.</p><button class="dugme ikincil" data-sifirla>Sıfırla</button></div>`;
    temaBagla(k);
    $("[data-tarih]", k).onsubmit = (e) => { e.preventDefault(); const v = {}; Object.keys(S.ders.kapsamlar).forEach((id) => { if (e.target[id].value) v[id] = e.target[id].value; }); yaz("sinavTarihi", v); location.hash = ""; };
    const onek = `ankuzef:${profil()}:${S.ders.kod}:`;
    $("[data-indir]", k).onclick = () => {
      const veri = { surum: 1, profil: profil(), ders: S.ders.kod, tarih: new Date().toISOString(), veri: {} };
      LS.keys().filter((x) => x.startsWith(onek)).forEach((x) => (veri.veri[x.slice(onek.length)] = LS.get(x)));
      const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(veri)], { type: "application/json" }));
      a.download = `ankuzef-${S.ders.kod}-${profil()}-${new Date().toISOString().slice(0, 10)}.json`; a.click();
    };
    $("[data-yukle]", k).onchange = async (e) => {
      const m = $("[data-mesaj]", k);
      try { const v = JSON.parse(await e.target.files[0].text()); if (v.ders !== S.ders.kod || !v.veri) throw 0; Object.entries(v.veri).forEach(([x, y]) => LS.set(onek + x, y)); m.textContent = `Yedek yüklendi (${v.profil}, ${new Date(v.tarih).toLocaleDateString("tr-TR")}).`; menuCiz(); }
      catch (er) { m.textContent = "Bu dosya bu dersin yedeği değil. Ayarlar'dan indirdiğin .json dosyasını seç."; }
    };
    const sf = $("[data-sifirla]", k);
    sf.onclick = () => { if (!sf.dataset.emin) { sf.dataset.emin = 1; sf.textContent = "Emin misin? Silmek için yeniden dokun"; return; } LS.keys().filter((x) => x.startsWith(onek)).forEach(LS.del); location.hash = ""; };
    $("[data-kisi]", k).onclick = () => { LS.del("ankuzef:profil"); location.hash = ""; dersBaslat(); };
  }

  // ---------- yönlendirme ----------
  function yonlendir() {
    const { yol, a, b } = aktifYol();
    menuKapat(); window.scrollTo({ top: 0 });
    ({ "": pano, konu: konuSayfa, b: () => bolum(a, b), cikmis: () => cikmisSayfa(a), gozden: () => gozdenSayfa(a), tahmin: () => tahminSayfa(a), deneme: denemeSayfa, atolye: () => atolyeSayfa(a), tekrar: tekrarSayfa, yanlis: yanlisSayfa, ozet: ozetSayfa, ayar: ayarSayfa }[yol] || pano)();
    menuCiz();
  }
  async function dersBaslat() {
    const kok = $("#uygulama");
    if (!profil()) {
      kok.innerHTML = `<div class="tek"><a class="marka" href="../">${AY}<span>ANKUZEF Defteri</span></a><main class="defter">${profilSecHTML()}</main></div>`;
      profilBagla(kok, dersBaslat); return;
    }
    kok.innerHTML = `<div class="kabuk">
        <aside class="menu" id="menu" aria-label="Menü"></aside>
        <div class="ana-sutun">
          <header class="ust-bar"><button class="menu-ac" aria-controls="menu" aria-expanded="false">☰ Menü</button><span class="baslik">ANKUZEF Defteri</span></header>
          <div class="ana"><main class="defter" id="icerik"><p class="bos">Yükleniyor…</p></main></div>
        </div>
      </div>`;
    $(".menu-ac").onclick = () => ($("#menu").classList.contains("acik") ? menuKapat() : menuAc());
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") menuKapat(); });
    try { if (!S.ders) await dersYukle(); }
    catch (e) { $("#icerik").innerHTML = `<p class="bos">Ders verisi yüklenemedi (${kac(e.message)}). Sayfayı yenile.</p>`; return; }
    document.title = S.ders.ad + " · ANKUZEF Defteri";
    window.onhashchange = yonlendir; yonlendir();
    // Aynı adrese giden bağlantı hashchange tetiklemez; elle yönlendir.
    if (!dersBaslat.bagli) {
      dersBaslat.bagli = true;
      document.addEventListener("click", (e) => {
        const a = e.target.closest && e.target.closest('a[href^="#"]');
        if (a && a.getAttribute("href") === (location.hash || "#")) { e.preventDefault(); yonlendir(); }
      });
    }
  }

  window.ANKUZEF = { $, karistir };
  document.addEventListener("DOMContentLoaded", () => (document.body.dataset.sayfa === "ana" ? anaSayfa() : dersBaslat()));
})();
