import { NavLink } from 'react-router-dom';
import { ListPlus, ShoppingCart, Info, Tag } from 'lucide-react';

function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>EZTechMovie: StreamList</h2>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" end>
            <ListPlus className="icon" /> StreamList
          </NavLink>
        </li>
        <li>
          <NavLink to="/subscriptions">
            <Tag className="icon" /> Subscriptions
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className="cart-link">
            <ShoppingCart className="icon" /> Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </NavLink>
        </li>
        <li>
          <NavLink to="/about">
            <Info className="icon" /> About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;