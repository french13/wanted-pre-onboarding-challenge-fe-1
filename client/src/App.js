import './App.css';
import './styles/todo.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register'
import Todo from './components/Todo';
import Nav from './components/Nav';
import React from 'react';
import TodoDetail from './components/TodoDetail';


function App() {
 


  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path='/' element={<Todo/>}>
          <Route path='detail/:id' element={<TodoDetail/>}/>
        </Route>
        <Route path='/auth/login' element={<Login/>}/>
        <Route path='/auth/register' element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
