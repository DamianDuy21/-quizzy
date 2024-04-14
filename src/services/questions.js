import { collection, getDocs, limit, orderBy, query, where, doc, setDoc } from "firebase/firestore";
import db from "../firebase";
import { v4 as uuidv4 } from 'uuid';
const colRef = collection(db, "questions")

export const getQuestionsByTopicId = async (topicId) => {
    const q = await query(colRef, where("topicId", "==", topicId))
    const res = await getDocs(q)
    let items = []
    res.forEach(item => {
        items.push(item.data())
    })
    return items
}
