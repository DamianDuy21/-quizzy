import "./styles.css"
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getResultById } from "../../services/result";
import { Button, Divider, Form, Radio, Space } from "antd";
import { getQuestionsById, getQuestionsByTopicId } from "../../services/questions";
import { getTopicIdByTopicId } from "../../services/topics";

const Result = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
    const nav = useNavigate()
    const resultId = useParams();
    const [result, setResult] = useState([]); // Initialize result as an empty array
    const [isLoading, setIsLoading] = useState(false); // Initialize isLoading with a default value
    const [mark, setMark] = useState(0);
    const [topicName, setTopicName] = useState("")
    var point = 0;
    var total = 0;

    const fetchData = async () => {
        try {
            setIsLoading(true)
            const res = await getResultById(resultId.resultId);
            const ress2 = await getTopicIdByTopicId(res[0].topicId)
            setTopicName(ress2[0].name)
            let res2 = [];
            const tmp = res[0].userAnswers;
            for (let i = 0; i < tmp.length; i++) {
                total += 1;
                {
                    const q = await getQuestionsById(tmp[i].id)
                    if (tmp[i] && q[0].correctAnswer == tmp[i].userAnswer) {
                        point += 1;
                    }
                    const obj = {
                        id: q[0].id,
                        topicId: q[0].topicId,
                        question: q[0].question,
                        answers: q[0].answers,
                        correctAnswer: q[0].correctAnswer,
                        userAnswer: tmp[i].userAnswer,
                    };
                    res2.push(obj);
                }
            }

            res2.sort((a, b) => (parseInt(a.id) > parseInt(b.id)) ? 1 : ((parseInt(b.id) > parseInt(a.id)) ? -1 : 0));
            setResult(res2);
            setMark(parseFloat((point / total) * 10).toFixed(1));
            setIsLoading(false)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleRequiz = () => {
        nav(`/quiz/${topicName}`)
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <div className="q-wrapper title-small" style={{ padding: "16px", marginBottom: "16px" }}>
                Point: {mark}/10
            </div>
            <Divider></Divider>
            <Form>
                {result.map((item, itemIndex) => (
                    <Form.Item key={itemIndex} name={item.id}>
                        <div className="q-wrapper">
                            <span className="body-medium q_title" style={{ marginBottom: "12px" }}>{itemIndex + 1}. {item.question}</span>
                            <div className="answers">
                                <Radio.Group value={parseInt(item.userAnswer)}>
                                    <Space direction="vertical" className="answer">
                                        {item.answers.map((answer, indexAnswer) => (
                                            <Radio
                                                className={(item.correctAnswer == indexAnswer)
                                                    ? "correctAnswer "
                                                    : ((item.userAnswer == indexAnswer)
                                                        ? "incorrectAnswer" : "")
                                                }
                                                value={indexAnswer}>{answer}</Radio>
                                        ))}
                                    </Space>
                                </Radio.Group>
                            </div>
                        </div>
                    </Form.Item>
                ))}
                <div style={{ display: "flex", justifyContent: "start", padding: "16px 0 8px 0" }}>
                    <Button loading={isLoading} type="primary" onClick={handleRequiz}>Re-quiz</Button>
                </div>
            </Form>
        </>
    );
};

export default Result;
