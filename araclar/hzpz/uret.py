"""hzpz (Hizmet Pazarlaması) dersinin bütün JSON dosyalarını üretir ve doğrular. Hata varsa hiçbir şey yazmaz.
Çalıştır: python3 araclar/hzpz/uret.py"""
import sys, os, re
sys.path.insert(0, os.path.dirname(__file__))
from ortak import HATA, h, soru_kontrol, yaz
from bolumler import BOLUMLER
from cikmis import CIKMIS_2025_VIZE, CIKMIS_2025_FINAL
from gozden import GOZDEN, ADET
from tahmin import DENEMELER

# (id, no, başlık, sayfalar, hazır mı, sayfa aralığı)
BOLUM_LISTE = [
    ("b1", 1, "Hizmet Pazarlamasına Giriş", "s. 5–29", True, (5, 29)),
    ("b2", 2, "Hizmetlerde Pazar Bölümlendirme, Hedef Pazar Seçimi ve Konumlandırma", "s. 31–54", False, (31, 54)),
    ("b3", 3, "Hizmetlerde Pazarlama Karması", "s. 55–81", False, (55, 81)),
    ("b4", 4, "Hizmet Pazarlamasında İnsan", "s. 83–104", False, (83, 104)),
    ("b5", 5, "Hizmet Pazarlamasında Süreç", "s. 105–121", False, (105, 121)),
    ("b6", 6, "Hizmet Pazarlamasında Fiziksel Kanıtlar", "s. 123–137", False, (123, 137)),
]
ARALIK = {b[0]: b[5] for b in BOLUM_LISTE}
HAZIR = {b[0]: b[4] for b in BOLUM_LISTE}
VIZE = ["b1", "b2", "b3"]
FINAL = ["b1", "b2", "b3", "b4", "b5", "b6"]
VIZE_DAG = {"b1": 7, "b2": 7, "b3": 6}               # 2025-26 Güz Vize
FINAL_DAG = {"b1": 1, "b4": 7, "b5": 7, "b6": 5}     # 2025-26 Güz Final

soru_dosyalari = []
istatistik = {}

# ---- bölümler ----
for bid, no, baslik, sayfalar, hazir, ar in BOLUM_LISTE:
    if not hazir:
        continue
    B = BOLUMLER[bid]
    B.pop("aralik", None)
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
    for o in B["ozet"] + B["kartlar"]:
        for n in re.findall(r"s\. ?(\d+)", o.get("sayfa", "") or ""):
            if not ar[0] <= int(n) <= ar[1]:
                h(f"{bid}: sayfa {n} aralık dışında ({o.get('baslik') or o.get('ad')})")
    B.setdefault("formuller", [])
    istatistik[bid] = dict(ozet=len(B["ozet"]), kart=len(B["kartlar"]), cift=len(B["ciftler"]), cift_ifade=sum(len(c["sorular"]) for c in B["ciftler"]), test=len(B["sorular"]))

# ---- çıkmış ----
for cik, kapsam, dag, ad in ((CIKMIS_2025_VIZE, VIZE, VIZE_DAG, "vize"), (CIKMIS_2025_FINAL, FINAL, FINAL_DAG, "final")):
    if [q["no"] for q in cik["sorular"]] != list(range(1, 21)):
        h(f"çıkmış {ad}: soru numaraları 1–20 değil")
    for q in cik["sorular"]:
        if not q.get("id"):
            h(f"çıkmış {ad} S{q['no']}: id yok")
        soru_kontrol(q, f"çıkmış {ad} S{q['no']}", ARALIK.get(q["bolum"]))
        if q["bolum"] not in kapsam:
            h(f"çıkmış {ad} S{q['no']}: bölüm hatalı")
    gercek = {b: n for b in FINAL if (n := sum(1 for q in cik["sorular"] if q["bolum"] == b))}
    if gercek != dag:
        h(f"çıkmış {ad}: bölüm dağılımı {gercek}, ders.json'daki {dag}")
soru_dosyalari += ["cikmis_2025_guz_vize.json", "cikmis_2025_guz_final.json"]

# ---- Gözden Geçirelim ----
gg = []
for bid, qs in GOZDEN.items():
    if [q["kitapNo"] for q in qs] != list(range(1, ADET[bid] + 1)):
        h(f"gözden {bid}: kitap numaraları 1–{ADET[bid]} değil")
    for q in qs:
        soru_kontrol(q, q["id"], ARALIK[bid])
        if not q.get("bosluk") and "ABCDE"[q["dogru"]] != q["kitapCevap"] and not q.get("kitapNotu"):
            h(f"{q['id']}: doğru şık kitap cevabından farklı ama kitapNotu yok")
    gg += qs
soru_dosyalari.append("gozden.json")

