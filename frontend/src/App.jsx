import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Counter from './Counter';
import Products from './Products';
import Image from './components/image';

function App() {
  const [showFooter, setShowFooter] = useState(true);
  const [site, setSite] = useState(null);

  useEffect(() => {
    alert('Привет!');
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/site')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Ошибка загрузки данных сайта');
        }
        return res.json();
      })
      .then((data) => setSite(data))
      .catch((err) => console.error(err));
  }, []);

  const toggleFooter = () => {
    setShowFooter(!showFooter);
  };

  if (!site) {
    return <p>Загрузка...</p>;
  }

  const logoUrl = `http://localhost:3001${site.logo}`;
  const bgUrl = `http://localhost:3001${site.background}`;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
      }}
    >
      <Image
        imageUrl={logoUrl}
        alt="Логотип сайта"
        style={{
          width: '120px',
          height: 'auto',
          display: 'block',
          marginBottom: '20px',
        }}
      />

      <Header
        title="Мой React проект"
        subtitle="Учебный проект на React"
      />

      <Counter />

      <Products />

      <button onClick={toggleFooter}>
        {showFooter ? 'Скрыть Footer' : 'Показать Footer'}
      </button>

      {showFooter && <Footer text="Мой сайт." />}
    </div>
  );
}

export default App;