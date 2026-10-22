"""Bölüm 2 — Hizmetlerde Pazar Bölümlendirme, Hedef Pazar Seçimi ve Konumlandırma (s. 31–54). Kaynak: kaynaklar/hzpz/bolum2.md."""
from ortak import Q, T, kart, cift, onc

B2 = {
    "aralik": (31, 54),
    "ozet": [
        {"baslik": "Odaklanma ve pazarlama stratejisi", "sayfa": "s. 32–34", "maddeler": [
            "Tüm pazara hitap etmek gerçekçi değil; her firma <b>en iyi hizmet verebileceği müşterilere odaklanır</b>. Odaklanma iki boyutludur: <b>pazar odaklılık</b> (kaç pazara hizmet) ve <b>hizmet odaklılık</b> (kaç hizmet).",
            "<b>Pazarlama stratejisi:</b> pazarlama alanındaki politikalar ve temel kararlar; belirli bir iş birimiyle ilgilenir. Temel amacı <b>üstün müşteri değeri yaratıp sunarak ve ileterek müşteri memnuniyeti</b> yoluyla kâr.",
            "Pazar stratejisi formülasyon süreci (Şekil 1): <b>firma ve pazar analizi → bölümlendirme ve hedef pazar → konumlandırma → pazarlama karması</b>.",
            "Hizmet işletmelerinde misyon beyanı daha az kapsamlıdır; müşterilere ve kamu imajına odaklanır."]},
        {"baslik": "Firma ve pazar analizi", "sayfa": "s. 34–36", "maddeler": [
            "<b>Büyüme stratejisi:</b> daha çok pazar payı, daha fazla pazar. <b>Rekabet stratejisi:</b> rekabet avantajı elde etmek.",
            "Üç genel rekabet stratejisi: <b>genel maliyet liderliği</b> (düşük maliyet, düşük fiyat), <b>farklılaşma</b> (katma değer, yüksek fiyat), <b>odaklanma</b> (küçük segmente maliyet ya da farklılaşmayla).",
            "Stratejik hedefler uzun vadelidir: finansal, satış ve pazar payı, insan kaynakları, iç süreç hedefleri. Kurumsal kaynaklar: pazar (marka, kanal), fiziksel, finansal, insan.",
            "<b>Makro çevre</b> (altı grup): demografik, ekonomik, politik-yasal, sosyo-kültürel, teknolojik, doğal. Demografik değişim kademelidir, kesine yakın tahmin edilir.",
            "<b>Rekabet çevresi</b> (beş grup, Porter): rakipler, potansiyel katılımcılar, ikameler, alıcılar, tedarikçiler."]},
        {"baslik": "Bölümlendirme ve kriterleri", "sayfa": "s. 36–40", "maddeler": [
            "<b>Pazar bölümü:</b> ortak özellik, ihtiyaç, satın alma davranışı ya da tüketim kalıbı paylaşan alıcı grubu. <b>Hedef pazar:</b> firmanın seçtiği, birkaç değişkenle tanımlanan bölüm.",
            "Dört kriter (Palmer): <b>benzerlik</b> (grup içi homojen), <b>farklılık</b> (gruplar arası heterojen), <b>önemli olma</b> (kârlı olacak kadar büyük), <b>işlevsellik</b> (tarif etmeye ve parametre belirlemeye faydalı).",
            "Bölümlendirme süreci <b>pazarın tanımlanması ve müşteri ihtiyaçlarının belirlenmesiyle</b> başlar.",
            "<b>Önemli nitelik</b> tüketici için önemlidir ama seçimi belirlemeyebilir (havayolunda güvenlik); <b>belirleyici nitelik</b> listede aşağıdadır ama rakipler arasında fark görülür (kalkış saati, mil programı)."]},
        {"baslik": "Bölümlendirme yaklaşımları ve sadakat", "sayfa": "s. 39–40", "tablo": T(["Müşteri özellikleri (kim?)", "Müşteri yanıtları (neyi, neden?)"], [
            ["Demografik ve sosyo-ekonomik (yaş, cinsiyet, gelir, meslek)", "Faydalar (satın alma nedeni)"],
            ["Psikografi (yaşam tarzı, tutum, kişilik)", "Kullanım (çok sık, orta, ara sıra, kullanmayan)"],
            ["Coğrafya (ülke, şehir; genelde temel)", "Promosyon tepkisi"],
            ["", "Sadakat: sıkı sadık (her zaman), bölünmüş sadık (çoğu zaman), değişen sadık (marka değiştiren), çok az ya da hiç sadakat göstermeyen"]])},
        {"baslik": "Hedef pazar seçim yaklaşımları", "sayfa": "s. 40–41", "maddeler": [
            "Seçim kriterleri: kârlılık ve pazar çekiciliği, büyüme potansiyeli, rekabet yoğunluğu, pazara erişim, risk derecesi.",
            "<b>Farklılaştırılmamış:</b> tüm pazara tek strateji, ortak ihtiyaca odak. <b>Farklılaştırılmış:</b> her bölüme ayrı strateji; memnuniyet ve pay artar, maliyet de artar.",
            "<b>Yoğunlaştırılmış:</b> çok bölüm olduğunu kabul eder ama birine odaklanır. <b>Mikro pazarlama:</b> yerel müşterilere, mahallelere, mağazalara, bireylere odaklanır."]},
        {"baslik": "Konumlandırma", "sayfa": "s. 42–50", "maddeler": [
            "Hizmette konumlandırma üründen daha önemlidir, çünkü hizmet soyuttur. Nihai sonucu <b>değer önermesi</b>dir.",
            "Jack Trout'un (1969) dört ilkesi: zihinde konum oluştur; konum <b>tekil, basit, tutarlı</b> mesaj versin; konum şirketi rakiplerinden ayırsın; şirket <b>herkes için her şey olamaz</b>.",
            "Konumlandırma pazar ve rekabet analizini şirket içi analize bağlar; sonucu <b>konum beyanıdır</b>. <b>Konumlandırma (algısal) haritası</b> tüketici algılarını görselleştirir.",
            "Üç odaklanmış strateji: <b>tamamen odaklanmış</b> (dar segment + dar hizmet: diş hastanesi), <b>pazar odaklı</b> (dar segment + geniş hizmet: Rentokil), <b>hizmet odaklı</b> (geniş pazar + dar hizmet: Starbucks).",
            "Hizmetlerde 4P'ye üç ek: <b>insanlar, fiziksel kanıtlar, süreç</b> (7P). Fiyat, satış gücü ve reklam kısa vadede; yeni hizmet ve kanal uzun vadede değişir."]},
    ],
    "kitapNotlari": [],
    "akildaKalsin": [
        "Süreç: firma ve pazar analizi → bölümlendirme/hedef pazar → konumlandırma → pazarlama karması. Rekabet avantajı adım değil, sonuç.",
        "Rekabet stratejileri: maliyet liderliği, farklılaşma, odaklanma.",
        "Kriterler: benzerlik, farklılık, önemli olma, işlevsellik (çeşitlilik yok).",
        "Özellikler: demografi, psikografi, coğrafya. Yanıtlar: fayda, kullanım, promosyon, sadakat.",
        "Sıkı = her zaman, bölünmüş = çoğu zaman, değişen = marka değiştirir.",
        "Mikro = yerel; yoğunlaştırılmış = tek bölüm; farklılaştırılmış = her bölüme ayrı strateji.",
        "Trout: zihinde konum, tekil-basit-tutarlı, rakipten ayır, herkes için her şey olamaz."],
}
