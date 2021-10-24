import { Header } from "@/components";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Layout } from "@/layouts";
import { Home, Result } from "@/pages";

function App() {
  return (
    <BrowserRouter>
      <Layout.Default>
        <Header />

        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/result" exact>
            <Result />
          </Route>
        </Switch>
      </Layout.Default>
    </BrowserRouter>
  );
}

export default App;
