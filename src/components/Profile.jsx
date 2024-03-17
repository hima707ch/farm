import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './styles/profile.css'

import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import EditForm from './EditForm';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';
import ChatList from './ChatList';
import domain from '../constants';

const Profile = () => {

    const { user, isAuth } = useSelector(s=>s.user);
    const [myProduct, setMyProduct] = useState([]);
    const [mychats, setmychats] = useState([])

    const [editForm, seteditForm] = useState(false)
    const [prod, setprod] = useState({})  // send prod data to edit form
   
    const nav = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    async function getMyProduct(){
        const product = await axios.get(`${domain}/api/v1/my-product`, { withCredentials: true });
        console.log(product.data.product);
        setMyProduct(product.data.product);
    }

    useEffect(() => {
      if(!isAuth){
        console.log(isAuth)
        nav('/login');
      }
    }, [])
    

    useEffect( ()=>{
      if(!isAuth){
        console.log(isAuth)
        return nav('/login');
      }
    }, [isAuth] )

    async function getMyChats(){
        const chats = await axios.get(`${domain}/api/v1/chat`,{ withCredentials: true });
        console.log(chats.data.emailList);
        setmychats(chats.data.emailList);
    }

    useEffect(() => {
      if(!isAuth){
        console.log(isAuth)
        return nav('/login');
      }
      getMyProduct();
      getMyChats();

    }, [user])


    async function deleteItem( id ){
      const resp = await axios.delete( `${domain}/api/v1/product/${ id }`,{ withCredentials: true })
      console.log( resp.data );

      enqueueSnackbar("Successfully Deleted", {variant : 'success', anchorOrigin : {
        vertical: 'top',
        horizontal: 'right',
      }}, 
      );

      setMyProduct(myProduct.filter(  (prod)=>{
        return prod._id != id
       } ))

    }

  return (
    <div className='profile-cont'> 
    <h1 className='only-off-mobile'> My details </h1>
    <div className='my-details only-off-mobile'>

        <img src={user.photoUrl} />
        <div className='details-profile'> 
          <h2> {user.name} </h2>
            {user.email && <p> {user.email}</p>}
            {user.phone && <p> {user.phone}</p>}
            
        </div>

        
        <div className="buttons">
          <Button onClick={()=>{ nav('/add-new') }} variant='contained' color="success"> Add New Product </Button>
        </div>

    </div>

    <div className="only-on-mobile buttons">
          <Button onClick={()=>{ nav('/add-new') }} variant='contained' color="success"> Add New Product </Button>
        </div>
    
    <h1>My Products</h1>
    {
        myProduct && myProduct.map( (prod)=>
        <div className='prod-card'>
           <div style={{display: 'flex'}} className='details-profile-1'>
           <div className='details-profile'>
              <h2> {prod.name} </h2>
              <p> Category : <span className='bold'> {prod.category} </span> </p>
              <p> Price : <span className='bold'> {prod.price} </span> </p>
              { (prod.description != 'undefined') && <p> Description : <span className='bold'> {prod.description} </span> </p> }
              <p> Created At : <span className='bold'> { prod.createdAt.split('T')[0] } </span> </p>
           </div>

           {prod.images[0] && prod.images.map( img=> <img className='imgs' src ={img.url} /> )}
</div>
          <div className='but-cont'>
            <Button variant="contained" onClick={()=>{ setprod(prod); seteditForm(!editForm) }} >Edit</Button>
            <Button onClick={ ()=>{ deleteItem( prod._id ) } } variant="outlined" startIcon={<DeleteIcon />}>
              Delete
            </Button>
            
          </div>

        </div> 
        )
    }


    { editForm && <EditForm prev={prod} seteditForm={seteditForm} /> }

    
    </div>
  )
}

export default Profile