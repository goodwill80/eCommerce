import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

function CartIcon() {
    const { toggle, isCartOpen, cartCount } = useContext(CartContext);

  return (
    <div className="cart-icon-container">
      <ShoppingIcon className="shopping-icon"
                    onClick={()=>toggle()} />
      <span className="item-count">{cartCount}</span>
    </div>
  )
}

export default CartIcon;
