import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Container, Row, Col, Input, Button } from "reactstrap";
import TodoList from "./TodoList";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rePage, setRepage] = useState(false);

  

    useEffect(()=>{
     const saveTitle = localStorage.getItem('addInputTitle')
     const saveContent = localStorage.getItem('addInputContent')
     setTitle(saveTitle)
     setContent(saveContent)
    },[])

 
  const submitTodo = async () => {
    const token = localStorage.getItem('token')

    await axios
      .post("http://localhost:8080/todos/", { title, content }, { headers: {
        Authorization : token
      } })
      .then((todo) => {
        console.log(todo.data);
        setRepage(!rePage)
        setTitle('');
        setContent('')
        localStorage.removeItem('addInputTitle')
        localStorage.removeItem('addInputContent')
      })
      .catch((error) => {
        console.log(error);
      });

      setRepage(!rePage)
  };

  const localSaveTitle =(e)=>{
    setTitle(e.target.value);
    localStorage.setItem('addInputTitle', e.target.value)
  }
  const localSaveContent =(e)=>{
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
              localSaveTitle
            }
          />
        </Col>
        <Col lg="9">
          <Input
          defaultValue={content}
           placeholder="내용"
            onChange={ localSaveContent}
          />
        </Col>
      </Row>
      <Row>
        <Button className="addTodo__button" onClick={submitTodo}>Todo 추가하기</Button>
      </Row>
      <Outlet context={[rePage, setRepage]}/>
      <Row>
        <TodoList rePage={rePage} setRepage={setRepage}/>
      </Row>
      
        
      
    </Container>
  );
};

export default Todo;
