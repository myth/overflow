import * as React from "react";
import * as ReactDOM from "react-dom";

// Stylesheet
import "./app.scss";

import { createButton, ButtonType } from "./components/button/button";
import { Header } from "./components/header/header";
import { Post, PostProps, PostSummary, PostSummaryProps } from "./components/post/post";
import { Footer } from "./components/footer/footer";

const examplePostSummary: PostSummaryProps = {
  header: {
    title: "Example Post Title",
    meta: {
      created: "2018-09-13 21:17:00",
      edited: "2018-09-13 21:28:13",
    },
  },
  description: "Description",
}

const examplePost: PostProps = {
  ...examplePostSummary,
  content: "Example complete article content (markdown?)"
}

const Content = () => {
  return (
    <main id="content">
      <div className="bg-white padding-vertical-20"></div>
      <div className="bg-eerie padding-vertical-20"></div>
      <div className="bg-white padding-vertical-20"></div>
      <div className="bg-cerulean padding-vertical-20"></div>
      <div className="bg-white padding-vertical-20"></div>
      <div className="bg-teal padding-vertical-20"></div>
      <div className="bg-white padding-vertical-20"></div>
      <div className="bg-olivine padding-vertical-20"></div>
      <div className="bg-white padding-vertical-20"></div>
      <div className="bg-tangerine padding-vertical-20"></div>
      <div className="bg-white padding-vertical-20"></div>
    </main>
  );
}

ReactDOM.render(
  <div id="container">
    <Header></Header>
    <Content></Content>
    <Footer></Footer>
  </div>,
  document.getElementById("app")
);
