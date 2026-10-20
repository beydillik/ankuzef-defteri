# Bölüm 4 (PDF 46 sayfa)
4. BÖLÜM

Şebeke M odelleri
Uygulam aları

1


[pdf 1]

Öğrenm e Hedefleri
•

Şebeke kavramını
anlaşılması.

iş

analitiği

çerçevesinde

•

Şebeke modellerinin uygulamalarının öğrenilmesi.

•

Gezgin satıcı modeli, en kısa yol modeli, en kısa
yol ağacı modeli ile maksimum akış modelinin iş
alanlarında uygulamaları.

•

Gezgin satıcı modeli, en kısa yol modeli, en kısa
yol ağacı modeli ile maksimum akış modelinin
kurulum
ve
çözümleme
yeteneğinin
kazandırılması.

•

Şebeke modellerinin hangisinin işletmenin hangi
tür problemlerinde uygulaması becerisinin
kazandırılması

Anahtar K avram lar
Düğüm, ok, olay, şebeke, en kısa yol, en kısa yol ağacı,
maksimum akış, gezgin satıcı, döngü, komşu düğüm, akış,
akış miktarı.

2


[pdf 2]

Giriş
Bu bölüm itibariyle iş analitiği ve veri çerçevesinde karar
verme modellerinin uygulamaları analiz edilecektir.
Bölümde şebeke modelleri uygulamaları ele alınacaktır. Ele
alınan şebeke modelleri aşağıdaki Şekil yardımıyla gösterilmiştir.

Şebeke Modelleri Uygulamaları

Gezgin Satıcı
Modeli

En Kısa Yol
Modeli

En Kısa
Yol Ağacı
Modeli

Maksimum
Akış Modeli

Uygulama
Alanları

Uygulama
Alanları

Uygulama
Alanları

Uygulama
Alanları

Model
Kurulumu ve
Çözümü

Model
Kurulumu
ve Çözümü

Model
Kurulumu ve
Çözümü

Model
Kurulumu ve
Çözümü

Yukarıdaki şekilde bölüm anlatımı şebeke modellerinin
anlatım planı gösterilmiştir. Buna göre bölüm gezgin
satıcı modeli, en kısa yol modeli, en kısa yol ağacı modeli
ve maksimum akış modellerinin iş analitiği ve veri
çerçevesinde uygulama alanları ile modellerin şebeke
gösterimi ve çözümü alt başlıklarıyla incelenecektir.
Böylece konu anlatımı şebeke modelleri ve şebeke
modellerinin unsurları ile başlanabilir.

3


[pdf 3]

Şebeke M odelleri
Uygulam aları
Önceki bölümlerde iş analitiği kapsamında verinin betimlenmesi ve tahminlenmesi uygulamaları anlatılmıştır. Bu bölümde iş analitiğinin karar analizi
araçlarını kullanarak işletmedeki problemlerle ilişkin çözüm araştırması ve
sunması anlatılacaktır.
Karar analizi araçlarından şebeke modelleri, işletmelerde yer alan şebeke
problemlerinin çözümünü sağlar. Aşağıda şebeke modellerinin bazı sektörlerde kullanım alanları sunulmuştur:
•
•
•
•
•

Lojistik sektöründe, kargo dağıtımı, ulaşım hatları, nakliye, okul/iş
servis güzergahı gibi alanlarda,
Enerji sektöründe, elektrik şebekesi, doğalgaz dağıtımı gibi alanlarda,
Telekomünikasyon ve bilişim sektöründe, internet band genişliği, telefon hatları, internet altyapı ağları gibi alanlarda,
Sağlık sektöründe, ambulans güzergahı, ilaç dağıtımı gibi alanlarda
İnşaat, yazılım geliştirme, organizasyon gibi projelerin uygulanmasında kullanılır.

Yukarıda kullanılan şebeke modelleri türleri aşağıda gösterilmiştir:
•

•
•

•

•

Gezgin Satıcı Modeli: Bir satıcının belirlenen ziyaret yerlerini yalnızca bir kere ziyaret edip tekrar başlangıç noktasına en kısa mesafede/sürede geri dönmesi problemini çözen şebeke modelidir. Servis
güzergahı, otobüs hatları gibi kullanım alanları vardır.
En Kısa Yol Modeli: Bir yerden varılmak istenen başka bir yere en
kısa mesafede gitme problemini çözen şebeke modelidir. Nakliye,
ambulans güzergahı gibi kullanım alanları vardır.
En Kısa Yol Ağacı Modeli: Şebeke içerisindeki tüm yerlere birbirleri ile bağlantılı olacak şekilde en kısa mesafede gitme problemini
çözen şebeke modelidir. İnternet altyapı ağları, telefon hatları gibi
kullanım alanları vardır.
Maksimum Akış Modeli: Şebeke içerisinde bazen bağlantılar arasında kapasitesi olabilmektedir. Böyle şebekeler içerisinde bir yerden varılmak istenen yere maksimum akış kapasitesi ile gitme problemini çözen şebeke modelidir. Eğer akış minimum yapılmak
istenirse model adı minimum akış modeli olmaktadır.
Proje Yönetimi, projelerin zaman ve bütçe yönüyle yönetilmesini
sağlar. Bir sonraki bölümde anlatılacaktır.

4


[pdf 4]

Gezgin satıcı modeli, en kısa yol modeli, en kısa yol ağacı modeli ve maksimum akış modellerinin sırayla anlatımına geçmeden önce şebeke modeli
unsurlarını tanımlanmasıyla konu anlatımına devam edilebilir.

Şebeke Modeli Unsurları
Şebeke modelleri, düğümler ve düğümler arası ilişkiyi gösteren oklarla bir
olayın akışını gösteren diyagramlardır. Buna göre şebeke modellerini oluşturan unsurlar aşağıda tanımlanmıştır:
•
•
•

Düğümler: Olay içerisindeki faaliyetleri temsil eder. Örneğin A
ilinden B iline gidiş olayında, A ve B şehri düğümlerdir.
Oklar: Birbiriyle ilişkili olan düğümleri bağlayan unsurdur. Örneğin A ilinden B iline gidişi olayında, A ve B ilini birbirleriyle bağlantıları ok ile gösterilir.
Akış Miktarı: Oklar üzerinde gösterilen miktarlardır. Örneğin A ili
ile B ili arasındaki mesafe 40 km ise, ok üzerine 40 yazılır.

A ili il B ili arasındaki gidiş olayının şebeke modeli ile gösterimi aşağıdaki
Şekil 4.1’de gösterilmiştir.
A

40

B

A

(a)

A

40
40

40

B

(b)

B

1

(c)

40

2

(d)

Şekil 4.1. Şebeke Modeli Unsurları Gösterimi
Yukarıdaki Şekil 4.1’de A ili ile B ili arasındaki 40 km mesafenin olabilecek şebeke modelleri gösterilmiştir. Buna göre:
•
•
•

(a)’da A ilinden B iline sadece tek yönlü akış olduğunu gösterilmiştir. İki ili arasındaki mesafe ise 40 km’dir.
(b) ’de ise B ilinden A iline sadece tek yönlü akış olduğunu gösterilmiştir. İki il arasındaki mesafe ise 40 km’dir.
(c)’de ve (d)’de ise iki taraflı ok veya bir doğru ile iki düğüm bağlandığından, ulaşım A ilinden B iline veya B ilinden A iline olabilir.
İki il arasındaki mesafe ise 40 km’dir.

Aşağıdaki Şekil 4.2’de birçok düğüm ve oktan oluşan farklı şebeke modelleri gösterilmiştir.

5


[pdf 5]

3

1

2

4

3

(a)
1

2

1

(b)
3

5
6

2

4
(c)

Şekil 4.2. Farklı Şebeke Modelleri Gösterimleri.
Yukarıdaki Şekil 4.2’de şebeke yapılarının oluşabilecek farklı gösterimleri
sunulmuştur. Buna göre (a)’da 3 düğüm, (b)’de 4 düğüm ve (c)’de 6 düğüm
birçok okla birbirlerine bağlanmıştır. Örneğin bu şebeke modelleri bir şehrin
fiber altyapısı, elektrik hattı, otoyolları gibi farklı şebeke gösterimleri olabilir.
Şebeke yapısı kavramları şu şekilde açıklanabilir:
•

•

•

Komşu Düğümler: Düğümün, ok ile bağlantılı olduğu düğüme
komşu düğüm denir. Örneğin Şekil 4.2 (b)’de 1 nolu düğümün komşuları 2, 3 ve 4 nolu düğümlerdir. (c)’de ise 3 nolu düğümün komşu
düğümleri 1, 2, 4 ve 5 nolu düğümlerdir.
Döngü: Bir düğümün oklar ile başka düğümlere bağlanıp tekrar
kendisine bağlanmasına denir. Örneğin Şekil 4.2 (a)’da 1’den 2’ye,
2’den 3’e ve 3’ten tekrar 1 nolu düğüme gelindiğinden döngüdür.
(b)’de 1, 3 ve 4 nolu düğümler ile 1, 2 ve 4 nolu düğümler döngü
oluştururken 2,3 ve 4 nolu düğümler ise döngü oluşturmaz, (c)’de ise
1, 2, 3 ve 4 nolu düğmeler, 3, 4, 5, 6 nolu düğmeler de döngü oluşturur.
Ağaç: Düğümler birbirine ok ile bağlanmasına ancak bu şebeke yapısının döngü oluşturmamasına ağaç denir.

Gezgin Satıcı M odeli
Gezgin satıcı modeli, bir satıcının merkez noktadan belirlenen ziyaret noktalarının sadece bir kez ziyaret edip tekrar merkez noktasına en kısa mesafede
gelmesi problemini ele alan şebeke modelidir. Bu model zaman içerisinde
lojistik, sanayi, perakende gibi birçok sektörde uygulanmıştır.
6


[pdf 6]

Gezgin satıcı modelinin birçok farklı alanda genel olarak kullanım alanları
aşağıda gösterilmiştir:
•

•

•

•

•

