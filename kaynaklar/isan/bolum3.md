# Bölüm 3 (PDF 20 sayfa)
BÖLÜM 3
TAHMİNLEYİCİ VERİ ANALİZİ
UYGULAMASI

ANAHTAR KAVRAMLAR
Korelasyon, Korelasyon Katsayısı, Korelasyon
Matrisi, Bağımlı Değişken, Bağımsız Değişken,
Regresyon, Regresyon Sonuç Tablosu,
En Küçük Kareler Yöntemi

ÖĞRENME HEDEFLERİ

1

Tahminleyici
veri analizi içeriğinin öğrenilmesi

2

İşletmedeki
probleme ilişkin
değişkenlerin
birbirleriyle olan
ilişkilerinin analiz
edebilme becerisinin kazandırılması

4

İstatistiksel açıdan neden-sonuç
ilişkisini açıklayabilme yeteneğinin
kazandırılması

5

Tahminleyici
veri analizi ile korelasyon ve regresyon analizi yapabilme becerisinin
kazandırılması

3

Tahminleyici
model kurabilme yeteneğinin
kazandırılması


[pdf 1]

ÜÇÜNCÜ BÖLÜM

Önceki bölümde tanımlayıcı iş analitiği kapsamında verini sınıflandırılması,
verinin merkez değerinin bulunması ve verinin yayılış
ölçütleri anlatılmıştır.
Bu bölümde ise işletmedeki herhangi bir probleme
yol açan değişkenlerin birbirleriyle olan ilişkilerine ve
bu kapsamda probleme ilişkin öngörülere odaklanılacaktır.
İş analitiği kapsamda, iki değişkenin birbirleriyle
olan iliş-kisini korelasyon analiziyle incelenmesine ve
işletmedeki problemi açıklamak ve öngörüde bulunmak için regresyon analizi anlatımına yer verilecektir.
Bu çerçevede, bölüm üç temel kısım ile gösterilebilir:
• 1. Kısım: İşletmedeki probleme ilişkin değişkenlerin bir-birleriyle olan ilişkisi sadece istatistiksel olarak
açıkla-mak yeterli değildir. Bu nedenle değişkenlerin
bilimsel açıklamalara dayanması gerekir. Bu kısımda bilimsel açıdan değişkenler arası ilişki ve nedensellik anlatılacak-tır.
• 2. Kısım: Birinci kısımda tanımlanan değişkenlerin
bir-birleriyle olan ilişkisini istatistikte yer alan analizlerden korelasyon analizi ele alınacaktır.
• 3. Kısım: Birinci ve ikinci kısımda elde edilen sonuçlar birlikte neden sonuç ilişkisi ve tahminleme regresyon analizi ile anlatılacaktır.
Tahminleyici iş analitiğinde hem istatistik metotları
hem de probleme ilişkin bilimsel literatür beraber ele
alınır. Önce-likle probleme ilişkin değişkenlerin belirlenmesi ve kore-lasyon analizi ile tahminleyici iş analitiği uygulamasına başlanabilir.

48 TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI


[pdf 2]

TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI

1. TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI
Bir önceki bölümde veri betimlemesi ile iş

bir ilişki olduğu korelasyon analizi sonucunda

analitiğinin problemle ilişkin verinin tanımlan-

tespit edilmiştir. Bilimsel açıdan ücret çalışan

ması anlatılmıştır. Böylece “ne oldu” sorusunun

performansını etkiler. Böylece sonuç değişkeni

cevabı aranmıştır. Örneğin A işletmesinin veri-

çalışan performansı, neden değişkeni ücret olur.

sinden yola çıkarak satış raporları, müşteri seg-

Sonuç değişkenine bağımlı değişken, neden de-

mentasyonu gibi konular ele alınmıştır. Bu bö-

ğişkenine bağımsız değişken denir.

lümde ise “ne olabilir” sorusuna cevap aranacaktır. Bunun için veriden yola çıkılarak istatistikteki
analiz araçları olan korelasyon analizi ile regresyon analizi kullanılacaktır:
• Korelasyon Analizi: Bir olguyu tahmin edebilmek için ilk önce bu olgunun neler ile ilişkili
olduğuna bakılır. Örneğin çalışan performanslarını tahmin edebilmesi istenirse, öncelikle ça-

İş analitiğinde tahminleyici veri analizi uygulamaları birçok uygulama alanı vardır. Bunlardan bazıları:
• Talep Tahmini
• Müşteri Kaybı Tahmini
• Çalışan Performans Tahmini

lışan performansıyla ilişkili değişkenlerin tespit

• Verimlilik Tahmini

edilir. Bu tespit korelasyon analizi ile yapılır. An-

• Tasarruf Tahmini

cak, değişkenler arasında ilişki olması bu değişkenin nedeninin açıklayacağı anlamına gelmez.

• Karlılık Tahmini vb.

Örneğin A tekstil firmasında korelasyon analizi
sonucunda çalışan performansı ile dondurma satışları arasında bir ilişki çıkabilir. Bu dondurma
satışlarının çalışan performansını etkilediği anlamına gelmez.

Yukarıdaki uygulama alanları iş analitiği ile
yazılım uygulamaları geliştirilebilir. Böylece işletmelerin örneğin pazarlama, finans gibi fonksiyonlarında tahminleyici modeller kullanılır.

• Regresyon Analizi: Korelasyon analizi so-

Örneğin insan kaynakları birimi ücret artışını

nucunda birbiriyle ilişkili olan değişkenlerin ne-

%10 yaparsa çalışan performansının %1 artacağını

den-sonuç ilişkisi bilimsel açıklamalara dayanır.

tahmin eder.

Örneğin çalışan performansı ile ücret arasında

2. KORELASYON ANALIZI
Değişkenlerin arasında ilişkinin yönünün ve gü-

Korelasyon katsayısı, değişkenlerin normal

cünün incelenmesine korelasyon analizi denir.

dağılım ve doğrusal olduğu varsayımı ile iki de-

Korelasyon katsayısı ise, bu yönün ve gücün de-

ğişken arasındaki ilişkinin yönünü ve büyüklü-

recesini anlatan katsayıdır. Eğer korelasyon kat-

ğünü gösterir. Korelasyon katsayısı -1 ile +1 ara-

