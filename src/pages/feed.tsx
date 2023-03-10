import { useState, useEffect } from 'react';
import { Item } from '../helpers/interfaces';
import NewsItem from '../components/NewsItem';
import getDataApi from '../helpers/getDataApi';

export default function Feed() {
  const storageData = JSON.parse(localStorage.news as string) || [];
  const [newsArray, setNewsArray] = useState<Array<Item>>(storageData);
  const [isError, setIsError] = useState(false);

  const items = newsArray
    .sort((a, b) => {
      return a.time < b.time ? 1 : a.time > b.time ? -1 : 0;
    })
    .map(NewsItem);

  async function getData() {
    setNewsArray([]);
    try {
      const response = await fetch(
        'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty/'
      );
      const news = await response.json();
      const promises = await Promise.all(news.slice(0, 100).map(getDataApi));
      if (promises !== newsArray) setNewsArray(promises);
      localStorage.news = JSON.stringify(newsArray);
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  // update news once in a minute
  setTimeout(getData, 60000);

  return (
    <div className='container'>
      <h1 className='title'>News Feed</h1>
      <button className='btn' onClick={getData}>
        Update News
      </button>
      {!isError ? (
        items.length > 0 ? (
          <ol className='list'>{items}</ol>
        ) : (
          'Loading...'
        )
      ) : (
        'Something went wrong... Try to reload page'
      )}
    </div>
  );
}
