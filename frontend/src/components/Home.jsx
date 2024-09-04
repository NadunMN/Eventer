import * as React from "react";
import { Stack, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import ButtonBaseDemo from "./Category";
import MediaCard from "./Card";
import Brandcarousel from "./Carousel";

export const Home = () => {
  return (
    <>
      <div className="Main-part">
        <div className="Topic-div">
          <p className="main-topic-para">
            Make Your. <span>Dream Come True.</span>
          </p>
        </div>
        <Stack direction="row" spacing={2} sx={{ mt: "50px" }}>
          <Button
            variant="contained"
            //  className ={classes.button}
            size="large"
            sx={{
              bgcolor: "#311b92",
              width: 220,
              fontSize: "20px",

              "&:hover": {
                bgcolor: "#512da8", // Change this to the desired color
                cursor: "pointer",
              },
            }}
            disableElevation
          >
            SIGN UP
          </Button>

          <Button
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            //  className ={classes.button}
            size="large"
            sx={{
              width: 220,
              fontSize: "20px",
              color: "#311b92",
              border: 2,

              "&:hover": {
                borderColor: "#512da8", // Change this to the desired color
                cursor: "pointer",
                border: 1,
              },
            }}
            disableElevation
          >
            GET STARTED
          </Button>
        </Stack>

        <Typography variant="h5" mt={2}>
          <b>Eventer</b> is the best University Event planner
        </Typography>
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
            bgcolor: "#311b92",

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
