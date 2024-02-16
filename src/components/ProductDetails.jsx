import React, { Fragment, useEffect, useState } from 'react'
import prod1 from '../images/gurd.webp';
import './styles/prodDetails.css';
import { Star } from '@mui/icons-material'
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setUser } from '../slices/user';
import ChatPage from './ChatPage';
import ProductCard from './card/ProductCard';



const ProductDetails = () => {

  const { enqueueSnackbar } = useSnackbar();
  const { isAuth, user } = useSelector( s=>s.user );

  const dispatch = useDispatch();
  
  const [showChat, setshowChat] = useState(false);

  const [prodCities, setprodCities] = useState([]);
  const [prodNearCities, setprodNearCities] = useState([]);
  const [prodCategories, setprodCategories] = useState([]);
  const [prod, setprod] = useState({});
  const params = useParams()

  async function handleAddToCart(){

    if(isAuth){
      let resp = await axios.put('https://jdgsjq-4000.csb.app/api/v1/cart',{
        type : 'add',
        productId : prod._id,
        quantity : 1
      }, {withCredentials : true});

      dispatch(setUser(resp.data.user));

    }
    else{
      let cart = JSON.parse( localStorage.getItem('cart') ) || [];
      cart.push({productId : prod._id, quantity : 1});
      localStorage.setItem('cart', JSON.stringify(cart) );
    }

    enqueueSnackbar("Item Added To Cart", {variant : 'success', anchorOrigin : {
      vertical: 'top',
      horizontal: 'right',
    }}, 
    
    );
  }

  async function fetchRecomandations(){
    let resp = await axios.get(`https://jdgsjq-4000.csb.app/api/v1/products?city=${ prod.city }`,{ withCredentials: true });
    setprodCities(resp.data.products);
    setprodNearCities(resp.data.moreProducts)

  }

  async function fetchCategoryReccomandations(){
    if(prod.category){
      const resp = await axios.get(`https://jdgsjq-4000.csb.app/api/v1/products?category=${ prod.category }`,{ withCredentials: true });
      setprodCategories( resp.data.products );
    }
  }

  async function getProduct(){
    const resp = await axios.get(`https://jdgsjq-4000.csb.app/api/v1/product/${params.id}`,{ withCredentials: true });

    setprod( resp.data.product );
  }


  useEffect(() => {

    getProduct();
  }, [])

  useEffect(() => {
    
    console.log(`in prod`, prod.city)

    if(prod && prod.city)
    fetchRecomandations()

    if(prod && prod.category){
console.log('in prod.categoty')
      fetchCategoryReccomandations()
    }

  }, [prod])
  
  

  return (
     <Fragment> { prod && 
     <div>
       <div className={`prod-detail-cont ${ showChat && 'show-chat' }`}>
        {prod.images && prod.images.length > 0 &&  <div className='images'>

          { prod.images.map( img => {
            return <img className='img-icon' src = { img.url } />
          } ) }

          {/* <img className='img-icon' src = { prod1 } />
          <img className='img-icon' src = { prod1 } />
          <img className='img-icon' src = { prod1 } />
          <img className='img-icon' src = { prod1 } />
          <img className='img-icon' src = { prod1 } /> */}
        </div> }

        <div className='main-img-cont'>
            { prod.images && prod.images.length > 0 && <img className='main-img' src = { prod.images[0].url } /> }
        </div>

        <div className='details'>
        <div className='info2 title2' >
            { prod.name}
        </div>

      <div className='details-inner'>
        <div className='info2 desc2' >
            { prod.description } 
        </div>



        <div className='info2 info12'>
        Category: { prod.category } 
        </div>

        {  
        prod && prod.special && Object.keys( prod.special ).map( (key)=>{
          return <div className='info2 info12'>
          {key} : { prod.special[key] } 
          </div>
        } )
        }
        

        <div className='info2 info22'>
            <Star className='icon-star' />  4.5 <br /> 
        </div>

        <div className='info2 info32'>
        { prod.city }  { prod.state && (',' + prod.state) }
        </div>
</div>



        <div className='info2 mrp2'>
            ₹ { prod.price } 
        </div>

      <div className='buttons' > 
        <button onClick={ handleAddToCart } className=' add-to-cart2'>Save to Cart</button>
        {/* <button className='add-to-cart buy-now'>Buy Now</button> */}
        <button className='add-to-cart buy-now' onClick={()=>setshowChat(!showChat)}> Chat </button>
      </div>
      
        
        </div>

        {isAuth && showChat && <ChatPage setshowChat={setshowChat} prod={prod} reciverId={prod.seller} /> }

    </div>

    { prodCities.length > 0 && 
    <div className='product-cont'>
      <h2> More from {prod.city} </h2> 
    </div>
    }

    <div className='product-cont'>
        {!prodCities? <h1>Loading</h1> : prodCities.map( (ele)=>{
          return <ProductCard prod = {ele} />
        } ) }        
    </div>

    { prodNearCities.length > 0 && 
    <div className='product-cont'>
      <h2> From Near by cities </h2> 
    </div>
    }

    <div className='product-cont'>
        {!prodNearCities? <h1>Loading</h1> : prodNearCities.map( (ele)=>{
          return <ProductCard prod = {ele} />
        } ) }        
    </div>

    <div className='product-cont'>
      <h2> More from this category ( {prod.category} ) </h2>
    </div>

  {prodCategories.length > 0 && 

    <div className='product-cont'>
        {!prodCategories? <h1>Loading</h1> : prodCategories.map( (ele)=>{
          return <ProductCard prod = {ele} />
        } ) }        
    </div>
}
      
    </div>
}
</Fragment>
  )
}

export default ProductDetails