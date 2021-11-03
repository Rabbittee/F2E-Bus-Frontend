import { Header, MapFigure } from "@/components";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Layout } from "@/layouts";
import { Home, Result, Stations } from "@/pages";

function App() {
  return (
    <BrowserRouter>
      <Layout.Default>
        <Header />
        <MapFigure />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/result">
            <Result />
          </Route>
          <Route path="/stations">
            <Stations />
          </Route>
        </Switch>
      </Layout.Default>
    </BrowserRouter>
  );
}

export default App;
