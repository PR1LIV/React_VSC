import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav style={{ marginBottom: '20px' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Главная</Link>
      <Link to="/products" style={{ marginRight: '10px' }}>Товары</Link>
      <Link to="/about" style={{ marginRight: '10px' }}>О нас</Link>
      <Link to="/profile">Профиль</Link>
    </nav>
  );
}

export default Navigation;