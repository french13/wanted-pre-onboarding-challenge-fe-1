import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const TodoDetail = () => {
  const [detailTodo, setDetailTodo] = useState();
  // outlet으로 props를 전달하기 위해서는 useOutletContext가 필요하다.
  const [rePage, setRepage] = useOutletContext();
  let param = useParams().id;
  const navigate = useNavigate();

  // detail component 실행시 데이터 가져오기
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
    // 주소의 id를 가져와서 get요청시 넣기
      .get(`http://localhost:8080/todos/${param}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((data) => {
        console.log(data.data);
        setDetailTodo(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [param, rePage]);

  return (
    <div className="detailTodo__box">
      {detailTodo && (
        <>
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            ◀
          </button>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            x
          </button>
          <div>{detailTodo.title}</div>
          <div>{detailTodo.content}</div>
        </>
      )}
    </div>
  );
};

export default TodoDetail;
