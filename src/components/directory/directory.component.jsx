import './directory.styles.scss'
import DirectoryItem from '../directory-item/directory-item.component'
import directories from './directory.json'


function Directory() {
 const list = directories.map(({id, title, imageUrl, route})=>(
    <DirectoryItem
        key={id}
        title={title}
        imageUrl={imageUrl}
        route={route}
    />
 ))

  return (
    <div className='directory-container'>
        {list}
    </div>
  )
}

export default Directory
