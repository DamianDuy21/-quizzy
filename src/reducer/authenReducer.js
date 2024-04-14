export const AuthenReducer = (state = false, action) => {
    switch (action.type) {
        case ("authen"):
            return action.value

    }
    return state
}