import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Form } from "semantic-ui-react";
import Axios from "axios";
import GoogleButton from "./GoogleButton";

import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const router = useRouter();
  function login() {
    const { username, password } = formData;
    Axios.post("/api/login", { username, password }).then((res) => {
      if (res.status === 200) {
        router.push("/chat");
      } else {
        router.push("/chat");
      }
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
            name="username"
            placeholder="ID"
            value={formData.username}
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
        <GoogleButton />
      </Form>
    </div>
  );
}
