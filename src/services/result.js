import { collection, getDocs, limit, orderBy, query, where, doc, setDoc } from "firebase/firestore";
import db from "../firebase";
import { v4 as uuidv4 } from 'uuid';
const colRef = collection(db, "result")

export const getResultsByUserEmail = async (email) => {
    const q = await query(colRef, where("userEmail", "==", email))
    const res = await getDocs(q)
    let items = []
    res.forEach(item => {
        items.push(item.data())
    })
    return items
}
export const getResultById = async (id) => {
    const q = await query(colRef, where("id", "==", id))
    const res = await getDocs(q)
    let items = []
    res.forEach(item => {
        items.push(item.data())
    })
    return items
}
// export const checkUserSignUp = async (email) => {
//     const q = await query(colRef, where("email", "==", email))
//     const res = await getDocs(q)
//     let items = []
//     res.forEach(item => {
//         items.push(item.data())
//     })
//     return items
// }
export const addResult = async (obj) => {
    try {
        const res = await doc(colRef, uuidv4())
        const ress = await setDoc(res, obj)
        if (ress) {
            console.log(ress)
        }
    }
    catch (err) {
        alert(err)
    }
}
