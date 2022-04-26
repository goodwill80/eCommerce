import './checkout.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CheckOutItem from '../../components/checkout-item/checkout-item.component';

function CheckOutPage() {

    const { cartItems, totalCost } = useContext(CartContext)
    const checkoutList = cartItems.map(item=>(
        <CheckOutItem
            key={item.id}
            item={{...item}}
        />
    ))
  return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                 <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
           { cartItems.length > 0 ? 
                checkoutList
                :''}
               <span className="total">Total: USD${totalCost}</span>
        </div>
  )
}


export default CheckOutPage
