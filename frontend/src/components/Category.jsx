import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


const images = [
  {
    url: '/src/asset/Event/5.jpg',
    title: 'EVENTS',
    width: '400px',
    height: '300px',
    category: "event"
  },
  {
    url:'/src/asset/Event/4.jpg',
    title: 'SPORTS',
    width: '400px',
    height: '300px',
    category: "sports",

},
  {
    url:'/src/asset/Event/6.jpg',
    title: 'PARTIES',
    width: '400px',
    height: '300px',
    category: "parties"

},
  {
    url: '/src/asset/Event/7.jpg',
    title: 'COMMUNITIE',
    width: '400px',
    height: '300px',
    category: "communities"

},
  {
    url: `/src/asset/Event/8.jpg`,
    title: 'THEATERS',
    width: '400px',
    height: '300px',
    category: "theaters"

},
  {
    url:`/src/asset/Event/9.jpg` ,
    title: 'CONCERTS',
    width: '400px',
    height: '300px',
    category: "concerts"

},
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    // '& .MuiTypography-root': {
    //   borderBottom: '4px solid currentColor',
      
    // },

  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function ButtonBaseDemo() {
  const [category, setCategory] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      console.log(category)
      navigate(`/event`, { state: { category } });
    }
  },[category])
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, maxWidth: 1500, gap: 2, mt:2, justifyContent:'center'}}>
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
            height: image.height,

          }}
          onClick={() => setCategory(image.category)}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="h4"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
  );
}
