import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { startUserSignUp } from '../store/actions/userActions'

const SignUp = (props) => {
    const [values, setValues] = useState({
        fullName: '',
        email: '',
        password: '',
        errors: '',
        ok: false
    })
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const { fullName, email, password } = values
        const fd = {
            fullName, email, password
        }

        console.log(fd)
        const regState = (res) => {
            if(res.ok){
                setValues({
                    ...values,
                    ok: res.ok,
                    fullName: '',
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
        props.dispatch(startUserSignUp(fd,regState))
    }

    const signUpForm = () => (
        <div className="row m-0">
                <div className="col-md-6 offset-sm-3 mt-5 text-left">
                    <h3 className="text-center">Sign Up</h3>
                    <div className="alert alert-success" style={{display: values.ok ? '': 'none'}}>
                        Registered successfully. Please <Link to='/user/signin'>sign-in</Link> here.
                    </div>
                    <div className="alert alert-danger" style={{display: values.errors ? '': 'none'}}>
                        {values.errors}
                    </div>
                    <form className="mt-3" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="fullName" className="text-grey">Full name</label>
                            <input
                                name="fullName"
                                className="form-control" 
                                type="text" 
                                id="fullName"
                                onChange={handleChange}
                                value={values.fullName}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="text-grey">Email</label>
                            <input
                                name="email"
                                className="form-control" 
                                type="email" 
                                id="email"
                                onChange={handleChange}
                                value={values.email}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="text-grey">Password</label>
                            <input
                                name="password"
                                className="form-control" 
                                type="password" 
                                id="password"
                                onChange={handleChange}
                                value={values.password}
                            />
                        </div>
                        <button className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
    )
    return (
        <Fragment>
            {signUpForm()}
        </Fragment>
    )
}

export default connect()(SignUp)
