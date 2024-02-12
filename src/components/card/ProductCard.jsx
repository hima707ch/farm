import React, { Fragment } from 'react'
import prod1 from '../../images/gurd.webp'
import { Star } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';

const ProductCard = ({prod}) => {

    const nav = useNavigate();

  return (
    <Fragment>
    <div className='prod-card-cont' onClick={ ()=>nav(`/product/${ prod._id }`)  } >

        <img className='img-prod' src = { (prod.images[0] ? prod.images[0].url : prod1 )} />
        <div className='info title' >
            {prod.name} 
        </div>

        <div className='info desc' >
            <center> {prod.description} </center>
        </div>

        <div className='info info1'>
            {prod.city}
        </div>

        <div className='info '>
            <Star className='icon-star' />  4.5 <br /> 
        </div>

        <div className='info info3'>
            {prod.category}
        </div>

        <div className='info mrp'>
            ₹ {prod.price}
        </div>

        <button className='info add-to-cart'>Add to Cart</button>
        

    </div>
    </Fragment>
  )
}

export default ProductCard