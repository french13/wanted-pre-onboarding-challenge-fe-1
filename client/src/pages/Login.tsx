import React, { useState } from "react";
import "../styles/loginRegister.scss";
import { Container, Row, Form, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [loginButton, setLoginButton]= useState<boolean>(true)
 
  const SERVER_URL: string = process.env.REACT_APP_SERVER_URL;



  // 이메일, 비밀번호의 input값을 체크하여 로그인 버튼 활성/비활성화
  useEffect(()=>{

    if(email != null && password != null){
      setLoginButton(false)
    }else{
      setLoginButton(true)
    }
  },[email, password])

  // 로그인 기능
  const signIn = async (e) => {
    e.preventDefault();

    await axios
      .post(`${SERVER_URL}/users/login`, {
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
      })
  };

  return (
    <Container className="login__container">
      <Row>
        <Form onSubmit={signIn}>
          <p>Login</p>
          <Input
            onChange={(e ) => {
              setEmail(e.target.value);
            }}
            type="email"
            id="email"
            name="userId"
            placeholder="e-mail"
          />
          <Input
            onChange={(e ) => {
              setPassword(e.target.value);
            }}
            type="password"
            id="password"
            name="userPassword"
            placeholder="password"
          />
          <Button disabled={loginButton} type="submit" onClick={signIn}>
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
