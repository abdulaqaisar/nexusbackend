import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import '../Styles/Login.css'
import Navbar from "../components/Navbar";

// const backend_Url = import.meta.env.VITE_BACKEND_API;
const backend_Url = import.meta.env.VITE_AUTH_API;
const SignUp = () => {
  const [toggle, setToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [nameError, setErrorName] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    setErrorName(!name);
    setEmailError(!email);
    setPasswordError(!password);

    if (!name || !email || !password) return;

    setLoader(true);
    try {
      const response = await fetch(`${backend_Url}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setMessage(data.message || "SignUp failed");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="login">
      <Navbar/>
      <FormContainer>
        <Title>Sign Up</Title>
        <Subtitle>Please enter your details</Subtitle>
        <Form onSubmit={handleSubmit}>
        <Input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={nameError ? "error" : ""}
          />
          {nameError && <ErrorText>Full Name is required</ErrorText>}
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={emailError ? "error" : ""}
          />
          {emailError && <ErrorText>Email is required</ErrorText>}

          <InputWrapper>
            <Input
              type={toggle ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={passwordError ? "error" : ""}
            />
            <ToggleButton onClick={() => setToggle(!toggle)} type="button">
              {toggle ? "Hide" : "Show"}
            </ToggleButton>
          </InputWrapper>
          {passwordError && <ErrorText>Password is required</ErrorText>}

          <Button type="submit">
            {loader ? "Loading..." : "Sign Up"}
          </Button>

          <Footer>
            {/* <StyledLink to="/forgot-password">Forgot password?</StyledLink> */}
            <div>
              Already have an Account? <StyledLink to="/login">Login</StyledLink>
            </div>
          </Footer>
        </Form>
        {message && <Message>{message}</Message>}
      </FormContainer>
    </div>
  );
};

export default SignUp;

// Styled Components
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f8f9fa;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  &.error {
    border-color: red;
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 14px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    background: #0056b3;
  }
`;

const GuestButton = styled(Button)`
  background: #6c757d;
  &:hover {
    background: #5a6268;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #666;
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin: -8px 0 10px;
`;

const Message = styled.p`
  margin-top: 20px;
  color: red;
  text-align: center;
  font-size: 14px;
`;