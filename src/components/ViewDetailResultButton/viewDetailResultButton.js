import { Button } from "antd"
import { useNavigate } from "react-router-dom"

const ViewDetailResultButton = (props) => {
    const { id } = props
    const nav = useNavigate()
    const handleViewDetail = () => {
        nav(`/result/${id}`)
    }
    return (

        <>

            <Button type="primary" onClick={handleViewDetail}>Detail</Button>

        </>
    )
}
export default ViewDetailResultButton