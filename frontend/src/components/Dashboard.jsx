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

export default function Dashboard() {
    const [count, setCount] = useState(0);
    const [activeItem, setActiveItem] = useState('DashBoard');

    useEffect(() => {
        const storedItem = localStorage.getItem('activeItem');
        if (storedItem) {
            setActiveItem(storedItem);  
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('activeItem', activeItem);
    }, [activeItem]);
    
    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/addition');
                setCount(response.data.addition);
            } catch (err) {
                console.log(err);
            }
        }
        fetchCount();
    }, []);

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
                            <Typography variant="h2">{count}</Typography>
                            <HowToRegIcon />
                            <Typography variant="h6">Registered</Typography>
                        </Box>
                        <Box sx={{ width: 300, height: 200, bgcolor: '#ede7f6', borderRadius: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                            <Typography variant="h2">34</Typography>
                            <CreateIcon />
                            <Typography variant="h6">Event Created</Typography>
                        </Box>
                        <Box sx={{ width: 300, height: 200, bgcolor: '#ede7f6', borderRadius: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                            <Typography variant="h2">34</Typography>
                            <GradeIcon />
                            <Typography variant="h6">Favorite</Typography>
                        </Box>
                    </Stack>
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
                            <MediaCard />
                            <MediaCard />
                            <MediaCard />
                            <MediaCard />
                            <MediaCard />
                            <MediaCard />
                            <MediaCard />
                            <MediaCard />
                            <MediaCard />
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
                <MediaCard/>
                <MediaCard/>
                <MediaCard/>
                <MediaCard/>
                <MediaCard/>
                <MediaCard/>
                <MediaCard/>
                <MediaCard/>
                <MediaCard/>
                <MediaCard/>
                <MediaCard/>
                <MediaCard/>
                <MediaCard/>
                
        </Box>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className='div-main-user'>
            <TemporaryDrawer activeItem={activeItem} setActiveItem={setActiveItem} />
            <div className='fuck'>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', width: "100%" }}>
                    <Accountname />
                    <Divider sx={{ my: 3 }} />
                    {renderContent()}
                </Box>
            </div>
        </div>
    );
}
