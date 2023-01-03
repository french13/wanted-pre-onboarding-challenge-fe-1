import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [repage, setRepage] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(1);
    const a = localStorage.getItem("token");

    if (a == null) {
      alert("로그인이 필요합니다.");
      navigate("/auth/login");
    } else {
      navigate("/");
    }
  }, [repage]);

  const logout = () => {
    localStorage.removeItem("token");
    setRepage(!repage);
  };

  return (
    <div>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
};

export default Nav;
