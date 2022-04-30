import { useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../contexts/cart.context';


function CartDropdown() {
    const { cartItems, toggle, isCartOpen } = useContext(CartContext);
    const ref = useRef();
    const ref2 = useRef();

    useEffect(()=>{
        function checkedIFClickedOutOfCart(e) {
        if (isCartOpen && ref.current &&
          !ref.current.contains(e.target) &&
          !ref2.current.contains(e.target)) {
          toggle();
        }
      }
        document.addEventListener("mousedown", checkedIFClickedOutOfCart);
        return ()=> {
            document.removeEventListener("mousedown", checkedIFClickedOutOfCart);
        }
    }, [isCartOpen, toggle])

    const btnDisabled = ()=>{
      if(cartItems.length > 0) return false;
      if(cartItems.length < 1) return true;
    }

  return (
    <div className="cart-dropdown-container" ref={ref2}>
    <div className="cart-items">
      { cartItems.length ?
      cartItems.map(item=> (
          <CartItem
          key={item.id}
          cartItem={{...item}}
          />
      )) :
      <span>No items in cart</span>
      
      }
    </div>
    
            <Link ref={ref} to='/checkout'>
            <Button disabled={btnDisabled()}>Go TO CHECKOUT</Button>
            </Link> 
     
  
  </div>
)
}

export default CartDropdown;
