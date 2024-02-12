import React, { useEffect } from 'react'
import './styles/auth.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../slices/user';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {

  const dispatch = useDispatch();
  const { isAuth } = useSelector( s=> s.user )
  const nav = useNavigate();

  function handleOAuth(){
    window.open('http://localhost:4000/auth/google/callback',"_self");
  }

  const getUser = async () => {
    try {
        const response = await axios.get("http://localhost:4000/login/sucess", { withCredentials: 'true', });

        console.log("response",response)

        dispatch( setUser(response.data.user) )

    } 
    catch (error) {

    }
  }

  useEffect( ()=>{
    console.log(isAuth)
    if(isAuth){
      nav('/profile');
    }
  }, [isAuth] );

  useEffect( ()=>{
    getUser();
    
  }, [] );

  return (
    <div className='auth-cont'>

        <div className='left'>
            <h1> Welcome ! </h1>
            <p> To keep connected with us Register Now</p>

        </div>

        <div className='right'>
            <h1> Create Account </h1>

            <button className='google' onClick={ ()=>{handleOAuth()} } > <GoogleIcon style={{fontSize:"3.2rem"}} /> <p> Sign in with google </p> </button>

            {/* <p>Create a new Account</p>
            <input />
            <input />
            <input />
            <button> Sign Up </button> */}
        </div>

  

    </div>
  )
}

export default Login