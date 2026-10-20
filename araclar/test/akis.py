"""Yerel uçtan uca test: python3 -m http.server 8765 (public/ içinde) çalışırken
python3 araclar/test/akis.py [çıktı_klasörü]"""
import sys, json, os
from playwright.sync_api import sync_playwright

URL = "http://localhost:8765/"
OUT = sys.argv[1] if len(sys.argv) > 1 else "/tmp/akis"
os.makedirs(OUT, exist_ok=True)
hatalar = []

def kontrol(kosul, mesaj):
    print(("  ✓ " if kosul else "  ✗ ") + mesaj)
    if not kosul:
        hatalar.append(mesaj)

with sync_playwright() as p:
    b = p.chromium.launch()
    for ad, vp, sema in [("masa", {"width": 1200, "height": 900}, "light"), ("tel", {"width": 390, "height": 844}, "dark")]:
        print(f"== {ad} ({sema})")
        ctx = b.new_context(viewport=vp, color_scheme=sema)
        pg = ctx.new_page()
        konsol = []
        pg.on("console", lambda m: m.type == "error" and "fonts.g" not in m.text and "ERR_TUNNEL" not in m.text and "ERR_FAILED" not in m.text and konsol.append(m.text))
        pg.on("pageerror", lambda e: konsol.append(str(e)))
        pg.route("**/fonts.g*/**", lambda r: r.abort())

        pg.goto(URL); pg.click("text=Şengül")
        kontrol(pg.is_visible("text=Merhaba Şengül"), "ana sayfa + profil")
        pg.screenshot(path=f"{OUT}/{ad}-0-ana.png", full_page=True)
        pg.click("text=Veri ve İş Analitiği"); pg.wait_for_selector("text=Bölümler")
        kontrol(pg.locator(".satirlar").first.locator("li").count() == 3, "vize kapsamında 3 bölüm")
        pg.screenshot(path=f"{OUT}/{ad}-1-pano.png", full_page=True)

        # bölüm sekmeleri
        for sek in ["ozet", "kartlar", "ciftler", "formul", "hesap", "test", "cikmis"]:
            pg.goto(URL + f"isan/#b/b2/{sek}"); pg.wait_for_timeout(150)
            kontrol(pg.locator("#sekme").inner_text().strip() != "", f"b2 sekmesi {sek} dolu")
            if ad == "masa" and sek in ("ozet", "formul"):
                pg.screenshot(path=f"{OUT}/{ad}-b2-{sek}.png", full_page=True)
        # kart akışı
        pg.goto(URL + "isan/#b/b1/kartlar"); pg.click("[data-ac]"); pg.click("[data-bil='1']"); pg.click("[data-ac]"); pg.click("[data-bil='0']")
        kart = pg.evaluate("JSON.parse(localStorage.getItem('ankuzef:Şengül:isan:kart'))")
        kontrol(kart and len(kart) == 2, "iki kart kaydedildi")
        # çift alıştırması
        pg.goto(URL + "isan/#b/b1/ciftler"); pg.click("[data-cift='0']"); pg.click("[data-c]")
        kontrol(pg.is_visible(".geri"), "çift geri bildirimi")
        if ad == "tel": pg.screenshot(path=f"{OUT}/{ad}-cift.png", full_page=True)

        # çıkmış sınav: 20 soruyu doğru cevapla
        pg.goto(URL + "isan/#cikmis"); pg.screenshot(path=f"{OUT}/{ad}-cikmis-liste.png", full_page=True)
        pg.click("text=2025-26 Güz Vize")
        dogrular = pg.evaluate("""fetch('sorular/cikmis_2025_guz_vize.json').then(r=>r.json()).then(v=>v.sorular.map(q=>q.dogru))""")
        for i, d in enumerate(dogrular):
            pg.click(f"[data-sik='{d}']")
            kontrol(pg.locator(".geri h3").inner_text().startswith("Doğru"), f"çıkmış S{i+1} işaretli cevap doğru sayıldı") if i in (0, 7, 18, 19) else None
            if i == 0: pg.screenshot(path=f"{OUT}/{ad}-cikmis-s1.png", full_page=True)
            if i == 18: pg.screenshot(path=f"{OUT}/{ad}-cikmis-s19.png", full_page=True)
            pg.click("[data-sonraki]")
        kontrol(pg.is_visible("text=100"), "çıkmış: 20/20 → 100 puan")
        # yanlış cevap → yanlış defteri
        pg.goto(URL + "isan/#b/b3/test"); pg.click("[data-basla]")
        q = pg.locator(".secenek").first; ids = pg.evaluate("Object.keys(JSON.parse(localStorage.getItem('ankuzef:Şengül:isan:soru')||'{}')).length")
        # yanlış şıkkı bul: doğru-sik sınıfı gelmeyen
        pg.locator(".secenek").nth(0).click()
        yanlis = pg.locator(".secenek.yanlis-sik").count()
        if not yanlis:
            pg.click("[data-sonraki]"); pg.locator(".secenek").nth(1).click(); yanlis = pg.locator(".secenek.yanlis-sik").count()
        if ad == "masa": pg.screenshot(path=f"{OUT}/{ad}-test-geri.png", full_page=True)
        yd = pg.evaluate("JSON.parse(localStorage.getItem('ankuzef:Şengül:isan:yanlis')||'{}')")
        kontrol(yanlis == 0 or len(yd) >= 1, "yanlış cevap yanlış defterine girdi")
        # sayfa yenile → devam
        pg.reload(); pg.wait_for_selector("[data-basla]"); kontrol(pg.is_visible("[data-devam]"), "konu testi kaldığın yerden devam")
        # deneme sınavı
        pg.goto(URL + "isan/#deneme"); pg.click("text=Sınavı başlat")
        kontrol(pg.locator(".harita button").count() == 20, "deneme 20 soru")
        if ad == "tel": pg.screenshot(path=f"{OUT}/{ad}-deneme.png", full_page=True)
        pg.locator(".secenek").first.click(); pg.click("[data-bitir]"); pg.click("[data-bitir]")
        kontrol(pg.is_visible("text=sonuç"), "deneme bitti, rapor")
        if ad == "masa": pg.screenshot(path=f"{OUT}/{ad}-deneme-rapor.png", full_page=True)
        # atölye: her üretici açılıyor
        gens = pg.evaluate("window.ATOLYE.map(g=>g.id)")
        for g in gens:
            pg.goto(URL + f"isan/#atolye/{g}"); pg.wait_for_timeout(60)
            ok = pg.locator(".secenek").count() == 5
            if not ok: kontrol(False, f"atölye {g}")
            pg.locator(".secenek").first.click()
            if not pg.is_visible(".geri"): kontrol(False, f"atölye {g} geri bildirim")
        kontrol(True, f"atölye: {len(gens)} üretici açıldı ve cevaplandı")
        pg.goto(URL + "isan/#atolye"); pg.goto(URL + "isan/#atolye/pdeger"); pg.locator(".secenek").first.click()
        if ad == "masa": pg.screenshot(path=f"{OUT}/{ad}-atolye.png", full_page=True)
        for yol in ["tekrar", "yanlis", "ozet", "ayar", "tahmin", "tahmin/t1"]:
            pg.goto(URL + "isan/#" + yol); pg.wait_for_timeout(100)
            kontrol(len(pg.locator("#icerik").inner_text()) > 30, f"#{yol} açıldı")
        pg.goto(URL + "isan/#ozet"); pg.screenshot(path=f"{OUT}/{ad}-ozet.png", full_page=True)
        # yatay taşma
        for yol in ["", "b/b2/formul", "cikmis/2025-26%20G%C3%BCz%20Vize", "atolye/kumulatif", "b/b1/ozet"]:
            pg.goto(URL + "isan/#" + yol); pg.wait_for_timeout(100)
            sw = pg.evaluate("document.documentElement.scrollWidth - window.innerWidth")
            if sw > 2: kontrol(False, f"yatay taşma {sw}px: #{yol}")
        kontrol(not konsol, "konsol hatası yok" + (": " + "; ".join(konsol[:3]) if konsol else ""))
        ctx.close()
    b.close()
print("\nSONUÇ:", "hepsi geçti" if not hatalar else f"{len(hatalar)} hata")
sys.exit(1 if hatalar else 0)
