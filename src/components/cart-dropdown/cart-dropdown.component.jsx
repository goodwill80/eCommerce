import { useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../contexts/cart.context';


function CartDropdown() {
    const { cartItems, toggle, isCartOpen } = useContext(CartContext);
    const ref = useRef();

    useEffect(()=>{
        const checkedIFClickedOutOfCart = e => {
            if( isCartOpen && ref.current && !ref.current.contains(e.target)) {
                toggle();
            }
        }
        document.addEventListener("mousedown", checkedIFClickedOutOfCart);
        return ()=> {
            document.removeEventListener("mousedown", checkedIFClickedOutOfCart);
        }
    }, [isCartOpen])

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
        <Link to='/checkout' ref={ref}>
        <Button>Go TO CHECKOUT</Button>
        </Link>
    </div>
  )
}

export default CartDropdown;
