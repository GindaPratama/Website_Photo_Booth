Berdasarkan source code dengan STRIP_PAD = 12px di semua sisi:
Rumus:

Content width = Container width − (12 × 2) = Container − 24px
Photo width = (Content width − total gap) ÷ jumlah kolom

📐 Ukuran Lengkap Per Layout
Layout          Background (W × H)      Ukuran 1Foto
2-horizontal    300 × 125 px            134 × 101 px
3-vertical      180 × 387 px            156 × 117 px
4-vertical      180 × 510 px            156 × 117 px   
4-grid          240 × 240 px            105 × 105 px       
6-grid          240 × 456 px            105 × 140 px
9-grid          280 × 281 px            83 × 83 px

🔢 Cara hitungnya
2-horizontal — cols=2, gap=8px
foto_w = (300 - 24 - 8) ÷ 2 = 134px
foto_h = 134 × (3/4) = 101px
bg_h = 24 + 101 = 125px

3-vertical — cols=1, gap=6px × 2
foto_w = 300 - 24 = 156px
foto_h = 156 × (3/4) = 117px
bg_h = 24 + (117×3) + 12 = 387px

4-vertical — cols=1, gap=6px × 3
foto_w = 156px, foto_h = 117px
bg_h = 24 + (117×4) + 18 = 510px

4-grid — cols=2, gap=6px × 1
foto_w = (240-24-6) ÷ 2 = 105px
foto_h = 105 (square)
bg_h = 24 + (105×2) + 6 = 240px

6-grid — cols=2, gap=6px × 2 baris
foto_w = 105px
foto_h = 105 × (4/3) = 140px
bg_h = 24 + (140×3) + 12 = 456px

9-grid — cols=3, gap=4px × 2 (h&v)
foto_w = (280-24-8) ÷ 3 = 83px
foto_h = 83 (square)
bg_h = 24 + (83×3) + 8 = 281px

Untuk Figma: Export overlay PNG @3x maka kalikan semua angka × 3 agar retina-ready. Contoh background 2-horizontal = 900 × 375 px di Figma (@3x).

Ukuran thumbnail untuk Figma

Buat di **160 × 160 px** (square). Ini setara 2× dari tampilan di UI (80×80 CSS px) sehingga tajam di layar Retina/HiDPI. Export sebagai **PNG**, taruh di:
