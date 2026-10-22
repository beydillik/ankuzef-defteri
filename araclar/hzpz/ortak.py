"""hzpz (Hizmet Pazarlaması) içerik üreticisi için ortak yardımcılar ve doğrulama.
Kullanım: python3 araclar/hzpz/uret.py   → public/hzpz/ altına JSON yazar (hata varsa yazmaz)."""
import json, os, re

KOK = os.path.join(os.path.dirname(__file__), "..", "..", "public", "hzpz")


def frac(a, b):
    return f'<span class="frac"><span>{a}</span><span>{b}</span></span>'


def kok(x):
    return f'√<span class="kok">{x}</span>'


def T(basliklar, satirlar, baslik=None):
    t = {"basliklar": basliklar, "satirlar": [[str(c) for c in r] for r in satirlar]}
    if baslik:
        t["baslik"] = baslik
    return t


def Q(soru, secenekler, dogru, aciklama, sayfa, celdirici=None, onculler=None, kok=None, tablo=None, cozum=None, kitapNotu=None, **ek):
    q = {"soru": soru, "secenekler": secenekler, "dogru": dogru, "aciklama": aciklama, "sayfa": sayfa}
    for k, v in (("celdirici", celdirici), ("onculler", onculler), ("kok", kok), ("tablo", tablo), ("cozum", cozum), ("kitapNotu", kitapNotu)):
        if v is not None:
            q[k] = v
    q.update(ek)
    return q


ONC = ["Yalnız I", "Yalnız II", "Yalnız III", "I ve II", "I ve III", "II ve III", "I, II ve III"]


def onc(*secim):
    """öncüllü şıklar: onc('Yalnız I','I ve II',...)"""
    for s in secim:
        assert s in ONC, s
    return list(secim)


def kart(ad, tanim, sayfa, akil=None, ornek=None):
    k = {"ad": ad, "tanim": tanim, "sayfa": sayfa}
    if akil:
        k["akil"] = akil
    if ornek:
        k["ornek"] = ornek
    return k


def cift(a, at, b, bt, fark, sorular, ikisi=False):
    c = {"a": {"ad": a, "tanim": at}, "b": {"ad": b, "tanim": bt}, "fark": fark,
         "sorular": [{"ifade": i, "cevap": c_, "neden": n} for i, c_, n in sorular]}
    if ikisi:
        c["ikisi"] = True
    return c


def F(id_, ad, formul, aciklama=None, ornek=None, tuzak=None, sayfa=None):
    f = {"id": id_, "ad": ad, "formul": formul}
    for k, v in (("aciklama", aciklama), ("ornek", ornek), ("tuzak", tuzak), ("sayfa", sayfa)):
        if v:
            f[k] = v
    return f


# ---------------- doğrulama ----------------
HATA = []


def h(m):
    HATA.append(m)


def soru_kontrol(q, yer, sayfa_araligi=None):
    s = q.get("secenekler", [])
    if len(s) != 5:
        h(f"{yer}: 5 şık değil ({len(s)})")
    if len(set(s)) != len(s):
        h(f"{yer}: aynı şık iki kez")
    if not isinstance(q.get("dogru"), int) or not 0 <= q["dogru"] < len(s):
        h(f"{yer}: doğru indeksi hatalı")
    if not q.get("aciklama"):
        h(f"{yer}: açıklama yok")
    if not q.get("sayfa"):
        h(f"{yer}: sayfa yok")
    if q.get("onculler") and not q.get("kok"):
        h(f"{yer}: öncül var kök yok")
    metin = json.dumps(q, ensure_ascii=False)
    if re.search(r"\b[a-eA-E]\) şık|[A-E] şıkkı", metin):
        h(f"{yer}: açıklamada şık harfi geçiyor (şıklar karışabilir)")
    if sayfa_araligi:
        for n in re.findall(r"s\. ?(\d+)", q.get("sayfa", "")):
            if not sayfa_araligi[0] <= int(n) <= sayfa_araligi[1]:
                h(f"{yer}: sayfa {n} bölüm aralığı dışında {sayfa_araligi}")


def yaz(yol, veri):
    yol = os.path.join(KOK, yol)
    os.makedirs(os.path.dirname(yol), exist_ok=True)
    with open(yol, "w", encoding="utf-8") as f:
        json.dump(veri, f, ensure_ascii=False, indent=1)