sayısı pozitif ise, değişkenler arası ilişkinin yönü

sında değer alır:

aynıdır. Başka bir ifadeyle, değişkenlerden biri
artar ise diğeri de artar veya biri azalır ise diğeri
de azalır demektir. Eğer korelasyon katsayısı negatif ise, değişkenler arası ilişkinin yönü terstir.
Diğer bir ifadeyle, değişkenlerden biri artar ise
diğeri azalır veya biri azalır ise diğerinin arttığı
anlamına demektir.

• Pozitif İlişki (0 <r ≤1): İki değişken arasındaki
yön aynı ise korelasyon katsayısı 0 ile 1 arasında
değer alır. Eğer korelasyon katsayısı 1 ise, mükemmel pozitif korelasyon söz konusudur.
• İlişki yok (r=0): İki değişken arasındaki herhangi bir ilişki olmadığı durumda ise, korelasyon
katsayısı 0’dır.
TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI

49


[pdf 3]

ÜÇÜNCÜ BÖLÜM

• Negatif İlişki (-1≤ r <0): İki değişken arasın-

Yukarıda gösterilen korelasyon katsayılarının

daki yön ters ise korelasyon katsayısı -1 ile 0 ara-

grafiksel gösterimi aşağıdaki Şekil 3.1’de gösteril-

sında değer alır. Eğer korelasyon katsayısı -1 ise,

miştir.

mükemmel negatif korelasyon bulunmaktadır.

Şekil 3.1. Değişkenler Arası Korelasyon Türleri.

50 TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI


[pdf 4]

TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI

Yukardaki Şekil 3.1’de değişkenler arası ilişki-

Mükemmel pozitif ve mükemmel negatif ko-

lerin grafiksel gösterimi sunulmuştur. Buna göre,

relasyon grafikleri aşağıdaki Şekil 3.2’de gösteril-

yukardan aşağıya doğru öncelikle pozitif kore-

miştir.

lasyon, ortada ilişkisiz durumu ve en altta ise negatif korelasyonun grafiği gösterilmiştir.

Şekil 3.2. Mükemmel Pozitif ve Negatif Korelasyon Gösterimi.
Yukarıdaki Şekil 3.2’de mükemmel pozitif ve

aynı miktarda değişiyorken, mükemmel negatif

mükemmel negatif korelasyolar gösterilmiştir.

korelasyonda, bir değişkenin değişimi kadar di-

Grafikten de görüldüğü üzere, iki değişken ara-

ğer değişkende aynı miktarda ters yönde değiş-

sında mükemmel bir pozitif korelasyon var ise,

mektedir.

bir değişkenin değişimi kadar diğer değişkende

2.1. Korelasyon Katsayısının Hesaplanması
Korelasyon katsayısının hesaplanması aşağıda
belirtilen varsayımlara dayanır.
• Değişkenlerin normal dağılımı
• Değişkenlerin doğrusal olduğu

Yi: Y değişkeninin i. gözlem değeri
: X değişkeninin ortalaması
: Y değişkeninin ortalaması
Yukarıdaki formülde

Yukardaki varsayımlar çerçevesinde korelas-

kareler toplamı SSXY,

yon katsayısı aşağıdaki formül yardımıyla hesap-

kareler toplam

lanabilir:
rXY =

		

ifadesi SSX ve

ka-

reler toplamı ifadesi ise SSY ile ifade edilebilir. Bu
durumda korelasyon katsayısı formülü:
rXY =
Örnek olay üzerinden korelasyon analizinin
açıklanmasıyla konu anlatımına devam edilebilir.

i: indeks
Xi: X değişkeninin i. gözlem değeri

TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI

51


[pdf 5]

ÜÇÜNCÜ BÖLÜM

2.2. Örnek Olay
A işletmesinin İnsan Kaynakları Bölümü ücret ve

formans, ücret ve eğitim harcamaları verisine

eğitimin, çalışan performansı üzerine etkilerini

ulaşabilir. Aşağıdaki Tablo 3.1’de A işletmesinin

araştırmak istemektedir. İş analitiği kapsamın-

çalışan performansı, ücret artışları ve eğitim har-

da insan kaynaklarının bu problemi çözülebilir.

camaları gösterilmiştir.

Buna göre iş analisti veri tabanından çalışan perTablo 3.1. A İşletmesinin Çalışan Performansı, Ücret Artışı ve Eğitim Harcamaları.
Çalışan Performansı

Ücret Artışı (%)

Eğitim Harcaması (milyon TL)

56

5

1

78

10

3

85

10,50

2,80

90

11

3,20

92

15

3,25

75

8

3,00

Çalışan Performansı

Ücret Artışı (%)

Eğitim Harcaması (milyon TL)

78

8,50

2,75

80

9

3

92

15

3,25

65

5

2,80

72

6

3

77

8

3,25

86

15

3,50

88

15

3,50

95

25

3

Yukarıdaki Tablo 3.1’de son 15 yılın ortalama
çalışan performansı, ücret artışı ve eğitim har-

= (56 – 80,60) (5 – 11,07) + (78 – 80,60) (10
– 11,07) + … + (95 – 80,60) (25 – 11,07)

camaları gösterilmiştir. Bu çerçevede, iş analisti

= 149,32 + 2,78 + … + 200,59 = 663,87

öncelikli olarak üç değişken arasındaki ilişkiyi
korelasyon analizi ile inceleyecektir. Örneğin ça-

SSX =

lışan performansı ile ücret artışı arasındaki korelasyon katsayısı aşağıda hesaplanmıştır.

= (56 – 80,60)2 +(78 – 80,60)2 + … + + (95
– 80,60)2

rXY =

= 605,16 + 6,76 + … + 207,36 = 1.639,60

Burada çalışan performansı X değişkeni ile
ücret artışı Y değişkeni ile simgelenmektedir.
Çalışan performansının ortalaması 80,60; ücret
artışı ortalaması ise 11,07’dir. Buna göre kareler

SSY =
= (5 – 11,07)2 +(10 – 11,07)2 + … + (25 – 11,07)2

toplamı (SS) aşağıda hesaplanmıştır;
SSXY

=

= 36,84 + 1,14 + … + 194,04 = 386,43
Bulunan kareler toplamı korelasyon katsayı
formülünde yerine yazılır.

