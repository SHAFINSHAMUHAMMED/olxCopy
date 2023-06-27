import React,{useEffect,useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {Routes,Route,useNavigate,NavLink} from 'react-router-dom'
import Singup from './Pages/Signup'
import Home from './Pages/Home';
import Login from './Pages/Login'
import Sell from './Pages/Create'
import View from './Pages/ViewPost'
import {AuthContext, FirebaseContext} from './store/Context'
import Post from './store/PostContext';

function App() {
  const {user,setUser} = useContext(AuthContext)
  const {auth}= useContext(FirebaseContext)
  useEffect(() => {
    auth.onAuthStateChanged((user)=>{
      setUser(user)
    })
  }, [auth, setUser])
  
  return (
    <div>
      <Post>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<Singup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/sell' element={<Sell/>}/>
      <Route path='/view' element={<View/>}/>

      </Routes>
      </Post>
    </div>
  );
}

export default App;
