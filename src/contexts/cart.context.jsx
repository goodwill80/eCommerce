import { createContext } from 'react';
import useToogleHook from '../hooks/toggle.hook';

const CartContext = createContext();

function CartContextProvider(props) {
    const [ isCartOpen, toggle ] = useToogleHook();
    const value = { isCartOpen, toggle };
  return (
    <CartContext.Provider value={value}>
        { props.children }
    </CartContext.Provider>
  )
}

export { CartContextProvider, CartContext };
