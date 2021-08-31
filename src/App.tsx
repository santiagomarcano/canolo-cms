import React, { ReactChild } from "react";
import { Router, RouteComponentProps } from "@reach/router";
import Base from "layouts/Base";
import Modules from "pages/Modules";
import Pages from "pages/Pages";
import Page from "pages/Page";
import NewPage from "pages/NewPage";
import NewModule from "pages/NewModule";
import Module from "pages/Module";
import Gallery from "pages/Gallery";

interface DashboardProps extends RouteComponentProps {
  children: ReactChild[];
}

const Dashboard = ({ children, path }: DashboardProps) => <>{children}</>;
const App = () => {
  return (
    <Base>
      <Router>
        <Dashboard path="dashboard">
          <Pages path="pages" />
          <NewPage path="new-page" />
          <NewModule path="new-module" />
          <Modules path="modules" />
          <Module path="modules/:module" />
          <Page path="pages/:page" />
          <Gallery path="gallery" />
        </Dashboard>
      </Router>
    </Base>
  );
};

export default App;
