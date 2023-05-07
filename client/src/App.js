import React, {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import {Container} from  'semantic-ui-react'
import './App.css';


import { AuthProvider} from './context/auth';
import { AuthContext } from './context/auth';


import MenuBar from './components/MenuBar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SinglePost from './pages/SinglePost'


function App() {
  const {user} = useContext(AuthContext)

  return (
 <AuthProvider>
   <Router>
    <Container>
    <MenuBar/>
    <Routes>

    <Route path='/' element={<Home/>}/> 
    <Route path='/login' element={
      user ? <Navigate to ="/"/> : 
    <Login/>
  }/>
    <Route path='/register' element={
      user ? <Navigate to ="/"/>  :
      <Register/>
      }/>

    <Route path="posts/:postId" element={<SinglePost/>} />

    </Routes>
    </Container>
  </Router>
 </AuthProvider>
  );
}
 
export default App;
