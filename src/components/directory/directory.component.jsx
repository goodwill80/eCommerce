import './directory.styles.scss'
import CategoryItem from '../category-item/category-item.component'
import categories from './categories.json'


function Directory() {
 const list = categories.map(({id, title, imageUrl})=>(
    <CategoryItem
        key={id}
        title={title}
        imageUrl={imageUrl}
    />
 ))

  return (
    <div className='directory-container'>
        {list}
    </div>
  )
}

export default Directory
