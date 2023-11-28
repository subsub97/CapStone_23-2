import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const googleSocialLogin = useGoogleLogin({
    scope: "email profile",
    onSuccess: async ({ code, redirect_uri }) => {
      axios
        .post("http://localhost:8080/auth/code/google/callback", { code })
        .then(({ data }) => {
          localStorage.setItem("accessToken", data.accesstoken);
          localStorage.setItem("refreshToken", data.refreshtoken);
          localStorage.setItem("googlename", data.name);
          localStorage.setItem("googlepicture", data.profile);

          router
            .push({
              pathname: "/main",
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
