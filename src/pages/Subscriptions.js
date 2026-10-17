function Subscriptions({ items, onAddToCart }) {
  return (
    <div className="page-container">
      <h1>Subscriptions & Accessories</h1>
      <p>Select an EZTechMovie subscription or merchandise below:</p>

      <div className="products-grid">
        {items.map((item) => (
          <div key={item.id} className="product-card">
            <img
              src={item.img}
              alt={item.service}
              className="product-img"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <h3>{item.service}</h3>
            <p className="service-info">{item.serviceInfo}</p>
            <p className="price">${item.price.toFixed(2)}</p>
            <button
              className="add-btn"
              onClick={() => onAddToCart(item)}
            >
              ADD TO CART
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subscriptions;