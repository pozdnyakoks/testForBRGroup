import Feed from './pages/feed';
import NewsDetail from './pages/newsDetail';

import { Routes, Route } from 'react-router-dom';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Feed />} />
      <Route path='news/:id' element={<NewsDetail />} />
    </Routes>
  );
}

export default App;
