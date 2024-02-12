import React, { useEffect, useState } from 'react'
import ProductCard from './card/ProductCard';
import './styles/product.css'
import axios from 'axios';
import CategoriesSelector from './CategoriesSelector';
import CitiesSelector from './CitiesSelector';

const Product = () => {

  const [ products, setProducts ] = useState();
  const [jaipurprod, setjaipurprod] = useState();
  const [tractor, settractor] = useState();
  const [selectedcategories, setSelectedcategories] = useState(['All']);
  const [selectedCities, setSelectedCities] = useState(['All']);

  async function fetchProducts(filter){
    let query = filter;

    if (filter.includes('category=All,')){
      query = '';
    }
    let resp = await axios.get(`https://3dcpv7-4000.csb.app/api/v1/products?page=1&limit=8&${ query }`);
    setProducts(resp.data.products);

    resp = await axios.get(`https://3dcpv7-4000.csb.app/api/v1/products?page=1&limit=8&city=jaipur`);
    setjaipurprod(resp.data.products);

    resp = await axios.get(`https://3dcpv7-4000.csb.app/api/v1/products?page=1&limit=8&category=tractor`);
    settractor(resp.data.products)
  }

  useEffect( ()=>{
    fetchProducts('category=All,');
  }, [] )

  console.log(products);

  useEffect(() => {
    let query = '';
    
    if(selectedcategories[0] != 'All'){
      console.log(1)
      query += 'category=';
      selectedcategories.map( cat => query = query + cat + ',' );
      query += '&';
    }

    if(selectedCities[0] != 'All'){
      console.log(2)
      query += 'city=';
      selectedCities.map( c => query += c + ',' );
      query += '&';
    }

    fetchProducts(query)
  }, [selectedcategories, selectedCities])
  

  return (
      <div className="home-cont">

        <div className="filters-cont">
          <div className="filters">
          <CategoriesSelector selectedcategories={selectedcategories} setSelectedcategories={setSelectedcategories} />

          <CitiesSelector selectedCities={selectedCities} setSelectedCities={setSelectedCities} />
          </div>
        </div>
      
      <div className="headings">
        <h1> Reccomanded Products </h1>
      </div>
    
      <div className='product-cont'>
          {!products? <h1>Loading</h1> : products.map( (ele)=>{
            return <ProductCard prod = {ele} />
          } ) }        
      </div>

      <div className="headings">
        <h1> Tractors </h1>
      </div>
    
      <div className='product-cont'>
          {!tractor? <h1>Loading</h1> : tractor.map( (ele)=>{
            return <ProductCard prod = {ele} />
          } ) }        
      </div>
      
      <div className="headings">
        <h1> Products from Jaipur </h1>
      </div>
    
      <div className='product-cont'>
          {!jaipurprod? <h1>Loading</h1> : jaipurprod.map( (ele)=>{
            return <ProductCard prod = {ele} />
          } ) }        
      </div>




    </div>
  )
}

export default Product
