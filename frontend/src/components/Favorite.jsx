import * as React from 'react';
import Box from '@mui/material/Box';
import TemporaryDrawer from './Drawer'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Button, Typography } from '@mui/material';
import MediaCard from './Card'
import Divider from '@mui/material/Divider';
import Accountname from './Accountname'


export default function Favorite() {
  
  return (
    <div className='div-main-user'>
      
    <TemporaryDrawer/>
    
    <div className='fuck'>
       <Box sx={{display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', width: "100%", }} >
        <Accountname/>
       
                
       
            <Divider  sx={{my: 3,  }} />

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
            >FAVORITE EVENTS</Typography>
        </Box>

            <Box  sx={{display:'flex', justifyContent: 'flex-start', gap: 3}}>
                <MediaCard/>
                <MediaCard/>
                <MediaCard/>
                
        </Box>

       </Box>
                
       
       </div>
    </div>
  );
}
