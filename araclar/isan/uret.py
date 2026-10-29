"""isan dersinin bütün JSON dosyalarını üretir ve doğrular. Hata varsa hiçbir şey yazmaz.
Çalıştır: python3 araclar/isan/uret.py"""
import sys, os, json, re
sys.path.insert(0, os.path.dirname(__file__))
from ortak import HATA, h, soru_kontrol, yaz
from bolumler import BOLUMLER
from cikmis import CIKMIS_2025_VIZE, CIKMIS_2025_FINAL
from gozden import GOZDEN
from tahmin import DENEMELER as _VD
from tahmin_final import FINAL_DENEMELER
DENEMELER = _VD + FINAL_DENEMELER

BOLUM_LISTE = [
    ("b1", 1, "İş Analitiği", "s. 5–20", True),
    ("b2", 2, "Veri Betimlemesi", "s. 21–46", True),
    ("b3", 3, "Tahminleyici Veri Analizi Uygulaması", "s. 47–66", True),
    ("b4", 4, "Şebeke Modelleri Uygulamaları", "B4 s. 1–46", True),
    ("b5", 5, "Proje Yönetimi Uygulamaları", "B5 s. 1–36", True),
    ("b6", 6, "İş Analitiğinde Karar Verme Uygulamaları", "B6 s. 1–33", True),
]
VIZE = ["b1", "b2", "b3"]
FINAL = ["b1", "b2", "b3", "b4", "b5", "b6"]

soru_dosyalari = []
istatistik = {}

# ---- bölümler ----
for bid, no, baslik, sayfalar, hazir in BOLUM_LISTE:
    if not hazir:
        continue
    B = BOLUMLER[bid]
    ar = B.pop("aralik")
    adlar = [k["ad"] for k in B["kartlar"]]
    if len(adlar) != len(set(adlar)):
        h(f"{bid}: aynı kart adı iki kez")
    for i, q in enumerate(B["sorular"]):
        soru_kontrol(q, f"{bid} konu {i + 1}", ar)
    for c in B["ciftler"]:
        for s in c["sorular"]:
            if s["cevap"] not in ("a", "b", "ikisi"):
                h(f"{bid} çift {c['a']['ad']}: cevap hatalı")
            if s["cevap"] == "ikisi" and not c.get("ikisi"):
                h(f"{bid} çift {c['a']['ad']}: 'ikisi' cevabı var ama ikisi seçeneği kapalı")
    for o in B["ozet"] + B["kartlar"] + B["formuller"]:
        for n in re.findall(r"s\. ?(\d+)", o.get("sayfa", "") or ""):
            if not ar[0] <= int(n) <= ar[1]:
                h(f"{bid}: sayfa {n} aralık dışında ({o.get('baslik') or o.get('ad')})")
    istatistik[bid] = dict(ozet=len(B["ozet"]), kart=len(B["kartlar"]), cift=len(B["ciftler"]), cift_ifade=sum(len(c["sorular"]) for c in B["ciftler"]),
                           formul=len(B["formuller"]), test=len(B["sorular"]))

# ---- çıkmış ----
cik = CIKMIS_2025_VIZE
nolar = [q["no"] for q in cik["sorular"]]
if nolar != list(range(1, 21)):
    h("çıkmış: soru numaraları 1–20 değil")
for q in cik["sorular"]:
    soru_kontrol(q, f"çıkmış S{q['no']}")
    if q["bolum"] not in VIZE:
        h(f"çıkmış S{q['no']}: bölüm hatalı")
cik_dosya = "cikmis_2025_guz_vize.json"
soru_dosyalari.append(cik_dosya)

cikf = CIKMIS_2025_FINAL
if [q["no"] for q in cikf["sorular"]] != list(range(1, 21)):
    h("çıkmış final: soru numaraları 1–20 değil")
for q in cikf["sorular"]:
    soru_kontrol(q, f"çıkmış final S{q['no']}")
    if q["bolum"] not in FINAL:
        h(f"çıkmış final S{q['no']}: bölüm hatalı")
soru_dosyalari.append("cikmis_2025_guz_final.json")

# ---- Gözden Geçirelim ----
gg = []
for bid, qs in GOZDEN.items():
    if [q["kitapNo"] for q in qs] != list(range(1, 11)):
        h(f"gözden {bid}: kitap numaraları 1–10 değil")
    for q in qs:
        soru_kontrol(q, q["id"])
        if "ABCDE"[q["dogru"]] != q["kitapCevap"] and not q.get("kitapNotu"):
            h(f"{q['id']}: doğru şık kitap cevabından farklı ama kitapNotu yok")
    gg += qs
soru_dosyalari.append("gozden.json")

