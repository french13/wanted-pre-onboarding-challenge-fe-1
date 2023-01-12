import React from "react";
import { Row, Col, Button, Input } from "reactstrap";
import axios from "axios";

const TodoUpdate = ({updateTodoList, setUpdateTodoList, rePage, setRepage}) => {
  const token = localStorage.getItem("token");

  // 수정Input변경시 localStorage에 있는 updateTodoItem도 변경 -> 새로고침에 value 유지
  const changeUpdateLocalStorage = (value, value2) => {
    localStorage.setItem(
      "updateTodoItem",
      JSON.stringify({
        title: value,
        content: value2,
        id: updateTodoList.id,
      })
    );
  };

  // update 박스를 닫고 updateState와 localStorage에 있는 값 삭제
  const updateTodoBoxClose = () => {
    setUpdateTodoList("");
    localStorage.removeItem("updateTodoItem");
  };

  // updateTodo 기능
  const updateTodo = async (e) => {
    const title = e.target.previousSibling.previousSibling.value;
    const content = e.target.previousSibling.value;
    const id = e.target.id;
    await axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/todos/${id}`,
        { title, content },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((data) => {
        setRepage(!rePage);
      })
      .then(() => {
        setUpdateTodoList("");
        localStorage.removeItem("updateTodoItem");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Row className="updateTodo__box" key={updateTodoList.id}>
      <Input
        onChange={(e) => {
          changeUpdateLocalStorage(e.target.value, e.target.nextSibling.value);
        }}
        defaultValue={updateTodoList.title}
      />
      <Input
        onChange={(e) => {
          changeUpdateLocalStorage(
            e.target.previousSibling.value,
            e.target.value
          );
        }}
        defaultValue={updateTodoList.content}
      />
      <Button onClick={updateTodo} id={updateTodoList.id}>
        수정
      </Button>
      <button onClick={updateTodoBoxClose}>취소</button>
    </Row>
  );
};

export default TodoUpdate;
