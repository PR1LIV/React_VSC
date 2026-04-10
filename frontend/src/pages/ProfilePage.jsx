import Products from '../Products';

function ProductsPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Товары</h2>
      <div style={{ fontSize: '60px' }}>🛒</div>

      <Products />
    </div>
  );
}

export default ProductsPage;