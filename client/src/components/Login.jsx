import React, { useState } from "react";
import "../styles/loginRegister.scss";
import { Container, Row, Form, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loginButton, setLoginButton]= useState(true)
  const [rePage, setRepage] = useState(true)

  // 이메일, 비밀번호의 input값을 체크하여 로그인 버튼 활성/비활성화
  useEffect(()=>{
    if(email != "" && password != ""){
      setLoginButton(false)
    }else{
      setLoginButton(true)
    }
  },[email, password, rePage])

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
        alert('이메일과 비밀번호를 확인해주세요');
        // 실패 alert 이후 email, password의 state값을 다시 채우기 위해 리렌더링
        setRepage(!rePage)
      })
  };

  return (
    <Container className="login__container">
      <Row>
        <Form onSubmit={login}>
          <p>Login</p>
          <Input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            id="email"
            name="userId"
            placeholder="e-mail"
          />
          <Input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            id="password"
            name="userPassword"
            placeholder="password"
          />
          <Button disabled={loginButton} type="submit" onClick={login}>
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
