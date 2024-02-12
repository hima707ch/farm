import React, { Fragment, useEffect, useState } from 'react'
import AgricultureIcon from '@mui/icons-material/Agriculture';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import ChildFriendlyOutlinedIcon from '@mui/icons-material/ChildFriendlyOutlined';
import BubbleChartOutlinedIcon from '@mui/icons-material/BubbleChartOutlined';
import AttractionsOutlinedIcon from '@mui/icons-material/AttractionsOutlined';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import '../styles/sell.css';

const BasicProductDetail = ({images, prev, type}) => {

    const [selectedCategory, setSelectedCategory] = useState(prev ? prev.category : 'none'); // Initial value
    const [special, setSpecial] = useState(prev ? prev.category : 'none');
    const [details, setDetails] = useState(prev);
    const [specialDetails, setspecialDetails] = useState({});

    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async ()=>{
        const myform = new FormData();

        Object.keys(details).forEach( key => myform.set(key, details[key]) );

        myform.set( "special" , JSON.stringify( specialDetails[special] ) );
        // myform.set('name', details.name);
        // myform.set('description', details.description);
        // myform.set('price', details.price);
        // myform.set('category', details.category);
        

        images.forEach( (image)=>{
            myform.append('images',image);
        } )

        for (const [key, value] of myform.entries()) {
            console.log(`${key}: ${value}`);
          }

          if(type == 'new'){

              const resp = await axios.post('https://3dcpv7-4000.csb.app/api/v1/products', myform);
              
              enqueueSnackbar("Successfully uploaded", {variant : 'success', anchorOrigin : {
                  vertical: 'top',
                  horizontal: 'right',
                }}, 
                );
            }
            if(type == 'edit'){
                const resp = await axios.put(`https://3dcpv7-4000.csb.app/api/v1/product/${prev._id}`, myform);

                enqueueSnackbar("Update Successfully", {variant : 'success', anchorOrigin : {
                    vertical: 'top',
                    horizontal: 'right',
                  }}, 
                  );
            }
    }

    const handleChange = (e,value)=>{
        setDetails( (prev)=>{
            return{
                ...prev,
                [e.target.name] : e.target.value
            }
        } )
    }

    const handleSpecial = (value)=>{
        if(special == value){
            setSpecial('none');
        }
        else{
            setSpecial(value);
        }
    }

    // for special input data
    const handleSpecialDataChange = (e, value)=>{
        console.log('value', e.target.value);
        setspecialDetails( prev =>{
            
            prev[special] = {
                ...prev[special],
                [e.target.name] : e.target.value
            }

            return prev;
        } )
    };

      useEffect( ()=>{
          setSelectedCategory(special);
          setDetails( (prev)=>{
            return{
                ...prev,
                'category' : special
            }
        } )
        } , [special] )
        
        console.log(details)
        console.log(special)

  return (
    <div className="data-cont">
            <h2> Add Details of Product </h2>

                <h3> Add Special Product { (special != 'none') && ` ( ${special} ) ` } </h3>
            <div className="special-prod">
                <div className="tractor" onClick={ ()=>handleSpecial('tractor') } style={{ backgroundColor : (special == 'tractor') && 'rgb(172, 172, 190)', color: (special == 'tractor') && 'rgb(47, 75, 218)' }} >
                    <AgricultureIcon className='agri-icon' style={{fontSize : 80}} />
                    { (special == 'tractor') ? "Tractor Selected" : "Add a Tractor" }
                    { (special == 'tractor') ? <DoneIcon style={{ fontSize : 40, margin : "0.5rem 0rem",   }} /> : <AddIcon style={{ fontSize : 40, margin : "0.5rem 0rem",   }} /> }
                </div>

                <div className="tractor" onClick={ ()=>handleSpecial('cultivator') } style={{ backgroundColor : (special == 'cultivator') && 'rgb(172, 172, 190)', color: (special == 'cultivator') && 'rgb(47, 75, 218)' }} >
                    <CallMissedOutgoingIcon className='agri-icon' style={{fontSize : 80}} />
                    { (special == 'cultivator') ? "Cultivator Selected" : "Add a Cultivator" }
                    { (special == 'cultivator') ? <DoneIcon style={{ fontSize : 40, margin : "0.5rem 0rem",   }} /> : <AddIcon style={{ fontSize : 40, margin : "0.5rem 0rem",   }} /> }
                </div>

                <div className="tractor" onClick={ ()=>handleSpecial('trolly') } style={{ backgroundColor : (special == 'trolly') && 'rgb(172, 172, 190)', color: (special == 'trolly') && 'rgb(47, 75, 218)' }} >
                    <ChildFriendlyOutlinedIcon className='agri-icon' style={{fontSize : 80}} />
                    { (special == 'trolly') ? "Trolly Selected" : "Add a Trolly" }
                    { (special == 'trolly') ? <DoneIcon style={{ fontSize : 40, margin : "0.5rem 0rem",   }} /> : <AddIcon style={{ fontSize : 40, margin : "0.5rem 0rem",   }} /> }
                </div>

                <div className="tractor" onClick={ ()=>handleSpecial('rotavator') } style={{ backgroundColor : (special == 'rotavator') && 'rgb(172, 172, 190)', color: (special == 'rotavator') && 'rgb(47, 75, 218)' }} >
                    <BubbleChartOutlinedIcon className='agri-icon' style={{fontSize : 80}} />
                    { (special == 'rotavator') ? "Rotavator Selected" : "Add a Rotavator" }
                    { (special == 'rotavator') ? <DoneIcon style={{ fontSize : 40, margin : "0.5rem 0rem",   }} /> : <AddIcon style={{ fontSize : 40, margin : "0.5rem 0rem",   }} /> }
                </div>

                <div className="tractor" onClick={ ()=>handleSpecial('harvestor') } style={{ backgroundColor : (special == 'harvestor') && 'rgb(172, 172, 190)', color: (special == 'harvestor') && 'rgb(47, 75, 218)' }} >
                    <AttractionsOutlinedIcon className='agri-icon' style={{fontSize : 80}} />
                    { (special == 'harvestor') ? "Harvestor Selected" : "Add a Harvestor" }
                    { (special == 'harvestor') ? <DoneIcon style={{ fontSize : 40, margin : "0.5rem 0rem",   }} /> : <AddIcon style={{ fontSize : 40, margin : "0.5rem 0rem",   }} /> }
                </div>

                <div className="tractor" onClick={ ()=>handleSpecial('seed') } style={{ backgroundColor : (special == 'seed') && 'rgb(172, 172, 190)', color: (special == 'seed') && 'rgb(47, 75, 218)' }} >
                    <WaterDropOutlinedIcon className='agri-icon' style={{fontSize : 80}} />
                    { (special == 'seed') ? "Seed Drill Selected" : "Add a Seed Drill" }
                    { (special == 'seed') ? <DoneIcon style={{ fontSize : 40, margin : "0.5rem 0rem",   }} /> : <AddIcon style={{ fontSize : 40, margin : "0.5rem 0rem",   }} /> }
                </div>

            </div>

            <label>Name</label>
            <input name='name' value={details && details.name} placeholder='Name' onChange={handleChange} />

            <label>Description</label>
            <textarea name='description'  value={details && details.description} placeholder='Description' onChange={handleChange} />
            
            <label>Price</label>
            <input name='price' value={details && details.price} placeholder='Price' onChange={handleChange} />

            <label>
            Category:
            </label>
                <select value={selectedCategory} name='category' onChange={ (e,value)=>{setSelectedCategory(e.target.value); setSpecial(e.target.value); handleChange(e); } }>
                <option value="none">None</option>
                <option value="Vechiel">Vechiel</option>
                <option value="tractor">Tractor</option>
                <option value="harvestor">Harvestor</option>
                <option value="cultivator">Cultivator</option>
                <option value="trolly">Trolly</option>
                <option value="rotavator">Rotavator</option>
                <option value="seed">Seed</option>
                </select>
            
            {
                (special == 'tractor') && <Fragment>

                    <h3> Add details of tractor </h3>

                    <label> Brand </label>
                    <input name='brand' value={details.brand} placeholder='Brand' onChange={handleSpecialDataChange} />

                    <label> Manufacturing Year </label>
                    <input name='Manufacturing Year' value={details.brand} placeholder='Year' onChange={handleSpecialDataChange} />

                    <label>Model</label>
                    <input name='Model' value={details.model} placeholder='Model' onChange={handleSpecialDataChange} />

                    <label> Dent </label>
                    <input name='Dent' value={details.brand} placeholder='Dent' onChange={handleSpecialDataChange} />

                    <label>Tyre</label>
                    <input name='Tyre' value={details.tyre} placeholder='Tyre' onChange={handleSpecialDataChange} />

                    <label>Hours</label>
                    <input name='Hours' value={details.hours} placeholder='Hours' onChange={handleSpecialDataChange} />

                    <label> HP </label>
                    <input name='HP' value={details.brand} placeholder='HP' onChange={handleSpecialDataChange} />

                    <label> Financer / Noc </label>
                    <input name='Financer / Noc' value={details.brand} placeholder='Financer / Noc' onChange={handleSpecialDataChange} />

                </Fragment>                
            }

            {
                (special == 'trolly') && <Fragment>

                    <h3> Add details of Trolly </h3>

                    <label> Manufacturing Year </label>
                    <input name='Manufacturing Year' value={details.brand} placeholder='Manufacturing Year' onChange={handleSpecialDataChange} />

                    <label>Tyre</label>
                    <input name='Tyre' value={details.tyre} placeholder='Tyre' onChange={handleSpecialDataChange} />

                </Fragment>                
            }

{
                (special == 'harvestor') && <Fragment>

                    <h3> Add details of Harvestor </h3>

                    <label> Manufacturing Year </label>
                    <input name='Manufacturing Year' value={details.brand} placeholder='Manufacturing Year' onChange={handleSpecialDataChange} />

                    <label>Tyre</label>
                    <input name='Tyre' value={details.tyre} placeholder='Tyre' onChange={handleSpecialDataChange} />

                    <label> Brand </label>
                    <input name='Brand' value={details.brand} placeholder='Brand' onChange={handleSpecialDataChange} />

                </Fragment>                
            }

            {
                (special == 'cultivator') && <Fragment>

                    <h3> Add details of Cultivator </h3>

                    <label> Manufacturing Year </label>
                    <input name='Manufacturing Year' value={details.brand} placeholder='Manufacturing Year' onChange={handleSpecialDataChange} />

                    <label>Weight</label>
                    <input name='Weight' value={details.tyre} placeholder='Weight' onChange={handleSpecialDataChange} />

                    <label> Brand </label>
                    <input name='Brand' value={details.brand} placeholder='Brand' onChange={handleSpecialDataChange} />
                    
                    <label>Tiles</label>
                    <input name='Tiles' value={details.tyre} placeholder='Tiles' onChange={handleSpecialDataChange} />

                    <label> Size Feet </label>
                    <input name='Size Feet' value={details.brand} placeholder='Size Feet' onChange={handleSpecialDataChange} />

                </Fragment>                
            }

{
                (special == 'rotavator') && <Fragment>

                    <h3> Add details of Rotavator </h3>

                    <label> Manufacturing Year </label>
                    <input name='Manufacturing Year' value={details.brand} placeholder='Manufacturing Year' onChange={handleSpecialDataChange} />

                    <label> Blades </label>
                    <input name='Blades' value={details.brand} placeholder='Blades' onChange={handleSpecialDataChange} />
                    
                    <label> Size Feet </label>
                    <input name='Size Feet' value={details.brand} placeholder='Size Feet' onChange={handleSpecialDataChange} />

                </Fragment>                
            }

{
                (special == 'seed') && <Fragment>

                    <h3> Add details of Seed Drill </h3>

                    <label> Manufacturing Year </label>
                    <input name='Manufacturing Year' value={details.brand} placeholder='Manufacturing Year' onChange={handleSpecialDataChange} />

                    <label> Size </label>
                    <input name='Size' value={details.brand} placeholder='Size' onChange={handleSpecialDataChange} />

                    <label> Brand </label>
                    <input name='Brand' value={details.brand} placeholder='Brand' onChange={handleSpecialDataChange} />
                    
                </Fragment>                
            }




            <button onClick={handleSubmit}> Submit </button>
            
        </div>
  )
}

export default BasicProductDetail
