import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, RouteComponentProps } from "react-router-dom";

// Stylesheet
import "./app.scss";

import { NotFound } from "./components/404/404";
import { About } from "./components/about/about";
import { Blog, BlogRouteParams } from "./components/blog/blog";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { Api } from "./lib/api/api";
import { ScrollToTop } from "./lib/scroll";


const api = new Api();

interface MainProps { }

const Main: React.FunctionComponent<MainProps> = props => {
  const blog = (route: RouteComponentProps<BlogRouteParams>) => (
    <Blog api={api} filters={{ ...route }} />
  );

  return (
    <Switch>
      <Route exact path="/" component={blog} />
      <Route exact path="/blog/" component={blog} />
      <Route exact path="/blog/:year([0-9]{4})/" component={blog} />
      <Route exact path="/blog/:year([0-9]{4})/:month([0-9]{2})/" component={blog} />
      <Route exact path="/blog/:year([0-9]{4})/:month([0-9]{2})/:day([0-9]{2})/" component={blog} />
      <Route exact path="/blog/:year([0-9]{4})/:month([0-9]{2})/:day([0-9]{2})/:slug([a-zA-Z0-9_\-]+)" component={blog} />
      <Route exact path="/blog/tag/:tag([a-zA-Z0-9_\-.]+)/" component={blog} />
      <Route exact path="/blog/tag/" component={blog} />
      <Route component={NotFound} />
    </Switch>
  );
}

const Content: React.FunctionComponent = () => {
  return (
    <main id="content">
      <section className="margin-bottom-50">
        <div className="row around-xs">
          <div className="col-xs-12 col-md-8 col-lg-8">
            <Main />
          </div>
          <div className="col-xs-12 col-md-4 col-lg-4 last-xs last-md">
            <About />
          </div>
        </div>
      </section>
    </main>
  );
}

const App: React.FunctionComponent = () => {
  return (
    <div id="root">
      <Header />
      <Content />
      <Footer />
    </div >
  );
}

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop>
      <App />
    </ScrollToTop>
  </BrowserRouter>,
  document.getElementById("app"),
);
