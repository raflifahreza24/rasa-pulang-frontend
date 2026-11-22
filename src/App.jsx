import { useState, useEffect, useCallback } from 'react';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import { defaultStaffUser } from './data/demoUser';

export default function App() {
  const [authUser, setAuthUser] = useState(null);
  const [currentPath, setCurrentPath] = useState(() => {
    return typeof window !== 'undefined' ? window.location.pathname : '/';
  });

  // Dengarkan event popstate browser (tombol Back / Forward)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Router handler navigasi aplikasi
  const navigate = useCallback((targetUrl) => {
    if (!targetUrl) return;

    // Jika target adalah anchor di halaman beranda (misal '/#kontak')
    if (targetUrl.includes('#')) {
      const hash = targetUrl.substring(targetUrl.indexOf('#'));
      if (currentPath === '/' || currentPath === '') {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      } else {
        // Dari halaman lain menuju beranda dengan anchor
        window.history.pushState(null, '', targetUrl);
        setCurrentPath('/');
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
        return;
      }
    }

    // Normalisasi pathname
    const cleanPath = targetUrl.split('?')[0];
    if (cleanPath === currentPath && !targetUrl.includes('?')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    window.history.pushState(null, '', targetUrl);
    setCurrentPath(cleanPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath]);

  // Routing sederhana berbasis pathname
  if (currentPath.startsWith('/produk')) {
    let slug = currentPath.replace(/^\/produk\/?/, '');
    if (!slug && typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      slug = params.get('slug') || params.get('product') || 'keripik-pisang-original-250-g';
    }
    return <ProductDetailPage slug={slug} onNavigate={navigate} />;
  }

  if (currentPath.startsWith('/katalog')) {
    return <CatalogPage onNavigate={navigate} />;
  }

  if (currentPath.startsWith('/tentang-kami')) {
    return <AboutPage onNavigate={navigate} />;
  }

  if (currentPath.startsWith('/kontak')) {
    return <ContactPage onNavigate={navigate} />;
  }

  if (currentPath.startsWith('/login')) {
    return <LoginPage onNavigate={navigate} onLoginSuccess={(u) => setAuthUser(u)} />;
  }

  if (currentPath.startsWith('/admin') || currentPath.startsWith('/dashboard')) {
    let userToUse = authUser;
    if (typeof window !== 'undefined' && !userToUse) {
      const params = new URLSearchParams(window.location.search);
      const roleParam = params.get('role');
      if (roleParam === 'staff' || roleParam === 'staf') {
        userToUse = defaultStaffUser;
      }
    }
    let initialTab = 'ringkasan';
    let editProductId = null;

    // Cek rute Sampah Produk: /dashboard/produk/sampah atau /admin/produk/sampah
    const editMatch = currentPath.match(/\/(?:dashboard|admin)\/produk\/([^/]+)\/edit/);
    if (currentPath.includes('/profil') || currentPath.includes('/profile')) {
      initialTab = 'profil';
    } else if (currentPath.includes('/pengguna') || currentPath.includes('/users')) {
      initialTab = 'pengguna';
    } else if (currentPath.includes('/pengaturan')) {
      initialTab = 'pengaturan';
    } else if (currentPath.includes('/konten')) {
      initialTab = 'konten';
    } else if (currentPath.includes('/sampah')) {
      initialTab = 'sampah';
    } else if (editMatch) {
      initialTab = 'edit-produk';
      editProductId = editMatch[1];
    } else if (currentPath.includes('/produk/edit')) {
      initialTab = 'edit-produk';
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        editProductId = params.get('id') || '1';
      } else {
        editProductId = '1';
      }
    } else if (currentPath.includes('/kategori')) {
      initialTab = 'kategori';
    } else if (currentPath.includes('/produk/tambah') || currentPath.includes('/tambah-produk')) {
      initialTab = 'tambah-produk';
    } else if (currentPath.includes('/produk')) {
      initialTab = 'produk';
    }
    return (
      <DashboardPage
        onNavigate={navigate}
        user={userToUse}
        initialTab={initialTab}
        editProductId={editProductId}
      />
    );
  }

  return <HomePage onNavigate={navigate} />;
}
