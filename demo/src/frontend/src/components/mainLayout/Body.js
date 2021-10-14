import { Route, Switch} from "react-router-dom"
import { Layout, Breadcrumb} from 'antd';

import StudentTableComponent from '../StudentTableComponent';

import '../../App.css';

const { Header, Content, Footer } = Layout;

function Body( {successNotification, errorNotification, studentDrawerForm} ) {

    return <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                  <Breadcrumb style={{ margin: '16px 0' }}>
                    
                  </Breadcrumb>
                  <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>

                      <Switch>
                          
                          <Route 
                            exact path="/" 
                            component={() => <StudentTableComponent 
                                successNotification={successNotification} 
                                errorNotification={errorNotification} 
                                studentDrawerForm={studentDrawerForm}
                                />
                            }>
                            
                          </Route>


                          <Route path="/test" 
                          component={() => <div> Hello World</div>} />

                          
                      
                      </Switch>

                  </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>By Jeffry Jimenez </Footer>
              </Layout>
            
}

export default Body;