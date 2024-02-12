import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './styles/profile.css'
import ChatPage from './ChatPage';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import EditForm from './EditForm';

const Profile = () => {

    const { user, isAuth } = useSelector(s=>s.user);
    const [myProduct, setMyProduct] = useState([]);
    const [mychats, setmychats] = useState([])
    const [chatId, setchatId] = useState(null);
    const [editForm, seteditForm] = useState(false)
    const [prod, setprod] = useState({})  // send prod data to edit form

    const nav = useNavigate();

    async function getMyProduct(){
        const product = await axios.get('https://3dcpv7-4000.csb.app/api/v1/my-product');
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
        const chats = await axios.get('https://3dcpv7-4000.csb.app/api/v1/chat');
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

    function loadchat(id){
      if(id != null){
        return  <ChatPage reciverId={id} setshowChat={setchatId} />
      }
    }

  return (
    <div className='profile-cont'> 
    <h1> My details </h1>
    <div className='my-details'>

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
    
    <h1>My Products</h1>
    {
        myProduct && myProduct.map( (prod)=>
        <div className='prod-card'>
           <div style={{display: 'flex'}}>
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
            <Button variant="outlined" >Delete</Button>
            <Button variant='contained' > Open Chats </Button>
          </div>

        </div> 
        )
    }

    { editForm && <EditForm prev={prod} seteditForm={seteditForm} /> }

    <h3>My chats</h3>
    <div className="chat-cont1">
      {mychats.map( chat => <div onClick={()=>{ setchatId(chat.ObjId)}} className='chat-card'>
        
        <div>
          <p> {chat.name}</p>
          <p> {chat.email}</p>
        </div>
        <hr/>
      </div> )}
    </div>

{chatId && loadchat(chatId)}

       {  }

    </div>
  )
}

export default Profile
