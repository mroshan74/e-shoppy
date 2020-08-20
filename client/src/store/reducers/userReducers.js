const initialUserState = {}

const userReducers = ( state = initialUserState, action ) => {
    switch(action.type){
        case 'SET_USER': {
            return state = action.payload
        }
        case 'CLEAR_USER': {
            return state = {}
        }
        default: {
            return state
        }
    }
}

export default userReducers