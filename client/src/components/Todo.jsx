import axios from "axios";
import React, { useState } from "react";
import { json } from "react-router-dom";
import { Container, Row, Col, Input, Button } from "reactstrap";
import TodoList from "./TodoList";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rePage, setRepage] = useState(true);
  

 
  const submitTodo = async () => {
    const token = localStorage.getItem('token')

    await axios
      .post("http://localhost:8080/todos/", { title, content }, { headers: {
        Authorization : token
      } })
      .then((todo) => {
        console.log(todo.data);
      })
      .catch((error) => {
        console.log(error);
      });

      setRepage(!rePage)
  };

  return (
    <Container>
      <Row>
        <Col lg="3">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Col>
        <Col lg="9">
          <input
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Button onClick={submitTodo}>Add Todo</Button>
      </Row>
      <Row>
        <TodoList/>
      </Row>
    </Container>
  );
};

export default Todo;
