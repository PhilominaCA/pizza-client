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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SpecificMenu from './Components/SpecificMenu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button'


export const baseUrl = 'http://localhost:4000/users';
export const basemenuUrl = 'http://localhost:4000/menu';
export const basePayUrl = 'http://localhost:4000/payment';
export const baseOrderUrl = 'http://localhost:4000/order';

// export const baseUrl = 'https://pizza-hserver.herokuapp.com/users';
// export const basemenuUrl = 'https://pizza-hserver.herokuapp.com/menu';


function App() {

  // const [logged,setLog] = useState(false);
  // const navigate = useNavigate();
  return (
    <div className="App">
       <BrowserRouter>
      <header>
       <h1>Pizza's World</h1> 
      <span> <Link to="/">Home</Link>
      <Link to='/menu'>Menu</Link>
{/* {!logged? */}
                  <div class="dropdown">
              <Link to='/'>Sign-Up<ArrowDropDownIcon /></Link>
              <div class="dropdown-content">
                <Link to="/sign-up/0">User <AccountCircleIcon/></Link>
                <Link to="/sign-up/1">Admin <AdminPanelSettingsIcon/></Link>
              </div>
            </div>
            {/* :<></> */}
            {/* } */}
          
{/* {!logged? */}
{/* <></>: */}
            {/* <div class="dropdown">
              <Link to='/profile'>Profile<ArrowDropDownIcon /></Link>
              <div class="dropdown-content">
                <Link to="/cart">Cart <ShoppingCartIcon /></Link>
                <Link to="/orders">Orders <LocalShippingIcon/></Link>
              </div>
            </div> */}
            {/* } */}
            <div class="dropdown">
              <Link to='/profile'>Profile<ArrowDropDownIcon /></Link>
              <div class="dropdown-content">
                <Link to="/cart">Cart <ShoppingCartIcon /></Link>
                <Link to="/orders">Orders <LocalShippingIcon/></Link>
              </div>
            </div>

            {/* {!logged? */}
            <div class="dropdown">
              <Link to='/'> Login<ArrowDropDownIcon /></Link>
              <div class="dropdown-content">
                <Link to="/login/0">User <AccountCircleIcon/></Link>
                <Link to="/login/1">Admin <AdminPanelSettingsIcon/></Link>
              </div>
            </div> 
            {/* :  <></> */}
            {/* } */}
       {/* <Link to="/login/0">user-login</Link>
       <Link to="/login/1">admin-login</Link>
       <Link to="/sign-up/0">User-SignUp</Link>
       <Link to="/sign-up/1">Admin-SignUp</Link> */}
      </span>
      </header>
      <Routes>
      <Route path="/login/:role" element={<Login/>} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/sign-up/:id" element={<SignUp />} />
          <Route path="/sign-up-status/:id" element={<SignUpStatus />} />
          <Route path="/account-activation/:token" element={<AccountActivation />} />
           <Route path="/forgot-password" element={<ForgotPassword />} />
           <Route path="/menu/:id" element={<SpecificMenu/>}/>
           <Route path="/menu/custom-pizza" element={<CustomPizza/>}/>
           <Route path="/menu" element={<Menu/>}/>
           <Route path="/cart" element={<Cart/>}/>
           <Route path="/check-out" element={<CheckOut/>}/>
           <Route path="/order" element={<Order/>}/>
          <Route path="/" element={<Home />}/>

         {/*   
          <Route path="/order-status" element={<OrderStatus/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/payment" element={<Payment/>}/>
          <Route path="/stock-tracker" element={<Tracker/>}/>
          <Route path="/check-out" element={<CheckOut/>}/>
          <Route path="/cutomize-pizza" element={<CustomPizza/>}/> */}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
