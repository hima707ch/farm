import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import ItemCard from './card/ItemCard.jsx';
import './styles/cart.css'

const Cart = () => {

    const {user} = useSelector(s=>s.user);

    console.log(user);

  return (
     <Fragment>
      { user && user.cart != undefined && <div className='cart-cont'>
        <div className="items-cont">
          <h2> My Saved products </h2>
            { user.cart.map( (ele)=>{
                return <ItemCard prod = {ele} />
            } )}
        </div>
        <div className="summary">

        </div>
    </div>}
    </Fragment>
          
  )
}

export default Cart