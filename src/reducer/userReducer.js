let init = {
    email: "",
    fullName: "",
    id: "",
    password: "",
    role: ""
}

export const UserReducer = (state = { init }, action) => {
    switch (action.type) {
        case ("login"):
            state = action.value
            return state
        case ("update"):
            state = action.value
            return state
    }
    return state
}