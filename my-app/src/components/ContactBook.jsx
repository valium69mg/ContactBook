import { useState, useEffect } from "react";
import axios from 'axios';
import '../styles/contactBookStyles.css';
import Cookies from 'js-cookie'


function Contact(props) {
    return (
        <div className="contact">
            <h2> {props.name} </h2>
            <p> {props.address} </p>
            <p> {props.phone}</p>
            <p  id="mailProp"> {props.mail} </p>
        </div>
    )
}


function ContactBook() {

    const [loading,setLoading] = useState(true);
    const [update,setUpdate] = useState(true);
    const [info,setInfo] = useState([]); //PAGE CONTACTS
    const [editContact,setEditContact] = useState('');
    const [editContactCredentials,setEditContactCredentials] = useState({
        'name':'',
        'address':'',
        'phone':'',
        'mail':'',
        'sessionID':'',
    });    


    // START OF THE PROGRAM
    useEffect(() => {
        setLoading(true);
        setEditContactCredentials(prevValue => {
            return {
                ...prevValue,
                'sessionID':Cookies.get('sessionID')
            }
        });    
        console.log(Cookies.get('sessionID'))
        axios({
            method:'POST',
            url:'http://127.0.0.1:5000/contacts/all',
            params: {
                'sessionID':Cookies.get('sessionID')
            }
        }).then(obj => {
            setInfo(obj.data);
            setUpdate(true);
        })
        .catch(e => console.log(e))
        setTimeout(() => setLoading(false),3000);
    },[])

    // WHEN UPDATE IS CALLED
    useEffect(() => {
        update && axios({
            method:'POST',
            url:'http://127.0.0.1:5000/contacts/all',
            params: {
                'sessionID':Cookies.get('sessionID')
            }
        }).then(obj => {
            setInfo(obj.data);
            setUpdate(false);
        })
        .catch(e => console.log(e))
        
    },[update])

    function handleEditClick(target) { 
        setEditContact(target);
        axios({
            method:'POST',
            url:`http://127.0.0.1:5000/contacts/getID`,
            params: {
                'mail':target,
                'sessionID':Cookies.get('sessionID')
            }
        }).then(obj => axios({
            method:'POST',
            url:`http://127.0.0.1:5000//contacts/getCredentials`,
            params: {
                'id':obj.data,
                'sessionID':Cookies.get('sessionID')
            }
        }).then(obj => {
            setEditContactCredentials(obj.data)
            setUpdate(true);

        }))
        .catch(e => console.log(e))

    }

    function handleDeleteClick(target){
        axios({
            method:'POST',
            url:`http://127.0.0.1:5000/contacts/getID`,
            params: {
                'mail':target,
                'sessionID':Cookies.get('sessionID')
            }
        }).then(obj => axios({
            method:'POST',
            url:`http://127.0.0.1:5000/contacts/delete`,
            params: {
                'id':obj.data,
                'sessionID':Cookies.get('sessionID')

            }
        }).then(obj => setUpdate(true))
        )
        .catch(e => console.log(e))

    }

    function handleSaveClick(target){
        axios({
            method:'POST',
            url:`http://127.0.0.1:5000/contacts/getID?mail=${target}`,
            params: {
                'mail':target,
                'sessionID':Cookies.get('sessionID')
            }
        }).then(obj => axios({
            method:'POST',
            url:`http://127.0.0.1:5000/contacts/update`,
            params: {
                'id':obj.data,
                'name':editContactCredentials.name,
                'address':editContactCredentials.address,
                'phone':editContactCredentials.phone,
                'mail':editContactCredentials.mail,
                'sessionID':Cookies.get('sessionID')
            }
        }).then(obj => {
            setEditContact('');
            setEditContactCredentials(
                {
                    'name':'',
                    'address':'',
                    'phone':'',
                    'mail':'',
                }
            )
            setUpdate(true);
        })
        )
        .catch(e => console.log(e))     
    }

    function handleChange(event) {
        const {name,value} = event.target;
        setEditContactCredentials((prevValue) => {
            return {
                ...prevValue,
                [name]:value
            }
        })
    }

    
    if (loading === true) {
        return (
            <div className="loading"></div>
        )
    }

    if (info == null || !Cookies.get('sessionID')) {
        return (
            <p> NO CONTACTS </p>
        )
    } else {
        return (
            <div className="contactContainer">
                {info.map((element,key) => {
                    if (element.mail === editContact) {
                        return(
                        <div key={key + 'EditWrapper'} className="contactAndEditWrapper"> 
                        <div className="contactWrapper">
                        <Contact
                            key={key}
                            name={element.name}
                            address={element.address}
                            phone={element.phone}
                            mail={element.mail}
                        />
                        </div>  
                        <div key={key + 'EditContainer'} className="editContact">
                            <label> name: </label>
                            <input name={'name'} type="text" placeholder="Name" defaultValue={element.name} onChange={handleChange}/>
                            <label> address: </label>
                            <input name={'address'} type="text" placeholder="Address" defaultValue={element.address} onChange={handleChange}/>
                            <label> phone: </label>
                            <input name={'phone'} type="text" placeholder="Phone" defaultValue={element.phone} onChange={handleChange}/>
                            <label> mail: </label>
                            <input name={'mail'} type="text" placeholder="mail" defaultValue={element.mail} onChange={handleChange}/>
                            <button name={element.mail} onClick={e => handleSaveClick(e.target.name)}> Save </button>
                        </div>      
                        </div>
                        )
                    } else {
                        return(
                        <div key={key + 'EditWrapper'}  className="contactWrapper">
                        <Contact
                            key={key}
                            name={element.name}
                            address={element.address}
                            phone={element.phone}
                            mail={element.mail}
            
                        />
                        <button key={key + 'button1'} name={element.mail} onClick={e => handleEditClick(e.target.name)}> Edit </button>
                        <button key={key + 'button2' } name={element.mail} onClick={e => handleDeleteClick(e.target.name)}> Delete </button>
                        </div>  
                        )
                    }
                })}
               
            </div>
        )
    }
    
}

export default ContactBook;