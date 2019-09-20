const login = (loginResponse) => {
    return {
        type: 'LOG_IN',
        payload: loginResponse
    }
}

const autologin = (autologinResponse) => {
    return {
        type: 'AUTOLOGIN',
        payload: autologinResponse
    }
}

const signup = (signupResponse) => {
    return {
        type: 'SIGN_UP',
        payload: signupResponse
    }
}

const fetchItems = (signupResponse) => {
    return {
        type: 'FETCH_ITEMS',
        payload: signupResponse
    }
}

const fetchUsers = (userResponse) => {
    return {
        type: 'FETCH_USERS',
        payload: userResponse
    }
}



export {login, autologin, signup, fetchItems, fetchUsers}