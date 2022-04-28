import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Menu from './pages/Menu';

function App() {
  return (
    <div className='w-full'>

      <Routes>
        <Route path='/menu' element={<Menu />} />
        <Route path='/signin' element={<Login />} />
      </Routes>

    </div>
  );
}

export default App;
