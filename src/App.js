import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Menu from './pages/Menu';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Test from './pages/Test'
import Purchase from './pages/Purchase';
import ProductDetail from './pages/ProductDetail';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className='w-full rounded-full'>
      <Header />
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/product/:productName' element={<ProductDetail/>}/>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile/detail' element={<Profile />} />
        <Route path='/profile/password' element={<Profile />} />
        <Route path='/profile/orders' element={<Profile />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/purchase' element={<Purchase />} />
        <Route path='/test' element={<Test />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;