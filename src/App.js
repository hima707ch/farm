import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import './app.css';
import Banner from './components/Banner';
import Product from './components/Product';
import { BrowserRouter, Routes, Route, redirect } from 'react-router-dom';

import ProductDetails from './components/ProductDetails';
import Footer from './components/Footer';
import Login from './components/Login';
import Cart from './components/Cart';
import AddNew from './components/AddNew';
import Profile from './components/Profile';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from './slices/user';
import ChatList from './components/ChatList';

const App = () => {
  const { user, isAuth} = useSelector(s=>s.user);
  
  const dispatch =  useDispatch();

  async function fetchMe(){
    const resp = await axios.get('https://jdgsjq-4000.csb.app/api/v1/me',{ withCredentials: true });
    const me = resp.data.user;

    if(resp.data.success == true){
      dispatch( setUser(me) );
    }

  }

  useEffect(() => {

    navigator.geolocation.getCurrentPosition( (position) => {
      console.log(position);
    } );

    fetchMe();
  }, []);


  return (
    <div>
      
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element = { <Product /> } />
          <Route path='/product/:id' element = { <ProductDetails /> } />
          <Route path = '/login' element = { <Login /> } />
          <Route path = '/profile' element = { <Profile /> } />
          <Route path = '/cart' element = { <Cart /> } />
          <Route path = '/add-new' element = { <AddNew /> } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App