import { Box, Button } from '@mui/material';
import convertToBase64 from 'components/Convert';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import status from './png-clipart-swagger-application-programming-interface-representational-state-transfer-openapi-specification-logo-whatsapp-status-cartoon-logo-grass-thumbnail.png';

function UserStatus({ userId }) { // Destructure userId from props

    const token = useSelector((state) => state.token);
    const [selectedFile, setSelectedFile] = useState(null);
    const [file, setFile] = useState('');
    const [userData, setUserData] = useState(null);
    const [imageURL, setImageURL] = useState(null);

    console.log(imageURL);

    const onUpload = async (e) => {
        const statusFile = e.target.files[0];
        setSelectedFile(statusFile);
        // Convert file to base64 for display
        const base64 = await convertToBase64(statusFile);
        setFile(base64);
    };

    const fetchUserStatus = async () => {
        try {
            const response = await fetch(`http://localhost:4000/status/${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setImageURL(data.imageURL); // Set imageURL to the URL of the image
            setUserData(data); // Set userData to the entire response data
        } catch (error) {
            console.error('Error fetching user status:', error);
        }
    };

    const onSubmit = async () => {
        const formData = new FormData();
        formData.append('userId', userId); // Include userId in the request body
        formData.append('files', selectedFile);

        try {
            const response = await fetch(`http://localhost:4000/status/${userId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData
            });
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    useEffect(() => {
        fetchUserStatus();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <h3>status</h3>
            <img src={userData?.imageURL} alt="User Status" /> {/* Display user status image */}
            <Box margin={"5px"} >
                <form action="" style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                    <label htmlFor="status">
                        <img
                            id='statusImg'
                            style={{ objectFit: "cover", borderRadius: "50%", border: "3px dashed green", margin: "2px", padding: "1px" }}
                            width="60px"
                            height='60px'
                            alt="status"
                            src={userData?.imageURL || file || status} // Display user status image or file
                            title='Add status'
                        />
                    </label>
                    <input onChange={onUpload} type="file" id='status' name='files' accept="image/*" style={{ display: 'none' }} />
                    <Button onClick={onSubmit} sx={{ margin: "5px", border: "1px solid black" }} color='success'>Add</Button>
                    <Button sx={{ margin: "5px", border: "1px solid red" }} color='error'>Delete</Button>
                </form>
            </Box>
        </div>
    )
}

export default UserStatus;
