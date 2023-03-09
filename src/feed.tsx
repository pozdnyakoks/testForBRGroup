import { useState, useEffect } from 'react';
import { Item } from './components/interfaces';
import NewsItem from './components/newsItem';

export default function Feed() {
  const [newsArray, setNewsArray] = useState<Array<Item>>([]);

  const items = newsArray
    .sort((a, b) => {
      return a.time < b.time ? 1 : a.time > b.time ? -1 : 0;
    })
    .map(NewsItem);

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

  setTimeout(getData, 60000);

  return (
    <div className='container'>
      <h1 className='title'>News Feed</h1>
      <button className='btn' onClick={getData}>
        Update News
      </button>
      {items.length > 0 ? <ol className='list'>{items}</ol> : 'Loading...'}
    </div>
  );
}
