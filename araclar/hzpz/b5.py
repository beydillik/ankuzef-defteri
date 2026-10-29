"""Bölüm 5 — Hizmet Pazarlamasında Süreç (s. 105–121). Kaynak: kaynaklar/hzpz/bolum5.md."""
from ortak import Q, T, kart, cift, onc

B5 = {
    "aralik": (105, 121),
    "ozet": [
        {"baslik": "Süreç nedir?", "sayfa": "s. 106–108", "maddeler": [
            "<b>Süreç:</b> hizmet işletim sistemlerinin çalışma yöntemini ve sırasını açıklayarak sunum ve tamamlama için gerekli adımları ve sırayı belirleyen işlem dizisi (Lovelock ve Wright). Pazarlama karmasının bir unsurudur.",
            "Süreç ne yapıldığını değil <b>nasıl</b> yapıldığını gösterir. Müşteri memnuniyeti nihai sonuç kadar sürece dayanır; hizmet tüketimi çıktı tüketimi değil <b>süreç tüketimidir</b>.",
            "Müşteri gözüyle hizmetler <b>deneyimdir</b>; firma gözüyle istenen deneyimi yaratmak için tasarlanıp yönetilmesi gereken <b>süreçlerdir</b>. Süreçler hizmetlerin mimarisidir.",
            "Yöneticiye üç soru: ne yapılmalı, nasıl ve kim tarafından, müşteri nasıl tepki veriyor?"]},
        {"baslik": "Hizmet süreçlerinin sınıflandırılması", "sayfa": "s. 108–109", "tablo": T(["Süreç türü", "Örnekler", "Not"], [
            ["İnsanların işlenmesi – somut (kişi işleme)", "Yolcu taşıma, güzellik salonu, fizik tedavi, restoran, spor salonu", "Müşteri hizmet yerinde bulunmak zorunda"],
            ["İnsanların işlenmesi – soyut (zihinsel uyaran işleme)", "Sanat ve eğlence, kablolu yayın, eğitim, yönetim danışmanlığı, konser", "Tutum ve davranışı etkiler; etik standart ve gözetim gerekir"],
            ["Nesnelerin işlenmesi – somut (sahiplik işleme)", "Yük taşıma, tamir-bakım, peyzaj, temizlik, kuru temizleme, depolama", "Üretim-tüketim eşanlı değil; katılım en düşük"],
            ["Nesnelerin işlenmesi – soyut (bilgi işleme)", "Bankacılık, menkul kıymet, yazılım danışmanlığı, muhasebe, sigorta, hukuk", "Ağırlıklı olarak teknolojiden yararlanılır"]])},
        {"baslik": "Süreç tasarımı: akış şeması ve hizmet haritası", "sayfa": "s. 109–112", "maddeler": [
            "Tasarımın ilk adımı süreci belgelemektir: <b>akış şeması</b> süreci basitçe açıklar (adımların niteliği ve sırası); <b>hizmet haritalama</b> akış diyagramının daha karmaşık türüdür, arka planda olanları da gösterir ve departmanlara ortak dil sağlar.",
            "Haritada: müşteri karşılama faaliyetleri ve somut göstergeleri, müşterinin rolü, <b>görünürlük çizgisi</b>, arka plan faaliyetleri, iletişim kanalları, destek süreçleri, potansiyel hata noktaları, bekleme süreleri, hizmet standartları ve hedefleri.",
            "Grönroos'un hizmet süreci modeli: <b>etkileşimli bölüm</b> (irtibat kişileri, sistemler ve operasyonel kaynaklar, fiziksel kaynaklar ve ekipman, müşteri) ve görünürlük çizgisinin arkasındaki <b>destek bölümü</b> (arka ofis). Teknik kalite çoğunlukla çizginin gerisinde desteklenir."]},
        {"baslik": "Tasarımda dikkate alınan unsurlar ve katılım düzeyleri", "sayfa": "s. 112–113", "maddeler": [
            "Beş unsur (Jha vd.): <b>farklılaşma</b>, <b>karmaşıklık</b> (farklılaşma arttıkça artar), <b>hizmet konumu</b> (sağlayıcının yeri, müşterinin yeri, tarafsız yer, sanal), <b>müşterinin katılım ve etkileşim düzeyi</b>, <b>hizmetin kendisi</b> (süreç tabanlı: çok insan ve etkileşim; teknoloji tabanlı: az).",
            "Süreç sorunsuz, hatasız, müşterinin zamanını almayan ve rahat olmalı; kolay süreç tekrar gelmeyi ve tavsiyeyi artırır.",
            "Katılım düzeyleri: <b>düşük</b> (yalnız fiziksel varlık: sinema, otobüs), <b>orta</b> (bilgi, çaba ya da eşya girdisi, biraz kişiselleştirme: kuaför), <b>yüksek</b> (müşteri olmadan hizmet oluşmaz: evlilik danışmanlığı, eğitim, yoga, sağlık)."]},
        {"baslik": "İzleme, yeniden yapılanma ve yeniden tasarım", "sayfa": "s. 113–117", "maddeler": [
            "İyi bir hizmet haritası olası sorun noktalarını içerir; önlemler önceden planlanır. Standartlar zaman parametreleri, senaryo, tutum ve davranışları kapsar.",
            "<b>Yeniden yapılanma:</b> süreçleri daha hızlı ve iyi performans için analiz edip yeniden tasarlamak. Her adımı belirle, süresini ölç, hızlandır ya da kaldır, <b>ölü zamanı</b> yok et; işleri <b>sıralı yerine paralel</b> yürüt; hizmet haritalarından yararlan.",
            "Değişim ihtiyacının iki nedeni: <b>dış çevre</b> değişiklikleri ve <b>içsel</b> bozulma (bürokrasi, veri tekrarı, artan kontrol, şikâyetler).",
            "Yeniden tasarımın dört ölçütü: hata sayısını azaltmak, döngü süresini azaltmak, verimliliği artırmak, müşteri memnuniyetini artırmak.",
            "Beş faaliyet türü (Tablo 1): değer katmayan adımları kaldırmak, self-servise geçmek, hizmeti doğrudan müşteriye götürmek, <b>hizmetleri bir araya toplamak</b> (paket, tek fiyat), fiziksel yönleri yeniden tasarlamak."]},
        {"baslik": "Hizmet paketi", "sayfa": "s. 117", "maddeler": [
            "Hizmetlerin bir araya toplanması: bir kısmı birleştirilip tek fiyatlı paket yapılır ve iyi tanımlanmış bir müşteri bölümüne sunulur; pazarlama maliyeti düşer, süreç hızlanır.",
            "Müşteriye faydası: düşük arama maliyeti, çoklu ihtiyacın birlikte karşılanması, parasal avantaj. Örnekler: internet-konuşma-mesaj paketi, süper uygulamalar, uçuş paketleri."]},
    ],
    "kitapNotlari": [
        "Gözden Geçirelim S1'deki nitelik listesi (itibar, gizlilik, iletişim, erişilebilirlik) bölüm metninde geçmiyor; büyük olasılıkla s. 114 Şekil 3'te (görsel, bu kaynaktan okunamadı).",
    ],
    "akildaKalsin": [
        "Süreç = adımlar ve sıra; \"ne\" değil \"nasıl\".",
        "Müşteri gözü deneyim, firma gözü süreç.",
        "Kişi işleme (somut, insan), zihinsel uyaran (soyut, insan), sahiplik (somut, nesne), bilgi (soyut, nesne).",
        "Akış şeması basit, hizmet haritası karmaşık (görünürlük çizgisi, arka plan).",
        "Katılım: düşük sinema, orta kuaför, yüksek yoga/eğitim.",
        "Yeniden yapılanma: paralel iş, ölü zamanı kaldır. Dört ölçüt: hata ↓, süre ↓, verimlilik ↑, memnuniyet ↑.",
        "Hizmet paketi: tek fiyat, tanımlı bölüm."],
}
