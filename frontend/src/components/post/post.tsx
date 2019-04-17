import { Marked } from "../../../node_modules/marked-ts/dist/marked";
import * as React from "react";
import { Link } from "react-router-dom";

import { dateToISOStringWithoutMs } from "../../lib/utils";

import "./post.scss";

/**
 * PostTitle properties
 */
export interface PostTitleProps {
  title: string;
  slug?: string;
}

/**
 * Create a post title component
 * @param props PostTitle properties
 */
export const PostTitle: React.SFC<PostTitleProps> = props => {
  if (props.slug) {
    return (
      <h1 className="post-title">
        <Link to={`/blog/${props.slug}`}>{props.title}</Link>
      </h1>
    )
  }
  else return <h1 className="post-title">{props.title}</h1>
}

/**
 * A props object containing the creation date, last edited timestamp and optional
 * illustration used to represent a blog post.
 */
export interface PostMetaProps {
  created: string;
  edited: string;
  illustration: string | null;
}

/**
 * Create a post metadata component
 * @param props PostMeta properties
 */
export const PostMeta: React.SFC<PostMetaProps> = props => {
  const illustration = props.illustration !== null && props.illustration !== "" ? (
    <div className="col-xs-12">
      <img className="post-illustration" src={props.illustration} alt="Illustration"></img>
    </div>
  ) : null;

  return (
    <div className="row">
      {illustration}
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
 * PostHeader properties
 */
export interface PostHeaderProps {
  title: string;
  slug?: string;
  meta: PostMetaProps;
}

/**
 * Create a header component that contains title and metadata
 * @param props PostHeader properties
 */
export const PostHeader: React.SFC<PostHeaderProps> = props => {
  return (
    <header className="post-header">
      <PostTitle title={props.title} slug={props.slug} />
      <PostMeta {...props.meta} />
    </header>
  );
}

/**
 * PostDescription properties
 */
export interface PostDescriptionProps {
  description: string;
}

/**
 * Create a post description component that contains a short post
 * description or introduction
 * @param props
 */
export const PostDescription: React.SFC<PostDescriptionProps> = props => {
  return <section className="post-description">{props.description}</section>;
}

/**
 * PostContent properties
 */
export interface PostContentProps {
  content: string;
}

/**
 * Create a post content component that contains the full post content
 * @param props PostContent properties
 */
export const PostContent: React.SFC<PostContentProps> = props => {
  return <main className="post-content"
    dangerouslySetInnerHTML={{ __html: Marked.parse(props.content) }}></main>;
}

/**
 * PostSummary properties
 */
export interface PostSummaryProps {
  header: PostHeaderProps;
  description: string;
}

/**
 * Create a post summary component containing title, metadata and short description
 * @param props PostSummary properties
 */
export const PostSummary: React.SFC<PostSummaryProps> = props => {
  return (
    <article className="post-summary">
      <PostHeader {...props.header} />
      <PostDescription description={props.description} />
    </article>
  );
}

/**
 * Post properties
 */
export interface PostProps {
  header: PostHeaderProps;
  description: string;
  content: string;
}

/**
 * Create a full article component rendering the full content of a post
 * @param props Post properties
 */
export const Post: React.SFC<PostProps> = props => {
  return (
    <article className="post">
      <PostHeader {...props.header} />
      <PostDescription description={props.description} />
      <PostContent content={props.content} />
    </article>
  );
}

/**
 * Wrapper around an array of Post properties
 */
export interface PostListProps {
  posts: PostSummaryProps[]
}

/**
 * Renders a list of post summaries with title, image, metadata and description.
 * @param props PostList properties
 */
export const PostList: React.SFC<PostListProps> = props => {
  const posts = props.posts.map((p, i) => {
    return (
      <div key={i} className="row">
        <div className="col-md-12">
          <PostSummary {...p} />
        </div>
      </div>
    );
  });

  return <div id="post-list">{posts}</div>
}
