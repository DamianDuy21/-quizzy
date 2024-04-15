import { Navigate, Outlet } from "react-router-dom"
import { getCookie } from "../../helper/cookies"

const ProtectedAdminPage = () => {
    const role = getCookie("role")
    return (
        <>
            {role == "ADMIN" ? (<Outlet />) : (<Navigate to={'/topics'} />)}
        </>

    )
}
export default ProtectedAdminPage