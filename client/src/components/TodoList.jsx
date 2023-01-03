import axios from 'axios'
import React, {useEffect} from 'react'
import { useState } from 'react'

const TodoList = () => {
   const [todolist, setTodolist] = useState([])

    useEffect(()=>{
        const token = localStorage.getItem('token')
        axios.get('http://localhost:8080/todos', {
            headers : {
                Authorization : token
            }
        }).then((data)=>{
            console.log(data.data.data)
            setTodolist(data.data.data)
            
        }).catch((error)=>{
            console.log(error)
        })
    },[])

    const deleteTodo = (e) =>{
        const token = localStorage.getItem('token')
        const id = e.target.id
        axios.delete(`http://localhost:8080/todos/${id}`, {
            headers : {
                Authorization : token
            }
        }).then((data)=>{
            console.log(data.data)
        }).catch((error)=>{
            console.log(error)
        })
    }

  return (
    <div>
        {
            todolist &&
            todolist.map((item, i)=>{
                return (
                    <div key={item.id}>
                       <span>{item.title}</span> 
                       <span>{item.content}</span> 
                       <button>수정</button>
                       <button id={item.id}  onClick={deleteTodo}>삭제</button>
                    </div>
                )
            })
        }
    </div>
  )
}

export default TodoList