import {useState, useEffect} from 'react';
import { Table, Spin, Empty, Badge, Tag, Avatar} from 'antd';
import {
  UserOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

import '../App.css'

import {getAllUsers} from '../clients/user_client'


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



const columns = ( fetchUsers, successNotification, errorNotification) => [
      {
        title: '',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text, user) => <TheAvatar name={user.username}/>
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
    ];

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


function UserTableComponent( {successNotification, errorNotification} ) {

    const [users, setUsers] = useState([]);
    const [fetching, setFetching] = useState(true);

    const fetchUsers = () => getAllUsers()
                                        .then(res => res.json())
                                        .then(data => {
                                            console.log(data);
                                            setUsers(data);

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
        fetchUsers();



    }, []);

    const renderUsers= () => {
        if(fetching){
            return <Spin indicator={antIcon} />
        }

        if(users.length <= 0){
            return <Empty />;
        }

        return <>
            <Table
                dataSource={users}
                columns={columns(fetchUsers, successNotification, errorNotification)}
                bordered
                title={() =>
                    <>
                        <Tag style={{marginLeft: '10px'}}>Number of Users</Tag>
                        <Badge
                              count={users.length}
                              style={{ marginLeft: '10px', backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
                            />
                        
                      </>
                      }
                pagination={{ pageSize: 50 }}
                scroll={{ y: 400 }}
                rowKey={(user) => users.indexOf(user)}
            />
        </>;

    }

    return renderUsers();
               
}

export default UserTableComponent;