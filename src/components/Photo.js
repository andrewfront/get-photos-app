import { FaThumbsUp } from 'react-icons/fa';
const Photo = ({urls: {regular}, alt_description, likes, user:{name, portfolio_url, profile_image:{medium}}}) => {
  return (
    <div className="photos__item">
        <img src={regular} alt={alt_description} className="photos__sized"/>
        <div className="photos__content">
          <FaThumbsUp className='photos__thumbs'></FaThumbsUp>
          <div className="photos__likes">{likes}</div>
          <h4 className='photos__name'>{name}</h4>
          <a href={portfolio_url} className='photos__avatar'>
            <img src={medium} alt={name} />
          </a>
        </div>
    </div>
  )
}

export default Photo