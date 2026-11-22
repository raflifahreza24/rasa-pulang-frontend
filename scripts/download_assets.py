import os
import urllib.request
import urllib.parse
import json
import io
import time
from PIL import Image

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) RasaPulangPortfolioApp/1.0 (contact@rasapulang.local)'
}

# Daftar aset yang akan diunduh dengan kata kunci pencarian Wikimedia Commons & fallback
ASSETS_MAP = [
    # Hero (1200x825)
    {
        'path': 'public/images/rasa-pulang/hero/hero-snacks.webp',
        'width': 1200, 'height': 825,
        'keywords': ['indonesian snacks assortment', 'kue kering meja', 'snack gift basket', 'aneka kue kering']
    },
    # Store Interior & Front (1200x825)
    {
        'path': 'public/images/rasa-pulang/store/store-interior.webp',
        'width': 1200, 'height': 825,
        'keywords': ['bakery shop interior', 'traditional grocery store interior', 'toko oleh oleh display']
    },
    {
        'path': 'public/images/rasa-pulang/store/store-front.webp',
        'width': 1200, 'height': 825,
        'keywords': ['bakery storefront exterior', 'toko roti tampak depan', 'cozy storefront shop']
    },
    # Categories (800x800)
    {
        'path': 'public/images/rasa-pulang/categories/keripik-kerupuk.webp',
        'width': 800, 'height': 800,
        'keywords': ['keripik pisang', 'krupuk udang', 'banana chips']
    },
    {
        'path': 'public/images/rasa-pulang/categories/camilan-manis.webp',
        'width': 800, 'height': 800,
        'keywords': ['kue semprit', 'butter cookies jar', 'kue kering manis']
    },
    {
        'path': 'public/images/rasa-pulang/categories/camilan-gurih.webp',
        'width': 800, 'height': 800,
        'keywords': ['cheese sticks snack', 'stik bawang', 'fried peanuts snack']
    },
    {
        'path': 'public/images/rasa-pulang/categories/oleh-oleh-daerah.webp',
        'width': 800, 'height': 800,
        'keywords': ['bandeng crispy', 'fried fish fillet', 'ikan asin goreng']
    },
    {
        'path': 'public/images/rasa-pulang/categories/paket-hampers.webp',
        'width': 800, 'height': 800,
        'keywords': ['gift box hampers ribbon', 'snack gift box', 'hampers idul fitri']
    },

    # 40 Produk (800x800)
    {
        'path': 'public/images/rasa-pulang/products/keripik-pisang-original.webp',
        'width': 800, 'height': 800,
        'keywords': ['keripik pisang', 'crispy banana chips', 'banana chips bowl']
    },
    {
        'path': 'public/images/rasa-pulang/products/kerupuk-udang.webp',
        'width': 800, 'height': 800,
        'keywords': ['kerupuk udang', 'prawn crackers', 'krupuk udang goreng']
    },
    {
        'path': 'public/images/rasa-pulang/products/bandeng-crispy.webp',
        'width': 800, 'height': 800,
        'keywords': ['bandeng goreng', 'crispy fried fish', 'ikan bandeng goreng']
    },
    {
        'path': 'public/images/rasa-pulang/products/stik-bawang.webp',
        'width': 800, 'height': 800,
        'keywords': ['cheese sticks snack', 'stik keju', 'onion sticks snack', 'stik bawang']
    },
    {
        'path': 'public/images/rasa-pulang/products/keripik-pisang-cokelat.webp',
        'width': 800, 'height': 800,
        'keywords': ['chocolate chips cookie', 'chocolate banana chips', 'camilan cokelat']
    },
    {
        'path': 'public/images/rasa-pulang/products/kue-semprit.webp',
        'width': 800, 'height': 800,
        'keywords': ['kue semprit', 'spritz cookies', 'kue mentega dahlia']
    },
    {
        'path': 'public/images/rasa-pulang/products/paket-oleh-oleh-keluarga.webp',
        'width': 800, 'height': 800,
        'keywords': ['gift basket snacks', 'snack package box', 'parcel snack']
    },
    {
        'path': 'public/images/rasa-pulang/products/hampers-rasa-pulang.webp',
        'width': 800, 'height': 800,
        'keywords': ['gift box ribbon wrapped', 'hampers gift box', 'kotak hadiah pita']
    },
    {
        'path': 'public/images/rasa-pulang/products/keripik-singkong-balado.webp',
        'width': 800, 'height': 800,
        'keywords': ['keripik singkong balado', 'spicy cassava chips', 'keripik balado']
    },
    {
        'path': 'public/images/rasa-pulang/products/kacang-bawang.webp',
        'width': 800, 'height': 800,
        'keywords': ['kacang bawang', 'fried garlic peanuts', 'kacang goreng bawang']
    },
    {
        'path': 'public/images/rasa-pulang/products/kerupuk-ikan.webp',
        'width': 800, 'height': 800,
        'keywords': ['kerupuk ikan', 'fish crackers indonesian', 'krupuk ikan']
    },
    {
        'path': 'public/images/rasa-pulang/products/bagelen-mentega.webp',
        'width': 800, 'height': 800,
        'keywords': ['bagelen roti', 'toasted butter bread', 'rusk biscuit']
    },
    {
        'path': 'public/images/rasa-pulang/products/kerupuk-tengiri.webp',
        'width': 800, 'height': 800,
        'keywords': ['kerupuk tenggiri', 'krupuk tenggiri palembang', 'fish cracker']
    },
    {
        'path': 'public/images/rasa-pulang/products/keripik-tempe-renyah.webp',
        'width': 800, 'height': 800,
        'keywords': ['keripik tempe', 'tempeh chips', 'tempe goreng renyah']
    },
    {
        'path': 'public/images/rasa-pulang/products/kerupuk-puli-sidoarjo.webp',
        'width': 800, 'height': 800,
        'keywords': ['kerupuk puli', 'kerupuk beras', 'rice crackers']
    },
    {
        'path': 'public/images/rasa-pulang/products/keripik-sukun-gurih.webp',
        'width': 800, 'height': 800,
        'keywords': ['keripik sukun', 'breadfruit chips', 'keripik kentang gurih']
    },
    {
        'path': 'public/images/rasa-pulang/products/rempeyek-kacang.webp',
        'width': 800, 'height': 800,
        'keywords': ['rempeyek kacang', 'peyek kacang', 'rempeyek indonesian']
    },
    {
        'path': 'public/images/rasa-pulang/products/kerupuk-kulit-sapi.webp',
        'width': 800, 'height': 800,
        'keywords': ['kerupuk kulit', 'rambak sapi', 'kerupuk jangek']
    },
    {
        'path': 'public/images/rasa-pulang/products/madumongso-khas-jatim.webp',
        'width': 800, 'height': 800,
        'keywords': ['madumongso', 'dodol tape ketan', 'dodol manis']
    },
    {
        'path': 'public/images/rasa-pulang/products/roti-sisir-mentega.webp',
        'width': 800, 'height': 800,
        'keywords': ['pull apart bread', 'roti sobek mentega', 'brioche roll']
    },
    {
        'path': 'public/images/rasa-pulang/products/jenang-kudus-wijen.webp',
        'width': 800, 'height': 800,
        'keywords': ['jenang kudus', 'dodol wijen', 'sesame fudge']
    },
    {
        'path': 'public/images/rasa-pulang/products/pia-basah-cokelat-keju.webp',
        'width': 800, 'height': 800,
        'keywords': ['bakpia pathok', 'bakpia basah', 'pia cake']
    },
    {
        'path': 'public/images/rasa-pulang/products/ladu-manis-ketan.webp',
        'width': 800, 'height': 800,
        'keywords': ['kue mochi manis', 'kue ketan tradisional', 'laddu sweet']
    },
    {
        'path': 'public/images/rasa-pulang/products/bolu-kering-mini.webp',
        'width': 800, 'height': 800,
        'keywords': ['madeleine cake', 'bolu kering mini', 'egg drop biscuits']
    },
    {
        'path': 'public/images/rasa-pulang/products/kacang-telur-spesial.webp',
        'width': 800, 'height': 800,
        'keywords': ['kacang telur', 'coated peanuts', 'kacang atom']
    },
    {
        'path': 'public/images/rasa-pulang/products/pastel-kering-abon-sapi.webp',
        'width': 800, 'height': 800,
        'keywords': ['pastel mini abon', 'curry puff mini', 'pastel kering']
    },
    {
        'path': 'public/images/rasa-pulang/products/pangsit-goreng-renyah.webp',
        'width': 800, 'height': 800,
        'keywords': ['pangsit goreng', 'fried wonton crisps', 'crispy wonton']
    },
    {
        'path': 'public/images/rasa-pulang/products/emping-melinjo-manis-pedas.webp',
        'width': 800, 'height': 800,
        'keywords': ['emping melinjo', 'emping manis pedas', 'melinjo chips']
    },
    {
        'path': 'public/images/rasa-pulang/products/marning-jagung-gurih.webp',
        'width': 800, 'height': 800,
        'keywords': ['marning jagung', 'corn nuts roasted', 'jagung goreng gurih']
    },
    {
        'path': 'public/images/rasa-pulang/products/kacang-mede-asin-bawang.webp',
        'width': 800, 'height': 800,
        'keywords': ['kacang mede goreng', 'roasted cashew nuts', 'salted cashews']
    },
    {
        'path': 'public/images/rasa-pulang/products/bandeng-asap-khas-sidoarjo.webp',
        'width': 800, 'height': 800,
        'keywords': ['ikan asap', 'smoked fish whole', 'bandeng asap']
    },
    {
        'path': 'public/images/rasa-pulang/products/petis-udang-super-sidoarjo.webp',
        'width': 800, 'height': 800,
        'keywords': ['petis udang', 'shrimp paste jar', 'pasta udang bumbu']
    },
    {
        'path': 'public/images/rasa-pulang/products/sambal-petis-asli-sidoarjo.webp',
        'width': 800, 'height': 800,
        'keywords': ['sambal terasi bowl', 'chili dipping sauce', 'sambal petis']
    },
    {
        'path': 'public/images/rasa-pulang/products/terasi-udang-matang.webp',
        'width': 800, 'height': 800,
        'keywords': ['terasi udang', 'shrimp paste block', 'belacan block']
    },
    {
        'path': 'public/images/rasa-pulang/products/otak-otak-bandeng-siap-saji.webp',
        'width': 800, 'height': 800,
        'keywords': ['otak otak ikan', 'fish cake leaves', 'otak otak bakar']
    },
    {
        'path': 'public/images/rasa-pulang/products/krupuk-kupang-khas-sidoarjo.webp',
        'width': 800, 'height': 800,
        'keywords': ['kerupuk udang kecil', 'krupuk kupang', 'clam crackers']
    },
    {
        'path': 'public/images/rasa-pulang/products/paket-camilan-sore-berdua.webp',
        'width': 800, 'height': 800,
        'keywords': ['afternoon tea snacks', 'snack plate duo', 'tea time biscuits']
    },
    {
        'path': 'public/images/rasa-pulang/products/paket-oleh-oleh-gurih-renyah.webp',
        'width': 800, 'height': 800,
        'keywords': ['snack gift set box', 'crispy snacks assortment', 'oleh oleh pack']
    },
    {
        'path': 'public/images/rasa-pulang/products/hampers-manis-kenangan.webp',
        'width': 800, 'height': 800,
        'keywords': ['cookie gift box ribbon', 'sweet hampers box', 'parsel kue kering']
    },
    {
        'path': 'public/images/rasa-pulang/products/hampers-premium-khas-delta.webp',
        'width': 800, 'height': 800,
        'keywords': ['luxury gift basket', 'premium hampers idul fitri', 'exclusive gift box']
    },
]

