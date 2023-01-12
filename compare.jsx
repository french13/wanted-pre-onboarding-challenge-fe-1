import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Input } from "reactstrap";

const TodoList = ({ rePage, setRepage }) => {
  const [todolist, setTodolist] = useState([]);
  const [updateTodoList, setUpdateTodoList] = useState();
  const navigate = useNavigate();

     const token = localStorage.getItem("token");

  // component 렌더링시 db에서 todolist와 localStorage에 값이 있다면 가져오기
  useEffect(() => {
 
    axios
      .get("http://localhost:8080/todos", {
        headers: {
          Authorization: token,
        },
      })
      .then((data) => {
        console.log(data.data.data);
        setTodolist(data.data.data);
      })
      .then(() => {
        const localUpdate = JSON.parse(localStorage.getItem("updateTodoItem"));
        setUpdateTodoList(localUpdate);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [rePage]);

  // 투두리스트 삭제
  const deleteTodo = (e) => {
    const token = localStorage.getItem("token");
    const id = e.target.id;
    axios
      .delete(`http://localhost:8080/todos/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((data) => {
        setRepage(!rePage);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 리스트의 수정버튼 클릭시 리스트의 값들을 가져와서 state와 localStorage에 넣기
  const updateTodoOpen = (e) => {
    const siblings = e.target.parentNode.childNodes;

    const item = {
      title: siblings[0].innerText,
      content: siblings[1].innerText,
      id: siblings[4].id,
    };

    setUpdateTodoList(item);
    // localStorage에 객체를 저장시에는 JSON 형태로 넣어주어야 한다. getItem시에는 JSON.parse로 가져오기
    localStorage.setItem("updateTodoItem", JSON.stringify(item));
  };

  // update 박스를 닫고 updateState와 localStorage에 있는 값 삭제
  const updateTodoClose = () => {
    setUpdateTodoList("");
    localStorage.removeItem("updateTodoItem");
  };

  // updateTodo 기능
  const updateTodo = async (e) => {
    const title = e.target.previousSibling.previousSibling.value;
    const content = e.target.previousSibling.value;
    const token = localStorage.getItem("token");
    const id = e.target.id;
    await axios
      .put(
        `http://localhost:8080/todos/${id}`,
        { title, content },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((data) => {
        console.log(data.data);
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

  // todoList 상세클릭시 detail페이지 이동
  const detailTodo = (e) => {
    navigate(`/detail/${e.target.id}`);
  };

  // 수정Input변경시 localStorage에 값을 추가 -> 새로고침에 value 유지
  const localUpdateTitle = (e) => {
    localStorage.setItem(
      "updateTodoItem",
      JSON.stringify({
        title: e.target.value,
        content: e.target.nextSibling.value,
        id: updateTodoList.id,
      })
    );
  };
  const localUpdateContent = (e) => {
    localStorage.setItem(
      "updateTodoItem",
      JSON.stringify({
        title: e.target.previousSibling.value,
        content: e.target.value,
        id: updateTodoList.id,
      })
    );
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      {updateTodoList && (
        <Row className="updateTodo__box" key={updateTodoList.id}>
          <Input
            onChange={localUpdateTitle}
            defaultValue={updateTodoList.title}
          />
          <Input
            onChange={localUpdateContent}
            defaultValue={updateTodoList.content}
          />
          <Button onClick={updateTodo} id={updateTodoList.id}>
            수정
          </Button>
          <button onClick={updateTodoClose}>취소</button>
        </Row>
      )}
      <Row>
        {todolist &&
          todolist.map((item, i) => {
            return (
              <div
                style={{ marginTop: "20px" }}
                className="todo__box"
                key={item.id}
              >
                <span>{item.title}</span>
                <span>{item.content}</span>
                <Button id={item.id} onClick={detailTodo}>
                  상세
                </Button>
                <Button onClick={updateTodoOpen}>수정</Button>
                <button id={item.id} onClick={deleteTodo}>
                  x
                </button>
              </div>
            );
          })}
      </Row>
    </Container>
  );
};

export default TodoList;
