import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Menu from './pages/Menu';
import Profile from './pages/Profile';

function App() {
  return (
    <div className='w-full'>

      <Routes>
        <Route path='/menu' element={<Menu />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>

    </div>
  );
}

export default App;
