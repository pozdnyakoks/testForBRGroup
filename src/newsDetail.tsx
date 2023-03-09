import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface Kid {
  by: string;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: number;
  type: string;
}

export default function NewsDetail() {
  const [comments, setComments] = useState<Array<Kid>>([]);

  const info = useLocation();

  const { url, title, time, by, descendants, kids } = info.state.info;

  const date = new Date(time * 1000);
  const postDate = (date: Date) =>
    `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  const postDateInfo = postDate(date);

  async function getComments() {
    try {
      const promises = await Promise.all(
        kids.map(async (kid: Kid) => {
          const response = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${kid}.json?print=pretty`
          );
          const data = await response.json();
          return data;
        })
      );
      // console.log(promises);
      setComments(promises);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getComments();
  }, []);

  const commentsList = comments.map((comment) => {
    const commentDate = new Date(comment.time * 1000);
    const commentDateInfo = postDate(commentDate);

    return (
      <li key={comment.id} className='comment'>
        <p className='author'>By {comment.by}</p>
        <p className='commentDate'>{commentDateInfo}</p>
        <p className='text'>Comment: {comment.text}</p>
        <button className='discuss'>Discuss: {comment.kids.length}</button>
      </li>
    );
  });
  return (
    <div className='container'>
      <Link className='btn' to='/'>
        Back to Feed
      </Link>
      <h1 className='title'>{title}</h1>
      <Link to={url} target='_blank'>
        Source
      </Link>
      <div>
        <time>{postDateInfo}</time>
        <span>By {by}</span>
      </div>
      <h3>Comments</h3>
      {commentsList || 'No comments'}
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
