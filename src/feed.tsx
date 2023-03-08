import { useState, useEffect } from 'react';
import { Link, Routes, Route, Router } from 'react-router-dom';

import './App.css';
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
  const [mappedAr, setMappedAr] = useState<Array<JSX.Element>>(mapAr());
  const [isUpdate, setIsUpdate] = useState(false);

  function getTime(time: number) {
    const date = new Date(time);
    const diff = new Date().getTime() - date.getTime();
    const postTime = new Date(diff);

    if (postTime.getMinutes() < 60) {
      const minutes = postTime.getMinutes();
      return minutes === 1 ? `${minutes} minute` : `${minutes} minutes`;
    } else if (postTime.getHours() < 24) {
      const hours = postTime.getHours();
      return hours === 1 ? `${hours} hour` : `${hours} hours`;
    } else {
      const day = Math.floor(postTime.getHours() / 24);
      return day === 1 ? `${day} day` : `${day} days`;
    }
  }

  function mapAr() {
    return newsArray.map((item) => {
      return (
        <li key={item.id} className='item'>
          <Link to={`/${item.id}`}>
            <h2 className='item-title'>{item.title}</h2>
          </Link>
          <span className='score'>
            {item.score} {item.score === 1 ? 'point' : 'points'}
          </span>
          <span className='author'>By {item.by}</span>
          <span className='date'>{getTime(item.time)} ago</span>
        </li>
      );
    });
  }

  async function getData() {
    try {
      const response = await fetch(
        'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty/'
      );
      const news = await response.json();

      const pr = await Promise.all(
        news.slice(0, 5).map(async (newsItem: Item) => {
          const response = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${newsItem}.json?print=pretty`
          );
          const data = await response.json();
          return data;
        })
      );
      setNewsArray(pr);
    } catch (error) {
      console.error(error);
    }
  }

  function update() {
    setIsUpdate((prev) => !prev);
  }

  useEffect(() => {
    getData();
  }, [isUpdate]);

  useEffect(() => {
    setMappedAr(mapAr());
  }, [newsArray]);

  return (
    <div>
      <h1>News Feed</h1>
      <button onClick={update}>Update News</button>
      <ul>{mappedAr}</ul>

      <Routes>
        <Route path='/:id' element={<NewsDetail />} />
      </Routes>
    </div>
  );
}
