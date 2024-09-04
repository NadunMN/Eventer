import { Box, Stack, Button, Typography, TextField, Avatar, InputAdornment, IconButton, Menu, MenuItem, Divider } from '@mui/material';
import React, { useState,useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
// import Divider from '@mui/material/Divider';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import image from '../asset/commu.jpg'
import FormDialog from "./DeleteDialog";

function Myprofile() {
    const [anchorEl, setAnchorEl] = useState(null);
    // const open = Boolean(anchorEl);
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [open, setOpen] = useState(false);
  
    const [editedValues, setEditedValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        bio: '',
        phone: ''
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
      };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };
  

    const handleFileChange = (event) => {
        const newFile = event.target.files[0];
        if (newFile) {
            setFile(newFile);
            setPreview(URL.createObjectURL(newFile)); // Create a preview URL for the selected file
        }
    };

    const handleRemovePhoto = () => {
        setFile(null);
        setPreview(null); // Clear the preview
        handleClose();
    };



    const [userId, setUserId] = useState("");

    console.log(user);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const user_id = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (user_id) {
            const jsonString = JSON.stringify(user_id);
            const jwtToken = jwtDecode(jsonString);
            // console.log(jwtToken);
            setUserId(jwtToken._id); // This will trigger the second useEffect
        }
    }, [user_id]);

    useEffect(() => {
        if (userId) {
            const fetchUser = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/getUserById/${userId}`);
                    let userData = response.data;
                    setUser(userData);
                    setEditedValues({
                        first_name: userData.first_name || '',
                        last_name: userData.last_name || '',
                        email: userData.email || '',
                        bio: userData.Bio || '',
                        phone: userData.phone || ''
                    });
                    setLoading(false);
                } catch (error) {
                    console.error("Failed to fetch the user:", error);
                    setError("Failed to fetch the user");
                    setLoading(false);
                }
            };
    
            fetchUser();
        }
    }, [userId]);

    const handleEditClick = () => {
        
        setIsEditing((prev) => !prev);
        console.log(isEditing);
        
    };



    const handleSaveClick = async () => {
        try {
            // Save updated data to the database
            await axios.put(`http://localhost:5000/api/updateUser/${userId}`, editedValues);
            // Update user state with new data if needed
            setUser(prev => ({
                ...prev,
                ...editedValues
            }));
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to save the user:", error);
        }
    };



    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>{error}</Typography>;
    
    return (
        <Stack
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                gap: 3,
            }}
        >
            <Box sx={{display: 'flex',gap: 23}}>
          <Typography variant='h4' color='#311b92' sx={{fontWeight: 'bold'}}>Personal Details Account configurations</Typography>
          <Button
                    variant="contained"
                    endIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                    size="large"
                    sx={{
                        bgcolor: isEditing ? 'red' : '#311b92',
                        width: 130,
                        fontSize: '15px',
                        height: 40,
                        '&:hover': {
                            bgcolor: isEditing ? 'darkred' : '#512da8',
                            cursor: 'pointer',
                        },
                    }}
                    disableElevation
                    onClick={isEditing ? handleSaveClick : handleEditClick}
                >
                    {isEditing ? 'Save' : 'Edit'}
                </Button>

                </Box>
            <Box sx={{ width: '85%', bgcolor: '#ede7f6', borderRadius: 3, height: 'auto' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <TextField
                    id="first-name-input"
                    value={isEditing ? editedValues.first_name : (user.first_name || 'First name')}
                    helperText='Your first-name may appear around GitHub where you contribute or are mentioned.'
                    label={isEditing ? "Edit" : "Disabled"}
                    onChange={(e) => setEditedValues({ ...editedValues, first_name: e.target.value })}
                    sx={{ width: '70%', ml: 5, my: 5 }}
                    InputProps={{
                        readOnly: !isEditing,
                    }}
                />

                    

                    {/* <Divider/> */}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, height: 50 }}>
                    <TextField
                        id="last-name-input"
                        value={isEditing ? editedValues.last_name : (user.last_name || 'last name')}
                        helperText ='Your last-name may appear around GitHub where you contribute or are mentioned. '
                        label={isEditing ? "Edit" : "Disabled"}
                    onChange={(e) => setEditedValues({ ...editedValues, last_name: e.target.value })}
                    sx={{ width: '70%', ml: 5, my: 5 }}
                    InputProps={{
                        readOnly: !isEditing,
                    }}
                    />
                    
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <TextField
                        id="phone-number-input"
                        value={isEditing ? editedValues.phone_number : (user.phone_number || '07x xxx xxxx')}
                        helperText ="Enter a valid phone number including the country code."
                        label={isEditing ? "Edit" : "Disabled"}
                    onChange={(e) => setEditedValues({ ...editedValues, phone_number: e.target.value })}
                    sx={{ width: '70%', ml: 5, my: 5 }}
                    InputProps={{
                        readOnly: !isEditing,
                    }}
                    />
                    
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, height: 50 }}>
                    <TextField
                        id="email-input"
                        value={isEditing ? editedValues.email : (user.email || 'xxxxxxx@gmial.com')}
                        helperText ="Enter a valid email address you frequently check. 
                        This email will be used for account notifications and recovery."
                        label={isEditing ? "Edit" : "Disabled"}
                        onChange={(e) => setEditedValues({ ...editedValues, email: e.target.value })}
                        sx={{ width: '70%', ml: 5, my: 5 }}
                        InputProps={{
                            readOnly: !isEditing,
                        }}
                    />
                    
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <TextField
                        id="bio-input"
                        value={isEditing ? editedValues.Bio : (user.Bio || 'Introduce your self...')}
                        helperText ="Write a brief introduction about yourself. Max 150 characters. 
                        Share something interesting about yourself, such as hobbies or profession."
                        label={isEditing ? "Edit" : "Disabled"}
                        onChange={(e) => setEditedValues({ ...editedValues, Bio: e.target.value })}
                        sx={{ width: '70%', ml: 5, my: 5 }}
                        InputProps={{
                            readOnly: !isEditing,
                        }}
                    />
                    
                </Box>
            </Box>

            <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
                <Box sx={{ width: '42%', height: 500, bgcolor: '#ede7f6', borderRadius: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant='h4' color='primary' sx={{mb:2,}}>Profile Picture</Typography>
                  <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <Avatar
                alt="Profile Photo"
                src={preview} // Use preview URL or default avatar
                sx={{ width: 200, height: 200 }}
            />
            <IconButton
                aria-label="edit"
                onClick={handleClick}
                sx={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    backgroundColor: '#311b92',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#512da8',
                    },
                }}
            >
                <EditIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{
                    '& .MuiMenuItem-root': {
                        fontSize: '16px',
                        padding: '8px 16px',
                    },
                }}
            >
                <MenuItem
                    onClick={() => {
                        handleClose();
                        document.getElementById('upload-photo-input').click();
                    }}
                >
                    Upload a photo...
                </MenuItem>
                <input
                    type="file"
                    id="upload-photo-input"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <MenuItem onClick={handleRemovePhoto}>
                    Remove photo
                </MenuItem>
            </Menu>
        </Box>


                    <Typography variant='body1' sx={{ml:-1, mt:1, width:400}}>Upload Photo Prompt</Typography>

                    <Typography variant='body2' color='primary' sx={{ml:-1, mt:1, width:400}}>"Choose a new profile picture to represent yourself."
                    </Typography>

                    <Typography variant='body1' sx={{ml:-1, mt:1, width:400}}>Upload Button</Typography>
                    <Typography variant='body2' color='primary' sx={{ml:-1, mt:1, width:400}}>"Upload a new photo,Change profile picture"</Typography>

                    <Typography variant='body1' sx={{ml:-1, mt:1, width:400}}>Remove Photo Prompt</Typography>
                    <Typography variant='body2' color='primary' sx={{ml:-1, mt:1, width:400}}>"Remove your current profile picture.Delete this photo and revert to the default avatar."</Typography>
                    
                </Box>

                <Box sx={{ width: '40%', height: 500, bgcolor: '#ede7f6', borderRadius: 3, display: 'flex', flexDirection: 'column', }}>
                    <Typography variant='h4' color='error' sx={{m: 3, display: 'flex', justifyContent: 'center'}}>Danger Zone</Typography>
                    <Typography variant='h6' sx={{ml:3}}>Delete this Account</Typography>
                    <Typography variant='body1' sx={{ml:3, mt:1, width:400}}>Once you delete a Account, there is no going back. Please be certain.</Typography>
                    <Typography variant='body2' color='darkred' sx={{ml:3, mt:1, width:400}}>"All your data will be permanently erased, and it cannot be recovered."</Typography>
                    <Typography variant='body2' color='darkred' sx={{ml:3, mt:1, width:400}}>"You will lose access to all your content, subscriptions, and services."</Typography>
                    <Typography variant='body2' color='darkred' sx={{ml:3, mt:1, width:400}}>"Any remaining balances or credits in your account will be forfeited."</Typography>
                    <Typography variant='body2' color='darkred' sx={{ml:3, mt:1, width:400}}>"Your profile, including any saved preferences, will be deleted."</Typography>
                    <Typography variant='body2' color='darkred' sx={{ml:3, mt:1, width:400}}>"This action is irreversible, so make sure you have saved any important information."</Typography>
                    {/* <Button variant='contained' color='error' 
                    onClick={handleClickOpen}
                    sx={{width:'auto', height:35, mx:3, mt: 2}}>Delete this account</Button> */}
                    <FormDialog/>
                </Box>
            </Stack>
            
        </Stack>
    );
}

export default Myprofile;
