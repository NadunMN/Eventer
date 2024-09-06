import {
  Avatar,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useSignup } from "../hooks/useSignup";

export const Signup = () => {
  const { signup, isLoading, error } = useSignup();

  const paperStyle = {
    padding: 20,
    height: "auto",
    width: "90%",
    maxWidth: "600px",
    margin: "100px auto",
  };

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    number: false,
    capital: false,
    special: false,
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword ? true : false);
  };

  const validatePassword = (pass) => {
    setPasswordRequirements({
      length: pass.length >= 6,
      number: /\d/.test(pass),
      capital: /[A-Z]/.test(pass),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
    });
  };

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      return;
    }
    const created_at = new Date().toISOString();
    const userData = {
      first_name: firstName,
      last_name: lastName,
      email,
      username,
      password,
      role: "user",
      created_at,
    };
    console.log(userData);
    const res = await signup(userData);
    console.log(res);

    console.log("Sucssess");
  };

  const getHelperText = () => {
    if (isFocused) {
      return (
        <div>
          <Typography color={passwordRequirements.length ? "green" : "red"}>
            At least 6 characters
          </Typography>
          <Typography color={passwordRequirements.number ? "green" : "red"}>
            Contains a number
          </Typography>
          <Typography color={passwordRequirements.capital ? "green" : "red"}>
            Contains a capital letter
          </Typography>
          <Typography color={passwordRequirements.special ? "green" : "red"}>
            Contains a special character
          </Typography>
        </div>
      );
    }
  };

  const getConfirmPasswordHelperText = () => {
    if (confirmPassword === "") return "";
    return password === confirmPassword ? "" : "Passwords do not match";
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle} sx={{ borderRadius: "16px" }}>
        <Grid align={"center"}>
          <Avatar style={{ backgroundColor: "#673ab7" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" component="h5" mt={2}>
            SignUp
          </Typography>
          <Stack spacing={5}>
            <Stack spacing={2} direction={"row"}>
              <TextField
                label="First Name"
                type="text"
                variant="standard"
                fullWidth
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                label="Last Name"
                type="text"
                variant="standard"
                fullWidth
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Stack>
            <TextField
              label="Email"
              type="email"
              variant="standard"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Username"
              type="text"
              variant="standard"
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="New password"
              variant="standard"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={handleFocus}
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
              helperText={getHelperText()}
            />
            <TextField
              label="Confirm password"
              variant="standard"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              helperText={getConfirmPasswordHelperText()}
              error={confirmPassword !== "" && password !== confirmPassword}
              fullWidth
              required
            />
            <Button
              type="submit"
              variant="contained"
              style={{ marginBottom: 50, backgroundColor: "primary.main" }}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Sign up
            </Button>
            {error && <Typography variant="body1">{error}</Typography>}
          </Stack>
        </Grid>
      </Paper>
    </Grid>
  );
};
