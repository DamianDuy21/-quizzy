import { Navigate, Outlet } from "react-router-dom"
import { getCookie } from "../../helper/cookies"

const ProtectedPage = () => {
    const token = getCookie("token")
    return (
        <>
            {token ? <Outlet /> : <Navigate to={"/login"} />}
        </>
    )
}
export default ProtectedPage