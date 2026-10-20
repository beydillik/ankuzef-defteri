"""Gözden Geçirelim — kitabın bölüm sonu soruları.
Kitabın soruları kelimesi kelimesine aktarılmaz: her soru aynı bilgiyi ve aynı sayıları sorar, kök ve şıklar bizim yazımızla.
Kitaptaki soru numarası (kitapNo) ve kitabın cevap anahtarındaki şık (kitapCevap) saklanır; anahtar hatalıysa kitapNotu yazılır.
Sayfalar: B1 s. 16–17, B2 s. 42–43, B3 s. 63–64, B4 s. 40–43, B5 s. 30–33, B6 s. 27–30."""
from ortak import Q, T, onc

ONC5 = lambda *x: list(x)


def G(bolum, no, cevap, sayfa, soru, secenekler, dogru, aciklama, **ek):
    q = Q(soru, secenekler, dogru, aciklama, sayfa, **ek)
    q.update({"bolum": bolum, "kitapNo": no, "kitapCevap": cevap, "id": f"gg-{bolum}-{no:02d}"})
    q.setdefault("sabitSik", True)  # kitaptaki şık sırası korunur; cevap anahtarı harfiyle karşılaştırılabilsin
    return q


# ---------------- Bölüm 1 (s. 16–17) ----------------
B1 = [
    G("b1", 1, "C", "s. 16", "İş analitiği için aşağıdaki ifadelerden hangisi yanlıştır?",
      ["İşletmedeki problemlerle ilgilenir.", "Karşılaşılan probleme çözüm sunar.", "Yalnızca işletmenin veri analizi bölümünün problemleriyle ilgilenir.", "Veriyi analiz eder.", "Karar verme sistemleriyle ilgilenir."], 2,
      "İş analitiği işletmedeki herhangi bir problemle ilgilenir; tek bir bölümle sınırlı değildir.", celdirici="\"Yalnızca\" gibi daraltan kelimeler bu derste yanlış öncülün işaretidir."),
    G("b1", 2, "B", "s. 16", "Verinin tanımlanması iş analitiğinin hangi aşamasıdır?",
      ["Tahminleyici iş analitiği", "Tanımlayıcı iş analitiği", "Karar verici iş analitiği", "Veri toplayıcı iş analitiği", "Optimal iş analitiği"], 1,
      "Verinin tanımlanmasına tanımlayıcı iş analitiği denir (s. 7).", celdirici="Tahminleyici aşama tahmin üretir; diğer üç ad kitapta bir aşama olarak geçmez."),
    G("b1", 3, "C", "s. 16", "Optimal kârı arayan bir programın sonuç tablosu yukarıdadır. Aşağıdaki ifadelerden hangisi yanlıştır?",
      ["30 birimlik karar değişkeni çözüm kriterini sağlamaz.", "8 ve 25 birimlik karar değişkenleri çözüm kriterlerini sağlar.", "25 birimlik karar değişkeni optimal çözüm olabilir.", "5 birimlik karar değişkeni optimal çözüm olabilir.", "20 birimlik karar değişkeni çözüm kriterini sağlar."], 3,
      "Kriterleri sağlayanlar 5, 8, 20 ve 25; bunların en yüksek amaç değeri 25 birimde (500). 5 birim (100) optimal olamaz.",
      tablo=T(["Karar değişkeni", "Amaç fonksiyonu çıktısı", "Çözüm kriterleri"], [["5", "100", "Sağlar"], ["8", "160", "Sağlar"], ["20", "400", "Sağlar"], ["25", "500", "Sağlar"], ["30", "600", "Sağlamaz"]]), tabloOnce=True,
      kitapNotu="Kitabın cevap anahtarı C diyor; ama C (25 birim optimal olabilir) doğru bir ifade. Yanlış olan 5 birimin optimal olabileceği ifadesi."),
    G("b1", 4, "E", "s. 16", "Bir varlığın incelenen bir özelliği hakkında elde edilen bilgi hangi kavramdır?",
      ["Veri", "Veri toplama", "İstatistik", "Gözlem birimi", "Gözlem"], 4,
      "Gözlem, incelenen bir özellik hakkında elde edilen bilgidir; veri ise bütün gözlemlerdir (s. 8).", celdirici="Veri ile gözlem karışır: tek bilgi gözlem, tümü veri."),
    G("b1", 5, "D", "s. 17", "", onc("Yalnız I", "I ve II", "Yalnız III", "I ve III", "II ve III"), 3,
      "Matematiksel modelle karar verme: problemi tanımla → alternatifler → kriterler → model kur → çöz ve uygula → gerçekle değerlendir. \"Bir alternatifin uygulanması\" problem çözme adımıdır (s. 10–11).",
      onculler=["Problemin tanımlanması ve belirlenmesi", "Bir alternatif çözümün uygulanması", "Matematiksel modelin kurulması"], kok="Yukarıdakilerden hangisi ya da hangileri matematiksel modelleme ile karar vermenin adımlarındandır?", sabitSik=True),
    G("b1", 6, "D", "s. 17", "σ sembolü neyi gösterir?", ["Örneklem varyansı", "Örneklem standart sapması", "Popülasyon varyansı", "Popülasyon standart sapması", "Örneklem ortalaması"], 3,
      "Tablo 1.1: σ popülasyon standart sapması; s örneklem standart sapması; σ² popülasyon varyansı (s. 9)."),
    G("b1", 7, "E", "s. 17", "Pazarlama bölümü satışların müşteri yaşına göre segmentasyonunu istiyor. Bu çalışmanın değişkeni hangisidir?",
      ["Satış tutarları", "Müşteri sayısı", "Müşteri sadakati", "Müşteri harcamaları", "Müşteri yaşı"], 4,
      "Segmentasyon müşteri yaşına göre yapılıyor; ölçülen ve gözlemden gözleme değişen özellik yaştır (s. 9)."),
    G("b1", 8, "B", "s. 17", "", onc("Yalnız I", "I ve II", "Yalnız III", "I ve III", "II ve III"), 1,
      "x̄ aritmetik ortalama, f frekans; korelasyonun örneklem sembolü r'dir, s standart sapmadır (Tablo 1.1, s. 9).",
      onculler=["x̄ aritmetik ortalamayı gösterir.", "f frekansı gösterir.", "s korelasyonu gösterir."], kok="Yukarıdakilerden hangisi ya da hangileri istatistik sembolleri bakımından doğrudur?", sabitSik=True),
    G("b1", 9, "E", "s. 17", "Z = 40 X1 + 50 X2 olan kâr maksimizasyonunda optimal çözüm X1 = 8, X2 = 12 ise Z kaçtır?", ["880", "890", "900", "910", "920"], 4,
      "40 × 8 + 50 × 12 = 320 + 600 = 920.", cozum=["40 × 8 = 320", "50 × 12 = 600", "Z = 920"]),
    G("b1", 10, "E", "s. 17", "Optimal değeri 500, karar değişkenleri X1 = 5 ve X2 = 8 olan problemin amaç fonksiyonu hangisi olabilir?",
      ["Z = 8 X1 + 10 X2", "Z = 40 X1 + 30 X2", "Z = 10 X1 + 90 X2", "Z = 30 X1 + 70 X2", "Z = 20 X1 + 50 X2"], 4,
      "Şıkları dene: 20 × 5 + 50 × 8 = 100 + 400 = 500.", cozum=["8·5 + 10·8 = 120", "40·5 + 30·8 = 440", "10·5 + 90·8 = 770", "30·5 + 70·8 = 710", "20·5 + 50·8 = 500 ✓"]),
]

