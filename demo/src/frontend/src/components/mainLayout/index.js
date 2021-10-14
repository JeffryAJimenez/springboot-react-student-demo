import { Layout } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import SideMenu from './SideMenu';
import Body from './Body';
import StudentDrawerForm from '../forms/StudentDrawerForm';
import {successNotification, errorNotification} from "../notifications/Notification"

import '../../App.css';


function MainLayout() {  

    return <Router>
            <Layout style={{ minHeight: '100vh' }}>
              <SideMenu />
              <Body 
                    successNotification={successNotification} 
                    errorNotification={errorNotification} 
                    studentDrawerForm={StudentDrawerForm}/>
            </Layout>
        </Router>
}

export default MainLayout;