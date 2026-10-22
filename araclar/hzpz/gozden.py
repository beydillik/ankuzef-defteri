"""Gözden Geçirelim — kitabın bölüm sonu soruları (Hizmet Pazarlaması).
Kitabın soruları kelimesi kelimesine aktarılmaz: her soru aynı bilgiyi sorar, kök bizim yazımızla.
Kitaptaki soru numarası (kitapNo) ve cevap anahtarı (kitapCevap) saklanır. Çoktan seçmeli sorularda şık sırası kitaptaki gibidir.
Kitapta boşluk doldurma olan sorular (B3: 1, 2, 4, 5, 7; B4: 1, 2, 3, 5, 7, 8, 9, 10) 5 şıklı soruya çevrildi (bosluk=True);
bunlarda kitapCevap anahtarın metnidir, şıkları biz yazdık.
Sayfalar: B1 s. 26, B2 s. 51, B3 s. 78–79, B4 s. 100–101, B5 s. 119, B6 s. 135. Soru sayıları: 5, 5, 7, 10, 5, 5 = 37."""
from ortak import Q


def G(bolum, no, cevap, sayfa, soru, secenekler, dogru, aciklama, **ek):
    q = Q(soru, secenekler, dogru, aciklama, sayfa, **ek)
    q.update({"bolum": bolum, "kitapNo": no, "kitapCevap": cevap, "id": f"gg-{bolum}-{no:02d}"})
    q.setdefault("sabitSik", True)
    return q


def B(bolum, no, cevap, sayfa, soru, secenekler, dogru, aciklama, **ek):
    """Kitapta boşluk doldurma olan soru: şıkları biz yazdık. Doğru şık hep başta olmasın diye
    şıklar kaydırılır; doğru cevap (no + bölüm no) % 5 konumuna gelir."""
    hedef = (no + int(bolum[1:])) % 5
    k = (dogru - hedef) % 5
    secenekler = secenekler[k:] + secenekler[:k]
    return G(bolum, no, cevap, sayfa, soru, secenekler, hedef, aciklama, bosluk=True, **ek)


ADET = {"b1": 5, "b2": 5, "b3": 7, "b4": 10, "b5": 5, "b6": 5}

