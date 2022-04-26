import { createContext, useState, useEffect } from 'react';
import useToogleHook from '../hooks/toggle.hook';

const addCartItem = (cartItems, productToAdd) => {
   const itemIsInCart = cartItems.find(item=>item.id === productToAdd.id)
   if (itemIsInCart) {
       return cartItems.map(item=> item.id === productToAdd.id ?
            {...item, quantity: item.quantity + 1} :
            item )
   } else {
       return [...cartItems, {...productToAdd, quantity: 1}];
   }
}

const CartContext = createContext();

function CartContextProvider(props) {
    const [ isCartOpen, toggle ] = useToogleHook();
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    // Add product to cart
    const addItemsToCart = (productToAdd)=>{
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    // Listener to set cart count
    useEffect(()=>{
        const totalQty = cartItems.reduce((total, item)=> total + item.quantity, 0);
        setCartCount(totalQty);
    }, [cartItems])

    const value = { isCartOpen, toggle, cartItems, addItemsToCart, cartCount };
  return (
    <CartContext.Provider value={value}>
        { props.children }
    </CartContext.Provider>
  )
}

export { CartContextProvider, CartContext };
