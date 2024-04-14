import { useNavigate } from "react-router-dom"

const Topic = (props) => {
    const { item } = props
    const nav = useNavigate()
    const handleQuiz = () => {
        // console.log(item.name)
        nav(`/quiz/${item.name}`)
    }
    return (

        <>
            <div className="card" onClick={handleQuiz}>
                <div className="card-banner img-holder">

                    <img src={item.src} alt="" className="img-cover" />
                </div>
                <div className="card-content">
                    <div className="card-title title-small">{item.name}</div>
                </div>
            </div>
        </>
    )
}
export default Topic