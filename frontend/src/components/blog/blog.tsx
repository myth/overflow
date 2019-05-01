import * as React from "react";
import { Route, Switch } from "react-router";

import { ApiPost } from "../../lib/api/models";
import { Post, PostList } from "../post/post";
import { Api } from "../../lib/api/api";
import { PostFilterProps, PostFilterType } from "../post/filter";


export interface BlogProps {
  api: Api,
  filters: BlogRouteParams,
};

export interface BlogState {
  posts: ApiPost[];
}

export interface BlogRouteParams {
  year?: string,
  month?: string,
  day?: string,
  tag?: string,
}

export class Blog extends React.PureComponent<BlogProps, BlogState> {
  private tags: Set<string>;
  private subfilters: string[];
  private filterType: PostFilterType;
  private baseUrl: string;

  constructor(props: BlogProps) {
    super(props);

    this.state = { posts: [] };
    this.tags = new Set();
    this.subfilters = [];
    this.baseUrl = "/blog/";
    this.filterType = PostFilterType.NONE;
  }

  public componentDidMount() {
    this.props.api.fetch().then(() => {
      this.tags.clear();

      for (const p of this.props.api.posts) {
        for (const t of p.rawData.tags) {
          this.tags.add(t.name);
        }
      }

      this.setState({ posts: this.props.api.posts });
    });
  }

  /**
   * Filter blog posts based on potential url filters like tag or date.
   * @param posts The original blog post array
   */
  private filterPosts(posts: ApiPost[]) {
    if (this.props.filters.tag) {
      return this.filterPostsByTag(posts);
    }
    else {
      return this.filterPostsByDate(posts);
    }
  }

  /**
   * Filter blog posts by year, month and day.
   * @param posts The original blog post array
   */
  private filterPostsByDate(posts: ApiPost[]) {
    const f = this.props.filters;

    this.subfilters = [];
    this.baseUrl = "/blog/";

    if (!f.year) {
      this.filterType = PostFilterType.YEAR;
    }
    if (f.year) {
      this.filterType = PostFilterType.MONTH;
      this.baseUrl += `${f.year}/`;
    }
    if (f.month) {
      this.filterType = PostFilterType.DAY;
      this.baseUrl += `${f.month}/`;
    }
    if (f.day) {
      this.filterType = PostFilterType.HOUR;
      this.baseUrl += `${f.day}/`;
    }

    return posts.filter(p => {
      let year = true;
      let month = true;
      let day = true;

      const dayStr = p.rawData.published.slice(8, 10);
      const monthStr = p.rawData.published.slice(5, 7);
      const yearStr = p.rawData.published.slice(0, 4);

      if (f.year) year = f.year === yearStr;
      if (f.month) month = f.month === monthStr;
      if (f.day) day = f.day === dayStr;

      if (!f.year) {
        this.subfilters.push(yearStr);
      }
      else if (year && !f.month) {
        this.subfilters.push(monthStr);
      }
      else if (year && month && !f.day) {
        this.subfilters.push(dayStr);
      }

      return year && month && day;
    });
  }

  /**
   * Filters blog posts by tag.
   * @param posts The original blog post array
   */
  private filterPostsByTag(posts: ApiPost[]) {
    const f = this.props.filters;

    this.baseUrl = "/blog/tag/";
    this.filterType = PostFilterType.TAG;
    this.subfilters = [];

    if (f.tag) this.baseUrl += `${f.tag}/`;

    return posts.filter(p => {
      const tags = p.rawData.tags.map(t => t.name);

      this.subfilters = this.subfilters.concat(tags);

      return f.tag && tags.some(t => t === f.tag);
    });
  }

  /**
   * Generate full URLs for all existing posts
   */
  private generateBlogPostRoutes() {
    return this.state.posts.map((p, i) => {
      const post = p.toPost();
      return (
        <Route key={i} exact path={post.url} component={() => <Post {...post} />} />
      );
    });
  }

  public render() {
    const posts = this.filterPosts(this.state.posts).map(p => p.toPostSummary());
    const postFilter: PostFilterProps = {
      filters: this.subfilters,
      baseUrl: this.baseUrl,
      type: this.filterType,
    }

    const postList = () => <PostList posts={posts} filter={postFilter} />

    return (
      <Switch>
        <Route exact path="/" component={postList} />
        {this.generateBlogPostRoutes()}
        <Route path="/blog/" component={postList} />
      </Switch>
    )
  }
}
