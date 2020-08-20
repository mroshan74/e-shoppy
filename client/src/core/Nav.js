import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isSignedIn, isAdmin } from '../auth/isAuth'
import { startUserSignOut } from '../store/actions/userActions'

const activeLink = (history, path) => {
    if(history.location.pathname === path){
        return {color: '#2ecc72'}
    }
    else{
        return {color: '#ffffff'}
    }
}

const Nav = ({history, dispatch}) => {

    const handleLogout = () => {
        dispatch(startUserSignOut())
    }

    return(
    <div>
        <ul className="nav nav-tabs bg-dark align-right">
            <li className="nav-item">
                <Link style={activeLink(history, '/')} className="nav-link" to='/'>
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={activeLink(history, '/cart')} to='/cart'>
                    Cart
                </Link>
            </li>
            { isAdmin() ? (
                <li className="nav-item">
                    <Link className="nav-link" style={activeLink(history, '/admin/dashboard')} to='/admin/dashboard'>
                        Admin Dashboard
                    </Link>
                </li>
            ) : isSignedIn() && (
                <li className="nav-item">
                    <Link className="nav-link" style={activeLink(history, '/user/dashboard')} to='/user/dashboard'>
                        Dashboard
                    </Link>
            </li>
            )}
            { !isSignedIn() && 
                <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" style={activeLink(history, '/user/signup')} to='/user/signup'>
                            Sign up
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={activeLink(history, '/user/signin')} to='/user/signin'>
                            Sign In
                        </Link>
                    </li>
                </Fragment>
            }
            { isSignedIn() && 
                <li className="nav-item">
                    <Link 
                        className="nav-link" 
                        style={activeLink(history, '/user/signin')} 
                        to='#'
                        onClick={handleLogout}
                    >
                        Sign out
                    </Link>
                </li>
            }
        </ul>
    </div>
)}

//export default Nav
export default connect()(withRouter(Nav))
