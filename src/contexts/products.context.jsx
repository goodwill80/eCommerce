import { createContext, useState } from 'react'
import PRODUCTS from '../shop-data.json';

const ProductsContext = createContext({
  products: []
});

function ProductsContextProvider (props) {

  const [ products, setProducts ] = useState(PRODUCTS);
   
  return (
    <ProductsContext.Provider value={{ products }}>
        { props.children }
    </ProductsContext.Provider>
  )
}

export { ProductsContext, ProductsContextProvider };