# ---------------- Bölüm 2 (s. 42–43) ----------------
B2 = [
    G("b2", 1, "D", "s. 42", "Tanımlayıcı iş analitiği için aşağıdakilerden hangisi yanlıştır?",
      ["Verinin kolay anlaşılmasını sağlar.", "Verinin merkez değerini bulur.", "Veri sınıflandırması yapılabilir.", "Gelecekle ilgili öngörü sağlar.", "Müşteri segmentasyonu yapılabilir."], 3,
      "Gelecekle ilgili öngörü tahminleyici iş analitiğinin işidir."),
    G("b2", 2, "C", "s. 42", "Sınıftaki gözlem sayısını gösteren kavram hangisidir?", ["Sınıf aralığı", "Sınıf orta noktası", "Frekans", "Frekans dağılımı", "Göreli frekans"], 2,
      "Frekans sınıftaki gözlem sayısıdır (s. 23)."),
    G("b2", 3, "E", "s. 42", "Beş kalem türünün satış adetleri yukarıdadır. Aşağıdaki ifadelerden hangisi yanlıştır?",
      ["En fazla satış A türündedir.", "Toplam satış 20 bindir.", "En az satış D türündedir.", "E türünün göreli frekansı %16'dır.", "Satışların %30'u A ve C türlerindedir."], 4,
      "A + C = 8 + 2 = 10 bin → 10 / 20 = %50, %30 değil.",
      tablo=T(["Kalem türü", "Satış adedi (bin)"], [["A", "8"], ["B", "5"], ["C", "2"], ["D", "1"], ["E", "4"]]), tabloOnce=True,
      kitapNotu="Kitapta bu soruda iki yanlış ifade var: E'nin göreli frekansı 4 / 20 = %20'dir, %16 değil. Kitabın cevap anahtarı E'yi (A ve C %30) kabul ediyor; burada da öyle, ama %16 ifadesi de yanlış."),
    G("b2", 4, "D", "s. 42", "50 ürünün kârlılık dağılımı yukarıdadır. %10–%15 sınıfının kümülatif göreli frekansı yüzde kaçtır?", ["5", "8", "13", "26", "28"], 3,
      "(5 + 8) / 50 × 100 = 26.", tablo=T(["Kârlılık", "Ürün sayısı"], [["%5 – %10", "5"], ["%10 – %15", "8"], ["%15 – %20", "15"], ["%20 – %25", "12"], ["%25 – %30", "10"]]), tabloOnce=True,
      celdirici="13 kümülatif frekanstır (adet); yüzde için 50'ye böl."),
    G("b2", 5, "E", "s. 43", "", onc("Yalnız I", "Yalnız II", "Yalnız III", "I ve III", "II ve III"), 4,
      "Merkezi eğilim ölçütleri mod, medyan, ortalama. Veri aralığı bir sınıflama kavramıdır.",
      onculler=["Veri aralığı", "Medyan", "Aritmetik ortalama"], kok="Yukarıdakilerden hangisi ya da hangileri merkezi eğilim ölçütüdür?", sabitSik=True),
    G("b2", 6, "E", "s. 43", "3, 5, 7, 10, 12, 16, 24 veri setinin aritmetik ortalaması kaçtır?", ["7", "8", "9", "10", "11"], 4,
      "Toplam 77, n = 7 → 11.", celdirici="10 medyandır (4. değer)."),
    G("b2", 7, "B", "s. 43", "", onc("Yalnız I", "Yalnız II", "Yalnız III", "I ve II", "II ve III"), 1,
      "Medyan uç değerden etkilenmez; mod her veri setinde olmayabilir. Popülasyona çıkarım yapılabilen merkezi eğilim ölçütü aritmetik ortalamadır.",
      onculler=["Medyan uç değerlerden etkilenir.", "Aritmetik ortalama popülasyona çıkarımda bulunulabilen merkezi eğilim ölçütüdür.", "Mod her veri setinde mutlaka hesaplanır."], kok="Yukarıdakilerden hangisi ya da hangileri doğrudur?", sabitSik=True),
    G("b2", 8, "D", "s. 43", "", onc("Yalnız I", "Yalnız II", "Yalnız III", "I ve II", "I ve III"), 3,
      "Aralık ve standart sapma saçınım ölçütüdür; mod merkezi eğilim ölçütüdür.",
      onculler=["Aralık", "Standart sapma", "Mod"], kok="Yukarıdakilerden hangisi ya da hangileri saçınım ölçütüdür?", sabitSik=True),
    G("b2", 9, "D", "s. 43", "7, 10, 12, 20, 26 örneklem veri setinin varyansı kaçtır?", ["48,8", "50", "55,50", "61", "66,50"], 3,
      "x̄ = 15; farkların kareleri 64 + 25 + 9 + 25 + 121 = 244; 244 / 4 = 61.", celdirici="48,8 = 244 / 5: n'ye bölmek.",
      cozum=["x̄ = 75 / 5 = 15", "Σ(xᵢ − x̄)² = 244", "s² = 244 / (5 − 1) = 61"]),
    G("b2", 10, "C", "s. 43", "", onc("Yalnız I", "Yalnız II", "Yalnız III", "I ve III", "II ve III"), 2,
      "Aralık uç değerden etkilenir; çeyreklikler arası fark ortalamayı dikkate almaz. Ortalama mutlak sapma ortalamaya dayandığı için uç değerden etkilenir.",
      onculler=["Aralık verinin uç değerlerinden etkilenmez.", "Çeyreklikler arası fark ortalamayı dikkate alır.", "Ortalama mutlak sapma uç değerlerden etkilenir."], kok="Yukarıdakilerden hangisi ya da hangileri doğrudur?", sabitSik=True),
]

