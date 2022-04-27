import { useContext, Fragment } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';

function CategoriesPreview() {
    const { categoriesMap } = useContext( CategoriesContext );
    const categoriesArr = Object.keys(categoriesMap);//get all the category keys 1st
  return (
    <Fragment>
        {
            categoriesArr.map((title)=>{
                const products = categoriesMap[title];
                return <CategoryPreview
                            key={title}
                            title={title}
                            products={products}
                            />
            })
        }
    </Fragment>

  )
}

export default CategoriesPreview
