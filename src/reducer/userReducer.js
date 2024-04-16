
let init = {
    email: "",
    fullName: "",
    id: "",
    password: "",
    role: ""
}

export const UserReducer = (state = {}, action) => {
    switch (action.type) {
        case ("login"):
            if (action.value.email) {
                init.email = action.value.email
            }
            if (action.value.fullName) {
                init.fullName = action.value.fullName
            }
            if (action.value.id) {
                init.id = action.value.id
            }
            if (action.value.password) {
                init.password = action.value.password
            }
            if (action.value.role) {
                init.role = action.value.role
            }
            return init
        case ("update"):
            if (action.value.email) {
                init.email = action.value.email
            }
            if (action.value.fullName) {
                init.fullName = action.value.fullName
            }
            if (action.value.id) {
                init.id = action.value.id
            }
            if (action.value.password) {
                init.password = action.value.password
            }
            if (action.value.role) {
                init.role = action.value.role
            }
            return init
    }
    return init
}