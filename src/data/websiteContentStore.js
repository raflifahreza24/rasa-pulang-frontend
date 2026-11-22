/**
 * In-Memory Shared Store untuk Konten Website Rasa Pulang.
 * Digunakan untuk demo interaktif pengelolaan banner, cerita usaha, dan keunggulan.
 */

const INITIAL_WEBSITE_CONTENT = {
  banner: {
    title: 'Bawa Pulang Camilan, Bagikan Kehangatan.',
    intro: 'Temukan camilan favorit dan paket oleh-oleh untuk orang tersayang. Lihat pilihan kami, lalu pesan mudah melalui WhatsApp.',
    image: '/images/rasa-pulang/hero/hero-snacks.webp',
  },
  story: {
    text: `Rasa Pulang hadir dari keinginan sederhana: membantu orang menemukan camilan yang enak untuk dinikmati sendiri maupun dibagikan kepada orang tersayang.\n\nDikelola oleh Dina Prameswari di Sidoarjo, toko ini menghadirkan pilihan keripik, kerupuk, camilan manis dan gurih, hingga paket oleh-oleh. Kami melayani pembelian satuan dan paket untuk berbagi.`,
    image: '/images/rasa-pulang/store/store-interior.webp',
  },
  advantages: [
    {
      id: 'banyak-pilihan',
      icon: 'snack',
      title: 'Banyak Pilihan Camilan',
      description: 'Manis, gurih, hingga oleh-oleh khas daerah.',
    },
    {
      id: 'paket-berbagi',
      icon: 'gift',
      title: 'Paket untuk Berbagi',
      description: 'Pilihan oleh-oleh dan hampers untuk orang tersayang.',
    },
    {
      id: 'mudah-dipesan',
      icon: 'chat',
      title: 'Mudah Dipesan',
      description: 'Tanyakan produk dan pesan langsung melalui WhatsApp.',
    },
  ],
};

let currentWebsiteContent = JSON.parse(JSON.stringify(INITIAL_WEBSITE_CONTENT));
const listeners = new Set();

export function getWebsiteContent() {
  return JSON.parse(JSON.stringify(currentWebsiteContent));
}

export function updateWebsiteContent(newContent) {
  currentWebsiteContent = {
    banner: {
      ...currentWebsiteContent.banner,
      ...(newContent.banner || {}),
    },
    story: {
      ...currentWebsiteContent.story,
      ...(newContent.story || {}),
    },
    advantages: Array.isArray(newContent.advantages)
      ? newContent.advantages.map((adv, index) => ({
          ...currentWebsiteContent.advantages[index],
          ...adv,
        }))
      : currentWebsiteContent.advantages,
  };

  listeners.forEach((listener) => {
    try {
      listener(getWebsiteContent());
    } catch {
      // Ignore listener error
    }
  });

  return getWebsiteContent();
}

export function subscribeWebsiteContent(listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function resetWebsiteContent() {
  currentWebsiteContent = JSON.parse(JSON.stringify(INITIAL_WEBSITE_CONTENT));
  listeners.forEach((listener) => {
    try {
      listener(getWebsiteContent());
    } catch {
      // Ignore
    }
  });
  return getWebsiteContent();
}
