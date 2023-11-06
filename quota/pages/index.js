import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useRouter } from "next/router";
import Axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./googlelogin";

const ClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://quotabook.com/">
        domino
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme({});

export default function SignInSide() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  function login() {
    const { email, password } = formData;
    Axios.get("http://localhost:8080/oauth2/authorization/google", {
      withCredentials: true,
    }).then((res) => {
      if (res.status === 200) {
        const accessToken = res.data.accessToken;
        const refreshToken = res.data.refreshToken;
        handleLoginSuccess(accessToken, refreshToken);
      } else {
        console.log("hi");
      }
    });
  }

  function handleLoginSuccess(accessToken, refreshToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    Axios.get("http://localhost:8080/api/sample/doA", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          router.push("/chat");
        } else if (res.status === 401) {
          // handleAccessTokenExpired(email, refreshToken);
        } else {
          router.push("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAccessTokenExpired(email, refreshToken) {
    Axios.post("http://localhost:8080/refresh", { email, refreshToken })
      .then((response) => {
        const newAccessToken = response.data.accessToken;
        Axios.post("http://localhost:8080/login", data, {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        })
          .then((response) => {
            handleLoginSuccess(newAccessToken, refreshToken);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(
          "리프레시 토큰을 사용하여 새 액세스 토큰을 얻는 데 문제가 발생했습니다."
        );
      });
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const backgroundImageUrl = "/bg2.jpg";
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{
                mt: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "70%",
              }}
            >
              <TextField
                margin="normal"
                required
                style={{ width: "60%" }}
                id="email"
                label="email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                style={{ width: "60%" }}
                name="password"
                label="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleInputChange}
              />
              <Button
                type="button"
                style={{ width: "60%" }}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={login}
              >
                Sign In
              </Button>
              <GoogleOAuthProvider clientId={ClientId}>
                <Login />
              </GoogleOAuthProvider>
              <Link href="/muisignup" variant="body2" sx={{ mt: 3, mb: 0 }}>
                {"Don't have an account? Sign Up"}
              </Link>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item></Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
