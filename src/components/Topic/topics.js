import { useNavigate } from "react-router-dom"
import { getCookie } from "../../helper/cookies"

const Topic = (props) => {
    const { item } = props
    const nav = useNavigate()
    const handleQuiz = () => {
        const token = getCookie("token")
        if (token) {
            nav(`/quiz/${item.name}`)
        }
        else {
            nav(`/login`)
        }
    }
    return (

        <>
            {item.status == "displayed" ?
                (<>
                    <div className="card" onClick={handleQuiz}>
                        <div className="card-banner img-holder">

                            <img src={item.src} alt="" className="img-cover" />
                        </div>
                        <div className="card-content">
                            <div className="card-title title-small">{item.name}</div>
                        </div>
                    </div>
                </>)
                : (<></>)}

        </>
    )
}
export default Topic