SSXY

=

rXY =
= 0,8340 bulunur.

52 TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI

=


[pdf 6]

TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI

O halde çalışan performansı ile ücret artışı
arasında pozitif yönlü bir ilişki vardır.

Aşağıdaki Tablo 3.2’de korelasyon katsayısı
hesaplaması tablo üzerinden yapılmıştır.

Tablo 3.2. Korelasyon Katsayısı Hesaplaması.
Çalışan Performansı

Ücret Artış Oranı (%)

SSXY

SSX

SSY

56,00

5,00

149,32

605,16

36,84

78,00

10,00

2,78

6,76

1,14

85,00

10,50

- 2,51

19,36

0,32

90,00

11,00

-0,66

88,36

0,00

92,00

15,00

44,80

129,96

15,44

75,00

8,00

17,19

31,36

9,42

78,00

8,50

6,68

6,76

6,60

80,00

9,00

1,24

0,36

4,28

92,00

15,00

44,80

129,96

15,44

65,00

5,00

94,69

243,36

36,84

72,00

6,00

43,60

73,96

25,70

77,00

8,00

11,05

12,96

9,42

86,00

15,00

21,22

29,16

15,44

88,00

15,00

29,08

54,76

15,44

95,00

25,00

200,59

207,36

194,04

SSXY=663,87

SSX=1.639,60

= 80,60

= 11,07
rXY =

=

SSY = 386,43

= 0,8340

Yukarıdaki Tablo 3.2’de çalışan performan-

Tüm değişkenlerin birbirleri ile ilişkisinin

sı ile ücret artışı arasındaki ilişkinin gücünü ve

gösterildiği tabloya korelasyon tablosu denir.

yönünü gösteren korelasyon katsayısının he-

Aşağıdaki Tablo 3.3’de çalışan performansı, ücret

saplanması gösterilmiştir. Benzer şekilde çalışan

artışı ve eğitim harcamalarının korelasyon tablo-

performansı ile eğitim harcamaları, ücret artışı

su gösterilmiştir.

ile eğitim harcamaları arasındaki korelasyon katsayıları da hesaplanabilir. Bu hesaplamalar okuyucuya bırakılmıştır.

TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI

53


[pdf 7]

ÜÇÜNCÜ BÖLÜM

Tablo 3.3. Korelasyon Tablosu.
Çalışan Performansı

Ücret Artış Oranı (%)

Eğitim Harcaması (milyon TL)

Çalışan Performansı

1

0,8340

0,7318

Ücret Artış Oranı (%)

0,8340

1

0,4446

Eğitim Harcaması (milyon TL)

0,7318

0,4446

1

Yukarıdaki Tablo 3.3’de çalışan performansı,
ücret artış oranı ve eğitim harcamalarının birbirleri ile olan korelasyon katsayıları gösterilmiştir.
Buna göre:

• Eğitim harcaması ile ücret artış oranı arasında ilişkinin gücü 0,446’dır.
Böylelikle çalışan performansı, ücret artış
oranı ve eğitim harcamaları arasında bir ilişki ol-

• Çalışan performansı ile ücret artış oranı ara-

duğu tespit edilmiştir. Böylece iş analisti, ücret ve
eğitimin, çalışan performansı üzerine etkilerini

sında ilişkinin gücü 0,8340’dır.
• Çalışan performansı ile eğitim harcaması

regresyon analizi ile yapabilir.

arasında ilişkinin gücü 0,7318’dir.

3. REGRESYON ANALIZI
Regresyon analizi, olguları bilimsel teorilerle

lılığının ortaya çıkarılmasıdır. Böylece çalışan

açıklanabilen neden-sonuç ilişkisinin, istatistik

performansının nedenleri arasında ücret artış

bilim dalı ile gösterilme yöntemidir. A işletme-

oranı ile eğitim harcamasının olup olmadığının

sini insan kaynakları bölümü bilimsel temelde,

ortaya açığı çıkarılmasının sağlanmasıdır.

çalışan performansını etkileyen unsurları ücret

• Böylelikle belirli varsayımlar altında çalışan

artış oranı ve eğitim harcamaları olarak tespit et-

performansı ile ilgili öngörülerde bulunulması-

miştir. Bunun için bir önceki kısımda bu üç de-

nın sağlanmasıdır.

ğişkenin birbirleri ile olan ilişkileri incelenmiştir.
Bu kısımda ise, regresyon analizi yardımıyla aşağıda belirtilen iki amaç incelenecektir:

Yukarıdaki amaçlar, regresyon analizi sonucunda elde edilen matematiksel model yardımıyla sağlanır. Başka bir ifadeyle, regresyon

• İstatistiksel olarak çalışan performansını,

analizi ile çalışan performansı incelemesi basit,

ücret artışı ve eğitim harcamaları hangi oranda

kavranabilir ve gelecekle ilgili tahminlenebilir

açıklayabilmektedir ve istatistiksel olarak anlam-

bir inceleme sağlar.

3.1. Regresyon Modeli ve Çözümlemesi
Doğrusal bir regresyon modeli gösterimim aşa-

performansını etkileyen unsurları göz önüne

ğıda sunulmuştur:

alındığında bağımlı değişken, bağımsız değişken

Y = β0 + β1X1 + β2X2 + … + βnXn + ε
Y: Bağımlı değişken

ve hata terimleri şöyle açıklanabilir:
• Bağımlı Değişken (Y): İnsan kaynakları bölümü bilimsel temelde yaptığı çalışmada çalışan

Xi: Bağımsız değişken, (i=1, … ,n)

performansının etkilenen başka bir ifadeyle ba-

βi: Parametreler, (i=1, … ,n)

ğımlı değişken olduğunu belirlemiştir. O halde

ε: Hata terimi
Yukarıdaki genel regresyon modeli, çalışan

54 TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI

çalışan performansı bağımlı değişkendir.
• Bağımsız Değişken (X) : İnsan kaynakları
bölümü bilimsel temelde çalışan performansını


[pdf 8]

TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI

etkileyen unsurların ücret artış oranı ve eğitim

KT =

harcaması olduğunu belirlemiştir.

KT: Kareler toplamı

• Hata Terimi (ε) : Çalışan performansını etki-

Yi : Bağımlı değişkenin i. gözlem değeri

