import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Input } from "reactstrap";
import TodoUpdate from "./TodoUpdate.tsx";
import DeleteModal from "./DeleteModal.tsx";

interface PageProps {
  rePage : boolean;
  setRepage : boolean;
}

const TodoList = ({ rePage, setRepage } : PageProps) : JSX.Element => {
  const [todolist, setTodolist] = useState([]);
  const [updateTodoList, setUpdateTodoList] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // component 렌더링시 db에서 todolist와 localStorage에 값이 있다면 가져오기
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/todos`, {
        headers: {
          Authorization: token,
        },
      })
      .then((todoList) => {
        setTodolist(todoList.data.data);
      })
      .then(() => {
        const localUpdate = JSON.parse(localStorage.getItem("updateTodoItem"))
        setUpdateTodoList(localUpdate);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [rePage]);

  // todoList 상세클릭시 detail페이지 이동
  const detailTodo = (e) => {
    navigate(`/detail/${e.target.id}`);
  };

  interface UpdateInputValue {
    title : string;
    content : string;
    id : string;
  }

  // 수정버튼 클릭시 리스트의 값들을 가져와서 state와 localStorage에 넣기
  const openUpdateTodoBox = (e) => {
    const siblings = e.target.parentNode.childNodes;

    const item : UpdateInputValue = {
      title: siblings[0].innerText,
      content: siblings[1].innerText,
      id: e.target.id,
    };

    setUpdateTodoList(item);
    // localStorage에 객체를 저장시에는 JSON 형태로 넣어주어야 한다. getItem시에는 JSON.parse로 가져오기
    localStorage.setItem("updateTodoItem", JSON.stringify(item));
  };



  return (
    <Container style={{ marginTop: "20px" }}>
      {updateTodoList && (
        <TodoUpdate
          updateTodoList={updateTodoList}
          setUpdateTodoList={setUpdateTodoList}
          rePage={rePage}
          setRepage={setRepage}
        />
      )}
      {deleteId && (
        <DeleteModal deleteId={deleteId} setDeleteId={setDeleteId} rePage={rePage} setRepage={setRepage}/>
      )}
      <Row style={{ position: "relative" }}>
        {todolist &&
          todolist.map((item : {title : string; content : string; id : string;}, i) => {
            return (
              <div
                style={{ marginTop: "20px", position: "relative" }}
                className="todo__box"
                key={item.id}
              >
                <span>{item.title}</span>
                <span>{item.content}</span>
                <Button id={item.id} onClick={detailTodo}>
                  상세
                </Button>
                <Button id={item.id} onClick={openUpdateTodoBox}>
                  수정
                </Button>
                <button
                  id={item.id}
                  onClick={(e : any) => {
                    setDeleteId(e.target.id);
                  }}
                >
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
