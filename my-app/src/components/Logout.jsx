import { useCookies } from 'react-cookie';
import {Navigate} from 'react-router-dom';
import Cookies from 'js-cookie'
import { useState,useEffect } from 'react';

export default function Logout() {
    const [loading,setLoading] = useState(true);
    
    if (Cookies.get('sessionID')) {
        Cookies.remove('sessionID');
    }

    useEffect(() => {
        setTimeout(() => setLoading(false),5000);
    })

    if (loading === true) {
        return (
            <div className="loading"></div>
        )
    }
    
    return (
        <Navigate to="/"/>
    )
}