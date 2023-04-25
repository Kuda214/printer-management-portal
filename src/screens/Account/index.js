import './styles.css';
import { FrownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Account = ({signOut}) => {

    const navigate = useNavigate();

    const handleSignOut = () => {
        navigate('/');
        signOut();
    }
    
    return (
        <div className="pageContent">
            <FrownOutlined  className='sadIcon'/>
            <h1 className="header">We hate to see you go </h1>
            <h4 className='logout' onClick={handleSignOut}>Logout</h4>
        </div>
    );
};

export default Account;