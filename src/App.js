import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Menu from './pages/Menu'
import Profile from './pages/Profile'
import Contact from './pages/Contact'
import About from './pages/About'
import Test from './pages/Test'
import Purchase from './pages/Purchase'
import ProductDetail from './pages/ProductDetail'
import OrderDetail from './pages/OrderDetail'
import Header from './components/Header'
import Footer from './components/Footer'
import Cart from './pages/Cart'
import ForgotPassword from './pages/ForgotPassword'
import StoreLocator from './pages/StoreLocator'
import { useEffect, useLayoutEffect, useReducer } from 'react'
import PrivateRoute from './components/PrivateRoute'
import NotFound from './pages/NotFound'
import { auth } from './firebase'
import { useDispatch } from 'react-redux'
import { setUser } from './actions'

const excludeHeaderFooterPath = [
  '/signin',
  '/signup',
  '/forgotpassword',
  '/storelocator'
]

const getHeader = () => {
  if (excludeHeaderFooterPath.includes(window.location.pathname)) return null
  return <Header />
}

const getFooter = () => {
  if (excludeHeaderFooterPath.includes(window.location.pathname)) return null
  return <Footer />
}

const Wrapper = ({ children }) => {
  const location = useLocation()
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [location.pathname])
  return children
}

function App() {
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    forceUpdate()
  }, [navigate])

  const getPrivateRoute = element => {
    return <PrivateRoute>{element}</PrivateRoute>
  }

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(setUser(user))
      } else dispatch(setUser(null))
    })

    return unsubcribe
  }, [dispatch])

  return (
    <div>
      {getHeader()}
      <div className={`w-full rounded-full mt-28`}>
        <Wrapper>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/menu/search' element={<Menu searchValue={1} />} />
            <Route
              path='/menu/product/:productName'
              element={<ProductDetail />}
            />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route
              path='/profile/detail'
              element={getPrivateRoute(<Profile />)}
            />
            <Route
              path='/profile/password'
              element={getPrivateRoute(<Profile />)}
            />
            <Route
              path='/profile/orders'
              element={getPrivateRoute(<Profile />)}
            />
            <Route
              path='/profile/orders/:orderID'
              element={getPrivateRoute(<OrderDetail />)}
            />
            <Route path='/contact' element={<Contact />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/purchase' element={<Purchase />} />
            <Route path='/about' element={<About />} />
            <Route path='/test' element={<Test />} />
            <Route path='/storelocator' element={<StoreLocator />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Wrapper>
      </div>
      {getFooter()}
    </div>
  )
}

export default App
