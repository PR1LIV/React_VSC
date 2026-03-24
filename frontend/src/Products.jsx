import { useEffect, useState } from 'react';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Не удалось загрузить товары');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Загрузка товаров...</p>;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  return (
    <div>
      <h2>Список товаров</h2>

      {products.length === 0 ? (
        <p>Товаров пока нет</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.title} — {product.price} ₽
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Products;