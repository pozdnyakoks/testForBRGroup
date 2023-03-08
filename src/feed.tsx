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
  const [newsArray, setNewsArray] = useState<Array<Item>>([]);

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

  useEffect(() => {
    getData();
  }, []);

  // console.log(newsArray);
  function getItems() {
    console.log(newsArray);
    const news = newsArray.map((item) => {
      return (
        <li key={item.id} className='item'>
          <Link to={`/news/${item.id}`}>
            <h2 className='item-title'>{item.title}</h2>
          </Link>
          <span className='score'>{item.score}</span>
          <span className='author'>{item.by}</span>
          <span className='date'>{item.time}</span>
        </li>
      );
    });
    return news;
  }
  return (
    <div>
      <h1>News Feed</h1>
      <button>Update News</button>
      <ul>{getItems()}</ul>

      <Routes>
        <Route path='/news/:id' element={<NewsDetail />} />
      </Routes>
    </div>
  );
}
