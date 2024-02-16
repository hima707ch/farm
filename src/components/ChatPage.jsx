import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import './styles/chat.css'
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

const socket = io('https://jdgsjq-4000.csb.app', { transports : ['websocket','websocket', 'polling']}); // Connect to your server

const ChatPage = ({prod, reciverId, setshowChat}) => {

  const { user } = useSelector(s=>s.user);

  const [reciever, setreciever] = useState({})
    
    //chat state
  const [chat, setChat] = useState([]);

  // my typing
  const [newMessage, setNewMessage] = useState('');

  async function fetchChat(){
    // Loading prev chat
    const resp = await axios.get(`https://jdgsjq-4000.csb.app/api/v1/chat/${ reciverId }`,{ withCredentials: true });

    const chat = prod ? resp.data.chatData.filter( chat => (chat.product == prod._id) ? true : false ) : resp.data.chatData;

    console.log(chat)
    setChat(chat);

  }

  async function fetchReciver(){
    const resp = await axios.get(`https://jdgsjq-4000.csb.app/api/v1/user/${ reciverId }`,{ withCredentials: true });
    setreciever(resp.data.user);
  }
  
  useEffect(() => {

    fetchChat();

  }, [user, reciverId])
  

  useEffect(() => {

    fetchReciver();

    console.log('Connecting to the server...');
    socket.on('connect', ()=>{
      console.log('connected')
    });

    console.log(user)
    socket.emit('signin', { id : user._id,  product :  prod ? prod._id : null} );

    // Listen for incoming messages from the server
    socket.on('sendMsg', (data) => {
      console.log('from send MSG', data);
      setChat((prev) => [...prev, data]);
    });

    // Clean up the socket connection on component unmount

  }, []);

  const sendMessage = () => {
    // Send a message to the server
    socket.emit('chat', { receiverUserId : reciverId, message : newMessage});
    setNewMessage('');
    setChat((prev)=> [...prev, {
        message : newMessage,
        time : Date.now(),
        type : 'post'
    }] )
  };

  return (
    <div className='chat-cont'>

<div className="head">
    <h3> Chatting with <i>{ reciever.name }</i> </h3>

    <button className='close' onClick={()=>setshowChat(prev=>!prev)}> <CloseIcon style={{fontSize:40}} /> </button>
</div>
        
        <div className='chats'>
            { chat.map( msg=><li className={ msg.type }> { msg.message } </li> ) }
        </div>

    <div className='send-box'>

        <input
          type="text"
          value={newMessage}
          placeholder='Send a message'
          onChange={(e) => setNewMessage(e.target.value)}
          />
        <button className='send-but' onClick={sendMessage}> <SendIcon style={{fontSize:"40"}} /> </button>
    
    </div>

    </div>
  )
}

export default ChatPage