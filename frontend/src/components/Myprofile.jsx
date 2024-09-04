import { Box, Stack, Button, Typography, TextField, Avatar, InputAdornment, IconButton, Menu, MenuItem, Divider } from '@mui/material';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
// import Divider from '@mui/material/Divider';

function Myprofile() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const countFavorite = 0; // Define this variable or update according to your logic

    return (
        <Stack
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                gap: 3,
            }}
        >
          <Typography variant='h4' color='#311b92' sx={{fontWeight: 'bold'}}>Personal Details Account configurations</Typography>
            <Box sx={{ width: '85%', bgcolor: '#ede7f6', borderRadius: 3, height: 'auto' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <TextField
                        id="first-name-input"
                        defaultValue="First Name"
                        helperText ='Your first-name may appear around GitHub where you contribute or are mentioned. '
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{ width: '70%', ml: 5, my: 5 }}
                    />
                    <Button
                        variant="contained"
                        endIcon={<EditIcon />}
                        size="large"
                        sx={{
                            bgcolor: '#311b92',
                            width: 130,
                            fontSize: '15px',
                            height: 40,
                            '&:hover': {
                                bgcolor: '#512da8',
                                cursor: 'pointer',
                            },
                        }}
                        disableElevation
                    >
                        Edit
                    </Button>
                    {/* <Divider/> */}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, height: 50 }}>
                    <TextField
                        id="last-name-input"
                        defaultValue="Last Name"
                        helperText ='Your last-name may appear around GitHub where you contribute or are mentioned. '
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{ width: '70%', ml: 5, my: 5 }}
                    />
                    <Button
                        variant="contained"
                        endIcon={<EditIcon />}
                        size="large"
                        sx={{
                            bgcolor: '#311b92',
                            width: 130,
                            fontSize: '15px',
                            height: 40,
                            '&:hover': {
                                bgcolor: '#512da8',
                                cursor: 'pointer',
                            },
                        }}
                        disableElevation
                    >
                        Edit
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <TextField
                        id="phone-number-input"
                        defaultValue="Phone Number"
                        helperText ="Enter a valid phone number including the country code."
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{ width: '70%', ml: 5, my: 5 }}
                    />
                    <Button
                        variant="contained"
                        endIcon={<EditIcon />}
                        size="large"
                        sx={{
                            bgcolor: '#311b92',
                            width: 130,
                            fontSize: '15px',
                            height: 40,
                            '&:hover': {
                                bgcolor: '#512da8',
                                cursor: 'pointer',
                            },
                        }}
                        disableElevation
                    >
                        Edit
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, height: 50 }}>
                    <TextField
                        id="email-input"
                        defaultValue="email"
                        helperText ="Enter a valid email address you frequently check. 
                        This email will be used for account notifications and recovery."
                        InputProps={{
                            readOnly: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <EditIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ width: '70%', ml: 5, my: 5 }}
                    />
                    <Button
                        variant="contained"
                        endIcon={<EditIcon />}
                        size="large"
                        sx={{
                            bgcolor: '#311b92',
                            width: 130,
                            fontSize: '15px',
                            height: 40,
                            '&:hover': {
                                bgcolor: '#512da8',
                                cursor: 'pointer',
                            },
                        }}
                        disableElevation
                    >
                        Edit
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <TextField
                        id="bio-input"
                        defaultValue="Bio"
                        helperText ="Write a brief introduction about yourself. Max 150 characters. 
                        Share something interesting about yourself, such as hobbies or profession."
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{ width: '70%', ml: 5, my: 5 }}
                    />
                    <Button
                        variant="contained"
                        endIcon={<EditIcon />}
                        size="large"
                        sx={{
                            bgcolor: '#311b92',
                            width: 130,
                            fontSize: '15px',
                            height: 40,
                            '&:hover': {
                                bgcolor: '#512da8',
                                cursor: 'pointer',
                            },
                        }}
                        disableElevation
                    >
                        Edit
                    </Button>
                </Box>
            </Box>

            <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                <Box sx={{ width: '40%', height: 500, bgcolor: '#ede7f6', borderRadius: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant='h4' color='primary' sx={{mb:2}}>Profile Picture</Typography>
                    <Box sx={{ position: 'relative', display: 'inline-block' }}>
                        <Avatar
                            alt="Profile Photo"
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
                        >
                            <MenuItem onClick={handleClose}>Upload a photo...</MenuItem>
                            <MenuItem onClick={handleClose}>Remove photo</MenuItem>
                        </Menu>
                        
                    </Box>


                    <Typography variant='body1' sx={{ml:3, mt:1, width:400}}>Upload Photo Prompt</Typography>

                    <Typography variant='body2' color='primary' sx={{ml:3, mt:1, width:400}}>"Choose a new profile picture to represent yourself."
                    </Typography>

                    <Typography variant='body1' sx={{ml:3, mt:1, width:400}}>Upload Button</Typography>
                    <Typography variant='body2' color='primary' sx={{ml:3, mt:1, width:400}}>"Upload a new photo,Change profile picture"</Typography>

                    <Typography variant='body1' sx={{ml:3, mt:1, width:400}}>Remove Photo Prompt</Typography>
                    <Typography variant='body2' color='primary' sx={{ml:3, mt:1, width:400}}>"Remove your current profile picture.Delete this photo and revert to the default avatar."</Typography>
                    
                </Box>

                <Box sx={{ width: '40%', height: 500, bgcolor: '#ede7f6', borderRadius: 10, display: 'flex', flexDirection: 'column'}}>
                    <Typography variant='h4' color='error' sx={{m: 3}}>Danger Zone</Typography>
                    <Typography variant='h6' sx={{ml:3}}>Delete this Account</Typography>
                    <Typography variant='body1' sx={{ml:3, mt:1, width:400}}>Once you delete a Account, there is no going back. Please be certain.</Typography>
                    <Typography variant='body2' color='darkred' sx={{ml:3, mt:1, width:400}}>"All your data will be permanently erased, and it cannot be recovered."</Typography>
                    <Typography variant='body2' color='darkred' sx={{ml:3, mt:1, width:400}}>"You will lose access to all your content, subscriptions, and services."</Typography>
                    <Typography variant='body2' color='darkred' sx={{ml:3, mt:1, width:400}}>"Any remaining balances or credits in your account will be forfeited."</Typography>
                    <Typography variant='body2' color='darkred' sx={{ml:3, mt:1, width:400}}>"Your profile, including any saved preferences, will be deleted."</Typography>
                    <Typography variant='body2' color='darkred' sx={{ml:3, mt:1, width:400}}>"This action is irreversible, so make sure you have saved any important information."</Typography>
                    <Button variant='contained' color='error' sx={{width:'auto', height:35, mx:3, mt: 2}}>Delete this account</Button>
                </Box>
            </Stack>
        </Stack>
    );
}

export default Myprofile;
