import {useState } from 'react';
import { Layout, Menu } from 'antd';
import {Link} from 'react-router-dom';
import {
  DatabaseOutlined,
  TeamOutlined,
  WechatOutlined
} from '@ant-design/icons';

import '../../App.css';

const { Sider } = Layout;
const { SubMenu } = Menu;

function SideMenu() {

    
    const [collapsed, setCollapsed] = useState(false);
    

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
                </Menu>
              </Sider>
          
}

export default SideMenu;