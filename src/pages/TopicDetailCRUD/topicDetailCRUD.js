import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getTopicIdByTopicName } from "../../services/topics"
import { getQuestionsById, getQuestionsByTopicId, updateQuestion } from "../../services/questions"
import { Table, Button, Tag, Badge, Form, Row, Col, Input } from "antd"
import TopicDetailCRUDButtons from "../../components/TopicDetailCRUDButtons/topicDetailCRUDButtons"
import { useForm } from "antd/es/form/Form"
const TopicsDetailCRUD = () => {
    const param = useParams()
    const [form] = useForm()
    const [q, setQ] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const fetchQuestions = async () => {
        setIsLoading(true)
        const res = await getTopicIdByTopicName(param.topicName)
        const ress = await getQuestionsByTopicId(parseInt(res[0].id))
        ress.sort((a, b) => (parseInt(a.id) > parseInt(b.id)) ? 1 : ((parseInt(b.id) > parseInt(a.id)) ? -1 : 0));
        setQ(ress)
        setIsLoading(false)

    }
    const [tableCollapse, setTableCollapse] = useState(false)

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
            title: 'Question',
            dataIndex: 'question',
            width: '50%',
            render: (text, record, index) => {
                return (
                    <>
                        <div style={{ maxWidth: 160 }}>{record.question}</div>
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
                        <TopicDetailCRUDButtons fetchQuestions={fetchQuestions} record={record} />
                    </>
                )
            },
            width: '40%',

        },
    ];

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            width: '20%',
        },
        {
            title: 'Question',
            dataIndex: 'question',
            width: '30%',
            render: (text, record, index) => {
                return (
                    <>
                        <div>{record.question}</div>
                    </>
                )
            },
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
                        <TopicDetailCRUDButtons fetchQuestions={fetchQuestions} record={record} />
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
            setQ([]);
        }
    };
    const onFinish = async (e) => {
        console.log(e)
        form.resetFields()
        form.setFieldValue({
            id: ""
        })
        if (e.id) {
            setIsLoading(true)
            const res = await getQuestionsById(e.id)
            await setQ(res)
            setIsLoading(false)
        }
        else {
            const res = await fetchQuestions()
        }
    }
    useEffect(() => {
        let initWidth = window.innerWidth
        if (initWidth <= 767.98) {
            setTableCollapse(true)
        }
        fetchQuestions()
    }, [])
    return (
        <>
            {q ? (<>
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
                                            label="Question id"
                                            name="id"
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
                                            label="Question id"
                                            name="id"
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
                    dataSource={q}
                    pagination={tableParams.pagination}
                    loading={isLoading}
                    onChange={handleTableChange}
                />
            </>)

                : (<></>)}
        </>
    )
}
export default TopicsDetailCRUD