import { collection, getDocs, limit, orderBy, query, where, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
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

export const getQuestionsById = async (id) => {
    const q = await query(colRef, where("id", "==", id))
    const res = await getDocs(q)
    let items = []
    res.forEach(item => {
        items.push(item.data())
    })
    return items
}
export const updateQuestion = async (id, obj) => {
    try {
        const docReff = await doc(db, "questions", id)
        const res = await updateDoc(docReff, obj)
        if (res) {
            return res
        }
    }
    catch (err) {
        alert(err)
    }
}
export const deleteQuestion = async (id) => {
    try {
        const docRef = doc(db, "questions", id);
        const res = await deleteDoc(docRef);
        if (res) {
            return res
        }
    } catch (err) {
        alert(err)
    }
}