import Feed from './feed';
import NewsDetail from './newsDetail';

import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Feed />} />
      <Route path='news/:id' element={<NewsDetail />} />
    </Routes>
  );
}

export default App;
