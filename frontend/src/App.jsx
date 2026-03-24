import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Counter from './Counter';
import Products from './Products';

function App() {
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    alert('Привет!');
  }, []);

  const toggleFooter = () => {
    setShowFooter(!showFooter);
  };

  return (
    <div>
      <Header
        title="Мой React проект"
        subtitle="Учебный проект на React"
      />

      <Counter />

      <Products />

      <button onClick={toggleFooter}>
        {showFooter ? 'Скрыть Footer' : 'Показать Footer'}
      </button>

      {showFooter && (
        <Footer text="Мой сайт." />
      )}
    </div>
  );
}

export default App;