import React, { ReactChild, useState } from "react";
import { Router, RouteComponentProps, navigate, Redirect } from "@reach/router";
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
import Login from "pages/Login";
import useAuth from "hooks/useAuth";
import { auth } from "utils/firebase";
import { useEffect } from "react";
import { CircularProgress, Container, Flex, Text } from "@chakra-ui/react";
import { $t } from "store/TranslationsContext";
import { FiEyeOff } from "react-icons/fi";
import NotFound from "pages/NotFound";

interface DashboardProps extends RouteComponentProps {
  children: ReactChild[] | ReactChild;
}

const Dashboard = ({ children, navigate }: DashboardProps) => <>{children}</>;

const PrivateDashboard = ({
  children,
  path,
}: {
  children: ReactChild[];
  path: string;
}) => {
  const [user, loading] = useAuth({ auth, deps: [] });
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    } else if (path === "dashboard") {
      navigate("/dashboard/pages");
    }
  }, [user, loading]);
  if (user && !loading) {
    return <Dashboard path={path}>{children}</Dashboard>;
  }
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      width="100vw"
      height="100vh"
    >
      <CircularProgress isIndeterminate />
    </Flex>
  );
};

const App = () => {
  useEffect(() => {
    document.title = process.env.REACT_APP_TITLE || "";
  }, []);
  return (
    <Base>
      <Router>
        <NotFound default />
        <PrivateDashboard path="dashboard">
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
        </PrivateDashboard>
        <Login path="/" />
      </Router>
    </Base>
  );
};

export default App;
