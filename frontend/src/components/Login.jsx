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
import { useLogin } from "../hooks/useLogin";

export const Login = () => {
  const { login, isLoading, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await login(email, password);
    console.log(error);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{
          height: "100vh",
          minHeight: "100vh",
          margin: "auto",
          maxWidth: "1400px",
        }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper
            elevation={0}
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
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <Stack spacing={3} sx={{ width: "100%" }}>
              <TextField
                label="Email"
                type="email"
                value={email}
                variant="outlined"
                fullWidth
                required
                sx={{ bgcolor: "background.paper" }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                variant="outlined"
                value={password}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handlePasswordVisibility} edge="end">
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
                sx={{ bgcolor: "primary" }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5, textTransform: "none" }}
                onClick={handleSubmit}
              >
                Log in
              </Button>
              <Link href="#" variant="body2" align="center">
                Forgot password?
              </Link>
              <Typography variant="body2" align="center">
                Don't have an account?{" "}
                <Link href="/signup" variant="body2">
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
