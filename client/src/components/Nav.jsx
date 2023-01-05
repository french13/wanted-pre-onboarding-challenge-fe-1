import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const Nav = () => {
  const [repage, setRepage] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // login 상태 학인은 공통component인 Nav에 줘서 어떤 component에 있던지 login상태 확인 가능
  useEffect(() => {
    if (token == null) {
      navigate("/auth/login");
    } else {
    }
  }, [repage]);

  // 로그아웃 기능
  const logout = () => {
    localStorage.removeItem("token");
    setRepage(!repage);
  };

  return (
    <div style={{ textAlign: "right", marginRight: "5%" }}>
      {/* 로그인 활성상태에 따라 로그아웃 버튼 활성화/비활성화 */}
      {token && <Button onClick={logout}>로그아웃</Button>}
    </div>
  );
};

export default Nav;
