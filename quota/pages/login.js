import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Form } from "semantic-ui-react";
import Axios from "axios";
import GoogleButton from "./GoogleButton";

import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();

  function login() {
    const { email, password } = formData;
    Axios.post("http://localhost:8080/login", { email, password }).then(
      (res) => {
        if (res.status === 200) {
          const accessToken = res.data.accessToken;
          const refreshToken = res.data.refreshToken;
          handleLoginSuccess(accessToken, refreshToken);
        } else {
          router.push("/login");
        }
      }
    );
  }

  function handleLoginSuccess(accessToken, refreshToken) {
    const storedAccessToken = accessToken;

    localStorage.setItem("refreshToken", refreshToken);

    Axios.post("http://localhost:8080/login", storedAccessToken, {
      headers: {
        Authorization: `Bearer ${storedAccessToken}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          router.push("/chat");
        } else if (res.status === 401) {
          handleAccessTokenExpired(email, refreshToken);
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

  return (
    <div style={{ padding: "100px 0", textAlign: "center" }}>
      <Form>
        <Form.Field inline>
          <input
            name="email"
            placeholder="ID"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field inline>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Button color="blue" onClick={login}>
          Login
        </Button>
        <Link href="/signup">
          <Button color="green">Signup</Button>
        </Link>
        <GoogleButton />
      </Form>
    </div>
  );
}
