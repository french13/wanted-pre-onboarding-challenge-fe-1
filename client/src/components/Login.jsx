import React, { useState } from "react";
import "../styles/loginRegister.scss";
import { Container, Row, Form, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const [email, setId] = useState("");
  const [password, setPw] = useState("");
  const navigate = useNavigate();



  // 로그인 기능
  const login = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8080/users/login", {
        email,
        password,
      })
      .then((data) => {
        console.log(data.data);
        localStorage.setItem('token', JSON.stringify(data.data.token))
        alert('로그인 성공')
        navigate('/')
      })
      .catch((error) => {
        console.log(error);
      });

  };

  return (
    <Container className="login__container">
      <Row>
        <Form onSubmit={login}>
          <p>Login</p>
          <Input
            onChange={(e) => {
              setId(e.target.value);
            }}
            type="email"
            id="email"
            name="userId"
            placeholder="e-mail"
          />
          <Input
            onChange={(e) => {
              setPw(e.target.value);
            }}
            type="password"
            id="password"
            name="userPassword"
            placeholder="password"
          />
          <Button type="submit" onClick={login}>
            로그인
          </Button>
        </Form>
        <p>
          회원이 아니신가요? <Link to="/auth/register">회원가입</Link>
        </p>
      </Row>
    </Container>
  );
};

export default Login;
