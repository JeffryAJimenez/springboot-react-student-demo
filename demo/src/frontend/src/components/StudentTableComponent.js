import {useState, useEffect} from 'react';
import { Table, Spin, Empty, Button, Badge, Tag, Avatar, Radio, Popconfirm} from 'antd';
import {
  UserOutlined,
  LoadingOutlined,
  PlusOutlined
} from '@ant-design/icons';

import '../App.css'

import { getAllStudents, deleteStudent} from "../clients/client";
import { errorNotification, successNotification } from './notifications/Notification';


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

const removeStudent = (studentId, callback, successNotification, errorNotification) => {
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

const columns = (fetchStudents, successNotification, errorNotification) => [
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
                    onConfirm={() => removeStudent(student.id, fetchStudents, successNotification, errorNotification)}
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


function StudentTableComponent( {successNotification, errorNotification, studentDrawerForm} ) {

    const [students, setStudent] = useState([]);
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

    const renderStudents = (StudentDrawerForm) => {
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
                columns={columns(fetchStudents, successNotification, errorNotification)}
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

    return renderStudents(studentDrawerForm);
               
}

export default StudentTableComponent;