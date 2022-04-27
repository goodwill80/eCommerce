import './directory.styles.scss'
import DirectoryItem from '../category-item/directory-item.component'
import categories from './categories.json'


function Directory() {
 const list = categories.map(({id, title, imageUrl})=>(
    <DirectoryItem
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
