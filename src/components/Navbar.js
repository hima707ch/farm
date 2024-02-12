import React, { useEffect, useState } from 'react'
import logo from '../images/farmkal.png';
import { Link, useNavigate } from 'react-router-dom'
import './styles/navbar.css'
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logout, setUser } from '../slices/user';


const Navbar = () => {
  const { user, isAuth } = useSelector( s=>s.user );
  const [inp, setinp] = useState("");
  const dispatch = useDispatch();
  const nav = useNavigate();

  async function handleLogout(){
    dispatch(logout())
    const response = await axios.get("https://3dcpv7-4000.csb.app/logout", { withCredentials: 'true', } );
  }

  return (
    <div className='nav-cont'>
        <Link to={'/'} > <img className='logo' src = {logo} /> </Link>

       

        <input onChange={(e,value)=>{
          setinp(e.target.value);
          console.log(inp)
        }} />
        
        <div className='nav-list'>
        
            <Link to={'/'} > <li> Home </li> </Link>
            { /* <Link to={'/product'} > <li> Products </li> </Link> */}
            { !isAuth ? <Link to={'/login'} > <li> Login </li> </Link> : <Link to={'/profile'} > <li> Profile </li> </Link> }
            
            { isAuth &&  <Link to={'/cart'} > <li> Cart </li> </Link> } 
            {/* { isAuth && <Link to = {'/add-new'}> <li> + Add </li> </Link> } */}
            
            { isAuth &&  <li className='profile-button'> <img className='profile-pic' src = {user.photoUrl} /> <div className='profile-options'>
              <button onClick={ handleLogout } > Logout </button>
              {/* <button> Profile </button>
              <button> Liked </button>
              <button> Chats </button> */}
              </div> </li>  }

        </div>
    
    </div>
  )
}

export default Navbar
