import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Pokedex from './pages/Pokedex'
import Detail from './pages/Detail'

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Pokedex} path='/' exact/>
            <Route component={Detail} path='/:id' />
        </BrowserRouter>
    )
}

export default Routes