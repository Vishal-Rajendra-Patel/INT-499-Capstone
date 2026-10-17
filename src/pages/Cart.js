import { Trash2, Plus, Minus } from 'lucide-react';

function Cart({ cart, onRemove, onUpdateQty }) {
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="page-container">
      <h1>Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is currently empty.</p>
      ) : (
        <div className="cart-container">
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-img-container">
                  <img
                    src={item.img}
                    alt={item.service}
                    className="cart-item-img"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>

                <div className="cart-item-details">
                  <h4>{item.service}</h4>
                  <p>${item.price.toFixed(2)} each</p>
                </div>

                <div className="quantity-controls">
                  <button onClick={() => onUpdateQty(item.id, -1)}>
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateQty(item.id, 1)}>
                    <Plus size={16} />
                  </button>
                </div>

                <div className="cart-item-subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button className="remove-btn" onClick={() => onRemove(item.id)}>
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;