# ANKUZEF Defteri
Site işlerinde önce `ankuzef-defteri` skill'ini yükle (kopyası: docs/SKILL-ankuzef-defteri.md).
- Bütün işler `taslak` dalına; `main`'e onaysız gönderme (Netlify: canlı yayın 15 kredi).
- `public/<kod>/*.json` elle düzenlenmez: `araclar/<kod>/*.py` düzenle → `python3 araclar/<kod>/uret.py`.
- Test: `node araclar/test/atolye_stres.js`; `cd public && python3 -m http.server 8765 &` → `python3 araclar/test/akis.py`.
