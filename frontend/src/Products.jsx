import { useEffect, useState } from 'react';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  function clearMessages() {
    setError('');
    setSuccessMessage('');
  }

  function getNextId(items) {
    if (items.length === 0) return 1;
    return Math.max(...items.map((item) => Number(item.id))) + 1;
  }

  async function fetchProducts() {
    try {
      setLoading(true);
      clearMessages();

      const response = await fetch('http://localhost:3001/products');

      if (!response.ok) {
        throw new Error('Не удалось загрузить список товаров');
      }

      const data = await response.json();

      const sortedProducts = data.sort((a, b) => Number(a.id) - Number(b.id));
      setProducts(sortedProducts);
    } catch (err) {
      setError(`Ошибка чтения: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setTitle('');
    setPrice('');
    setEditingId(null);
  }

  function startEdit(product) {
    clearMessages();
    setEditingId(product.id);
    setTitle(product.title);
    setPrice(String(product.price));
  }

  function cancelEdit() {
    clearMessages();
    resetForm();
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

    setIsSubmitting(true);
    clearMessages();

    try {
      if (editingId === null) {
        await createProduct(trimmedTitle, numericPrice);
      } else {
        await updateProduct(editingId, trimmedTitle, numericPrice);
      }

      resetForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function createProduct(productTitle, productPrice) {
    try {
      const newProduct = {
        id: getNextId(products),
        title: productTitle,
        price: productPrice,
      };

      const response = await fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Не удалось создать товар');
      }

      const createdProduct = await response.json();

      setProducts((prevProducts) =>
        [...prevProducts, createdProduct].sort(
          (a, b) => Number(a.id) - Number(b.id)
        )
      );

      setSuccessMessage('Товар успешно добавлен');
    } catch (err) {
      throw new Error(`Ошибка создания: ${err.message}`);
    }
  }

  async function updateProduct(id, productTitle, productPrice) {
    try {
      const response = await fetch(`http://localhost:3001/products/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: productTitle,
          price: productPrice,
        }),
      });

      if (!response.ok) {
        throw new Error('Не удалось обновить товар');
      }

      const updatedProduct = await response.json();

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? updatedProduct : product
        )
      );

      setSuccessMessage('Товар успешно обновлён');
    } catch (err) {
      throw new Error(`Ошибка обновления: ${err.message}`);
    }
  }

  async function deleteProduct(id) {
    clearMessages();

    const isConfirmed = window.confirm('Удалить этот товар?');

    if (!isConfirmed) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Не удалось удалить товар');
      }

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );

      if (editingId === id) {
        resetForm();
      }

      setSuccessMessage('Товар успешно удалён');
    } catch (err) {
      setError(`Ошибка удаления: ${err.message}`);
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
          {isSubmitting
            ? 'Сохранение...'
            : editingId === null
            ? 'Добавить'
            : 'Обновить'}
        </button>

        {editingId !== null && (
          <button
            type="button"
            onClick={cancelEdit}
            style={{ marginLeft: '10px' }}
          >
            Отмена
          </button>
        )}
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      {products.length === 0 ? (
        <p>Товаров пока нет</p>
      ) : (
        <ul>
          {products.map((product, index) => (
            <li key={product.id} style={{ marginBottom: '10px' }}>
              {index + 1}. {product.title} — {product.price} ₽

              <button
                onClick={() => startEdit(product)}
                style={{ marginLeft: '10px' }}
              >
                Редактировать
              </button>

              <button
                onClick={() => deleteProduct(product.id)}
                style={{ marginLeft: '10px' }}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Products;