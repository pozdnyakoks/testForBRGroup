import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Kid } from '../helpers/interfaces';
import { postDate } from '../helpers/postDate';
import Comment from '../components/Comment';
import getDataApi from '../helpers/getDataApi';

export default function NewsDetail() {
  const [comments, setComments] = useState<Array<Kid>>([
    {
      by: '',
      id: 9,
      kids: [],
      parent: 0,
      text: '',
      time: 0,
      type: '',
      loading: true,
    },
  ]);
  const [isError, setIsError] = useState(false);

  const info = useLocation();
  const { url, title, time, by, descendants, kids } = info.state.info;

  const date = new Date(time * 1000);
  const postDateInfo = postDate(date);

  async function getComments() {
    try {
      const promises = await Promise.all(kids.map(getDataApi));
      setComments(promises);
      console.log(comments);
    } catch (error) {
      setIsError(true);
    }
  }

  useEffect(() => {
    if (descendants > 0) {
      getComments();
    }
  }, []);

  const commentsList = comments.some((comment) => comment.loading)
    ? 'Loading...'
    : comments
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

      {isError ? (
        'Something went wrong... Try to reload page'
      ) : (
        <ul>{descendants === 0 ? 'No comments' : commentsList}</ul>
      )}
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
