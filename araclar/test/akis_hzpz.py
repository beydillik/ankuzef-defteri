"""Hizmet Pazarlaması (hzpz) uçtan uca test: python3 -m http.server 8765 (public/ içinde) çalışırken
python3 araclar/test/akis_hzpz.py [çıktı_klasörü]
Masaüstü (açık) ve telefon (koyu): Kemal → ders, çalışma yolu, çıkmış vize ve finali işaretli cevaplarla çözme (100),
finalde çıkmış vize sorusu, Gözden Geçirelim 6 bölüm (100), vize ve final denemesi, hazır olmayan bölüm sayfası,
diğer sayfalar, yatay taşma ve konsol hatası."""
import sys, os, json, urllib.parse
from playwright.sync_api import sync_playwright

URL = "http://localhost:8765/"
OUT = sys.argv[1] if len(sys.argv) > 1 else "/tmp/akis_hzpz"
os.makedirs(OUT, exist_ok=True)
KOK = os.path.join(os.path.dirname(__file__), "..", "..", "public", "hzpz")
hatalar = []


def kontrol(kosul, mesaj):
    print(("  ✓ " if kosul else "  ✗ ") + mesaj)
    if not kosul:
        hatalar.append(mesaj)


def git(pg, yol):
    pg.evaluate("h => { if (location.hash === h) location.hash = '#ayar'; }", yol)
    pg.evaluate("h => location.hash = h", yol)
    pg.wait_for_timeout(120)


def coz(pg, sorular, ad, ekran=None):
    pg.click("[data-basla]")
    for i, q in enumerate(sorular):
        pg.click(f".secenek[data-sik='{q['dogru']}']")
        if not pg.locator(".geri h3").inner_text().startswith("Doğru"):
            kontrol(False, f"{ad} S{i + 1}: işaretli cevap doğru sayılmadı")
        if ekran and i == ekran[0]:
            pg.wait_for_timeout(400); pg.screenshot(path=ekran[1], full_page=True)
        pg.click("[data-sonraki]")
    kontrol("100" in pg.locator(".kutu").first.inner_text(), f"{ad}: {len(sorular)}/{len(sorular)} → 100")


yukle = lambda f: json.load(open(os.path.join(KOK, "sorular", f), encoding="utf-8"))["sorular"]
VZ, FN, GG = yukle("cikmis_2025_guz_vize.json"), yukle("cikmis_2025_guz_final.json"), yukle("gozden.json")

