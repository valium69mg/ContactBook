import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import ContactBook from "./components/ContactBook";
import {Navigate} from 'react-router-dom';
import CreateContact from "./components/CreateContact";
import MenuBar from './components/MenuBar';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/RegisterForm';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';

const user = 'dc599a9972fde3045dab59dbd1ae170b'

function App() {
  return (
    <div className="App">
      <MenuBar/>
      <Router>
          <Routes>
            <Route path='/' element={<Home/>}> Dashboard </Route>
            <Route path='/login' element={<Login/>}> Log in </Route>
            <Route path='/register' element={<Register/>}> Register</Route>
            <Route element={<PrivateRoute/>}>
              <Route path='/save' element={<CreateContact/>}> Save Contact </Route>
              <Route path='/logout' element={<Logout/>}> Log out </Route>
              <Route path='/contacts' element={<ContactBook/>}> Register</Route>
            </Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