Ulaştırma Sektörü/Servis Güzergahlarının Belirlenmesi: Okul
servisi, otobüs güzergahı gibi belirli bir merkezden başlayıp daha
önce belirlenmiş yerlerden insanları toplayıp veya indirip tekrar aynı
merkeze gelmesi problemi bir gezgin satıcı problemidir. Örneğin, bir
otobüsün otobüs merkezinden çıkıp belirli durak yerlerinden yolcu
indirip veya bindirip tekrardan otobüs merkezine dönmesidir.
Sağlık Sektörü/Servis Güzergahlarının Belirlenmesi: Evde sağlık
hizmeti alan hastalar için sağlık personelinin hastaneden en kısa sürede hastaları ziyaret edilip tekrar hastaneye en kısa mesafede gelmesi gezgin satıcı modeli ile yapılabilir.
Turizm Sektörü/Servis Güzergahlarının Belirlenmesi: Tur şirketlerinin, belirli bir merkezden başlayıp ziyaret edilecek yerleri uğrayıp tekrar merkeze en kısa mesafede dönmesi gezgin satıcı modeli
ile yapılabilir.
Sanayi Sektörü/İş-Makine Problemi: Örneğin CNC makinelerinde
yapılan işlerde başlangıç noktasında makine başlar ve sonra bütün işlemleri yapıp başladığı noktaya geri döner. Metal tabla üzerinde 7
delik açacak ise başlangıç noktasında başlar yedi deliği açar ve başlangıç noktasına geri döner. Bu işlemi en kısa sürede gezgin satıcı
modeliyle yapılabilir.
Lojistik, Taşımacılık Sektörü/Dağıtım Problemi: Belirli bir merkezden başlayıp ürünleri istenilen yerlere dağıtıp tekrar merkeze en
kısa mesafede gelme gezgin satıcı modeli ile yapılabilir. Sipariş dağıtan kurye veya ürünleri limanlara dağıtan kaptan dağıtım problemine örnek teşkil eder.

Yukarıda belirtilen sektörler ve uygulama alanları gezgin satıcı probleminin
yaygın alanlarıdır. Gezgin Satıcı modelinde aşağıda belirtilen unsurlara göre
çözüm modelleri geliştirilir:
•
•
•
•

Ziyaret edilecek yerler
Ziyaret edilecek yerler arası mesafe
Başlangıç yerinin belirli olup olmaması
Gezgin satıcı sayısı

Gezgin satıcı modellinin, yukarıdaki modellere uygun birçok çözüm algoritması bulunmaktadır. Konun daha iyi anlaşılabilmesi açısında basit bir
dağıtım problemi örnek olayı ele alınabilir

7


[pdf 7]

Gezgin Satıcı Problem i Örnek Olay – Dağıtım
Problem i
A işletmesi sipariş dağıtma üzerine kurulmuş bir işletmedir. İşletmenin belirli yerde kurye merkezleri bulunmakta ve bu merkeze gelen birçok siparişi
müşterilere ulaşmaktadır. Bir B kuryesi gelen üç siparişi dağıtıp kurye merkezine geri dönecektir. Kurye merkez ve siparişlerin birbirleri arasındaki
mesafe (km) aşağıdaki Tablo 4.1’de gösterilmiştir.
Tablo 4.1. Kurye Merkezi ve Sipariş Konumlarının Birbirleri Arasındaki Mesafeleri (km)
-den/-e

Sipariş 1

Sipariş 2

Sipariş 3

Kurye Merkezi

Kurye Merkezi

0,5

0,9

0,7

-

Sipariş 1

-

1

0,9

0,6

Sipariş 2

1,1

-

1,5

1

Sipariş 3

0,8

1,3

-

0,5

Yukarıdaki Tablo 4.1’3e göre:
Kurye merkezinden Sipariş 1’e varış arasındaki mesafe 0,5 km iken
sipariş 1 ‘den kurye merkezine varış mesafe 0,6 km’dir. Gidiş dönüş
yollarında dolayı aradaki mesafeler farklı olabilmektedir.
Benzer şekilde Kurye merkezinden Sipariş 2’e varış arasındaki mesafe 0,9 km iken sipariş 2 ‘den kurye merkezine varış mesafe 1
km’dir. Benzer şekilde diğer mesafelerde Tablo 4.1’den okunabilir.

•

•

B kuryesinin sipariş dağıtım probleminin şebeke yapısındaki gösterimi aşağıdaki Şekil 4.3’de gösterilmiştir.
1,3
S2

0,9
1

0,7
0,5

KM
1,1

1

S3

1,5

0,5

0,8
0,6

0,9

S1

Şekil 4.3. B kuryesi Sipariş Dağıtım Problemi Şebeke Yapısı.
8


[pdf 8]

Yukarıdaki Şekil 4.3’de kurye merkezinden ve sipariş adresleri arasındaki
mesafelerin şebeke yapısında gösterimi sunulmuştur. Buna göre sipariş 1,
S1 düğümle; sipariş 2, S2 düğümle; sipariş 3, S3 düğümle; kurye merkezi
ise KM harfiyle gösterilmiştir.
Gezgin satıcı modeli çözümü birçok çözüm yaklaşımları vardır. Bu örnekte
olası tüm sonuçları değerlendirme ve içlerinden en kısa mesafedeki sonucun
bulunması yaklaşımı yapılabilir, bir çözüm yaklaşımıdır. O halde olası tüm
çözümler gezgin satıcı modeli döngü oluşturduğunda düğüm sayısının 1
eksiğinin faktöriyeli kadardır. Bu durumda olası çözüm sayısı:
•

(m-1)! m harfi ile düğüm sayısı gösterilmektedir. Düğüm sayısı 4
olduğundan (4-1)! = 3×2×1 = 6’dır.

O halde B kuryesinin sipariş dağıtım probleminde olası tüm döngü sayısı
6’dır. Aşağıdaki Tablo 4.2’de olası tüm döngüler ve bu döngülere ait toplam
mesafeler gösterilmiştir.
Tablo 4.2. Olası Tüm Döngüler.
Olası Döngüler

Toplam Mesafe (km)

KM – S1 – S2 – S3 – KM

0,50 + 1,00 + 1,50 + 0,50 = 3,50

KM – S1 – S3 – S2 – KM

0,50 + 0,90 + 1,30 + 1,00 = 3,70

KM – S2 – S1 – S3 – KM

0,90 + 1,10 + 0,90 + 0,50 = 3,40

KM – S2 – S3 – S1 – KM

0,90 + 1,50 + 0,80 + 0,60 = 3,80

KM – S3 – S1 – S2 – KM

0,70 + 0,80 + 1,00 + 1,00 = 3,50

KM – S3 – S2 – S1 – KM

0,70 + 1,30 + 1,10 + 0,60 = 3,70

Yukarıdaki Tablo 4.2’de olası döngüler ve döngülerin oluşturduğu toplam
mesafeleri gösterilmiştir. Buna göre olası tüm sonuçlar değerlendirildiğinde,
en kısa mesafe 3,40 km olası döngüsüdür. O halde B kuryesinin sipariş dağıtım probleminin sonucu aşağıda gösterilmiştir:
•

B kuryesinin en kısa mesafesi; Kurye Merkezinden sipariş 2’ye 0,90
km, sipariş 2’den sipariş 1’e 1,10 km, sipariş 1’den sipariş 3’e 0,90
km ve sipariş 3’den kurye merkezine 0,50 km yol katederek dönmesidir (KM – S2 – S1 – S3 – KM). Böylelikle toplam mesafe 3,40 km
olacaktır.

Yukarıda B kuryesi için en kısa mesafede dağıtım problemi çözümünün
şebeke modeli ile gösterimi aşağıdaki Şekil 4.4’de gösterilmiştir.

9


[pdf 9]

S2

S3
0,9
KM

0,5

0,9

1,1

S1

Şekil 4.4. B kuryesi Sipariş Dağıtım Modeli Şebeke Sonucu.

10


[pdf 10]

Yukarıdaki Şekil 4.4’de B kuryesi sipariş probleminin şebeke sonucuna göre, B kuryesi, kurye merkezinden S2’ye, S2’den S1’e, S1’den S3’e ve son
olarak S3’den kurye merkezine gelerek siparişlerini dağıtabilir.
A işletmesi kurye dağıtımı için gezgin satıcı modeli temeliyle teknoloji gelişimi gerçekleştirebilir. Böylelikle verilen siparişler daha hızlı ve verimli bir
şekilde dağıtımı yapılabilir.

En K ısa Yol M odeli
En kısa yol modeli, şebeke yapısı içerisinde seçilen iki düğüm arasındaki
arasında en kısa mesafeyi, en az maliyet ya da en az zamanı bulmak içi geliştirilen şebeke modelidir. En kısa yol modeli ile Gezgin satıcı modeli arasındaki fark gezgin satıcı modelinde başlangıç düğümüne geri dönülürken
en kısa yol modelinde sadece varılmak istenen düğüme gidilmektedir.
En kısa yol modeli gezgin satıcı modeline benzer alanlarda kullanım göstermiştir. Genel olarak kullanım alanları gösterilmiştir:
•

•

•
•
•

Ulaştırma ve Lojistik Sektörü/Kargolama: Siparişlerin depodan
müşteriye en kısa mesafede veya en kısa sürede ulaştırılmasıdır. Örneğin kargo dağıtıcıları siparişleri depodan alır, dağıtır ve tekrar depoya dönmezler. Bu durumda en kısa yol modeli kullanılır.
Kamu Sektörü/Trafik Yönetimi: Şehir içi trafik akışına göre, ambulans, itfaiye gibi araçların en kısa sürede hedefe ulaşmasında en
kısa yol modeli kullanılır. Benzer şekilde hava trafik kontrol sistemleri de en kısa yol modeli temellinde çalışır.
Telekomünikasyon Sektörü/Ağa Bağlanma: Ağ içerisinde Veri
merkezi ile internet servisi sağlayıcıları arasındaki bağlantıyı en kısa
sürede yapabilmek için en kısa yol modeli kullanılır.
Denizcilik Sektörü/Rota Belirleme: Deniz yollarında en kısa mesafede varış yerine girmesinde en kısa yol modelli kullanılır.
Enerji Sektörü/Elektrik Dağıtımı: Elektrik şebekelerinin en az kayıp ile elektriği dağıtması en kısa yol modeli temellinde gerçekleşir.

En kısa yol modelinin, birçok uygulama alanı yukarıda özetlenmiştir. Konun
daha iyi anlaşılabilmesi için enerji sektörü uygulamasıyla en kısa yol modeli
konu anlatımına devam edilebilir.

