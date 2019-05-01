import { Marked } from "../../../node_modules/marked-ts/dist/marked";
import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import "./post.scss";

import { dateToISOStringWithoutMs } from "../../lib/utils";
import { NotFound } from "../404/404";
import { PostFilter, PostFilterProps } from "./filter";


export enum PostViewMode {
  FULL,
  SUMMARY,
}

export interface PostProps {
  title: string,
  illustration: string | null,
  created: string,
  edited: string,
  description: string,
  url: string,
  content: string,
  mode: PostViewMode
}

/**
 * Create a post title component
 * @param props Post properties
 */
export const PostTitle: React.FunctionComponent<PostProps> = props => {
  if (props.mode === PostViewMode.SUMMARY) {
    return (
      <h1 className="post-title">
        <Link to={props.url}>{props.title}</Link>
      </h1>
    )
  }
  else return <h1 className="post-title">{props.title}</h1>
}

/**
 * Create a post illustration component
 * @param props Post properties
 */
export const PostIllustration: React.FunctionComponent<PostProps> = props => {
  if (props.illustration) {
    let image = <img className="post-illustration" src={props.illustration} alt="Illustration"></img>;
    if (props.mode === PostViewMode.SUMMARY) {
      return (
        <div className="col-xs-12">
          <Link to={props.url}>{image}</Link>
        </div>
      );
    }
    else return (
      <div className="col-xs-12">
        {image}
      </div>
    );
  }

  return null;
}

/**
 * Create a post metadata component
 * @param props Post properties
 */
export const PostMeta: React.FunctionComponent<PostProps> = props => {
  return (
    <div className="row">
      <PostIllustration {...props} />
      <div className="col-xs-12">
        <span className="post-meta">
          C: {dateToISOStringWithoutMs(new Date(props.created))} |
          U: {dateToISOStringWithoutMs(new Date(props.edited))}
        </span>
      </div>
    </div>
  );
}

/**
 * Create a header component that contains title and metadata
 * @param props Post properties
 */
export const PostHeader: React.FunctionComponent<PostProps> = props => {
  return (
    <header className="post-header">
      <PostTitle {...props} />
      <PostMeta {...props} />
    </header>
  );
}

/**
 * Create a post description component that contains a short post
 * description or introduction
 * @param props
 */
export const PostDescription: React.FunctionComponent<PostProps> = props => {
  return <section className="post-description">{props.description}</section>;
}

/**
 * Create a post content component that contains the full post content
 * @param props Post properties
 */
export const PostContent: React.FunctionComponent<PostProps> = props => {
  return <main className="post-content"
    dangerouslySetInnerHTML={{ __html: Marked.parse(props.content) }}></main>;
}

/**
 * Create a post summary component containing title, metadata and short description
 * @param props PostSummary properties
 */
export const PostSummary: React.FunctionComponent<PostProps> = props => {
  return (
    <article className="post-summary">
      <PostHeader {...props} />
      <PostDescription {...props} />
    </article>
  );
}

/**
 * Create a full article component rendering the full content of a post
 * @param props Post properties
 */
export const Post: React.FunctionComponent<PostProps> = props => {
  return (
    <article className="post">
      <PostHeader {...props} />
      <PostDescription {...props} />
      <PostContent {...props} />
    </article>
  );
}

/**
 * Props for the front page post summary list
 */
export interface PostListProps {
  posts: PostProps[],
  filter: PostFilterProps,
}

/**
 * Renders a list of post summaries with title, image, metadata and description.
 * @param props An array of Post properties
 */
export const PostList: React.FunctionComponent<PostListProps> = props => {
  if (!props.posts.length && props.posts.length > 0) return <NotFound />

  const posts = props.posts.map((p, i) => {
    return (
      <div key={i} className="row">
        <div className="col-md-12">
          <PostSummary {...p} />
        </div>
      </div>
    );
  });

  return (
    <div>
      <PostFilter {...props.filter} />
      <div id="post-list">
        {posts}
      </div>
    </div>
  );
}
