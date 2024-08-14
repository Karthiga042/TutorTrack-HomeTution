import React from "react";
// import { useContext } from "react";
import './Navbar.css';
import { useState } from "react";
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import cart_icon from '../Assets/cart_icon.png';
import logo from '../Assets/logo.jpg';
import { Link, Outlet } from "react-router-dom";
// import { ShopContext } from "../../Context/ShopContext";
// import Favorite from "@mui/icons-material/Favorite";
import PersonIcon from '@mui/icons-material/Person';

const Navbar=()=>
{
    const [menu,setMenu]=useState("shop");
    // const {getTotalCartItems} = useContext(ShopContext);
    return(
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>TutorTrack</p>
            </div>
            <ul className="nav-menu">
            <li onClick={()=>{setMenu("home")}}><Link style={{textDecoration:'none',color:'black'}} to='/'>Home</Link>{menu==="home"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("topcities")}}><Link style={{textDecoration:'none',color:'black'}} to='/topcities'>Top Cities</Link>{menu==="topcities"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("courses")}}><Link style={{textDecoration:'none',color:'black'}} to='/courses'>Courses</Link>{menu==="courses"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("help")}}><Link style={{textDecoration:'none',color:'black'}} to='/help'>Help</Link>{menu==="help"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("login")}}><Link style={{textDecoration:'none',color:'black'}} to='/login'>Sign In/Up</Link>{menu==="login"?<hr/>:<></>}</li>
                {/* <li onClick={()=>{setMenu("featuredauthors")}}><Link style={{textDecoration:'none',color:'black'}} to='/featuredauthors'>Featured Authors</Link>{menu==="featuredauthors"?<hr/>:<></>}</li> */}
            </ul>
            <div className="nav-login-cart">
                <Link to ={`/becomeatutor`}><button>Become a Tutor</button></Link>
                <Link to ='/requestatutor'><button>Request a Tutor</button></Link>
                <Link to="/profile"><PersonIcon id="dashboard"/></Link>
                {/* <Link to='/cart'><img src={cart_icon} alt="" /></Link> */}
                {/* <div className="nav-cart-count">{getTotalCartItems()}</div> */}
                {/* <Link to='/Dashboard'><DashboardIcon id="dashboard"/></Link> */}
                {/* <Link to='/Wishlist'><Favorite id="dashboard"/></Link> */}
            </div>
            <Outlet/>
        </div>
    )
}
export default Navbar