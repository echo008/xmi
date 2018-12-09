import React from 'react'
import { HashRouter as Router, Switch } from 'react-router-dom'
import { Provider } from 'mobx-react'

import * as stores from './stores'
import routes from './router'
import { generateRoutes } from './plugins/router'

const App = () => (
    <Provider {...stores}>
        <Router>
            <Switch>{ generateRoutes(routes) }</Switch>
        </Router>
    </Provider>
)

export default App