# ---- tahmin ----
tahmin_dosyalar = []
for did, ad, sorular in DENEMELER:
    for i, q in enumerate(sorular):
        q["id"] = f"{did}-{i + 1:02d}"
        soru_kontrol(q, f"{did} S{i + 1}", ARALIK.get(q.get("bolum")))
        if q.get("bolum") not in VIZE:
            h(f"{did} S{i + 1}: bölüm yok")
    dag = {b: sum(1 for q in sorular if q["bolum"] == b) for b in VIZE}
    if dag != VIZE_DAG:
        h(f"{did}: bölüm dağılımı {dag}")
    tahmin_dosyalar.append((f"tahmin_{did}.json", {"kaynak": "tahmin", "deneme": did, "ad": ad, "sorular": sorular}))
    soru_dosyalari.append(f"tahmin_{did}.json")

# aynı soru metni iki yerde mi? (çıkmış hariç; tekrar eden çıkmış soru önemli soru sayılır)
gor = {}
tum = [(f"{bid} konu", q) for bid in BOLUMLER for q in BOLUMLER[bid].get("sorular", [])] + [(f"{d} tahmin", q) for d, _, qs in DENEMELER for q in qs] + [(q["id"], q) for q in gg]
for yer, q in tum:
    m = (q["soru"] + (q.get("kok") or "") + "".join(q.get("onculler") or [])).strip()[:400]
    if m and m in gor:
        h(f"aynı soru iki kez: {yer} ve {gor[m]}")
    gor[m] = yer

ders = {
    "kod": "hzpz", "ad": "Hizmet Pazarlaması", "dersKodu": "AAUF1401",
    "varsayilanKapsam": "vize",
    "kapsamlar": {
        "vize": {"ad": "Vize", "bolumler": VIZE, "deneme": {"soru": 20, "sureDk": 30, "dagilim": VIZE_DAG,
                 "sureNot": "Dağılım 2025-26 Güz Vize'den alındı (B1: 7, B2: 7, B3: 6 soru). Sınav süresi doğrulanamadı; varsayılan 30 dakika, sınav giriş belgendeki süreyle değiştir."}},
        "final": {"ad": "Final", "bolumler": FINAL, "deneme": {"soru": 20, "sureDk": 30, "dagilim": FINAL_DAG,
                  "sureNot": "Dağılım 2025-26 Güz Final'den alındı (B1: 1, B4: 7, B5: 7, B6: 5 soru; B2 ve B3'ten soru gelmedi). Sınav süresi doğrulanamadı; varsayılan 30 dakika."}},
    },
    "bolumler": [{"id": b, "no": n, "baslik": t, "sayfalar": s, "hazir": hz, "sinav": ["Vize", "Final"] if b in VIZE else ["Final"]} for b, n, t, s, hz, _ in BOLUM_LISTE],
    "soruDosyalari": soru_dosyalari,
    "cikmisNot": "Ders 2024-25'te AYBS401 Dijital Pazarlama adıyla veriliyordu. O yılın Vize, Final ve Bütünleme sınavları (E-CRM, Web 2.0, e-ticaret, remarketing) bu kitapta yok; eklenmedi.",
}

if HATA:
    print("HATA — hiçbir dosya yazılmadı:", *HATA, sep="\n  ")
    sys.exit(1)

yaz("ders.json", ders)
for bid, B in BOLUMLER.items():
    if HAZIR.get(bid):
        yaz(f"bolumler/{bid}.json", B)
yaz("sorular/cikmis_2025_guz_vize.json", CIKMIS_2025_VIZE)
yaz("sorular/cikmis_2025_guz_final.json", CIKMIS_2025_FINAL)
yaz("sorular/gozden.json", {"kaynak": "gozden", "sorular": gg})
for ad, v in tahmin_dosyalar:
    yaz(f"sorular/{ad}", v)

print("Yazıldı.")
for bid, s in istatistik.items():
    print(f"  {bid}: özet {s['ozet']} | kart {s['kart']} | çift {s['cift']} ({s['cift_ifade']} ifade) | konu testi {s['test']}")
for cik in (CIKMIS_2025_VIZE, CIKMIS_2025_FINAL):
    qs = cik["sorular"]
    print(f"  {cik['sinav']}: {len(qs)} soru, dağılım", {b: n for b in FINAL if (n := sum(1 for q in qs if q['bolum'] == b))}, "| doğru şık konumu", [sum(1 for q in qs if q['dogru'] == i) for i in range(5)])
print(f"  Gözden Geçirelim: {len(gg)} soru", {b: len(v) for b, v in GOZDEN.items()}, f"| boşluk doldurmadan çevrilen {sum(1 for q in gg if q.get('bosluk'))} | anahtardan farklı: {[q['id'] for q in gg if not q.get('bosluk') and 'ABCDE'[q['dogru']] != q['kitapCevap']]}")
print(f"  tahmini deneme: {len(DENEMELER)}")
