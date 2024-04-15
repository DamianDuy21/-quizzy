import { DeleteOutlined, EditOutlined, EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"
import { Button, Divider, Form, Input, Modal, Popconfirm } from "antd"
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { deleteUser, getUserById, getUsers, updateUser } from "../../services/users";
import { getTopicIdByTopicId, updateTopic } from "../../services/topics";
import { useNavigate } from "react-router-dom";
import { Col, Row } from 'antd';

const TopicsCRUDButtons = (props) => {
    const { fetchTopics, record } = props
    const [isLoading, setIsLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = useForm()
    const nav = useNavigate()
    const handleEditTopic = (e) => {
        e.preventDefault()
        setIsModalOpen(true)
        form.setFieldsValue({
            id: record.id,
            name: record.name,
            src: record.src,
        })
    }
    const handleDeleteTopic = async (e) => {
        e.preventDefault()
        // const res = await deleteTopic(id)
        await setTimeout(() => {
            alert("This feature is not unavailable!")
        }, 500)
        // const ress = await getTopics()
        // setData(ress)
    }
    const handleDisplayTopic = async (e) => {
        e.preventDefault()
        let obj = record
        if (obj.status == "displayed") {
            obj.status = "hidden"
        }
        else if (obj.status == "hidden") {
            obj.status = "displayed"
        }
        await updateTopic(record.id, obj)
        await fetchTopics()
        await setTimeout(() => {
            alert("Update successfully!")
        }, 500)

    }
    const onFinish = async (e) => {
        setIsLoading(true)
        await updateTopic(e.id, e)
        await fetchTopics()
        await setTimeout(() => {
            alert("Update successfully!")
        }, 500)
        await setIsLoading(false)
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleMoreDetail = () => {
        setIsModalOpen(false)
        nav(`/topicdetailcrud/${record.name}`)
    }

    return (
        <>
            <Modal
                footer={null}
                title={<div style={{ padding: "6px 0" }}></div>} open={isModalOpen} onCancel={handleCancel}>
                <Form
                    form={form}
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    // className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <span className="title-medium" style={{ textAlign: "center" }}>Topic</span>
                    {/* <Divider></Divider> */}
                    <div style={{ padding: "12px 0" }}></div>
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

                    <Form.Item
                        label="Topic"
                        name="name"
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
                        label="Image"
                        name="src"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <div style={{ padding: "4px 0" }}></div>
                    <Row gutter={[12, 12]}>
                        <Col span={12}>
                            <Button
                                onClick={handleMoreDetail}
                                style={{ width: "100%", height: 36 }}>
                                More detail
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button loading={isLoading}
                                type="primary"
                                htmlType="submit"
                                style={{ width: "100%", height: 36 }}>
                                Update
                            </Button>
                        </Col>
                    </Row>
                    <div style={{ padding: "6px 0" }}></div>
                </Form>
            </Modal>
            <div style={{ display: "flex", gap: "8px", justifyContent: "end", flexWrap: "wrap" }}>

                <Button
                    onClick={handleEditTopic}
                    style={{ padding: "16px 9px", display: "flex", justifyContent: "center", alignItems: "center" }}><EditOutlined /></Button>
                <Button
                    onClick={handleDisplayTopic}
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
                    onConfirm={handleDeleteTopic}
                >
                    <Button
                        style={{ padding: "16px 9px", display: "flex", justifyContent: "center", alignItems: "center" }}><DeleteOutlined style={{ color: "red" }} /></Button>

                </Popconfirm>

            </div>
        </>
    )
}
export default TopicsCRUDButtons