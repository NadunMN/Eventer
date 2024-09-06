import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from 'react-router-dom';

export default function TemporaryDrawer({ activeItem, setActiveItem }) {

  const navigate = useNavigate();

  const firstListItems = [
    { text: 'DashBoard', icon: <HomeIcon /> },
    { text: 'My Profile', icon: <AccountCircleIcon /> },
    { text: 'Favorite', icon: <FavoriteIcon /> },
    { text: 'Registered Events', icon: <EventAvailableIcon /> },
  ];

  const secondListItems = [
    { text: 'All Events', icon: <EventIcon />, path: "/event" },
    { text: 'Annual Events', icon: <CalendarMonthIcon />, path: "/event" },
  ];

  const handleItemClick = (itemText, path) => {
    setActiveItem(itemText);
    if (path) {
      navigate(path); // Navigate to the specified path
    }
  };

  return (
    <div className="div-main-user">
      <Box sx={{ width: 260, display: 'flex', flexDirection: 'column', pl: 4 }} role="presentation">

        <List sx={{mt: 4}}>

          
          {firstListItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={activeItem === item.text}
                onClick={() => handleItemClick(item.text)}
                sx={{
                  borderRadius: 5,
                  backgroundColor: activeItem === item.text ? 'red' : 'inherit',
                  '&.Mui-selected': {
                    backgroundColor: '#d1c4e9',
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: '#ede7f6',
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {secondListItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={activeItem === item.text}
                onClick={() => handleItemClick(item.text, item.path)} // Pass the path to the handler
                sx={{
                  borderRadius: 5,
                  backgroundColor: activeItem === item.text ? 'red' : 'inherit',
                  '&.Mui-selected': {
                    backgroundColor: '#d1c4e9',
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: '#ede7f6',
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
}
