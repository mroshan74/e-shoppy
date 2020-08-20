import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import AdminRoute from './auth/AdminRoute'
import PrivateRoute from './auth/PrivateRoute'

import Footer from './core/Footer'
import Nav from './core/Nav'
//import Base from './core/Base'
import Home from './core/Home'
import SignUp from './user/SignUp'
import SignIn from './user/SignIn'
import UserDashboard from './user/UserDashboard'
import AdminDashboard from './user/AdminDashboard'

function App() {
    return (
        <BrowserRouter>
            <Nav/>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/user/signup' exact component={SignUp} />
                <Route path='/user/signIn' exact component={SignIn} />
                <PrivateRoute path='/user/dashboard' exact component={UserDashboard}/>
                <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
            </Switch>
            <Footer />
        </BrowserRouter>
    )
}

export default App
