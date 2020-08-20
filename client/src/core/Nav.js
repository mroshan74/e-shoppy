import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const activeLink = (history, path) => {
    if(history.location.pathname === path){
        return {color: '#2ecc72'}
    }
    else{
        return {color: '#ffffff'}
    }
}

const Nav = ({history}) => (
    <div>
        <ul className="nav nav-tabs bg-dark">
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
            <li className="nav-item">
                <Link className="nav-link" style={activeLink(history, '/user/dashboard')} to='/user/dashboard'>
                    Dashboard
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={activeLink(history, '/admin/dashboard')} to='/admin/dashboard'>
                    Admin Dash
                </Link>
            </li>
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
        </ul>
    </div>
)

//export default Nav
export default withRouter(Nav)
