import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import "./styles.css"
import { Button, Dropdown, Layout, Menu, Popconfirm, Space } from "antd"
import { useEffect, useState } from "react";
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UnorderedListOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import LayoutBeforeLayout from "../LayoutBeforeLogin/layoutBeforeLogin";
import { useSelector } from "react-redux";
import { deleteAllCookies, getCookie } from "../../helper/cookies";
import UserItems from "../../components/UserItems/userItems";
const { Header, Footer, Sider, Content } = Layout;

const LayoutAfterLogin = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [logoCollapse, setLogoCollapse] = useState(false)
    const [status, setStatus] = useState(false)
    const param = useLocation()
    const userName = getCookie("fullName")
    const nav = useNavigate()
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
    }, [])

    const handleSiderBreakPoint = (e) => {
        setCollapsed(e)
        setLogoCollapse(e)
    }
    const handleLogout = () => {
        deleteAllCookies();
        nav("/")
    }

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

                        <UserItems userName={userName} handleLogout={handleLogout} />

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
                        items={[
                            {
                                key: '/topics',
                                icon: <UnorderedListOutlined />,
                                label: <Link to={"/topics"}>Topics</Link>,

                            },
                            {
                                key: '/history',
                                icon: <VideoCameraOutlined />,
                                label: <Link to={"/history"}>History</Link>,

                            }
                        ]}
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