def search_wikimedia_image(keyword):
    encoded = urllib.parse.quote(keyword)
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrsearch={encoded}&gsrlimit=6&prop=imageinfo&iiprop=url|mime"
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            for page in pages.values():
                info = page.get('imageinfo', [{}])[0]
                img_url = info.get('url')
                mime = info.get('mime', '')
                if img_url and any(mime.startswith(t) for t in ['image/jpeg', 'image/png', 'image/webp']):
                    return img_url
    except Exception as e:
        print(f"  [search fail] {keyword}: {e}")
    return None

def download_image_bytes(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=20) as resp:
        return resp.read()

def process_and_save(img_bytes, dest_path, target_w, target_h):
    img = Image.open(io.BytesIO(img_bytes))
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    w, h = img.size
    target_ratio = target_w / target_h
    current_ratio = w / h

    if current_ratio > target_ratio:
        new_w = int(h * target_ratio)
        left = (w - new_w) // 2
        box = (left, 0, left + new_w, h)
    else:
        new_h = int(w / target_ratio)
        top = (h - new_h) // 2
        box = (0, top, w, top + new_h)

    cropped = img.crop(box)
    resized = cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    resized.save(dest_path, 'WEBP', quality=85)

def main():
    print(f"Memulai pengunduhan {len(ASSETS_MAP)} aset gambar bebas hak cipta...")
    success_count = 0
    fallback_pool = []

    for idx, item in enumerate(ASSETS_MAP, 1):
        dest = item['path']
        w = item['width']
        h = item['height']
        print(f"[{idx}/{len(ASSETS_MAP)}] Mencari gambar untuk: {os.path.basename(dest)} ...")

        img_url = None
        for kw in item['keywords']:
            img_url = search_wikimedia_image(kw)
            if img_url:
                break
            time.sleep(0.2)

        img_bytes = None
        if img_url:
            try:
                img_bytes = download_image_bytes(img_url)
                if len(fallback_pool) < 5:
                    fallback_pool.append(img_bytes)
            except Exception as e:
                print(f"  Gagal unduh {img_url}: {e}")
                img_bytes = None

        if not img_bytes and fallback_pool:
            img_bytes = fallback_pool[idx % len(fallback_pool)]
            print(f"  Menggunakan fallback dari pool untuk {dest}")

        if img_bytes:
            try:
                process_and_save(img_bytes, dest, w, h)
                success_count += 1
            except Exception as e:
                print(f"  Gagal memproses {dest}: {e}")
        else:
            print(f"  [PERINGATAN] Tidak ada gambar yang berhasil ditemukan untuk {dest}")

        time.sleep(0.3)

    print(f"\nSelesai! Berhasil mengunduh dan memproses {success_count} dari {len(ASSETS_MAP)} gambar.")

if __name__ == '__main__':
    main()