# ---------------- Bölüm 1 (s. 26) ----------------
B1 = [
    G("b1", 1, "C", "s. 6", "Kitaba göre günümüz hizmet pazarlaması anlayışında öne çıkan unsur hangisidir?",
      ["Ürün kalitesi", "Reklam bütçesi", "Müşteri deneyimi", "Fırsatın çerçevesi", "Fiziksel dağıtım kanalı"], 2,
      "Modern hizmet pazarlamasında müşteri deneyimi ön plandadır; hizmet kalitesi ve müşteriyle etkileşim markanın algılanan değerini doğrudan etkiler.",
      celdirici="Ürün kalitesi fiziki ürün odaklı eski anlayışı çağrıştırır."),
    G("b1", 2, "E", "s. 8", "Kitap, dijitalleşmenin hizmet pazarlamasında büyük etki yarattığı dönemi nasıl adlandırır?",
      ["1960'lar ve 1970'ler", "1980'ler", "1990'lar", "2000'ler", "2000'ler ve sonrası"], 4,
      "Tarihsel gelişim: 1960–70'ler ilk ilgi, 1980'ler teorik katkılar (SERVQUAL), 1990'lar teoriden uygulamaya (CRM), 2000'ler ve sonrası dijitalleşmenin büyük etkisi ve hizmet baskın mantık.",
      celdirici="\"2000'ler\" eksik kalır; kitap dönemi \"2000'ler ve sonrası\" diye verir."),
    G("b1", 3, "B", "s. 9", "Hizmet endüstrisinde dijital dönüşüm, kitaba göre hangi teknolojileri birlikte getirmiştir?",
      ["Elektrikli araçlar ve yenilenebilir enerji", "Büyük veri analitiği, yapay zekâ ve otomasyon", "Tüketici algısındaki değişiklikler", "Nanoteknoloji", "Hidrolik sistemler"], 1,
      "Dijital dönüşüm büyük veri analitiği, yapay zekâ ve otomasyonun entegrasyonunu getirmiştir; örneği müşteri hizmetlerindeki yapay zekâ destekli sohbet botlarıdır.",
      celdirici="Tüketici algısındaki değişiklik bir teknoloji değildir."),
    G("b1", 4, "A", "s. 14", "Hizmet tüketiminin satın alma öncesi aşaması hangi adımlardan oluşur?",
      ["İhtiyacı fark etme, bilgi arama, alternatif çözüm ve tedarikçileri değerlendirme, satın alma kararı",
       "Bilgi arama, satın alma kararı, hizmeti deneyimleme, hizmet sonrası değerlendirme",
       "Alternatifleri değerlendirme, hizmeti deneyimleme, hizmet sonrası değerlendirme, ihtiyacı fark etme",
       "Hizmet ortamıyla, çalışanlarla ve diğer müşterilerle etkileşim, hizmet sonrası değerlendirme",
       "Müşteri etkileşimine odaklanma"], 0,
      "Üç aşamalı model: satın alma öncesi, hizmet karşılaşması, karşılaşma sonrası. Satın alma öncesi dört adımdır: ihtiyaç farkındalığı, bilgi arama, alternatiflerin değerlendirilmesi, satın alma kararı.",
      celdirici="Hizmeti deneyimlemek karşılaşma aşamasında, değerlendirme karşılaşma sonrasında olur; bu adımları içeren şıklar aşamaları karıştırır."),
    G("b1", 5, "A", "s. 13", "Hizmetlerin stoklanamama (dayanıksızlık) özelliğinden doğan zorluk hangi stratejiyle fırsata çevrilir?",
      ["Etkili talep yönetimi", "Bilgi asimetrisi", "Standart eğitim ve kalite kontrol", "Fiziksel kanıt ve markalama", "Müşteri etkileşimine odaklanma"], 0,
      "Tablo 3: soyutluk → fiziksel kanıt ve markalama; dayanıksızlık → etkili talep yönetimi; değişkenlik → standart eğitim ve kalite kontrol; ayrılmazlık → müşteri etkileşimine odaklanma.",
      celdirici="Diğer üç strateji de Tablo 3'te var ama başka özelliklerin karşılığıdır."),
]

