# ANKUZEF Defteri

Kemal ve Şengül'ün ANKUZEF açık öğretim sınavlarına hazırlık sitesi. Statik site (HTML + JS + JSON), Netlify'da yayınlanır, `public/` klasörü kökü.

| Ders | Kod | Kim | Durum |
|---|---|---|---|
| Veri ve İş Analitiği (AAUF1405) | `isan` | Şengül | Vize (Bölüm 1–3) hazır; final (Bölüm 4–6) sırada |
| Hizmet Pazarlaması | `hzpz` | Kemal | Hazırlanacak |

## Klasörler
```
public/index.html, dersler.json     ana sayfa: kişi seçimi + ders listesi
public/ortak/defter.js, .css        ortak motor (bütün dersler)
public/<kod>/index.html             ders sayfası (isan/index.html kopyası, data-ders değişir)
public/<kod>/ders.json              bölümler, vize/final kapsamı, deneme dağılımı   ← üretilir
public/<kod>/bolumler/bN.json       özet, kartlar, karıştırılanlar, formüller, konu testi   ← üretilir
public/<kod>/sorular/*.json         çıkmış sınavlar ve tahmini denemeler   ← üretilir
public/<kod>/atolye.js              Hesap Atölyesi soru üreticileri (elle yazılır)
araclar/<kod>/*.py                  içeriğin kaynağı; JSON'lar buradan üretilir
araclar/test/                       doğrulama: atolye_stres.js, akis.py (Playwright)
kaynaklar/<kod>/                    kitap metni (bolumN.md) ve çıkmış sınav PDF'leri
```

## İçerik güncelleme
JSON dosyaları elle düzenlenmez. `araclar/isan/` altındaki Python dosyasını düzenle, sonra:
```
python3 araclar/isan/uret.py          # doğrular; hata varsa hiçbir şey yazmaz
node araclar/test/atolye_stres.js     # Hesap Atölyesi üreticileri (3000'er deneme)
cd public && python3 -m http.server 8765 &   # sonra: python3 araclar/test/akis.py
```

## Yayın
`taslak` dalı çalışma dalıdır (Netlify dal önizlemesi, kredi harcamaz). `main` canlı sitedir; her gönderim bir canlı yayın (Netlify ücretsiz planda 15 kredi) demektir.
