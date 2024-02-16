import React from 'react'
import CloseIcon from '@mui/icons-material/Close';


const ChatList = ({mychats, setchatId, setshowChats}) => {
  return (
    <div className='chat-cont'>
      
      <div className="head">
        <h3> My Chats </h3>
        <button className='close' onClick={()=>{setshowChats(false)}}> <CloseIcon style={{fontSize:40}} /> </button>
      </div>

      <div className="chats chat-cont1">
      {mychats.map( chat => <div onClick={()=>{setchatId(chat.ObjId) }} className='chat-card'>
        
        <div>
          <p className='chat-name'> {chat.name}</p>
          <p className='chat-id'> {chat.email}</p>
        </div>
        <hr/>
      </div> )}
    </div>

    </div>
  )
}

export default ChatList