with sync_playwright() as p:
    b = p.chromium.launch()
    for ad, vp, sema in [("masa", {"width": 1280, "height": 900}, "light"), ("tel", {"width": 390, "height": 844}, "dark")]:
        print(f"== {ad} ({sema})")
        ctx = b.new_context(viewport=vp, color_scheme=sema)
        pg = ctx.new_page()
        konsol = []
        pg.on("console", lambda m: m.type == "error" and not any(x in m.text for x in ("fonts.g", "ERR_TUNNEL", "ERR_FAILED")) and konsol.append(m.text))
        pg.on("pageerror", lambda e: konsol.append(str(e)))
        pg.route("**/fonts.g*/**", lambda r: r.abort())

        pg.goto(URL); pg.click("text=Kemal")
        kontrol(pg.is_visible("text=Hizmet Pazarlaması"), "ana sayfa: Kemal'de Hizmet Pazarlaması")
        pg.screenshot(path=f"{OUT}/{ad}-0-ana.png", full_page=True)
        pg.click("text=Hizmet Pazarlaması"); pg.wait_for_selector(".yol")
        kontrol(pg.locator(".yol li").count() == 5, "çalışma yolu 5 adım")
        pg.screenshot(path=f"{OUT}/{ad}-1-pano.png", full_page=True)
        if ad == "tel":
            pg.click(".menu-ac"); pg.wait_for_timeout(300); pg.screenshot(path=f"{OUT}/{ad}-menu.png"); pg.click("#menu >> text=Konu çalış"); pg.wait_for_timeout(300)

        git(pg, "#konu"); kontrol("hazırlanıyor" in pg.locator(".defter").inner_text(), "konu sayfası: bölümler 'hazırlanıyor'")
        git(pg, "#b/b1/ozet"); kontrol("hazırlanıyor" in pg.locator(".defter").inner_text(), "hazır olmayan bölüm sayfası açılıyor")
        if ad == "masa": pg.screenshot(path=f"{OUT}/{ad}-b1.png", full_page=True)

        # çıkmış vize
        git(pg, "#cikmis"); pg.screenshot(path=f"{OUT}/{ad}-cikmis.png", full_page=True)
        kontrol("Dijital Pazarlama" in pg.locator(".defter").inner_text(), "çıkmış sayfasında Dijital Pazarlama notu")
        git(pg, "#cikmis/" + urllib.parse.quote("2025-26 Güz Vize"))
        coz(pg, VZ, "2025-26 Güz Vize", (0, f"{OUT}/{ad}-vize-s1.png"))
        git(pg, "#cikmis/finalvize")
        fv = [q for q in FN if q["bolum"] in ("b1", "b2", "b3")]
        kontrol(f"{len(fv)} soru" in pg.locator(".defter").inner_text(), f"finalde çıkmış vize: {len(fv)} soru")
        coz(pg, fv, "finalde çıkmış vize")

        # Gözden Geçirelim vize
        git(pg, "#gozden"); kontrol(pg.locator(".satirlar li").count() == 3, "vize kapsamında Gözden Geçirelim 3 bölüm")
        for bid in ("b1", "b2", "b3"):
            git(pg, f"#gozden/{bid}")
            coz(pg, [q for q in GG if q["bolum"] == bid], f"Gözden Geçirelim {bid}", (0, f"{OUT}/{ad}-gozden-b3-s1.png") if bid == "b3" else None)

        # deneme vize
        git(pg, "#deneme"); pg.click("text=Sınavı başlat")
        kontrol(pg.locator(".harita button").count() == 20, "vize denemesi 20 soru")
        if ad == "tel": pg.screenshot(path=f"{OUT}/{ad}-deneme.png", full_page=True)
        pg.locator(".secenek").first.click(); pg.click("[data-bitir]"); pg.click("[data-bitir]")
        kontrol(pg.is_visible("text=Bölümlere göre"), "vize deneme raporu")

        # final kapsamı
        if ad == "tel": pg.click(".menu-ac"); pg.wait_for_timeout(250)
        pg.click("#menu [data-kapsam='final']"); pg.wait_for_timeout(150)
        if ad == "tel" and pg.evaluate("document.querySelector('#menu').classList.contains('acik')"): pg.click(".menu-ac")
        git(pg, "#cikmis/" + urllib.parse.quote("2025-26 Güz Final"))
        coz(pg, FN, "2025-26 Güz Final", (8, f"{OUT}/{ad}-final-s9.png"))
        git(pg, "#gozden"); kontrol(pg.locator(".satirlar li").count() == 6, "final kapsamında Gözden Geçirelim 6 bölüm")
        for bid in ("b4", "b5", "b6"):
            git(pg, f"#gozden/{bid}"); coz(pg, [q for q in GG if q["bolum"] == bid], f"Gözden Geçirelim {bid}")
        git(pg, "#deneme"); pg.click("text=Sınavı başlat")
        kontrol(pg.locator(".harita button").count() == 20, "final denemesi 20 soru")
        pg.click("[data-bitir]"); pg.click("[data-bitir]")
        if ad == "tel": pg.click(".menu-ac"); pg.wait_for_timeout(250)
        pg.click("#menu [data-kapsam='vize']"); pg.wait_for_timeout(150)

        for yol in ["#tekrar", "#yanlis", "#ozet", "#ayar", "#tahmin", "#atolye", "#konu", "#"]:
            git(pg, yol)
            if len(pg.locator("#icerik").inner_text()) < 30: kontrol(False, f"{yol} boş")
        kontrol(True, "tekrar, yanlış, özet, ayar, tahmin, atölye sayfaları açıldı")
        git(pg, "#"); pg.screenshot(path=f"{OUT}/{ad}-2-pano-sonra.png", full_page=True)
        for yol in ["#", "#cikmis/" + urllib.parse.quote("2025-26 Güz Vize"), "#gozden/b3", "#gozden/b4", "#b/b2/ozet", "#deneme"]:
            git(pg, yol)
            sw = pg.evaluate("document.documentElement.scrollWidth - window.innerWidth")
            if sw > 2: kontrol(False, f"yatay taşma {sw}px: {yol}")
        kontrol(not konsol, "konsol hatası yok" + (": " + "; ".join(konsol[:3]) if konsol else ""))
        ctx.close()
    b.close()
print("\nSONUÇ:", "hepsi geçti" if not hatalar else f"{len(hatalar)} hata")
sys.exit(1 if hatalar else 0)
