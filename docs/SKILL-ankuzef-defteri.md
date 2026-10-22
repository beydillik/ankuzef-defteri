---
name: ankuzef-defteri
description: Kemal ve Şengül'ün ANKUZEF sınav hazırlık sitesi (beydillik/ankuzef-defteri, Netlify) için ders açma, bölüm içeriği, çıkmış sınavı ve Gözden Geçirelim sorularını online teste çevirme, tahmini deneme, Hesap Atölyesi ve yayın işleri.
---

# ANKUZEF Defteri — çalışma yöntemi

Depo: `beydillik/ankuzef-defteri`. Netlify: Kemal'in **ikinci** Netlify hesabı (Ela'nın sitesinin olduğu hesap değil). Kullanıcılar yetişkin: Kemal ve eşi Şengül; ANKUZEF açık öğretim öğrencileri. Hedef: her sınavda **75+**. Yanıtlar Türkçe, kısa ve net. Her kişi farklı ders alabilir (`dersler.json` → `ogrenciler`). Depodaki `docs/SKILL-ankuzef-defteri.md` bu dosyanın kopyasıdır; değişince ikisini birlikte güncelle.

## ⚠ Yayın kuralı (her işten önce)
- Ücretsiz planda `main`'e her gönderim = 1 canlı yayın = 15 kredi (ayda 300). `taslak` dalı ve önizlemeler 0 kredi.
- **Bütün işler `taslak` dalına. `main`'e kendiliğinden gönderme.** Başlarken: `git fetch origin && git checkout taslak && git pull` (yoksa `git checkout -b taslak origin/main && git push -u origin taslak`). Göndermeden önce `git pull --rebase origin taslak`.
- "Yayınla / canlıya al" denirse önce sor: "15 kredi düşecek. Canlıya gidecekler: <`git log --oneline origin/main..origin/taslak`>. Emin misin?" Onayla: `git checkout main && git pull && git merge --ff-only origin/taslak && git push origin main`.
- Gönderim reddedilirse (403): önce `add_repo` (push) dene. Olmazsa değişen dosyaları klasör yapısını koruyarak zip'le, gönder ve şunu yaz: "GitHub → depo → dal seçicide **taslak** → Add file → Upload files → zip'ten çıkan klasörleri sürükle → Commit." Kalıcı çözüm: GitHub → Settings → Applications → Claude → Configure → Repository access → depoyu ekle.
- Bu ortamdan netlify.app adreslerine erişilemez; yerelde test et (`cd public && python3 -m http.server 8765 &` + Playwright). `pkill -f http.server` kullanma.

## 0. Kaynak kuralları (kritik)
- Tek kaynak ders kitabı. Tanım, terim, formül, sınıflandırma kitaptaki gibi (kitap "memnuniyet düzeyi nicel" diyorsa site de öyle der).
- Kitap dışı bilgi yalnızca "kitap dışı" etiketi ve kaynak URL'siyle; doğrulanamıyorsa eklenmez. Kitabın formülünden doğrudan çıkan sonuç (ör. "gözlemler ×c → standart sapma ×c") `kitapNotu` ile "kitapta açıkça yazmaz, s. N formülünden çıkar" diye işaretlenir.
- Kitapta açık hata varsa doğrusu yazılır, bölümün `kitapNotlari` listesine "Kitapta (s. N): … ; doğrusu …" eklenir. Yöntem ve tanımda kitap esastır.
- Sayfa atfı basılı sayfa: `(s. N)`. Bölümün kendi numaralı PDF'i varsa (isan Bölüm 4–6) `B4 s. N`. Her bölümün sayfa aralığı `araclar/<kod>/bolumler.py`'de `aralik`; `uret.py` aralık dışı atfı hata sayar.
- Kitap metni: `kaynaklar/<kod>/bolumN.md` (`pdftotext -f N -l N`, sonuna `[pdf N]`). Basılı sayfa = PDF sayfası + sabit (isan: B1 +4, B2 +20, B3 +46). Formüller PDF'te resimdir; metinde boş çıkar → sayfa görüntüsünden (`pdftoppm -r 110 -f N -l N`) oku.
- Kitabın "Gözden Geçirelim" sorularını ve paragraflarını birebir kopyalama; özet ve sorular bizim yazımızdır. Cevap anahtarını kontrol et; hata varsa kullanıcıya söyle.

