import {useState, useEffect} from 'react';
import { Layout, Menu, Breadcrumb, Table, Spin, Empty, Button, Badge, Tag, Avatar, Radio, Popconfirm} from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LoadingOutlined,
  PlusOutlined
} from '@ant-design/icons';

import './App.css';
import StudentDrawerForm from "./StudentDrawerForm";
import {successNotification, errorNotification} from "./Notification"


import { getAllStudents, deleteStudent} from "./client";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const TheAvatar = ({name}) => {
    let trim = name.trim();
    if(trim.length === 0){
        return <Avatar icon={<UserOutlined/>} />
    }


    const split = trim.split(" ");

    if(split.length === 1){
        return <Avatar>{name.charAt(0)}</Avatar>
    }

    return <Avatar>{`${name.charAt(0)}${name.charAt(name.length - 1)}`}</Avatar>
}

const removeStudent = (studentId, callback) => {
    deleteStudent(studentId).then(() => {
        successNotification("Student Deleted", `Student with id ${studentId} removed`);
        callback();
    }).catch(err => {

        err.response.json().then(res => {
            console.log(res);
            errorNotification(
                "There was an issue",
                `${res.message} [${res.status}] [${res.error}]`
            );

        });

    })
}

const columns = fetchStudents => [
      {
        title: '',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text, student) => <TheAvatar name={student.name}/>
      },
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (text, student) =>
            <Radio.Group>
                <Popconfirm
                    placement='topRight'
                    title={`Are you sure to delete ${student.name}`}
                    onConfirm={() => removeStudent(student.id, fetchStudents)}
                    okText='Yes'
                    cancelText='No'
                >

                    <Radio.Button value='small'>Delete</Radio.Button>

                </Popconfirm>

                <Radio.Button value='small'>Edit</Radio.Button>

            </Radio.Group>
      }
    ];

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


function App() {

    const [students, setStudent] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);

    const fetchStudents = () => getAllStudents()
                                        .then(res => res.json())
                                        .then(data => {
                                            console.log(data);
                                            setStudent(data);

                                        }).catch(err => {
                                            console.log(err.response);
                                            err.response.json().then(res => {
                                            console.log(res);
                                            errorNotification(
                                                "There was an issue",
                                                `${res.message} [${res.status}]`
                                                );

                                            });
                                        }).finally(() => setFetching(false));

    //call once when the component mounts
    useEffect(() => {

        console.log("components is mounted");
        fetchStudents();



    }, []);

    const renderStudents = () => {
        if(fetching){
            return <Spin indicator={antIcon} />
        }

        if(students.length <= 0){
            return <>
                    <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary" shape="round" icon={<PlusOutlined />} size="small">
                        Add New Student
                    </Button>
                    <StudentDrawerForm
                                showDrawer={showDrawer}
                                setShowDrawer={setShowDrawer}
                                fetchStudents={fetchStudents}/>
                    <Empty />
                </>;
        }

        return <>
            <StudentDrawerForm
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                fetchStudents={fetchStudents}/>
            <Table
                dataSource={students}
                columns={columns(fetchStudents)}
                bordered
                title={() =>
                    <>
                        <Tag style={{marginLeft: '10px'}}>Number of Students</Tag>
                        <Badge
                              count={students.length}
                              style={{ marginLeft: '10px', backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
                            />
                        <br/>
                        <br/>
                        <Button
                          onClick={() => setShowDrawer(!showDrawer)}
                          type="primary" shape="round" icon={<PlusOutlined />} size="small">
                          Add New Student
                        </Button>
                      </>
                      }
                pagination={{ pageSize: 50 }}
                scroll={{ y: 400 }}
                rowKey={(student) => student.id}
            />
        </>;

    }

    return <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                  Option 1
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                  Option 2
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                  <Menu.Item key="3">Tom</Menu.Item>
                  <Menu.Item key="4">Bill</Menu.Item>
                  <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                  <Menu.Item key="6">Team 1</Menu.Item>
                  <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined />}>
                  Files
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0 }} />
              <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>User</Breadcrumb.Item>
                  <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                  {renderStudents()}
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>By Jeffry Jimenez </Footer>
            </Layout>
          </Layout>
}

export default App;