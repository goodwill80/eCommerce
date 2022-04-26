import './checkout-item.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

function CheckOutItem({item}) {
    const { addItemsToCart, subtract, deleteItemFromCart } = useContext(CartContext);
    const { name, imageUrl, quantity, price, id } = item;
    
    const increaseQty = ()=>{
        addItemsToCart(item);
    }

    const subtractQty = ()=> {
        if(quantity <= 1) {
            remove(id);
        } else {
            subtract(id);
        }
    }

    const remove = ()=> {
        deleteItemFromCart(id);
    }
   
  return (
    <div className="checkout-item-container">
        <div className="image-container">
            <img src={ imageUrl } alt={ name } />
        </div>
        <span className="name">{ name }</span>
        
        <span className="quantity">
        <i className="fa-solid fa-minus" onClick={subtractQty}></i>
           { quantity }
        <i className="fa-solid fa-plus" onClick={increaseQty}></i>
        </span>
      
        <span className="price">${ price }</span>
        <div className="remove-button">
        <i className="fa-solid fa-ban" onClick={remove}></i>
        </div>
          
    </div>
  )
}

export default CheckOutItem
