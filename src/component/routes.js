import React from "react";
import { Route, Switch } from "react-router-dom";
import { GeneListPage, GeneViewPage, NotFound } from './component';

const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={GeneListPage} />
                <Route path="/gene-details" component={GeneViewPage} />
                <Route component={NotFound} />
            </Switch>
        </div>
    )
}

export default Routes;