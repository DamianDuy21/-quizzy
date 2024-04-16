import { LogoutOutlined, ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown } from "antd"
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../helper/cookies";
const UserItems = (props) => {
    const { user, handleLogout } = props
    return (
        <>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ color: "#fff", fontSize: "17px", transform: "translateY(1px)" }}>
                    {user.fullName}
                </div>
                <span className="body-medium auth-btn" onClick={handleLogout}>
                    <LogoutOutlined />
                </span>

            </div>


        </>
    )
}
export default UserItems