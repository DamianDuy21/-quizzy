import { useState } from "react";
import LayoutBeforeLayout from "../LayoutBeforeLogin/layoutBeforeLogin";
import { useSelector } from "react-redux";
import { getCookie } from "../../helper/cookies";
import LayoutAfterLogin from "../LayoutAfterLogin/layoutAfterLogin";
import { useLocation, useNavigate } from "react-router-dom";

const DefaultLayout = () => {
    const authen = useSelector(state => state.AuthenReducer)
    const token = getCookie("token")
    const pathname = useLocation().pathname
    console.log(pathname)
    const nav = useNavigate()
    return (
        <>
            {(pathname == "/login" || pathname == "/registered") ? (<LayoutBeforeLayout />) : (
                <>
                    {token ? (<LayoutAfterLogin />)
                        :
                        (<LayoutBeforeLayout />)}
                </>
            )}


        </>
    )
}
export default DefaultLayout