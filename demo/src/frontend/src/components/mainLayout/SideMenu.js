import {useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Layout, Menu } from 'antd';
import {Link} from 'react-router-dom';
import {
  DatabaseOutlined,
  LoginOutlined,
  LogoutOutlined,
  TeamOutlined,
  WechatOutlined
} from '@ant-design/icons';

import { updateUsers } from '../../clients/user_client';

import '../../App.css';

const { Sider } = Layout;
const { SubMenu } = Menu;

const authButton = (isAuthenticated, Login, Logout) => {

  if(isAuthenticated) {

    return <Menu.Item key="4" icon={<LogoutOutlined />}>
            <Link onClick={() => Logout()}>Log Out</Link> 
            </Menu.Item>
  }

  return <Menu.Item key="4" icon={<LoginOutlined />}>
          <Link onClick={() => Login()}>Log In</Link> 
        </Menu.Item> 

}

function SideMenu(){
    const { getAccessTokenSilently } = useAuth0();
    
    const [collapsed, setCollapsed] = useState(false);
    const {loginWithRedirect, isAuthenticated, logout} = useAuth0();
    
    if(isAuthenticated) {
      
      
      try {
        getAccessTokenSilently().then((token) => {
        
        console.log("token obtained")
        updateUsers(token)
        // fetch("api/v1/users", {
        //     headers: {
        //         'Content-Type': 'Application/json',
        //         'Authorization': `Bearer ${token}`,
        //     },
        //     method: 'POST',
        //     body: JSON.stringify({})
        // }).then ( checkStatus );


    }
    

    
    )
    
    }

    catch (e) {
        console.log(e);
    }
      
    }
  
  

    return <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <div className="logo" />

                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                  <Menu.Item key="1" icon={<DatabaseOutlined />}>
                    <Link to="/">Students</Link>
                  </Menu.Item>
                  <Menu.Item key="2" icon={<TeamOutlined />}>
                    <Link to="/test">Users</Link>
                  </Menu.Item>
                  <Menu.Item key="3" icon={<WechatOutlined />}>
                    <Link to="/test">Global Chat</Link>
                  </Menu.Item>
                  
                  {authButton(isAuthenticated, loginWithRedirect, logout)}
                  
                </Menu>
              </Sider>
          
}

export default SideMenu;