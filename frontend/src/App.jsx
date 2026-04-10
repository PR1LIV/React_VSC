import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Navigation from './components/Navigation';
import Image from './components/Image';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const [showFooter, setShowFooter] = useState(true);
  const [site, setSite] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/site')
      .then(res => res.json())
      .then(data => setSite(data))
      .catch(err => console.error(err));
  }, []);

  const toggleFooter = () => {
    setShowFooter(!showFooter);
  };

  if (!site) return <p>Загрузка...</p>;

  const logoUrl = `http://localhost:3001${site.logo}`;
  const bgUrl = `http://localhost:3001${site.background}`;

  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: '100vh',
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '20px',
        }}
      >
        {/* 🔵 ЛОГО */}
        <Image
          imageUrl={logoUrl}
          style={{ width: '120px', marginBottom: '20px' }}
        />

        <Header
          title="Мой React проект"
          subtitle="Учебный проект"
        />

        {/* 🔗 МЕНЮ */}
        <Navigation />

        {/* 📄 СТРАНИЦЫ */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>

        <button onClick={toggleFooter}>
          {showFooter ? 'Скрыть Footer' : 'Показать Footer'}
        </button>

        {showFooter && <Footer text="Мой сайт." />}
      </div>
    </BrowserRouter>
  );
}

export default App;