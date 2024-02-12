import React, { useEffect, useRef, useState } from 'react'
import './styles/sell.css'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BasicProductDetail from './blocks/BasicProductDetail';

const AddNew = () => {

    const inputRef = useRef(null);
    const [imagesArray, setImagesArray] = useState([]);

    const handleUploadClick = () => {        
        inputRef.current.click();
      };

    const handleFileChange = (e) => {

        const files = e.target.files;
        setImagesArray( [...imagesArray , ...Object.values(files)] );
    };

    useEffect( ()=>{ console.log(typeof(imagesArray)) }, [imagesArray] )

  return (
    <div className='sell-cont'>


        <div className="image-cont">

            <div className="image-list">
            {
                imagesArray.map( (ele)=>{
                    const url = URL.createObjectURL(ele);
                    return <img src = {url} />
                } )
            }
            </div>

            <div className="upload" onClick={handleUploadClick}> 
            <FileUploadIcon style={{ fontSize: 80, color : "grey" }} />
            <p> Add Image </p>
            </div>

            <input type='file' multiple ref={inputRef} style={{ display: 'none' }} onChange={handleFileChange} />

            

        </div>

        <BasicProductDetail images = {imagesArray} type="new" />

    </div>
  )
}

export default AddNew