# ---- tahmin ----
tahmin_dosyalar = []
for did, ad, sorular in DENEMELER:
    for i, q in enumerate(sorular):
        q["id"] = f"{did}-{i + 1:02d}"
        soru_kontrol(q, f"{did} S{i + 1}")
        if q.get("bolum") not in (FINAL if did.startswith("f") else VIZE):
            h(f"{did} S{i + 1}: bölüm yok")
    kap = FINAL if did.startswith("f") else VIZE
    dag = {b: sum(1 for q in sorular if q["bolum"] == b) for b in kap}
    if dag != ({"b1": 1, "b2": 2, "b3": 2, "b4": 5, "b5": 5, "b6": 5} if did.startswith("f") else {"b1": 6, "b2": 7, "b3": 7}):
        h(f"{did}: bölüm dağılımı {dag}")
    tahmin_dosyalar.append((f"tahmin_{did}.json", {"kaynak": "tahmin", "deneme": did, "ad": ad, "sorular": sorular}))
    soru_dosyalari.append(f"tahmin_{did}.json")

# aynı soru metni iki yerde mi? (çıkmış hariç; tekrar eden çıkmış soru önemli soru sayılır)
gor = {}
tum = [(f"{bid} konu", q) for bid in BOLUMLER for q in BOLUMLER[bid]["sorular"]] + [(f"{d} tahmin", q) for d, _, qs in DENEMELER for q in qs]
for yer, q in tum:
    m = (q["soru"] + (q.get("kok") or "") + "".join(q.get("onculler") or [])).strip()[:400]
    if m and m in gor:
        h(f"aynı soru iki kez: {yer} ve {gor[m]}")
    gor[m] = yer

ders = {
    "kod": "isan", "ad": "Veri ve İş Analitiği", "dersKodu": "AAUF1405",
    "varsayilanKapsam": "vize",
    "kapsamlar": {
        "vize": {"ad": "Vize", "bolumler": VIZE, "deneme": {"soru": 20, "sureDk": 30, "dagilim": {"b1": 6, "b2": 7, "b3": 7},
                 "sureNot": "Dağılım 2025-26 Güz Vize'den alındı (B1: 6, B2: 7, B3: 7 soru). Sınav süresi doğrulanamadı; varsayılan 30 dakika, sınav giriş belgendeki süreyle değiştir."}},
        "final": {"ad": "Final", "bolumler": FINAL, "deneme": {"soru": 20, "sureDk": 30, "dagilim": {"b1": 1, "b2": 2, "b3": 2, "b4": 5, "b5": 5, "b6": 5},
                  "sureNot": "Dağılım 2025-26 Güz Final'den alındı (B1: 1, B2: 2, B3: 2, B4–B6: beşer soru). Sınav süresi doğrulanamadı; varsayılan 30 dakika."}},
    },
    "bolumler": [{"id": b, "no": n, "baslik": t, "sayfalar": s, "hazir": hz, "sinav": ["Vize", "Final"] if b in VIZE else ["Final"]} for b, n, t, s, hz in BOLUM_LISTE],
    "soruDosyalari": soru_dosyalari,
    "cikmisNot": "2024-25 Güz Vize, Final ve Bütünleme dosyaları başka bir dersin (AYBS407 Büyük Veri ve İş Analitiği: Hadoop, Spark, Hive) sınavı; bu dersin kitabında o konular yok, bu yüzden eklenmedi.",
}

if HATA:
    print("HATA — hiçbir dosya yazılmadı:", *HATA, sep="\n  ")
    sys.exit(1)

yaz("ders.json", ders)
for bid, B in BOLUMLER.items():
    yaz(f"bolumler/{bid}.json", B)
yaz(f"sorular/{cik_dosya}", cik)
yaz("sorular/cikmis_2025_guz_final.json", cikf)
yaz("sorular/gozden.json", {"kaynak": "gozden", "sorular": gg})
for ad, v in tahmin_dosyalar:
    yaz(f"sorular/{ad}", v)

print("Yazıldı.")
for bid, s in istatistik.items():
    print(f"  {bid}: özet {s['ozet']} bölüm | kart {s['kart']} | çift {s['cift']} ({s['cift_ifade']} ifade) | formül {s['formul']} | konu testi {s['test']}")
print(f"  çıkmış final: {len(cikf['sorular'])} soru, bölüm dağılımı", {b: sum(1 for q in cikf['sorular'] if q['bolum'] == b) for b in FINAL})
print(f"  gözden geçirelim: {len(gg)} soru, kitap anahtarından farklı: {[q['id'] for q in gg if 'ABCDE'[q['dogru']] != q['kitapCevap']]}")
print(f"  çıkmış: {len(cik['sorular'])} soru, bölüm dağılımı", {b: sum(1 for q in cik['sorular'] if q['bolum'] == b) for b in VIZE})
for did, ad, qs in DENEMELER:
    print(f"  {ad}: {len(qs)} soru, öncüllü {sum(1 for q in qs if q.get('onculler'))}, doğru şık konumu {[sum(1 for q in qs if q['dogru'] == i) for i in range(5)]}")
konu = [q for B in BOLUMLER.values() for q in B["sorular"]]
print(f"  toplam soru: çıkmış {len(cik['sorular'])} + tahmin {sum(len(x[2]) for x in DENEMELER)} + konu {len(konu)} = {len(cik['sorular']) + sum(len(x[2]) for x in DENEMELER) + len(konu)}")
