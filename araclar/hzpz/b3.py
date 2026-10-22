"""Bölüm 3 — Hizmetlerde Pazarlama Karması (s. 55–81). Kaynak: kaynaklar/hzpz/bolum3.md."""
from ortak import Q, T, kart, cift, onc

B3 = {
    "aralik": (55, 81),
    "ozet": [
        {"baslik": "Hizmet sektörünün büyümesi", "sayfa": "s. 56–57", "maddeler": [
            "Gelişmiş ülkelerde hizmetler milli gelirin ~%80'i; gelişmekte olan ülkelerde dört kişiden üçü bu sektörde; dünya ekonomisinin %63'ü.",
            "Büyüme nedenleri: köyden kente göç (evdeki hizmetler piyasadan alınıyor), II. Dünya Savaşı sonrası beyaz yakalı orta sınıf (restoran, seyahat), tasarruf eğilimi (bankacılık, sigorta); endüstride dış kaynak kullanımı ve finansal sektöre yaslanma."]},
        {"baslik": "Hizmetlere üç bakış ve hizmet pazarlaması üçgeni", "sayfa": "s. 57–59", "maddeler": [
            "1) Hizmet, farklı özellikler gösteren bir tür üründür. 2) Ürün ve hizmet bir doğrunun iki ucu: soru \"ne kadar ürün, ne kadar hizmet?\" (psikoterapi en çok hizmet, giyim en çok ürün). 3) <b>Hizmet baskın mantık</b> (İskandinav Okulu): her şey hizmettir, ürünler hizmet değiş tokuşunun aracıdır.",
            "Hizmet pazarlaması üçgeni: <b>dışsal</b> (işletme → müşteri, 4P), <b>içsel</b> (işletme → çalışan; çalışanı iç tüketici görüp tatmin etmek), <b>etkileşimli</b> (çalışan → müşteri; hizmet sürecinin tamamı).",
            "Başarılı dışsal pazarlamanın ön koşulu içsel pazarlamadır; etkileşimli ve dışsal mesajlar uyumlu olmalıdır.",
            "<b>7P = 4P (ürün, fiyat, tutundurma, dağıtım) + 3P (insan, fiziksel kanıt, süreç).</b> 3P doğrudan temas, sürecin görünür olması ve eşzamanlılıktan doğar."]},
        {"baslik": "Ürün", "sayfa": "s. 60–62", "maddeler": [
            "Hizmet soyut olduğu için algılanan risk yüksektir; işletme bu riski 3P ile azaltır. Hizmetteki farklılık kolay taklit edilir: kurum kültürü ve marka değeri gibi taklidi zor unsurlara odaklan.",
            "Hizmet kalitesini ölçmek için <b>10 unsur</b>: erişim, güvenilirlik, güven, güvenlik, tüketiciyi anlama, yanıt verme, nezaket, yeterlilik, iletişim, somutlar.",
            "Etkili marka adı için <b>4 konu</b>: belirginlik, alaka, akılda kalıcılık, esneklik."]},
        {"baslik": "Fiyat", "sayfa": "s. 63–66", "maddeler": [
            "Nakit girişi sağlayan tek unsur. Hizmette daha önemli: (1) fiyat kalite ipucudur, (2) stok yok, fiyat talebi yönetir (sezon farkı, dinamik fiyat), (3) fiyat hassasiyeti bölümlendirme ölçütüdür (erken bilet).",
            "Üç strateji: <b>maliyete göre</b> (maliyet artı kâr; hizmette maliyet belirlemek zor), <b>rakibe göre</b> (asıl sorun rakibi doğru belirlemek: Pegasus THY'yi değil otobüsü rakip saydı), <b>talebe göre</b> (anketler güvenilir değil; \"kendi arkasına sıraya girmek\").",
            "Beş politika: <b>karşılama</b> (temel ucuz, ek hizmet pahalı), <b>teşvik</b> (geçici düşük fiyat), <b>yönlendirme</b> (seçili hizmette düşük fiyatla \"paranın karşılığı\" imajı), <b>garanti</b> (sonuç gelene kadar tam ücret yok), <b>avcı</b> (rakibi fiyatla çıkar, sonra fiyatı artır).",
            "İnternet fiyat şeffaflığı getirir; fiyat rekabetinin çözümü farklılaşmadır."]},
        {"baslik": "Tutundurma ve dağıtım", "sayfa": "s. 66–71", "maddeler": [
            "Tutundurma karması: reklam, kişisel satış, halkla ilişkiler, satış tutundurma, doğrudan pazarlama, dijital pazarlama.",
            "Soyutluk iletişimi zorlaştırır; çözüm <b>dokunulabilir kılmak</b> (renk, üniforma, koku, müzik, maskot). Kişisel satış ve referans listeleri riski azaltır. <b>Ağızdan ağıza</b> hizmette daha önemli; dijital hali <b>viral</b>, erken benimseyenleri (arılar) hedefleyeni <b>vızıltı</b> pazarlaması.",
            "Kötü algılanan kalitenin 4 nedeni: yanlış anlama, yetersiz kaynaklar, yetersiz sunum, abartılmış vaatler. Vaatler abartılmamalı.",
            "Dağıtım politikaları yaygınlığa göre: <b>yoğun</b> (her noktada) > <b>sınırlı</b> > <b>seçimlik</b> (en düşük). Hizmette genellikle <b>doğrudan dağıtım</b>; yeni merkez açmak <b>büyüme stratejisidir</b>."]},
        {"baslik": "İnsan, fiziksel kanıt, süreç", "sayfa": "s. 71–74", "maddeler": [
            "<b>İnsan:</b> sunum ve tüketim eşzamanlı; tüketici çalışanın tutumunu işletmenin özelliği sayar; her altı tüketiciden biri yalnız olumsuz çalışan davranışı yüzünden vazgeçer. Çözüm: standart belirleyip performansı karşılaştırmak.",
            "<b>Hizmet kâr zinciri</b> (5 halka): içsel hizmet kalitesi → memnun ve üretken çalışanlar → daha yüksek hizmet değeri → memnun ve sadık tüketiciler → sağlıklı kâr ve büyüme.",
            "<b>Fiziksel kanıt:</b> hizmet ortamı ve performansı kolaylaştıran somut ürünler; gerekçesi soyutluk (Yves Rocher'in beyaz-yeşil renkleri).",
            "<b>Süreç:</b> hizmetin nasıl alındığını belirleyen prosedürler, mekanizmalar, faaliyet akışı. Grönroos: <b>teknik kalite</b> \"ne\", <b>fonksiyonel kalite</b> \"nasıl\". <b>Hizmet telafisi paradoksu</b>; insan-makine dengesi (yüksek temas + yüksek teknoloji)."]},
    ],
    "kitapNotlari": [
        "Kitapta (s. 58) \"Hizmet Bakın Mantık\" yazıyor; doğrusu Hizmet Baskın Mantık (Bölüm 4, s. 94 ve sınav sorularında böyle).",
        "Kitapta (s. 64–65) üç fiyat stratejisi (4), (5), (6) diye numaralanmış; önceki numaralı liste fiyatın önemine aittir. Strateji sayısı üçtür.",
    ],
    "akildaKalsin": [
        "7P = 4P + insan, fiziksel kanıt, süreç.",
        "Üçgen: içsel işletme→çalışan, etkileşimli çalışan→müşteri, dışsal işletme→müşteri.",
        "Kalite 10 unsur (erişim … somutlar) ≠ marka adı 4 konu (belirginlik, alaka, akılda kalıcılık, esneklik).",
        "Fiyat stratejisi: maliyet, rakip, talep. Politika: karşılama, teşvik, yönlendirme, garanti, avcı.",
        "Tutundurma: reklam, kişisel satış, halkla ilişkiler, satış tutundurma, doğrudan, dijital (dağıtım yok).",
        "Dağıtım: yoğun > sınırlı > seçimlik; hizmette doğrudan; yeni merkez = büyüme.",
        "Teknik kalite ne, fonksiyonel kalite nasıl."],
}
