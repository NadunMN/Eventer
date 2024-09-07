import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TemporaryDrawer from './Drawer'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CreateIcon from '@mui/icons-material/Create';
import GradeIcon from '@mui/icons-material/Grade';
import Divider from '@mui/material/Divider';
import Accountname from './Accountname';
import axios from 'axios';
import MediaCard from './Card';
import RegisteredEvent from './RegisteredEvent';
import FavoriteEvent from './FavoriteEvent';
import TextField from '@mui/material/TextField';
import { Avatar, Button } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import Myprofile from './Myprofile';
import { jwtDecode } from "jwt-decode";




export default function Dashboard() {
    const [countRegistered, setCountRegistered] = useState(0);
    const [countCreated, setCountCreated] = useState(0);
    const [countFavorite, setCountFavorite] = useState(0);
    const [activeItem, setActiveItem] = useState('DashBoard');
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    

    
    const user_id = JSON.parse(localStorage.getItem("user"));
    
    
    
    
    useEffect(() => {
        if (user && user.favourite_events) {
            let favoriteEventLength = user.favourite_events.length;
            let registeredEventLength = user.registered_events.length;
            setCountFavorite(favoriteEventLength);
            setCountRegistered(registeredEventLength);
          setLoading(false);
        }
      }, [user]);

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
            } catch (error) {
                console.error("Failed to fetch the user:", error);
                setError("Failed to fetch the user");
                
            }
        };

        fetchUser();
    }
}, [userId]);




    useEffect(() => {
        const storedItem = localStorage.getItem('activeItem');
        if (storedItem) {
            setActiveItem(storedItem);  
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('activeItem', activeItem);
    }, [activeItem]);

    const renderContent = () => {
        switch (activeItem) {
            case 'DashBoard':
                return (
                    <Stack
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            gap: 3,
                        }}
                    >
                        <Box sx={{ width: 300, height: 200, bgcolor: '#ede7f6', borderRadius: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                            <Typography variant="h2">{countRegistered}</Typography>
                            <HowToRegIcon />
                            <Typography variant="h6">Registered</Typography>
                        </Box>
                        <Box sx={{ width: 300, height: 200, bgcolor: '#ede7f6', borderRadius: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                            <Typography variant="h2">{countCreated}</Typography>
                            <CreateIcon />
                            <Typography variant="h6">Event Created</Typography>
                        </Box>
                        <Box sx={{ width: 300, height: 200, bgcolor: '#ede7f6', borderRadius: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                            <Typography variant="h2">{countFavorite}</Typography>
                            <GradeIcon />
                            <Typography variant="h6">Favorite</Typography>
                        </Box>
                    </Stack>
                );

            case 'My Profile':
                return (
                          <Myprofile/>
                        
                        );
            case 'Favorite':
                return (
                    <Box >
                        <Box className='box' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', my: 3 }}>
                            <div className="art-div"></div>
                            <Typography variant="h5" sx={{ marginLeft: '50px', fontWeight: 'bold' }}>FAVORITE EVENTS</Typography>
                        </Box>
                        <Box  sx={{ 
                        
                        display: 'flex', 
                        justifyContent: 'flex-start', 
                        gap: 3, 
                        flexWrap: 'wrap', // Enable wrapping of flex items
                        
                    }}>
                            <FavoriteEvent/>
                            
                        </Box>
                        </Box>
                );
            case 'Registered Events':
                return (
                    <div>
                        <Box className='box'  sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            // bgcolor: 'red',
            my: 3
            

        }}>
            <div className="art-div"></div>
            <Typography variant="h5" 
                sx={{
                    marginLeft: '50px',
                    fontWeight: 'bold',
                }}
            >REGISTERED EVENTS</Typography>
        </Box>

            <Box   sx={{ 
                        
                        display: 'flex', 
                        justifyContent: 'flex-start', 
                        gap: 3, 
                        flexWrap: 'wrap', // Enable wrapping of flex items  
                    }}>
                <RegisteredEvent/>
                
        </Box>
                    </div>
                );
            default:
                return null;
        }
    };

    if (loading) {
        return <div>Loading...</div>;
      }

    return (
        <div className='div-main-user'>
            <TemporaryDrawer activeItem={activeItem} setActiveItem={setActiveItem} />
            <div className='dashboard-main-wapper'>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', width: "100%" }}>
                    <Accountname />
                    <Divider sx={{ my: 3 }} />
                    {renderContent()}
                </Box>
            </div>
        </div>
    );
}
