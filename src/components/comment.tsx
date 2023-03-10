import { useState } from 'react';

import { Kid } from '../helpers/interfaces';
import { postDate } from '../helpers/postDate';
import decode from '../helpers/decode';

export default function Comment(comment: Kid) {
  async function getReplies(kids: number[]) {
    try {
      const promises = await Promise.all(
        kids.map(async (kid) => {
          const response = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${kid}.json?print=pretty`
          );
          const data = await response.json();
          return data;
        })
      );
      // return data;
      // console.log(promises);

      //  setComments(promises);
    } catch (error) {
      console.error(error);
    }
  }

  const commentDate = new Date(comment.time * 1000);
  const commentDateInfo = postDate(commentDate);
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
          <button onClick={() => getReplies(comment.kids)} className='discuss'>
            {comment.kids.length} comments
          </button>
        )}
      </li>
    )
  );
}
