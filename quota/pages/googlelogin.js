import { Box, Button } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const googleSocialLogin = useGoogleLogin({
    scope: "email profile",
    onSuccess: async ({ code, redirect_uri }) => {
      console.log("redirect_uri : " + redirect_uri);
      console.log("Code : " + code);
      axios
        .post("http://localhost:8080/auth/code/google/callback", { code })
        .then(({ data }) => {
          console.log(data);
        });
    },
    onError: (errorResponse) => {
      console.error(errorResponse);
    },
    flow: "auth-code",
  });

  return <GoogleLogin onSuccess={googleSocialLogin} />;
};

export default Login;
