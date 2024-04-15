import { collection, getDocs, query, where, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import db from "../firebase";
import { v4 as uuidv4 } from 'uuid';
const colRef = collection(db, "users")

export const getUsers = async () => {
    const res = await getDocs(colRef)
    let items = []
    res.forEach(item => {
        items.push(item.data())
    })
    return items
}
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
    const q = await query(colRef, where("email", "==", "tester"))
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
export const getUserByEmail = async (email) => {
    const q = await query(colRef, where("email", "==", email))
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
        const res = await doc(colRef, obj.id)
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
export const deleteUser = async (id) => {
    try {
        const docRef = doc(db, "users", id);
        const res = await deleteDoc(docRef);
        if (res) {
            return res
        }
    } catch (err) {
        alert(err)
    }
}
