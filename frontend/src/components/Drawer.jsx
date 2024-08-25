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

export default function TemporaryDrawer() {
  const [activeItem, setActiveItem] = React.useState('DashBoard'); // State to track the active item

  const firstListItems = [
    { text: 'DashBoard', icon: <HomeIcon /> },
    { text: 'My Profile', icon: <AccountCircleIcon /> },
    { text: 'Favorite', icon: <FavoriteIcon /> },
    { text: 'Registered Events', icon: <EventAvailableIcon /> },
  ];

  const secondListItems = [
    { text: 'All Events', icon: <EventIcon /> },
    { text: 'Annual Events', icon: <CalendarMonthIcon /> },
  ];

  const handleItemClick = (itemText) => {
    setActiveItem(itemText);
  };

  return (
    <div className="div-main-user">
      <Box sx={{ width: 240, display: 'flex', flexDirection: 'column',pl: 4,}} role="presentation">
        <List >
          <div className="logo-drawer">
            <div className="eventer-logo">
              <img src="/src/asset/Icon/logo.png" alt="logo"></img>
            </div>
          </div>
          {firstListItems.map((item) => (
            <ListItem key={item.text} disablePadding >
              <ListItemButton
                selected={activeItem === item.text} // Apply 'selected' prop if active
                onClick={() => handleItemClick(item.text)} // Handle item click

                sx={{
                  borderRadius: 5,
                  backgroundColor: activeItem === item.text ? 'red' : 'inherit',
                  '&.Mui-selected': {
                    backgroundColor: '#d1c4e9',
                    // color: 'white',
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
                selected={activeItem === item.text} // Apply 'selected' prop if active
                onClick={() => handleItemClick(item.text)} // Handle item click

                sx={{
                  borderRadius: 5,
                  backgroundColor: activeItem === item.text ? 'red' : 'inherit',
                  '&.Mui-selected': {
                    backgroundColor: '#d1c4e9',
                    // color: 'white',
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
