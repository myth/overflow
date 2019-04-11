import * as React from "react";
import * as ReactDOM from "react-dom";

// Stylesheet
import "./app.scss";

import { About } from "./components/about/about";
import { createButton, ButtonType } from "./components/button/button";
import { Header } from "./components/header/header";
import { Post, PostProps, PostSummary, PostSummaryProps } from "./components/post/post";
import { Footer } from "./components/footer/footer";

const examplePostSummary: PostSummaryProps = {
  header: {
    title: "Test Post",
    meta: {
      created: "2019-04-11 23:56:00",
      edited: "2018-04-12 00:28:13",
    },
  },
  description: "Finally started refurbishing ye ole website...",
}

const examplePost: PostProps = {
  ...examplePostSummary,
  content: "Maybe add some markdown support for the content section. Yes, let's do that."
}

const Content = () => {
  return (
    <main id="content">
      <section className="margin-bottom-50">
        <div className="row around-xs">
          <div className="col-xs-12 col-md-8 col-lg-8">
            <Post {...examplePost}></Post>
          </div>
          <div className="col-xs-12 col-md-4 col-lg-4 first-xs last-md">
            <About></About>
          </div>
        </div>
      </section>
    </main>
  );
}

ReactDOM.render(
  <div id="root">
    <Header></Header>
    <Content></Content>
    <Footer></Footer>
  </div>,
  document.getElementById("app")
);
