import React, { ReactChild } from "react";
import { Router, RouteComponentProps } from "@reach/router";
import Base from "layouts/Base";
import Modules from "pages/Modules";
import Collections from "pages/Collections";
import Pages from "pages/Pages";
import Page from "pages/Page";
import NewPage from "pages/NewPage";
import NewModule from "pages/NewModule";
import Module from "pages/Module";
import Gallery from "pages/Gallery";
import NewCollection from "pages/NewCollection";
import Collection from "pages/Collection";
import CollectionInstanceList from "pages/CollectionInstanceList";
import NewCollectionInstance from "pages/NewCollectionInstance";
import CollectionInstance from "pages/CollectionInstance";
import Categories from "pages/Categories";

interface DashboardProps extends RouteComponentProps {
  children: ReactChild[];
}

const Dashboard = ({ children }: DashboardProps) => <>{children}</>;
const App = () => {
  return (
    <Base>
      <Router>
        <Dashboard path="dashboard">
          <NewPage path="new-page" />
          <Pages path="pages" />
          <Page path="pages/:page" />
          <CollectionInstanceList path="/:collection" />
          <NewCollectionInstance path="/:collection/new" />
          <CollectionInstance path="/:collection/:id" />
          <NewModule path="new-module" />
          <Modules path="modules" />
          <Module path="modules/:module" />
          <Collections path="collections" />
          <NewCollection path="new-collection" />
          <Collection path="collections/:collection" />
          <Gallery path="gallery" />
          <Categories path="categories" />
        </Dashboard>
      </Router>
    </Base>
  );
};

export default App;
