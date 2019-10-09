
import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import Contact from './pages/contact';
import LendForm from './pages/lendForm';
import LendEdit from './pages/lendEdit';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/lend" component={LendForm} />
            <Route path="/lends/:id" component={LendEdit} />
            <Route path="/contacts/:id" component={Contact} />
        </Switch>
    </BrowserRouter>
);

export default Routes;