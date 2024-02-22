
import { Box } from '@mui/material'
import React, { useState } from 'react'
import status from './png-clipart-swagger-application-programming-interface-representational-state-transfer-openapi-specification-logo-whatsapp-status-cartoon-logo-grass-thumbnail.png'
import FlexBetween from 'components/FlexBetween';
import friendStatusImg from "./vector-flat-illustration-grayscale-avatar-600nw-2281862025.webp"
import convertToBase64 from "../../components/Convert";
import { useSelector } from "react-redux";


function Status({ userId }) {

  const token = useSelector((state) => state.token);
  const [file, setFile] = useState('');
  const [userData, setUserData] = useState({})





  /* Backend connection */
  const userStatus = async () => {
    alert(file);
    //  console.log(file);
    //  const imageURL = file
    const response = await fetch(`http://localhost:4000/status/${userId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "application/json",
      },
      // body: JSON.stringify(imageURL),
    });
    const data = await response.json();
    console.log(data.friends);
    setUserData(data);
await friendStatus();
  }


 const friendStatus = async()=>{
  const response = await fetch(`http://localhost:4000/status/friendStatus`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    // const data = await response.json();
 }



  /**converting file to base64 format */
  const onUpload = async e => {
    try {
      const base64 = await convertToBase64(e.target.files[0]);
      setFile(base64);
      await userStatus();
    } catch (error) {
      console.error('Error converting file to base64:', error);
    }
  };


  return (

    <FlexBetween>
















      {/* <Box>

              <img src={userData.status}

               alt="status"
                className="status" 
                style={{ objectFit: "cover", borderRadius: "50%" }}
                width="60px"
                height='60px'
                title='status'
               
              />

              

</Box> */}
























      <Box margin='5px'>

        <h3 >status</h3>
        <label htmlFor="status">

          <img
            id='statusImg'
            style={{ objectFit: "cover", borderRadius: "50%", border: "3px dashed green", margin: "2px" }}
            width="60px"
            height='60px'
            alt="status"
            src={file ? file : status}
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


      </Box>

    </FlexBetween>
  )
}

export default Status;



