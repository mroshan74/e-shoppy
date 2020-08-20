import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Base from './core/Base'
import Home from './core/Home'
import SignUp from './user/SignUp'

function Routes() {
    return (
        <BrowserRouter>
            <Base/>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/user/signup' exact component={SignUp} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
