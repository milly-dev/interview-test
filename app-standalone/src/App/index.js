import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './app.css';

import AppHeader from './components/AppHeader/index.js';
import Game from './components/Game';

const App = () => (
    <Router>
        <div className="AppContainer">
            <AppHeader className="app-header"/>
            <Switch>
                <Route path="/" exact component={Game}/>
            </Switch>
        </div>
    </Router>
);

export default App;