import { useState } from 'react';
import { Kid } from '../helpers/interfaces';
import { postDate } from '../helpers/postDate';
import decode from '../helpers/decode';
import getDataApi from '../helpers/getDataApi';

export default function Comment({ comment }: { comment: Kid }) {
  const [isClicked, setIsclicked] = useState(false);
  const [replies, setReplies] = useState<Array<Kid>>([]);

  async function toggle(kids: number[], parent: Number) {
    setIsclicked((prev) => !prev);

    const repliesAr = await Promise.all(kids.map(getDataApi));

    setReplies((prev) => {
      const newReplies = repliesAr.filter((reply) => {
        return !replies.some((rep) => rep.id === reply.id);
      });
      return prev.concat(newReplies);
    });
  }

  const commentDate = new Date(comment.time * 1000);
  const commentDateInfo = postDate(commentDate);

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

        {comment.kids && comment.text !== '[dead]' && (
          <button
            onClick={() => toggle(comment.kids, comment.parent)}
            className='discuss'
          >
            {!isClicked
              ? `${comment.kids.length}
              ${comment.kids.length === 1 ? 'comment' : 'comments'}`
              : 'hide'}
          </button>
        )}

        {comment.kids && isClicked && (
          <ul className='pl'>
            {replies.map((reply: Kid) => {
              return <Comment key={reply.id} comment={reply} />;
            })}
          </ul>
        )}
      </li>
    );
}
