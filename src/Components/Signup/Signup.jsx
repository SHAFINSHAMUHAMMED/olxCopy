import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import {useNavigate} from 'react-router-dom'
import { FirebaseContext } from '../../store/Context';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {getFirestore,collection,addDoc} from 'firebase/firestore'


export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { auth } = useContext(FirebaseContext);
  const firestore = getFirestore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation of form
    if (username.trim() === '') {
      alert('Please enter a valid username.');
      return;
    }

    if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!phone.match(/^\d{10}$/)) {
      alert('Please enter a valid phone number (10 digits only).');
      return;
    }

    if (password.trim() === ''||password.length<6) {
      alert('Please enter valid password.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, { displayName: username }).then(() => {
          addDoc(collection(firestore, 'users'), {
            id: user.uid,
            username: username,
            phone: phone
          }).then(() => {
            navigate('/login');
          });
        });
      })
      .catch((error) => {
        alert(error)
      });
  };

  return (
    <div>
      <div className="signupParentDiv container d-flex flex-column align-items-center">
        <img className="logo" width="180px" height="180px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label className="mb-1" htmlFor="username">Username</label>
            <input
              className="form-control"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              name="username"
              placeholder="Enter username"
              
            />
          </div>
          <div className="form-group mb-3">
            <label className="mb-1" htmlFor="email">Email</label>
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              placeholder="Enter email"
              
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="phone">Phone</label>
            <input
              className="form-control"
              type="tel"
              pattern="[0-9]{10}"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="phone"
              name="phone"
              placeholder="Enter phone number"
              
            />
          </div>
          <div className="form-group mb-3">
            <label className="mb-1" htmlFor="password">Password</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              placeholder="Enter password"
              
            />
          </div>
          <button className="btn btn-primary">Signup</button>
        </form>
        <div className="d-flex justify-content-center">
          <p className="mt-3">
            Already have an account? <a onClick={() => navigate('/login')}>Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

