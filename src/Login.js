
import React, { useState } from 'react';
import "./Login.css"
import { Link } from "react-router-dom"
import { auth } from "./firebase"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth"
import { useHistory } from 'react-router-dom';
import { useStatevalue } from './StateProvider';
import axios from 'axios'





function Login() {
    const[{basket,user},dispatch]=useStatevalue();
    const history=useHistory()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
    const handleSubmit= async (e)=>{
        e.preventDefault()
        try {
            var response= await axios.post("https://cheak.herokuapp.com/register/login",{
                email:email,
                password:password
            })
            console.log(response.data)
            if(response.data){
                await localStorage.setItem("token",response.data)
                var currentUser=email
                console.log(currentUser)
                const setUser =()=>{
                    dispatch({
                        type: "SET_USER",
                        user: currentUser
                    })
                }
                setUser()
                history.push("/")
                
            }
        } catch (error) {
            console.log(error)
        }
     
    }
    


    return (
        <div className='login'>
            <Link to="/"> <img className='login__logo' src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"></img></Link>
            <div className='login__container'>
                <h1>Sign-In</h1>
                <form onSubmit={handleSubmit}>
                    <h5>E-mail</h5>
                    <input type="text" value={email}  name="email" onChange={e => setEmail(e.target.value)} />
                    <h5>Password</h5>
                    <input type="password" value={password} name="password" onChange={e => setPassword(e.target.value)} />
                    <button className='login__signInButton' type='submit' >Sign-In</button>
                </form>
                <p>
                    By signing-in you agree to AMAZON Clone's conditions of use & sale.Please
                    see our Privacy Notice,our Cookies Notice and our Interest based Ads Notice.
                </p>
               <div>
                   <Link to="/createUser">
                   <button className='login__registerButton'>Create Your Amazon Account</button></Link>
               </div>
            </div>
        </div>
    )
}

export default Login;
// const signIn = async(e) => {
//     e.preventDefault();
//    try {
//     const log=signInWithEmailAndPassword(auth,email,password)
//     if(user){
//         history.push("/")
//     }
//    } catch (error) {
//        alert(error.message)
//    }
// }