leyen fakat insan kaynakları bölümü tarafından
düşünülemeyen veya imkân dâhilinde olmayan
buna karşın çalışan performansını etkileyen un-

: Bağımlı değişkenin tahmini i. gözlem
değeri

surları içeren terimdir.

Başka bir ifadeyle EKK, KT’yi en küçük yapan

Yukarıdaki açıklamalar çerçevesinde çalışan

regresyon parametrelerini bulma yöntemidir.

performansı ile ilgili regresyon modeli aşağıda
gösterilmiştir.

EKK yönteminin doğrusallık, bağımlı değişkenin olasılıklı olması, bağımsız değişkenin kesin

Y = β0 + β1X1 + β2X2 + ε

alması, bağımsız değişkenler arası korelasyonun

Y: Çalışan Performansı,

olmaması, otokorelasyon, hata teriminin rassal
olması, hata teriminin varyansının sabit olması

X1: Ücret Artış Oranı,

varsayımları altında kullanılır.

X2: Ücret Artış Oranı,

Bir tane bağımsız değişkeni olan regresyon

β0, β1, β2 : Parametreler

modeline basit regresyon modeli, birden fazla

ε: Hata terimi

bağımsız değişkeni olan regresyon modeline ise

Regresyon modelinin çözümlemesinde kulla-

çoklu regresyon modeli denir. Örnek olaydaki

nılan yöntemlerden biri en küçük kareler (EKK)

gibi çoklu regresyon modeli bilgisayar program-

yöntemidir. EKK yöntemi, hata terimleri kareler

ları aracılığıyla çözülebilir. Konunun daha iyi

toplamını en küçük yapmak amacıyla yapılan çö-

anlaşılması için öncelikle A işletmesinin çalışan

zümlemedir. Bu kapsamda, literatürde yer alan

performansı, tek bağımsız değişken olarak ücret

EKK yöntemi, doğrusal, en iyi, sapmasız, tutarlı

artış oranı ile basit regresyon modeli çözümle-

bir metot olarak ifade edilebilir.

mesi gösterilecektir.

3.2. Basit Regresyon Örnek Olay Çözümlemesi
8. Parametrelerin hipotez testlerinin yapılma-

Aşağıdaki işlem adımlarıyla çalışan performansı
basit regresyon modelinin kurulumu ve çözümü
gösterilebilir:
1. Bilimsel çerçeve ile değişkenlerin tanımlanması
2. Korelasyon analizi ile değişkenlerin birbirleriyle ilişkilerinin incelenmesi
3. Regresyon modelinin kurulması
4. Regresyon modelinin çözümlenmesi
5. Hata terimlerinin bulunması
6. Modelin açıklama gücünün bulunması
7. Modelin hipotez testi (Anlamlılığı)

sı
9. Parametrelerin güven aralıklarının belirlenmesi
İlk iki adım daha önceki kısımlarda açıklanmıştır. Buna göre üçüncü adım olan model kurulmasına geçilebilir.
3. Regresyon Modelinin Kurulması: Bağımlı
değişken çalışan performansı, bağımsız değişken
ise ücret artış oranı olduğundan regresyon modeli şu şekilde kurulabilir:
Y = β0 + β1X1 + ε
Y : Çalışan Performansı

TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI

55


[pdf 9]

ÜÇÜNCÜ BÖLÜM

X : Ücret Artış Oranı

SSXY ve SSX kareler toplamı korelasyon katsayısı kısmında gösterilmiştir. Buna göre SSXY

β0, β1 : Parametreler

kareler toplamı 663,87, SSX kareler toplamı ise

ε : Hata Terimi

386,43’tür. Formülde yerine yazılarak β1 parametresi bulunur.

4. Regresyon Modelinin Çözümlenmesi:
Öncelikli olarak ücret artış oranı parametresinin

β1 =

bulunmasıyla çözümleme başlar. Buna göre, β1

=

= 1,7180

Tablo bazında hesaplamalar aşağıdaki Tablo

parametresi aşağıdaki formül ile bulunur.

3.4’te gösterilmiştir.

β1 =

Tablo 3.4. β1 Parametresinin Hesaplama Tablosu.
Çalışan Performansı

Ücret Artış Oranı (%)

SSXY

SSX

56,00

5,00

149,32

36,84

78,00

10,00

2,78

1,14

85,00

10,50

- 2,51

0,32

90,00

11,00

-0,66

0,00

92,00

15,00

44,80

15,44

75,00

8,00

17,19

9,42

78,00

8,50

6,68

6,60

80,00

9,00

1,24

4,28

92,00

15,00

44,80

15,44

65,00

5,00

94,69

36,84

72,00

6,00

43,60

25,70

77,00

8,00

11,05

9,42

86,00

15,00

21,22

15,44

88,00

15,00

29,08

15,44

95,00

25,00

200,59

194,04

SSXY=663,87

SSY = 386,43

= 80,60

= 11,07
β1 =

Yukarıdaki Tablo 3.4’te β1 parametresi hesaplanmış ve 1,7180 bulunmuştur. Regresyon modeli

=

= 1,7180

Bulunan değerler ile regresyon tahmin modeli kurulur:

bağımlı değişkenin ortalamasını tahmin edebil-

= 61,58 + 1,7180 X1

diğinden, ücret artış oranının ortalaması çalışan

: Tahmini çalışan performansını ifade

performansının ortalamasını tahmin etmelidir.
Buna göre regresyon denklemi aşağıda gösterilmiştir;

eder.
Bulunan modele göre ücret artış oranındaki

= β0 + β1
Çalışan performansı ortalaması 80,60 ve ücret artış oranı ortalaması 11,07 denklemde yerine
yazılarak β0 bulunur.
80,60 = β0 + 1,7180 × 11,07
β0 = 61,58 bulunur.

56 TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI

1 puanlık değişim çalışan performansında 1,7180
puanlık bir artışa neden olmaktadır denebilir.
Örneğin İş analisti bir uygulama geliştirerek
insan kaynakları bölümüne ücret artış oranının
çalışan performansı üzerine etkisi ile ilgili bir
öngörü sunar. Örneğin iş analisti aşağıdaki Şekil
3.3’te bir gösterim sunabilir.


[pdf 10]

TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI

