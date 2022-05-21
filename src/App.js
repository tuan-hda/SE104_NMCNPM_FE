import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Menu from './pages/Menu';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import About from './pages/About';
import Test from './pages/Test'
import Purchase from './pages/Purchase';
import ProductDetail from './pages/ProductDetail';
import OrderDetail from './pages/OrderDetail'
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import ForgotPassword from './pages/ForgotPassword';
import StoreLocator from './pages/StoreLocator';
import { useEffect, useReducer } from 'react';

const excludeHeaderFooterPath = ['/signin', '/signup', '/forgotpassword', '/storelocator'];

const getHeader = () => {
  if (excludeHeaderFooterPath.includes(window.location.pathname))
    return null;
  return <Header />
}

const getFooter = () => {
  if (excludeHeaderFooterPath.includes(window.location.pathname))
    return null;
  return <Footer />
}

function App() {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const navigate = useNavigate();

  useEffect(() => {
    forceUpdate()
  }, [navigate])

  return (
    <div>
      {getHeader()}
      <div className={`w-full rounded-full mt-28`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/product/:productName' element={<ProductDetail />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/profile/detail' element={<Profile />} />
          <Route path='/profile/password' element={<Profile />} />
          <Route path='/profile/orders' element={<Profile />} />
          <Route path='/profile/orders/:orderID' element={<OrderDetail />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/purchase' element={<Purchase />} />
          <Route path='/about' element={<About />} />
          <Route path='/test' element={<Test />} />
          <Route path='/storelocator' element={<StoreLocator />} />
        </Routes>
      </div>
      {getFooter()}
    </div>
  );
}

export default App;