# ---------------- Bölüm 2 (s. 51) ----------------
B2 = [
    G("b2", 1, "B", "s. 33", "Kitaba göre pazarlama stratejisinin temel amacı nedir?",
      ["Yeni ürünler geliştirmek", "Üstün müşteri değeri yaratıp sunarak ve ileterek müşteri memnuniyeti sağlamak", "Şirketin iç süreçlerini optimize etmek", "Yalnızca maliyetleri düşürmek", "Tüketici odaklılık"], 1,
      "Pazarlama stratejisi, hedef müşterilere üstün müşteri değeri yaratma, sunma ve iletmede rakiplerden etkili olarak müşteri memnuniyeti yoluyla kâr elde etmeye dayanır.",
      celdirici="\"Yalnızca\" kelimesi daraltıcıdır; maliyet liderliği tek bir rekabet stratejisidir."),
    G("b2", 2, "B", "s. 34", "Rekabet avantajı kazanmayı hedefleyen üç genel rekabet stratejisi hangileridir?",
      ["Ürün geliştirme, pazarlama karması, satış artırma", "Genel maliyet liderliği, farklılaşma, odaklanma", "Teknolojik yenilik, pazar genişletme, fiyat liderliği", "Müşteri memnuniyeti, kalite kontrol, fiyat farklılaştırma", "Pazar bölümlendirme"], 1,
      "Üç genel rekabet stratejisi: genel maliyet liderliği (düşük fiyat), farklılaşma (katma değer, yüksek fiyat), odaklanma (küçük segmente maliyet ya da farklılaşmayla).",
      celdirici="\"Fiyat liderliği\" maliyet liderliğine benzer ama listenin geri kalanı kitapta yok."),
    G("b2", 3, "B", "s. 39", "Pazar bölümlendirme kriterlerinden \"benzerlik\" neyi anlatır?",
      ["Farklı tüketici gruplarının aynı stratejiye aynı tepkiyi vermesini", "Bir gruptaki tüketicilerin pazarlama karmasına tepkilerinde ve bölümlendirme boyutlarında olabildiğince benzer (homojen) olmasını",
       "Pazardaki bütün tüketicilerin aynı ihtiyaçları paylaşmasını", "Tüketicilerin bir hizmete benzer duygusal tepkiler göstermesini", "Gelir seviyesi benzer tüketici bölümünü"], 1,
      "Benzerlik grup içi homojenliktir; farklılık ise farklı gruplar arasındaki heterojenliktir. Diğer iki kriter önemli olma ve işlevselliktir.",
      celdirici="İlk şık \"farklı gruplar\" der; benzerlik aynı gruptakilerle ilgilidir."),
    G("b2", 4, "C", "s. 39–40", "Aşağıdakilerden hangisi müşteri yanıtlarına dayanan bir bölümlendirme kriteridir?",
      ["Demografik değişkenler", "Psikografik profiller", "Faydalar", "Coğrafi bölgeler", "Sosyal ağlar"], 2,
      "Müşteri yanıtları: faydalar, kullanım, promosyon tepkisi, sadakat. Demografi, psikografi ve coğrafya müşteri özellikleri grubundadır.",
      celdirici="Psikografi davranışla ilgili olduğu için yanıt gibi görünür ama kitapta müşteri özellikleri altında sayılır (2025-26 Vize S6)."),
    G("b2", 5, "B", "s. 41", "Mikro pazarlama yaklaşımının odağı nedir?",
      ["Tüm pazara tek stratejiyle seslenmek", "Yerel müşterilere: mahallelere, mağazalara ve bireylere odaklanmak", "Yalnızca yüksek gelirli müşterilere hizmet sunmak", "Küresel pazarlarda büyüyüp uluslararası segmentlere ulaşmak", "Homojen tüketici grupları"], 1,
      "Mikro pazarlamada hizmet şirketi yerel müşterilere (ticaret alanları, mahalleler, mağazalar, bireyler) odaklanır ve stratejisini yerel pazara göre özelleştirir.",
      celdirici="Tüm pazara tek strateji farklılaştırılmamış pazarlamadır."),
]

