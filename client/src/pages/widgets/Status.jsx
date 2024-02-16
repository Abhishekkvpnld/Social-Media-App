import { Box } from '@mui/material'
import React,{useEffect, useState} from 'react'
import status from './png-clipart-swagger-application-programming-interface-representational-state-transfer-openapi-specification-logo-whatsapp-status-cartoon-logo-grass-thumbnail.png' 
import FlexBetween from 'components/FlexBetween';
import convertToBase64  from "../../components/Convert";
import {useSelector } from "react-redux";


 function Status ({userId}) {

  const token = useSelector((state) => state.token);
  // const {userId} = useSelector((state) => state.user);
  const [file,setFile] = useState('');


 useEffect(()=>{

const userStatus = async ()=>{
    
    const response = await fetch(`https://shareburst.onrender.com/status/${userId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log('status******',data)
  }

  },[token,userId])

    

   /**converting file to base64 format */
   const onUpload = async e => {
    try {
      const base64 = await convertToBase64(e.target.files[0]);
      setFile(base64);
    } catch (error) {
      console.error('Error converting file to base64:', error);
    }
  };
  

  return (
    <FlexBetween>

   {/* ( <Box>
    <label htmlFor="status">
              <img src={file}
               alt="status"
                className="status" 
                style={{ objectFit: "cover", borderRadius: "50%" }}
                width="60px"
                height='60px'
              />
    </label>
              <input onChange={onUpload} type="file" id='status' name='status' style={{display:"none"}} />

</Box>) */}

<Box margin='5px'>
  
<h3 >status</h3>
<form>
  <label htmlFor="status">

    <img
    id='statusImg'
    style={{ objectFit: "cover", borderRadius: "50%" ,border:"3px dashed green"}}
    width="60px"
    height='60px'
    alt="status"
    // src={`https://media.istockphoto.com/id/639695818/photo/photographer-workplace.jpg?s=1024x1024&w=is&k=20&c=3puvOnZJWmuXv_5L76LLroWemCqVvZ-5_Oux_xvEa7w=`}
    src={file ? file : status}
    title='Add status'
    />

    </label>
    <input onChange={onUpload} type="file" id='status' name='status' style={{display:'none'}} />

    </form>
</Box>

    </FlexBetween>
  )
}

export default Status;