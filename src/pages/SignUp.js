import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../components/firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      // console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
        });
      }
      // console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
      navigate("/login");
    } catch (error) {
      // console.log(error.message);
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
      <Form className="signup"
        onSubmit={handleRegister}
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
        <h3 style={{ marginBottom: "30px", fontWeight: "700" }}>SignUp</h3>

        <Form.Group
          style={{ width: "100%" }}
          className="mb-3"
          controlId="formGroupEmail"
        >
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            required
            onChange={(e) => setFname(e.target.value)}
          />
        </Form.Group>

        <Form.Group
          style={{ width: "100%" }}
          className="mb-3"
          controlId="formGroupEmail"
        >
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            required
            onChange={(e) => setLname(e.target.value)}
          />
        </Form.Group>

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
          SignUp
        </Button>

        <p
          style={{
            marginTop: "15px",
            marginLeft: "160px",
            fontWeight: "500",
            opacity: ".7",
          }}
        >
          Already Registered
          <Link to="/login"> Login</Link>
        </p>
      </Form>
    </div>
  );
}
export default SignUp;
