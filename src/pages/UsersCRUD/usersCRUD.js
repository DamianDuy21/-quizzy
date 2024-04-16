import { Button, Col, Form, Input, Row, Table } from "antd"
import { useEffect, useState } from "react"
import { getUserByEmail, getUsers } from "../../services/users"
import UsersCRUDButtons from "../../components/UsersCRUDButtons/usersCRUDButtons"
import { useForm } from "antd/es/form/Form"
import moment from "moment"

const UsersCRUD = () => {
    const [data, setData] = useState([])
    const [tableCollapse, setTableCollapse] = useState(false)
    const [loading, setLoading] = useState(false);
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
        setLoading(true)
        const res = await getUsers()
        console.log(res)
        setData(res)
        setLoading(false)
    }
    const columnsMini = [
        {
            title: 'E-mail',
            dataIndex: 'email',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.email > b.email,
            width: "70%",
            render: (text, record, index) => {
                return (
                    <>
                        <div style={{ maxWidth: 128 }}>
                            {record.email}
                        </div>

                    </>
                )
            },
        },
        {
            title: '',
            render: (text, record, index) => {
                return (
                    <>
                        <UsersCRUDButtons fetchUsers={fetchUsers} id={record.id} />
                    </>
                )
            },
            width: '30%',

        },
    ]
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            width: '25%',
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.email > b.email,
            width: '30%',
        },
        {
            title: 'Latest access',
            dataIndex: 'latestAccess',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => (moment(a.latestAccess) > moment(b.latestAccess)),
            render: (text, record, index) => {
                return (
                    <>
                        {moment(record.latestAccess).format('DD-MM-YYYY HH:mm:ss')}

                    </>
                )
            },
            width: '25%',
        },
        {
            title: '',
            render: (text, record, index) => {
                return (
                    <>
                        <UsersCRUDButtons fetchUsers={fetchUsers} id={record.id} />
                    </>
                )
            },
            width: '20%',

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
        console.log(e)
        form.resetFields()
        form.setFieldValue({
            email: ""
        })
        if (e.email) {
            const res = await getUserByEmail(e.email)
            await setData(res)
        }
        else {
            const res = await getUsers()
            setData(res)

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
                    loading={loading}
                    onChange={handleTableChange}
                />
            </>)

                : (<></>)}
        </>
    )
}
export default UsersCRUD