"""Yerel uçtan uca test: python3 -m http.server 8765 (public/ içinde) çalışırken
python3 araclar/test/akis.py [çıktı_klasörü]
Masaüstü (açık tema) ve telefon (koyu tema) için: kişi seçimi, menü, çalışma yolu, bölüm adımları,
çıkmış sınavları işaretli cevaplarla baştan sona çözme (100 bekler), Gözden Geçirelim, deneme sınavı,
Hesap Atölyesi, tekrar/yanlış/özet/ayar sayfaları, yatay taşma ve konsol hatası."""
import sys, os, json, urllib.parse
from playwright.sync_api import sync_playwright

URL = "http://localhost:8765/"
OUT = sys.argv[1] if len(sys.argv) > 1 else "/tmp/akis"
os.makedirs(OUT, exist_ok=True)
hatalar = []
KOK = os.path.join(os.path.dirname(__file__), "..", "..", "public", "isan")


def kontrol(kosul, mesaj):
    print(("  ✓ " if kosul else "  ✗ ") + mesaj)
    if not kosul:
        hatalar.append(mesaj)


def git(pg, yol):
    """Hash değişimiyle git (aynı adresse önce başka yere)."""
    pg.evaluate("h => { if (location.hash === h) location.hash = '#ayar'; }", yol)
    pg.evaluate("h => location.hash = h", yol)
    pg.wait_for_timeout(120)


def coz(pg, dogrular, ad):
    """testGiris → Başla → her soruda doğru şıkkı seç."""
    pg.click("[data-basla]")
    for i, d in enumerate(dogrular):
        pg.click(f".secenek[data-sik='{d}']")
        if not pg.locator(".geri h3").inner_text().startswith("Doğru"):
            kontrol(False, f"{ad} S{i + 1}: işaretli cevap doğru sayılmadı")
        pg.click("[data-sonraki]")
    kontrol(pg.locator("text=/ 100").count() > 0 and pg.locator(".defter").inner_text().startswith(pg.locator(".defter h1").inner_text()) and "100" in pg.locator(".kutu").first.inner_text(), f"{ad}: {len(dogrular)}/{len(dogrular)} → 100 puan")


