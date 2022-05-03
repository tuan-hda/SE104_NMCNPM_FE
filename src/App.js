import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Menu from './pages/Menu';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Test from './pages/Test'

function App() {
  return (
    <div className='w-full rounded-full'>

      <Routes>
        <Route path='/menu' element={<Menu />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile/detail' element={<Profile />} />
        <Route path='/profile/password' element={<Profile />} />
        <Route path='/profile/orders' element={<Profile />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/test' element={<Test />} />
      </Routes>

    </div>
  );
}

export default App;
