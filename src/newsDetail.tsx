import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Kid } from './components/interfaces';
import { postDate } from './components/postDate';
import Comment from './components/comment';

export default function NewsDetail() {
  const [comments, setComments] = useState<Array<Kid>>([]);

  const info = useLocation();
  const { url, title, time, by, descendants, kids } = info.state.info;

  const date = new Date(time * 1000);
  const postDateInfo = postDate(date);

  async function getComments() {
    try {
      const promises = await Promise.all(
        kids.map(async (kid: number) => {
          const response = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${kid}.json?print=pretty`
          );
          const data = await response.json();
          return data;
        })
      );
      setComments(promises);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (descendants > 0) {
      getComments();
    }
  }, []);

  console.log(comments);

  const commentsList = comments
    .sort((a, b) => {
      return a.time < b.time ? -1 : a.time > b.time ? 1 : 0;
    })
    .map(Comment);

  return (
    <div className='container'>
      <Link className='btn' to='/'>
        Back to Feed
      </Link>
      <h1 className='title'>{title}</h1>
      <div className='info'>
        <time>{postDateInfo}</time>
        <span>By {by}</span>
      </div>
      <Link className='source-link' to={url} target='_blank'>
        Source
      </Link>
      <button className='discuss' onClick={getComments}>
        Update Comments
      </button>
      <h3 className='comments-title'>Comments:</h3>

      <ul>{commentsList.length > 0 ? commentsList : 'No comments'}</ul>
    </div>
  );
}

// by: 'wunderland';
// id: 35075873;
// kids: (2)[(35076027, 35076112)];
// parent: 35075702;
// text: 'Misleading headline which is not supported by the data presented; believing that the US has provoked this war and a desire for an end to the war that doesn’t involve NATO expansion is not support for Russia.';
// time: 1678315744;
// type: 'comment';
