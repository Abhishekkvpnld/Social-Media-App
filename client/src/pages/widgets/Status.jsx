
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import status from './png-clipart-swagger-application-programming-interface-representational-state-transfer-openapi-specification-logo-whatsapp-status-cartoon-logo-grass-thumbnail.png'
import FlexBetween from 'components/FlexBetween';
import friendStatusImg from "./vector-flat-illustration-grayscale-avatar-600nw-2281862025.webp"
import cancelIcon from "./icons8-cancel.svg"
import convertToBase64 from "../../components/Convert";
import { useSelector } from "react-redux";
import axios from 'axios';


function Status({ userId }) {

  const token = useSelector((state) => state.token);
  const [file, setFile] = useState('');
  const [userData, setUserData] = useState({});
const [friendData,setFriendData] = useState([]);
const [viewStatus,setViewStatus] = useState('');
const [friendStatusImage,setFriendStatusImage] = useState('');
const [imageUrl,setImageUrl] = useState("")



useEffect(()=>{
userStatus();
friendStatus();
},[]);// eslint-disable-line react-hooks/exhaustive-deps

  /* Backend connection */
  const userStatus = async () => {
   
console.log(imageUrl)
    if(imageUrl){

      const requestBody = {
        base64Data: imageUrl
      };
      
      const response = await fetch(`http://localhost:4000/status/${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json" // Specify JSON content type
        },
        body: JSON.stringify(requestBody) // Convert the request data to JSON string
      });
      const data = await response.json();
      setUserData(data);
    }else{

      const response = await fetch(`http://localhost:4000/status/${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json();
      setUserData(data);
    }
    
  }




 const friendStatus = async()=>{
  const response = await fetch(`http://localhost:4000/status/friendStatus/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
  setFriendData(data);
 }



  /**converting file to base64 format */
  const onUpload = async e => {
    try {
      const base64 = await convertToBase64(e.target.files[0]);
      setFile(base64);
     setImageUrl(base64)
      await userStatus();
    } catch (error) {
      console.error('Error converting file to base64:', error);
    }
  };

  /** status view **/
  const statusView = async(image)=>{
    setViewStatus(!viewStatus);
setFriendStatusImage(image);
  }


  return (

    <FlexBetween>

{

viewStatus?

<div onClick={statusView} width="100%" height="100%" style={{display:'flex',alignItems:'center',justifyContent:"center" ,position:"absolute", backdropFilter: "blur(5px)",paddingTop:"200px",marginTop:"50px"}}>
  <img src={friendStatusImage || friendStatusImg} alt="" height="70%" width="70%" style={{zIndex:1}} />
  <img src={cancelIcon} alt="" />
</div>

:
  <img src="" alt="" style={{display:"none"}} />
}




{friendData[0] ? 
      (
        <Box margin='5px'>

          <h3>status</h3>
          <label htmlFor="status">
            <img
              id='statusImg'
              style={{ objectFit: "cover", borderRadius: "50%", border: "3px dashed green", margin: "2px", padding: "1px" }}
              width="60px"
              height='60px'
              alt="status"
              src={ file ? file : userData?.status || status }
              title='Add status'
            />
          </label>
          <input onChange={onUpload} type="file" id='status' name='status' style={{ display: 'none' }} />
          
          {friendData?.map((friend, index) => (
            
            <img
            onClick={() => statusView(friend.status)}
              key={index}
              style={{ objectFit: "cover", borderRadius: "50%", border: "3px dashed green", padding: "1px", margin: "2px" }}
              width="60px"
              height='60px'
              alt="status"
              src={friend?.status || friendStatusImg}
              title={friend.firstName}
            />

          ))}
        </Box>
      )

        :

(<Box margin='5px'>


<h3 >status</h3>
        <label htmlFor="status">

          <img
            id='statusImg'
            style={{ objectFit: "cover", borderRadius: "50%", border: "3px dashed green", margin: "2px",padding:"1px" }}
            width="60px"
            height='60px'
            alt="status"
            src={userData?.status ? userData.status : file ? file : status}
            title='Add status'
          />

        </label>
        <input onChange={onUpload} type="file" id='status' name='status' style={{ display: 'none' }} />

        <img
        id='statusImg'
        style={{ objectFit: "cover", borderRadius: "50%", border: "3px dashed green", padding: "1px", margin: "2px" }}
        width="60px"
        height='60px'
        alt="status"
        src={friendStatusImg}
        title='status'
      />

      <img
        id='statusImg'
        style={{ objectFit: "cover", borderRadius: "50%", border: "3px dashed green", padding: "1px", margin: "2px" }}
        width="60px"
        height='60px'
        alt="status"
        src={friendStatusImg}
        title='status'
      />

      <img
        id='statusImg'
        style={{ objectFit: "cover", borderRadius: "50%", border: "3px dashed green", padding: "1px", margin: "2px" }}
        width="60px"
        height='60px'
        alt="status"
        src={friendStatusImg}
        title='status'
      />

      <img
        id='statusImg'
        style={{ objectFit: "cover", borderRadius: "50%", border: "3px dashed green", padding: "1px", margin: "2px" }}
        width="60px"
        height='60px'
        alt="status"
        src={friendStatusImg}
        title='status'
      />

      <img
        id='statusImg'
        style={{ objectFit: "cover", borderRadius: "50%", border: "3px dashed green", padding: "1px", margin: "2px" }}
        width="60px"
        height='60px'
        alt="status"
        src={friendStatusImg}
        title='status'
      />
     

      </Box>)
}
    </FlexBetween>
  )
}

export default Status;



