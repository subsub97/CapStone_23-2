import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const googleSocialLogin = useGoogleLogin({
    scope: "email profile",
    onSuccess: async ({ code, redirect_uri }) => {
      console.log("redirect_uri : " + redirect_uri);
      console.log("Code : " + code);
      axios
        .post("http://localhost:8080/auth/code/google/callback", { code })
        .then(({ data }) => {
          localStorage.setItem("accessToken", data.access_token);
          localStorage.setItem("refreshToken", data.refresh_token);

          router
            .push({
              pathname: "/main",
              query: { name: data.name, picture: data.profile },
            })
            .catch((err) => console.error(err));
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
