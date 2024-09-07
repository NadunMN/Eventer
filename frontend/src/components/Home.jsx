import * as React from "react";
import { Stack, Typography, Button, TextField } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import ButtonBaseDemo from "./Category";
import MediaCard from "./Card";
import Brandcarousel from "./Carousel";

export const Home = () => {
  return (
    <>
      <div className="Main-part">
{/* Text and Buttons */}
<Box
      sx={{
        position: 'absolute',
        top: { xs: 'auto', sm: 150 }, // Responsive top positioning
        right: { xs: 'auto', sm:10 }, // Responsive right positioning
        display: 'flex',
        flexDirection: 'column',
        mr: { xs: 2, sm: 5 }, // Responsive margin-right
        p: { xs: 2, sm: 5 } // Responsive padding
      }}
    >
      <Typography
        className="Create-event-div"
        sx={{
          width: { xs: '100%', sm: 220 }, // Responsive width
          fontFamily: 'monospace',
          mb: { xs: 1, sm: 2 }, // Responsive margin-bottom
          fontSize: { xs: '0.875rem', sm: '1rem' } // Responsive font-size
        }}
      >
        Create your favorite event with our Eventer
      </Typography>
      <Button
        variant="contained"
        sx={{
          height: { xs: 'auto', sm: 50 }, // Responsive height
          bgcolor: 'linear-gradient(45deg, #673ab7 30%, #3f51b5 90%)',
          fontSize: { xs: '14px', sm: '15px' } // Responsive font-size
        }}
      >
        Create Your Own Event
      </Button>
    </Box>

{/* Responsive Text */}
<Box sx={{
  position: 'absolute',
  fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem', lg: '4rem' },  // Responsive font size
  alignItems: 'center'
}}>
  <div className="Topic-div">
  <p style={{
  fontSize: 'clamp(1rem, 6vw, 5rem)', 
  fontWeight: 'bold', 
  textAlign: 'left', 
  color: '#000', 
  marginLeft: '50px',
  padding: 0,
  lineHeight: 1, 
}}>
  Effortless <br />
  <span style={{
    background: 'linear-gradient(45deg, #673ab7, #3f51b5)', 
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 'bold',
    lineHeight: 1,
    fontSize: 'clamp(2rem,6vw, 7rem)', 
  }}>
    Event Planning for <br />
    <span style={{ fontSize: 'clamp(1rem, 6vw, 7rem)' }}>Every Occasion.</span> {/* Size for "Every Occasion." */}
  </span>
</p>

  </div>

  {/* Subheadings */}
  <Box sx={{ mt: 2, px: { xs: 2, sm: 3, md: 4 } }}>
      <Typography
        className="sub-heading1"
        sx={{
          ml:3, 
          mt: { xs: '2px', sm: '5px', md: '10px' }, // Responsive margin-top
          fontSize: { xs: '0.6rem', sm: '0.8rem', md: '1.1rem' } // Responsive font-size
        }}
      >
        <b>Eventer</b> is the best University Event planner
      </Typography>
      <Typography
        sx={{
          ml: 3,
          mt: { xs: '2px', sm: '5px', md: '10px' }, // Responsive margin-top
          fontSize: { xs: '0.6rem', sm: '0.8rem', md: '1.1rem' } // Responsive font-size
        }}
      >
        Where Campus Life Comes Alive: Discover, Plan, and Celebrate Every Moment
      </Typography>
    </Box>
  {/* Buttons */}
  <Stack
      direction="row"
      spacing={2}
      sx={{
        mt: 2,
        display: 'flex',
        justifyContent: 'flex-start',
        ml: { xs: 2, sm: 4, md: '50px' }, // Responsive margin-left
        flexWrap: { xs: 'wrap', sm: 'nowrap' } // Wrap buttons on smaller screens
      }}
    >
      <Button
        variant="contained"
        size="large"
        sx={{
          bgcolor: 'linear-gradient(45deg, #673ab7 30%, #3f51b5 90%)',
          width: { xs: '100%', sm: '200px' }, // Full width on small screens
          fontSize: { xs: '16px', sm: '20px' }, // Responsive font-size
          "&:hover": {
            bgcolor: '#512da8',
            cursor: 'pointer',
          },
        }}
      >
        SIGN UP
      </Button>
      <Button
        variant="outlined"
        endIcon={<ArrowForwardIcon />}
        size="large"
        sx={{
          width: { xs: '100%', sm: '200px' }, // Full width on small screens
          fontSize: { xs: '16px', sm: '20px' }, // Responsive font-size
          color: 'linear-gradient(45deg, #673ab7 30%, #3f51b5 90%)',
          border: 2,
          "&:hover": {
            borderColor: '#512da8',
            cursor: 'pointer',
            border: 1,
          },
        }}
      >
        SIGN IN
      </Button>
    </Stack>
</Box>
</div>


      <Brandcarousel />

      <Box
        className="box"
        mt={5}
        ml={-110}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="art-div"></div>
        <Typography
          variant="h5"
          sx={{
            marginLeft: "50px",
            fontWeight: "bold",
          }}
        >
          UPCOMING EVENTS
        </Typography>
      </Box>

      <div className="upcoming-para">
        <div className="section-para">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut.
        </div>
        <Button
          variant="contained"
          className="button-upcoming"
          sx={{
            width: 300,
            height: 50,
            borderRadius: 5,
            mt: 6,
            bgcolor: "linear-gradient(45deg, #673ab7 30%, #3f51b5 90%)",

            "&:hover": {
              bgcolor: "#512da8", // Change this to the desired color
              cursor: "pointer",
            },
          }}
        >
          {" "}
          ALL UPCOMING EVENTS
        </Button>
      </div>

      <div className="image-section-upcoming">
        <div className="image-section-img">
          <img src="/src/asset/woman-5275027_1280.jpg"></img>
        </div>
        <div className="image-section-img">
          <img src="/src/asset/stock-photo-smartphone-hand-concert-purple-light-stage.jpg"></img>
        </div>
        <div className="image-section-img">
          <img src="/src/asset/photo-1492684223066-81342ee5ff30.jpg"></img>
        </div>
      </div>

      <Box
        className="box"
        mt={10}
        ml={-103}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="art-div"></div>
        <Typography
          variant="h5"
          sx={{
            marginLeft: "50px",
            fontWeight: "bold",
          }}
        >
          EVENTS BY CATEGORIES
        </Typography>
      </Box>

      <div className="categories-component">
        <ButtonBaseDemo />
      </div>

      <div className="count-div">
        <Typography
          variant="h2"
          sx={{ color: "white", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
        >
          Best movement of the Year
        </Typography>
      </div>

      <Box
        className="box"
        mt={10}
        ml={-118}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="art-div"></div>
        <Typography
          variant="h5"
          sx={{
            marginLeft: "50px",
            fontWeight: "bold",
          }}
        >
          TOP EVENTS
        </Typography>
      </Box>

      <div className="card-component">
        <MediaCard />
      </div>

      <div className="Banner-div">
        <Box
          className="box-meetOurTeam"
          sx={{
            display: "flex",
            //    flexDirection: 'column',
            width: 1000,
            height: 200,
            justifyContent: "center",
            alignItems: "center",
            backgroundImage:
              "url(/src/asset/abstract-contour-green-background_1032986-186909.jpg)",
            backgroundSize: "cover", // Ensures the image covers the entire Box
            backgroundPosition: "center", // Centers the image within the Box
            backgroundRepeat: "no-repeat", // Prevents the image from repeating
            gap: 4,
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4" sx={{ color: "white" }}>
              Share experiences with your friends
            </Typography>
            <Typography variant="h6" sx={{ color: "white" }}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy.
            </Typography>
          </Stack>
          <Button
            variant="contaied"
            sx={{
              bgcolor: "#b39ddb",

              "&:hover": {
                bgcolor: "#ede7f6", // Change this to the desired color
                cursor: "pointer",
              },
            }}
          >
            Learn More
          </Button>
        </Box>
      </div>
    </>
  );
};

// export default Home;