# ---------------- Bölüm 3 (s. 78–79) ----------------
B3 = [
    B("b3", 1, "yoğun, sınırlı, seçimlik", "s. 70",
      "Dağıtım politikaları yaygınlığa göre üç biçimdedir: ürün ya da hizmetin pazarda mümkün olan her noktada sunulduğu (1), ondan daha az yaygın olan (2) ve yaygınlığı en düşük olan (3). Boşluklara sırasıyla ne gelir?",
      ["(1) yoğun (2) sınırlı (3) seçimlik", "(1) seçimlik (2) sınırlı (3) yoğun", "(1) sınırlı (2) yoğun (3) seçimlik", "(1) doğrudan (2) dolaylı (3) seçimlik", "(1) yoğun (2) seçimlik (3) sınırlı"], 0,
      "Yoğun (yaygın) dağıtım her noktada; sınırlı dağıtım ondan az yaygın; seçimlik dağıtım yaygınlığı en düşük olanıdır.",
      celdirici="Seçimlik ile sınırlıyı karıştırma: en dar olan seçimliktir."),
    B("b3", 2, "doğrudan, büyüme", "s. 71",
      "Hizmetler soyut ve stoklanamaz olduğu için dağıtımda çoğunlukla (1) dağıtım kullanılır; yeni hizmet merkezleri açmak ise (2) stratejisi olarak da görülür. Boşluklara sırasıyla ne gelir?",
      ["(1) doğrudan (2) büyüme", "(1) dolaylı (2) büyüme", "(1) doğrudan (2) farklılaşma", "(1) dolaylı (2) odaklanma", "(1) yoğun (2) maliyet liderliği"], 0,
      "Hizmette sağlayıcı ile tüketici doğrudan karşılaşır (aracı yok). Yeni merkez açmak dağıtımı yaygınlaştırır ve büyüme stratejisi sayılır; merkezin yeri stratejik karardır.",
      celdirici="Dolaylı dağıtım aracı (toptancı, perakendeci) kullanır; fiziki ürünlerde yaygındır."),
    G("b3", 3, "B", "s. 70", "Dağıtım politikalarını üç biçime ayıran temel ölçüt nedir?",
      ["Ürünün maliyeti", "Tüketicilerin erişim kolaylığı", "Üretim süreci", "Reklam bütçesi", "Toptancı sayısı"], 1,
      "Politikaları ayıran nokta, ürün ya da hizmetin ne kadar yaygın sunulduğu, yani tüketicinin ona ne kadar kolay eriştiğidir.",
      celdirici="Toptancı sayısı dolaylı dağıtımla ilgilidir; ayrımın ölçütü değildir."),
    B("b3", 4, "İnsan", "s. 71",
      "Hizmetin sunumu ve tüketimi aynı anda olduğu için çalışanlar hizmet kalitesini doğrudan etkiler; tüketici çalışanın tutumunu işletmenin özelliği sayar. Bu açıklama hangi pazarlama karması elemanına aittir?",
      ["İnsan", "Süreç", "Fiziksel kanıt", "Tutundurma", "Ürün"], 0,
      "Hizmetlerde öne çıkan ilk ek eleman insandır: güler yüz ya da asık surat, tüketicinin gözünde işletmenin özelliğidir; her altı tüketiciden biri yalnız olumsuz çalışan davranışı yüzünden vazgeçer.",
      celdirici="Süreç, hizmetin nasıl sunulduğunu belirleyen prosedürlerdir; çalışan tutumu insan elemanıdır."),
    B("b3", 5, "fiziksel kanıt, soyut", "s. 73",
      "Hizmetler genellikle (2) algılandığı için somut unsurlar tüketicinin risk algısını azaltır; bu yüzden (1) hizmet pazarlamasında önemli rol oynar. Mekânın tasarımı bunun örneğidir. Boşluklara sırasıyla ne gelir?",
      ["(1) fiziksel kanıt (2) soyut", "(1) süreç (2) somut", "(1) fiziksel kanıt (2) heterojen", "(1) insan (2) soyut", "(1) tutundurma (2) stoklanamaz"], 0,
      "Fiziksel kanıt: hizmetin sunulduğu ortam ve somut kolaylaştırıcılar. Gerekçesi soyutluktur; soyut hizmet daha riskli algılanır, somut ipuçları riski azaltır.",
      celdirici="Heterojenlik değişkenlik demektir; risk algısını somut unsurlarla azaltma gerekçesi soyutluktur."),
    G("b3", 6, "C", "s. 71", "Hizmet dağıtımında çoğunlukla doğrudan dağıtımın tercih edilmesinin nedeni nedir?",
      ["Hizmetlerin üretim süreci karmaşıktır", "Hizmetler stoklanabilir", "Hizmetler soyut ve stoklanamaz olduğundan doğrudan ilişki daha etkilidir", "Hizmetler maliyetleri düşürür", "Hizmetler fiziksel kanıt gerektirir"], 2,
      "Hizmetler soyut, eşzamanlı üretilip tüketilen ve stoklanamaz olduğundan stok maliyeti kaygısı azdır; sağlayıcı ile tüketici arasındaki doğrudan temas tercih edilir.",
      celdirici="\"Stoklanabilir\" tersidir."),
    B("b3", 7, "içsel pazarlama, etkileşimli pazarlama", "s. 59, 72",
      "Hizmet pazarlaması, fiziki ürünlerden farklı olarak iki pazarlama türü daha gerektirir: (1) çalışanların ve destek personelinin tüketici memnuniyeti için ekip olarak çalışmasını sağlayan; (2) hizmet sürecindeki tüketiciyle etkileşime odaklanan. Sırasıyla hangileridir?",
      ["(1) içsel pazarlama (2) etkileşimli pazarlama", "(1) etkileşimli pazarlama (2) içsel pazarlama", "(1) dışsal pazarlama (2) etkileşimli pazarlama", "(1) içsel pazarlama (2) dışsal pazarlama", "(1) ilişkisel pazarlama (2) etkileşimli pazarlama"], 0,
      "Hizmet pazarlaması üçgeni: içsel (işletme → çalışan), etkileşimli (çalışan → müşteri), dışsal (işletme → müşteri, 4P). Başarılı dışsal pazarlamanın ön koşulu içsel pazarlamadır.",
      celdirici="Sıra ters çevrilmiş şık en güçlü tuzak: çalışana yönelik olan içseldir."),
]

