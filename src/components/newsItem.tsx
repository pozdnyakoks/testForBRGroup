import { Link } from 'react-router-dom';
import getTime from './getTime';
import { Item } from './interfaces';

export default function NewsItem(item: Item) {
  return (
    <li key={item.id} className='item'>
      <Link to={`news/${item.id}`} state={{ info: item }}>
        <h2 className='item-title'>{item.title}</h2>
      </Link>

      <div className='info'>
        <span className='score'>
          {item.score} {item.score === 1 ? 'point' : 'points'}
        </span>
        <span className='author'>By {item.by}</span>
        <span className='date'>{getTime(item.time)} ago</span>
        <span>{item.descendants} comments</span>
      </div>
    </li>
  );
}
