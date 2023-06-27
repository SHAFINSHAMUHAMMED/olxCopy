import React,{useContext} from 'react';
import { FirebaseContext } from '../../store/Context';
import { signOut } from 'firebase/auth';
import {useNavigate} from 'react-router-dom'
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/Context';
function Header() {
  const { auth } = useContext(FirebaseContext);
  const navigate=useNavigate()

 function logout(e){
  e.preventDefault()
  signOut(auth)
  .then(()=>{
    navigate('/')
  })
 }

  const {user} = useContext(AuthContext)
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div onClick={()=>{navigate('/')}} className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span onClick={()=>{navigate('/login')}}>{user ? `Welcome ${user.displayName} `: 'login'}</span>
          <hr />
        </div>
        {user&&<span onClick={logout}>Logout</span>}

        <div onClick={()=>{navigate('/sell')}} className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
