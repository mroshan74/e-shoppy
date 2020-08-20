export const isSignedIn = () => {
    if(typeof window == 'undefined'){
        return false
    }
    else{
        const getToken = JSON.parse(localStorage.getItem('authToken'))?.token
        if(getToken){
            return true
        }
        else{
            return false
    }
    }
}

export const isAdmin = () => {
    if(typeof window == 'undefined'){
        return false
    }
    else {
        const getUser = JSON.parse(localStorage.getItem('authToken'))?.user
        if(getUser?.role === 1){
            return true
        }
        else{
            return false
        }
    }
}

export const isUser = () => {
    if(typeof window == 'undefined'){
        return false
    }
    else {
        const getUser = JSON.parse(localStorage.getItem('authToken'))?.user
        if(getUser){
            return getUser
        }
        else{
            return false
        }
    }
}