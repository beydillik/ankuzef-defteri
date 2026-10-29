"""Bölüm içerikleri (özet, kartlar, karıştırılanlar, konu testi): her bölüm kendi dosyasında (b1.py, b2.py, ...).
Sayfa: basılı sayfa numarası. B1 s. 5–29, B2 s. 31–54, B3 s. 55–81, B4 s. 83–104, B5 s. 105–121, B6 s. 123–137.
Bölüm bitince uret.py'de BOLUM_LISTE'de hazir=True yapılır. Yarım bölüm (hazir=False) sitede görünmez."""
from b1 import B1
from b2 import B2
from b3 import B3
from b4 import B4
from b5 import B5
from b6 import B6

BOLUMLER = {"b1": B1, "b2": B2, "b3": B3, "b4": B4, "b5": B5, "b6": B6}
