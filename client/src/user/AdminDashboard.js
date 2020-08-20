import React from 'react'
import { Link } from 'react-router-dom'
import { isUser } from '../auth/isAuth'

function AdminDashboard() {
    const leftSide = () => {
        return (
            <div className="card m-2 text-center w-75">
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to='/admin/create/category' className="nav-link text-success">Create category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to='/admin/create/product' className="nav-link text-success">Create Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to='/admin/products' className="nav-link text-success">Manage Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to='/admin/orders' className="nav-link text-success">Manage Orders</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const rightSide = () => {
        const { fullName , email } = isUser()
        return(
            <div className="card m-2 mb-4 w-75">
                <h4 className="card-header">Admin Info</h4>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <span className="badge badge-success mr-2">Name:</span> {fullName}
                        </li>
                        <li className="list-group-item">
                            <span className="badge badge-success mr-2">Email:</span> {email}
                        </li>
                        <li className="list-group-item">
                            <span className="badge badge-danger mr-2">Admin Access</span> 
                        </li>
                    </ul>
            </div>
        )
    }
    return (
        <div>
            <h1 className="text-center m-3">Admin Dashboard</h1>
            <div className="row m-0">
                <div className="col-3">
                    {leftSide()}
                </div>
                <div className="col-9">
                    {rightSide()}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