# ---------------- Bölüm 3 (s. 63–64) ----------------
B3 = [
    G("b3", 1, "D", "s. 63", "", onc("Yalnız I", "Yalnız II", "Yalnız III", "II ve III", "I ve III"), 3,
      "Tahminleyici iş analitiği nedenselliği araştırır ve öngörü modeli üretir. Değişkenler arası ilişki yalnızca istatistikle değil, bilimsel açıklamayla da ele alınır.",
      onculler=["Değişkenler arasındaki ilişkiyi yalnızca istatistik açısından ele alır.", "Değişkenler arasındaki nedensellik ilişkisini araştırır.", "Öngörüde bulunulabilecek bir matematiksel model elde edilebilir."], kok="Yukarıdakilerden hangisi ya da hangileri tahminleyici iş analitiği için doğrudur?", sabitSik=True),
    G("b3", 2, "E", "s. 63", "SSXY = 45, SSX = 60 ve SSY = 135 ise korelasyon katsayısı kaçtır?", ["0,10", "0,20", "0,30", "0,40", "0,50"], 4,
      "r = 45 / √(60 × 135) = 45 / √8.100 = 45 / 90 = 0,50.", cozum=["60 × 135 = 8.100", "√8.100 = 90", "r = 45 / 90 = 0,50"]),
    G("b3", 3, "C", "s. 63", "", onc("Yalnız I", "Yalnız II", "I ve II", "I ve III", "II ve III"), 2,
      "Korelasyon katsayısı ilişkinin yönünü ve gücünü gösterir; bağımlı ve bağımsız değişkeni belirlemez (bunu bilimsel çerçeve ve regresyon yapar).",
      onculler=["İki değişken arasındaki ilişkinin yönünü gösterir.", "İki değişken arasındaki ilişkinin gücünü gösterir.", "Bağımlı ve bağımsız değişkeni belirler."], kok="Yukarıdakilerden hangisi ya da hangileri korelasyon katsayısı için doğrudur?", sabitSik=True),
    G("b3", 4, "D", "s. 63", "Model R = 15 X1 + 20 X2. Programa X1 = 10, X2 = 5 girilirse sonuç kaçtır?", ["100", "150", "200", "250", "300"], 3,
      "15 × 10 + 20 × 5 = 150 + 100 = 250."),
    G("b3", 5, "C", "s. 64", "Basit regresyonda bağımlı değişkenin ortalaması 50, bağımsız değişkenin ortalaması 20 ve β₁ = 1 ise β₀ kaçtır?", ["10", "20", "30", "40", "50"], 2,
      "β₀ = Ȳ − β₁X̄ = 50 − 1 × 20 = 30."),
    G("b3", 6, "E", "s. 64", "", onc("Yalnız I", "Yalnız II", "I ve II", "I ve III", "II ve III"), 4,
      "Katsayılar t dağılımıyla test edilir (ki-kare değil). Açıklama gücü R², modelin açıklama gücünün olup olmadığı Anlamlılık F ile bulunur.",
      onculler=["Katsayıların hipotez testi ki-kare dağılımıyla yapılır.", "Modelin açıklama gücü R² ile bulunur.", "Modelin açıklama gücü olup olmadığına Anlamlılık F değeriyle karar verilir."], kok="Yukarıdakilerden hangisi ya da hangileri regresyon hipotez testleri için doğrudur?", sabitSik=True),
    G("b3", 7, "E", "s. 64", "Bağımlı değişkenin bağımsız değişkenlerce açıklanamayan kısmı hangi kavramdır?", ["En küçük kareler yöntemi", "Bağımsız değişken", "Açıklayıcı değişken", "Açıklanan değişken", "Hata terimi"], 4,
      "Hata terimi modelde düşünülemeyen ya da alınamayan, açıklanamayan kısımdır (s. 55).", celdirici="Açıklanan değişken bağımlı değişkenin kendisidir."),
    G("b3", 8, "D", "s. 64", "Yukarıdaki tabloya göre A = 5 ve B = 2 iken bağımlı değişken kaçtır?", ["20,60", "25,60", "28,60", "30,60", "32,60"], 3,
      "5 + 3,20 × 5 + 4,80 × 2 = 5 + 16 + 9,6 = 30,6.", tablo=T(["", "Katsayılar", "t Stat", "P-değeri"], [["Kesişim", "5,00", "3,36", "0,02"], ["A değişkeni", "3,20", "4,03", "0,01"], ["B değişkeni", "4,80", "2,90", "0,03"]]), tabloOnce=True,
      celdirici="25,60 kesişimi (5) eklemeyi unutmaktır."),
    G("b3", 9, "C", "s. 64", "Yukarıdaki tabloya göre;", onc("Yalnız I", "Yalnız II", "I ve II", "I ve III", "II ve III"), 2,
      "A (p = 0,01) ve B (p = 0,03) %5 düzeyinde anlamlı. Kesişimin p'si 0,02 < 0,05 → sıfırdan farklı; \"sıfırdır\" yanlış.",
      tablo=T(["", "Katsayılar", "t Stat", "P-değeri"], [["Kesişim", "5,00", "3,36", "0,02"], ["A değişkeni", "3,20", "4,03", "0,01"], ["B değişkeni", "4,80", "2,90", "0,03"]]), tabloOnce=True,
      onculler=["A katsayısının %5 düzeyinde sıfırdan farklı olduğuna dair güçlü kanıt vardır.", "B katsayısının %5 düzeyinde sıfırdan farklı olduğuna dair güçlü kanıt vardır.", "Kesişim değeri %5 düzeyinde sıfırdır."], kok="Yukarıdakilerden hangisi ya da hangileri doğrudur?", sabitSik=True),
    G("b3", 10, "D", "s. 64", "İki değişken arasındaki ilişkinin yönü pozitifse korelasyon katsayısı hangisi olabilir?", ["−2", "−0,8", "0", "0,8", "2"], 3,
      "Pozitif ilişkide 0 < r ≤ 1; −2 ve 2 korelasyon katsayısı olamaz.", celdirici="2 pozitif ama r 1'i geçemez."),
]

