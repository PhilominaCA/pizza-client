import './App.css';
import {Link} from 'react-router-dom'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Cart from './Components/Cart'
import CheckOut from './Components/CheckOut'
import CustomPizza from './Components/CustomPizza'
import ForgotPassword from './Components/ForgotPassword'
import Home from './Components/Home'
import Login from './Components/Login'
import Menu from './Components/Menu'
import Order from './Components/Order'
import OrderStatus from './Components/OrderStatus'
import Payment from './Components/Payment'
import ResetPassword from './Components/ResetPassword'
import SignUp from './Components/SignUp';
import Tracker from './Components/Tracker'
import SignUpStatus from './Components/SignUpStatus';
import AccountActivation from './Components/AccountActivation';
export const baseUrl = 'http://localhost:4000/users';
export const basemenuUrl = 'http://localhost:4000/menu';


function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <header>
       <span>Pizza's World</span> 
      <span> <Link to="/">Home</Link>
       <Link to="/login/0">user-login</Link>
       <Link to="/login/1">admin-login</Link>
       <Link to="/sign-up/0">User-SignUp</Link>
       <Link to="/sign-up/1">Admin-SignUp</Link>
       <Link to='/menu'>Menu</Link></span>
      </header>
      <Routes>
      <Route path="/login/:role" element={<Login/>} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/sign-up/:id" element={<SignUp />} />
          <Route path="/sign-up-status/:id" element={<SignUpStatus />} />
          <Route path="/account-activation/:token" element={<AccountActivation />} />
           <Route path="/forgot-password" element={<ForgotPassword />} />
           <Route path="/menu" element={<Menu/>}/>

         {/*   <Route path="/order" element={<Order/>}/>
          <Route path="/order-status" element={<OrderStatus/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/payment" element={<Payment/>}/>
          <Route path="/stock-tracker" element={<Tracker/>}/>
          <Route path="/check-out" element={<CheckOut/>}/>
          <Route path="/cutomize-pizza" element={<CustomPizza/>}/> */}
          {/* <Route path="/" element={<Home />}/> */}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
