import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Col, Divider, Form, Input, Modal, Popconfirm, Row } from "antd"
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { deleteUser, getUserById, getUsers, updateUser } from "../../services/users";
import { getQuestionsById } from "../../services/questions";

const TopicDetailCRUDButtons = (props) => {
    const { data, setData, id } = props
    const [form] = useForm()
    const [q, setQ] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 40 },
    };
    const fetchQuestionById = async () => {
        const res = await getQuestionsById(id)
        setQ(res[0])
        form.setFieldsValue({
            id: res[0].id,
            question: res[0].question,
            answers: res[0].answers,
            correctAnswer: res[0].correctAnswer,
            topicId: res[0].topicId
        });
    }
    const onFinish = async (e) => {
        setIsLoading(true)
        console.log(e)
        const obj = {
            "id": e.id,
            "topicId": e.topicId,
            "question": e.question,
            "correctAnswer": e.correctAnswer,
        }
        // const res = await updateUser(id, e)
        await setTimeout(() => {
            alert("This feature is not available!")
        }, 500)
        await setIsLoading(false)
    }
    const handleEditQuestion = (e) => {
        e.preventDefault()
        setIsModalOpen(true)
    }
    const handleDeleteQuestion = async (e) => {
        e.preventDefault()
        console.log(id)
        // const res = await deleteUser(id)
        await setTimeout(() => {
            alert("This feature is not available!")
        }, 500)
        // const ress = await getUsers()
        // setData(ress)
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        fetchQuestionById()
    }, [])
    return (
        <>
            <Modal
                footer={null}
                title={<div style={{ padding: "12px 0" }}></div>} open={isModalOpen} onCancel={handleCancel}>
                <Form
                    form={form}
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    layout={layout}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <span className="title-medium" style={{ textAlign: "center" }}>Question</span>
                    <div style={{ padding: "12px 0" }}></div>
                    <Row gutter={[12, 12]}>
                        <Col span={12}>
                            <Form.Item

                                label="id"
                                name="id"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item

                                label="Correct answer"
                                name="correctAnswer"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Form.Item

                            label=""
                            name="topicId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                            hidden
                        >
                            <Input />
                        </Form.Item>
                    </Row>


                    <Form.Item
                        label="Question"
                        name="question"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Answers"
                        name="answers"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        {q?.answers?.map((item, index) => (
                            <Form.Item label={index + 1}
                                name={`ans-${index}`}
                                initialValue={item}

                            >
                                <Input></Input>
                            </Form.Item>
                        ))}
                    </Form.Item>

                    <div style={{ padding: "4px 0" }}></div>
                    <Form.Item
                        wrapperCol={{
                            offset: 0,
                            span: 24,
                        }}
                    >
                        <Button loading={isLoading}
                            type="primary"
                            htmlType="submit"
                            style={{ width: "100%", height: 36 }}>
                            Update
                        </Button>
                    </Form.Item>

                </Form>
            </Modal>
            <div style={{ display: "flex", gap: "12px", justifyContent: "end" }}>

                <Button
                    onClick={handleEditQuestion}
                    style={{ padding: "16px 9px", display: "flex", justifyContent: "center", alignItems: "center" }}><EditOutlined /></Button>
                <Popconfirm
                    placement="bottomRight"
                    title={"Are you sure delete this user?"}
                    description={"This action can't be revesred"}
                    okText="Yes"
                    cancelText="No"
                    onConfirm={handleDeleteQuestion}
                >
                    <Button
                        style={{ padding: "16px 9px", display: "flex", justifyContent: "center", alignItems: "center" }}><DeleteOutlined style={{ color: "red" }} /></Button>

                </Popconfirm>

            </div>
        </>
    )
}
export default TopicDetailCRUDButtons