import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Form, Input, Row, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import { getResultsByUserEmail } from '../../services/result';
import { getCookie, setCookie } from "../../helper/cookies"
import CountUp from 'react-countup';
import { getUserById, updateUser } from '../../services/users';
import { useForm } from 'antd/es/form/Form';
import { useDispatch } from 'react-redux';
const Profile = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [results, setResults] = useState(0)
    const [topicsNumber, setTopicsNumber] = useState(0)
    const [userInfo, setUserInfo] = useState({})
    const [tmp, setTmp] = useState(1)
    const [form] = useForm()
    const dispatch = useDispatch()
    const emailUser = getCookie("email")
    const idUser = getCookie("id")
    const formatter = (value) => <CountUp end={value} separator="," />;
    const fetchResults = async () => {
        const res = await getResultsByUserEmail(emailUser)
        setResults(res.length)

        if (res) {
            let tmp = []
            for (let i = 0; i < res.length; i++) {
                if (!tmp.includes(res[i].topicId)) {
                    tmp.push(res[i].topicId)
                }
            }
            setTopicsNumber(tmp.length)
        }
    }
    const fetchUser = async () => {
        try {
            const res = await getUserById(getCookie("id"));
            if (res) {
                await setUserInfo(res[0]);
            }
        } catch (err) {
            alert(err);
        }
    };
    const onFinish = async (e) => {
        setIsLoading(true)
        const res = await updateUser(idUser, e)
        setCookie("fullName", e.fullName)
        setCookie("password", e.password)
        dispatch({
            type: "update",
            value: {
                email: "",
                id: "",
                role: "",
                fullName: e.fullName,
                password: e.password,
            }
        })

        await setTimeout(() => {
            alert("Update successfully!")
        }, 1000)
        await setIsLoading(false)
    }
    const fetchData = async () => {
        setIsLoading(true)
        await fetchResults();
        await fetchUser();
        await form.setFieldsValue({
            email: userInfo.email,
            fullName: userInfo.fullName,
            password: userInfo.password,
        });
        await setTmp(2)
        setIsLoading(false)
    };
    useEffect(() => {
        fetchData();
    }, [tmp])
    return (
        <>
            <Row gutter={16}>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title="Results"
                            value={results}
                            // precision={2}
                            formatter={formatter}
                            valueStyle={{
                                color: '#3f8600',
                            }}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title="Topics"
                            value={topicsNumber}
                            // precision={2}
                            formatter={formatter}
                            valueStyle={{
                                color: '#cf1322',
                            }}
                        />
                    </Card>
                </Col>
            </Row>

            <div className='card no-hover' style={{ marginTop: "16px", padding: "28px 16px 8px 16px" }}>
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
                        <Input disabled={true} />
                    </Form.Item>

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

                    <Row

                    >
                        <Button loading={isLoading}
                            type="primary"
                            htmlType="submit"
                            style={{ width: "100%", height: 36 }}>
                            Update
                        </Button>
                    </Row>
                    <div style={{ padding: "8px 0" }}></div>
                </Form>
            </div>
        </>

    )
}
export default Profile