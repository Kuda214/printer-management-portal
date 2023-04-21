import {
    BrowserRouter as Router,
    Route,
    Routes
  } from 'react-router-dom';
  import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import Account from '../screens/Account';


  const AppRoutes = () => {

    return(
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/account" element={<Account />} />
        </Routes>
    );

    };

    export default AppRoutes;