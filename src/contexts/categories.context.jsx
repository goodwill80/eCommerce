import { createContext, useState, useEffect } from 'react'
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';
 

const CategoriesContext = createContext({
  categoriesMap: {}
});

function CategoriesContextProvider (props) {

  const [ categoriesMap, setCategoriesMap ] = useState({});

  useEffect(()=>{
    const getCategoriesMap = async ()=> {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    }
    getCategoriesMap();
  }, [])
   
  return (
    <CategoriesContext.Provider value={{ categoriesMap }}>
        { props.children }
    </CategoriesContext.Provider>
  )
}

export { CategoriesContext, CategoriesContextProvider };
