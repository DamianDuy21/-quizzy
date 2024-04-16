import { getTester, getUserLogin, updateUser } from "../../services/users"
import { deleteAllCookies, getCookie, setCookie } from "../../helper/cookies";
import "./styles.css"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { Button, Checkbox, Divider, Form, Input } from 'antd';
import { useState } from "react";
import { BulbTwoTone } from "@ant-design/icons";
const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isLoading2, setIsLoading2] = useState(false)
    const nav = useNavigate()
    const dispatch = useDispatch()
    const onFinish = async (e) => {
        setIsLoading(true)
        const email = e.email
        const password = e.password
        const res = await getUserLogin(email, password)
        if (res && res.length > 0) {
            const data = res[0]
            dispatch({
                type: "authen",
                value: true
            })
            dispatch({
                type: "login",
                value: {
                    email: data.email,
                    fullName: data.fullName,
                    id: data.id,
                    password: data.password,
                    role: data.role,
                }
            })
            data.latestAccess = Date.now()
            await updateUser(res[0].id, data) //update lai thoi gian truy cap
            setIsLoading(false)
            nav("/topics")
            setCookie("fullName", data.fullName, 1)
            // setCookie("password", data.password, 1)
            setCookie("email", data.email, 1)
            setCookie("token", uuidv4(), 1)
            setCookie("id", data.id, 1)
            setCookie("role", data.role, 1)
        }
        else {
            setIsLoading(false)
            alert("Wrong information!")
        }
    }
    const handleSignWithTestAccount = async () => {
        setIsLoading2(true)
        const res = await getTester()
        console.log(res)
        if (res && res.length > 0) {
            const data = res[0]
            dispatch({
                type: "authen",
                value: true
            })
            dispatch({
                type: "login",
                value: {
                    email: data.email,
                    fullName: data.fullName,
                    id: data.id,
                    password: data.password,
                    role: data.role,
                }
            })
            data.latestAccess = Date.now()
            await updateUser(res[0].id, data) //update lai thoi gian truy cap
            setIsLoading2(false)
            nav("/topics")
            setCookie("fullName", data.fullName, 1)
            setCookie("email", data.email, 1)
            setCookie("token", uuidv4(), 1)
            setCookie("id", data.id, 1)
            setCookie("role", data.role, 1)

        }
    }

    return (
        <>
            <section className="login section">
                <div className="container">

                    <Form
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
                        <span className="title-medium" style={{ textAlign: "center" }}>Sign in</span>
                        <Divider></Divider>
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

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 0,
                                span: 24,
                            }}
                        >
                            <Checkbox className="ml-0">Remember me</Checkbox>
                        </Form.Item>

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
                                Sign in
                            </Button>
                        </Form.Item>

                        <Divider>or</Divider>
                        <div
                            style={{ display: "flex", justifyContent: "space-between" }}
                        >
                            <Button
                                type="primary"
                                onClick={() => { nav('/registered') }}
                                style={{ width: "48%", height: 36, textAlign: "center" }}

                                className="res576-btn">
                                Create an account
                            </Button>
                            <Button loading={isLoading2}
                                type="primary"
                                onClick={handleSignWithTestAccount}
                                style={{ width: "48%", height: 36, textAlign: "center" }}
                                className="res576-btn">
                                Tester mode
                            </Button>
                        </div>

                    </Form>
                </div>

            </section>
        </>
    )
}
export default Login