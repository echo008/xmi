import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { renderRouter } from 'xmi-router'

import * as stores from './stores'
import routes from './router'

const App = () => (
    <Provider {...stores}>
        <Router>
            { renderRouter(routes) }
        </Router>
    </Provider>
)

export default App
