import { Navigate, Outlet } from "react-router-dom"
import { getCookie } from "../../helper/cookies"
import Topics from "../../pages/Topics/topics"

const ProtectedTesterPage = () => {
    const role = getCookie("role")
    return (
        <>
            {role == "TESTER" ? (<Navigate to={'/topics'} />) : (<Outlet />)}
        </>

    )
}
export default ProtectedTesterPage