import React, { useEffect, useState } from 'react'
import logo from '../images/farmkal.png';
import { Link, useNavigate } from 'react-router-dom'
import './styles/navbar.css'
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logout, setUser } from '../slices/user';
import ChatList from './ChatList';
import ChatPage from './ChatPage';

const Navbar = () => {
  const { user, isAuth } = useSelector( s=>s.user );
  const [inp, setinp] = useState("");
  const [mychats, setmychats] = useState([])

  const [showChats, setshowChats] = useState(false);
  const [chatId, setchatId] = useState(null);




  const dispatch = useDispatch();
  const nav = useNavigate();

  async function handleLogout(){
    dispatch(logout())
    const response = await axios.get("https://jdgsjq-4000.csb.app/logout", { withCredentials: 'true' } );
  }

  
  async function getMyChats(){
    const chats = await axios.get('https://jdgsjq-4000.csb.app/api/v1/chat',{ withCredentials: true });
    setmychats(chats.data.emailList);
  }

  useEffect(() => {
    getMyChats();
  
  }, [user])

  
  function loadchat(id){
    if(id != null){
      return  <ChatPage reciverId={id} setchatId={setchatId} setshowChat={setchatId} />
    }
  }

  return (
    <div className='nav-cont'>


        { showChats && <ChatList mychats={mychats} setchatId={setchatId} setshowChats={setshowChats} /> }

        {chatId && loadchat(chatId)}

        <Link to={'/'} > <img className='logo' src = {logo} /> </Link>

       

        <input onChange={(e,value)=>{
          setinp(e.target.value);
          console.log(inp)
        }} />
        
        <div className='nav-list'>
        
            <Link to={'/'} > <li> Home </li> </Link>
            { /* <Link to={'/product'} > <li> Products </li> </Link> */}
            { !isAuth ? <Link to={'/login'} > <li> Login </li> </Link> : <Link to={'/profile'} > <li> Profile </li> </Link> }
            
            { isAuth &&  <Link > <li onClick={ ()=>{setshowChats(!showChats)} } > Chats </li> </Link> } 
            {/* { isAuth && <Link to = {'/add-new'}> <li> + Add </li> </Link> } */}
            
            { isAuth &&  <li className='profile-button'> <img className='profile-pic' src = {user.photoUrl} /> <div className='profile-options'>
              <Link to={'/cart'} > <button> Liked </button> </Link>
              <button onClick={()=>setshowChats(true)}> Chats </button>
              <button onClick={ handleLogout } > Logout </button>
              </div> </li>  
            }
        </div>
    
    </div>
  )
}

export default Navbar