import './styles.css';
import { homeIcon, accountIcon } from '../assets/svg';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

const NavBar = ({keySelected}) => {

    const [selectedKey, setSelectedKey] = useState(keySelected);
    const navigate = useNavigate();

    useEffect(() => {
        setSelectedKey(keySelected);
      }, [keySelected]);;

    const handleMenuSelect = (key) => {
        console.log(key.key);
        if(key !== selectedKey)
        {
            setSelectedKey(key.key);
            navigate(key.key);
        }
    }
    if(keySelected !== '' && keySelected !== null){
        return(
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedKey]} onSelect={handleMenuSelect} className='navBarStyles'>
                <Menu.Item key="/home" >
                    <HomeOutlined/>
                    <span>Home</span>
                </Menu.Item>
                <Menu.Item key="/account" >
                    <UserOutlined />
                    <span>Account</span>
                </Menu.Item>
            </Menu>
        );
    }
    else {
        return <div></div>;
    }
};

export default NavBar;