# ---------------- Bölüm 4 (s. 100–101) ----------------
B4 = [
    B("b4", 1, "Müşteri algısı ve hizmet kalitesi", "s. 85",
      "Hizmet sürecindeki insanlar, hizmet pazarlaması karmasında hangi iki konu üzerinde etkilidir?",
      ["Müşteri algısı ve hizmet kalitesi", "Fiyat ve dağıtım", "Marka imajı ve reklam", "Maliyet ve verimlilik", "Tutundurma ve satış"], 0,
      "İnsan faktörü hizmet sunumunda rol oynar ve müşterilerin hizmet kalitesine ilişkin algılarını etkiler.",
      celdirici="Maliyet ve verimlilik süreç tasarımının ölçütleridir (Bölüm 5)."),
    B("b4", 2, "Yarı pazarlamacı-hizmet sunumu", "s. 85",
      "Gummesson (2007), hizmet sektöründeki bütün aktörleri (1) olarak adlandırır; bu kişiler (2) süreçlerine önemli katkı sağlar. Boşluklara sırasıyla ne gelir?",
      ["(1) yarı zamanlı pazarlamacı (2) hizmet sunumu", "(1) tam zamanlı pazarlamacı (2) ürün geliştirme", "(1) iç müşteri (2) fiyatlama", "(1) ortak üretici (2) dağıtım", "(1) temas personeli (2) reklam"], 0,
      "Gummesson'a göre hizmet sektöründeki tüm aktörler yarı zamanlı pazarlamacıdır; eylemleri müşterinin aldığı çıktıyı doğrudan etkiler (2025-26 Final S8).",
      kitapNotu="Kitabın cevap anahtarı \"yarı pazarlamacı\" yazar; metinde (s. 85) kavramın adı \"yarı zamanlı pazarlamacı\"."),
    B("b4", 3, "güvenilirlik, güvence, somut unsurlar, empati ve tepki verme", "s. 86",
      "Parasuraman ve arkadaşlarının (1988) SERVQUAL modelindeki beş hizmet kalitesi boyutu hangi seçenekte doğru verilmiştir?",
      ["Güvenilirlik, güvence, somut unsurlar, empati, tepki verme", "Güvenilirlik, güvence, soyut unsurlar, empati, tepki verme", "Erişim, güvenlik, nezaket, yeterlilik, iletişim",
       "Güvenilirlik, güven, somutlar, nezaket, yanıt verme", "Belirginlik, alaka, akılda kalıcılık, esneklik, güvence"], 0,
      "SERVQUAL'in beş boyutu: güvenilirlik, güvence, somut unsurlar, empati, tepki verme. Kitap insan unsurunun beşinde de kritik olduğunu vurgular.",
      celdirici="\"Soyut unsurlar\" 2025-26 Final S13'ün çeldiricisiydi. Erişim, nezaket, yeterlilik Bölüm 3'teki on kalite unsurundandır; belirginlik-alaka-akılda kalıcılık-esneklik marka adı ilkeleridir."),
    G("b4", 4, "D", "s. 86", "SERVQUAL'in \"güvenilirlik\" boyutunu hangi tanım anlatır?",
      ["Çalışanların bilgi ve nezaketiyle müşteriye güven verme kapasitesi", "Hizmetin fiziksel boyutlarını içeren ve genel kaliteyi etkileyen unsurlar", "Müşterinin kişisel ihtiyaçlarını anlayıp ona özel ilgi göstermek",
       "Çalışanların hizmeti sürekli tutarlı ve doğru biçimde sunabilmesi", "Müşteri taleplerine ve şikâyetlerine hızlı ve etkili yanıt verebilmek"], 3,
      "Güvenilirlik: hizmetin sürekli tutarlı ve doğru sunulması. Diğer şıklar sırasıyla güvence, somut unsurlar, empati ve tepki vermenin tanımıdır.",
      celdirici="Güvence de \"güven\" kelimesini içerir; o, bilgi ve nezaketle güven vermedir."),
    B("b4", 5, "Tüketici", "s. 88",
      "Bir ihtiyacını gidermek için bir malı bedel ödeyerek nihai tüketim amacıyla satın alan kişiye ne denir?",
      ["Tüketici", "Aracı", "Toptancı", "Yarı zamanlı pazarlamacı", "İç müşteri"], 0,
      "Tüketici, ürün ve hizmetleri nihai tüketim amacıyla satın alan kişidir. İki temel amacı ihtiyaçlarını karşılamak ve toplumda kabul görmektir.",
      celdirici="Aracı ve toptancı yeniden satmak için satın alır; nihai tüketim amacı yoktur."),
    G("b4", 6, "E", "s. 89", "Aşağıdakilerden hangisi tüketici davranışını etkileyen psikolojik faktörlerden değildir?",
      ["Öğrenme", "Güdülenme", "Algılama", "Tutum", "Sosyal sınıf"], 4,
      "Tablo 1: psikolojik faktörler öğrenme, güdülenme, algılama, tutum, kişilik; sosyo-kültürel faktörler grup etkisi, sosyal sınıf, aile, kültür; demografik faktörler yaş, cinsiyet, eğitim, coğrafik yerleşim, meslek, gelir.",
      celdirici="Kişilik de psikolojiktir; sosyal sınıf sosyo-kültürel gruptadır."),
    B("b4", 7, "Hizmet baskın mantık", "s. 94",
      "Değerin bir hizmet sürecindeki bütün aktörlerle birlikte yaratıldığı ve aktörler arası işbirliğine dayanan çerçevenin adı nedir?",
      ["Hizmet baskın mantık", "İçsel pazarlama", "Hizmet pazarlaması üçgeni", "İlişkisel pazarlama", "Müşteri katılımı"], 0,
      "Hizmet baskın (S-D) mantık (Vargo ve Lusch): hizmet mübadelenin temel unsurudur, süreç odaklıdır, değer müşteri ve diğer aktörlerle etkileşim içinde birlikte yaratılır.",
      celdirici="Müşteri katılımı bu mantıkla açıklanan bir kavramdır, çerçevenin kendisi değildir."),
    B("b4", 8, "Müşteri memnuniyeti", "s. 95",
      "Bir ürün satın alındıktan ya da hizmet kullanılıp ödendikten sonra yaşanan deneyime dayanarak oluşan tutum nasıl adlandırılır?",
      ["Müşteri memnuniyeti", "Müşteri bağlılığı", "Müşteri katılımı", "Algılanan risk", "Güvence"], 0,
      "Müşteri memnuniyeti satın alma sonrası deneyimle şekillenen tutumdur ve müşteri sadakatinin öncülüdür.",
      celdirici="Bağlılık sonraki aşamadır: tekrar tercih etme eğilimi."),
    B("b4", 9, "Tutumsal ve davranışsal", "s. 96–97",
      "Müşteri bağlılığı hangi iki temel bileşenden oluşan çok boyutlu bir yapıdır?",
      ["Tutumsal ve davranışsal", "Bilişsel ve duygusal", "Tutumsal ve bilişsel", "Duygusal ve ekonomik", "İçsel ve dışsal"], 0,
      "Tutumsal bağlılık markaya duygusal ve bilişsel bağlar (güven, tercih); davranışsal bağlılık somut eylemler (tekrar satın alma, tavsiye).",
      celdirici="Bilişsel ve duygusal, müşteri katılımının boyutlarındandır (üçüncüsü davranışsal)."),
    B("b4", 10, "Bilişsel, duygusal ve davranışsal", "s. 94",
      "Tüketici (müşteri) katılımı hangi üç boyutla ele alınır?",
      ["Bilişsel, duygusal, davranışsal", "Tutumsal, davranışsal, sosyal", "Psikolojik, sosyo-kültürel, demografik", "Bilişsel, ekonomik, davranışsal", "Duygusal, sosyal, fiziksel"], 0,
      "Bilişsel: markayla ilgili düşünce düzeyi; duygusal: markaya olumlu duygular; davranışsal: markaya emek ve zaman harcama (Hollebeek vd., Brodie vd.).",
      celdirici="Psikolojik-sosyo-kültürel-demografik, tüketici davranışını etkileyen faktör gruplarıdır."),
]

