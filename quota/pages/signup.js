import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Form } from "semantic-ui-react";
import Axios from "axios";
import GoogleButton from "./GoogleButton";

import Link from "next/link";

export default function SignUpPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();
  function signup() {
    const { email, password } = formData;
    Axios.post("http://localhost:8080/signup", { email, password }).then(
      (res) => {
        if (res.status === 200) {
          router.push("/login");
        } else {
          router.push("/login");
        }
      }
    );
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
        <Link href="/signup" onClick={signup}>
          <Button color="green">Signup</Button>
        </Link>
        <GoogleButton />
      </Form>
    </div>
  );
}
