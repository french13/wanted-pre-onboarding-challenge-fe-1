import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const Nav = () => {
  const [repage, setRepage] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log(1);
   

    if (token == null) {
      alert("로그인이 필요합니다.");
      navigate("/auth/login");
    } else {
      
    }
  }, [repage]);

  const logout = () => {
    localStorage.removeItem("token");
    setRepage(!repage);
  };

  return (
    <div style={{textAlign : 'right', marginRight : '5%'}}>
      {
        token && 
        <Button onClick={logout}>로그아웃</Button>
      }
      
    </div>
  );
};

export default Nav;
