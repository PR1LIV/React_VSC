import { useEffect, useState } from 'react';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('http://localhost:3001/products');
      if (!response.ok) {
        throw new Error('Не удалось загрузить товары');
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function getNextId(products) {
    if (products.length === 0) return 1;
    return Math.max(...products.map((product) => Number(product.id))) + 1;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const numericPrice = Number(price);

    if (!trimmedTitle) {
      setError('Введите название товара');
      return;
    }

    if (!price || Number.isNaN(numericPrice) || numericPrice <= 0) {
      setError('Введите корректную цену');
      return;
    }

    const newProduct = {
      id: getNextId(products),
      title: trimmedTitle,
      price: numericPrice,
    };

    try {
      setError('');

      const response = await fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Не удалось добавить товар');
      }

      const createdProduct = await response.json();

      setProducts((prev) => [...prev, createdProduct]);

      // сброс формы
      setTitle('');
      setPrice('');
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return <p>Загрузка товаров...</p>;
  }

  return (
    <div>
      <h2>Список товаров</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Название товара"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Цена"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit">Добавить</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {products.length === 0 ? (
        <p>Товаров пока нет</p>
      ) : (
        <ul>
            {products.map((product, index) => (
              <li key={product.id}>
                {index + 1}. {product.title} — {product.price} ₽
              </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Products;