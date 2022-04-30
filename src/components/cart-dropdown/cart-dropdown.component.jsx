import { useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartDropDownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles.jsx';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../contexts/cart.context';


function CartDropdown() {
    const { cartItems, toggle, isCartOpen } = useContext(CartContext);
    // const ref = useRef();
    // const ref2 = useRef();

    // useEffect(()=>{
    //     const checkedIFClickedOutOfCart = e => {
    //         if( isCartOpen && ref.current && 
    //             !ref.current.contains(e.target) && 
    //             !ref2.current.contains(e.target)) {
    //             toggle();
    //         }
    //     }
    //     document.addEventListener("mousedown", checkedIFClickedOutOfCart);
    //     return ()=> {
    //         document.removeEventListener("mousedown", checkedIFClickedOutOfCart);
    //     }
    // }, [isCartOpen, toggle])

  return (
    <CartDropDownContainer>
      <CartItems>
        { cartItems.length ? 
        cartItems.map(item=> (
          <CartItem
          key={item.id}
          cartItem={{...item}}
          />
      )) :
        <EmptyMessage>Your cart is empty</EmptyMessage>
      }
       
      </CartItems>

          <Link to='/checkout'>
             <Button>GO TO CHECKOUT</Button>
           </Link> 

      
 
        
         
 
     
   
    </CartDropDownContainer>
  )
}

export default CartDropdown;
