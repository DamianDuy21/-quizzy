import { useEffect, useState } from "react"
import { getTopics } from "../../services/topics"
import Topic from "../../components/Topic/topics"
import { getCookie } from "../../helper/cookies"

const Home = () => {
    const [topics, setTopics] = useState([])
    const token = getCookie("token")
    const fetchTopics = async () => {
        let items = []
        const res = await getTopics()
        console.log(res)
        if (res && res.length > 0) {
            setTopics(res)
        }
    }

    useEffect(() => {
        fetchTopics()
    }, [])
    return (
        <>

            <div className="">
                <div className="q-wrapper title-medium" style={{ marginBottom: "16px" }}>
                    Welcome to Quizzy
                    <span className="body-large" style={{ marginTop: "16px" }}>Test your knowledge with our diverse range of categories. Challenge yourself or compete with friends. Let the fun begin!"</span>
                </div>
                <div className="q-wrapper title-medium" style={{ minHeight: "69vh" }}>
                    Hot topics
                    <div style={{ margin: "16px 0 4px 0" }}></div>
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
                </div>
            </div>
        </>
    )
}
export default Home