Şekil 3.3. A İşletmesi Çalışan Performansı Tahmin Uygulaması.
Yukarıdaki Şekil 3.3’te iş analistinin geliştirdiği çalışan performansını tahmin eden bir uygulama gösterilmiştir. Buna göre ücret artış oranı
%10 gerçekleşirse çalışan performansının 78,76

ε1 = Y1 – (61,58 + 1,7180 X1)
Çalışan performansının birinci gözlem değeri
56, ücret artış oranının birinci gözlem değeri 5

olacağı öngörülmüştür.

denklemde yerine yazılır.

= 61,58 + 1,7180 × 10 = 78,76
5. Hata Terimlerinin Bulunması: Hata terimleri bağımlı değişkenin i. gözlem değeri ile
tahmin edilen i. gözlem değeri arasındaki farktır.
Aşağıda gösterilen formül yardımıyla hesaplanır.

εt = Yi -

Örneğin birinci gözlem değerinin hata terimi:

;

ε1 = 56 – (61,58 + 1,7180 × 5) = 56 – 70,17 = -14,17
Benzer şekilde ikinci hata terimi:

ε2 = 78 – (61,58 + 1,7180 × 10) = 78 – 78,76 = -0,76
bulunur.
Aşağıdaki Tablo 3.5’te hata terimleri gösterilmiştir.

Tablo 3.5. Hata Terimleri (εt)
Çalışan Performansı
(Yi)

Ücret Artışı (%)
(Xi)

Tahmin Edilen

Hata Terimi

(εt)

(

56

5

70,17

-14,17

78

10

78,76

-0,76

85

10,5

79,619

5,38

90

11

80,478

9,52

92

15

87,35

4,65

75

8

75,324

-0,32

78

8,5

76,183

1,81

80

9

77,042

2,96

92

15

87,35

4,65

65

5

70,17

-5,17

72

6

71,888

0,11

77

8

75,324

1,68

86

15

87,35

-1,35

88

15

87,35

0,65

95

25

104,53

-9,53

Yukarıdaki Tablo 3.5’te çalışan performansı
tahmin modelinin hata terimleri gösterilmiştir.
6. Modelin Açıklama Gücünün Bulunması: Modelin açıklama gücü bağımlı değişkenin
kareler toplamını, regresyon kareler toplamı ile

hata terimi kereler toplamına ayrıştırması ile bulunabilir. Modelin açıklama gücü ise regresyon
kareler toplamının bağımlı değişken kareler toplamına oranı ile ifade edilir. Matematiksel olarak
gösterimi aşağıda sunulmuştur.

TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI

57


[pdf 11]

ÜÇÜNCÜ BÖLÜM

SSR =

SST =

= (70,17

– 80,60) + (78,76 – 80,60) + …
2

SSR =

– 80,60)

SSE =

2

= 1.140,58

SST: Bağımlı Değişken Kareler Toplamı

SSE =

Buna göre modelin açıklama gücü:

SSE: Hata Terimi (Açıklanamayan Kısım) Kareler Toplamı

R2 =

SST = SSR + SSE olduğundan, her iki tarafı
SST ile bölersek,
1=

+

=

(-14,17)2 + (-0,76)2 + … + (-9,53)2 = 499,02

SSR: Regresyon Kareler Toplamı

=

= 0,6956

Böylece ücret artış oranı, çalışan performansının %69,56’lık kısmını açıklamaktadır.

‘dir.

Diğer üç adım bilgisayar programı araçlığıyla

Modelin açıklama gücü R ile ifade edilir:
2

hesaplanmıştır.
7. Modelin Hipotez Testi (Anlamlılığı): Mo-

R2 =
R2 , 1’e yaklaştıkça modelin açıklama gücü artmaktadır.

delin anlamlılık testi F dağılımı gösterir. Buna
göre bir regresyon modelinin anlamlılığı bağımsız değişkenleri parametrelerinin popülasyonda

O halde, çalışan performansı tahmin modelinin açıklama gücü hesaplanabilir. Tablo 3.5’de
Yi,

