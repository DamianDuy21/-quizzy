import { collection, getDocs, limit, orderBy, query, where, doc, setDoc, updateDoc } from "firebase/firestore";
import db from "../firebase";
import { v4 as uuidv4 } from 'uuid';
const colRef = collection(db, "users")

export const getUserLogin = async (email, password) => {
    const q = await query(colRef, where("email", "==", email), where("password", "==", password))
    const res = await getDocs(q)
    let items = []
    res.forEach(item => {
        items.push(item.data())
    })
    return items
}
export const getTester = async () => {
    const q = await query(colRef, where("email", "==", "tester@gmail.com"), where("password", "==", "123456"))
    const res = await getDocs(q)
    let items = []
    res.forEach(item => {
        items.push(item.data())
    })
    return items
}
export const getUserById = async (id) => {
    const q = await query(colRef, where("id", "==", id))
    const res = await getDocs(q)
    let items = []
    res.forEach(item => {
        items.push(item.data())
    })
    return items
}
export const checkUserSignUp = async (email) => {
    const q = await query(colRef, where("email", "==", email))
    const res = await getDocs(q)
    let items = []
    res.forEach(item => {
        items.push(item.data())
    })
    return items
}
export const addUser = async (obj) => {
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
export const updateUser = async (id, obj) => {
    try {
        const docReff = await doc(db, "users", id)
        const res = await updateDoc(docReff, obj)
        if (res) {
            return res
        }
    }
    catch (err) {
        alert(err)
    }
}