En K ısa Yol M odeli Örnek Olay – Elektrik Dağıtım
Problem i
X elektrik dağıtım şirketi, elektrik santrallerinden şehirlere elektrik dağıtmaktadır. X şirketinin amacı en az elektrik kaybıyla şehirlere elektriği ulaştırmaktır. Örneğin X elektrik dağıtım şirketi A elektrik santralinden, B, C,
D, E, F, G, H, I şehirlerindeki elektrik dağıtım noktalarına dağıtım gerçekleştirmektedir. Aşağıdaki Tablo 4.3’de elektrik santrali ve şehirlerdeki dağı11


[pdf 11]

tım noktalarını arasındaki bağlantılar ve kayıp miktarları gigavat (GWH)
gösterilmiştir.
Tablo 4.3. Elektrik Santrali ile Şehirlerdeki Dağıtım Noktaları Bağlantılarındaki Kayıp Miktarları.
Bağlantılar

Elektrik Santralinden veya Dağıtım Noktasından

Dağıtım Noktasına

Kayıp Miktarı
(GWH)

Bağlantı-1

A

B

3

Bağlantı-2

A

C

4

Bağlantı-3

B

D

2

Bağlantı-4

B

E

7

Bağlantı-5

C

D

5

Bağlantı-6

C

H

7

Bağlantı-7

D

E

6

Bağlantı-8

D

F

4

Bağlantı-9

D

G

3

Bağlantı-10

D

H

8

Bağlantı-11

E

I

11

Bağlantı-12

F

I

10

Bağlantı-13

G

I

14

Bağlantı-14

H

I

9

Yukarıdaki Tablo 4.3’te göre 14 adet bağlantı bir elektrik santrali ve sekiz
adet şehrin elektrik dağıtım noktalarını bağlamaktadır. Örneğin Bağlantı-1
ile A elektrik santrali B şehrinin elektrik dağıtım noktasına bağlanmakta ve
elektrik kaybı 3 GWH olmaktadır. Diğer bağlantılarda tablo üzerinden benzer şekilde okunabilir.
Eletirik Dağıtım Probleminin Çözümü
Öncelikle elektrik dağıtım probleminin şebeke modeli ile gösterimi yapılır.
Aşağıdaki Şekil 4.5’de X elektrik dağıtım şirketinin elektrik santrali ile şehirlerdeki elektrik dağıtım noktalarının birbirleri arasındaki bağlantılarının
şebeke modeli gösterilmiştir.

12


[pdf 12]

7

B
3

E
11

6

2

F

10

4
D

A
5

4

3

G

8

9

C
7

I

14

H

Şekil 4.5. X Elektrik Dağıtım Şirketinin Dağıtım Problemi Şebeke Yapısı.
Yukarıdaki Şekil 4.5’de X elektrik dağıtım şirketinin elektrik santrali ile
şehirlerdeki dağıtım noktaları arasındaki bağlantılar gösterilmiştir. Şirketin
amacı A elektrik santralinden en az kayı ile I şehrine elektriği ulaştırmaktır.
Aşağıda belirtilen işlem adımları uygulanarak (en kısa yol modeli çözüm
metodu) X şirketinin amacı gerçekleştirilebilir:
1. Başlangıç noktası olan elektrik santrali ile bağlı dağıtım noktaları
arasından en az elektrik kaybı olan dağıtım noktası seçilir.
2. Kalıcı küme, bağlantı noktaları arasında en az elektrik kaybının bulunmasıyla oluşan kümedir. Birinci adımda bulunan dağıtım merkezi
ile elektrik santrali kalıcı kümeyi oluşturur.
3. Kalıcı küme ile bağlantılı olan tüm dağıtım merkezleri değerlendirilir.
4. Üçüncü adımda bulunan dağıtım merkezi ile belirlenen kalıcı küme
oklarla gösterilir.
5. Kalıcı küme I şehrindeki dağıtım noktasına gelene kadar üçüncü ve
dördüncü adım tekrarlanır.
X elektrik dağıtım şirketinin dağıtım problemi en kısa yol modeli temellinde
yukarıdaki işlem adımları uygulanarak çözülebilir.
Birinci İşlem Adımı: Elektrik santrali olan A başlangıç düğümü B ve C
elektrik dağıtım noktalarındaki en az elektrik kaybı olan B dağıtım noktası
seçilir. Aşağıdaki Şekil 4.6’da şebeke yapısında gösterimi sunulmuştur.

13


[pdf 13]

3
B
3
A

Kalıcı Küme
{A}

4
C

Ok

Kayıp

A-B

3

A-C

4

Şekil 4.6. Birinci İşlem Adımı Şebeke Gösterimi.
Yukarıdaki Şekil 4.6’da A-B ve A-C bağlantıları arasında A-B bağlantısı en
az elektrik kaybına sahip olduğundan B dağıtım noktası seçilir. Seçilen en
az kaybın olduğu B dağıtım noktasına kare içerisinde kayıp bilgisi 3 GWH
yazılır.
İkinci İşlem Adımı: Birinci adımda seçilen B dağıtım noktası kalıcı kümeye eklenir. Böylece kalıcı küme {A,B} olur.
Üçüncü İşlem Adımı: Kalıcı küme içerisinde yer alan dağıtım noktalarına
bağlantılı düğümler bulunur. A elektrik santrali ile C dağıtım noktası bağlantılı, B dağıtım noktası ile D ve E dağıtım noktaları bağlantılıdır. Böylelikle kalıcı küme içerisindeki dağıtım noktaları ile bağlantılı dağıtım noktaları tespit edilmiştir.
Dördüncü İşlem Adımı: Aşağıdaki Şekil 4.7’de üçüncü işlem adımında
belirtilen kalıcı küme ve bağlantılı dağıtım noktaları gösterilmiştir.
3

7

B
3

E

2
D

A

5

4
C

Kalıcı Küme

Ok

Kayıp

{A,D}

A-C

4

B-D

5

B-E

10

Şekil 4.7. Dördüncü İşlem Adımı Şebeke Modeli Gösterimi.
14


[pdf 14]

Yukarıdaki Şekil 4.7’de A-C, B-D, B-E bağlantıları arasından en az elektrik
kaybı olan B-D bağlantısı seçilir. Seçilen en az elektrik kaybı D dağıtım
noktası kalıcı küme içerisine alınır ve D dağıtım noktası üzerine elektrik
kayıp miktarı 5 GWH yazılır. Böylece D dağıtım noktası kalıcı küme içerisine alınır ve kalıcı küme {A, B, D} olur.
Birinci Tekrar (Üçüncü İşlem) İşlem Adımı: Kalıcı küme içerisinde yer
alan dağıtım noktalarına bağlantılı düğümler bulunur. A elektrik santrali ile
C dağıtım noktası bağlantılı, B dağıtım noktası ile E dağıtım noktası, D dağıtım noktası C, E, F, G ve H dağıtım noktaları bağlantılıdır. Böylelikle kalıcı küme içerisindeki dağıtım noktaları ile bağlantılı dağıtım noktaları tespit
edilmiştir.
Birinci Tekrar (Dördüncü İşlem) İşlem Adımı: Aşağıdaki Şekil 4.8’de
birinci tekrar (üçüncü işlem) adımında belirtilen kalıcı küme ve bağlantılı
dağıtım noktaları gösterilmiştir.
3

7

B
3

E

6

2
5

F
4

D

A
4

5

3

G

8
C
4

H

Kalıcı Küme

Ok

Kayıp

{A,B,D}

A-C

4

B-E

10

D-C

10

D-H

13

D-G

8

D-F

9

D-E

11

Şekil 4.8. Birinci Tekrar (Dördüncü İşlem) Adımı Şebeke Gösterimi.
15


[pdf 15]

Yukarıdaki Şekil 4.8’de A-C, B-E, D-C, D-H, D-G, D-F ve D-E bağlantıları
arasından A-C bağlantısında en az elektrik kaybı olduğundan C dağıtım
noktası seçilir. Seçilen C dağıtım noktası üzerine kare içerisinde elektrik
kayıp miktarı 4 GWH yazılır. Böylece C dağıtım noktası kalıcı küme içerisine alınır ve kalıcı küme {A,B,C,D} olur.
İkinci Tekrar (Üçüncü İşlem) İşlem Adımı: Kalıcı küme içerisinde yer
alan dağıtım noktalarına bağlantılı düğümler bulunur. B elektrik santrali ile
E dağıtım noktası bağlantılı, C dağıtım noktası ile H dağıtım noktası, D dağıtım noktası E, F, G ve H dağıtım noktaları bağlantılıdır. Böylelikle kalıcı
küme içerisindeki dağıtım noktaları ile bağlantılı dağıtım noktaları tespit
edilmiştir.
İkinci Tekrar (Dördüncü İşlem) İşlem Adımı: Aşağıdaki Şekil 4.9’da
ikinci tekrar (üçüncü işlem) adımında belirtilen kalıcı küme ve bağlantılı
dağıtım noktaları gösterilmiştir.

3

7

B
3

E

6

2
5

F
4

D

A
4

3

G

8

8

C
4

7

H

16

Kalıcı Küme

Ok

Kayıp

{A,B,C,D}

B-E

10

C-H

11

D-E

11

D-F

9

D-G

8

D-H

13


[pdf 16]

Şekil 4.9. İkinci Tekrar (Dördüncü İşlem) Adımı Şebeke Gösterimi.
Yukarıdaki Şekil 4.9’da B-E, C-H, D-E, D-F, D-G ve D-H bağlantıları arasından D-G bağlantısı en az elektrik kaybı olduğundan G dağıtım noktası
seçilir. Seçilen G dağıtım noktası üzerine kare içerisinde elektrik kayıp miktarı 8 GWH yazılır. Böylece G dağıtım noktası kalıcı küme içerisine alınır
ve kalıcı küme {A,B,C,D,G} olur.
Üçüncü Tekrar (Üçüncü İşlem) İşlem Adımı: Kalıcı küme içerisinde yer
alan dağıtım noktalarına bağlantılı düğümler bulunur. B dağıtım noktası ile
E dağıtım noktası, C dağıtım noktası ile H dağıtım noktası, D dağıtım noktası ile E, F ve H dağıtım noktaları, G dağıtım noktası ile I dağıtım noktası
bağlantılıdır. Böylelikle kalıcı küme içerisindeki dağıtım noktaları ile bağlantılı dağıtım noktaları tespit edilmiştir.
Üçüncü Tekrar (Dördüncü İşlem) İşlem Adımı: Aşağıdaki Şekil 4.10’da
üçüncü tekrar (üçüncü işlem) adımında belirtilen kalıcı küme ve bağlantılı
dağıtım noktaları gösterilmiştir.
3