+ (104,53

2

ve εt değerleri gösterilmektedir. Aşağıdaki

formüllerde bu değerler yerine yazılır.
SST =

= (56 –

80,60)2 + (78 – 80,60)2 + … +(95 – 80,60)2

en az birinin sıfırdan farklılığıyla test edilir. Buna
göre hipotez testi şöyle kurulabilir:
H0: Modelin açıklama gücü yoktur. β1 = 0
H1: Modelin açıklama gücü vardır. β1 ≠0
Bilgisayar programı aracılığıyla yapılan hesaplama sonucu aşağıdaki Tablo 3.6’da gösteril-

= 1.639,60

miştir.
Tablo 3.6. Regresyon Modelinin Anlamlılığı.

ANOVA
df

SS

MS

F

Anlamlılık F

Regresyon

1

1.140,58

1.140,58

29,7180

0,0001

Fark

13

499,02

38,38

Toplam

14

1.639,60

Yukarıdaki Tablo 3.6’da modelin anlamlılık
sonuçları gösterilmiştir. Anlamlılık F, 0,05’ten
küçük olduğundan kurulan model anlamlıdır.
Başka bir ifadeyle, çalışan performansı ve ücret
artışı arasında kurulan regresyon modeli %5 anlamlılık düzeyinde modelin açıklama gücü bulunmaktadır.
8. Parametrelerin Hipotez Testi: Parametrelerde hipotez testi, n-k-1 serbestlik derecesinde

58 TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI

t-dağılımı gösterir. Buna göre hipotez testi şöyle
kurulabilir:
H0: Ücret artış oranı çalışan performansını
açıklamaz. β1 = 0.
H1: Ücret artış oranı çalışan performansını
açıklama gücü vardır. β1 ≠ 0.
Bilgisayar programı ile elde edilen sonuç Aşağıdaki Tablo 3.7’de gösterilmiştir.


[pdf 12]

TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI

Tablo 3.7. Regresyon Modelinin Anlamlılığı ve Güven Aralıkları.
Katsayılar

Standart Hata

t Stat

P-değeri

Düşük %95

Yüksek %95

Kesişim

61,58

3,84

16,05

0,0000

53,30

69,88

Ücret Artışı (%)

1,7180

0,31

5,45

0,0001

1,0371

2,3989

Yukarıdaki Tablo 3.7’de parametrelerin an-

9. Parametrelerin Güven Aralığı: Paramet-

lamlılık sonuçları ve güven aralıkları gösteril-

relerin %95 güven aralığındaki değerleri Tablo

miştir. Anlamlılık P, 0,05’ten küçük olduğundan

3.6’da gösterilmiştir. Buna göre:

ücret artış oranı çalışan performansını açıklamaz

1,0371 < β1 < 2,3989

yönündeki hipotezi reddedilir. Diğer bir ifadeyle, ücret artış oranı çalışan performansını açık-

53,30 < β0 < 69,88

lama gücü olduğuna dair istatistiksel bağlamda

arasında değer alır.

kanıtlar bulunmaktadır.

3.3. Örnek Olay: Çoklu Regresyon Çözümlemesi
Örnek olaydaki A işletmesinin çalışan perfor-

Bilimsel temelli bağımlı bağımsız değişken

mansını etkileyen unsurları olan ücret artış oranı

açıklaması ve korelasyon analizi daha önceki kı-

ve eğitim harcamasını regresyon analizi ile ince-

sımlarda açıklanmıştır.

lenebilir.

Diğer işlem adımları bilgisayar programı ile

Basit regresyon modelinin çözümünde sunu-

çözümlemesinin ardından yorumlanabilir. Aşa-

lan işlem adımları çoklu regresyon modelinde de

ğıdaki Tablo 3.8’de çalışan performansı çoklu

uygulanabilir.

regresyon modeli çözüm tablosu sunulmuştur.
Tablo 3.8. Çalışan Performansı Çoklu Regresyon Modeli Sonucu.

Regresyon İstatistikleri
Çoklu R

0,9263

R Kare

0,8580

Ayarlı R Kare

0,8344

Standart Hata

4,4040

Gözlem

15

ANOVA
Regresyon

df

SS

MS

F

Anlamlılık F

2

1.406,85

703,43

36,27

0,00001

19,40

Fark

12

232,75

Toplam

14

1.639,60

Katsayılar

Standart Hata

t Stat

P-değeri

Düşük %95

Yüksek %95

Kesişim

41,69

6,02

6,92

0,000016

28,56

54,81

Ücret Artışı (%)

1,31

0,25

5,22

0,000214

0,76

1,85

Eğitim Harcaması
(milyon TL)

8,28

2,24

3,71

0,003007

3,41

13,15

TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI

59


[pdf 13]

ÜÇÜNCÜ BÖLÜM

3. Regresyon Modelinin Kurulması: Bağımlı
değişken çalışan performansı, bağımsız değişken

Tablo 3.8’de gösterilmiştir. Buna göre, regresyon
tahmin modeli aşağıda gösterilmiştir:

ise ücret artış oranı ve eğitim harcaması oldu-

= 41,63 + 1,31 X1 + 8,28 X2

ğundan regresyon modeli şu şekilde kurulabilir:

: Tahmini çalışan performansını ifade

Y = β0 + β1X1 + β2X2 + ε

eder.

Y : Çalışan Performansı

Bu kapsamda, çalışan performansına dair çok
değişkenli regresyon modeli kurulmuştur. Ör-

X1: Ücret Artış Oranı
X2: Eğitim Harcaması (milyon TL)
β0, β1, β2 : Parametreler

neğin iş analisti bir uygulama geliştirerek insan
kaynakları bölümüne ücret artış oranı ve eğitim
harcaması tahminlerine göre çalışan performan-

ε : Hata Terimi

sını tahmin edebilir. Aşağıdaki Şekil 3.4’te iş ana-

4. Regresyon Modelinin Çözümlenmesi: Bilgisayar programı aracılığıyla çözümlenmiş ve

listinin geliştirdiği tahmin uygulaması gösterilmiştir.

Şekil 3.4. Çalışan Performansı Tahmin Modeli Uygulaması.
Yukarıdaki Şekil 3.4’te çalışan performansı
tahmin modeli uygulaması gösterilmiştir. Buna
göre ücret artış oranı %10 ve eğitim harcaması 2,5
milyon TL gerçekleşirse çalışan performansının
75,43 olacağı öngörülmüştür.
= 41,63 + 1,31×10 + 8,28 × 2,50 = 75,43
5. Hata Terimlerinin Bulunması: İlk iki gözlem değeri hata terimi aşağıda hesaplanmıştır.
Diğer gözlemlerin hata teriminin hesaplanması
okuyucuya bırakılmıştır. Aşağıda gösterilen formül yardımıyla hesaplanır.
εt = Yi -

;

Örneğin birinci gözlem değerinin hata terimi:
ε1 = Y1 – (41,63 + 1,31 X1 + 8,28 X2)
Çalışan performansının birinci gözlem değeri
56, ücret artış oranının birinci gözlem değeri 5

60 TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI

ve eğitim harcamasının birinci gözlem değeri 1
denklemde yerine yazılır.
ε1 = 56 – (41,63 + (1,31×5) + (8,28 × 1)) = 56 –
56,46 = -0,46
Benzer şekilde ikinci hata terimi:
ε2 = 78 – (41,63 + (1,31×10) + (8,28 × 3)) = 78 –
79,57 = -1,57 bulunur.
6. Modelin Açıklama Gücünün Bulunması:
Temel regresyon modelinde açıklama gücü R2
gösterilmiştir. Ancak, çoklu regresyonda her bir
değişken eklendiğinde matematiksel işlemlerden
kaynaklanan nedenlerden R2 yükselir. Böylelikle R2 gerçek açıklama gücü açıklamayabilir. Bu
durumda R2 düzeltilerek hesaplanır ve modelin
açıklama gücü olarak ayarlı R Kare ve Düzeltilmiş
R Kare kullanılır. O halde, çalışan performansını
ücret artış oranı ve eğitim harcaması %83,44’ünü


[pdf 14]

TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI

açıklamaktadır. Bu değer Tablo 3.8’de gösterilen

sını hem ücret artış oranı hem de eğitim harca-

Ayarlı R kare değerinde görülebilir.

masının açıklama gücü olduğuna dair güçlü ista-

7. Modelin Hipotez Testi (Anlamlılığı): Çalı-

tistiksel kanıtlar bulunmaktadır.
9. Parametrelerin Güven Aralığı: Paramet-

şan performansı çoklu regresyonu model hipotez testi aşağıda gösterilmiştir.

relerin %95 güven aralığındaki değerleri Tablo
3.8’de gösterilmiştir. Buna göre:
28,56 < β0 < 54,81

H0: Modelin açıklama gücü yoktur. β1 = β2 = 0

0,76 < β1 < 1,85

H1: Modelin açıklama gücü vardır. En az bir
βi ≠0 i =1,2

3,41 < β2 < 13,15

Tablo 3.8’de kurulan regresyon modelinin

arasında değer alır.

Anlamlılık F değeri 0,05’den küçük olduğundan
modelin açıklama gücü yoktur hipotezi (H0) red-

Bu çerçevede, A işletmesinin çalışan perfor-

dedilir. Başka bir ifadeyle, çalışan performansı
bağımlı değişkenini, ücret artış oranı ve eğitim
harcamaları bağımsız değişkenlerinden en az birinin açıkladığına dair güçlü kanıtlar vardır.
8. Parametrelerin Hipotez Testi: β0, β1 ve β2 parametreleri için Tablo 3.8’de görülen P-değeri
0,05’den küçük olduğundan, çalışan performan-

mansını etkileyen ücret artışı oranı ile eğitim
harcaması unsurları çoklu regresyon analizi yoluyla incelenmiştir.
Bu bölümden sonra iş analitiğinin karar destek sistemlerinde kullanılan modelleri işlenecektir.

TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI

61


[pdf 15]

ÜÇÜNCÜ BÖLÜM

BÖLÜM ÖZETİ
Bu bölümde iş analitiğinin tahminleyici kısmı anlatılmıştır. Bu çerçevede, işletmedeki probleme ilişkin
değişkenler arası ilişki öncelikle bilimsel açıdan ele alınmıştır. Bu bağlamda, bölüm değişkenlerin birbirleriyle ilişkisi istatistik metotlarından korelasyon analizi ile anlatılmıştır.
Daha sonra değişkenlerin neden-sonuç ilişkisi regresyon analizi ile gösterilmiştir. Böylece elde edilen regresyon modeli aracılığıyla işletmedeki probleme ilişkin tahminlemede bulunulabileceği gösterilmiştir.
Bir işletmedeki insan kaynağı bölümündeki örnek olaylar üzerinden konu anlatılmıştır. Bu çerçevede:
• Bağımlı Değişken: Sonuç değişkeni olarak adlandırılabilir. Örnek olayda çalışan performansı; ücret artış oranı ve eğitim harcamalarından etkilendiğinden bağımlı değişken çalışan performansı olarak
varsayılmıştır. Başka bir ifadeyle, ücret artış oranı ve eğitim harcamaları, çalışan performansını açıklandığından çalışan performansı bağımlı değişkendir. Bağımlı değişkene açıklanan değişken de denir.
• Bağımsız Değişken: Neden değişkeni olarak adlandırılabilir. Örnek olayda ücret artış oranı ve
eğitim harcamaları nedeniyle çalışan performansı etkilendiğinden neden değişkenleri ücret artış oranı
ve eğitim harcamalarıdır. Böylece bağımsız değişken ücret artış oranı ve eğitim harcamalarıdır.
İşletmeye ilişkin problemde bağımlı ve bağımsız değişkenler bilimsel açıdan belirlendikten sonra
korelasyon analizi ile istatistiksel açıdan birbirleriyle olan ilişkileri anlatılmıştır.
Son olarak regresyon analizleri yardımıyla nedenselliğinin incelemesi yapılmıştır. Bu kapsamda,
basit regresyon ve çoklu regresyon modelleri elde edilmiştir. Böylece işletmedeki performans problemine ilişkin öngörülerde bulunulmuştur.

62 TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI


[pdf 16]

TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI

GÖZDEN GEÇİRELİM
1.

I. İşletmedeki probleme ilişkin değiş-

3. I. Korelasyon katsayısı iki değişken ara-

kenlerin birbirleriyle olan ilişkilerini sa-

sındaki ilişkinin yönünü gösterir.

dece istatistik açısından ele alır

II. Korelasyon katsayısı iki değişken ara-

II. İşletmedeki probleme ilişkin değiş-

sındaki ilişkinin gücünü göste-rir.

kenlerin nedensellik ilişkisini araştırır

III. Korelasyon katsayısı ile bağımlı ve

III. İşletmedeki probleme ilişkin öngö-

bağımsız değişken belirlenir

rüde bulunabileceği bir matemetiksel

Yukarıdaki korelasyon katsayısı ile ilgili

model elde edilebilir

ifadelerden hangisi ya da hangi-leri doğ-

Yukarıdaki ifadelerden hangisi ya da

rudur?

hangileri tahminleyici iş analitiği kapsa-

a.

mında doğrudur?
a.

Yalnız I

b. Yalnız II
c.

Yalnız III

d. II ve III
e.

Yalnız I

b. Yalnız II
c.

I ve II

d. I ve III
e.

II ve III

I ve III

4. İş analisti işletmedeki probleme ilişkin
regresyon modelini R = 15 X1 + 20 X2
bulmuştur. Böylelikle bir program uygulaması geliştirmiştir.
X1:

10

X2:

5

Sonuç:

2. Bir işletmedeki probleme ilişkin değişkenlerin birbrileriyle olan ilişkisini he-

Yukarıda gösterilen programa işletme-

saplamak isteyen iş analisti, SSXY = 45,

deki ilgili personel birinci değişkene 10,

SSX = 60 ve SSY = 135 bulmuştur. Buna

ikinci değişkene 5 değerini girer ise so-

göre X ve Y değişkenleri arasındaki ko-

nuç kısmı aşağıdakilerden hangisinde

relasyon katsayısı kaçtır?

doğru olarak ifade edilir?

a.

a)