# ---------------- Bölüm 5 (s. 119) ----------------
B5 = [
    G("b5", 1, "D", "s. 119", "Aşağıdakilerden hangisi bir hizmetin taşıması gereken nitelikler arasında yer almamalıdır?",
      ["İtibar", "Gizlilik", "İletişim", "Duyarsızlık", "Erişilebilirlik"], 3,
      "İtibar, gizlilik, iletişim ve erişilebilirlik hizmette aranan olumlu niteliklerdir; duyarsızlık olumsuz bir niteliktir.",
      kitapNotu="Bu nitelik listesi bölüm metninde geçmiyor; büyük olasılıkla s. 114'teki Şekil 3'te (hizmet süreci standardı) yer alıyor. Cevap anahtarı mantıkla doğrulandı."),
    G("b5", 2, "B", "s. 111", "Grönroos'un hizmet süreci modelinde sistemin etkileşimli bölümünde hangisi yer almaz?",
      ["Sistemler", "Destek personeli", "Operasyonel kaynaklar", "İrtibat kişileri", "Fiziksel kaynaklar ve ekipmanlar"], 1,
      "Etkileşimli bölümde irtibat kişileri, sistemler ve operasyonel kaynaklar, fiziksel kaynaklar ve ekipmanlar (ve müşterinin kendisi) vardır. Destek bölümü görünürlük çizgisinin arkasındaki arka ofistir.",
      celdirici="İrtibat kişileri müşteriyle temas eden personeldir; destek personeli arkada kalır."),
    G("b5", 3, "E", "s. 113", "Aşağıdakilerden hangisi müşterinin hizmet sürecine yüksek düzeyde katılmasını gerektirir?",
      ["Tamir hizmeti almak", "Sinemaya gitmek", "Saç kestirmek", "Kuru temizleme yaptırmak", "Yoga sınıfına katılmak"], 4,
      "Yüksek katılımda müşteri olmadan hizmet oluşmaz: evlilik danışmanlığı, eğitim, yoga, sağlık. Sinema düşük, kuaför orta düzeydir.",
      celdirici="Saç kestirmek orta katılımın kitaptaki örneğidir (2025-26 Final S20)."),
    G("b5", 4, "A", "s. 108", "Aşağıdakilerden hangisi hizmet süreçlerinin sınıflandırma türlerinden biri değildir?",
      ["Zaman işleme", "Kişi işleme", "Bilgi işleme", "Zihinsel uyaran işleme", "Sahiplik işleme"], 0,
      "Dört tür: kişi işleme, zihinsel uyaran işleme, sahiplik işleme, bilgi işleme. Zaman işleme yok.",
      celdirici="2025-26 Final S17 aynı soruyu \"hizmet işleme\" çeldiricisiyle sordu."),
    G("b5", 5, "C", "s. 108–109", "Aşağıdaki ifadelerden hangisi yanlıştır?",
      ["Hizmet süreçlerden oluşur", "Müşterinin bakış açısından hizmetler deneyimdir", "Bilgi işleme hizmetlerinde teknolojiden çok az yararlanılır",
       "Firmanın bakış açısından hizmetler, istenen deneyimi yaratmak için tasarlanıp yönetilmesi gereken süreçlerdir", "Süreçler müşteriye kişiselleştirilmiş ilgi sunacak şekilde özelleştirilebilir"], 2,
      "Kitap bilgi işleme hizmetlerinde ağırlıklı olarak teknolojiden yararlanıldığını söyler (bankacılık, sigorta, veri işleme).",
      celdirici="Deneyim (müşteri gözü) ve süreç (firma gözü) ifadelerinin ikisi de kitapta aynen geçer."),
]

