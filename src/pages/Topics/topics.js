import { useEffect, useState } from "react"
import { getTopics } from "../../services/topics"
import Topic from "../../components/Topic/topics"
import { getCookie } from "../../helper/cookies"
import Home from "../Home/home"
import { useLocation, useNavigate } from "react-router-dom"


const Topics = () => {
    const p = useLocation()
    const nav = useNavigate()
    const [topics, setTopics] = useState([])
    const token = getCookie("token")
    const fetchTopics = async () => {
        let items = []
        const res = await getTopics()
        // console.log(res)
        if (res && res.length > 0) {
            setTopics(res)
        }
    }

    if (token && p.pathname == '/') {
        nav("/topics")
    }
    useEffect(() => {
        fetchTopics()
    }, [])

    return (
        <>
            {token ? (<>
                {topics ? (
                    <>
                        <div className="card-wrapper">
                            {topics.map((item, index) => (
                                <Topic key={index} item={item} />
                            ))}
                        </div>
                    </>
                )


                    : (<></>)}

            </>) : (<><Home /></>)}

        </>
    )
}
export default Topics