import React , { useContext, useState } from 'react';
import './Login.css';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { handleGoogleSignIn,handleSighOut,handleFbSignIn, initializeLoginFramework, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';


function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false,
  });
  initializeLoginFramework();
  const [loggedinUser, setLoggedinUser] =useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
 
  const googleSignIn =() =>{
      handleGoogleSignIn()
      .then(res=>{
        handleResponse(res,true)
      } )
  }

  const fbSignIn = () =>{
    handleFbSignIn()
    .then(res=>{
        handleResponse(res,true)
    })
  }

  const signOut =() =>{
    handleSighOut()
    .then(res=>{
        handleResponse(res,false)
    })
  }
  const handleResponse = (res, redirect) =>{
    setUser(res);
    setLoggedinUser(res);
    if (redirect) {
        history.replace(from);
    }
  }
  const handleBlur = (event) => {
    let isFieldValid;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const isPasswordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && isPasswordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name,user.email, user.password)
      .then(res=>{
        handleResponse(res,true)
    })
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
      .then(res=>{
        handleResponse(res,true)
    })
    }

    e.preventDefault();
  }
  

  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignIn ? <button onClick={signOut}>Sign out</button> :
          <button onClick={googleSignIn}>Sign in</button>
      }
      <br/>
      <button onClick={fbSignIn}>Sign in with Facebook</button>
      {
        user.isSignIn && <div>
          <img src={user.photo} alt="" />
          <p>Welcome {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      }
      <h1>Our own Authentication </h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New user Sign-up</label>
      <form onSubmit={handleSubmit}>

        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your name" required />}
        <br />
        <input type="text" name="email" onBlur={handleBlur} placeholder="Your E-mail" required />
        <br />
        <input type="password" name="password" onBlur={handleBlur} placeholder="Your password" required />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && <p style={{ color: "green" }}>User {newUser ? 'created' : 'Logged in'} successfully</p>}
    </div>
  );
}

export default Login;
