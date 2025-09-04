import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./styles.js";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input.js";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signIn, signUp } from "../../actions/auth.js";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "Form submitted file path components/Auth/Auth.js : ",
      formData
    );
    if (isSignUp) {
      dispatch(signIn(formData, history));
    } else {
      dispatch(signUp(formData, history));
    }
  };

  const handleChange = (e) => {
    console.log("handleChange triggered");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    handleShowPassword(false);
  };

  const googleSuccess = (credentialResponse) => {
    try {
      console.log(
        "Response from file path components/Auth/Auth.js : ",
        credentialResponse
      );
      const decoded = jwtDecode(credentialResponse.credential);
      console.log(
        "Google User from file path components/Auth/Auth.js : ",
        decoded
      );
      const result = {
        email: decoded.email,
        name: decoded.name,
        givenName: decoded.given_name,
        familyName: decoded.family_name,
        imageURL: decoded.picture,
        googleId: decoded.sub,
      };

      const token = credentialResponse.credential;

      console.log("result from file path components/Auth/Auth.js : : ", result);
      console.log("token from file path components/Auth/Auth.js : : ", token);
      dispatch({ type: "AUTH", data: { result, token } });
      console.log(
        "Google login success from file path components/Auth/Auth.js : ",
        result
      );
      history.push("/");
    } catch (error) {
      console.log("Google Login error : ", error);
    }
  };

  const googleFailure = () => {
    console.log("Google Sign In was unsuccessful. Try again later.");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            className={classes.googleButton}
            onSuccess={googleSuccess}
            onError={googleFailure}
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account ? Sign In"
                  : "Don't Have an account ? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
