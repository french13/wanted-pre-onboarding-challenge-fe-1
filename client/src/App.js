import './App.css';
import './styles/todo.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import Todo from './pages/Todo.tsx';
import Nav from './components/Nav.tsx';
import React from 'react';
import TodoDetail from './components/TodoDetail.tsx';


function App() {
 


  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path='/auth/login' element={<Login/>}/>
        <Route path='/auth/register' element={<Register/>}/>
        <Route path='/' element={<Todo/>}>
          <Route path='detail/:id' element={<TodoDetail/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
