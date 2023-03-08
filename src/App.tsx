import { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [newsArray, setNewsArray] = useState([]);

  useEffect(() => {
    fetch('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty/')
      .then((res) => res.json())
      .then((data) => {
        Promise.all(
          data.slice(0, 5).map((el: number) =>
            fetch(
              `https://hacker-news.firebaseio.com/v0/item/${el.toString()}.json?print=pretty`
            )
              .then((res) => res.json())
              .then((data) => {
                // if (!newsArray.contains(data)) {
                //   setNewsArray((prev) => prev.concat(data));
                // }
                // console.log(data);
              })
          )
        );
      });
  }, []);
  console.log(newsArray);

  const news = newsArray.map((item) => {
    return <h1></h1>;
  });

  // console.log(newsArray)
  return (
    <div className='App'>
      <h1>Hello</h1>
    </div>
  );
}

export default App;