# ---------------- Bölüm 4 (B4 s. 40–43) ----------------
ELEKTRIK = T(["Yol", "Şehirden", "Şehre", "Kapasite (MWH)", "Ters kapasite (MWH)", "Kayıp (MWH)"],
             [["Bağlantı-1", "1", "2", "500", "50", "100"], ["Bağlantı-2", "1", "3", "400", "40", "80"], ["Bağlantı-3", "2", "4", "150", "15", "75"], ["Bağlantı-4", "2", "5", "350", "35", "60"],
              ["Bağlantı-5", "3", "4", "250", "25", "40"], ["Bağlantı-6", "3", "5", "100", "10", "90"], ["Bağlantı-7", "4", "5", "300", "30", "45"]], baslik="XYZ elektrik dağıtım şirketinin hatları")
SOKAK = T(["Nereden \\ Nereye", "S1", "S2", "S3", "Merkez"], [["Merkez", "200", "300", "500", "-"], ["S1", "-", "250", "350", "220"], ["S2", "240", "-", "400", "290"], ["S3", "360", "390", "-", "510"]], baslik="Mesafeler (metre)")
B4 = [
    G("b4", 1, "D", "B4 s. 40", "Şebeke modelleri için aşağıdakilerden hangisi yanlıştır?",
      ["İş analisti şebeke problemlerine şebeke modelleriyle çözüm arar.", "Şebeke problemi grafikle gösterilebilir.", "Şebeke modelleri verimliliği artırabilir.", "Şebeke modellerinin temel amacı iş süreçlerini analiz etmektir.", "Kullanım alanlarından biri lojistiktir."], 3,
      "Şebeke modellerinin amacı şebeke problemlerini (en kısa yol, en kısa döngü, en az bağlantı, en çok akış) çözmektir; iş süreci analizi değil."),
    G("b4", 2, "B", "B4 s. 40", "Başlangıç düğümünden hedef düğüme en kısa yol ya da en az kayıpla ulaşmayı amaçlayan model hangisidir?",
      ["Gezgin satıcı modeli", "En kısa yol modeli", "En kısa yol ağacı modeli", "Maksimum akış modeli", "Proje yönetim modeli"], 1,
      "Bir yerden başka bir yere en kısa mesafe: en kısa yol modeli.", celdirici="En kısa yol ağacı bütün düğümleri birbirine bağlar; tek bir hedefe gitmez."),
    G("b4", 3, "D", "B4 s. 40–41", "Yukarıdaki tabloya göre;", onc("Yalnız I", "Yalnız II", "Yalnız III", "I ve II", "I ve III"), 3,
      "3 → 4 hattında kayıp 40 MWH. 1 nolu şehirden çıkan kapasite 500 + 400 = 900 ile en yüksek. En fazla kayıp 1 → 2 hattında (100), 3 nolu şehirde değil.",
      tablo=ELEKTRIK, tabloOnce=True,
      onculler=["3 nolu şehirden 4 nolu şehre iletimde 40 MWH kayıp yaşanır.", "Kapasite miktarı en yüksek şehir 1 nolu şehirdir.", "İletimde en fazla kayıp 3 nolu şehirden dağıtım yapılırken olur."], kok="Yukarıdakilerden hangisi ya da hangileri doğrudur?", sabitSik=True),
    G("b4", 4, "A", "B4 s. 41", "Yukarıdaki tabloya göre;",
      onc("Yalnız I", "Yalnız II", "Yalnız III", "I ve III", "II ve III"), 0,
      "Yollar: 1–2–5 = 100 + 60 = 160; 1–3–4–5 = 80 + 40 + 45 = 165; 1–3–5 = 170. En az kayıp 1–2–5 (Bağlantı-1 ve Bağlantı-4).",
      tablo=ELEKTRIK, tabloOnce=True, onculler=["Bağlantı-1", "Bağlantı-2", "Bağlantı-6"], kok="1 nolu şehirden 5 nolu şehre en az kayıpla iletim için yukarıdaki bağlantılardan hangisi ya da hangileri kullanılır?", sabitSik=True),
    G("b4", 5, "C", "B4 s. 41", "Yukarıdaki tabloya göre 1 nolu şehirden 5 nolu şehre en az kayıpla iletimde kaç MWH kayıp olur?", ["150", "155", "160", "165", "170"], 2,
      "En kısa (en az kayıplı) yol 1–2–5: 100 + 60 = 160.", tablo=ELEKTRIK, tabloOnce=True, celdirici="165, 1–3–4–5 yoludur; yalnızca 5 MWH fazla."),
    G("b4", 6, "C", "B4 s. 41–42", "Yukarıdaki tabloya göre;",
      onc("Yalnız I", "Yalnız II", "Yalnız III", "I ve II", "I ve III"), 2,
      "Bütün şehirleri bağlamak en kısa yol ağacı problemidir. En küçük kayıplardan başla, döngü oluşturanı atla: 3–4 (40), 4–5 (45), 2–5 (60), 1–3 (80). Kullanılanlar Bağlantı-5, 7, 4 ve 2.",
      tablo=ELEKTRIK, tabloOnce=True, onculler=["Bağlantı-1", "Bağlantı-3", "Bağlantı-5"], kok="1 nolu şehirden başlayıp bütün şehirlere en az kayıpla dağıtım için yukarıdaki bağlantılardan hangisi ya da hangileri kullanılır?", sabitSik=True),
    G("b4", 7, "B", "B4 s. 42", "1 nolu şehirden başlayıp bütün şehirlere en az kayıpla dağıtımda toplam kayıp kaç MWH olur?", ["185", "225", "265", "305", "345"], 1,
      "40 + 45 + 60 + 80 = 225.", tablo=ELEKTRIK, tabloOnce=True),
    G("b4", 8, "B", "B4 s. 42", "1 nolu şehirden 5 nolu şehre ulaştırılabilecek en fazla elektrik kaç MWH'tir?", ["700", "750", "800", "850", "900"], 1,
      "Maksimum akış: 5 nolu şehre giren kapasiteler 350 (2–5) + 100 (3–5) + 300 (4–5) = 750; bu kapasiteler doldurulabiliyor (1–2–5: 350, 1–2–4–5: 150, 1–3–4–5: 150, 1–3–5: 100).",
      tablo=ELEKTRIK, tabloOnce=True, celdirici="900, 1 nolu şehirden çıkan kapasitedir; ama 5'e en fazla 750 girebilir."),
    G("b4", 9, "C", "B4 s. 42", "Dağıtıcı merkezden çıkıp bütün sokakları dolaşıp merkeze dönecektir. Aşağıdakilerden hangisi doğrudur?",
      ["Optimal döngü için önce S3'e gidilmelidir.", "Merkezden S3'e gitmek 200 metredir.", "Merkez ile sokaklar arası mesafe simetrik değildir.", "En uzun mesafe merkezden S3'e gitmektir.", "Bu problem en kısa yol modeliyle çözülür."], 2,
      "Merkez → S1 200 ama S1 → Merkez 220; gidiş ve dönüş farklı, tablo simetrik değil.", tablo=SOKAK, tabloOnce=True,
      celdirici="Bu bir gezgin satıcı problemidir; en uzun mesafe S3 → Merkez (510)."),
    G("b4", 10, "A", "B4 s. 43", "Dağıtıcı en kısa mesafeyle dağıtımı yapıp merkeze dönerse kaç metre yürür?",
      ["M-1-3-2-M döngüsü ile 1230 metre", "M-3-1-2-M döngüsü ile 1200 metre", "M-1-2-3-M döngüsü ile 1230 metre", "M-2-3-1-M döngüsü ile 1280 metre", "M-2-1-3-M döngüsü ile 1200 metre"], 0,
      "M-1-3-2-M: 200 + 350 + 390 + 290 = 1230 en kısa döngü.", tablo=SOKAK, tabloOnce=True,
      cozum=["M-1-3-2-M = 1230", "M-2-3-1-M = 1280", "M-3-2-1-M = 1350", "M-1-2-3-M = 1360", "M-2-1-3-M ve M-3-1-2-M = 1400"],
      celdirici="M-2-3-1-M ile 1280 doğru bir hesaptır ama en kısa döngü değildir."),
]

