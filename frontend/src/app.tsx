import * as React from "react";
import * as ReactDOM from "react-dom";

// Stylesheet
import "./app.scss";

import { Api, Endpoint } from "./lib/api/client";
import { Post as PostObject } from "./lib/api/models";
import { About } from "./components/about/about";
import { Header } from "./components/header/header";
import { Post, PostProps } from "./components/post/post";
import { Footer } from "./components/footer/footer";

const api = new Api("http://localhost:8000/api");
const endpoint = new Endpoint<PostObject>(api, "/posts/");

interface AppProps { }
interface AppState {
  posts: PostObject[];
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = { posts: [] };
  }

  public updatePosts(postList: PostObject[]) {
    console.log('updatePosts called');
    this.setState({ ...this.state, posts: postList });
  }

  public componentDidMount() {
    console.log('componentDidMount');
    endpoint.getAll().then(postList => {
      this.updatePosts(postList);
    });
  }

  public componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  public render() {
    console.log('render called');
    return (
      <div id="root">
        <Header></Header>
        <Content {...{ posts: this.state.posts }}></Content>
        <Footer></Footer>
      </div >
    );
  }
}

interface PostListProps {
  posts: PostObject[]
}

const Content: React.SFC<PostListProps> = props => {
  let postList = props.posts.map((p, i) => {
    const postProps: PostProps = {
      header: {
        title: p.title,
        meta: {
          created: p.published,
          edited: p.edited,
        },
      },
      description: p.description,
      content: p.content
    }
    return (
      <div key={i} className="col-xs-12 col-md-8 col-lg-8">
        <Post {...postProps}></Post>
      </div>
    );
  });

  return (
    <main id="content">
      <section className="margin-bottom-50">
        <div className="row around-xs">
          {postList}
          <div className="col-xs-12 col-md-4 col-lg-4 first-xs last-md">
            <About></About>
          </div>
        </div>
      </section>
    </main>
  );
}

ReactDOM.render(
  <App></App>,
  document.getElementById("app"),
);
