import { Badge, Button, Col, Form, Input, Row, Table, Tag } from "antd"
import { useEffect, useState } from "react"
import { getTopicIdByTopicName, getTopics } from "../../services/topics"
import TopicsCRUDButtons from "../../components/TopicsCRUDButtons/topicsCRUDButtons"
import { useForm } from "antd/es/form/Form"
const TopicsCRUD = () => {
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
    const fetchTopics = async () => {
        setLoading(true)
        const res = await getTopics()
        setData(res)
        setLoading(false)
    }
    const columnsMini = [
        {
            title: 'Topic',
            dataIndex: 'name',
            width: '40%',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.name > b.name,
            render: (text, record, index) => {
                return (
                    <>
                        <div style={{ maxWidth: 64 }}>
                            {record.name}
                        </div>

                    </>
                )
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: '10%',
            render: (text, record, index) => {
                return (
                    <>
                        {(record.status == "displayed") ? (<>
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
                        <TopicsCRUDButtons fetchTopics={fetchTopics} record={record} />
                    </>
                )
            },
            width: '30%',

        },
    ];
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id > b.id,
            width: '20%',
        },
        {
            title: 'Topic',
            dataIndex: 'name',
            width: '30%',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: '20%',
            render: (text, record, index) => {
                return (
                    <>
                        {(record.status == "displayed") ? (<>
                            <Tag color="success">displayed</Tag>
                        </>)
                            : (<>
                                <Tag color="error">hidden</Tag>
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
                        <TopicsCRUDButtons fetchTopics={fetchTopics} record={record} />
                    </>
                )
            },
            width: '30%',

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
            name: ""
        })
        if (e.name) {
            const res = await getTopicIdByTopicName(e.name)
            await setData(res)
        }
        else {
            const res = await getTopics()
            setData(res)

        }


    }

    useEffect(() => {
        let initWidth = window.innerWidth
        if (initWidth <= 767.98) {
            setTableCollapse(true)
        }
        fetchTopics()

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

                : (<></>)}
        </>
    )
}
export default TopicsCRUD