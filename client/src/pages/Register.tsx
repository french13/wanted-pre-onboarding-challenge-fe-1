import React, { useEffect, useState } from "react";
import "../styles/loginRegister.scss";
import { Container, Row, Form, Input, Button, Label } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [idVaildText, setIdVaildText]= useState(false)
  const [passwordVaildText, setPasswordVaildText]= useState(false)
  const [passwordConfirmText, setPasswordConfirmText] = useState(false);

  const [signupButton, setSignupButton] = useState(true);

  const navigate = useNavigate();

  // 정규식
  const idVaild =/^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const passwordVaild= /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-8]).{8,25}$/;

  // id input value 넣기 와 유효성 검사
  const idInput = (e) => {
    setEmail(e.target.value)
    setIdVaildText(idVaild.test(e.target.value))
  };
  // password input value 넣기 와 유효성 검사
  const passwordInput = (e) => {
    setPassword(e.target.value)
    setPasswordVaildText(passwordVaild.test(e.target.value))
  };
  //  비밀번호 재확인 체크
  const passwordConfirmInput = (e) => {
   setPasswordConfirmText(password == e.target.value) 
  };

  // id, pw, pw확인 유효성 모두 통과했을경우 회원가입 버튼 활성화
  useEffect(() => {
    if( idVaildText && passwordVaildText && passwordConfirmText){
      setSignupButton(false)
    }else{
      setSignupButton(true)
    }
  },[email, password, passwordConfirmText] );

  // 회원가입 기능
  const register = async () => {
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/users/create`, {
        email,
        password,
      })
      .then((data) => {
        console.log(data.data);
        alert('회원가입 성공')
        navigate('/auth/login')
      })
      .catch((error) => {
        alert('회원가입 실패')
        console.log(error);
      });
  };

  return (
    <Container className="register__container">
      <Row>
        <Button
          onClick={() => {
            navigate(-1);
          }}
          style={{ width: "20%" }}
        >
          뒤로
        </Button>
        <Form>
          <p>Sign Up</p>

          <Input
            onChange={idInput}
            type="email"
            id="email"
            name="userId"
            placeholder="이메일"
          />
          <Label>
            { idVaildText == true ? (
              <span className="true">올바른 아이디입니다</span>
            ) : (
              <span className="false">아이디를 확인해주세요(이메일 형식)</span>
            ) }
          </Label>

          <Input
            onChange={passwordInput}
            type="password"
            id="password"
            name="userPassword"
            placeholder="비밀번호"
          />
          <Label>
            {passwordVaildText == true ? (
              <span className="true">올바른 비밀번호입니다</span>
            ) : (
              <span className="false">
                잘못된 비밀번호형식입니다.(영문+숫자+특수문자 8글자이상
                25글자이하)
              </span>
            )}
          </Label>

          <Input
            onChange={passwordConfirmInput}
            type="password"
            id="passwordCheck"
            name="passwordCheck"
            placeholder="비밀번호 확인"
          />
          <Label>
            {passwordConfirmText == true ? (
              <span className="true">비밀번호가 일치합니다</span>
            ) : (
              <span className="false">비밀번호가 일치하지 않습니다</span>
            )}
          </Label>

          <Button onClick={register} disabled={signupButton}>
            회원가입
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default Register;
