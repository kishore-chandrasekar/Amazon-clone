import React from 'react'
import { useState } from 'react';
import { useStatevalue } from './StateProvider';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import './CreateUser.css'

function CreateUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [{ basket, user }, dispatch] = useStatevalue();
  const history = useHistory()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      var response = await axios.post("https://cheak.herokuapp.com/register/registerUser", {
        email: email,
        password: password,
        phone: phone,
        username: username
      })
      console.log(response)

      // var currentUser = email
      // console.log(currentUser)
      // const setUser = () => {
      //   dispatch({
      //     type: "SET_USER",
      //     user: currentUser
      //   })
      // }
      // setUser()
      history.push("/login")


    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className='createuser'>
      <img className='createuser__logo' src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"></img>
      <div className='createuser__container'>
        <h1>Create Your Amazon Account</h1>
        <form  onSubmit={handleSubmit}>
          <h5>User-Name</h5>
          <input type="text" value={username} name="username" onChange={e => setUsername(e.target.value)} />
          <h5>E-mail</h5>
          <input type="text" value={email} name="email" onChange={e => setEmail(e.target.value)} />
          <h5>Phone</h5>
          <input type="text" value={phone} name="phone" onChange={e => setPhone(e.target.value)} />
          <h5>Password</h5>
          <input type="password" value={password} name="password" onChange={e => setPassword(e.target.value)} />
          <button className='createuser__signInButton' type='submit' >Sign-Up</button>

        </form>
        <p>
          By signing-Up you agree to AMAZON Clone's conditions of use & sale.Please
          see our Privacy Notice,our Cookies Notice and our Interest based Ads Notice.
        </p>
      </div>
    </div>
  )
}

export default CreateUser