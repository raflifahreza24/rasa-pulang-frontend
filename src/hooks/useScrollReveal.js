import { useEffect, useRef } from 'react';

/**
 * Hook untuk memicu scroll reveal berbasis IntersectionObserver.
 * - Berjalan satu kali per elemen (reveal persisten).
 * - Menghormati prefers-reduced-motion.
 * - Membersihkan observer saat unmount.
 */
export function useScrollReveal(options = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Jika reduced motion aktif, langsung tampilkan semua tanpa animasi
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (containerRef.current) {
        const elements = containerRef.current.querySelectorAll('.reveal-init');
        elements.forEach((el) => el.classList.add('reveal-visible'));
      }
      return;
    }

    if (!('IntersectionObserver' in window)) {
      if (containerRef.current) {
        const elements = containerRef.current.querySelectorAll('.reveal-init');
        elements.forEach((el) => el.classList.add('reveal-visible'));
      }
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll('.reveal-init');
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return containerRef;
}
