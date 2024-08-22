import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../asset/site-logo.png";

export const NavBar = () => {
  return (
    <>
      <Grid>
        <AppBar
          sx={{
            bgcolor: "orange",
          }}
        >
          <Toolbar ml
>
            <Typography variant="h5" flexGrow={1}>
              <Link to='/'>
                <img src={logo} style={{
                  width: "80px"
                }}/>
              </Link>

            </Typography>
            <Button color="inherit" component={Link} to="/">
              {" "}
              Home
              {" "}
            </Button>
            <Button color="inherit" component={Link} to="/login">
              {" "}
              Login
              {" "}
            </Button>
            <Button color="inherit" component={Link} to="/register">
              {" "}
              Register
              {" "}
            </Button>
            <Button color="inherit" component={Link} to="/add-event">
              {" "}
              Add Event
              {" "}
            </Button>
            <Button color="inherit" component={Link} to="/admin-dashboard">
              {" "}
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/About">
              {" "}
              About
              {" "}
            </Button>
              <Button color="inherit" component={Link} to="/Contact">
              {" "}
              Contact Us
              {" "}
            </Button>
          </Toolbar>
        </AppBar>
      </Grid>
    </>
  );
};
