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
    const [ cartItems, setCartItems ] = useState([]);
    const [ cartCount, setCartCount ] = useState(0);
    const [ totalCost, setTotalCost ] = useState(0);

    // Add product to cart
    const addItemsToCart = (productToAdd)=>{
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    // Remove product from cart
    const deleteItemFromCart = (id)=> {
        const updatedList = cartItems.filter(item=> item.id !== id);
        setCartItems(updatedList);
    }

    // Listener to set cart item count
    useEffect(()=>{
        const totalQty = cartItems.reduce((total, item)=> total + item.quantity, 0);
        setCartCount(totalQty);
    }, [cartItems])
    // Listener to set cart total cost 
    useEffect(()=>{
        const cost = cartItems.reduce((total, item)=> total + (item.quantity * item.price), 0);
        setTotalCost(cost);
    }, [cartItems])


    // + qty in checkout Page ***Duplicate, we can recycle the code from addItemsToCart
    // const add = (id)=>{
    //     const addedItemList = cartItems.map(item=> item.id === id ? 
    //             {...item, quantity: item.quantity + 1} :
    //             item )
    //         setCartItems(addedItemList) }
    
    // - qty in checkout Page
    const subtract = (id)=>{
        const deletedItemList = cartItems.map(item=> item.id === id ?
                {...item, quantity: item.quantity - 1} :
                item )
            setCartItems(deletedItemList) }
    

    const value = { isCartOpen, 
                    toggle, 
                    cartItems, 
                    addItemsToCart, 
                    cartCount, 
                    subtract, 
                    deleteItemFromCart,
                    totalCost };
  return (
    <CartContext.Provider value={value}>
        { props.children }
    </CartContext.Provider>
  )
}

export { CartContextProvider, CartContext };
