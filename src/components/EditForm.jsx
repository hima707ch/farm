import React, { useEffect, useRef, useState } from 'react'
import './styles/sell.css'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BasicProductDetail from './blocks/BasicProductDetail';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const EditForm = ({prev, seteditForm}) => {

    const inputRef = useRef(null);
    const [imagesArray, setImagesArray] = useState([]);
    const [imagesLinkArray, setimagesLinkArray] = useState(prev.images)

    const { enqueueSnackbar } = useSnackbar();

    const handleUploadClick = () => {        
        inputRef.current.click();
      };

    const handleFileChange = (e) => {

        const files = e.target.files;
        setImagesArray( [...imagesArray , ...Object.values(files)] );
    };

    useEffect( ()=>{ console.log(typeof(imagesArray)) }, [imagesArray] )

    function removeInd(arr,ind){
      return arr.filter( (ele, index) =>{
        if(ind == index){
          return false;
        }
        return true;
      } )
    }

  async function deleteImage(public_id){
    const resp = await axios.put(`https://jdgsjq-4000.csb.app/api/v1/product/${ prev._id }`, {delete_public_id : public_id},{ withCredentials: true });
    console.log(resp.data);

    enqueueSnackbar("Successfully Deleted", {variant : 'success', anchorOrigin : {
      vertical: 'top',
      horizontal: 'right',
    }}, 
    );

  }

  return (
    <div className='overlay'>
      <button className='close2' onClick={()=>seteditForm(false)}> <CloseIcon style={{fontSize:"40"}} /> </button>
    <div className='sell-cont edit-cont'>


        <div className="image-cont">

            <div className="image-list">
             {
               imagesLinkArray.map( (img, ind)=> <div style={{display:'flex'}}> <img src = {img.url}/> <button onClick={()=> { setimagesLinkArray( removeInd(imagesLinkArray,ind) ); deleteImage(img.public_id); } } className='close2 remove'>Remove</button> </div>  )
             }
            
            {
                imagesArray.map( (ele, ind)=>{
                    const url = URL.createObjectURL(ele);
                    return <div style={{display:'flex'}}> <img src = {url}/> <button onClick={()=> { setImagesArray( removeInd(imagesLinkArray,ind) );  }  } className='close2 remove' >Remove</button> </div>
                } )
            }
            </div>

            <div className="upload" onClick={handleUploadClick}> 
            <FileUploadIcon style={{ fontSize: 80, color : "grey" }} />
            <p> Add Image </p>
            </div>

            <input type='file' multiple ref={inputRef} style={{ display: 'none' }} onChange={handleFileChange} />

            

        </div>

        <BasicProductDetail prev={prev} images = {imagesArray} type="edit" />

        <div className="hei">
                
                </div>
    </div>
    </div>
  )
}

export default EditForm