import { useState,useEffect } from "react"
import axios from 'axios';
import {Navigate} from 'react-router-dom'
import '../styles/registerStyles.css';
export default function Register() {
    const [exposePassword,setExposePassword] = useState(false);
    const [registering,setRegistering] = useState(false);
    const [registered,setRegistered] = useState(false);
    const [credentials,setCredentials] = useState({
        'mail':'',
        'password':''
    })
    
    function handleChange(event){
        const key = event.target.name;
        const value = event.target.value;
        setCredentials((prevValue) => {
            return {
                ...prevValue,
                [key]:value
            }
        })
    }
    
    function handleRegister() {
        setRegistering(true);
        axios({
            method:'POST',
            url:'http://127.0.0.1:5000/create/user',
            params: {
                'mail':credentials.mail,
                'password':credentials.password
            }
        }).then(obj => {
            setRegistered(true);
            setTimeout(() => setRegistering(false),3000);
        })
    }



    if (registering === true) {
        return (
            <div className="loading"></div>
        )
    }

    if (registered === true) {
        return (
            <Navigate to="/login"/>
        )
    }

    
    function handleEyeClick () {
        if (exposePassword === false) {
            setExposePassword(true);

        } else {
            setExposePassword(false);
        }
    }

    
    return (
        <div className="registerContainer">
            <h1> REGISTER NEW USER </h1>
            <label> Mail: </label>
            <input style={{'color':'black'}} name='mail' type="text" placeholder="email" onChange={handleChange} autoComplete="off"/>
            <label> Password: </label>
            <div className='passwordInput'> 
                    <input  style={exposePassword ?  {'color':'black'} :{'color':'transparent'}} name="password" type='text' placeholder='Password' onChange={handleChange} autoComplete="off"/>
                    <button onClick={handleEyeClick} className='eyeButton'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-eye" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                    </svg>
                    </button>
                </div>
            <button className='registerButton' onClick={handleRegister}> Register </button>
        </div>
    )
}