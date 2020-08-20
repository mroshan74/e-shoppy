import axios from '../../config/axios'

export const startUserSignUp = (fd, regState, redirect) => {
  return () => {
    axios
      .post(`/users/register`, fd)
      .then((response) => {
        if (response.hasOwnProperty('keyPattern')) {
          if (response.keyPattern.email === 1) {
            regState({
              ok: false,
              errors: 'email already exists',
            })
          }
        } else {
          alert('Successfully registered')
          regState({
            ok: true,
          })
          redirect()
        }
      })
      .catch((err) => console.log(err))
  }
}

export const setUserData = (data) => {
  return { type: 'SET_USER', payload: data }
}

export const startUserSignIn = (fd, redirect) => {
  return (dispatch) => {
    axios
      .post(`/users/login`, fd)
      .then((response) => {
        console.log(response.data)
        let authToken = response.data.token
        localStorage.setItem('token', authToken)
        dispatch(setUserData(response.data.user))
        redirect()
        window.location.reload()
      })
      .catch((err) => console.log(err))
  }
}

export const clearUserData = () => {
  return { type: 'CLEAR_USER ' }
}

export const startUserSignOut = (fd) => {
  return (dispatch) => {
    axios
      .get(`/users/signout`)
      .then((response) => {
        console.log(response.data)
        dispatch(clearUserData())
        localStorage.removeItem('token')
        window.location.href = '/'
      })
      .catch((err) => console.log(err))
  }
}
