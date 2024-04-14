import { LogoutOutlined, ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown } from "antd"
import { useNavigate } from "react-router-dom";
import { deleteAllCookies, getCookie } from "../../helper/cookies";

const UserItems = (props) => {
    const { userName, handleLogout } = props
    const role = getCookie("role")
    const nav = useNavigate()
    const itemsTester = [
        {
            label: <div style={{ transform: "translateY(1.5px)" }} onClick={handleLogout}>Sign out</div>,
            key: 'signout',
            icon: <LogoutOutlined />,
        },
    ]
    const items = [
        {
            label: <div style={{ transform: "translateY(1.5px)" }}>Profile</div>,
            key: 'profile',
            icon: <ProfileOutlined />,
        },
        {
            label: <div style={{ transform: "translateY(1.5px)" }} onClick={handleLogout}>Sign out</div>,
            key: 'signout',
            icon: <LogoutOutlined />,
        },

    ]
    return (
        <>
            {role == "TESTER" ? (<>
                <Dropdown
                    menu={{
                        items: itemsTester
                    }}
                    trigger={['hover']}
                >
                    <div className="auth-btn" onClick={(e) => e.preventDefault()}>
                        {userName}
                    </div>
                </Dropdown>
            </>)

                : (<>
                    <Dropdown
                        menu={{
                            items: items
                        }}
                        trigger={['hover']}
                    >
                        <div className="auth-btn" onClick={(e) => e.preventDefault()}>
                            {userName}
                        </div>
                    </Dropdown>

                </>)}

        </>
    )
}
export default UserItems