0,10

100

b. 0,20		

b) 150

c.

c)

0,30		

200

d. 0,40		

d) 250

e.

e) 300

0,50

TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI

63


[pdf 17]

ÜÇÜNCÜ BÖLÜM

5.

Basit regresyon modelinde bağımlı de-

8 ve 9. Soruyu aşağıdaki tabloya göre

ğişkenin ortalaması 50, bağımsız değiş-

cevaplayınız.

kenini ortalaması 20 ve parametresi 1 ise

Katsayılar

β0 kaçtır?
a.

10

Katsayılar

t Stat

P-değeri

Kesişim

5,00

3,36

0,02

b. 20

A değişkeni

3,20

4,03

0,01

c.

B değişkeni

4,80

2,90

0,03

30

d. 40
e.

8. A değişkeni 5, B değişkeni 2 değerindey-

50

ken bağımlı değişkenin değeri kaçtır?
a.
6. I. Katsayıların hipotez testi Ki-kare dağı-

20,60

b. 25,60

lımı ile tespit edilir.

c.

28,60

II. Regresyon modelinde modelin açık-

d. 30,60

lama gücü R2 değeri ile tespit edi-lir.

e.

32,60

III. Regresyon modelinin açıklama gücünün olup olmadığı Anlamlılık F

de-

