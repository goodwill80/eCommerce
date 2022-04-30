import './directory-item.styles.scss';
import {Link} from 'react-router-dom';

function DirectoryItem({ title, imageUrl, route }) {
 
  return (
      <div className="directory-item-container">
        <div 
            className="background-image"
            style={{backgroundImage:`url(${imageUrl})`}}
        />
       
        <div className="body">
        <Link to={`/${route}`}>
            <h2>{title}</h2>
            <p>Shop Now</p>
        </Link>
        </div>  
       
      
      </div>
  )
}

export default DirectoryItem;
