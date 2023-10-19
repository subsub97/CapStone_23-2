import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useRouter } from "next/router";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setLoggedIn(!loggedIn);
    router.push("/mui");
  };

  const backgroundStyle = {
    backgroundImage: `url("/bg.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

  return (
    <div style={backgroundStyle}>
      <Container>
        <h1 style={{ color: "white", fontSize: 80 }}>GET START</h1>
        <p style={{ color: "white", fontSize: 50 }}>This is test.</p>
        {loggedIn ? (
          <>You are logged in.</>
        ) : (
          <>
            <Button variant="light" onClick={handleLogin}>
              Login
            </Button>{" "}
          </>
        )}
      </Container>
    </div>
  );
}
