const login = (loginResponse) => {
    return {
        type: 'LOG_IN',
        payload: loginResponse
    }
}

const autologin = (userResponse) => {
    return {
        type: 'AUTOLOGIN',
        payload: userResponse
    }
}


export {login, autologin}