# ---------------- Bölüm 5 (B5 s. 30–33) ----------------
PROJE = T(["Faaliyet", "Süre", "ES", "EF"], [["A", "3", "0", ""], ["B", "7", "0", ""], ["C", "6", "7", ""], ["D", "2", "7", ""], ["E", "8", "9", ""], ["F", "7", "13", ""], ["G", "4", "17", ""]])
B5 = [
    G("b5", 1, "B", "B5 s. 30", "Proje yönetimi için aşağıdakilerden hangisi yanlıştır?",
      ["Proje yönetim modelleri şebeke modelleri kapsamında değerlendirilebilir.", "Projedeki her faaliyet kritik faaliyettir.", "İş geliştirme süreçleri proje haline getirilerek yönetilebilir.", "Faaliyet proje yönetiminin temel unsurlarındandır.", "Proje yönetim modellerinin amacı projenin başarılı yürütülmesidir."], 1,
      "Yalnızca bolluk zamanı olmayan faaliyetler kritiktir; bolluğu olan faaliyetler kritik değildir."),
    G("b5", 2, "E", "B5 s. 31", "Bolluk zamanı olmayan faaliyetlerin oluşturduğu topluluğun adı nedir?", ["Ardıl faaliyet", "Kritik faaliyet", "Faaliyet kümesi", "Öncül faaliyet topluluğu", "Kritik yol"], 4,
      "Kritik yol, bolluk zamanı olmayan faaliyetlerin oluşturduğu faaliyet topluluğudur (B5 s. 29).", celdirici="Kritik faaliyet tek bir faaliyettir; topluluk kritik yoldur."),
    G("b5", 3, "E", "B5 s. 31", "Gantt şemasında kritik faaliyetlerin süreleri 5, 7, 3 ve 10 ise projenin beklenen tamamlanma süresi kaçtır?", ["8", "12", "15", "20", "25"], 4,
      "Kritik faaliyet sürelerinin toplamı: 5 + 7 + 3 + 10 = 25. 2025 finalin 17. sorusu bunun aynısı (4, 8, 4, 3, 1 → 20)."),
    G("b5", 4, "B", "B5 s. 31", "", onc("Yalnız I", "Yalnız II", "Yalnız III", "I ve II", "II ve III"), 1,
      "Süreler belirliyse CPM, olasılıklıysa PERT kullanılır. En kısa yol bir şebeke modelidir, proje yönetim modeli değil.",
      onculler=["En kısa yol yöntemi", "CPM", "PERT"], kok="Faaliyet süreleri belirli olan bir iş geliştirme sürecinde yukarıdaki proje yönetim modellerinden hangisi ya da hangileri kullanılır?", sabitSik=True),
    G("b5", 5, "E", "B5 s. 31", "Süresi 3 hafta olan faaliyete en erken 5., en geç 7. haftada başlanabiliyor. En geç tamamlanma haftası kaçtır?", ["2", "4", "5", "8", "10"], 4,
      "LF = LS + süre = 7 + 3 = 10.", celdirici="8, en erken tamamlanmadır (ES + süre = 5 + 3); 2 ise bolluk zamanıdır."),
    G("b5", 6, "C", "B5 s. 32", "İyimser süre 5, genellikle süre 8, kötümser süre 17 olan faaliyetin beklenen süresi kaçtır?", ["5", "7", "9", "11", "13"], 2,
      "μ = (a + 4m + b) / 6 = (5 + 32 + 17) / 6 = 54 / 6 = 9 (B5 s. 21). 2025 finalin 6. sorusu aynı tip (6, 14, 16 → 13)."),
    G("b5", 7, "E", "B5 s. 32", "Yukarıdaki tabloya göre projenin beklenen tamamlanma süresi kaçtır?", ["17", "18", "19", "20", "21"], 4,
      "EF = ES + süre: A 3, B 7, C 13, D 9, E 17, F 20, G 21. Proje en son biten faaliyetle (G, 21) biter.", tablo=PROJE, tabloOnce=True, celdirici="17, G'nin başlama zamanıdır."),
    G("b5", 8, "A", "B5 s. 32", "Yukarıdaki tabloya göre aşağıdakilerden hangisi doğrudur?",
      ["E faaliyetinin bolluk zamanı yoktur.", "B faaliyetinin en erken tamamlanma zamanı 10'dur.", "E faaliyetinin öncülü kesinlikle A faaliyetidir.", "C faaliyetinin iyimser süresi 12'dir.", "A faaliyetinin ardıllarından biri B faaliyetidir."], 0,
      "Kritik yol B–D–E–G (7 + 2 + 8 + 4 = 21); E bu yolda, bolluğu yok. E'nin ES'si 9 = D'nin EF'si; öncülü D'dir, A değil.", tablo=PROJE, tabloOnce=True,
      celdirici="E'nin öncülü A olsaydı E 3. haftada başlayabilirdi; ES 9 olduğu için EF'si 9 olan D öncüldür."),
    G("b5", 9, "A", "B5 s. 32–33", "Beklenen tamamlanma süresi μ = 20, varyansı σ² = 9 olan projenin %95 güven aralığı hangisidir? (z = 1,96)",
      ["14,12 < μ < 25,88", "13,75 < μ < 24,15", "18,04 < μ < 21,96", "16,08 < μ < 23,92", "16,08 < μ < 25,88"], 0,
      "σ = √9 = 3. 20 ± 1,96 × 3 = 20 ± 5,88 → 14,12 ile 25,88.", celdirici="18,04–21,96, karekök almadan 1,96 × 1 kullanmaktır; standart sapma 3."),
    G("b5", 10, "A", "B5 s. 33", "İyimser süre 3, genellikle süre 20, kötümser süre 27 olan faaliyetin standart sapması kaçtır?", ["2", "3", "4", "9", "10"], 2,
      "σ = (b − a) / 6 = (27 − 3) / 6 = 4 (varyans 16).",
      kitapNotu="Kitabın cevap anahtarı A (2) diyor; formülle (B5 s. 21: σ² = ((b − a) / 6)²) sonuç 4. Burada doğru kabul edilen 4."),
]

