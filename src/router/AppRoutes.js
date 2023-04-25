import {
    BrowserRouter as Router,
    Route,
    Routes
  } from 'react-router-dom';
import Home from '../screens/Home';
import Account from '../screens/Account';


  const AppRoutes = ({ signOut}) => {

    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account signOut ={signOut}/>} />
        </Routes>
    );

    };

    export default AppRoutes;