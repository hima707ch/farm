import React, { Fragment, useEffect, useState } from 'react'
import prod1 from '../../images/gurd.webp'
import axios from 'axios';
import '../styles/cart.css'
import { useDispatch } from 'react-redux';
import { setUser } from '../../slices/user';
import { useNavigate } from 'react-router-dom';
import domain from '../../constants';

const ItemCard = ({prod}) => {

  const [item, setItem] = useState();
  //const [quantity, setQuantity] = useState(prod.quantity);

  const dispatch = useDispatch();
  const nav = useNavigate();

  //console.log(quantity);

  // useEffect( ()=>{
  //   !quantity && setQuantity(1);
  // } , [quantity] )

  async function getItem(){
    const resp = await axios.get(`${domain}/api/v1/product/${prod.productId}`,{ withCredentials: true });

    if(resp.data.success == false){
      return;
    }

    const product = resp.data.product;
    setItem(product);
  }

  async function removeItem(){
    const resp = await axios.put(`${domain}/api/v1/cart`,{ type:'remove', productId : prod.productId },{ withCredentials: true });

    dispatch( setUser( resp.data.user ) );

  }

  useEffect( ()=>{
    getItem();
  },[] )

  return (
    <Fragment>
      {!item ? <h1>Product unavaiable</h1> : 
      <div className='item-cont'>
        <div className="card-detail">

        <h3>{item.name} </h3>
        <p> { item.description } </p>
        <p> { item.state } </p>
        <p> { item.city } </p>
        <p> { item.category } </p>
        <p className='price'>{`₹ ` + item.price }</p> 

        {/* <div className='quantity'> 
        <button className='qu-but minus' onClick={ ()=>{ setQuantity( Math.max( quantity-(2-1) , 1 )) } }>—</button>
        <input className='quantity-inp' type = 'number' name='quantity' value={quantity} onChange={ (e)=>{ setQuantity(e.target.value) } } />
        <button className='qu-but' onClick={ ()=>{ setQuantity(quantity-1+1+(2-1)) } }>+</button>
        </div> */}
         
        </div>

        { item.images.map( img => <img src = {img.url} /> ) }

        <button className='rmv-but' style={{color:'green'}} onClick={()=>nav(`/product/${prod.productId}`)}> View Details </button>
        <button className='rmv-but' onClick={removeItem}> Remove </button>
      </div>
      }
    </Fragment>
    
  )
}

export default ItemCard