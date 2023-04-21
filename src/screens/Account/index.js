import './styles.css';
import { FrownOutlined } from '@ant-design/icons';

const Account = () => {
    return (
        <div className="pageContent">
            <FrownOutlined  className='sadIcon'/>
            <h1 className="header">We hate to see you go </h1>
            <h4 className='logout'>Logout</h4>
        </div>
    );
};

export default Account;