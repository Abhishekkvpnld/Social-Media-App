import { Box, Button, Typography } from '@mui/material';
import convertToBase64 from 'components/Convert';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import status from './png-clipart-swagger-application-programming-interface-representational-state-transfer-openapi-specification-logo-whatsapp-status-cartoon-logo-grass-thumbnail.png';
import toast from 'react-hot-toast';
import { dark } from '@mui/material/styles/createPalette';
import { BACKEND_URL } from 'variable';

function UserStatus({ userId }) { // Destructure userId from props

    const token = useSelector((state) => state.token);
    const [selectedFile, setSelectedFile] = useState(null);
    const [file, setFile] = useState('');
    const [userData, setUserData] = useState(null);
    const [imageURL, setImageURL] = useState();


    const onUpload = async (e) => {
        const statusFile = e.target.files[0];
        setSelectedFile(statusFile);
        // Convert file to base64 for display
        const base64 = await convertToBase64(statusFile);
        setFile(base64);
    };

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
            const response = await fetch(`${BACKEND_URL}/status/${userId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData
            });
            const data = await response.json();
            setUserData(data);
            toast.success(data?.message);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };



    const onDelete = async () => {

        try {
            const response = await fetch(`${BACKEND_URL}/status/${userId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            toast.success(data?.message, { duration: 4000, position: 'top-right' });
        } catch (error) {
            console.error('Error uploading file:', error);
        };
    };


    useEffect(() => {
        fetchUserStatus();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <Typography variant="h5" color={dark} fontWeight="500">Status</Typography>
            <Box margin={"5px"} >
                <form action="" style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                    <label htmlFor="status">
                        <img
                            id='statusImg'
                            style={{ objectFit: "cover", borderRadius: "50%", border: "3px dashed green", margin: "2px", padding: "1px" }}
                            width="60px"
                            height='60px'
                            alt="status"
                            src={file || userData?.imageURL || status} // Display user status image or file
                            title='Add status'
                        />
                    </label>
                    <input onChange={onUpload} type="file" id='status' name='files' accept="image/*" style={{ display: 'none' }} />
                    <Button onClick={onSubmit} sx={{ margin: "5px", border: "1px solid green" }} color='success'>Add</Button>
                    <Button onClick={onDelete} sx={{ margin: "5px", border: "1px solid red" }} color='error'>Delete</Button>
                </form>
            </Box>
            <img width={"100%"} height={"100%"} src={imageURL} alt=''/> 
        </div>
    )
};

export default UserStatus;
