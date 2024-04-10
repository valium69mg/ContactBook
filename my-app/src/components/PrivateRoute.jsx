import {Outlet, Navigate} from 'react-router-dom';
import Cookies from 'js-cookie'


const PrivateRoute = () => {
    let auth = {'token':false}
    if (Cookies.get('sessionID')) {
        auth.token = true;
    } else {
        auth.token = false;
    }
    return (
        auth.token ? <Outlet/> : <Navigate to= "/login"/>
    )
}

export default PrivateRoute;