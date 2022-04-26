import { useContext } from 'react';
import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../contexts/cart.context';


function CartDropdown() {
    const { cartItems } = useContext(CartContext);

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        { cartItems.map(item=> (
            <CartItem
            key={item.id}
            cartItem={{...item}}
            />
        ))}
      </div>
      <Button>Go TO CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown;