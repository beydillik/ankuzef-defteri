/* ANKUZEF Defteri — ortak motor
   Ders sayfası: <body data-ders="isan"> ; ana sayfa: <body data-sayfa="ana">
   Veri: <kod>/ders.json, <kod>/bolumler/*.json, <kod>/sorular/*.json, isteğe bağlı <kod>/atolye.js (window.ATOLYE)
   İlerleme kişiye özel: localStorage "ankuzef:<profil>:<ders>:<anahtar>" */
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
  const karistir = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const simdi = () => Date.now();
  const yuzde = (d, t) => (t ? Math.round((d / t) * 100) : 0);
  const LS = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* depolama kapalı olabilir */ } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { } },
    keys() { try { return Object.keys(localStorage); } catch (e) { return []; } },
  };

  // ---------- profil ----------
  const PROFIL_VARSAYILAN = ["Şengül", "Kemal"];
  const profiller = () => LS.get("ankuzef:profiller", PROFIL_VARSAYILAN);
  const profil = () => LS.get("ankuzef:profil", null);

  function profilSecHTML(geriDon) {
    const p = profiller();
    return `<div class="kutu"><h2>Kim çalışıyor?</h2>
      <p class="soluk">İlerleme, yanlış defteri ve tekrar takvimi kişiye göre ayrı tutulur. Bu cihazda seçtiğin kişi hatırlanır.</p>
      <div class="dugmeler">${p.map((x) => `<button class="dugme ikincil" data-profil="${kac(x)}">${kac(x)}</button>`).join("")}</div>
      <form class="dugmeler" data-profil-ekle><input class="girdi" name="ad" placeholder="Yeni kişi adı" maxlength="20" aria-label="Yeni kişi adı"><button class="dugme ikincil">Kişi ekle</button></form>
    </div>`;
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
  function ustSerit(baslikHTML) {
    const p = profil();
    return `<header class="ust"><a class="logo" href="../">ANKUZEF <b>Defteri</b></a><span class="bosluk"></span>${baslikHTML || ""}
      ${p ? `<button class="profil-cip" data-profil-degis title="Kişiyi değiştir">${kac(p)}</button>` : ""}</header>`;
  }

  // =====================================================================
  // ANA SAYFA
  // =====================================================================
  async function anaSayfa() {
    const kok = $("#uygulama");
    const dersler = await (await fetch("dersler.json", { cache: "no-cache" })).json();
    const ciz = () => {
      const p = profil();
      if (!p) { kok.innerHTML = ustSerit() + `<main class="sayfa">${profilSecHTML()}</main>`; profilBagla(kok, ciz); return; }
      kok.innerHTML = ustSerit() + `<main class="sayfa">
        <h1>Merhaba ${kac(p)}</h1>
        <p class="soluk">Ders seç. Her derste konu özeti, kavram kartları, çıkmış sorular, tahmini denemeler ve hesap alıştırmaları var.</p>
        <ul class="satirlar">${dersler.map((d) => {
          const benim = !d.ogrenciler || d.ogrenciler.includes(p);
          return `<li><a class="satir ${d.hazir ? "" : "kapali"}" href="${d.hazir ? d.kod + "/" : "#"}">
            <span><span class="ad">${kac(d.ad)}</span><br><span class="alt">${kac(d.kodu || "")} ${d.ogrenciler ? "· " + d.ogrenciler.map(kac).join(", ") + " alıyor" : ""}</span></span>
            <span class="sag">${d.hazir ? (benim ? "Aç" : "Göz at") : "Hazırlanıyor"}</span></a></li>`;
        }).join("")}</ul>
        <p class="alt-bilgi">İlerleme bu tarayıcıda saklanır. Cihaz değiştirirken ders içindeki Ayarlar'dan yedek al.</p>
      </main>`;
      $("[data-profil-degis]").onclick = () => { LS.del("ankuzef:profil"); ciz(); };
    };
    ciz();
  }

  // =====================================================================
  // DERS SAYFASI
  // =====================================================================
  const S = { ders: null, bolumler: {}, sira: [], sorular: [], soruIndex: {}, atolye: [] };
  const anahtar = (k) => `ankuzef:${profil()}:${S.ders.kod}:${k}`;
  const oku = (k, d) => LS.get(anahtar(k), d);
  const yaz = (k, v) => LS.set(anahtar(k), v);

  async function dersYukle(kod) {
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

  // ---------- kapsam ----------
  const kapsam = () => oku("kapsam", S.ders.varsayilanKapsam || "vize");
  const kapsamBolumleri = () => S.ders.kapsamlar[kapsam()].bolumler;
  const kapsamAd = () => S.ders.kapsamlar[kapsam()].ad;
  const kapsamda = (q) => kapsamBolumleri().includes(q.bolum);

  // ---------- kayıt: sorular ve yanlış defteri ----------
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
  const yanlisAcik = () => { const yd = oku("yanlis", {}); return Object.keys(yd).filter((id) => S.soruIndex[id] && !yd[id].ogrenildi); };

  // ---------- kayıt: kartlar ----------
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
    const out = [];
    kapsamBolumleri().forEach((bid) => { const kt = oku("kart", {}); (S.bolumler[bid].kartlar || []).forEach((k) => { const e = kt[kartAnahtar(bid, k.ad)]; if (e && e.sonraki <= simdi()) out.push({ bid, k }); }); });
    return out;
  }
  function soruDurum(liste) {
    const st = oku("soru", {}); let cozulen = 0, dogru = 0;
    liste.forEach((q) => { const e = st[q.id]; if (e) { cozulen++; if (e.ilk) dogru++; } });
    return { toplam: liste.length, cozulen, dogru };
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
      if (q.sinavTur && q.sinavTur !== "Vize" && S.ders.kapsamlar.vize.bolumler.includes(q.bolum)) e.push(`<span class="etiket">${kac(q.sinavTur)}'de çıkan vize konusu</span>`);
    } else if (q.kaynak === "tahmin") e.push(`<span class="etiket tahmin">Tahmin · henüz sorulmadı</span>`);
    else if (q.kaynak === "atolye") e.push(`<span class="etiket">Hesap Atölyesi</span>`);
    else e.push(`<span class="etiket">Konu testi</span>`);
    if (q.bolum && S.bolumler[q.bolum]) e.push(`<span>Bölüm ${S.bolumler[q.bolum].no}</span>`);
    return e.join("");
  }
  function soruGovde(q) {
    const sm = q.soru ? `<div class="soru-metin">${q.soru}</div>` : "";
    return `${q.tabloOnce ? tabloHTML(q.tablo) + sm : sm + tabloHTML(q.tablo)}
      ${q.onculler ? `<ul class="onculler">${q.onculler.map((o, i) => `<li><b>${["I", "II", "III", "IV"][i]}.</b> ${o}</li>`).join("")}</ul>` : ""}
      ${q.kok ? `<div class="soru-metin">${q.kok}</div>` : ""}`;
  }
  // sira: ekrandaki konum -> asıl şık indeksi
  function sikSirasi(q, karistirSik) { const s = q.secenekler.map((_, i) => i); return karistirSik && !q.sabitSik ? karistir(s) : s; }
  function geriBildirimHTML(q, secilenAsil, sira) {
    const dogruMu = secilenAsil === q.dogru;
    const dogruHarf = HARF[sira.indexOf(q.dogru)];
    const b = q.bolum && S.bolumler[q.bolum];
    return `<div class="geri ${dogruMu ? "" : "yanlis"}" role="status">
      <h3>${dogruMu ? "Doğru." : secilenAsil == null ? "Boş bıraktın." : "Yanlış."} Cevap ${dogruHarf}) ${q.secenekler[q.dogru]}</h3>
      ${q.aciklama ? `<p>${q.aciklama}</p>` : ""}
      ${q.celdirici ? `<p><b>Çeldirici:</b> ${q.celdirici}</p>` : ""}
      ${q.cozum ? `<ol class="adimlar">${q.cozum.map((x) => `<li>${x}</li>`).join("")}</ol>` : ""}
      ${q.kitapNotu ? `<div class="not">${q.kitapNotu}</div>` : ""}
      <p class="kucuk soluk">${q.sayfa ? "Kitap: " + kac(q.sayfa) : ""}${b && b.hazir ? ` · <a href="#b/${b.id}/ozet">Bölüm ${b.no} özetine bak</a>` : ""}</p>
    </div>`;
  }

  // ---------- test çalıştırıcı ----------
  // ayar: {baslik, sorular, mod: "anlik"|"sinav", sureDk, karistirSik, tekrarModu, devamAnahtar, donus}
  function testBaslat(ayar) {
    const kok = $("#icerik");
    const T = ayar.devam || {
      ids: ayar.sorular.map((q) => q.id), i: 0, cevap: {}, sira: {}, bitti: false, basla: simdi(),
    };
    ayar.sorular.forEach((q) => { if (!T.sira[q.id]) T.sira[q.id] = sikSirasi(q, ayar.karistirSik); });
    const sor = (id) => S.soruIndex[id] || ayar.sorular.find((q) => q.id === id);
    const sakla = () => { if (ayar.devamAnahtar) yaz("devam:" + ayar.devamAnahtar, { T, ayar: Object.assign({}, ayar, { sorular: undefined, devam: undefined }) }); };
    const sil = () => ayar.devamAnahtar && LS.del(anahtar("devam:" + ayar.devamAnahtar));
    let saat = null;

    function ciz() {
      if (T.bitti) return rapor();
      const q = sor(T.ids[T.i]); const sira = T.sira[q.id]; const cev = T.cevap[q.id];
      const anlikCevapli = ayar.mod === "anlik" && cev !== undefined;
      kok.innerHTML = `<div class="ilerleme-yazi"><span>${kac(ayar.baslik)}</span><span>Soru ${T.i + 1} / ${T.ids.length}${ayar.mod === "sinav" ? ` · <span class="sayac" data-saat></span>` : ""}</span></div>
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
      $$("[data-sik]", kok).forEach((b) => (b.onclick = () => {
        const asil = +b.dataset.sik;
        if (ayar.mod === "anlik") { T.cevap[q.id] = asil; soruKaydet(q, asil === q.dogru, ayar.tekrarModu); }
        else T.cevap[q.id] = T.cevap[q.id] === asil ? undefined : asil;
        sakla(); ciz();
        if (ayar.mod === "anlik") { const g = $(".geri", kok); if (g) g.scrollIntoView({ block: "nearest", behavior: "smooth" }); }
      }));
      const bos = $("[data-bos]", kok); if (bos) bos.onclick = () => { T.cevap[q.id] = null; soruKaydet(q, false, ayar.tekrarModu); sakla(); ciz(); };
      const on = $("[data-onceki]", kok); if (on) on.onclick = () => { T.i--; sakla(); ciz(); };
      const so = $("[data-sonraki]", kok); if (so) so.onclick = () => { if (T.i === T.ids.length - 1) bitir(); else { T.i++; sakla(); ciz(); window.scrollTo({ top: 0 }); } };
      const bt = $("[data-bitir]", kok); if (bt) bt.onclick = () => { const bosSay = T.ids.filter((id) => T.cevap[id] === undefined).length; if (!bosSay || confirmBos(bosSay)) bitir(); };
      $$("[data-git]", kok).forEach((b) => (b.onclick = () => { T.i = +b.dataset.git; sakla(); ciz(); }));
      if (ayar.mod === "sinav") saatGuncelle();
    }
    function confirmBos(n) { // tarayıcı diyaloğu yerine satır içi onay
      const d = $("[data-bitir]", kok); if (d.dataset.emin) return true;
      d.dataset.emin = "1"; d.textContent = `${n} boş soru var. Yine de bitir`; return false;
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
      T.ozet = { d, bol }; rapor();
    }
    function rapor() {
      const n = T.ids.length; const d = T.ozet ? T.ozet.d : T.ids.filter((id) => T.cevap[id] === sor(id).dogru).length;
      const puan = yuzde(d, n); const yanlislar = T.ids.filter((id) => T.cevap[id] !== sor(id).dogru);
      const bol = T.ozet ? T.ozet.bol : {};
      kok.innerHTML = `<h2>${kac(ayar.baslik)}: sonuç</h2>
        <div class="kutu"><p style="font-size:2rem;font-weight:700;margin:0">${puan} <span class="soluk" style="font-size:1rem">/ 100 · ${d} doğru, ${n - d} yanlış ya da boş</span></p>
          <div class="hedef" title="Hedef çizgisi: ${HEDEF}"><i style="width:${puan}%"></i><s></s></div>
          <p class="kucuk soluk">Sarı çizgi hedefin: ${HEDEF}. ${puan >= HEDEF ? "Hedefin üstündesin." : `Hedefe ${Math.ceil(((HEDEF - puan) / 100) * n)} doğru daha.`}${ayar.mod === "sinav" ? " Puan, her sorunun eşit değerde ve yanlışın doğruyu götürmediği varsayımıyla hesaplandı." : ""}</p>
        </div>
        ${Object.keys(bol).length > 1 ? `<div class="kutu"><h3>Bölümlere göre</h3><table class="veri rapor-tablo" style="width:100%"><tr><th>Bölüm</th><th>Doğru</th></tr>
          ${Object.entries(bol).map(([b, [x, t]]) => `<tr><td>${S.bolumler[b] ? `Bölüm ${S.bolumler[b].no}: ${kac(S.bolumler[b].baslik)}` : "Diğer"}</td><td>${x} / ${t}</td></tr>`).join("")}</table></div>` : ""}
        <div class="dugmeler">
          ${yanlislar.length ? `<button class="dugme" data-yeniden>Yanlışları yeniden çöz (${yanlislar.length})</button>` : ""}
          <a class="dugme ikincil" href="${ayar.donus || "#"}">Geri dön</a>
        </div>
        ${ayar.mod === "sinav" && yanlislar.length ? `<h3>Yanlışların ve boşların</h3>${yanlislar.map((id) => { const q = sor(id); const sira = T.sira[id];
          return `<article class="kutu"><div class="soru-ust">${etiketler(q)}</div>${soruGovde(q)}
            <ul class="secenekler">${sira.map((asil, j) => `<li><div class="secenek ${asil === q.dogru ? "dogru-sik" : asil === T.cevap[id] ? "yanlis-sik" : ""}"><span class="harf">${HARF[j]})</span><span class="metin">${q.secenekler[asil]}</span></div></li>`).join("")}</ul>
            ${geriBildirimHTML(q, T.cevap[id] ?? null, sira)}</article>`; }).join("")}` : ""}`;
      const y = $("[data-yeniden]", kok);
      if (y) y.onclick = () => testBaslat({ baslik: "Yanlışlar: " + ayar.baslik, sorular: yanlislar.map(sor), mod: "anlik", karistirSik: true, tekrarModu: false, donus: ayar.donus });
      window.scrollTo({ top: 0 });
    }
    ciz();
  }
  function devamVarsa(anahtarAd) { const v = oku("devam:" + anahtarAd, null); return v && v.T && !v.T.bitti ? v : null; }
  function devamEt(anahtarAd) {
    const v = devamVarsa(anahtarAd); if (!v) return false;
    const sorular = v.T.ids.map((id) => S.soruIndex[id]).filter(Boolean);
    if (sorular.length !== v.T.ids.length) { LS.del(anahtar("devam:" + anahtarAd)); return false; }
    testBaslat(Object.assign({}, v.ayar, { sorular, devam: v.T })); return true;
  }

  // =====================================================================
  // GÖRÜNÜMLER
  // =====================================================================
  function pano() {
    const k = $("#icerik");
    const bek = yanlisBekleyen().length + bekleyenKartlar().length;
    const den = oku("denemeler", []).filter((x) => x.kapsam === kapsam());
    const son = den.slice(-3); const ort = son.length ? Math.round(son.reduce((a, x) => a + yuzde(x.d, x.n), 0) / son.length) : null;
    const tarih = oku("sinavTarihi", {})[kapsam()];
    const gunKaldi = tarih ? Math.ceil((new Date(tarih + "T09:00") - simdi()) / GUN) : null;
    const cikmisK = S.sorular.filter((q) => q.kaynak === "cikmis" && kapsamda(q)).length;
    const tahminK = S.sorular.filter((q) => q.kaynak === "tahmin" && kapsamda(q)).length;
    k.innerHTML = `
      <h1>${kac(S.ders.ad)}</h1>
      <div class="dugmeler" role="group" aria-label="Çalışma kapsamı">${Object.entries(S.ders.kapsamlar).map(([id, x]) => `<button class="dugme kucuk ${id === kapsam() ? "" : "ikincil"}" data-kapsam="${id}" aria-pressed="${id === kapsam()}">${kac(x.ad)}</button>`).join("")}</div>
      <section class="kutu">
        <h2>${gunKaldi != null ? (gunKaldi > 0 ? `${kac(kapsamAd())} sınavına ${gunKaldi} gün` : gunKaldi === 0 ? "Sınav bugün" : `${kac(kapsamAd())} sınavı geçti`) : `${kac(kapsamAd())} hazırlığı`}</h2>
        ${ort != null ? `<p>Son ${son.length} deneme ortalaman: <b>${ort}</b></p><div class="hedef"><i style="width:${ort}%"></i><s></s></div><p class="kucuk soluk">Sarı çizgi ${HEDEF} puan.</p>`
          : `<p class="soluk">Henüz deneme sınavı çözmedin. Konuları bitirdikçe bir deneme çöz; puanın burada ${HEDEF} hedefiyle karşılaştırılır.</p>`}
        <div class="dugmeler">
          <a class="dugme" href="#tekrar">${bek ? `Günün tekrarı (${bek})` : "Günün tekrarı"}</a>
          <a class="dugme ikincil" href="#deneme">Deneme sınavı</a>
          ${tarih ? "" : `<a class="dugme ikincil" href="#ayar">Sınav tarihini gir</a>`}
        </div>
      </section>
      <h2>Bölümler</h2>
      <ul class="satirlar">${S.sira.filter((id) => kapsamBolumleri().includes(id)).map((id) => {
        const b = S.bolumler[id];
        if (!b.hazir) return `<li><div class="satir kapali"><span class="no">${b.no}</span><span><span class="ad">${kac(b.baslik)}</span><br><span class="alt">Hazırlanıyor</span></span></div></li>`;
        const kd = kartDurum(id); const sd = soruDurum(S.sorular.filter((q) => q.bolum === id));
        return `<li><a class="satir" href="#b/${id}/ozet"><span class="no">${b.no}</span>
          <span style="flex:1"><span class="ad">${kac(b.baslik)}</span><br><span class="alt">${kac(b.sayfalar)} · kart ${kd.ogrenilen}/${kd.toplam} · soru ${sd.cozulen}/${sd.toplam}</span>
          <span class="cubuk" style="margin-top:6px;display:block"><i style="width:${yuzde(kd.ogrenilen + sd.cozulen, kd.toplam + sd.toplam)}%"></i></span></span></a></li>`;
      }).join("")}</ul>
      <h2>Araçlar</h2>
      <ul class="satirlar">
        <li><a class="satir" href="#cikmis"><span><span class="ad">Çıkmış sorular</span><br><span class="alt">Gerçek sınav soruları, anlık doğru/yanlış</span></span><span class="sag">${cikmisK} soru</span></a></li>
        <li><a class="satir" href="#tahmin"><span><span class="ad">Tahmini denemeler</span><br><span class="alt">Henüz sorulmamış ama kitapta olan konular</span></span><span class="sag">${tahminK} soru</span></a></li>
        <li><a class="satir" href="#atolye"><span><span class="ad">Hesap Atölyesi</span><br><span class="alt">Sayıları her seferinde değişen hesap soruları, adım adım çözüm</span></span><span class="sag">${S.atolye.filter((g) => kapsamBolumleri().includes(g.bolum)).length} tür</span></a></li>
        <li><a class="satir" href="#yanlis"><span><span class="ad">Yanlış defterim</span><br><span class="alt">Yanlış yaptığın sorular 1, 3, 7 ve 14 gün sonra yeniden gelir</span></span><span class="sag">${yanlisAcik().length} açık</span></a></li>
        <li><a class="satir" href="#ozet"><span><span class="ad">Sınav öncesi özet</span><br><span class="alt">Formüller ve karıştırılan kavramlar tek sayfada, yazdırılabilir</span></span></a></li>
        <li><a class="satir" href="#ayar"><span><span class="ad">Ayarlar ve yedek</span><br><span class="alt">Sınav tarihi, kişi, ilerleme yedeği</span></span></a></li>
      </ul>`;
    $$("[data-kapsam]", k).forEach((b) => (b.onclick = () => { yaz("kapsam", b.dataset.kapsam); pano(); }));
  }

  // ---------- bölüm ----------
  const SEKMELER = [["ozet", "Özet"], ["kartlar", "Kavram kartları"], ["ciftler", "Karıştırılanlar"], ["formul", "Formüller"], ["hesap", "Hesap"], ["test", "Konu testi"], ["cikmis", "Çıkmış"]];
  function bolum(bid, sekme) {
    const b = S.bolumler[bid]; const k = $("#icerik");
    if (!b) { location.hash = ""; return; }
    if (!b.hazir) { k.innerHTML = `<h1>Bölüm ${b.no}: ${kac(b.baslik)}</h1><p class="bos">Bu bölüm henüz hazırlanmadı.</p><a class="dugme ikincil" href="#">Panoya dön</a>`; return; }
    const var_ = { ozet: 1, kartlar: (b.kartlar || []).length, ciftler: (b.ciftler || []).length, formul: (b.formuller || []).length, hesap: S.atolye.filter((g) => g.bolum === bid).length, test: (b.sorular || []).length, cikmis: S.sorular.filter((q) => q.kaynak === "cikmis" && q.bolum === bid).length };
    const sek = SEKMELER.filter(([id]) => var_[id]);
    sekme = sek.find(([id]) => id === sekme) ? sekme : "ozet";
    k.innerHTML = `<p class="kucuk"><a href="#">← ${kac(S.ders.ad)}</a></p>
      <h1>Bölüm ${b.no}: ${kac(b.baslik)}</h1><p class="soluk kucuk">${kac(b.sayfalar)} · ${b.sinav ? b.sinav.map(kac).join(", ") + " konusu" : ""}</p>
      <nav class="sekmeler" role="tablist">${sek.map(([id, ad]) => `<button role="tab" aria-selected="${id === sekme}" data-sekme="${id}">${ad}${id === "cikmis" ? ` (${var_.cikmis})` : ""}</button>`).join("")}</nav>
      <div id="sekme"></div>`;
    $$("[data-sekme]", k).forEach((x) => (x.onclick = () => { const h = `#b/${bid}/${x.dataset.sekme}`; if (location.hash === h) yonlendir(); else location.hash = h; }));
    const s = $("#sekme");
    ({ ozet: ozetSekme, kartlar: kartSekme, ciftler: ciftSekme, formul: formulSekme, hesap: hesapSekme, test: testSekme, cikmis: cikmisSekme })[sekme](b, s);
  }
  function ozetHTML(b) {
    return `<div class="ozet">${(b.ozet || []).map((o) => `<h3>${o.baslik} ${o.sayfa ? `<span class="sayfa-no">${kac(o.sayfa)}</span>` : ""}</h3>
      ${o.metin ? `<p>${o.metin}</p>` : ""}${o.maddeler ? `<ul>${o.maddeler.map((m) => `<li>${m}</li>`).join("")}</ul>` : ""}${o.tablo ? tabloHTML(o.tablo) : ""}`).join("")}
      ${(b.kitapNotlari || []).map((n) => `<div class="not">${n}</div>`).join("")}</div>`;
  }
  function ozetSekme(b, s) {
    s.innerHTML = `<div class="kutu">${ozetHTML(b)}</div>
      ${b.akildaKalsin ? `<div class="kutu"><h3>Akılda kalsın</h3><ul>${b.akildaKalsin.map((x) => `<li>${x}</li>`).join("")}</ul></div>` : ""}
      <div class="dugmeler"><a class="dugme" href="#b/${b.id}/kartlar">Kavram kartlarına geç</a></div>`;
  }

  // ---------- kavram kartları ----------
  function kartSekme(b, s, liste, donus) {
    const kt = oku("kart", {});
    let deste = liste || (b.kartlar || []).map((k) => ({ bid: b.id, k }));
    if (!liste) { // önce bekleyen ve yeni, sonra öğrenilenler
      const puan = (x) => { const e = kt[kartAnahtar(x.bid, x.k.ad)]; return !e ? 1 : e.sonraki <= simdi() ? 0 : 2 + e.kutu; };
      deste = deste.map((x, i) => [x, i]).sort((a, z) => puan(a[0]) - puan(z[0]) || a[1] - z[1]).map((x) => x[0]);
    }
    let i = 0, acik = false, sonuc = { b: 0, y: 0 };
    const ciz = () => {
      if (i >= deste.length) {
        if (typeof donus === "function") return donus();
        s.innerHTML = `<div class="kutu"><h2>Deste bitti</h2><p>${sonuc.b} kartı biliyordun, ${sonuc.y} kart tekrar gelecek. Bilmediklerin yarın Günün Tekrarı'nda.</p>
          <div class="dugmeler">${donus ? `<a class="dugme" href="${donus}">Devam et</a>` : `<button class="dugme" data-bastan>Desteyi yeniden aç</button><a class="dugme ikincil" href="#b/${b.id}/ciftler">Karıştırılanlara geç</a>`}</div></div>`;
        const bs = $("[data-bastan]", s); if (bs) bs.onclick = () => { i = 0; sonuc = { b: 0, y: 0 }; ciz(); };
        return;
      }
      const { bid, k } = deste[i]; const e = kt[kartAnahtar(bid, k.ad)];
      s.innerHTML = `<div class="ilerleme-yazi"><span>Kart ${i + 1} / ${deste.length}${liste ? ` · Bölüm ${S.bolumler[bid].no}` : ""}</span><span>${e ? (e.kutu >= 2 ? "öğrenildi" : "tekrar") : "yeni"}</span></div>
        <div class="kart" aria-live="polite">
          <div class="kart-ad">${k.ad}</div>
          ${acik ? `<p>${k.tanim}</p>${k.ornek ? `<p class="soluk"><b>Örnek:</b> ${k.ornek}</p>` : ""}${k.akil ? `<span class="akil fosfor">${k.akil}</span>` : ""}${k.sayfa ? `<p class="kucuk soluk" style="margin-top:8px">${kac(k.sayfa)}</p>` : ""}`
            : `<p class="gizli">Önce tanımı aklından söyle, sonra kartı aç.</p>`}
        </div>
        <div class="dugmeler">${acik ? `<button class="dugme" data-bil="1">Biliyordum</button><button class="dugme ikincil" data-bil="0">Bilmiyordum</button>` : `<button class="dugme" data-ac>Kartı aç</button><button class="dugme ikincil" data-gec>Atla</button>`}</div>`;
      const ac = $("[data-ac]", s); if (ac) { ac.onclick = () => { acik = true; ciz(); }; ac.focus({ preventScroll: true }); }
      const gc = $("[data-gec]", s); if (gc) gc.onclick = () => { i++; ciz(); };
      $$("[data-bil]", s).forEach((x) => (x.onclick = () => {
        const bil = x.dataset.bil === "1"; kartKaydet(bid, k.ad, bil); bil ? sonuc.b++ : sonuc.y++;
        if (!bil && !deste[i].tekrar) deste.push(Object.assign({}, deste[i], { tekrar: true })); // bilinmeyen kart oturum sonunda bir kez daha
        acik = false; i++; ciz();
      }));
    };
    ciz();
  }

  // ---------- karıştırılan çiftler ----------
  function ciftSekme(b, s) {
    const ciftler = b.ciftler || [];
    s.innerHTML = `<p class="soluk">Sınavda en çok bu ikililer karıştırılır. Önce farkı oku, sonra her ifadenin hangisine ait olduğunu seç.</p>
      <ul class="satirlar">${ciftler.map((c, i) => `<li><button class="satir" style="width:100%;border:0;background:none;text-align:left;cursor:pointer" data-cift="${i}">
        <span><span class="ad">${c.a.ad} / ${c.b.ad}</span><br><span class="alt">${c.sorular.length} ifade</span></span></button></li>`).join("")}</ul>
      <div class="dugmeler"><button class="dugme" data-hepsi>Hepsini karışık çalış</button></div>`;
    $$("[data-cift]", s).forEach((x) => (x.onclick = () => ciftCalis(b, s, [ciftler[+x.dataset.cift]])));
    $("[data-hepsi]", s).onclick = () => ciftCalis(b, s, ciftler, true);
  }
  function ciftCalis(b, s, ciftler, karisik) {
    let liste = []; ciftler.forEach((c) => c.sorular.forEach((q) => liste.push({ c, q })));
    liste = karistir(liste); let i = 0, d = 0, cev = null;
    const ciz = () => {
      if (i >= liste.length) {
        s.innerHTML = `<div class="kutu"><h2>${d} / ${liste.length} doğru</h2><div class="dugmeler"><button class="dugme" data-tekrar>Yeniden çalış</button><button class="dugme ikincil" data-liste>Listeye dön</button></div></div>`;
        $("[data-tekrar]", s).onclick = () => ciftCalis(b, s, ciftler, karisik); $("[data-liste]", s).onclick = () => ciftSekme(b, s); return;
      }
      const { c, q } = liste[i]; const secenek = [["a", c.a.ad], ["b", c.b.ad]].concat(c.ikisi ? [["ikisi", "İkisi de"]] : []);
      s.innerHTML = `<div class="ilerleme-yazi"><span>${karisik ? "Karışık" : kac(c.a.ad.replace(/<[^>]+>/g, "")) + " / " + kac(c.b.ad.replace(/<[^>]+>/g, ""))}</span><span>${i + 1} / ${liste.length}</span></div>
        ${i === 0 || karisik || cev !== null ? `<div class="cift-kutu"><div><b>${c.a.ad}</b><br>${c.a.tanim}</div><div><b>${c.b.ad}</b><br>${c.b.tanim}</div></div>` : ""}
        <div class="kutu"><div class="soru-metin">${q.ifade}</div>
          <div class="dugmeler">${secenek.map(([id, ad]) => `<button class="dugme ${cev === null ? "ikincil" : id === q.cevap ? "" : "ikincil"}" data-c="${id}" ${cev !== null ? "disabled" : ""}>${ad}</button>`).join("")}</div>
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
  function formulSekme(b, s) { s.innerHTML = (b.formuller || []).map(formulHTML).join("") + (S.atolye.some((g) => g.bolum === b.id) ? `<div class="dugmeler"><a class="dugme" href="#b/${b.id}/hesap">Bu formüllerle hesap çöz</a></div>` : ""); }

  // ---------- hesap atölyesi ----------
  function hesapSekme(b, s) { atolyeListe(s, S.atolye.filter((g) => g.bolum === b.id), `#b/${b.id}/hesap`); }
  function atolyeListe(s, gens, donus) {
    const st = oku("atolye", {});
    s.innerHTML = `<p class="soluk">Her soruda sayılar değişir. Cevapladıktan sonra adım adım çözüm açılır; yanlış şıklar sık yapılan hatalardan üretilir.</p>
      <ul class="satirlar">${gens.map((g) => { const e = st[g.id] || { d: 0, y: 0 }; return `<li><a class="satir" href="#atolye/${g.id}"><span><span class="ad">${g.ad}</span><br><span class="alt">${g.aciklama || ""}</span></span><span class="sag">${e.d + e.y ? `${e.d}/${e.d + e.y} doğru` : "yeni"}</span></a></li>`; }).join("")}</ul>
      <div class="dugmeler"><button class="dugme" data-karisik>Karışık 10 soru</button></div>`;
    $("[data-karisik]", s).onclick = () => atolyeCalis(s, gens, donus, 10);
  }
  function atolyeCalis(s, gens, donus, adet) {
    let i = 0, d = 0;
    const tek = gens.length === 1;
    const yeni = () => {
      if (adet && i >= adet) {
        s.innerHTML = `<div class="kutu"><h2>${d} / ${adet} doğru</h2><div class="dugmeler"><button class="dugme" data-tekrar>Yeni 10 soru</button><a class="dugme ikincil" href="${donus}">Listeye dön</a></div></div>`;
        $("[data-tekrar]", s).onclick = () => atolyeCalis(s, gens, donus, adet); return;
      }
      const g = tek ? gens[0] : gens[Math.floor(Math.random() * gens.length)];
      let q; try { q = g.uret(); } catch (e) { console.error(e); q = null; }
      if (!q) return yeni();
      q = Object.assign({ id: "atolye:" + g.id, kaynak: "atolye", bolum: g.bolum }, q);
      const sira = sikSirasi(q, true); let cev;
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
      const kaydet = (ok) => { const st = oku("atolye", {}); const e = st[g.id] || { d: 0, y: 0 }; ok ? e.d++ : e.y++; st[g.id] = e; yaz("atolye", st); if (ok) d++; };
      ciz();
    };
    yeni();
  }
  function atolyeSayfa(gid) {
    const k = $("#icerik");
    const gens = S.atolye.filter((g) => kapsamBolumleri().includes(g.bolum));
    if (gid) {
      const g = S.atolye.find((x) => x.id === gid); if (!g) { location.hash = "#atolye"; return; }
      k.innerHTML = `<p class="kucuk"><a href="#atolye">← Hesap Atölyesi</a></p><h1>${g.ad}</h1><div id="sekme"></div>`;
      const f = (S.bolumler[g.bolum].formuller || []).filter((x) => (g.formul || []).includes(x.id));
      atolyeCalis($("#sekme"), [g], "#atolye", 0);
      if (f.length) k.insertAdjacentHTML("beforeend", `<details class="kutu"><summary>Formülü hatırla</summary>${f.map(formulHTML).join("")}</details>`);
      return;
    }
    k.innerHTML = `<p class="kucuk"><a href="#">← ${kac(S.ders.ad)}</a></p><h1>Hesap Atölyesi</h1>${kapsamBolumleri().map((bid) => { const gs = gens.filter((g) => g.bolum === bid); return gs.length ? `<h2>Bölüm ${S.bolumler[bid].no}: ${kac(S.bolumler[bid].baslik)}</h2><div data-b="${bid}"></div>` : ""; }).join("")}
      <div class="dugmeler"><button class="dugme" data-hepsi>Tüm türlerden karışık 10 soru</button></div>`;
    kapsamBolumleri().forEach((bid) => { const el = $(`[data-b="${bid}"]`, k); if (el) { atolyeListe(el, gens.filter((g) => g.bolum === bid), "#atolye"); const kb = $("[data-karisik]", el); if (kb) kb.parentElement.remove(); } });
    $("[data-hepsi]", k).onclick = () => { k.innerHTML = `<p class="kucuk"><a href="#atolye">← Hesap Atölyesi</a></p><div id="sekme"></div>`; atolyeCalis($("#sekme"), gens, "#atolye", 10); };
  }

  // ---------- konu testi / çıkmış (bölüm içi) ----------
  function testSekme(b, s) {
    const qs = S.sorular.filter((q) => q.kaynak === "konu" && q.bolum === b.id); const sd = soruDurum(qs);
    s.innerHTML = `<div class="kutu"><p>${qs.length} soru, sınavdaki gibi 5 şık. Cevabı seçince hemen doğru/yanlış, açıklama ve en güçlü çeldiricinin neden yanlış olduğu çıkar.</p>
      <p class="soluk kucuk">Çözdüğün: ${sd.cozulen} / ${sd.toplam}</p>
      <div class="dugmeler"><button class="dugme" data-basla>Testi başlat</button>${devamVarsa("konu:" + b.id) ? `<button class="dugme ikincil" data-devam>Kaldığın yerden devam et</button>` : ""}</div></div>`;
    $("[data-basla]", s).onclick = () => { $("#icerik").innerHTML = ""; testBaslat({ baslik: `Bölüm ${b.no} konu testi`, sorular: karistir(qs), mod: "anlik", karistirSik: true, devamAnahtar: "konu:" + b.id, donus: `#b/${b.id}/test`, kayitTur: "konuTest" }); };
    const dv = $("[data-devam]", s); if (dv) dv.onclick = () => { $("#icerik").innerHTML = ""; devamEt("konu:" + b.id); };
  }
  function cikmisSekme(b, s) {
    const qs = S.sorular.filter((q) => q.kaynak === "cikmis" && q.bolum === b.id);
    s.innerHTML = `<div class="kutu"><p>Bu bölümün konusundan çıkmış ${qs.length} soru (vize, final ve bütünleme dahil).</p>
      <ul>${[...new Set(qs.map((q) => q.sinav))].map((x) => `<li>${kac(x)}: ${qs.filter((q) => q.sinav === x).length} soru</li>`).join("")}</ul>
      <div class="dugmeler"><button class="dugme" data-basla>Çöz</button></div></div>`;
    $("[data-basla]", s).onclick = () => { $("#icerik").innerHTML = ""; testBaslat({ baslik: `Bölüm ${b.no} çıkmış sorular`, sorular: qs, mod: "anlik", karistirSik: false, donus: `#b/${b.id}/cikmis` }); };
  }

  // ---------- çıkmış sorular sayfası ----------
  function cikmisSayfa(alt) {
    const k = $("#icerik");
    const tum = S.sorular.filter((q) => q.kaynak === "cikmis");
    const sinavlar = [...new Set(tum.map((q) => q.sinav))];
    if (alt) {
      const qs = alt === "kapsam" ? tum.filter(kapsamda) : tum.filter((q) => q.sinav === decodeURIComponent(alt)).sort((a, z) => (a.no || 0) - (z.no || 0));
      const ad = alt === "kapsam" ? `${kapsamAd()} konularından çıkmış tüm sorular` : decodeURIComponent(alt);
      if (devamEt("cikmis:" + alt)) return;
      testBaslat({ baslik: ad, sorular: alt === "kapsam" ? karistir(qs) : qs, mod: "anlik", karistirSik: false, devamAnahtar: "cikmis:" + alt, donus: "#cikmis", kayitTur: "cikmisTest" });
      return;
    }
    const gecmis = oku("cikmisTest", []);
    k.innerHTML = `<p class="kucuk"><a href="#">← ${kac(S.ders.ad)}</a></p><h1>Çıkmış sorular</h1>
      <p class="soluk">Sorular sınavdaki sırayla ve şıklarla gelir. Doğru şık, sınav kâğıdındaki gibi fosforlu kalemle işaretlenir.</p>
      <ul class="satirlar">
        <li><a class="satir" href="#cikmis/kapsam"><span><span class="ad">${kac(kapsamAd())} konularından çıkmışların hepsi</span><br><span class="alt">Final ve bütünlemede çıkan ${kac(kapsamAd().toLowerCase())} konuları dahil, karışık sırayla</span></span><span class="sag">${tum.filter(kapsamda).length} soru</span></a></li>
        ${sinavlar.map((x) => { const qs = tum.filter((q) => q.sinav === x); const g = gecmis.filter((y) => y.ad === x); const en = g.length ? Math.max(...g.map((y) => yuzde(y.d, y.n))) : null;
          return `<li><a class="satir" href="#cikmis/${encodeURIComponent(x)}"><span><span class="ad">${kac(x)}</span><br><span class="alt">${qs.length} soru · bölüm ${[...new Set(qs.map((q) => S.bolumler[q.bolum]?.no))].sort().join(", ")}</span></span><span class="sag">${en != null ? "en iyi " + en : devamVarsa("cikmis:" + encodeURIComponent(x)) ? "yarım kaldı" : ""}</span></a></li>`; }).join("")}
      </ul>
      ${S.ders.cikmisNot ? `<div class="not">${S.ders.cikmisNot}</div>` : ""}`;
  }

  // ---------- tahmini denemeler ----------
  function tahminSayfa(alt) {
    const k = $("#icerik");
    const tum = S.sorular.filter((q) => q.kaynak === "tahmin");
    const denemeler = [...new Set(tum.map((q) => q.deneme))];
    if (alt) {
      const qs = alt === "hepsi" ? karistir(tum.filter(kapsamda)) : tum.filter((q) => q.deneme === alt);
      const ad = alt === "hepsi" ? "Tahmini soruların hepsi" : (qs[0] && qs[0].denemeAd) || alt;
      if (devamEt("tahmin:" + alt)) return;
      testBaslat({ baslik: ad, sorular: qs, mod: "anlik", karistirSik: true, devamAnahtar: "tahmin:" + alt, donus: "#tahmin", kayitTur: "tahminTest" });
      return;
    }
    const gecmis = oku("tahminTest", []);
    k.innerHTML = `<p class="kucuk"><a href="#">← ${kac(S.ders.ad)}</a></p><h1>Tahmini denemeler</h1>
      <p class="soluk">Çıkmış sınavın biçiminde (5 şık, öncüllü ve hesap soruları) ama henüz sorulmamış konulardan yazıldı. Bunlar tahmindir; gerçek sınavda çıkacağı garanti değildir.</p>
      <ul class="satirlar">${denemeler.map((x) => { const qs = tum.filter((q) => q.deneme === x); const g = gecmis.filter((y) => y.ad === qs[0].denemeAd); const en = g.length ? Math.max(...g.map((y) => yuzde(y.d, y.n))) : null;
        return `<li><a class="satir ${qs.some(kapsamda) ? "" : "kapali"}" href="#tahmin/${x}"><span><span class="ad">${kac(qs[0].denemeAd)}</span><br><span class="alt">${qs.length} soru</span></span><span class="sag">${en != null ? "en iyi " + en : ""}</span></a></li>`; }).join("")}
        <li><a class="satir" href="#tahmin/hepsi"><span><span class="ad">Hepsi karışık</span><br><span class="alt">${kac(kapsamAd())} kapsamındaki tüm tahmini sorular</span></span><span class="sag">${tum.filter(kapsamda).length} soru</span></a></li></ul>`;
  }

  // ---------- deneme sınavı ----------
  function denemeSayfa() {
    const k = $("#icerik");
    const ayar = S.ders.kapsamlar[kapsam()].deneme;
    if (devamVarsa("deneme")) { k.innerHTML = ""; devamEt("deneme"); return; }
    const gecmis = oku("denemeler", []).filter((x) => x.kapsam === kapsam());
    k.innerHTML = `<p class="kucuk"><a href="#">← ${kac(S.ders.ad)}</a></p><h1>Deneme sınavı: ${kac(kapsamAd())}</h1>
      <div class="kutu"><p>${ayar.soru} soru, gerçek sınavın bölüm dağılımıyla: ${Object.entries(ayar.dagilim).map(([b, n]) => `Bölüm ${S.bolumler[b].no}'den ${n}`).join(", ")}. Sınav bitene kadar doğru cevap gösterilmez.</p>
        <form data-ayar>
          <label class="secim">Süre <input class="girdi" type="number" name="sure" min="5" max="180" value="${oku("denemeSure", ayar.sureDk)}" style="width:5em"> dakika</label>
          <p class="kucuk soluk" style="margin:0 0 8px">${kac(ayar.sureNot || "")}</p>
          <label class="secim"><input type="checkbox" name="cikmis" checked> Çıkmış sorular</label>
          <label class="secim"><input type="checkbox" name="tahmin" checked> Tahmini sorular</label>
          <label class="secim"><input type="checkbox" name="konu" checked> Konu testi soruları</label>
          <label class="secim"><input type="checkbox" name="yeni" checked> Önce hiç çözmediğim sorular</label>
          <div class="dugmeler"><button class="dugme">Sınavı başlat</button></div>
        </form></div>
      ${gecmis.length ? `<h2>Önceki denemeler</h2><div class="kutu"><table class="veri rapor-tablo" style="width:100%"><tr><th>Tarih</th><th>Süre</th><th>Puan</th></tr>${gecmis.slice().reverse().map((x) => `<tr><td>${new Date(x.t).toLocaleDateString("tr-TR")}</td><td>${Math.round(x.sureSn / 60)} dk</td><td><b>${yuzde(x.d, x.n)}</b></td></tr>`).join("")}</table></div>` : ""}`;
    $("[data-ayar]", k).onsubmit = (e) => {
      e.preventDefault(); const f = e.target; const kaynaklar = ["cikmis", "tahmin", "konu"].filter((x) => f[x].checked);
      if (!kaynaklar.length) return; const sure = Math.max(5, +f.sure.value || ayar.sureDk); yaz("denemeSure", sure);
      const st = oku("soru", {}); const secilen = [];
      Object.entries(ayar.dagilim).forEach(([b, n]) => {
        let havuz = karistir(S.sorular.filter((q) => q.bolum === b && kaynaklar.includes(q.kaynak)));
        if (f.yeni.checked) havuz.sort((a, z) => (st[a.id] ? 1 : 0) - (st[z.id] ? 1 : 0));
        secilen.push(...havuz.slice(0, n));
      });
      if (!secilen.length) return;
      k.innerHTML = "";
      testBaslat({ baslik: `Deneme sınavı (${kapsamAd()})`, sorular: karistir(secilen), mod: "sinav", sureDk: sure, karistirSik: true, devamAnahtar: "deneme", donus: "#deneme", kayitTur: "denemeler" });
    };
  }

  // ---------- günün tekrarı ----------
  function tekrarSayfa() {
    const k = $("#icerik");
    const kartlar = bekleyenKartlar(); const sorular = yanlisBekleyen().map((id) => S.soruIndex[id]).filter(kapsamda);
    k.innerHTML = `<p class="kucuk"><a href="#">← ${kac(S.ders.ad)}</a></p><h1>Günün tekrarı</h1><div id="sekme"></div>`;
    const s = $("#sekme");
    if (!kartlar.length && !sorular.length) {
      const yeni = kapsamBolumleri().find((bid) => S.bolumler[bid].hazir && kartDurum(bid).gorulen < kartDurum(bid).toplam);
      s.innerHTML = `<div class="kutu bos"><p>Bugün tekrar zamanı gelen kart ya da soru yok.</p>
        <div class="dugmeler" style="justify-content:center">${yeni ? `<a class="dugme" href="#b/${yeni}/kartlar">Bölüm ${S.bolumler[yeni].no} kartlarına devam et</a>` : ""}<a class="dugme ikincil" href="#atolye">Hesap Atölyesi</a></div></div>`;
      return;
    }
    const sorulara = () => {
      if (!sorular.length) { s.innerHTML = `<div class="kutu"><h2>Tekrar bitti</h2><p>Bugünlük bu kadar. Yanlış yaptıkların yeniden takvime girdi.</p><a class="dugme" href="#">Panoya dön</a></div>`; return; }
      k.innerHTML = ""; testBaslat({ baslik: "Günün tekrarı: sorular", sorular: karistir(sorular), mod: "anlik", karistirSik: true, tekrarModu: true, donus: "#" });
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
    k.innerHTML = `<p class="kucuk"><a href="#">← ${kac(S.ders.ad)}</a></p><h1>Yanlış defterim</h1>
      <p class="soluk">Yanlış yaptığın soru 1 gün sonra yeniden gelir. Doğru bildikçe aralık 3, 7 ve 14 güne çıkar; 14 gün sonra da doğruysa öğrenildi sayılır.</p>
      ${acik.length ? `<div class="dugmeler"><button class="dugme" data-hepsi>Açıkların hepsini şimdi çöz (${acik.length})</button></div>` : `<p class="bos">Açık yanlışın yok.</p>`}
      <ul class="satirlar">${acik.map((id) => { const q = S.soruIndex[id]; const metin = ((q.soru || "") + " " + (q.kok || "")).replace(/<[^>]+>/g, " ").trim();
        return `<li><div class="satir"><span style="flex:1"><span class="alt">Bölüm ${S.bolumler[q.bolum].no} · ${q.kaynak === "cikmis" ? "çıkmış" : q.kaynak === "tahmin" ? "tahmin" : "konu testi"} · ${yd[id].sayi} kez yanlış</span><br>${kac(metin.slice(0, 120))}${metin.length > 120 ? "…" : ""}</span><span class="sag">${gun(yd[id].sonraki)}</span></div></li>`; }).join("")}</ul>
      ${ogr.length ? `<p class="soluk">Öğrenildi: ${ogr.length} soru.</p>` : ""}`;
    const h = $("[data-hepsi]", k); if (h) h.onclick = () => { k.innerHTML = ""; testBaslat({ baslik: "Yanlış defteri", sorular: acik.map((id) => S.soruIndex[id]), mod: "anlik", karistirSik: true, tekrarModu: false, donus: "#yanlis" }); };
  }

  // ---------- sınav öncesi özet ----------
  function ozetSayfa() {
    const k = $("#icerik");
    const bl = kapsamBolumleri().map((id) => S.bolumler[id]).filter((b) => b.hazir);
    k.innerHTML = `<p class="kucuk yazdirma"><a href="#">← ${kac(S.ders.ad)}</a></p><h1>${kac(S.ders.ad)}: ${kac(kapsamAd())} özeti</h1>
      <div class="dugmeler"><button class="dugme" onclick="window.print()">Yazdır ya da PDF olarak kaydet</button></div>
      ${bl.map((b) => `<section class="kutu"><h2>Bölüm ${b.no}: ${kac(b.baslik)}</h2>
        ${b.akildaKalsin ? `<ul>${b.akildaKalsin.map((x) => `<li>${x}</li>`).join("")}</ul>` : ""}
        ${(b.formuller || []).length ? `<h3>Formüller</h3>${b.formuller.map((f) => `<p><b>${f.ad}:</b></p><div class="formul">${f.formul}</div>`).join("")}` : ""}
        ${(b.ciftler || []).length ? `<h3>Karıştırma</h3><ul>${b.ciftler.map((c) => `<li><b>${c.a.ad} / ${c.b.ad}:</b> ${c.fark}</li>`).join("")}</ul>` : ""}
      </section>`).join("")}`;
  }

  // ---------- ayarlar ----------
  function ayarSayfa() {
    const k = $("#icerik"); const t = oku("sinavTarihi", {});
    k.innerHTML = `<p class="kucuk"><a href="#">← ${kac(S.ders.ad)}</a></p><h1>Ayarlar</h1>
      <div class="kutu"><h2>Sınav tarihleri</h2><form data-tarih>${Object.entries(S.ders.kapsamlar).map(([id, x]) => `<label class="secim">${kac(x.ad)} <input class="girdi" type="date" name="${id}" value="${t[id] || ""}"></label>`).join("")}
        <div class="dugmeler"><button class="dugme">Tarihleri kaydet</button></div></form></div>
      <div class="kutu"><h2>Kişi</h2><p>Şu an: <b>${kac(profil())}</b></p><button class="dugme ikincil" data-profil-degis>Kişiyi değiştir</button></div>
      <div class="kutu"><h2>Yedek</h2><p class="soluk">İlerleme bu tarayıcıda tutulur. Başka cihaza geçerken yedeği indir, öbür cihazda geri yükle.</p>
        <div class="dugmeler"><button class="dugme" data-indir>Yedeği indir</button><label class="dugme ikincil">Yedekten geri yükle<input type="file" accept="application/json" data-yukle hidden></label></div>
        <p data-mesaj class="kucuk"></p></div>
      <div class="kutu"><h2>Bu dersteki ilerlemeyi sıfırla</h2><p class="soluk">Kartlar, sorular, yanlış defteri ve denemeler silinir.</p><button class="dugme ikincil" data-sifirla>Sıfırla</button></div>`;
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
      try { const v = JSON.parse(await e.target.files[0].text()); if (v.ders !== S.ders.kod || !v.veri) throw 0; Object.entries(v.veri).forEach(([x, y]) => LS.set(onek + x, y)); m.textContent = `Yedek yüklendi (${v.profil}, ${new Date(v.tarih).toLocaleDateString("tr-TR")}).`; }
      catch (er) { m.textContent = "Bu dosya bu dersin yedeği değil. Ayarlar'dan indirdiğin .json dosyasını seç."; }
    };
    const sf = $("[data-sifirla]", k);
    sf.onclick = () => { if (!sf.dataset.emin) { sf.dataset.emin = 1; sf.textContent = "Emin misin? Silmek için yeniden dokun"; return; } LS.keys().filter((x) => x.startsWith(onek)).forEach(LS.del); location.hash = ""; };
    $("[data-profil-degis]", k).onclick = () => { LS.del("ankuzef:profil"); dersBaslat(); };
  }

  // ---------- yönlendirme ----------
  function yonlendir() {
    const [yol, a, b] = location.hash.replace(/^#/, "").split("/");
    window.scrollTo({ top: 0 });
    ({ "": pano, b: () => bolum(a, b), cikmis: () => cikmisSayfa(a), tahmin: () => tahminSayfa(a), deneme: denemeSayfa, atolye: () => atolyeSayfa(a), tekrar: tekrarSayfa, yanlis: yanlisSayfa, ozet: ozetSayfa, ayar: ayarSayfa }[yol] || pano)();
  }
  async function dersBaslat() {
    const kok = $("#uygulama");
    if (!profil()) { kok.innerHTML = ustSerit() + `<main class="sayfa">${profilSecHTML()}</main>`; profilBagla(kok, dersBaslat); return; }
    kok.innerHTML = ustSerit() + `<main class="sayfa" id="icerik"><p class="bos">Yükleniyor…</p></main>`;
    $("[data-profil-degis]").onclick = () => { LS.del("ankuzef:profil"); dersBaslat(); };
    try { if (!S.ders) await dersYukle(document.body.dataset.ders); }
    catch (e) { $("#icerik").innerHTML = `<p class="bos">Ders verisi yüklenemedi (${kac(e.message)}). Sayfayı yenile.</p>`; return; }
    document.title = S.ders.ad + " · ANKUZEF Defteri";
    window.onhashchange = yonlendir; yonlendir();
    // Aynı adrese giden bağlantı (ör. testteyken "Geri dön") hashchange tetiklemez; elle yönlendir.
    document.addEventListener("click", (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (a && a.getAttribute("href") === (location.hash || "#")) { e.preventDefault(); yonlendir(); }
    });
  }

  window.ANKUZEF = { $, karistir }; // atolye.js yardımcıları için
  document.addEventListener("DOMContentLoaded", () => (document.body.dataset.sayfa === "ana" ? anaSayfa() : dersBaslat()));
})();
