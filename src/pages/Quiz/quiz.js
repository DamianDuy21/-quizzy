import "./styles.css"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getTopicIdByTopicName } from "../../services/topics"
import { getQuestionsByTopicId } from "../../services/questions"
import { Button, Divider, Form, Radio, Space } from "antd"
import { addResult } from "../../services/result"
import { v4 as uuidv4 } from 'uuid';
import { getCookie } from "../../helper/cookies"
const Quiz = () => {
    const topicName = useParams()
    const [q, setQ] = useState([])
    const [topicId, setTopicId] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const nav = useNavigate()
    const fetchQuestionsByTopicId = async () => {
        const res = await getTopicIdByTopicName(topicName.topicName)
        setTopicId(res[0].id)
        const res2 = await getQuestionsByTopicId(parseInt(res[0].id))
        res2.sort((a, b) => (parseInt(a.id) > parseInt(b.id)) ? 1 : ((parseInt(b.id) > parseInt(a.id)) ? -1 : 0));
        await setQ(res2)
    }
    const onFinish = async (e) => {
        setIsLoading(true)
        const arr = Object.entries(e)
        let ans = []
        arr.forEach(item => {
            if (item[1] === undefined) {
                ans.push({ id: item[0], userAnswer: '-1' })
            }
            else {
                ans.push({ id: item[0], userAnswer: item[1] })
            }
        })
        // console.log(ans)
        const userEmail = getCookie("email")
        const obj = {
            id: uuidv4(),
            userAnswers: ans,
            topicId: topicId,
            userEmail: userEmail,
            topicName: topicName.topicName,
            createdAt: Date.now(),

        }
        const res = await addResult(obj)
        setIsLoading(false)
        nav(`/result/${obj.id}`)
    };

    useEffect(() => {
        fetchQuestionsByTopicId()
    }, [])
    return (<>
        <div className="q-wrapper title-small" style={{ padding: "16px", marginBottom: "16px" }}>
            {topicName.topicName}
        </div>
        <Divider></Divider>
        <Form onFinish={onFinish}>
            {q.map((item, itemIndex) => (
                <Form.Item key={itemIndex} name={item.id}>
                    <div className="q-wrapper">
                        <span className="body-medium q_title" style={{ marginBottom: "12px" }}>{itemIndex + 1}. {item.question}</span>
                        <div className="answers">
                            <Radio.Group >
                                <Space direction="vertical" className="answer">
                                    {item.answers.map((ans, index) => (
                                        <Radio value={index}>{ans}</Radio>
                                    ))}
                                </Space>
                            </Radio.Group>
                        </div>
                    </div>
                </Form.Item>

            ))}
            <div style={{ display: "flex", justifyContent: "start", padding: "16px 0 8px 0" }}>
                <Button loading={isLoading} type="primary" htmlType="submit">Submit</Button>
            </div>

        </Form>
    </>)
}
export default Quiz