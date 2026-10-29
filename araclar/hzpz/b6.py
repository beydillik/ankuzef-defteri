"""Bölüm 6 — Hizmet Pazarlamasında Fiziksel Kanıtlar (s. 123–137). Kaynak: kaynaklar/hzpz/bolum6.md."""
from ortak import Q, T, kart, cift, onc

B6 = {
    "aralik": (123, 137),
    "ozet": [
        {"baslik": "Fiziksel kanıt nedir?", "sayfa": "s. 124–125", "maddeler": [
            "Şirketin müşteriye verdiği <b>ilk ve en güçlü izlenim</b>. Somut ürün olmadığı için hizmette güven kazanmak <b>daha zordur</b>; fiziksel kanıt devreye girer.",
            "Bir hizmetin <b>görünür ve dokunulabilir yönleri</b>; müşterinin kalite hakkında fikir edinmesini sağlar, satın alma kararını etkiler. Hizmet kalitesini gösteren görsel ya da somut ipuçlarıdır.",
            "Fiziki çevre ya da hizmet ortamı olarak da anılır; <b>hizmet pazarlaması karmasının unsurudur</b>. Ortam, etkileşim mekânı ve iletişimi kolaylaştıran tüm somut nesneler.",
            "Az somut unsurlu hizmetlerde (sigorta) reklamla sembol yaratılır: şemsiye koruma, kale güvenlik. İnternet sayfaları ve sanal ortamlar da fiziksel kanıttır."]},
        {"baslik": "Fiziksel kanıt bileşenleri (Tablo 1)", "sayfa": "s. 125", "tablo": T(["Hizmet ortamı – dış", "Hizmet ortamı – iç", "Diğer somut unsurlar"], [
            ["Dış tasarım", "İç tasarım", "Kartvizit, kırtasiye, fatura, rapor"],
            ["Tabela", "Ekipman, tabela", "Personel kıyafeti, üniforma"],
            ["Otopark", "Düzen", "Broşür"],
            ["Manzara, çevreleyen ortam", "Hava kalitesi ve sıcaklık; ses, müzik, koku, aydınlatma", "İnternet sayfası, sanal hizmet ortamı"]],
            baslik="Tabela hem dış hem iç ortamda yer alır.")},
        {"baslik": "Fiziksel kanıtın temel unsurları (Jha vd.)", "sayfa": "s. 126–127", "maddeler": [
            "Altı unsur: <b>fiziki çevre (hizmet ortamı)</b>, <b>iletişim biçimi ve içeriği</b>, <b>personelin görünüşü ve davranışları</b>, <b>hizmete eşlik eden somut unsurlar</b> (otelin çikolatası, okulun kitabı), <b>hizmetin fiyatı</b> (kalite ipucu), <b>marka</b>.",
            "Bitner (1992): fiziksel çevre üç unsurdan oluşur: ortam koşulları; mekânsal düzen ve işlevsellik; işaretler, semboller ve eserler.",
            "Bağlama göre değişir: hastane, okul, kreşte fiziksel kanıta <b>büyük ölçüde</b> ihtiyaç var; sigorta ve posta <b>sınırlı</b> kanıt sunar. Kanıtın türü ve sayısı deneyime katkı yapar ve hizmeti kolaylaştırır."]},
        {"baslik": "Hizmet ortamının tasarımı", "sayfa": "s. 127–130", "maddeler": [
            "Hizmet ortamı müşteri hizmet fabrikasında <b>fiziken bulunduğunda</b> özellikle önemlidir; davranışı <b>yaklaşma</b> (kalma, keşfetme, tekrar gelme) ya da <b>kaçınma</b> yönünde etkiler.",
            "<b>Ortam koşulları:</b> müzik (uyumlu müzik hoşnutluk ve tekrar gelme; klasik müzik harcamayı artırdı), aydınlatma (loş ışık daha az sağlıklı seçim ama rahatlık), koku (dikkatli kullan; hoş koku satış ve memnuniyet; sıcak kokular prestij tercihini artırır), sıcaklık (düşük sıcaklık duygusal, yüksek sıcaklık bilişsel karar eğilimi), temizlik.",
            "<b>Tasarım koşulları:</b> renk (sıcak renk güncellik algısı, soğuk renk memnuniyet), mekânsal özellikler (sıkışık düzen olumsuz; lüks restoranda geniş masa aralığı), zemin (halı rahatlatıcı algı).",
            "<b>Sosyal koşullar:</b> diğer müşteriler (kalabalık; etkisi toleransa ve beklentiye göre değişir) ve hizmet personeli (görünüm, yeterlilik, davranış; sayı ve cinsiyet).",
            "<b>Sanal hizmet ortamı:</b> internet sayfaları ve sanal turlar hizmeti orada bulunmadan önizletir (seyahat, Airbnb deneyimleri, NASCAR)."]},
        {"baslik": "Hizmet markası", "sayfa": "s. 131–133", "maddeler": [
            "Paketli mallarda ürün, hizmetlerde <b>şirketin kendisi</b> ana markadır. Soyutluk, ortak üretim ve performans değişkenliği yüzünden hizmet markası oluşturmak daha zordur.",
            "Güçlü marka müşteri için <b>\"güvenli liman\"</b>dır ve gelecekteki tatminin sözünü verir; marka imajı, şirket imajı ve çalışan güveni sadakati etkiler.",
            "Geliştiren unsurlar: <b>sosyal medya</b> (önemli), <b>artırılmış gerçeklik</b> (yenilikçilik algısıyla tutumu değiştirebilir), <b>havalılık</b> (estetik, özgünlük, sıradışılık… sadakati artırır), <b>duygular</b>, <b>çalışanlar</b> (güçlü marka içeriden oluşur), <b>marka kanıtları</b>.",
            "Tutarlı ayırt edici görünüm (tabela, üniforma, araç, renk şeması) markalı hizmet deneyimi yaratır (Marriott: Ritz-Carlton lüks, Courtyard iş odaklı)."]},
    ],
    "kitapNotlari": [],
    "akildaKalsin": [
        "Fiziksel kanıt = görünür ve dokunulabilir yönler; ilk ve en güçlü izlenim; hizmette güven kazanmak daha zor.",
        "Dış ortam: dış tasarım, tabela, otopark, manzara, çevreleyen ortam. Ses-müzik-koku-aydınlatma iç ortam.",
        "Altı temel unsur: ortam, iletişim, personel, eşlik eden somut unsur, fiyat, marka (süreç ve rakipler yok).",
        "Hastane-okul-kreş çok kanıt, sigorta-posta az.",
        "Ortam koşulları: müzik, aydınlatma, koku, sıcaklık, temizlik. Personel sosyal koşul.",
        "Düşük sıcaklık duygusal, yüksek sıcaklık bilişsel karar.",
        "Hizmette ana marka şirketin kendisi; güçlü marka güvenli liman; sosyal medya önemli."],
}
