import { collection, getDocs, limit, orderBy, query, where, doc, setDoc, updateDoc } from "firebase/firestore";
import db from "../firebase";
import { v4 as uuidv4 } from 'uuid';
const colRef = collection(db, "topic")

export const getTopics = async () => {
    const res = await getDocs(colRef)
    let items = []
    res.forEach(item => {
        items.push(item.data())
    })
    return items
}
export const getTopicIdByTopicName = async (topicName) => {
    const q = await query(colRef, where("name", "==", topicName))
    const res = await getDocs(q)
    let items = []
    res.forEach(item => {
        items.push(item.data())
    })
    return items
}
export const getTopicIdByTopicId = async (topicId) => {
    const q = await query(colRef, where("id", "==", topicId))
    const res = await getDocs(q)
    let items = []
    res.forEach(item => {
        items.push(item.data())
    })
    return items
}
export const updateTopic = async (id, obj) => {
    try {
        const docReff = await doc(db, "topic", id)
        const res = await updateDoc(docReff, obj)
        if (res) {
            return res
        }
    }
    catch (err) {
        alert(err)
    }
}

