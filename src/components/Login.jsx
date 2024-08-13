import React, { useState } from "react";
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
  ThemeProvider,
  createTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import theme from "../style/theme";


export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
              Log In
            </Typography>
            <Stack spacing={3} sx={{ width: "100%" }}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                required
                sx={{ bgcolor: "background.paper" }}
              />
              <TextField
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handlePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
                required
                sx={{ bgcolor: "primary" }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5, textTransform: "none" }}
              >
                Log in
              </Button>
              <Link href="#" variant="body2" align="center">
                Forgot password?
              </Link>
              <Typography variant="body2" align="center">
                Don't have an account?{" "}
                <Link href="/register" variant="body2">
                  Sign up
                </Link>
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;