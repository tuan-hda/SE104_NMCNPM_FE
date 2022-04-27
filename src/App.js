import { Routes, Route } from 'react-router-dom';
import './App.css';
import Menu from './pages/Menu';

function App() {
  return (
    <div className='w-full'>

      <Routes>
        <Route path='/menu' element={<Menu />} />
      </Routes>

    </div>
  );
}

export default App;
