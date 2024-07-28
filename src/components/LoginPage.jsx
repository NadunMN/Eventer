import {
  Avatar,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const LoginPage = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: "400px",
    margin: "100px auto",
  };

  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword ? true : false);
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align={"center"}>
          <Avatar style={{ backgroundColor: "#1bbd7e" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" component="h5" mt={2}>
            Log In
          </Typography>
          <Stack spacing={2}>
            <TextField label="Username" variant="standard" fullWidth required />
            <TextField
              label="Password"
              variant="standard"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handlePasswordVisibility}>
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
              required
            />
            <Button type="submit" color="primary" variant="contained">
              Log in
            </Button>
            <Link href="#" underline="none">
              Forgot password?
            </Link>
            <Typography>
              Don't have an account?
              <Link href="#" underline="none">
                Sign up
              </Link>
            </Typography>
          </Stack>
        </Grid>
      </Paper>
    </Grid>
  );
};
