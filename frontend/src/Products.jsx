import { useEffect, useState } from 'react';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log('Ошибка загрузки товаров:', error));
  }, []);

  return (
    <div>
      <h2>Список товаров</h2>

      {products.length === 0 ? (
        <p>Товары загружаются...</p>
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