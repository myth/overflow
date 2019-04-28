import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, RouteComponentProps, Link } from "react-router-dom";

import { NotFound } from "./components/404/404";
import { About } from "./components/about/about";
import { Header } from "./components/header/header";
import { PostList, Post, PostFilterParams } from "./components/post/post";
import { Footer } from "./components/footer/footer";
import { Api } from "./lib/api/api";
import { ApiPost } from "./lib/api/models";

// Stylesheet
import "./app.scss";

const api = new Api();

interface MainState {
  posts: ApiPost[],
}
interface MainProps {
  post?: ApiPost,
  posts?: ApiPost[],
}

class Main extends React.PureComponent<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);
    this.state = { posts: [] }
  }

  public componentDidMount() {
    api.fetch().then(() => {
      this.setState({ ...this.state, posts: api.posts });
    });
  }

  private generateRoutes() {
    return this.state.posts.map((p, i) => {
      const post = p.toPost();
      return (
        <Route key={i} exact path={post.url} component={() => <Post {...post} />} />
      );
    })
  }

  public render() {
    const postList = (match: RouteComponentProps<PostFilterParams>) => (
      <PostList posts={this.state.posts.map(p => p.toPostSummary())} {...match} />
    );

    // TODO: Clean up this mess
    return (
      <Switch>
        <Route exact path="/" component={postList} />
        <Route exact path="/blog/:year([0-9]{4})/" component={postList} />
        <Route exact path="/blog/:year([0-9]{4})/:month([0-9]{2})/" component={postList} />
        <Route exact path="/blog/:year([0-9]{4})/:month([0-9]{2})/:day([0-9]{2})/" component={postList} />
        {this.generateRoutes()}
        <Route component={NotFound} />
      </Switch>
    );
  }
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
    <App />
  </BrowserRouter>,
  document.getElementById("app"),
);
