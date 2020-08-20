import axios from '../../config/axios'

export const startUserSignUp = (fd, regState) => {
  return () => {
    axios
      .post(`/users/register`, fd)
      .then((response) => {
        console.log(response.data)
        if (response.hasOwnProperty('errors')) {
            regState({
              ok: false,
              errors: 'Registration failed',
            })
        } else {
          regState({
            ok: true,
          })
        }
      })
      .catch((err) => {
        console.log(err,err.response,err.response.data)
        if(err.response.data.keyPattern.email){
          //console.log('email exists')
          regState({
            ok: false,
            errors: 'Email already registered',
          })
        }
        else{
          regState({
            ok: false,
            errors: 'Registration failed',
          })
        }
      })
  }
}

export const setUserData = (data) => {
  return { type: 'SET_USER', payload: data }
}

export const startUserSignIn = (fd, regState, redirect) => {
  return (dispatch) => {
    axios
      .post(`/users/login`, fd)
      .then((response) => {
        console.log(response.data)
        if (response.hasOwnProperty('errors')) {
          regState({
            ok: false,
            errors: 'Registration failed',
          })
      } else {
        let authToken = JSON.stringify(response.data)
        localStorage.setItem('authToken', authToken)
        dispatch(setUserData(response.data.user))
        regState({
          ok: true,
        })
        redirect()
      }
        //window.location.reload()
      })
      .catch((err) => {
        if(err.response.data.hasOwnProperty('errors')){
          //console.log('email exists')
          regState({
            ok: false,
            errors: err.response.data.message,
          })
        }
        else{
          regState({
            ok: false,
            errors: err.message,
          })
        }
      })
  }
}

export const clearUserData = () => {
  return { type: 'CLEAR_USER' }
}

export const startUserSignOut = (fd) => {
  return (dispatch) => {
    axios
      .get(`/users/signout`)
      .then((response) => {
        console.log(response.data)
        dispatch(clearUserData())
        localStorage.removeItem('authToken')
        window.location.href = '/'
      })
      .catch((err) => console.log(err))
  }
}
