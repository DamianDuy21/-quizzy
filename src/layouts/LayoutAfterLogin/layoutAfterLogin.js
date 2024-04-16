import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import "./styles.css"
import { Button, Dropdown, Layout, Menu, Popconfirm, Space } from "antd"
import { useEffect, useState } from "react";
import { FileTextOutlined, HomeOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ProductOutlined, UnorderedListOutlined, UploadOutlined, UserOutlined, UserSwitchOutlined, VideoCameraOutlined } from "@ant-design/icons";
import LayoutBeforeLayout from "../LayoutBeforeLogin/layoutBeforeLogin";
import { useSelector } from "react-redux";
import { deleteAllCookies, getCookie } from "../../helper/cookies";
import UserItems from "../../components/UserItems/userItems";
import { getUserById, updateUser } from "../../services/users";
const { Header, Footer, Sider, Content } = Layout;

const LayoutAfterLogin = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [logoCollapse, setLogoCollapse] = useState(false)
    const param = useLocation()
    const role = getCookie("role")
    const id = getCookie("id")
    const nav = useNavigate()
    const user = useSelector(state => state.UserReducer)
    window.addEventListener("resize", (e) => {
        let width = e.target.innerWidth;
        if (width <= 767.98) {
            setLogoCollapse(true)
        }
        else {
        }
    })

    useEffect(() => {
        let initWidth = window.innerWidth
        if (initWidth <= 767.98) {
            setLogoCollapse(true)
        }
    }, [user])

    const handleSiderBreakPoint = (e) => {
        setCollapsed(e)
        setLogoCollapse(e)
    }
    const handleLogout = async () => {

        const res = await getUserById(id)
        let obj = res[0]
        obj.status = "offline"
        await updateUser(res[0].id, obj)
        await deleteAllCookies();
        await nav("/")
    }
    const items1 = [
        {
            key: '/topics',
            icon: <UnorderedListOutlined />,
            label: <Link to={"/topics"}>Topics</Link>,

        },
        {
            key: '/profile',
            icon: <FileTextOutlined />,
            label: <Link to={"/profile"}>Profile</Link>,

        },
        {
            key: '/history',
            icon: <VideoCameraOutlined />,
            label: <Link to={"/history"}>History</Link>,

        }
    ]
    const items2 = [
        {
            key: '/topics',
            icon: <UnorderedListOutlined />,
            label: <Link to={"/topics"}>Topics</Link>,
        },
    ]
    const items3 = [
        {
            // key: '/',
            icon: <HomeOutlined />,
            label: <Link>General</Link>,
            children: [
                {
                    key: '/topics',
                    icon: <UnorderedListOutlined />,
                    label: <Link to={"/topics"}>Topics</Link>,

                },
                {
                    key: '/profile',
                    icon: <FileTextOutlined />,
                    label: <Link to={"/profile"}>Profile</Link>,

                },
                {
                    key: '/history',
                    icon: <VideoCameraOutlined />,
                    label: <Link to={"/history"}>History</Link>,
                }
            ]

        },
        {
            // key: '/',
            icon: <ProductOutlined />,
            label: <Link>Manage</Link>,
            children: [
                {
                    key: '/topicscrud',
                    icon: <UnorderedListOutlined />,
                    label: <Link to={"topicscrud"}>Topics</Link>,
                },
                {
                    key: '/userscrud',
                    icon: <UserSwitchOutlined />,
                    label: <Link to={"userscrud"}>Users</Link>,
                },
            ]

        },

    ]

    return (<>
        <Layout>
            <Header className="header-after">
                <div className="containery">
                    <div className="left">
                        {logoCollapse ? (<>
                            <div className="logo coll">

                                <a href="/topics" className="headline-medium logo-text" onClick={() => { nav('/topics') }}>.</a>
                            </div>
                        </>) : (<>
                            <div className="logo full">
                                <a href="/topics" className="headline-medium logo-text" onClick={() => { nav('/topics') }}>Logo</a>
                            </div>

                        </>)}

                        <Button className="btn"
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined className="btn-icon" /> : <MenuFoldOutlined className="btn-icon" />}
                            onClick={() => { setCollapsed(!collapsed); setLogoCollapse(!logoCollapse); }}

                        />
                    </div>


                    <div className="auth">
                        <UserItems
                            user={user}
                            handleLogout={handleLogout} />
                    </div>

                </div>
            </Header>
            <Layout>
                <Sider trigger={null}
                    collapsible
                    collapsed={collapsed}
                    className="sider"
                    breakpoint="md"
                    onBreakpoint={handleSiderBreakPoint}
                >
                    <Menu
                        theme="light"
                        mode="inline"
                        defaultSelectedKeys={param.pathname}
                        items={role == "TESTER" ? (items2) : (role == "ADMIN" ? (items3) : (items1))}
                    />
                </Sider>
                <main>
                    <Outlet></Outlet>

                </main>

            </Layout>
            <Footer className="footer">
                © 2024 DamianDuy21
            </Footer>
        </Layout >
    </>)
}
export default LayoutAfterLogin