
import { Box, Dialog, DialogContent } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FlexBetween from 'components/FlexBetween';
import friendStatusImg from "./vector-flat-illustration-grayscale-avatar-600nw-2281862025.webp"
import status from './png-clipart-swagger-application-programming-interface-representational-state-transfer-openapi-specification-logo-whatsapp-status-cartoon-logo-grass-thumbnail.png';
import cancelIcon from "./icons8-cancel.svg";
import { useSelector } from "react-redux";
import { BACKEND_URL } from 'variable';
import { Link } from 'react-router-dom';



function Status({ userId }) {

  const token = useSelector((state) => state.token);

  const [friendData, setFriendData] = useState([]);
  const [viewStatus, setViewStatus] = useState(false);
  const [friendStatusImage, setFriendStatusImage] = useState('');
  const [imageURL, setImageURL] = useState(null);

  console.log(friendData)


  useEffect(() => {
    friendStatus();
    fetchUserStatus();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps



  /* Backend connection */
  const fetchUserStatus = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/status/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },

      });
      const data = await response.json();
      setImageURL(data.imageURL); // Set imageURL to the URL of the image
    } catch (error) {
      console.error('Error fetching user status:', error);
    }
  };



  const friendStatus = async () => {
    const response = await fetch(`${BACKEND_URL}/status/friendStatus/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setFriendData(data);
  }


  /** status view **/
  const statusView = async (image) => {
    setViewStatus(!viewStatus);
    setFriendStatusImage(image);
  };

  const closeStatus = async () => {
    setViewStatus(false)
  };


  return (

    <FlexBetween>


      <Dialog open={viewStatus} onClose={closeStatus}>
        <DialogContent>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
            <img src={friendStatusImage || friendStatusImg} alt="" height="70%" width="70%" />
            <img src={cancelIcon} alt="" onClick={closeStatus} />
          </div>
        </DialogContent>
      </Dialog>




      {friendData[0] ?

        (<Box margin='5px'>

          <h3>status</h3>
          <Link to={`/profile/${userId}`}>
            <img
              id='statusImg'
              style={{ objectFit: "cover", borderRadius: "50%", border: "3px dashed green", padding: "1px", margin: "2px" }}
              width="60px"
              height='60px'
              alt="status"
              src={imageURL || status}
              title='status'
            />
          </Link>
          {friendData?.map((friend, index) => (

            <img
              onClick={() => statusView(friend.imageURL)}
              key={index}
              style={{ objectFit: "cover", borderRadius: "50%", border: "3px dashed green", padding: "1px", margin: "2px" }}
              width="60px"
              height='60px'
              alt="status"
              src={friend?.imageURL || friendStatusImg}
              title={friend.username}
            />

          ))}
        </Box>
        )

        :

        (<Box margin='5px'>
          <Link to={`/profile/${userId}`}>
            <img
              id='statusImg'
              style={{ objectFit: "cover", borderRadius: "50%", border: "3px dashed green", padding: "1px", margin: "2px" }}
              width="60px"
              height='60px'
              alt="status"
              src={imageURL || status}
              title='status'
            />
          </Link>

          {Array.from({ length: 5 }).map((_, index) => (
            <img
              key={index}
              id='statusImg'
              style={{ objectFit: "cover", borderRadius: "50%", border: "3px dashed green", padding: "1px", margin: "2px" }}
              width="60px"
              height='60px'
              alt="status"
              src={friendStatusImg}
              title='status'
            />
          ))};

        </Box>)
      }
    </FlexBetween>
  )
}

export default Status;



