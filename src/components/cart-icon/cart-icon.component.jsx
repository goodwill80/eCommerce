import { useContext, useRef, useEffect  } from 'react';
import { CartContext } from '../../contexts/cart.context';
import {ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles.jsx';


function CartIcon() {
    const { toggle, isCartOpen, cartCount } = useContext(CartContext);
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
    <CartIconContainer ref={ref}>
      <ShoppingIcon onClick={()=>toggle()} />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon;