soru = lambda f: [q["dogru"] for q in json.load(open(os.path.join(KOK, "sorular", f), encoding="utf-8"))["sorular"]]
GG = json.load(open(os.path.join(KOK, "sorular", "gozden.json"), encoding="utf-8"))["sorular"]

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

        pg.goto(URL); pg.click("text=Şengül")
        kontrol(pg.is_visible("text=Merhaba Şengül"), "ana sayfa + kişi")
        pg.screenshot(path=f"{OUT}/{ad}-0-ana.png", full_page=True)
        pg.click("text=Veri ve İş Analitiği"); pg.wait_for_selector(".yol")
        kontrol(pg.locator(".yol li").count() == 5, "çalışma yolu 5 adım")
        pg.screenshot(path=f"{OUT}/{ad}-1-pano.png", full_page=True)

        # menü: telefonda ☰ ile açılır
        if ad == "tel":
            kontrol(not pg.locator("#menu").is_visible() or pg.evaluate("getComputedStyle(document.querySelector('#menu')).transform") != "none", "telefonda menü kapalı başlar")
            pg.click(".menu-ac"); pg.wait_for_timeout(300)
            pg.screenshot(path=f"{OUT}/{ad}-menu.png")
            pg.click("#menu >> text=Konu çalış"); pg.wait_for_timeout(300)
            kontrol(not pg.evaluate("document.querySelector('#menu').classList.contains('acik')"), "menüden seçince menü kapanır")
        else:
            pg.click("#menu >> text=Konu çalış")
        pg.wait_for_timeout(300)  # içerik hash değişiminden sonra çizilir
        kontrol(pg.locator(".defter h1").inner_text().startswith("1. Konu"), "menü → Konu çalış")

        # bölüm adımları
        git(pg, "#b/b2/ozet")
        adim = pg.locator(".adimlar-serit a").count()
        kontrol(adim == 8, f"Bölüm 2'de 8 adım ({adim})")
        if ad == "masa": pg.screenshot(path=f"{OUT}/{ad}-b2-ozet.png", full_page=True)
        for sek in ["kartlar", "ciftler", "formul", "hesap", "test", "gozden", "cikmis"]:
            git(pg, f"#b/b2/{sek}")
            if not pg.locator("#sekme").inner_text().strip(): kontrol(False, f"b2 {sek} boş")
        kontrol(True, "b2 adımlarının hepsi dolu")
        git(pg, "#b/b2/formul")
        if ad == "masa": pg.screenshot(path=f"{OUT}/{ad}-b2-formul.png", full_page=True)
        git(pg, "#konu")
        kontrol("1 / 8" in pg.locator(".defter").inner_text() or "2 / 8" in pg.locator(".defter").inner_text(), "özet/formül adımı tamamlandı sayıldı")

        # kartlar
        git(pg, "#b/b1/kartlar"); pg.click("[data-ac]"); pg.click("[data-bil='1']"); pg.click("[data-ac]"); pg.click("[data-bil='0']")
        kontrol(len(pg.evaluate("JSON.parse(localStorage.getItem('ankuzef:Şengül:isan:kart'))")) == 2, "iki kart kaydedildi")
        # çift
        git(pg, "#b/b1/ciftler"); pg.click("[data-cift='0']"); pg.click("[data-c]")
        kontrol(pg.is_visible(".geri"), "karıştırılanlar geri bildirimi")
        if ad == "tel": pg.screenshot(path=f"{OUT}/{ad}-cift.png", full_page=True)

        # çıkmış: vize
        git(pg, "#cikmis"); pg.screenshot(path=f"{OUT}/{ad}-cikmis.png", full_page=True)
        kontrol(pg.is_visible("text=Finalde çıkmış vize soruları"), "vize kapsamında 'Finalde çıkmış vize soruları' var")
        kontrol(pg.locator("text=2025-26 Güz Final").count() == 0 or "Final ve bütünlemede" in pg.locator(".defter").inner_text(), "vize kapsamında tam final sınavı listelenmez")
        git(pg, "#cikmis/" + urllib.parse.quote("2025-26 Güz Vize"))
        dv = soru("cikmis_2025_guz_vize.json")
        pg.click("[data-basla]")
        for i, d in enumerate(dv):
            pg.click(f".secenek[data-sik='{d}']")
            if i == 0 and ad == "masa": pg.wait_for_timeout(600); pg.screenshot(path=f"{OUT}/{ad}-cikmis-s1.png", full_page=True)
            if not pg.locator(".geri h3").inner_text().startswith("Doğru"): kontrol(False, f"vize S{i + 1}")
            pg.click("[data-sonraki]")
        kontrol("100" in pg.locator(".kutu").first.inner_text(), "2025-26 Güz Vize: 20/20 → 100")
        # finalde çıkmış vize
        git(pg, "#cikmis/finalvize")
        fq = json.load(open(os.path.join(KOK, "sorular", "cikmis_2025_guz_final.json"), encoding="utf-8"))["sorular"]
        fv = [q for q in fq if q["bolum"] in ("b1", "b2", "b3")]
        kontrol(f"{len(fv)} soru" in pg.locator(".defter").inner_text(), f"finalde çıkmış vize: {len(fv)} soru")
        pg.click("[data-basla]")
        for q in sorted(fv, key=lambda x: x["no"]):
            pg.click(f".secenek[data-sik='{q['dogru']}']")
            if not pg.locator(".geri h3").inner_text().startswith("Doğru"): kontrol(False, f"finalvize S{q['no']}")
            if q["no"] == 19 and ad == "tel": pg.screenshot(path=f"{OUT}/{ad}-finalvize.png", full_page=True)
            pg.click("[data-sonraki]")
        kontrol("100" in pg.locator(".kutu").first.inner_text(), "finalde çıkmış vize: hepsi doğru → 100")

        # Gözden Geçirelim B1
        git(pg, "#gozden"); kontrol(pg.locator(".satirlar li").count() == 3, "vize kapsamında Gözden Geçirelim 3 bölüm")
        git(pg, "#gozden/b1"); pg.click("[data-basla]")
        for i, q in enumerate([q for q in GG if q["bolum"] == "b1"]):
            pg.click(f".secenek[data-sik='{q['dogru']}']")
            t = pg.locator(".geri").inner_text()
            if not t.startswith("Doğru") or "cevap anahtarı" not in t: kontrol(False, f"gözden b1 S{i + 1}")
            if i == 2 and ad == "masa": pg.screenshot(path=f"{OUT}/{ad}-gozden-s3.png", full_page=True)
            pg.click("[data-sonraki]")
        kontrol("100" in pg.locator(".kutu").first.inner_text(), "Gözden Geçirelim B1: 10/10 → 100")

        # deneme vize
        git(pg, "#deneme"); pg.click("text=Sınavı başlat")
        kontrol(pg.locator(".harita button").count() == 20, "vize denemesi 20 soru")
        if ad == "tel": pg.screenshot(path=f"{OUT}/{ad}-deneme.png", full_page=True)
        pg.locator(".secenek").first.click(); pg.click("[data-bitir]"); pg.click("[data-bitir]")
        kontrol(pg.is_visible("text=Bölümlere göre"), "deneme raporu")

        # final kapsamı
        if ad == "tel": pg.click(".menu-ac"); pg.wait_for_timeout(250)
        pg.click("#menu [data-kapsam='final']"); pg.wait_for_timeout(150)
        if ad == "tel": pg.click(".menu-ac") if pg.evaluate("document.querySelector('#menu').classList.contains('acik')") else None
        git(pg, "#cikmis/" + urllib.parse.quote("2025-26 Güz Final"))
        pg.click("[data-basla]")
        for q in fq:
            pg.click(f".secenek[data-sik='{q['dogru']}']")
            if not pg.locator(".geri h3").inner_text().startswith("Doğru"): kontrol(False, f"final S{q['no']}")
            if q["no"] == 9: pg.screenshot(path=f"{OUT}/{ad}-final-s9.png", full_page=True)
            pg.click("[data-sonraki]")
        kontrol("100" in pg.locator(".kutu").first.inner_text(), "2025-26 Güz Final: 20/20 → 100")
        git(pg, "#gozden"); kontrol(pg.locator(".satirlar li").count() == 6, "final kapsamında Gözden Geçirelim 6 bölüm")
        for bid in ("b4", "b5", "b6"):
            git(pg, f"#gozden/{bid}"); pg.click("[data-basla]")
            for i, q in enumerate([q for q in GG if q["bolum"] == bid]):
                pg.click(f".secenek[data-sik='{q['dogru']}']")
                if not pg.locator(".geri h3").inner_text().startswith("Doğru"): kontrol(False, f"gözden {bid} S{i + 1}")
                pg.click("[data-sonraki]")
            kontrol("100" in pg.locator(".kutu").first.inner_text(), f"Gözden Geçirelim {bid}: 10/10 → 100")
        git(pg, "#deneme"); pg.click("text=Sınavı başlat")
        kontrol(pg.locator(".harita button").count() == 20, "final denemesi 20 soru")
        pg.click("[data-bitir]"); pg.click("[data-bitir]")
        git(pg, "#b/b5/ozet"); kontrol("hazırlanıyor" in pg.locator(".defter").inner_text(), "hazır olmayan bölümde yönlendirme")
        if ad == "tel": pg.click(".menu-ac"); pg.wait_for_timeout(250)
        pg.click("#menu [data-kapsam='vize']"); pg.wait_for_timeout(150)

        # atölye
        git(pg, "#atolye")
        gens = pg.evaluate("window.ATOLYE.map(g=>g.id)")
        for g in gens:
            git(pg, f"#atolye/{g}")
            if pg.locator(".secenek").count() != 5: kontrol(False, f"atölye {g}")
            pg.locator(".secenek").first.click()
            if not pg.is_visible(".geri"): kontrol(False, f"atölye {g} geri bildirim")
        kontrol(True, f"atölye: {len(gens)} üretici açıldı ve cevaplandı")
        for yol in ["#tekrar", "#yanlis", "#ozet", "#ayar", "#tahmin", "#tahmin/t1", "#konu", "#"]:
            git(pg, yol)
            if len(pg.locator("#icerik").inner_text()) < 30: kontrol(False, f"{yol} boş")
        kontrol(True, "tekrar, yanlış, özet, ayar, tahmin sayfaları açıldı")
        git(pg, "#"); pg.screenshot(path=f"{OUT}/{ad}-2-pano-sonra.png", full_page=True)
        for yol in ["#", "#b/b2/formul", "#cikmis/" + urllib.parse.quote("2025-26 Güz Final"), "#atolye/kumulatif", "#b/b1/ozet", "#gozden/b4"]:
            git(pg, yol)
            sw = pg.evaluate("document.documentElement.scrollWidth - window.innerWidth")
            if sw > 2: kontrol(False, f"yatay taşma {sw}px: {yol}")
        kontrol(not konsol, "konsol hatası yok" + (": " + "; ".join(konsol[:3]) if konsol else ""))
        ctx.close()
    b.close()
print("\nSONUÇ:", "hepsi geçti" if not hatalar else f"{len(hatalar)} hata")
sys.exit(1 if hatalar else 0)
