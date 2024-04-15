import { Button, Col, Form, Input, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { getResultsByUserEmail, getUserResultsByTopicName } from "../../services/result";
import { getCookie } from "../../helper/cookies";
import ViewDetailResultButton from "../../components/ViewDetailResultButton/viewDetailResultButton";
import moment from "moment";
import { getTopicIdByTopicName } from "../../services/topics";
import { useForm } from "antd/es/form/Form";

const History = () => {
    const role = getCookie("role")
    const [tableCollapse, setTableCollapse] = useState(false)
    const [data, setData] = useState();
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
    const columnsMini = [
        {
            title: 'Topic',
            dataIndex: 'topicName',
            sorter: (a, b) => a.topicName > b.topicName,
            width: '40%',
            render: (text, record, index) => {
                return (
                    <>
                        <div style={{ maxWidth: 46 }}>
                            {record.topicName}
                        </div>

                    </>
                )
            }
        },
        {
            title: 'Created at',
            dataIndex: 'createdAt',
            sorter: (a, b) => (moment(a.createdAt) > moment(b.createdAt)),
            width: '40%',
            render: (text, record, index) => {
                return (
                    <>
                        <div style={{ maxWidth: 46 }}>
                            {moment(record.createdAt).format('DD-MM-YYYY HH:mm:ss')}
                        </div>

                    </>
                )
            }
        },
        {
            title: '',
            render: (text, record, index) => {
                return (
                    <>
                        <div style={{ maxWidth: 68 }}>
                            <ViewDetailResultButton id={record.id} />
                        </div>

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
            width: '40%',
        },
        {
            title: 'Topic',
            dataIndex: 'topicName',
            sorter: (a, b) => a.topicName > b.topicName,
            width: '20%',
        },
        {
            title: 'Created at',
            dataIndex: 'createdAt',
            defaultSortOrder: 'descend',
            sorter: (a, b) => (moment(a.createdAt) > moment(b.createdAt)),
            width: '30%',
            render: (text, record, index) => {
                return (
                    <>
                        {moment(record.createdAt).format('DD-MM-YYYY HH:mm:ss')}
                    </>
                )
            }
        },
        {
            title: '',
            render: (text, record, index) => {
                return (
                    <>
                        <ViewDetailResultButton id={record.id} />
                    </>
                )
            },
            width: '10%',

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
    const fetchResults = async () => {
        setLoading(true)
        const userEmail = getCookie("email")
        const res = await getResultsByUserEmail(userEmail)
        setData(res)
        setLoading(false)
    }
    const onFinish = async (e) => {
        console.log(e)
        form.resetFields()
        form.setFieldValue({
            name: ""
        })
        if (e.name) {
            const res = await getUserResultsByTopicName(e.name, getCookie("email"))
            await setData(res)
        }
        else {
            const res = await getResultsByUserEmail(getCookie("email"))
            setData(res)

        }


    }

    useEffect(() => {
        let initWidth = window.innerWidth
        if (initWidth <= 767.98) {
            setTableCollapse(true)
        }
        fetchResults()
    }, [])
    return (
        <>
            {role == "TESTER" ? (<>

            </>) : (<>
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
                                            label="Topic"
                                            name="name"
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
                                            label="Topic"
                                            name="name"
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
            }

        </>
    )
}
export default History