7

B
3

E

6

2
5

F
4

D

A

I

9
14

4

3

G

8

8

C
4

7

H

Kalıcı Küme

Ok

Kayıp

{A,B,C,D,G} B-E

10

C-H

11

D-E

11

D-F

9

D-H

13

G-I

22

Şekil 4.10. Üçüncü Tekrar (Dördüncü İşlem) Adımı Şebeke Gösterimi.
17


[pdf 17]

Yukarıdaki Şekil 4.10’da B-E, C-H, D-E, D-F, D-H ve G-I bağlantıları arasından D-F bağlantısında en az elektrik kaybı olduğundan, F dağıtım noktası
seçilir. Seçilen F dağıtım noktası üzerine kare içerisinde elektrik kayıp miktarı 9 GWH yazılır. Böylece F dağıtım noktası kalıcı küme içerisine alınır ve
kalıcı küme {A,B,C,D,F,G} olur.
Dördüncü Tekrar (Üçüncü İşlem) İşlem Adımı: Kalıcı küme içerisinde
yer alan dağıtım noktalarına bağlantılı düğümler bulunur. B dağıtım noktası
ile E dağıtım noktası, C dağıtım noktası ile H dağıtım noktası, D dağıtım
noktası ile E ve H dağıtım noktaları, G dağıtım noktası ile I dağıtım noktası
ve F dağıtım noktası ile I dağıtım noktası bağlantılıdır. Böylelikle kalıcı
küme içerisindeki dağıtım noktaları ile bağlantılı dağıtım noktaları tespit
edilmiştir.
Dördüncü Tekrar (Dördüncü İşlem) İşlem Adımı: Aşağıdaki Şekil
4.11’de dördüncü tekrar (üçüncü işlem) adımında belirtilen kalıcı küme ve
bağlantılı dağıtım noktaları gösterilmiştir.
10

3

7

B
3

E

6

2
5

F
4

I

9

D

A

10

14
4

3

G

8

8

C
4

7

H

Kalıcı Küme Ok
{A,B,C,D,G} B-E

Kayıp
10

C-H

11

D-E

11

D-H

13

F-I

19

G-I

22

Şekil 4.11. Dördüncü Tekrar (Dördüncü İşlem) Adımı Şebeke Gösterimi.
18


[pdf 18]

Yukarıdaki Şekil 4.11’de B-E, C-H, D-E, D-H, F-I ve G-I bağlantıları arasından B-E bağlantısında en az elektrik kaybı olduğundan, E dağıtım noktası
seçilir. Seçilen E dağıtım noktası üzerine kare içerisinde elektrik kayıp miktarı 10 GWH yazılır. Böylece E dağıtım noktası kalıcı küme içerisine alınır
ve kalıcı küme {A,B,C,D,E,F,G} olur.
Beşinci Tekrar (Üçüncü İşlem) İşlem Adımı: Kalıcı küme içerisinde yer
alan dağıtım noktalarına bağlantılı düğümler bulunur. C dağıtım noktası ile
H dağıtım noktası, D dağıtım noktası ile H dağıtım noktası, E dağıtım noktası ile I dağıtım noktası, G dağıtım noktası ile I dağıtım noktası ve F dağıtım noktası ile I dağıtım noktası bağlantılıdır. Böylelikle kalıcı küme içerisindeki dağıtım noktaları ile bağlantılı dağıtım noktaları tespit edilmiştir.
Beşinci Tekrar (Dördüncü İşlem) İşlem Adımı: Aşağıdaki Şekil 4.12’de
beşinci tekrar (üçüncü işlem) adımında belirtilen kalıcı küme ve bağlantılı
dağıtım noktaları gösterilmiştir.
10

3

7

B
3

E
11

2

F

5

4

D

A

I

10

9

14
4

3

G

8

8

C
4

7

H
11

Kalıcı Küme

Ok

Kayıp

{A,B,C,D,G} C-H

11

D-H

13

E-I

21

F-I

19

G-I

22

Şekil 4.12. Beşinci Tekrar (Dördüncü İşlem) Adımı Şebeke Gösterimi.
Yukarıdaki Şekil 4.12’de C-H, D-H, E-I, F-I ve G-I bağlantıları arasından
C-H bağlantısında en az elektrik kaybı olduğundan, H dağıtım noktası seçi19


[pdf 19]

lir. Seçilen H dağıtım noktası üzerine kare içerisinde elektrik kayıp miktarı
11 GWH yazılır. Böylece H dağıtım noktası kalıcı küme içerisine alınır ve
kalıcı küme {A,B,C,D,E,F,G,H} olur.
Altıncı Tekrar (Üçüncü İşlem) İşlem Adımı: Kalıcı küme içerisinde yer
alan dağıtım noktalarına bağlantılı düğümler bulunur. E dağıtım noktası ile I
dağıtım noktası, F dağıtım noktası ile I dağıtım noktası, G dağıtım noktası
ile I dağıtım noktası ve H dağıtım noktası ile I dağıtım noktası bağlantılıdır.
Böylelikle kalıcı küme içerisindeki dağıtım noktaları ile bağlantılı dağıtım
noktaları tespit edilmiştir.
Altıncı Tekrar (Dördüncü İşlem) İşlem Adımı: Aşağıdaki Şekil 4.13’de
altıncı tekrar (üçüncü işlem) adımında belirtilen kalıcı küme ve bağlantılı
dağıtım noktaları gösterilmiştir.
10

3

7

B
3

E
11

2

F

5

4

19

9

D

A

10

I

14
4

3

G
8

C
4

7

9

H
11

Kalıcı Küme

Ok

Kayıp

{A,B,C,D,G}

E-I

21

F-I

19

G-I

22

H-I

20

Şekil 4.13. Altıncı Tekrar (Dördüncü İşlem) Adımı Şebeke Gösterimi.
Yukarıdaki Şekil 4.13’de E-I, F-I, G-I ve H-I bağlantıları arasından F-I bağlantısında en az elektrik kaybı olduğundan, I dağıtım noktası seçilir. Seçilen
I dağıtım noktası üzerine kare içerisinde elektrik kayıp miktarı 19 GWH
20


[pdf 20]

yazılır. Böylece I dağıtım noktası kalıcı küme içerisine alınır ve kalıcı küme
{A,B,C,D,E,F,G,H,I} olur.
Beşinci İşlem Adımı: Kalıcı kümeye tüm dağıtım noktaları eklendiğinden
en az elektrik kaybı bağlantıları belirlenmiş ve çözüm bulunmuştur. Aşağıdaki Şekil 4.14’de elektrik santrali ve diğer şehirlerin elektrik dağıtım noktalarına en az elektrik kaybı ile ulaşımı gösterilmiştir.
10

3

7

B
3

E

2

F

5

4

4

3

I
G
8

C
4

19

9

D

A

10

7

H
11

Şekil 4.14. Şebeke ile En Az Elektrik Kaybı Yaşanan Bağlantıların Gösterimi.
En az elektrik kaybı yaşanan bağlantıların gösterimi ise aşağıdaki Tablo
4.4’de gösterilmiştir.
Tablo 4.4. En Az Elektrik Yaşanan Bağlantılar.
Elektrik Santralinden
(Düğüm-A)

Bağlantılar

Elektrik Kaybı
(GWH)

B Şehri Dağıtım Noktasına

A-B

3

C Şehri Dağıtım Noktasına

A-C

4

D Şehri Dağıtım Noktasına

A-B-D

5

E Şehri Dağıtım Noktasına

A-B-E

10

F Şehri Dağıtım Noktasına

A-B-D-F

9

G Şehri Dağıtım Noktasına

A-B-D-G

8

21


[pdf 21]

H Şehri Dağıtım Noktasına

A-C-H

11

I Şehri Dağıtım Noktasına

A-B-D-F-I

19

Yukarıdaki Tablo 4.4’de X elektrik dağıtım şirketinin elektrik santrali ile
şehirlerdeki dağıtım noktaları arasında en az elektrik kaybı ile ulaşımı göstermektedir.
X elektrik dağıtım şirketi elektrik santralinden istenilen şehrin dağıtım noktasına en az elektrik kaybıyla ulaşımı için teknolojisini en kısa yol modeli
temellinde geliştirebilir. Böylece elektrik santralinden istenilen bir şehrin
elektrik dağıtım noktasına en az elektrik kaybıyla elektrik ulaştırabilir ve
verimliliğini artırabilir.

En K ısa Yol Ağacı M odeli
En kısa yol modelinde başlangıç düğümü ile ulaşılmak istenen düğüm
arasında en kısa yol veya en az kayıp ile varılmak amacı vardı. En kısa yol
ağacı modelinde ise, başlangıç düğümünden başlayarak birbiriyle bağlantılı
olacak şekilde tüm düğümleri en kısa yol veya en az kayıp ile birbirlerine
bağlamaktır. Başka bir ifade ile en kısa yol modelinde varılmak istenen bir
düğüm var iken, en kısa yol ağacı modelinde varılmak istenen birçok düğüm
vardır. En kısa yol ağacı modeli, en kısa yol modelinin kullanıldığı tüm sektörlerde aynı konularda eğer birden fazla varılmak istenen düğüm olursa
kullanılabilir.

En K ısa Yol Ağacı M odeli Örnek Olay – Elektrik
Dağıtım Problem i
En kısa yol modelinde belirtilen X elektrik dağıtım şirketinin en az elektrik
kaybı ile I şehri elektrik dağıtım noktasına ulaştırma amacı varken yaşanılan
bir arızandan dolayı diğer şehirlerin elektrik dağıtım noktalarına elektrik
veren bir başka elektrik santrali devre dışı kalmıştır. Bu nedenle X elektrik
dağıtım şirketi A elektrik santralinden diğer tüm şehirlerdeki dağıtım noktalarına (B, C, D, E, F, G, H, I) elektriği en az kayıp ile ulaştırmak istemektedir. Elektrik santrali ve diğer şehirlerin elektrik dağıtım noktalarının birbirleriyle bağlantılı olduğu bağlantılar ve elektrik kayıplar önceki kısımda yer
alan Tablo 4.3’de gösterilmiştir.
Eletirik Dağıtım Probleminin Çözümü
X elektrik dağıtım şirketinin elektrik dağıtım probleminin şebeke modeli bir
önceki kısımda yer alan Şekil 4.5’de gösterilmiştir. Böylece X elektrik dağıtım şirketinin tüm şehirlerdeki elektrik dağıtım noktalarına birbirine bağlı
olacak şekilde en az elektrik kaybıyla (en kısa yol ağacı modeli temellinde)
bulma işlem adımları aşağıda gösterilmiştir:
22


