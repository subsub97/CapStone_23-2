import React, { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/router";

const GoogleLogIn = () => {
  const router = useRouter();
  return (
    <React.Fragment>
      <GoogleOAuthProvider clientId="220251963319-o9o6o86bi81u6t4b39pn57fnvrv1v0o8.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            router.push("/chat");
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    </React.Fragment>
  );
};

export default GoogleLogIn;
