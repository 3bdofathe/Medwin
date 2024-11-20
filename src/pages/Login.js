import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../components/firebase";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // console.log("User logged in Successfully");
      window.location.href = "/profile";
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);

      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form className="login"
        onSubmit={handleSubmit}
        style={{
          width: "450px",
          padding: "30px 50px 20px 50px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "5px",
          boxShadow: "1px 2px 50px rgb(191, 191, 191) ",
        }}
      >
        <h3 style={{ marginBottom: "30px", fontWeight: "700" }}>Login</h3>
        <Form.Group
          style={{ width: "100%" }}
          className="mb-3"
          controlId="formGroupEmail"
        >
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group
          style={{ width: "100%" }}
          className="mb-3"
          controlId="formGroupPassword"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          type="submit"
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "7px",
            fontWeight: "bold",
          }}
          variant="primary"
        >
          Login
        </Button>

        <p
          style={{
            marginTop: "30px",
            fontWeight: "500",
            marginLeft: "170px",
            opacity: ".7",
          }}
        >
          New User <Link to="/signup"> SingUp</Link>{" "}
        </p>
      </Form>
    </div>
  );
}
export default Login;
