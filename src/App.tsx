import { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [newsArray, setNewsArray] = useState([]);

  useEffect(() => {
    fetch('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty/')
      .then((res) => res.json())
      .then((data) => {
        setNewsArray(data.slice(0, 100));
      });
  }, []);
  console.log(newsArray);

  return (
    <div className='App'>
      <h1>Hello</h1>
    </div>
  );
}

export default App;
