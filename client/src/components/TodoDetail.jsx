import React from 'react'
import { useEffect, useState  } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useOutletContext } from 'react-router-dom'


const TodoDetail = () => {
  const [detailTodo, setDetailTodo] = useState()
  let param = useParams().id
  const navigate = useNavigate()
  const [rePage, setRepage] = useOutletContext()

  useEffect(()=>{
    const token = localStorage.getItem("token");
     axios
      .get(
        `http://localhost:8080/todos/${param}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((data) => {
        console.log(data.data);
        setDetailTodo(data.data.data)
      })
      .catch((error) => {
        console.log(error);
      });
  },[param, rePage])

  return (
    <div className='detailTodo__box'>
    {
      detailTodo&&
      <>
      <button onClick={()=>{navigate(-1)}}>◀</button>
      <button onClick={()=>{navigate('/')}}>x</button>
      <div>{detailTodo.title}</div>
      <div>{detailTodo.content}</div>
      
      </>
    }
    </div>
  )
}

export default TodoDetail