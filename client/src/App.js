import './App.css';
import './styles/todo.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login'
import Register from './pages/Register'
import Todo from './pages/Todo';
import Nav from './components/Nav';
import React from 'react';
import TodoDetail from './components/TodoDetail';


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
