import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TemporaryDrawer from './Drawer'
// import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';
// import MediaCard from './Card'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CreateIcon from '@mui/icons-material/Create';
import GradeIcon from '@mui/icons-material/Grade';
import Divider from '@mui/material/Divider';
import Accountname from './Accountname';
import axios from 'axios';



export default function Dashboard() {

    const [count, setCount] = useState(0);

    useEffect(()=>{
        const fetchCount = async() => {
           try {
            const response = await (axios.get('http://localhost:5000/api/addition'));

            setCount(response.data.addition);

        }catch(err){
            console.log(err);
            
        }}

        fetchCount();
    }, []);

  return (
    <>
    <div className='div-main-user'>
    
    <TemporaryDrawer/>
    <div className='fuck'>
       <Box sx={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', width: "100%", }} >
       
        <Accountname/>
                
            <Divider  sx={{my: 3,  }} />

            <Stack
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    gap : 3,
                    // bgcolor: 'red'
                }}
                >
                <Box sx={{ width: 300, height: 200, bgcolor: '#ede7f6', borderRadius: 10, display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', alignItems: 'center',
                 }} >
                    <Typography variant="h2" color="initial">{count}</Typography>
                    <HowToRegIcon/>
                    <Typography variant="h6" color="initial">Registered</Typography>
                </Box>
                
                <Box sx={{ width: 300, height: 200, bgcolor: '#ede7f6', borderRadius: 10, display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', alignItems: 'center',
                 }} >
                    <Typography variant="h2" color="initial">34</Typography>
                    <CreateIcon/>
                    <Typography variant="h6" color="initial">Event Created</Typography>
                </Box>
                <Box sx={{ width: 300, height: 200, bgcolor: '#ede7f6', borderRadius: 10, display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', alignItems: 'center',
                 }} >
                    <Typography variant="h2" color="initial">34</Typography>
                    <GradeIcon/>
                    <Typography variant="h6" color="initial">Favorite</Typography>
                </Box>
                
            </Stack>

       </Box>
                
       
       </div>
       </div>
       </>
  );
}