## Öncelik sırası (her derste aynı, Kemal'in kuralı)
Bir sonraki sınavın sorularını en iyi şunlar gösterir, bazen aynı soru çıkar:
1. **Çıkmış sorular** — en önemli içerik; ders açılınca ilk bunlar eklenir.
2. **Gözden Geçirelim** — kitabın bölüm sonu soruları; her derste **mutlaka** eklenir (bölüm 1b). Sınavda aynısı ya da aynı tipi çıkabiliyor (isan 2025-26 Final S17 = B5 Gözden Geçirelim S3'ün aynı tipi).
3. Konu içeriği (özet, kart, çift, formül, konu testi, Hesap Atölyesi).
4. Tahmini denemeler; 5. Deneme sınavı.
Sitedeki çalışma yolu da bu sırada: 1 Konu çalış → 2 Çıkmış sorular → 3 Gözden Geçirelim → 4 Tahmini denemeler → 5 Deneme sınavı (yanında Günün tekrarı, Yanlış defterim; Araçlar: Hesap Atölyesi, Sınav öncesi özet, Ayarlar).

## 1. Çıkmış sorular (en değerli içerik)
- Kullanıcı sınav PDF'lerini Claude projesinin dosyalarına yükler. Doğru şık kâğıtta **fosforlu kalemle** işaretlidir: sayfaları `pdftoppm -r 130 -png` ile görüntüye çevir ve her soruyu görüntüden oku (metin katmanı sütunları karıştırır). Proje dosyası yalnız metin olarak okunabiliyorsa PDF'i sohbete eklemesini iste.
- **Önce sınavın bu derse ait olduğunu kontrol et**: başlıktaki ders kodu ve adı (isan = AAUF1405 Veri ve İş Analitiği). Başka dersin sınavı gelirse (ör. 2024-25 dosyaları AYBS407 Büyük Veri ve İş Analitiği: Hadoop, Spark, Hive) ekleme, kullanıcıya bildir, `ders.json` `cikmisNot`'a yaz.
- Soru ve şıklar **birebir** (yazım hataları dahil; "yanlıştır" gibi altı çizili kelimeler `<u>`). İşaretli şık doğru cevaptır. Her işaretli cevabı hesapla/kitapla doğrula; işaret okunamıyor ya da hesap tutmuyorsa tahmin etme, kullanıcıya sor.
- Her soruya `bolum` ata (konunun kitapta anlatıldığı bölüm). Final ve bütünlemede çıkan vize konuları `bolum` sayesinde vize çalışırken de görünür ("Final'de çıkan vize konusu" etiketi). Tekrar eden soruları ayıklama: tekrar = önemli soru.
- Dosya: `araclar/<kod>/cikmis.py`'ye sınav başına bir sözlük `{"kaynak": "cikmis", "sinav": "2025-26 Güz Vize", "sinavTur": "Vize"|"Final"|"Büt", "sorular": [...]}`; `id` = `c<yıl><v|f|b>-NN` (**zorunlu**: id yoksa motor farklı sınavların sorularını karıştırır), `no` sınavdaki numara, `sabitSik: True` (sınavdaki şık sırası korunur). `uret.py`'ye dosyayı ve `soruDosyalari`'na adını ekle.
- Her soruya açıklama: neden doğru (`aciklama`), en güçlü çeldiricinin neden yanlış olduğu (`celdirici`), hesap sorusunda adımlar (`cozum`), `sayfa`.
- Yeni çıkmış sınav, sınavın biçimini (soru sayısı, şık sayısı, öncüllü oranı, bölüm dağılımı) günceller: `ders.json` → `kapsamlar.<vize|final>.deneme.dagilim`.
- Final/bütünleme sınavındaki vize konusu sorular ayrıca "Finalde çıkmış vize soruları" testinde toplanır (motor `bolum` alanından kendisi süzer; vize kapsamında Çıkmış sorular sayfasında ve menüde görünür). Tam final sınavı yalnızca Final kapsamında listelenir.
- Sınavdaki şekil (şebeke, karar ağacı) metinde yoksa görüntüden okuyup SVG olarak yeniden çiz (`currentColor`, `var(--yuzey)`), `kitapNotu` ile "şekil yeniden çizildi" yaz.

## 1b. Gözden Geçirelim (her derste zorunlu)
- Her bölümün sonundaki Gözden Geçirelim sorularını ve cevap anahtarını sayfa görüntüsünden oku (`pdftoppm -r 90`), her cevabı kendin çöz.
- Telif: kitabın soru metni kelimesi kelimesine kopyalanmaz. Her soru aynı bilgiyi ve aynı sayıları sorar; kök ve şıklar bizim cümlelerimizle. Kitaptaki numara (`kitapNo`) ve cevap anahtarı (`kitapCevap`) saklanır, şık sırası kitaptaki gibidir (`sabitSik`), böylece kitapla karşılaştırılabilir. Kullanıcıya bunu söyle.
- Kitabın anahtarı hatalıysa doğrusu `dogru` olur, `kitapNotu`'na "Kitabın cevap anahtarı X diyor; doğrusu Y, çünkü …" yazılır. `uret.py`, anahtardan farklı ama notu olmayan soruyu hata sayar. Soruda iki yanlış ifade varsa (kitap hatası) kitabın kabul ettiğini doğru say, öbürünü notta belirt.
- Kitapta boşluk doldurma sorusu varsa 5 şıklı soruya çevir (`bosluk: True`; `kitapCevap` anahtarın metni; şıkları biz yazarız, doğru şık hep başta olmasın diye kaydırılır). Soru sayısı bölümden bölüme değişebilir; `uret.py` bölüm başına beklenen sayıyı kontrol eder.
- Dosya: `araclar/<kod>/gozden.py` → `G(bolum, kitapNo, kitapCevap, sayfa, soru, secenekler, dogru, aciklama, ...)`; `GOZDEN = {bid: [...]}`; çıktı `sorular/gozden.json` (`kaynak: "gozden"`). Bölüm içeriği hazır olmasa da (final bölümleri) Gözden Geçirelim eklenir; bölümün adım listesinde ve ana menüde görünür.
- Deneme sınavı havuzuna Gözden Geçirelim soruları da girer.

## 2. Öğretim ilkeleri (yetişkin, sınav odaklı)
1. Bölüm akışı (numaralı adım şeridi, her adımın sonunda "Sıradaki adım" düğmesi, biten adım ✓): **Özet** (1 ekran, sayfa atıflı) → **Kavram kartları** (önce hatırla, sonra aç; Biliyordum/Bilmiyordum → aralıklı tekrar 1-3-7-14 gün) → **Karıştırılanlar** (kavram çiftleri; her ifadenin hangisine ait olduğunu seç) → **Formüller** → **Hesap** → **Konu testi** → **Gözden Geçirelim** → **Çıkmış**.
2. Sorular sınav biçiminde: 5 şık; öncüllü (I–III + kök) sorular ~%30; hesap soruları ~%40 (sayısal derslerde; sözel derste uygulanmaz). Şıklar sıraya bağlı yazılmaz ("yukarıdakilerin hepsi" yok), açıklamada şık harfi geçmez (konu ve tahmin sorularında şıklar karışır).
3. Her soruda neden doğru + en güçlü çeldirici + sayfa. Çeldiriciler sık yapılan hatalardan seçilir (n yerine n−1, kesişimi unutmak, varyans/standart sapma karışması, ağırlıksız ortalama).
4. Her hesap türü için Hesap Atölyesi üreticisi: sayılar her seferinde değişir, yanlış şıklar hata türlerinden üretilir, cevaptan sonra adım adım çözüm.
5. Yanlış defteri ve günün tekrarı motor tarafından tutulur; deneme sınavı gerçek sınav uzunluğunda ve bölüm dağılımında, süreli, sonda bölüm bazında rapor ve 75 çizgisi.
6. Kısa ve net; dolgu, motivasyon cümlesi, çocuk dili yok.
7. Tahmini sorular "Tahmin · henüz sorulmadı" etiketiyle; çıkmış sınavın biçiminde ve zorluğunda, kitapta olup henüz sorulmamış konulardan. Kullanıcıya sınavda çıkacağı garanti olmadığını söyle.

## 3. Depo yapısı
```
public/index.html, dersler.json        ana sayfa (kişi seçimi; ders listesi: kod, ad, kodu, ogrenciler, hazir)
public/ortak/defter.js, defter.css     ortak motor — içerik eklerken DEĞİŞTİRME. Görünüm: gece kara tahtası (menü, tebeşir yazısı Caveat) + çizgili defter sayfası (içerik); telefonda menü ☰ ile soldan açılır
public/<kod>/index.html                ders sayfası (isan/index.html kopyası; yalnız data-ders ve title değişir)
public/<kod>/ders.json                 üretilir: bolumler, kapsamlar (vize/final: bolumler, deneme{soru, sureDk, dagilim, sureNot}), soruDosyalari, cikmisNot
public/<kod>/bolumler/bN.json          üretilir: ozet, kitapNotlari, akildaKalsin, kartlar, ciftler, formuller, sorular
public/<kod>/sorular/*.json            üretilir: çıkmış, gozden.json ve tahmin dosyaları
public/<kod>/atolye.js                 elle: window.ATOLYE = [{id, bolum, ad, aciklama, formul:[formül id], uret()}]
araclar/<kod>/ortak.py                 Q(), T(), kart(), cift(), F(), onc(), frac(), kok() ve doğrulama
araclar/<kod>/bolumler.py, cikmis.py, gozden.py, tahmin.py, uret.py
araclar/test/atolye_stres.js, akis.py (isan), akis_hzpz.py (hzpz)
kaynaklar/<kod>/bolumN.md, cikmis/*.pdf
```
Temalar: Defter (varsayılan: tahta menü + açık defter sayfası; cihaz koyu moddaysa kısılır), Gece ve Tahta (Ela'nın defterindeki koyu temalar; sayfa da koyu). Seçici ana sayfada ve Ayarlar'da; `localStorage` `ankuzef:tema` (kişiden bağımsız), `<html data-tema>`. Yeni ders `index.html`'si isan/hzpz kopyası olduğundan `<head>`'deki erken tema betiğini de taşır. Koyu temada fosfor zemindeki yazı koyu kalmalı (`defter.css` tema bloğu).
İlerleme tarayıcıda: `localStorage` anahtarı `ankuzef:<kişi>:<ders>:<anahtar>` (soru, yanlis, kart, adim, atolye, denemeler, kapsam, sinavTarihi, devam:*). Cihaz değişiminde Ayarlar → Yedeği indir / geri yükle. Bulut eşitleme yok (istenirse ayrı, onaylı iş).

## 4. Şema
- **Soru** (`Q(soru, secenekler[5], dogru, aciklama, sayfa, celdirici=, onculler=, kok=, tablo=T(basliklar, satirlar, baslik=), cozum=[adımlar], kitapNotu=, tabloOnce=True, sabitSik=True, bolum=, no=)`). Öncüllü soruda `soru` boş ya da giriş metni, `onculler` 3 madde, `kok` soru cümlesi; şıklar `onc("Yalnız I", ...)`.
- **Kart** `kart(ad, tanim, sayfa, akil=2–4 kelime, ornek=)`; bölüm başına 20–30 kart, ad benzersiz.
- **Çift** `cift(a, a_tanım, b, b_tanım, fark, [(ifade, "a"|"b"|"ikisi", neden)], ikisi=bool)`; çift başına 3–8 ifade.
- **Formül** `F(id, ad, formul_html, aciklama, ornek, tuzak, sayfa)`; kesir `frac(pay, payda)`, karekök `kok(x)`, alt/üst simge `<sub>`/`<sup>`. Örnekte çıkmış soruya bağla ("2025 vize S17").
- **Özet** `{"baslik", "sayfa", "maddeler": [...]}` ya da `"tablo"`; bir ekranı geçmesin.
- Konu testi: bölüm başına 12–16 soru, her ana kavram en az bir soruda.

## 5. İş akışları
### A. Yeni ders aç (ör. Hizmet Pazarlaması `hzpz`)
1. Kitap PDF'lerini al (Claude projesi dosyaları). Metni `kaynaklar/<kod>/bolumN.md`'ye çıkar, basılı sayfa ofsetini bul.
2. Vize/final bölümlerini kullanıcıdan ya da çıkmış sınavlardan doğrula (tahmin etme).
3. `araclar/isan/`'ı `araclar/<kod>/`'a kopyala, içeriği boşalt; `uret.py`'de `BOLUM_LISTE`, `VIZE`, `FINAL`, `ders` sözlüğü.
4. `public/<kod>/index.html` (kopya, `data-ders="<kod>"`), `public/<kod>/atolye.js` (sayısal ders değilse `window.ATOLYE = []`).
5. `public/dersler.json`'da dersi `hazir: true` yap, `ogrenciler` doğru kişi.
6. Çıkmış sınavları ekle (bölüm 1), sonra her bölümün Gözden Geçirelim sorularını (bölüm 1b), sonra bölümleri (B), sonra tahmini denemeler (C).
### B. Bölüm içeriği yaz
1. `bolumN.md`'yi baştan sona oku; formül ve tablo sayfalarını görüntüden kontrol et.
2. `bolumler.py`'ye `aralik`, `ozet`, `kitapNotlari`, `akildaKalsin` (5–7 madde), `kartlar`, `ciftler`, `formuller`, `sorular`.
3. Çıkmış sorulardaki konulara özellikle kart ve çift yaz; formül örneklerini çıkmış sorulara bağla.
4. Hesap içeren konularda `atolye.js`'e üretici ekle (D).
5. `python3 araclar/<kod>/uret.py` → sayıları kullanıcıya yaz.
### C. Tahmini deneme
- Çıkmış vize/finalin biçiminde 20 soru (bölüm dağılımı `uret.py` kontrol eder), %30 öncüllü, %40 hesap (sayısal derste); çıkmış sorularda sorulmamış konular öncelikli, sorulmuş konular başka açıdan. `tahmin.py` → `DENEMELER`.
- Aynı soru metni iki yerde olmasın (`uret.py` kontrol eder).
### D. Hesap Atölyesi üreticisi
- `uret()` her çağrıda yeni sayılarla `{soru|kok, secenekler[5], dogru: 0, cozum, aciklama, celdirici, sayfa, tablo?, onculler?}` döndürür; uygun sayı bulamazsa `null` (motor yeniden dener). `siklar(dogru, [hata sonuçları], biçim, adım)` 5 farklı şık üretir; `oncullu([I,II,III doğru mu])` öncül şıkları.
- Sonek sorunu: sayıdan sonra Türkçe ek yazma ("26'dır" yanlış çıkabilir); "olarak bulunmuştur", "şöyledir:" kullan. Eksi işareti `tr()` içinde `−`.
- `node araclar/test/atolye_stres.js` her üreticiyi 3000 kez çalıştırır: 5 farklı şık, NaN/undefined yok.
### E. Doğrulama ve teslim
1. `python3 araclar/<kod>/uret.py` (hata varsa yazmaz), `node araclar/test/atolye_stres.js`, yerel sunucu + `python3 araclar/test/akis.py <ekran klasörü>` (isan) ya da `akis_hzpz.py` (hzpz) (çıkmış sınavları ve Gözden Geçirelim'i doğru cevaplarla baştan sona çözer, 100 puan bekler; menü, bölüm adımları, deneme, atölye, tekrar, yanlış defteri, özet, ayar; telefon + koyu tema; yatay taşma; konsol hatası).
2. Ekran görüntülerine bak (özellikle yeni tablo, şekil ve formüller).
3. `taslak`'a gönder; kullanıcıya: ne eklendi (sayılarla), önizleme adresi (`https://taslak--<site>.netlify.app/<kod>/`), canlıda olmayan değişiklikler, "canlıya almak için 'yayınla' de (15 kredi)", kalan plan.

## 6. Derse özgü notlar
### Veri ve İş Analitiği — `isan` (AAUF1405, Şengül)
- Kitap 6 bölüm: B1 İş Analitiği (s. 5–20), B2 Veri Betimlemesi (s. 21–46), B3 Tahminleyici Veri Analizi (s. 47–66) — **vize**; B4 Şebeke Modelleri, B5 Proje Yönetimi (CPM/PERT), B6 Karar Verme — final (final B1–6). B4–6 PDF'leri kendi sayfa numarasıyla (`B4 s. N`, PDF sayfası = basılı sayfa).
- Çıkmış: 2025-26 Güz Vize (A kitapçığı; 20 soru, 5 şık, B1 6 / B2 7 / B3 7, 6 öncüllü, 9 hesap) ve 2025-26 Güz Final (B kitapçığı; 20 soru, B1 1 / B2 2 / B3 2 / B4 5 / B5 5 / B6 5; vize konusu S7, S10, S11, S18, S19; S9 şebeke şekli SVG). Sınav süresi doğrulanamadı (deneme varsayılanı 30 dk, kullanıcı değiştirebilir). Puanlama varsayımı: her soru 5 puan, yanlış doğruyu götürmez (doğrulanamadı).
- 2024-25 Güz Vize/Final/Bütünleme dosyaları AYBS407 Büyük Veri ve İş Analitiği'ne ait; bu dersin kitabında yok, eklenmedi.
- Çeyrek yöntemi kitaptaki: Q1 (n+1)/4., Q3 3(n+1)/4. sıra, ondalık kısım kadar ara fark. Örneklem varyansı n − 1. β₁ = SSXY / bağımsız değişkenin SS'i (kitap korelasyon örneğinde X'i performans almış; regresyonda bağımsız ücret artışı).
- Bilinen kitap hataları `bolumler.py` `kitapNotlari`'nda. Gözden Geçirelim anahtar hataları: B1 S3 (anahtar C, doğrusu D), B5 S10 (anahtar A = 2, doğrusu C = 4); B2 S3'te iki yanlış ifade var (anahtar E). Final bölümleri yazılırken eklenecekler: B5 PERT güven aralığı alt/üst sınır ters (doğrusu 38,14–45,86), B5 Tablo 5.1 E faaliyeti süresi 48 → 4, B6 Tablo 6.3 K1 kötü durum 508 → 50.
- Netlify: proje `ankuzef-defteri` (Ela Beydilli takımı, Ela'nın sitelerinden ayrı kredi). Önizleme `https://taslak--ankuzef-defteri.netlify.app/isan/`. `taslak` dalı Netlify kurulumundan önce gönderildiyse dal yayını oluşmaz; yeni bir gönderim (gerekirse boş commit) tetikler.
- Sıradaki: B4–6 içeriği ve atölye üreticileri (en kısa yol, maksimum akış, CPM erken/geç zaman ve bolluk, PERT beklenen süre ve varyans, maksimaks/maksimin/Hurwicz/minimaks pişmanlık/beklenen değer/EVPI). Bölüm 4–6 Gözden Geçirelim ve 2025-26 Final zaten ekli.

### Hizmet Pazarlaması — `hzpz` (AAUF1401, Kemal)
- Kitap tek PDF (Claude projesi "Ankuzef7- Hizmet Pazarlaması"); proje dosyası yalnız metin olarak okunuyor, şekiller (ör. B2 Şekil 1 pazar stratejisi formülasyon süreci, B5 Şekil 3) görünmüyor. Metin `kaynaklar/hzpz/bolumN.md`, her sayfanın başında `[s. N]` (basılı sayfa; sayfa başlıklarından alındı).
- 6 bölüm: B1 Hizmet Pazarlamasına Giriş (s. 5–29), B2 Pazar Bölümlendirme, Hedef Pazar ve Konumlandırma (s. 31–54), B3 Pazarlama Karması (s. 55–81) — **vize**; B4 İnsan (s. 83–104), B5 Süreç (s. 105–121), B6 Fiziksel Kanıtlar (s. 123–137) — final (final B1–6).
- Sözel ders: Hesap Atölyesi yok (`window.ATOLYE = []`), formül yok; %40 hesap kuralı uygulanmaz, ağırlık kavram çiftlerinde (SERVQUAL boyutları / Bölüm 3'ün 10 kalite unsuru / marka adı ilkeleri, içsel–etkileşimli–dışsal, 4 süreç türü, katılım düzeyleri, fiyat politikaları).
- Çıkmış: 2025-26 Güz Vize (A; B1 7 / B2 7 / B3 6) ve 2025-26 Güz Final (B; B1 1 / B4 7 / B5 7 / B6 5; vize konusu S7). Soru metinleri birebir, yazım hataları dahil. Final kâğıdında doğru şık siyah daire + fosforla işaretli. 2024-25 Vize/Final/Büt dosyaları AYBS401 Dijital Pazarlama (dersin eski adı; E-CRM, Web 2.0, e-ticaret): kitapta yok, eklenmedi.
- Gözden Geçirelim 37 soru (B1 5, B2 5, B3 7, B4 10, B5 5, B6 5). B3 ve B4'te boşluk doldurma soruları var: 5 şıklı soruya çevrildi (`bosluk: True`, `kitapCevap` anahtarın metni, doğru şık `(no + bölüm no) % 5` konumuna kaydırılır). Anahtarda hata yok; B4 S2 anahtarı "yarı pazarlamacı", metinde "yarı zamanlı pazarlamacı".
- Kitap hataları (bölüm yazılırken `kitapNotlari`'na): s. 58 "Hizmet Bakın Mantık" → Hizmet Baskın Mantık; B3 fiyat stratejileri (4)–(6) diye numaralanmış (üç strateji).
- Test: `python3 araclar/test/akis_hzpz.py <ekran klasörü>` (çıkmış vize/final ve Gözden Geçirelim 100, deneme, telefon + koyu tema, taşma, konsol).
- Bölümler ayrı dosyalarda (`araclar/hzpz/b1.py` …), `bolumler.py` bunları toplar; yarım bölüm `hazir=False` iken JSON yazılmaz, parça parça gönderilebilir.
- B1–B3 hazır (özet 6, kart 30/31/31, çift 7, konu testi 14 her biri). Tahmini Vize Denemesi 1 ve 2 (20'şer soru, B1 7 / B2 7 / B3 6; gerçek vizede öncüllü soru yoktu, tahminde 5 ve 4). Önizleme `https://taslak--ankuzef-defteri.netlify.app/hzpz/`. Sıradaki: B4–6 içeriği, sonra final tahmini denemeleri (B1 1 / B4 7 / B5 7 / B6 5).
