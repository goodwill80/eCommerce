import { useContext, useRef, useEffect } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

function CartIcon() {
    const { toggle, isCartOpen, cartCount } = useContext(CartContext);
    const ref = useRef();

    // useEffect(()=>{
    //     const checkedIFClickedOutOfCart = e => {
    //         if( isCartOpen && ref.current && !ref.current.contains(e.target)) {
    //             toggle();
    //         }
    //     }
    //     document.addEventListener("mousedown", checkedIFClickedOutOfCart);
    //     return ()=> {
    //         document.removeEventListener("mousedown", checkedIFClickedOutOfCart);
    //     }
    // }, [isCartOpen])
    
  

  return (
    <div className="cart-icon-container" ref={ref}>
      <ShoppingIcon className="shopping-icon"
                    onClick={()=>toggle()} />
      <span className="item-count">{cartCount}</span>
    </div>
  )
}

export default CartIcon;
