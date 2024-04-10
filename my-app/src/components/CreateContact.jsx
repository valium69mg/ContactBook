import { useEffect,useState } from "react"
import axios from "axios"
import '../styles/createContactStyles.css'
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie'

function CreateContact() {
    
    const [contact,setContact] = useState({
        'name':'',
        'address':'',
        'phone':'',
        'mail':'',
        'sessionID':''
    });
    const [savedUser,setSavedUser] = useState(false);


    useEffect(() => {
        if (Cookies.get('sessionID')) {
            setContact(prevValue => {
                return {
                    ...prevValue,
                    'sessionID':Cookies.get('sessionID')
                }
            });
        } 
    },[])
   

    function saveUser() {
        axios({
            method:'POST',
            url:'http://127.0.0.1:5000/create/contact',
            params: contact,
        }).then(obj => {
            setSavedUser(true);
        })
        .catch(e => console.log(e))
    }

    function onChange(event) {
        const {name,value} = event.target;
        setContact((prevValue) => {
            return {
                ...prevValue,
                [name]:value
            }
        })

    }

    
    if (savedUser === true){
        return (
            <Navigate to="/"/>
        )
    }

    
    return (
        <div className="createContactContainer">
            <h1> CREATE NEW CONTACT </h1>
            <div className="create NameContainer">
                <label> Name: </label>
                <input type="text" name="name" onChange={onChange} autoComplete="off"/>
            </div>
            <div className="create AddressContainer">
                <label> Address: </label>
                <input type="text" name="address" onChange={onChange} autoComplete="off"/>
            </div>
            <div className="create PhoneContainer">
                <label> Phone: </label>
                <input type="text" name="phone" onChange={onChange} autoComplete="off"/>
            </div>
            <div className="create MailContainer">
                <label> Mail: </label>
                <input type="text" name="mail" onChange={onChange} autoComplete="off"/>
            </div>
            <button onClick={saveUser}> Save contact </button>
        </div>
    )
}

export default CreateContact;