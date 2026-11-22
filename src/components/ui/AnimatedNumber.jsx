import { useState, useEffect, useRef } from 'react';

/**
 * AnimatedNumber Component
 * Menganimasikan angka dan nominal mata uang secara bertahap (count-up / roll-up)
 * dengan easing lembut saat komponen pertama kali dimuat atau di-refresh.
 *
 * @param {number|string} value - Angka target yang akan dicapai
 * @param {number} duration - Durasi animasi dalam milidetik (default: 800ms)
 * @param {'number'|'currency'} format - Format penampilan ('number' atau 'currency' Rupiah)
 * @param {string} prefix - Karakter awalan opsional
 * @param {string} suffix - Karakter akhiran opsional (contoh: " produk", " kategori")
 * @param {function} formatter - Fungsi custom pemformat jika dibutuhkan
 * @param {string} className - Kelas CSS tambahan
 */
export default function AnimatedNumber({
  value,
  duration = 800,
  format = 'number',
  prefix = '',
  suffix = '',
  formatter,
  className = '',
}) {
  const numericTarget = typeof value === 'number'
    ? value
    : parseFloat(String(value).replace(/[^0-9.-]+/g, '')) || 0;

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [currentValue, setCurrentValue] = useState(() =>
    prefersReduced ? numericTarget : 0
  );
  const frameRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    // Hormati prefers-reduced-motion untuk aksesibilitas
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      frameRef.current = requestAnimationFrame(() => {
        setCurrentValue(numericTarget);
      });
      return () => {
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
      };
    }

    startTimeRef.current = null;

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Easing: easeOutExpo (gerakan cepat di awal lalu melambat secara halus di akhir)
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const calculated = Math.round(easedProgress * numericTarget);

      setCurrentValue(calculated);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [numericTarget, duration]);

  const renderContent = () => {
    if (formatter && typeof formatter === 'function') {
      return formatter(currentValue);
    }

    if (format === 'currency') {
      const formattedCurrency = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(currentValue).replace(/\s+/g, '');
      return `${prefix}${formattedCurrency}${suffix}`;
    }

    return `${prefix}${currentValue.toLocaleString('id-ID')}${suffix}`;
  };

  return (
    <span className={`animated-number ${className}`}>
      {renderContent()}
    </span>
  );
}