ğerine bakılarak tespit edilebilir.
Regresyon analizi hipotez testleri kapsamında yukarıdaki ifadelerden hangisi ya
da hangileri doğru ifadedir?
a.

Yalnız I

9. I. A değişkeni katsayısı %5 anlamlılık düzeyinde sıfırdan farklı olduğun-da dair
güçlü kanıtlar vardır.
II. B değişkeni katsayısı %5 anlamlılık
düzeyinde sıfırdan farklı oldu-ğunda
dair güçlü kanıtlar vardır.

b. Yalnız II

III. Kesişim değeri %5 anlamlılık düze-

c.

yinde sıfırdır.

I ve II

d. I ve III
e.

II ve III

Yukarıdaki katsayıların hipotez testleriyle ilgili ifadelerden hangisi ya da hangileri doğru ifadedir?
a.

Yalnız I

b. Yalnız II
7.

Bağılı değişkenin bağımsız değişkenler
tarafından açıklanamayan kısmı-nı ifa-

c.

d. I ve III

de eden kavram aşağıdakilerden hangi-

e.

sinde doğru olarak ifade edil-miştir?

a. 1

a.

Açıklayıcı değişken

d. Açıklanan değişken
e.

II ve III
b. 2

c. 3

d. 4

e. 5

En küçük kareler yöntemi

b. Bağımsız değişken
c.

I ve II

Hata terimi

10. İki değişken arasında ilişkinin yönün pozitif ise korelasyon katsayısı aşağıdakilerden hangisi olabilir?
a. -2

b.-0,8

d.0,8

e.2

Yanıt Anahtarı: 1-D ,2-E, 3-C, 4-D, 5-C, 6-E, 7-E, 8-D, 9-C, 10-D
64 TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI

c.0


[pdf 18]

TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI

Sözlük
Korelasyon Analizi
Değişkenlerin birbirleriyle olan ilişkinin yönünü ve gücü gösteren analizdir

Korelasyon Katsayısı
İki değişken arasındaki ilişkinin yönünü ve gücünü gösteren katsayıdır.

Regresyon Analizi
Bilimsel olarak açıklanabilen nedenselliğin istatistik olarak gösterilme metodu şeklidir. Aynı
zamanda probleme ilişkin tahminleyici model olarak kullanılabilmesidir.

Parametre
Regresyon modelindeki katsayılardır.

Hata Terimi
Regresyon modeli kurulurken düşünülemeyen veya imkân dâhilinde olmayan ancak bağımlı
değişkeni etkileyen unsurlardır.

En Küçük Kareler Yöntemi (EKK)
Hata terimlerinin kareler toplamını en küçük yapan yöntemdir.

Basit Regresyon Modeli
Tek bağımsız ve tek bağımlı değişkene yönelik kurulan model.

Çoklu Regresyon Modeli
İki veya daha fazla bağımsız ve tek bağımlı değişkene yönelik kurulan model.

Kaynakça
Anderson D., Sweeney D., Williams T., Camm J. and Martin K. (2012), Introduction to Management
Science Quantitative Approaches to Decision Making, Thirteenth Edition, South-Western.
Agresti A. (2018), Statistical Methods for the Social Sciences, Fifth Edition, Pearson.
Buglear, Stephan P., Arnoldo C. Hax and Thomas L. Magnanti (1977), Applied Mathematical Programming, Addison-Wesley.
Casella G. (2008), Statistical Design, First Edition, Springer.
Gupta R. (2015), Operations Research, Thirty Fourth Edition, Krishna.
Grinstead M.C. ve Snell J.L (2012), Introduction to Probabilty, American Mathematical Soc.
Gujarati D.N., Temel Ekonometri (Çeviren: Şenesen, Ü ve Şenesen G.G.), Yedinci Baskı, Literatür Yayıncılık.
Hillier F. and Lieberman G. (2001), Introduction to Operations Research, Seventh Edition, McGraw
Hill.
Hillier, F. and Hillier, M. (2013), Introduction to Management Science, McGraw Hill.
Krzanowski W.J. (2007), Statistical Principles and Techniques in Scientific and Social Investigations,
First Edition, Oxford.
Kwak, N.K., Mathematical Programming with Business Application, McGraw Hill.

TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI

65


[pdf 19]

ÜÇÜNCÜ BÖLÜM

Lawrence J. and Pasternack B. (2002), Applied Management Science, Second Edition, John Wiley.
Luenberger D. and Ye Y. (2008), Linear and Nonlinear Programming, Third Edition, Springer.
Newbold P. (2006), İşletme ve İktisat için İstatistik (Çeviren: Şenesen, Ü.), Beşinci Baskı, Literatür Yayıncılık.
Nesselroade P.K. ve Grimm L.G. (2019), Statistical Applications for the Behavioral and Social Sciences,
Second Edition, Wiley.
Sarıaslan H., Karacabey A. ve Gökgöz F. (2017), Nicel Karar Alma Yöntemleri, Siyasal Kitabevi.
Tarling R. (2009), Statistical Modelling for Social Researchers, First Edition, Routledge.
Vanderbei R. (2008), Linear Programming, Third Edition, Springer.
Winston, Wayne L. and Albright Christian (2009), Practical Management Science, Revised Third Edition, Mason.

Faydalı Kaynaklar ve İnternet Siteleri
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

66 TAHMİNLEYİCİ VERİ ANALİZİ UYGULAMASI


[pdf 20]

