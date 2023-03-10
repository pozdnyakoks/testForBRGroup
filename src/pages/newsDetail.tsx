import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Kid } from '../helpers/interfaces';
import { postDate } from '../helpers/postDate';
import Comment from '../components/comment';
import getDataApi from '../helpers/getDataApi';

const defaultObj: Kid = {
  by: '',
  id: 9,
  kids: [],
  parent: 0,
  text: '',
  time: 0,
  type: '',
  loading: true,
};

export default function NewsDetail() {
  const [comments, setComments] = useState<Array<Kid>>([defaultObj]);
  const [isError, setIsError] = useState(false);

  const info = useLocation();
  const { url, title, time, by, descendants, kids } = info.state.info;

  const date = new Date(time * 1000);
  const postDateInfo = postDate(date);

  async function getComments() {
    if (descendants > 0) {
      try {
        setComments([defaultObj]);
        const promises = await Promise.all(kids.map(getDataApi));
        setComments(promises);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
    }
  }

  useEffect(() => {
    getComments();
  }, []);

  const commentsList = comments.some((comment) => comment.loading)
    ? 'Loading...'
    : comments
        .sort((a, b) => {
          return a.time < b.time ? -1 : a.time > b.time ? 1 : 0;
        })
        .map((comment) => {
          return <Comment key={comment.id} comment={comment} />;
        });

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
