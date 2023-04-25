import React, { useState } from 'react';
import { Layout, Menu, Button, Switch } from 'antd';
import { BrowserRouter as Router, Route, Switch as RouteSwitch } from 'react-router-dom';
import Home from './screens/Home';
import Account from './screens/Account';
import './App.css';
import NavBar from './router/NavBar';
import AppRoutes from './router/AppRoutes';
import { ArrowLeftOutlined   } from '@ant-design/icons';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useMediaQuery } from '@material-ui/core';


const { Header, Sider, Content } = Layout;


function App({signOut, user}) {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useMediaQuery('(max-width: 600px)');
  

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  if(isMobile){
    return (

      <div className='mobile'>
        <br/>
        <br />
        <Home />
        <div className='red' onClick={signOut}>
          Sign out
        </div>
      </div>
    );
  }
  else{
    return (

      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" />
            <NavBar activeId={'1'} />
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
            <p className='pageHeading' >Printer Management Portal</p>
              <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>              
                <ArrowLeftOutlined   />
              </Button>
              
            </Header>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <AppRoutes signOut ={signOut}/>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }

  
}

export default withAuthenticator(App); 