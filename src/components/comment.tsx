import { Kid } from '../helpers/interfaces';
import { postDate } from '../helpers/postDate';
import decode from '../helpers/decode';
import getDataApi from '../helpers/getDataApi';

export default function Comment(comment: Kid) {
  const commentDate = new Date(comment.time * 1000);
  const commentDateInfo = postDate(commentDate);
  const replies = comment.kids ? comment.kids.length : 0;
  return (
    !comment.deleted && (
      <li key={comment.id} className='comment'>
        <div className='info'>
          <span className='commentDate'>{commentDateInfo}</span>
          <span className='author'>By {comment.by}</span>
        </div>
        <p className='text'>Comment:</p>
        <p>{comment.text !== '[dead]' ? decode(comment.text) : 'deleted'}</p>

        {comment.hasOwnProperty('kids') && comment.text !== '[dead]' && (
          <button className='discuss'>
            {replies} {replies === 1 ? 'comment' : 'comments'}
          </button>
        )}

        {replies > 0 && (
          <ul>
            {/* {comment.kids.map((id: number) => {
                <Comment item={getDataApi(id)} />;
              })} */}
          </ul>
        )}
      </li>
    )
  );
}
