import { Outlet, useNavigate } from "react-router-dom"
import "./styles.css"
import { Button, Layout, Menu, Modal } from "antd"
import { useEffect, useState } from "react";
import { FormOutlined, LoginOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
const { Header, Footer, Sider, Content } = Layout;

const LayoutBeforeLayout = () => {
    const nav = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [logoCollapse, setLogoCollapse] = useState(false)

    window.addEventListener("resize", (e) => {
        let width = e.target.innerWidth;
        // 576
        if (width <= 768) {
            setLogoCollapse(true)
        }
        else {
            setLogoCollapse(false)
        }
    })
    useEffect(() => {
        let initWidth = window.innerWidth
        if (initWidth <= 768) {
            setLogoCollapse(true)
        }
    }, [])
    return (
        <>
            <Layout>
                <Header className="header-before">
                    <div className="containery">
                        {logoCollapse ? (<>
                            <div className="logo coll">
                                <a href="/" className="headline-medium logo-text">.</a>
                            </div>
                        </>) : (<>
                            <div className="logo full">
                                <a href="/" className="headline-medium logo-text">Quizzy</a>
                            </div>
                        </>)}


                        <div className="auth">
                            <span onClick={() => { nav("/registered") }} className="body-medium auth-btn">
                                <FormOutlined />
                            </span>
                            <span onClick={() => { nav("/login") }} className="body-medium auth-btn">
                                <LoginOutlined />
                            </span>

                        </div>
                    </div>

                </Header>
                <Layout>

                    <main>
                        <Outlet></Outlet>
                    </main>
                </Layout>
                <Footer className="footer">
                    © 2024 DamianDuy21
                </Footer>

            </Layout>



        </>

    )
}

export default LayoutBeforeLayout