import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Col, Divider, Form, Input, Modal, Popconfirm, Row } from "antd"
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { deleteUser, getUserById, getUsers, updateUser } from "../../services/users";
import moment from "moment";

const UsersCRUDButtons = (props) => {
    const { fetchUsers, id } = props
    const [form] = useForm()
    const [role, setRole] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const fetchUserById = async () => {
        const res = await getUserById(id)
        console.log(res[0])
        setRole(res[0].role)
        form.setFieldsValue({
            email: res[0].email,
            fullName: res[0].fullName,
            password: res[0].password,
            createdAt: moment(res[0].createdAt).format('DD-MM-YYYY HH:mm:ss'),
            latestAccess: moment(res[0].latestAccess).format('DD-MM-YYYY HH:mm:ss')
        });
    }
    const onFinish = async (e) => {
        setIsLoading(true)
        await updateUser(id, e)
        await fetchUsers()
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
        const res = await deleteUser(id)
        await setTimeout(() => {
            alert("Delete successfully!")
        }, 1000)
        const ress = await getUsers()
        await fetchUsers()
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
                title={<div style={{ padding: "6px 0" }}></div>} open={isModalOpen} onCancel={handleCancel}>
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
                        label="E-mail"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input disabled={true} />
                    </Form.Item>
                    <Row gutter={[12, 12]}>
                        <Col span={12}>
                            <Form.Item
                                label="Created at"
                                name="createdAt"
                                rules={[
                                    {
                                        required: true,

                                    },
                                ]}
                            >
                                <Input disabled={true} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Latest access"
                                name="latestAccess"
                                rules={[
                                    {
                                        required: true,

                                    },
                                ]}
                            >
                                <Input disabled={true} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="Full name"
                        name="fullName"
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
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <div style={{ padding: "4px 0" }}></div>
                    <Row

                    >
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
                    onClick={handleEditUser}
                    style={{ padding: "16px 9px", display: "flex", justifyContent: "center", alignItems: "center" }}><EditOutlined /></Button>

                {((role != "ADMIN") && (role != "TESTER")) ? (
                    <Popconfirm
                        placement="bottomRight"
                        title={"Are you sure delete this user?"}
                        description={"This action can't be revesred"}
                        okText="Yes"
                        cancelText="No"
                        onConfirm={handleDeleteUser}
                    >
                        <Button
                            // onClick={handleDeleteUser}
                            style={{ padding: "16px 9px", display: "flex", justifyContent: "center", alignItems: "center" }}><DeleteOutlined style={{ color: "red" }} /></Button>

                    </Popconfirm>
                ) : (<>
                    {/* <div style={{ width: "32px", height: "32px" }}></div> */}
                </>)}

            </div >
        </>
    )
}
export default UsersCRUDButtons