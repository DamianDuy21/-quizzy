import { Badge, Button, Col, Form, Input, Row, Table, Tag } from "antd"
import { useEffect, useState } from "react"
import { getUserByEmail, getUsers } from "../../services/users"
import UsersCRUDButtons from "../../components/UsersCRUDButtons/usersCRUDButtons"
import { useForm } from "antd/es/form/Form"
import moment from "moment"

const UsersCRUD = () => {
    const [data, setData] = useState([])
    const [tableCollapse, setTableCollapse] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [form] = useForm()
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 8,
        },
    });
    window.addEventListener("resize", (e) => {
        let width = e.target.innerWidth;
        if (width <= 767.98) {
            setTableCollapse(true)
        }
        else {
            setTableCollapse(false)
        }
    })
    const fetchUsers = async () => {
        setIsLoading(true)
        const res = await getUsers()
        setData(res)
        setIsLoading(false)
    }
    const columnsMini = [
        {
            title: 'E-mail',
            dataIndex: 'email',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.email > b.email,
            width: "40%",
            render: (text, record, index) => {
                return (
                    <>
                        <div style={{ maxWidth: 86 }}>
                            {record.email}
                        </div>

                    </>
                )
            },
        },
        // {
        //     title: 'Latest access',
        //     dataIndex: 'latestAccess',
        //     defaultSortOrder: 'descend',
        //     sorter: (a, b) => (moment(a.latestAccess) > moment(b.latestAccess)),
        //     width: '30%',
        //     render: (text, record, index) => {
        //         return (
        //             <>
        //                 <div style={{ maxWidth: 56 }}>
        //                     {moment(record.latestAccess).format('DD-MM-YYYY HH:mm:ss')}
        //                 </div>

        //             </>
        //         )
        //     }
        // },
        {
            title: 'Status',
            dataIndex: 'status',
            width: '40%',
            render: (text, record, index) => {
                return (
                    <>
                        {(record.status == "online") ? (<>
                            <div style={{ maxWidth: 24 }}>
                                <Badge color={'green'} />
                            </div>

                        </>)
                            : (<>
                                <div style={{ maxWidth: 24 }}>
                                    <Badge color={'red'} />
                                </div>
                            </>)}
                    </>
                )
            },
        },
        {
            title: '',
            render: (text, record, index) => {
                return (
                    <>
                        <UsersCRUDButtons tableCollapse={tableCollapse} fetchUsers={fetchUsers} record={record} />
                    </>
                )
            },
            width: '20%',

        },
    ]
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            width: '20%',
            render: (text, record, index) => {
                return (
                    <>
                        <div style={{ maxWidth: 100 }}>
                            {record.id}
                        </div>

                    </>
                )
            },
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.email > b.email,
            render: (text, record, index) => {
                return (
                    <>
                        <div style={{ maxWidth: 140 }}>
                            {record.email}
                        </div>

                    </>
                )
            },
            width: '25%',
        },
        {
            title: 'Latest access',
            dataIndex: 'latestAccess',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => (moment(a.latestAccess) > moment(b.latestAccess)),
            render: (text, record, index) => {
                return (
                    <>
                        <div style={{ maxWidth: 56 }}>
                            {moment(record.latestAccess).format('DD-MM-YYYY HH:mm:ss')}

                        </div>

                    </>
                )
            },
            width: '20%',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: '30%',
            render: (text, record, index) => {
                return (
                    <>
                        {(record.status == "online") ? (<>
                            <Tag color="success">online</Tag>
                        </>)
                            : (<>
                                <Tag color="error">offline</Tag>
                            </>)}
                    </>
                )
            },
        },
        {
            title: '',
            render: (text, record, index) => {
                return (
                    <>
                        <UsersCRUDButtons tableCollapse={tableCollapse} fetchUsers={fetchUsers} record={record} />
                    </>
                )
            },
            width: '25%',

        },
    ];

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };
    const onFinish = async (e) => {
        form.resetFields()
        form.setFieldValue({
            email: ""
        })
        if (e.email) {
            setIsLoading(true)
            const res = await getUserByEmail(e.email)
            await setData(res)
            setIsLoading(false)
        }
        else {
            await fetchUsers()
        }
    }

    useEffect(() => {
        let initWidth = window.innerWidth
        if (initWidth <= 767.98) {
            setTableCollapse(true)
        }
        fetchUsers()
    }, [])
    return (
        <>
            {data ? (<>
                <div className="search-wrapper">
                    <Form
                        onFinish={onFinish}
                        form={form}
                    >
                        <Row gutter={[16, 0]}>
                            {tableCollapse == false
                                ? (<>
                                    <Col span={20}>
                                        <Form.Item
                                            wrapperCol={{
                                                offset: 0,
                                                span: 24,
                                            }}
                                            label="E-mail"
                                            name="email"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={4}
                                    >
                                        <Form.Item
                                            wrapperCol={{
                                                offset: 0,
                                                span: 24,
                                            }}
                                        >

                                            <Button htmlType="submit" type="primary">Search</Button>
                                        </Form.Item>
                                    </Col>
                                </>)
                                : (<>
                                    <Col span={24}>
                                        <Form.Item
                                            wrapperCol={{
                                                offset: 0,
                                                span: 24,
                                            }}
                                            label="E-mail"
                                            name="email"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            wrapperCol={{
                                                offset: 0,
                                                span: 24,
                                            }}
                                        >

                                            <div style={{ display: "flex", justifyContent: "end" }}>
                                                <Button htmlType="submit" type="primary">Search</Button>
                                            </div>

                                        </Form.Item>
                                    </Col>
                                </>)}

                        </Row>
                    </Form>
                </div>
                <Table
                    columns={tableCollapse ? (columnsMini) : (columns)}
                    dataSource={data}
                    pagination={tableParams.pagination}
                    loading={isLoading}
                    onChange={handleTableChange}
                />
            </>)

                : (<></>)}
        </>
    )
}
export default UsersCRUD