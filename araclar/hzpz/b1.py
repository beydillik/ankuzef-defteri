"""Bölüm 1 — Hizmet Pazarlamasına Giriş (s. 5–29). Kaynak: kaynaklar/hzpz/bolum1.md."""
from ortak import Q, T, kart, cift, onc

B1 = {
    "aralik": (5, 29),
    "ozet": [
        {"baslik": "Hizmet ve hizmet pazarlaması", "sayfa": "s. 6–7", "maddeler": [
            "<b>Hizmet pazarlaması:</b> maddi olmayan ürünlerin pazarlanmasına odaklanan disiplin; hizmet sağlayıcıların sunduğu <b>müşteri deneyimlerini ve ilişkileri</b> yönetmeye yönelik stratejileri içerir.",
            "<b>Hizmet:</b> müşteriye sunulan faaliyetler, faydalar veya tatminler; fiziksel ürünlerden farklı olarak <b>dokunulamaz, stoklanamaz, transfer edilemez</b>.",
            "Modern anlayışta <b>müşteri deneyimi</b> öne çıkar. <b>Veri analitiği</b> stratejilerin geliştirilmesinde kritik rol oynar; <b>büyük veri analizi</b> tüketici davranışını anlamak ve öngörmek için araçtır. Dijitalleşme ve sürdürülebilirlik de anlayışı şekillendirir.",
            "Grönroos: hizmet karşılaşmasında önemli olan tek şey müşterinin yaşadığı deneyimin algısıdır."]},
        {"baslik": "Tarihsel gelişim", "sayfa": "s. 8–9", "tablo": T(["Dönem", "Ne oldu?"], [
            ["1960'lar–1970'ler", "İlk ilgi; hizmetlerin farklı strateji gerektirdiği görüldü (Shostack 1977)"],
            ["1980'ler", "Önemli teorik katkılar: Grönroos, Parasuraman-Zeithaml-Berry, SERVQUAL; dört özellik (ayrılmazlık, heterojenlik, dokunulmazlık, dayanıksızlık)"],
            ["1990'lar", "Teori pratiğe döndü: CRM, müşteri deneyimi yönetimi, hizmet inovasyonu (Lovelock, Zeithaml-Bitner-Gremler)"],
            ["2000'ler ve sonrası", "Dijitalleşmenin büyük etkisi: dijital pazarlama, veri analitiği, sosyal medya; Vargo-Lusch hizmet baskın (S-D) mantık"]],
            baslik="Tablo 1 (s. 9, Lovelock-Wirtz): 1990'lar BİT → hizmet modelleri iyileşti; 2000'ler serbestleşme ve küreselleşme → yeni pazarlar, rekabet; 2010'lar dijital dönüşüm → yeni fırsatlar; 2020'ler COVID-19 → dijital hizmetler hızlandı")},
        {"baslik": "Hizmet endüstrisindeki gelişim", "sayfa": "s. 9–10", "maddeler": [
            "<b>Teknoloji</b> en önemli dönüştürücü güç: dijital dönüşüm <b>büyük veri analitiği, yapay zekâ ve otomasyonu</b> getirdi (örnek: sohbet botları).",
            "<b>Ekonomi:</b> ABD'de hizmetler ekonomik faaliyetin ~%80'i; küreselleşme uluslararası pazara açılmayı kolaylaştırdı.",
            "<b>Toplum:</b> yaşlanan nüfus ve şehirleşme sağlık, eğitim, yaşlı bakımı talebini artırdı; tüketici daha hızlı, esnek, kişisel hizmet istiyor.",
            "Tüm hizmetler deneyim sunar ama tüm deneyimler yapılandırılmış hizmet değildir."]},
        {"baslik": "Hizmetlerin dört özelliği ve fırsata çevirme (Tablo 2–3)", "sayfa": "s. 11–13", "tablo": T(["Özellik", "Ne demek?", "Fırsata çevirme"], [
            ["Soyutluk (dokunulmazlık)", "Görülemez, dokunulamaz; tüketim öncesi kalite değerlendirilemez, algılanan risk yüksek", "Fiziksel kanıt ve markalama"],
            ["Stoklanamama (dayanıksızlık)", "Depolanamaz; boş uçak koltuğu sonradan satılamaz", "Etkili talep yönetimi (dinamik fiyat, aşırı rezervasyon, erken kuşak indirimi)"],
            ["Heterojenlik (değişkenlik)", "Kalite kimin, ne zaman, nerede, nasıl sunduğuna göre değişir", "Standart eğitim ve kalite kontrol"],
            ["Ayrılmazlık", "Üretim ve tüketim eşzamanlı; sağlayıcı-müşteri etkileşimi sonucu belirler", "Müşteri etkileşimine odaklanma"]])},
        {"baslik": "Hizmet tüketiminin üç aşamalı modeli", "sayfa": "s. 14–18", "maddeler": [
            "<b>Satın alma öncesi</b> (4 adım): ihtiyaç farkındalığı → bilgi arama → alternatiflerin değerlendirilmesi → satın alma kararı. Akla gelen alternatiflere <b>değerlendirme seti</b> denir.",
            "Nitelikler: <b>arama</b> (satın almadan önce değerlendirilir: renk, tat), <b>deneyim</b> (ancak tüketince: restoranın atmosferi), <b>güven</b> (tüketimden sonra bile zor: mutfaktaki hijyen). Hizmetlerde deneyim ve güven nitelikleri yüksek → <b>algılanan risk</b> yüksek.",
            "Beklentiler: istenen, yeterli ve tahmin edilen hizmet düzeyi; istenen ile yeterli arasına <b>tolerans bölgesi</b> denir.",
            "<b>Hizmet karşılaşması:</b> müşteri hizmeti başlatır, deneyimler, tüketir. <b>Gerçeklik anı</b> (Normann, boğa güreşi metaforu; Carlzon/SAS: yılda 50 milyon 15 saniyelik an).",
            "<b>Karşılaşma sonrası:</b> performans beklentiyle karşılaştırılır. Müşteri memnuniyeti olumlu disconfirmation (beklentinin aşılması) ile ortaya çıkar; çok memnun müşteri tekrar alır, sadık kalır, olumlu ağızdan ağıza yayar."]},
        {"baslik": "Temas düzeyleri ve servuction", "sayfa": "s. 19–20", "maddeler": [
            "<b>Yüksek temaslı:</b> sürekli etkileşim; müşteri hizmet <b>fabrikasına</b> girer (motel, hastane, uçak); cansız nesneler değil insanlar işlenir; müşteri birçok <b>fiziksel ipucuna</b> maruz kalır.",
            "<b>Düşük temaslı:</b> çok az ya da hiç fiziksel temas; elektronik veya fiziksel dağıtım kanalları (posta, telefon, internet bankacılığı).",
            "<b>Servuction</b> (Eiglier ve Langeard; hizmet + üretim): müşterinin gördüğü ve deneyimlediği fiziksel ortam. <b>Teknik çekirdek</b> sahne arkası, görünmez (mutfak); <b>hizmet sunum sistemi</b> sahne önü, görünür (bina, ekipman, personel, diğer müşteriler).",
            "<b>Hizmet kurtarma paradoksu</b> (s. 11): başarısızlıktan sonra etkili kurtarma, deneyimi beklenenden iyi algılatır."]},
    ],
    "kitapNotlari": [],
    "akildaKalsin": [
        "Hizmet = faaliyet, fayda, tatmin; soyut + dokunulamaz + stoklanamaz + transfer edilemez.",
        "Dönemler: 60-70 ilgi → 80 teori (SERVQUAL) → 90 uygulama (CRM) → 2000 ve sonrası dijital + S-D mantık.",
        "Tablo 1'de 1980 satırı yok: 1990 BİT, 2000 küreselleşme, 2010 dijital dönüşüm, 2020 COVID.",
        "Dört özellik → dört çözüm: soyut-fiziksel kanıt, dayanıksız-talep yönetimi, değişken-standart eğitim, ayrılmaz-etkileşim.",
        "Satın alma öncesi 4 adım: ihtiyaç, bilgi, alternatif, karar.",
        "Arama (önce) → deneyim (tüketince) → güven (sonra bile zor).",
        "Fiziksel ipucu çok = yüksek temas; teknik çekirdek görünmez, sunum sistemi görünür."],
}
