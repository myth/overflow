import * as React from "react";

import "./post.scss";

/**
 * PostTitle properties
 */
export interface PostTitleProps {
  title: string;
}

/**
 * Create a post title component
 * @param props PostTitle properties
 */
export const PostTitle: React.SFC<PostTitleProps> = props => {
  return <h1 className="post-title">{props.title}</h1>;
}

/**
 * PostMeta properties
 */
export interface PostMetaProps {
  created: string;
  edited: string;
}

/**
 * Create a post metadata component
 * @param props PostMeta properties
 */
export const PostMeta: React.SFC<PostMetaProps> = props => {
  return <span className="post-meta">Created: {props.created} Edited: {props.edited}</span>;
}

/**
 * PostHeader properties
 */
export interface PostHeaderProps {
  title: string;
  meta: PostMetaProps;
}

/**
 * Create a header component that contains title and metadata
 * @param props PostHeader properties
 */
export const PostHeader: React.SFC<PostHeaderProps> = props => {
  return (
    <header className="post-header">
      <PostTitle title={props.title}></PostTitle>
      <PostMeta {...props.meta}></PostMeta>
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
  return <main className="post-content">{props.content}</main>;
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
      <PostHeader {...props.header}></PostHeader>
      <PostDescription description={props.description}></PostDescription>
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
      <PostHeader {...props.header}></PostHeader>
      <PostDescription description={props.description}></PostDescription>
      <PostContent content={props.content}></PostContent>
    </article>
  );
}
