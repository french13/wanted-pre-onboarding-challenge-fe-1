import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Container, Row, Col, Input, Button } from "reactstrap";
import TodoList from "../components/TodoList.tsx";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rePage, setRepage] = useState(false);

  const token = localStorage.getItem('token')

  // 페이지 랜더링시 localStorage에 값이 있다면 가져오기  -> 페이지 새로고침시 input값 유지
    useEffect(()=>{
     setTitle(localStorage.getItem('addInputTitle'))
     setContent(localStorage.getItem('addInputContent'))
    },[rePage])

  // todo post 기능
  const submitTodo = async () => {
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/todos/`, { title, content }, { headers: {
        Authorization : token
      } })
      .then((todo) => {
        alert('To Do 추가완료')
        console.log(todo.data);
        localStorage.removeItem('addInputTitle');
        localStorage.removeItem('addInputContent');
        
      }).then(()=>{
        setRepage(!rePage)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // input에 값을 변경 할때마다 localStorage 값 변경
  const saveLocalStorageTodoTitle =(e)=>{
    setTitle(e.target.value);
    localStorage.setItem('addInputTitle', e.target.value)
  }
  const saveLocalStorageTodoContent=(e)=>{
    setContent(e.target.value);
    localStorage.setItem('addInputContent', e.target.value)
  }

  return (
    <Container className="addTodo__container">
      <Row className="addTodo__input">
        <Col lg="3">
          <Input
          defaultValue={title}
          placeholder="제목"
            onChange={
              saveLocalStorageTodoTitle
            }
          />
        </Col>
        <Col lg="9">
          <Input
          defaultValue={content}
           placeholder="내용"
            onChange={saveLocalStorageTodoContent}
          />
        </Col>
      </Row>
      <Row>
        <Button className="addTodo__button" onClick={submitTodo}>Todo 추가하기</Button>
      </Row>
      {/* 상세페이지 outlet에 데이터 props 전달 */}
      <Outlet context={[rePage, setRepage]}/>
      <Row>
        <TodoList rePage={rePage} setRepage={setRepage}/>
      </Row>
      
        
      
    </Container>
  );
};

export default Todo;