# ---------------- Bölüm 6 (B6 s. 27–30) ----------------
SONUC = T(["İş Geliştirme Projeleri", "İyi", "Durağan", "Kötü"], [["1 nolu Proje", "8", "5", "3"], ["2 nolu Proje", "10", "7", "2"], ["3 nolu Proje", "12", "6", "4"], ["4 nolu Proje", "7", "6", "5"], ["5 nolu Proje", "13", "9", "4"]], baslik="Ekonomik görünüm (milyon TL)")
PROJ = ["1 nolu Proje", "2 nolu Proje", "3 nolu Proje", "4 nolu Proje", "5 nolu Proje"]
AGAC = T(["Karar", "İyi (0,7)", "Kötü (0,3)"], [["Karar 1", "10", "8"], ["Karar 2", "12", "5"], ["Karar 3", "11", "9"], ["Karar 4", "13", "4"], ["Karar 5", "12", "6"]], baslik="Karar ağacındaki dallar: olasılık ve sonuç")
B6 = [
    G("b6", 1, "E", "B6 s. 27", "Karar analizi için aşağıdakilerden hangisi yanlıştır?",
      ["Kararların olası durumlarda aldığı sonuçları belirler.", "Olası durumları belirler.", "Sonuçlar için tablo hazırlanabilir.", "Risk altında olası durumların gerçekleşme olasılığını belirler.", "Belirsizlik (olasılıksız) varsayımında mükemmel bilginin beklenen değerini belirler."], 4,
      "Mükemmel bilginin beklenen değeri olasılık gerektirir; risk altında (olasılıklı) karar vermenin konusudur. 2025 finalin 12. sorusunun III. öncülü de bu tuzaktı."),
    G("b6", 2, "C", "B6 s. 27", "İyimserlik ile kötümserlik arasında bir katsayıyla karar veren kriter hangisidir?", ["Beklenen değer", "Beklenen fırsat kaybı", "Hurwicz indeks kriteri", "Minimaks pişmanlık kriteri", "Maksimaks kriteri"], 2,
      "Hurwicz: iyimserlik katsayısı α ile en iyi ve en kötü sonuç ağırlıklandırılır."),
    G("b6", 3, "E", "B6 s. 27–28", "Yukarıdaki sonuç tablosuna göre maksimaks kriteriyle hangi proje seçilir?", PROJ, 4,
      "En iyi sonuçlar 8, 10, 12, 7, 13 → en büyüğü 13 (5 nolu).", tablo=SONUC, tabloOnce=True),
    G("b6", 4, "D", "B6 s. 28", "Yukarıdaki tabloya göre maksimin kriteriyle hangi proje seçilir?", PROJ, 3,
      "En kötü sonuçlar 3, 2, 4, 5, 4 → en büyüğü 5 (4 nolu).", tablo=SONUC, tabloOnce=True, celdirici="Maksimin kötümserdir: her projenin en kötüsüne bakılır."),
    G("b6", 5, "E", "B6 s. 28", "Yukarıdaki tabloda Hurwicz iyimserlik katsayısı α = 0,4 ise hangi proje seçilir?", PROJ, 4,
      "Hurwicz = α × en iyi + (1 − α) × en kötü: 1 → 5; 2 → 5,2; 3 → 7,2; 4 → 5,8; 5 → 0,4 × 13 + 0,6 × 4 = 7,6 en büyük.", tablo=SONUC, tabloOnce=True,
      cozum=["1: 0,4 × 8 + 0,6 × 3 = 5", "2: 0,4 × 10 + 0,6 × 2 = 5,2", "3: 0,4 × 12 + 0,6 × 4 = 7,2", "4: 0,4 × 7 + 0,6 × 5 = 5,8", "5: 0,4 × 13 + 0,6 × 4 = 7,6 ✓"]),
    G("b6", 6, "C", "B6 s. 28", "Eşit olasılık kriterinde 4 nolu projenin beklenen değeri kaçtır?", ["4 milyon TL", "5 milyon TL", "6 milyon TL", "7 milyon TL", "8 milyon TL"], 2,
      "(7 + 6 + 5) / 3 = 6.", tablo=SONUC, tabloOnce=True),
    G("b6", 7, "D", "B6 s. 28", "Ekonomik görünüm iyi olduğunda pişmanlık değeri en büyük olan proje hangisidir?", PROJ, 3,
      "İyi durumda en yüksek sonuç 13. Pişmanlık = 13 − sonuç: 5, 3, 1, 6, 0 → en büyük 4 nolu (6).", tablo=SONUC, tabloOnce=True),
    G("b6", 8, "C", "B6 s. 28–29", "Olasılıklar iyi 0,2, durağan 0,7, kötü 0,1 ise beklenen değere göre hangi proje seçilir?",
      ["Beklenen değeri 5,4 milyon TL olan 1 nolu proje", "Beklenen değeri 8,9 milyon TL olan 5 nolu proje", "Beklenen değeri 9,3 milyon TL olan 5 nolu proje", "Beklenen değeri 7,1 milyon TL olan 2 nolu proje", "Beklenen değeri 7,1 milyon TL olan 5 nolu proje"], 2,
      "EV: 1 → 5,4; 2 → 7,1; 3 → 7,0; 4 → 6,1; 5 → 0,2 × 13 + 0,7 × 9 + 0,1 × 4 = 9,3.", tablo=SONUC, tabloOnce=True),
    G("b6", 9, "A", "B6 s. 29", "Aynı olasılıklarla (0,2; 0,7; 0,1) mükemmel bilginin beklenen değeri kaçtır?", ["0,1 milyon TL", "0,2 milyon TL", "9,2 milyon TL", "9,3 milyon TL", "9,4 milyon TL"], 0,
      "Mükemmel bilgiyle her durumda en iyisi seçilir: 0,2 × 13 + 0,7 × 9 + 0,1 × 5 = 9,4. EVPI = 9,4 − 9,3 = 0,1 (B6 s. 20).", tablo=SONUC, tabloOnce=True,
      celdirici="9,4, mükemmel bilgi varken beklenen değerdir; EVPI bundan en iyi kararın beklenen değeri çıkarılarak bulunur."),
    G("b6", 10, "C", "B6 s. 30", "Amacı maksimizasyon olan karar ağacı yukarıdaki dallardan oluşuyor. Hangi karar seçilir?", ["Karar 1", "Karar 2", "Karar 3", "Karar 4", "Karar 5"], 2,
      "Her dalın beklenen değeri: K1 9,4; K2 9,9; K3 0,7 × 11 + 0,3 × 9 = 10,4; K4 10,3; K5 10,2 → en büyük K3.", tablo=AGAC, tabloOnce=True,
      kitapNotu="Kitaptaki karar ağacı burada tablo olarak gösterildi; dallar ve değerler aynı."),
]

GOZDEN = {"b1": B1, "b2": B2, "b3": B3, "b4": B4, "b5": B5, "b6": B6}