# ---------------- Bölüm 6 (s. 135) ----------------
B6 = [
    G("b6", 1, "B", "s. 124", "Fiziksel kanıtla ilgili aşağıdaki ifadelerden hangisi yanlıştır?",
      ["Fiziksel kanıt şirketin müşteriye verdiği ilk ve en güçlü izlenimdir", "Hizmette somut ürün satışı olmadığından müşterinin güvenini kazanmak daha kolaydır",
       "Görünür ve dokunulabilir yönler olarak fiziksel kanıtlar kalite hakkında fikir verir ve satın alma kararını etkiler", "Fiziksel kanıt hizmet pazarlaması karmasının bir unsurudur",
       "Hizmet kalitesini gösteren görsel ya da somut ipuçlarına fiziksel kanıt denir"], 1,
      "Kitap tersini söyler: somut ürün olmadığı için müşterinin güvenini kazanmak daha zordur; fiziksel kanıt bu yüzden devreye girer.",
      celdirici="Yalnız bir kelime değişmiş: zor → kolay."),
    G("b6", 2, "E", "s. 128", "Aşağıdakilerden hangisi hizmet ortamı koşullarından değildir?",
      ["Müzik", "Aydınlatma", "Koku", "Sıcaklık", "Zaman"], 4,
      "Hizmet ortamı koşulları: müzik, aydınlatma, koku, sıcaklık, temizlik. Zaman bir ortam koşulu değildir.",
      celdirici="2025-26 Final S1 aynı listeyi \"personel\" çeldiricisiyle sordu."),
    G("b6", 3, "A", "s. 126–132", "Aşağıdaki ifadelerden hangisi doğrudur?",
      ["Çalışan ile müşteri arasındaki etkileşim hizmet markasının başarısında çok etkilidir", "Hizmet ortamı tüketici algısını etkilemez", "Hizmet ortamı tüketicinin gelecekteki davranışlarını belirlemez",
       "Hizmet ortamı, müşteri hizmet fabrikasında fiziksel olarak bulunmadığında özellikle önemlidir", "Düşük sıcaklık bilişsel karar verme eğilimini artırır"], 0,
      "Hizmet markası geliştirmede çalışanlar: etkileşim markanın başarısında çok etkilidir; güçlü marka içeriden oluşur (s. 132). Hizmet ortamı algının ve gelecekteki davranışın önemli belirleyicisidir (s. 126); müşteri fiziken bulunduğunda özellikle önemlidir (s. 127); düşük sıcaklık duygusal karar verme eğilimini artırır (s. 129).",
      celdirici="Sıcaklık şıkkı ters çevrilmiş: düşük sıcaklık duygusal, yüksek sıcaklık bilişsel karar eğilimini artırır."),
    G("b6", 4, "C", "s. 131–132", "Güçlü hizmet markaları için aşağıdakilerden hangisi yanlıştır?",
      ["Müşteriye gelecekte elde edeceği tatminin sözünü verir", "Müşteri için \"güvenli liman\" olur", "Sosyal medya marka oluşturmada önemli değildir",
       "Yenilikçilik müşterinin markaya tutumunu değiştirebilir", "Müşterinin işletmeye güvenini artırır"], 2,
      "Kitap sosyal medyanın hizmet markası geliştirmede önemli olduğunu söyler: soyut ve belirsiz özelliklere rağmen marka değeri deneyimini olumlu etkiler.",
      celdirici="Yenilikçilik ifadesi artırılmış gerçeklik bölümünden gelir ve doğrudur."),
    G("b6", 5, "A", "s. 126", "Aşağıdakilerden hangisi fiziksel kanıtın temel unsurlarından değildir?",
      ["Rakipler", "Hizmet ortamı", "İletişim biçimi", "Hizmet personelinin görünüşü", "Hizmetin fiyatı"], 0,
      "Temel unsurlar: fiziki çevre (hizmet ortamı), iletişim, hizmetin fiyatı, personelin görünüşü ve davranışları, hizmete eşlik eden somut unsurlar, marka. Rakipler bunlardan değil.",
      celdirici="Fiyat listede; 2025-26 Final S15 aynı listeyi \"hizmet süreci\" çeldiricisiyle sordu."),
]

GOZDEN = {"b1": B1, "b2": B2, "b3": B3, "b4": B4, "b5": B5, "b6": B6}