[pdf 22]

1. X elektrik dağıtım şirketi A santralinde elektriği ürettiğinden, A
düğmesiyle başlanır.
2. A santraline bağlantılı dağıtım noktalarından en az elektrik kaybı
olan dağıtım noktası seçilir.
3. Geriye kalan dağıtım noktaları ile seçili düğümler arasında en az
elektrik kaybı olan dağıtım noktası seçilir.
4. Tüm dağıtım noktaları ile bağlantı kurulana kadar üçüncü adım tekrarlanır.
Yukarıdaki işlem adımları uygulanarak X elektrik dağıtım şirketinin dağıtım
problemi en kısa yol ağacı modeli temellinde çözülebilir.
Birinci İşlem Adımı: Elektrik santrali olan A düğmesi başlangıç düğmesi
olarak seçilir.
İkinci İşlem Adımı: A elektrik santrali ile B ve C şehirlerinin dağıtım noktaları arasından en az elektrik kaybı olan B şehri dağıtım noktası seçilir.
Aşağıdaki Şekil 4.15’de birinci ve ikinci işlem adımı gösterilmiştir.

B
3
A
4
C

Şekil 4.15. Birinci ve İkinci İşlem Adımı Şebeke Gösterimi.
Yukarıdaki Şekil 4.15’de A-B ve A-C okları arasından A-B bağlantısında en
az elektrik kaybı yaşandığından B düğmesi seçilir.
Üçüncü İşlem Adımı: İkinci adımda B şehri elektrik dağıtımı seçilmiştir.
Geriye kalan dağıtım noktaları ile A elektrik santrali ve B şehri dağıtım noktasına bağlantılı dağıtım noktaları arasından en az elektrik kaybı yaşanan
bağlan seçilir. Aşağıdaki Şekil 4.16’ da A ve B düğümlerinin bağlantılı düğümleri gösterilmiştir.

23


[pdf 23]

7

B
3

E

2
D

A
4
C

Şekil 4.16. Üçüncü İşlem Adımı Şebeke Gösterimi.
Yukarıdaki Şekil 4.16’da A-C, B-D ve B-E bağlantıları arasından B-D bağlantısında en az elektrik kaybı yaşandığından D düğümü seçilir.
Birinci Tekrar (Üçüncü İşlem) İşlem Adımı: Üçüncü işlem adımında D
elektrik dağıtım noktası seçilmiştir. Geriye kalan düğümler ile A, B ve D
düğümlerinin bağlantılı olduğu dağıtım noktaları arasından en az elektrik
kaybı yaşanan bağlantı seçilir. Aşağıdaki Şekil 4.17’ de A, B ve D düğümlerinin bağlantılı düğümleri gösterilmiştir.

7

B
3

E

6

2

F
4

D

A
5

4

3

G

8
C
H

Şekil 4.17. Birinci Tekrar (Üçüncü İşlem) Adımı Şebeke Gösterimi.
Yukarıdaki Şekil 4.17’de A-C, B-D, B-E, D-C, D-E, D-F, D-G ve D-H bağlantıları arasından D-G bağlantısında en az elektrik kaybı yaşandığından G
düğümü seçilir.
İkinci Tekrar (Üçüncü İşlem) İşlem Adımı: Birinci tekrar (üçüncü işlem)
adımında G elektrik dağıtım noktası seçilmiştir. Geriye kalan düğümler ile
24


[pdf 24]

A, B, D ve G düğümlerinin bağlantılı olduğu dağıtım noktaları arasından en
az elektrik kaybı yaşanan bağlantı seçilir. Aşağıdaki Şekil 4.18’ de A, B, D
ve G düğümlerinin bağlantılı düğümleri gösterilmiştir.
7

B
3

E

6

2

F

I

4
D

A

14

5

4

3

G

8
C
H

Şekil 4.18. İkinci Tekrar (Üçüncü İşlem) Adımı Şebeke Gösterimi.
Yukarıdaki Şekil 4.18’de A-C, B-E, D-C, D-E, D-F, D-H ve G-I bağlantıları
arasından A-C ve D-F bağlantılarında en az elektrik kaybı yaşandığından C
ve F düğümü seçilir.
Üçüncü Tekrar (Üçüncü İşlem) İşlem Adımı: İkinci tekrar (üçüncü işlem)
adımında C ve F elektrik dağıtım noktaları seçilmiştir. Geriye kalan düğümler ile A, B, C, D, F ve G düğümlerinin bağlantılı olduğu dağıtım noktaları
arasından en az elektrik kaybı yaşanan bağlantı seçilir. Aşağıdaki Şekil
4.19’ de A, B, C, D, F ve G düğümlerinin bağlantılı düğümleri gösterilmiştir.

25


[pdf 25]

7

B
3

E

6

2

F

10

4

I

D

A

14
4

3

G

8
C
7

H

Şekil 4.19. Üçüncü Tekrar (Üçüncü İşlem) Adımı Şebeke Gösterimi.
Yukarıdaki Şekil 4.19’da B-E, C-H, D-E, D-H, F-I ve G-I bağlantıları arasından D-E bağlantısında en az elektrik kaybı yaşandığından E düğümü seçilir.
Dördüncü Tekrar (Üçüncü İşlem) İşlem Adımı: Üçüncü tekrar (üçüncü
işlem) adımında E elektrik dağıtım noktası seçilmiştir. Geriye kalan düğümler ile A, B, C, D, E, F ve G düğümlerinin bağlantılı olduğu dağıtım noktaları arasından en az elektrik kaybı yaşanan bağlantı seçilir. Aşağıdaki Şekil
4.20’ de A, B, C, D, E, F ve G düğümlerinin bağlantılı düğümleri gösterilmiştir.
E

B
3

11

6

2

F

10

4

I

D

A

14
4

3

G

8
C
7

H

Şekil 4.20. Dördüncü Tekrar (Üçüncü İşlem) Adımı Şebeke Gösterimi.
26


[pdf 26]

Yukarıdaki Şekil 4.19’da C-H, D-H, E-I, F-I ve G-I bağlantıları arasından
C-H bağlantısında en az elektrik kaybı yaşandığından H düğümü seçilir.
Beşinci Tekrar (Üçüncü İşlem) İşlem Adımı: Dördüncü tekrar (üçüncü
işlem) adımında H elektrik dağıtım noktası seçilmiştir. Geriye kalan düğümler ile A, B, C, D, E, F, G ve H düğümlerinin bağlantılı olduğu dağıtım noktaları arasından en az elektrik kaybı yaşanan bağlantı seçilir. Aşağıdaki Şekil 4.20’ de A, B, C, D, E, F ve G düğümlerinin bağlantılı düğümleri
gösterilmiştir.
E

B
3

11

6

2

F

10

4

I

D

A

14
4

3

G
9

C
7

H

Şekil 4.20. Beşinci Tekrar (Üçüncü İşlem) Adımı Şebeke Gösterimi.
Yukarıdaki Şekil 4.20’de E-I, F-I, G-I ve H-I bağlantıları arasından H-I bağlantısında en az elektrik kaybı yaşandığından I düğümü seçilir.
Dördüncü İşlem Adımı: Tüm elektrik dağıtım notaları ile bağlantı kurulduğundan X elektrik dağıtım şirketi amacına bulunmuştur. Aşağıdaki Şekil
4.21’de X elektrik dağıtım şirketinin A elektrik santralinden başlayarak tüm
şehirlerin birbirleriyle bağlı olacak şekilde elektrik dağıtım noktalarına en az
elektrik kaybı ile ulaştırma şebeke gösterimi sunulmuştur.

27


[pdf 27]

E

B
3

6

2

F

I

4
D

A
4

3

G
9

C
7

H

Şekil 4.21. Dördüncü İşlem Adımı Şebeke Gösterimi.
Yukarıdaki Şekil 4.21’de X elektrik şirketinin elektrik dağıtım şebeke gösterimi sunulmuştur. Bu gösterimin tablosal gösterimi ise aşağıdaki Tablo
4.5’de gösterilmiştir.

Tablo 4.5. X Elektrik Dağıtım Şirketinin Elektrik Dağıtım Gösterimi.
Başlangıç Düğümü

Bitiş Düğümü

Elektrik Kaybı (GWH)

A

B

3

A

C

4

B

D

2

C

H

7

D

E

6

D

F

4

D

G

3

H

I

9

Toplam Elektrik Kaybı (GWH)

38

Yukarıdaki Tablo 4.5’e göre 8 tane bağlantıdan 8 şehrin elektrik dağıtım
noktası ile 1 elektrik santrali birbirine bağlanmaktadır. Böylece X elektrik
dağıtım şirketi 38 GWH elektrik kaybı ile tüm şehirlerin elektrik dağıtım
noktalarına elektrik iletebilmektedir.
28


[pdf 28]

X elektrik dağıtım şirketi geliştireceği yazılım aracılığıyla en az elektrik
kaybı ile şehirlerin elektrik dağıtım noktalarına elektriği ulaştırabilir. Böylece verimlilik ve karlılığını artırabilir.

M aksim um Akış Şebeke
M odeli
Önceki kısımlarda başlangıç düğümü ile varılmak istenen düğüm arasında
veya birden fazla varılmak istenen düğüm arasında en kısa yolun/en az kaybın bulunması amaçlanmıştır. Her iki şebeke modelinde de bağlantılar arasında bir akış ya da kapasite yoktur. Bazı şebeke modellerinde bağlantılar
arasındaki akışın maksimum yapma amacı vardır. Böyle bir şebeke modelinde, başlangıç düğümü ile varılmak istenen düğüm arasında akışın maksimum yapılması modeline maksimum akış şebeke modeli denir.
Maksimum akış şebeke modelleri genellikle aşağıda belirtilen alanlarda kullanılır:
•
•
•
•
•

