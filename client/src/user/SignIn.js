import React from 'react'

const SignIn = () => {
    const signInForm = () => {
        return (
            <div className="row m-0">
                <div className="col-md-6 offset-sm-3 mt-5 text-left">
                    <h3 className="text-center">Sign in</h3>
                    <form className="mt-3">
                        <div className="form-group">
                            <label htmlFor="email" className="text-grey">Email</label>
                            <input 
                                className="form-control" 
                                type="text" 
                                id="email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="text-grey">Password</label>
                            <input className="form-control" type="password" id="password"/>
                        </div>
                        <button className="btn btn-success btn-block">Sign in</button>
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

export default SignIn
