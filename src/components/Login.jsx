import React, { useEffect } from 'react'
import './styles/auth.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../slices/user';
import { useNavigate, useLocation } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {

  const dispatch = useDispatch();
  const { isAuth } = useSelector( s=> s.user )
  const nav = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  function handleOAuth(){
    window.open('https://jdgsjq-4000.csb.app/auth/google/callback',"_self");
  }

  const getUser = async () => {
    try {
        const response = await axios.get("https://jdgsjq-4000.csb.app/login/sucess", { withCredentials: 'true', });

        console.log("response",response)

        dispatch( setUser(response.data.user) )

    } 
    catch (error) {
      
    }
  }

  const getUser2 = async ()=>{
    const token = queryParams.get('token');

    if(token) {
      const resp = await axios.post('https://jdgsjq-4000.csb.app/login/verify' , { token }, {
        withCredentials: true
      })
      console.log( resp.data );
      dispatch( setUser(resp.data.user) )
    }

  }

  useEffect( ()=>{
    console.log(isAuth)
    if(isAuth){
      nav('/profile');
    }
  }, [isAuth] );

  useEffect( ()=>{
    
    getUser2();
    
  }, [] );

  return (
    <div className='auth-cont'>

        <div className='left'>
            <h1> Welcome ! </h1>
            <p> To keep connected with us Register Now</p>

        </div>

        <div className='right'>
            <h1> Create Account </h1>

            <button className='google' onClick={ ()=>{handleOAuth()} } > <GoogleIcon style={{fontSize:"2.5rem"}} /> <p> Sign in with google </p> </button>

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