import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Divider, Form, Input, Modal, Popconfirm } from "antd"
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { deleteUser, getUserById, getUsers, updateUser } from "../../services/users";
import { getTopicIdByTopicId } from "../../services/topics";

const TopicsCRUDButtons = (props) => {
    const { id } = props
    const [form] = useForm()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const fetchUserById = async () => {
        const res = await getTopicIdByTopicId(id)
        console.log(res[0])
    }
    const onFinish = async (e) => {
        setIsLoading(true)
        await setTimeout(() => {
            alert("Update successfully!")
        }, 500)
        await setIsLoading(false)
    }
    const handleEditUser = (e) => {
        e.preventDefault()
        setIsModalOpen(true)
    }
    const handleDeleteUser = async (e) => {
        e.preventDefault()
        console.log(id)
        // const res = await deleteTopic(id)
        await setTimeout(() => {
            alert("This feature is not unavailable!")
        }, 500)
        // const ress = await getTopics()
        // setData(ress)
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        fetchUserById()
    }, [])
    return (
        <>
            <Modal
                footer={null}
                title={<div style={{ padding: "12px 0" }}></div>} open={isModalOpen} onCancel={handleCancel}>
                <Form
                    form={form}
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <span className="title-medium" style={{ textAlign: "center" }}>Profile</span>
                    {/* <Divider></Divider> */}
                    <div style={{ padding: "12px 0" }}></div>
                    <Form.Item
                        label="Topic"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
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
                    onClick={handleEditUser}
                    style={{ padding: "16px 9px", display: "flex", justifyContent: "center", alignItems: "center" }}><EditOutlined /></Button>
                <Popconfirm
                    placement="bottomRight"
                    title={"Are you sure delete this user?"}
                    description={"This action can't be revesred"}
                    okText="Yes"
                    cancelText="No"
                    onConfirm={handleDeleteUser}
                // disabled
                >
                    <Button
                        style={{ padding: "16px 9px", display: "flex", justifyContent: "center", alignItems: "center" }}><DeleteOutlined style={{ color: "red" }} /></Button>

                </Popconfirm>

            </div>
        </>
    )
}
export default TopicsCRUDButtons