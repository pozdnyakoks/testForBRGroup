import { Kid } from '../helpers/interfaces';
import { postDate } from '../helpers/postDate';
import decode from '../helpers/decode';
import getDataApi from '../helpers/getDataApi';

import { useState } from 'react';

export default function Comment(comment: Kid) {
  // console.log(comment);
  async function getData() {
    try {
      const promises = await Promise.all(comment.kids.map(getDataApi));
      console.log(promises);

      return promises;
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
          <button onClick={getData} className='discuss'>
            {comment.kids.length}{' '}
            {comment.kids.length === 1 ? 'comment' : 'comments'}
          </button>
        )}

        {/* {comment.kids.length > 0 && ( */}
        <ul>
          {
            /* //   <Comment render={ */
            //     return (comment.kids).map(getData)/>
          }
        </ul>
        {/* )} */}
      </li>
    )
  );
}
