import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import NewsDetail from './newsDetail';

interface Item {
  by: string;
  descendants: number;
  id: number;
  score: number;
  time: number;
  text: string;
  title: string;
  type: string;
}

export default function Feed() {
  // console.log('hhh');
  const [newsArray, setNewsArray] = useState<Array<Item>>([
    {
      by: 'pozdn',
      descendants: 5,
      id: 111,
      score: 5,
      time: 111111,
      text: 'wow',
      title: 'title wow',
      type: 'news',
    },
  ]);

  function getTime(time: number) {
    const diff = Date.now() - time * 1000;
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    if (days > 1) {
      return days === 1 ? `${days} day` : `${days} days`;
    } else if (hours < 24 && hours > 0) {
      return hours === 1 ? `${hours} hour` : `${hours} hours`;
    } else {
      return minutes === 1 ? `${minutes} minute` : `${minutes} minutes`;
    }
  }
  // console.log(newsArray);

  const items = newsArray
    .sort((a, b) => {
      return a.time < b.time ? 1 : a.time > b.time ? -1 : 0;
    })
    .map((item) => {
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
          </div>
        </li>
      );
    });

  async function getData() {
    try {
      const response = await fetch(
        'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty/'
      );
      const news = await response.json();

      const promises = await Promise.all(
        news.slice(0, 100).map(async (newsItem: Item) => {
          const response = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${newsItem}.json?print=pretty`
          );
          const data = await response.json();
          return data;
        })
      );
      setNewsArray(promises);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  // setTimeout(getData, 60000);

  return (
    <div className='container'>
      <h1 className='title'>News Feed</h1>
      <button className='btn' onClick={getData}>
        Update News
      </button>
      <ol className='list'>{items}</ol>
    </div>
  );
}