Enerji Sektörü/Hammadde Akışı: Petrol, doğalgaz, su gibi boru
hatlarıyla oluşan şebekelerdeki akışların maksimum yapılması.
Enerji Sektörü/Elektrik İletimi: Elektrik şebekesinde bir noktadan
bir noktaya maksimum elektriğin iletilmesinde.
Kamu Sektörü/Trafik Yönetimi: Bir yol şebekesinde veya demiryolu ağında akışın maksimum yapılmasında
Kamu Sektörü/Atık Su Yönetimi: Atık suların tıkanmaya yol açmadan maksimum kapasite ile bir noktadan bir noktaya iletilmesi
Telekomünikasyon/Ağ Trafiği: Ağ üzerinden veri paketlerinin
maksimum kapasite ile bir noktandan bir noktaya aktarılması

Yukarıda genel kullanım alanları verilen maksimum akış şebeke modellerinde her bağlantının bir kapasitesi bulunmaktadır. Bu kapasiteler için eğer
varılmak istenen düğüme doğru akışta gösterilen okun kapasitesine akış
kapasitesi, tersi yöndekine ise ters akış kapasitesi olarak adlandırılır. Örneğin A düğümünden C düğümüne varılmak isteniyorsa, A’dan C’ye akışa
akış kapasitesi, C’den A’ya olan akışa ise ters akış kapasitesi denir.

M aksimum Akış Şebeke M odeli Örnek Olay – Elektrik
İletim Problemi
X elektrik dağıtım şirketi A elektrik santralinden I şehri elektrik dağıtım
noktasına maksimum elektriği ulaştırma istemektedir. Aşağıdaki Tablo
4.7’de bağlantıların elektrik kapasiteleri ve ters kapasiteleri gösterilmiştir.
Tablo 4.7. X Elektrik Dağıtım Şirketinin Elektrik Bağlantıları, Kapasite
ve Ters Kapasitesi
29


[pdf 29]

Bağlantılar

Elektrik Santralinden veya
Dağıtım Noktasından

Dağıtım Noktasına

Kapasite
(GWH)

Ters Kapasite
(GWH)

Bağlantı-1

A

B

2000

300

Bağlantı-2

A

C

3000

400

Bağlantı-3

B

D

400

200

Bağlantı-4

B

E

1400

700

Bağlantı-5

C

D

1000

500

Bağlantı-6

C

H

1400

700

Bağlantı-7

D

E

1200

600

Bağlantı-8

D

F

800

400

Bağlantı-9

D

G

600

300

Bağlantı-10

D

H

1600

800

Bağlantı-11

E

I

2200

1100

Bağlantı-12

F

I

2000

1000

Bağlantı-13

G

I

2800

1400

Bağlantı-14

H

I

1800

900

Yukarıdaki Tablo 6.7’de göre 14 tane bağlantı bulunmaktadır. Örneğin Bağlantı-1 ile A elektrik santrali B elektrik dağıtım noktasına bağlanmakta, bağlantının kapasitesi 2000 GWH, ters kapasitesi 300 GWH’dir. Diğer bağlantılar da Tablodan benzer şekilde okunabilir.
Eletirik İletim Probleminin Çözümü
Öncelikle elektrik iletim probleminin şebeke yapısı ile gösterimi yapılır.
Aşağıdaki Şekil 4.22’de X elektrik şirketinin elektrik santrali ve şehirlerin
dağıtım noktalarını birbirlerine bağlayan bağlantıların kapasite ve ters kapasiteleri ile birlikte şebeke yapısı gösterimi sunulmuştur.

30


[pdf 30]

700
300

B

1400

600

2200

E

400
400

2000

F

1200 800
200
D
600
500

2000
A
3000

1600

300

1000
400

C

G

2800

1000 1100
I
1400
900

800

1400

700

H 1800

Şekil 4.22. X Elektrik Dağıtım Şirketi Elektrik İletim Akışları.
Yukarıdaki Şekil 4.22’de X elektrik şirketinin elektrik iletim hatları ve kapasiteleri şebeke görünümü gösterilmiştir. Buna göre A elektrik santralinden
B şehri elektrik dağıtım noktasına 2000 GWH bir kapasite varken B şehri
elektrik dağıtım noktasından A elektrik santraline 300 GWH ters kapasite
vardır. Diğer bağlantılarda benzer olarak düğümlerin çevrelerinde gösterilmiştir. Böylece X elektrik şirketinin amacı olan A elektrik santralinden I
şehri elektrik dağıtım noktasına maksimum akışı (elektrik iletimi) bulma
işlem adımları aşağıda gösterilmiştir:
1. Başlangıç düğümünden (A elektrik santrali) varılacak düğüme (I
şehri elektrik dağıtım noktası) giden rassal bir yol seçilir.
2. Birinci adımda seçilen bağlantılardan maksimumu akışı sağlayan
kapasite bulunur ve seçili bağlantılar içerisinde bulunan her bir düğümden bu kapasite miktarı düşülür.
3. Seçili bağlantılar üzerinde bulunan ters kapasitelere ikinci adımda
bulunan kapasite miktarı eklenir.
4. Başlangıç düğümü (A elektrik santrali) ile varılacak düğüm (I şehri
elektrik dağıtım noktası) arasında elektrik akışı sağlayacak bir bağlantı bulunmayana kadar ilk üç işlem adımı tekrarlanır.
Yukarıdaki işlem adımları ile X elektrik dağıtım şirketinin maksimum akış
amacı sağlanabilir.
Birinci İşlem Adımı: A elektrik santralinden I şehri elektrik dağıtım noktasına elektrik akışını A-B-E-I bağlantısı sağlanabilir.
İkinci İşlem Adımı: A-B-E-I bağlantısında A-B bağlantısı elektrik kapasitesi 2000 GWH, B-E bağlantısı elektrik kapasitesi 1400 GWH, E-I bağlantısında elektrik kapasitesi 2200 GWH’dir. Bu bağlantılar arasında en düşük
31


[pdf 31]

kapasite 1400 GWH elektrik iletimi sağlanır. Bu miktar kapasitelerden düşülür:
A-B kapasitesi: 2000 – 1400 = 600 GWH
B-E kapasitesi: 1400 – 1400 = 0 GWH
E-I kapasitesi: 2200 – 1400 = 800 GWH
Üçüncü İşlem Adımı: Seçili bağlantıların ters kapasitelerine ikinci işlem
adımında bulunan akış miktarı eklenir:
A-B ters kapasitesi: 300 + 1400 = 1700 GWH
B-E ters kapasitesi: 700 + 1400 = 2100 GWH
E-I ters kapasitesi: 1100 + 1400 = 2500 GWH
İkinci ve üçüncü işlem adımının X elektrik dağıtım şebekesi üzerinde gösterimi aşağıdaki Şekil 4.23’de gösterilmiştir.

A-B-E-I Bağlantısında Elektrik Akışı

32


[pdf 32]

1400 GWH

1400 GWH

2100
1700

B

0

600

800

E

400
400

2000

F

1200 800
D
600
500

600
A

200

3000

1600

300

1000
400

C

G

2800

1000 2500
I
1400
900

800

1400

700

H 1800

Şekil 4.23. İkinci ve Üçüncü İşlem Adımı Şebeke Gösterimi (A-B-E-I
bağlantısı).
Yukarıdaki Şekil 4.23’de A elektrik santralinde üretilen 1400 GWH elektrik
A-B-E-I bağlantısıyla I şehri elektrik dağıtım noktasına ulaşır.
Birinci Tekrar (Birinci, İkinci ve Üçüncü İşlem Adımı): A elektrik santralinden I şehri elektrik dağıtım noktasına elektrik akışını A-B-D-E-I bağlantısıyla da sağlanabilir. A-B-D-E-I bağlantısında A-B bağlantısı elektrik
kapasitesi 600 GWH, B-D bağlantısı elektrik kapasitesi 400 GWH, D-E
bağlantısında elektrik kapasitesi 1200 GWH ve E-I bağlantısına 800
GWH’dir. Bu bağlantılar arasında en düşük kapasite 400 GWH elektrik iletimi sağlanır. Bu miktar bağlantılardaki kapasitelerden düşülür ve ters kapasitelere eklenir. Aşağıdaki Şekil 4.24’de şebeke ile gösterimi yapılmıştır.

A-B-D-E-I Bağlantısında Elektrik Akışı

33


[pdf 33]

1800 GWH
0
2100

1800 GWH

2100
1000

B

400

E

0
400

200
A

600
500

3000

800
D

800
600

1600

300

1000
400

2000

F

C

G

2800

1000 2900
I
1400
900

800

1400

700

H 1800

Şekil 4.24. Birinci Tekrar (Birinci, İkinci ve Üçüncü İşlem Adımı) Şebeke Gösterimi (A-B-D-E-I bağlantısı).
Yukarıdaki Şekil 4.24’de A elektrik santralinde üretilen 400 GWH daha
elektrik A-B-D-E-I bağlantısıyla I şehri elektrik dağıtım noktasına ulaşır.
Böylece I şehri elektrik dağıtım noktasına 1800 GWH elektrik ulaşmış olur.
İkinci Tekrar (Birinci, İkinci ve Üçüncü İşlem Adımı): A elektrik santralinden I şehri elektrik dağıtım noktasına elektrik akışını A-C-H-I bağlantısıyla da sağlanabilir. A-C-H-I bağlantısında A-C bağlantısı elektrik kapasitesi 3000 GWH, C-H bağlantısı elektrik kapasitesi 1400 GWH ve H-I
bağlantısında elektrik kapasitesi 1800 GWH’dir. Bu bağlantılar arasında en
düşük kapasite 1400 GWH elektrik iletimi sağlanır. Bu miktar bağlantılardaki kapasitelerden düşülür ve ters kapasitelere eklenir. Aşağıdaki Şekil
4.25’de şebeke ile gösterimi yapılmıştır.

A-C-H-I Bağlantısında Elektrik Akışı
34


[pdf 34]

3200 GWH
0
2100

3200 GWH

2100
1000

B

400

E

0
400

200
A

600
500

1600

800
D

800
600

1600

300

1000
1800

2000

F

C

G

2800

1000 2900
I
1400
2300

800

0

2100

H 400

