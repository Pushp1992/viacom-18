import React from 'react';
import PageNotFound from './NotFound/PageNotFound';
import ViewPage from './ViewPage/viewPage';
import GeneList from './GeneList/list';

const GeneListPage = () => {
    return <GeneList />
}

const GeneViewPage = () => {
    return <ViewPage />
}

const NotFound = () => {
    return <PageNotFound />
}

export { GeneListPage, GeneViewPage, NotFound }