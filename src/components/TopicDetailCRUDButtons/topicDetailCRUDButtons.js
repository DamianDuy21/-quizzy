import { DeleteOutlined, EditOutlined, EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"
import { Button, Col, Divider, Form, Input, Modal, Popconfirm, Row } from "antd"
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { deleteUser, getUserById, getUsers, updateUser } from "../../services/users";
import { getQuestionsById, updateQuestion } from "../../services/questions";

const TopicDetailCRUDButtons = (props) => {
    const { fetchQuestions, record } = props
    const [form] = useForm()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 40 },
    };
    const handleDisplayQuestion = async (e) => {
        e.preventDefault()
        let obj = record
        if (obj.status == "displayed") {
            obj.status = "hidden"
        }
        else if (obj.status == "hidden") {
            obj.status = "displayed"
        }
        await updateQuestion(record.id, obj)
        await fetchQuestions()
        await setTimeout(() => {
            alert("Update successfully!")
        }, 500)

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
    form.setFieldsValue({
        id: record.id,
        question: record.question,
        answers: record.answers,
        correctAnswer: record.correctAnswer,
        topicId: record.topicId
    });

    return (
        <>
            <Modal
                footer={null}
                title={<div style={{ padding: "6px 0" }}></div>} open={isModalOpen} onCancel={handleCancel}>
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
                        {record?.answers?.map((item, index) => (
                            <Form.Item label={index + 1}
                                name={`ans-${index}`}
                                initialValue={item}

                            >
                                <Input></Input>
                            </Form.Item>
                        ))}
                    </Form.Item>

                    <Row>
                        <Button loading={isLoading}
                            type="primary"
                            htmlType="submit"
                            style={{ width: "100%", height: 36 }}>
                            Update
                        </Button>
                    </Row>
                    <div style={{ padding: "6px 0" }}></div>
                </Form>
            </Modal>
            <div style={{ display: "flex", gap: "12px", justifyContent: "end", flexWrap: "wrap" }}>

                <Button
                    onClick={handleEditQuestion}
                    style={{ padding: "16px 9px", display: "flex", justifyContent: "center", alignItems: "center" }}><EditOutlined /></Button>
                <Button
                    onClick={handleDisplayQuestion}
                    style={{ padding: "16px 9px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {record.status == "displayed"
                        ? (<><EyeInvisibleOutlined /></>)
                        : (<><EyeOutlined /></>)}
                </Button>
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