Şekil 4.25. İkinci Tekrar (Birinci, İkinci ve Üçüncü İşlem Adımı) Şebeke Gösterimi (A-C-H-I bağlantısı).
Yukarıdaki Şekil 4.25’de A elektrik santralinde üretilen 1400 GWH daha
elektrik A-C-H-I bağlantısıyla I şehri elektrik dağıtım noktasına ulaşır. Böylece I şehri elektrik dağıtım noktasına 3200 GWH elektrik ulaşmış olur.
Üçüncü Tekrar (Birinci, İkinci ve Üçüncü İşlem Adımı): A elektrik santralinden I şehri elektrik dağıtım noktasına elektrik akışını A-C-D-E-I bağlantısıyla da sağlanabilir. A-C-D-E-I bağlantısında A-C bağlantısı elektrik
kapasitesi 1600 GWH, C-D bağlantısı elektrik kapasitesi 1000 GWH, D-E
bağlantısında elektrik kapasitesi 800 GWH ve E-I bağlantısındaki elektrik
kapasitesi 400 GWH’dir. Bu bağlantılar arasında en düşük kapasite 400
GWH elektrik iletimi sağlanır. Bu miktar bağlantılardaki kapasitelerden
düşülür ve ters kapasitelere eklenir. Aşağıdaki Şekil 4.26’de şebeke ile gösterimi yapılmıştır.

A-C-D-E-I Bağlantısında Elektrik Akışı
35


[pdf 35]

3600 GWH
0
2100

3600 GWH

2100
1400

B

E

0

400

F

0

200
A

600
900

1200

400
D

800
600

1600

300

600
2200

2000

C

G

2800

1000 3300
I
1400
2300

800

0

2100

H 400

Şekil 4.26. Üçüncü Tekrar (Birinci, İkinci ve Üçüncü İşlem Adımı) Şebeke Gösterimi (A-C-D-E-I bağlantısı).
Yukarıdaki Şekil 4.26’de A elektrik santralinde üretilen 400 GWH daha
elektrik A-C-D-E-I bağlantısıyla I şehri elektrik dağıtım noktasına ulaşır.
Böylece I şehri elektrik dağıtım noktasına 3600 GWH elektrik ulaşmış olur.
Dördüncü Tekrar (Birinci, İkinci ve Üçüncü İşlem Adımı): A elektrik
santralinden I şehri elektrik dağıtım noktasına elektrik akışını A-C-D-F-I
bağlantısıyla da sağlanabilir. A-C-D-F-I bağlantısında A-C bağlantısı elektrik kapasitesi 1200 GWH, C-D bağlantısı elektrik kapasitesi 600 GWH, D-F
bağlantısında elektrik kapasitesi 800 GWH ve F-I bağlantısındaki elektrik
kapasitesi 2000 GWH’dir. Bu bağlantılar arasında en düşük kapasite 600
GWH elektrik iletimi sağlanır. Bu miktar bağlantılardaki kapasitelerden
düşülür ve ters kapasitelere eklenir. Aşağıdaki Şekil 4.27’de şebeke ile gösterimi yapılmıştır.

36


[pdf 36]

4200 GWH
0
2100

4200 GWH

2100
E

0

1000

F

1400

B
0

200
A

600
1500

600

400

200

D

600

1600

300

0
2800

1400

C

2800

G

1600 3300
I
1400
2300

800

0

2100

H 400

Şekil 4.27. Dördüncü Tekrar (Birinci, İkinci ve Üçüncü İşlem Adımı)
Şebeke Gösterimi (A-C-D-F-I bağlantısı).
Yukarıdaki Şekil 4.27’de A elektrik santralinde üretilen 600 GWH daha
elektrik A-C-D-F-I bağlantısıyla I şehri elektrik dağıtım noktasına ulaşır.
Böylece I şehri elektrik dağıtım noktasına 4200 GWH elektrik ulaşmış olur.
Dördüncü İşlem Adımı: I şehri elektrik dağıtım noktasına başka herhangi
bir bağlantı ile elektrik ulaştırılamayacağından maksimum elektrik iletimi
sağlanmış olur. Başka bir ifadeye B ve C şehri elektrik dağıtım noktalarından I şehrine doğru elektrik iletimi bağlantılarında (B-D, B-E, C-D, C-H)
kapasite olmadığından maksimum elektrik iletimi sağlanmıştır. Böylece A
elektrik santralinden I şehri elektrik dağıtım noktasına 4200 GWH elektrik
sağlanmış olur. Aşağıdaki Tablo 4.8’de elektrik iletimi tablo ile gösterimi
sunulmuştur.
Tablo 4.8. X Elektrik Dağıtım Şirketinin Maksimum Elektrik İletimi.
Bağlantılar

Elektrik
Santralinden
veya Dağıtım
Noktasından

Dağıtım
Noktasına

Akış
(GWH)

Kapasite
(GWH)

Ters Kapasite (GWH)

Bağlantı-1

A

B

1800

200

2100

Bağlantı-2

A

C

2400

600

2800

Bağlantı-3

B

D

400

0

600

Bağlantı-4

B

E

1400

0

2100

Bağlantı-5

C

D

1000

0

1500

37


[pdf 37]

Bağlantı-6

C

H

1400

0

2100

Bağlantı-7

D

E

800

400

1400

Bağlantı-8

D

F

600

200

1000

Bağlantı-9

D

G

0

600

300

Bağlantı-10

D

H

0

1600

800

Bağlantı-11

E

I

2200

0

3300

Bağlantı-12

F

I

600

1400

1600

Bağlantı-13

G

I

0

2800

1400

Bağlantı-14

H

I

1400

400

2300

Maksimum Akış: 4200 GWH
Yukarıdaki Tablo 4.8’de rassal yollar ile şekilsel anlatılan bağlantıların özet
hali gösterilmiştir. Buna göre A elektrik santralinden üretilen 4200 GWH
elektrik B şehri elektrik dağıtım noktasına 1800 GWH, C şehri elektrik dağıtım noktasına 2400 GWH olacak şekilde aktarılır. C şehri elektrik dağıtım
noktasındaki 2400 GWH elektrik, D şehri elektrik noktasına 1000 GWH, H
şehri elektrik noktasına 1400 GWH olacak şekilde aktarılır. Diğer aktarımlar
tablodan benzer şekilde okunabilir. Böylece A elektrik santralinden üretilen
4200 GWH elektrik I şehri elektrik dağıtım noktasına ulaştırılır.
X elektrik dağıtım şirketi geliştireceği yazılım aracılığıyla şehirlere ulaştırabileceği maksimum elektriği bulabilir. Böylece fazla elektrik yaratabileceği
sorunları önleyerek verimliliğini artırabilir.
Bu bölümde iş analitiğinde, karar analizi araçlarından şebeke modellerinin
işletmedeki problemlere ilişkin kullanımı anlatılmıştır. Bir sonraki bölümde
şebeke modellerinden olan proje yönetimi ile konu anlatımına devam edilecektir.

38


[pdf 38]

Bölüm Özeti
Bölüm şebeke modellerinin uygulamaları ile şebeke modellerinin unsurlarının anlatımıyla başlamıştır. Şebeke modellerinden gezgin satıcı modeli, en
kısa yol modeli, en kısa yol ağacı modeli ve maksimum akış modellerinin
uygulamaları, şebeke yapısı gösterimi ile çözümleriyle bölüm ele alınmıştır.
Buna göre bölüm şebeke modelleri kavramlarının tanımlanması ve modeller
olmak üzere özetlenebilir:
•

Şebeke: Düğümler ve düğümler arası ilişkiyi gösteren oklarla bir
olayın akışını gösteren diyagramlardır. Buna göre şebeke modellerini oluşturan unsurla aşağıda tanımlanmıştır:
o Düğümler: Olay içerisindeki faaliyetleri temsil eder.
o Oklar: Birbiriyle ilişkili olan düğümleri bağlayan unsurdur.
o Akış Miktarı: Oklar üzerinde gösterilen miktarlardır.
Şebeke yapısı kavramları ise aşağıdaki şekilde açıklanabilir:

•
•
•

Komşu Düğümler: Düğümün, ok ile bağlantılı olduğu düğüme
komşu düğüm denir.
Döngü: Bir düğümün oklar ile başka düğümlere bağlanıp tekrar
kendisine bağlanmasına denir.
Ağaç: Düğümler birbirine ok ile bağlanmasına ancak bu şebeke yapısının döngü oluşturmaması ağaç denir.

Bölüm kapsamında incelenen Şebeke modelleri ise aşağıda açıklanmıştır:
•

•
•

•

Gezgin Satıcı Modeli: Bir satıcının belirlenen ziyaret yerlerini yalnızca bir kere ziyaret edip tekrar başlangıç noktasına en kısa mesafede/sürede geri dönmesi problemini çözen şebeke modelidir. Servis
güzergahı, otobüs hatları gibi kullanım alanları vardır.
En Kısa Yol Modeli: Bir yerden varılmak istenen başka bir yere en
kısa mesafede gitme problemini çözen şebeke modelidir. Nakliye,
ambulans güzergahı gibi kullanım alanları vardır.
En Kısa Yol Ağacı Modeli: Şebeke içerisindeki tüm yerlere birbirleri ile bağlantılı olacak şekilde en kısa mesafede gitme problemini
çözen şebeke modelidir. İnternet altyapı ağları, telefon hatları gibi
kullanım alanları vardır.
Maksimum Akış Modeli: Şebeke içerisinde bazen bağlantılar arasında kapasitesi olabilmektedir. Böyle şebekeler içerisinde bir yerden varılmak istenen yere maksimum akış kapasitesi ile gitme problemini çözen şebeke modelidir. Eğer akış minimum yapılmak
istenirse model adı minimum akış modeli olmaktadır.

Proje Yönetimi, projelerin zaman ve bütçe yönüyle yönetilmesini sağlar. Bir
sonraki bölümde anlatılacaktır
39


[pdf 39]

