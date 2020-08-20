import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { startUserSignIn } from '../store/actions/userActions'
import { isAdmin } from '../auth/isAuth'

const SignIn = (props) => {
    const history = useHistory()
    const [values, setValues] = useState({
        email: 'test000@gmail.com',
        password: 'secret123',
        errors: '',
        ok: false,
        loading: false
    })
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]:e.target.value,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const { email, password } = values
        const fd = {
            email, password
        }
        const redirect = () => {
            if(isAdmin()){
                history.push('/admin/dashboard')
            }
            else{
                history.push('/user/dashboard')
            }
        }
        console.log(fd)
        const regState = (res) => {
            if(res.ok){
                setValues({
                    ...values,
                    ok: res.ok,
                    email: '',
                    password: '',
                    errors: ''
                })
            }
            else {
                setValues({
                    ...values,
                    ok: res.ok,
                    errors: res.errors
                })
            }
        }
        props.dispatch(startUserSignIn(fd,regState,redirect))
    }

    const signInForm = () => {
        return (
            <div className="row m-0">
                <div className="col-md-6 offset-sm-3 mt-5 text-left">
                    <h3 className="text-center">Sign in</h3>
                    <form className="mt-3" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email" className="text-grey">Email</label>
                            <input 
                                className="form-control" 
                                type="text" 
                                id="email"
                                name="email"
                                onChange={handleChange}
                                value={values.email}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="text-grey">Password</label>
                            <input 
                                className="form-control" 
                                type="password" 
                                id="password"
                                name="password"
                                onChange={handleChange}
                                value={values.password}
                            />
                        </div>
                        <button type="submit" className="btn btn-success btn-block">Sign in</button>
                    </form>
                </div>
            </div>
        )
    }
    return (
        <div>
            {signInForm()}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(SignIn)
