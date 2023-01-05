import React, { useEffect, useState } from "react";
import "../styles/loginRegister.scss";
import { Container, Row, Form, Input, Button, Label } from "reactstrap";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [id, setId] = useState(false);
  const [pw, setPw] = useState(false);
  const [pwConfirm, setPwConfirm] = useState(false);
  const [signupButton, setSignupButton] = useState(true);

  const [email, setUserId] = useState("");
  const [password, setUserPw] = useState("");
  const navigate = useNavigate()

  // id 유효성 체크
  const idCheck = (e) => {
    console.log("id");
    const idValueCheck =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    const idValue = idValueCheck.test(e.target.value);
    setUserId(e.target.value);

    if (idValue) {
      setId(true);
    } else {
      setId(false);
    }
  };
  // pw 유효성 체크
  const pwCheck = (e) => {
    const pwValueCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-8]).{8,25}$/;
    const pwValue = pwValueCheck.test(e.target.value);
    setUserPw(e.target.value);

    if (pwValue) {
      setPw(true);
    } else {
      setPw(false);
    }
  };
  // pw 일치하는지 체크
  const pwCheckConfirm = (e) => {
    const pwConfirmValue = password == e.target.value;

    if (pwConfirmValue) {
      setPwConfirm(true);
    } else {
      setPwConfirm(false);
    }
  };

  // id, pw, pw확인 유효성 모두 통과했을경우 회원가입 버튼 활성화
  useEffect(() => {
    if (id == true && pw == true && pwConfirm == true) {
      setSignupButton(false);
    } else {
      setSignupButton(true);
    }
  }, [id, pw, pwConfirm]);

  // 회원가입 기능
  const register = async() => {
    await axios.post('http://localhost:8080/users/create', {email, password}).then((data)=>{
    console.log(data.data)
    }).catch((error)=>{
      console.log(error)
    })

 
  };

  return (
    <Container className="register__container">
      <Row>
        <Button onClick={()=>{navigate(-1)}} style={{width : '20%'}}>뒤로</Button>
        <Form>
          <p>Sign Up</p>


          <Input
            onChange={idCheck}
            type="email"
            id="email"
            name="userId"
            placeholder="이메일"
          />
          <Label>
            {id == true ? (
              <span className="true">올바른 아이디입니다</span>
            ) : (
              <span className="false">아이디를 확인해주세요(이메일 형식)</span>
            )}
          </Label>

          <Input
            onChange={pwCheck}
            type="password"
            id="password"
            name="userPassword"
            placeholder="비밀번호"
          />
          <Label>
            {pw == true ? (
              <span className="true">올바른 비밀번호입니다</span>
            ) : (
              <span className="false">
                잘못된 비밀번호형식입니다.(영문+숫자+특수문자 8글자이상
                25글자이하)
              </span>
            )}
          </Label>

          <Input
            onChange={pwCheckConfirm}
            type="password"
            id="passwordCheck"
            name="passwordCheck"
            placeholder="비밀번호 확인"
          />
          <Label>
            {pwConfirm == true ? (
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
