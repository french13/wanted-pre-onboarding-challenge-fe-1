import React from "react";
import axios from "axios";
import { Button } from "reactstrap";

interface DeleteProps {
  deleteId : string;
  setDeleteId : any ;
  rePage : boolean;
  setRepage : any;
}

const DeleteModal = ({ deleteId, setDeleteId, rePage, setRepage } : DeleteProps) => {
  const token = localStorage.getItem("token");

  // 투두리스트 삭제
  const deleteTodo = (e) => {
    const id = e.target.id;
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/todos/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        setRepage(!rePage);
        localStorage.removeItem("updateTodoItem");
        alert("삭제완료");
        setDeleteId("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="confirmDeleteTodo">
      <div>삭제하시겠습니까?</div>
      <Button onClick={deleteTodo} id={deleteId}>
        삭제
      </Button>
      <Button
        onClick={() => {
          setDeleteId("");
        }}
      >
        취소
      </Button>
    </div>
  );
};

export default DeleteModal;