Gözden Geçirelim
1- Aşağıdaki ifadelerden hangisi şebeke modelleri kapsamında yanlıştır?
a) İş analisti işletmede yer alan şebeke problemlerini, şebeke modelleri
çerçevesinde çözüm yolu arar.
b) İş analisti işletmede şebeke problemi tespit ettiyse, bunu bir grafik
yardımıyla gösterebilir.
c) Şebeke modelleri işletmede verimliliği artırabilir.
d) Şebeke modellerinin temel amacı iş süreçlerini analiz etmektir.
e) Şebeke modellerinin kullanım alanlarından biri lojistik sektörü olabilir.
2- Başlangıç düğümü ile ulaşılmak istenen düğüm arasında en kısa yol veya
en az kayıp ile varılmak amacı olan model aşağıdakilerden hangisinde doğru
olarak ifade edilmiştir?
a) Gezgin satıcı modeli
b) En kısa yol modeli
c) En kısa yol ağacı modeli
d) Maksimum akış modeli
e) Proje yönetim modeli
3,4,5,6,7,8. Soruları aşağıdaki bilgiler çerçevesinde yanıtlayınız.

Bir XYZ elektrik dağıtım şirketinin şehirleri birbirine bağlayan hatlardaki elektrik
kaybı, elektrik akış kapasiteleri ve ters akış kapasiteleri bilgileri aşağıdaki Tabloda
sunulmuştur.
Yollar

Şehirden

Şehre

Kapasite
(MWH)

Ters kapasite
(MWH)

Kayıp Miktarı
(MWH)

Bağlantı-1
Bağlantı-2
Bağlantı-3
Bağlantı-4
Bağlantı-5
Bağlantı-6
Bağlantı-7

1
1
2
2
3
3
4

2
3
4
5
4
5
5

500
400
150
350
250
100
300

50
40
15
35
25
10
30

100
80
75
60
40
90
45

3. I. 3 nolu şehrin elektrik dağıtım merkezinden 4 nolu şehrin elektrik dağıtım merkezine elektrik iletiminde 40 MWH elektrik kaybı yaşanmaktadır.
II- Kapasite miktarı en yüksek olan şehir 1 nolu şehirdir.
III- Elektrik iletiminde en fazla kayıp 3 nolu şehirden dağıtım yapılırken olmaktadır.

40


[pdf 40]

XYZ elektrik dağıtım şirketi ile ilgili verilen tabloya göre yukarıdaki
sayıyla gösterilmiş ifadelerden hangisi ya da hangileri doğru bir ifadedir?
a) Yalnız I
b) Yalnız II
c) Yalnız III
d) I ve II
e) I ve III
4- I – Bağlantı-1
II- Bağlantı-2
III- Bağlantı-6
1 nolu şehirden 5 nolu şehre en az kayıp ile elektrik iletimi yapılabilmesi
yukarıda sayıyla gösterilmiş bağlantılardan hangisi ya da hangileri kullanılabilir?
a) Yalnız I
b) Yalnız II
c) Yalnız III
d) I ve III
e) II ve II
5- 1 nolu şehirden 5 nolu şehre elektrik iletiminin en az kayıp ile sağlanması
durumunda kaç MWH elektrik kaybı olacağı aşağıdaki ifadelerden hangisinde doğru olarak verilmiştir?
a) 150
b) 155
c) 160
d) 165
e) 170
6- I- Bağlantı-1
II- Bağlantı-3
III- Bağlantı-5
1 nolu şehirden başlamak üzere tüm şehirlere elektrik dağıtımı yapılacaktır.
Buna göre en az elektrik kaybı ile dağıtımın sağlanması durumunda yukarıda sayıyla gösterilmiş yollardan hangisi ya da hangileri kullanılır?
a) Yalnız I
b) Yalnız II
c) Yalnız III
d) I ve II
41


[pdf 41]

e) I ve III
7- 1 nolu şehirden başlamak üzere tüm şehirlere elektrik dağıtımı yapılacaktır. Buna göre en az elektrik kaybı kaç MWH olacağı aşağıdakilerden
hangisinde doğru olarak verilmiştir?
a.
b.
c.
d.
e.

185
225
265
305
345

8- 1 nolu şehirden 5 nolu şehre ulaştırılabilecek maksimum elektrik iletimi
kaç MWH olabileceği aşağıdakilerden hangisinde doğru olarak verilmiştir?
a) 700
b) 750
c) 800
d) 850
e) 900
9 ve 10. soruyu aşağıdaki tablo ile verilen bölgeler arası mesafeleri (m)
gezgin satıcı modeli çerçevesinde yanıtlayınız.
Sokaklar ve
Merkez

Sokaklar
S1

S2

S3

Merkez

Merkez

200

300

500

-

S1

-

250

350

220

S2

240

-

400

290

S3

360

390

-

510

Yukarıdaki dağıtıcı merkezden çıkıp tüm sokakları dolaşıp merkeze geri
dönecektir.
9- Buna göre aşağıdaki ifadelerden hangisi doğru olarak ifade edilmiştir?
a) Dağıtıcı optimal döngüyü sağlaması için merkezden öncellikle S3
sokağına gitmelidir.
b) Merkezden S3 sokağına gitmesi için 200 metre yol kat etmesi gereklidir.
c) Merkez ve sokaklar arası mesafe simetrik değildir.
d) En uzun mesafe merkezden çıkıp S3 sokağına gidilmesidir.
e) İş analisti dağıtıcı problemini en kısa yol modeli ile çözebilir.
42


[pdf 42]

10- Dağıtıcı en kısa mesafede dağıtımları yapıp merkeze dönmesi halinde
kaç metre yol yürüdüğü aşağıdakilerden hangisinde doğru olarak ifade
edilmiştir?
a) M-1-3-2-M döngüsü ile 1230 metredir.
b) M-3-1-2-M döngüsü ile 1200 metredir.
c) M-1-2-3-M döngüsü ile 1230 metredir.
d) M-2-3-1-M döngüsü ile 1280 metredir.
e) M-2-1-3-M döngüsü ile 1200 metredir.

Yanıt Anahtarı
1-d ,2-b, 3-d, 4-a, 5-c, 6-c, 7-b, 8-b, 9-c, 10-a

43


[pdf 43]

Sözlük
Ağaç: Düğümler birbirine ok ile bağlanmasına ancak bu şebeke yapısının
döngü oluşturmamasıdır.
Akış Miktarı: Oklar üzerinde gösterilen miktarlardır.
Döngü: Bir düğümün oklar ile başka düğümlere bağlanıp tekrar kendisine
bağlanmasına denir.
Düğümler: Olay içerisindeki faaliyetleri temsil eder.
En Kısa Yol Modeli: Bir yerden varılmak istenen başka bir yere en kısa mesafede gitme problemini çözen şebeke modelidir.
En Kısa Yol Ağacı Modeli: Şebeke içerisindeki tüm yerlere birbirleri ile
bağlantılı olacak şekilde en kısa mesafede gitme problemini çözen şebeke
modelidir.
Gezgin Satıcı Problemi: Bir satıcının belirlenen ziyaret yerlerini yalnızca bir
kere ziyaret edip tekrar başlangıç noktasına en kısa mesafede/sürede geri
dönmesi problemini çözen şebeke modelidir.
Komşu Düğümler: Düğümün, ok ile bağlantılı olduğu düğüme denir.
Maksimum Akış Problemi: Şebekeler içerisinde bir yerden varılmak istenen
yere maksimum akış kapasitesi ile gitme problemini çözen şebeke modelidir.
Oklar: Birbiriyle ilişkili olan düğümleri bağlayan unsurdur.
Şebeke: Düğümler ve düğümler arası ilişkiyi gösteren oklarla bir olayın akışını gösteren diyagramlardır.

44


[pdf 44]

K aynakça
Anderson D., Sweeney D., Williams T., Camm J. and Martin K. (2012),
Introduction to Management Science Quantitative Approaches to Decision
Making, Thirteenth Edition, South-Western.
Buglear, Stephan P., Arnoldo C. Hax and Thomas L. Magnanti (1977), Applied Mathematical Programming, Addison-Wesley.
Gupta R. (2015), Operations Research, Thirty Fourth Edition, Krishna.
Hillier F. and Lieberman G. (2001), Introduction to Operations Research,
Seventh Edition, McGraw Hill.
Hillier, F. and Hillier, M. (2013), Introduction to Management Science,
McGraw Hill.
Kwak, N.K., Mathematical Programming with Business Application,
McGraw Hill.
Lawrence J. and Pasternack B. (2002), Applied Managemnet Science, Second Edition, John Wiley.
Luenberger D. and Ye Y. (2008), Linear and Nonlinear Programming, Third
Edition, Springer.
Newbold P. (2006), İşletme ve İktisat için İstatistik (Çeviren: Şenesen, Ü.),
Beşinci Baskı, Literatür Yayıncılık.
Powell, S.G. and Baker, K.R. (2009) Management Science, Third Edition
NCTU, John Wiley.
Sarıaslan H., Karacabey A. ve Gökgöz F. (2017), Nicel Karar Alma Yöntemleri, Siyasal Kitabevi.
Sharma J. (2016), Operations Research, Sixth Edition, Trinity Press.
Singla V. (2022), Operations Research Using Excel, First Edition, CRC
Press.
Taha H. (2017), Operations Research An Introduction, Tenth Edition, Pearson.
Taylor B. (1999), Introduction to Management Science, Sixth Edition, Pearson.
Taylor B. (2010), Introduction to Management Science, Tenth Edition, Pearson.
Taylor B. (2016), Introduction to Management Science, Twelfth Edition,
Pearson.
Vanderbei R. (2008), Linear Programming, Third Edition, Springer.
Winston, Wayne L. and Albright Christian (2009), Practical Management
Science, Revised Third Edition, Mason.
45


[pdf 45]

Faydalı K aynaklar ve İnternet Siteleri
The International Federation of Operational Research Societies (IFORS)
https://www.ifors.org/
Institute for Operations Research and the Management Sciences (INFORMS)
https://www.informs.org/
Türkiye İstatistik Kurumu (TÜİK)
https://biruni.tuik.gov.tr/yayin/views/visitorPages/index.zul
Pazara Giriş Veri Tabanı (ITC)
https://www.trademap.org/Index.aspx
Ankara Üniversitesi Kütüphanesi
http://kutuphane.ankara.edu.tr/adina-gore-veritabanlari/
Türkiye Cumhuriyeti Ticaret Bakanlığı
https://ticaret.gov.tr/ihracat/pazara-giris/pazara-giris-faydali-linkler
Ankara Üniversitesi Açık Ders
Ders: Nicel Çözümleme Yöntemleri (ankara.edu.tr)
Ders: İstatistik (ankara.edu.tr)

46


[pdf 46]

