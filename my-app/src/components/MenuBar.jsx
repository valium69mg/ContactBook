import '../styles/menuBarStyles.css';
import Cookies from 'js-cookie'
import { useState,useEffect } from 'react';
import { useCookies } from 'react-cookie';


export default function MenuBar() {

    const [auth,setAuth] = useState(false);

    useEffect(() => {
        if (Cookies.get('sessionID')) {
            setAuth(true);
        } else {
            setAuth(false);
        }
    },[])
    
    useEffect(() => {
        setInterval(() => {
            if (Cookies.get('sessionID')) {
                setAuth(true);
            } else {
                setAuth(false);
            }
        },3000)
    },[])

    if (auth) {
        return (
            <div className="navBar">
                    <a href="/save"> ADD CONTACT </a>
                    <a href="/contacts"> MY CONTACTS </a>
                    <a href="/logout"> LOG OUT </a>
            </div>
            )
    } else {
        return (
            <div className="navBar">
                    <a href="/register"> REGISTER </a>
                    <a href="/login"> LOG IN </a>
                </div>
        )
    }
    
}