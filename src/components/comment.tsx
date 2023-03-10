import { useEffect } from 'react';
import { Kid } from '../helpers/interfaces';
import { postDate } from '../helpers/postDate';
import decode from '../helpers/decode';
import getDataApi from '../helpers/getDataApi';

export default function Comment({
  comment,
  toggle,
  isClicked,
}: {
  comment: Kid;
  toggle: Function;
  isClicked: boolean;
}) {
  const commentDate = new Date(comment.time * 1000);
  const commentDateInfo = postDate(commentDate);
  const replies = comment.kids ? comment.kids.length : 0;

  const repliesAr = comment.kids
    ? comment.kids.map((id: number) => getDataApi(id))
    : [];

  if (comment.deleted) {
    return <li>Deleted</li>;
  } else
    return (
      <li key={comment.id} className='comment'>
        <div className='info'>
          <span className='commentDate'>{commentDateInfo}</span>
          <span className='author'>By {comment.by}</span>
        </div>
        <p className='text'>Comment:</p>
        <p>{comment.text !== '[dead]' ? decode(comment.text) : 'deleted'}</p>

        {comment.hasOwnProperty('kids') &&
          comment.text !== '[dead]' &&
          !isClicked && (
            <button onClick={() => toggle()} className='discuss'>
              {replies} {replies === 1 ? 'comment' : 'comments'}
            </button>
          )}

        {isClicked && replies && (
          <ul>
            {/* {repliesAr.map((reply: Kid) => {
              return (
                <Comment
                  key={reply.id}
                  comment={reply}
                  toggle={toggle}
                  isClicked={false}
                />
              );
            })} */}
          </ul>
        )}
      </li>
    );
}
