import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { signInAction } from "../store/actions/authentication";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const SignInScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: e?.target?.email?.value,
      password: e?.target?.password?.value,
    };
    dispatch(signInAction(user, navigate));
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Container className="max-w-md mx-auto  p-5 bg-white rounded-lg shadow-lg">
        <h1 className="text-center mb-4 text-2xl font-bold text-gray-800">
          Sign In
        </h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label className="text-gray-700">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label className="text-gray-700 mt-2">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default SignInScreen;
