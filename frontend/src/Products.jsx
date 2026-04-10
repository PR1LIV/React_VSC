import { useEffect, useState } from 'react';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    try {
      setIsSubmitting(true);
      setError('');

      const newProduct = {
        title: trimmedTitle,
        price: numericPrice,
      };

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

      setProducts((prevProducts) => [...prevProducts, createdProduct]);
      setTitle('');
      setPrice('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
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
          onChange={(event) => setTitle(event.target.value)}
          style={{ marginRight: '10px' }}
        />

        <input
          type="number"
          placeholder="Цена"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          style={{ marginRight: '10px' }}
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Добавление...' : 'Добавить'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}

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