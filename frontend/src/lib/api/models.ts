import { PostProps, PostViewMode } from "../../components/post/post";


export interface RawApiUser {
  username: string,
  first_name: string,
  last_name: string,
  email: string,
}

export interface RawApiTag {
  name: string,
};

export interface RawApiPost {
  title: string,
  author: RawApiUser,
  description: string,
  published: string,
  edited: string,
  content: string,
  illustration: string | null,
  tags: RawApiTag[],
  slug: string,
}

/**
 * Create a full post URL for a post in a /blog/year/month/day/slug format.
 * @param created A Date object from the published datetime string
 * @param slug The raw post slug field
 */
function generatePostUrl(created: Date, slug: string): string {
  const year = created.getFullYear();
  const month = created.getMonth() + 1; // Months are zero indexed
  const day = created.getDay();

  const monthStr = month < 10 ? `0${month}` : `${month}`;
  const dayStr = day < 10 ? `0${day}` : `${day}`;

  return `/blog/${year}/${monthStr}/${dayStr}/${slug}`;
}

export class ApiTag {
  constructor(readonly rawData: RawApiTag) { }
}

export class ApiPost {
  constructor(readonly rawData: RawApiPost) { }

  /**
   * Transform this raw API post object to Post component properties
   */
  public toPost(): PostProps {
    return {
      title: this.rawData.title,
      illustration: this.rawData.illustration,
      created: this.rawData.published,
      edited: this.rawData.edited,
      description: this.rawData.description,
      content: this.rawData.content,
      url: generatePostUrl(new Date(this.rawData.published), this.rawData.slug),
      mode: PostViewMode.FULL,
    }
  }

  /**
   * Transform this raw API post object to PostSummary component properties
   */
  public toPostSummary(): PostProps {
    const post = this.toPost();

    post.mode = PostViewMode.SUMMARY;

    return post;
  }

  /**
   * Whether or not this post has a valid illustration
   */
  public hasIllustration(): boolean {
    return this.rawData.illustration !== undefined &&
      this.rawData.illustration !== null &&
      this.rawData.illustration !== "";
  }

  /**
   * Whether or not this post has a valid slug
   */
  public hasSlug(): boolean {
    return this.rawData.slug !== undefined &&
      this.rawData.slug !== null &&
      this.rawData.slug !== "";
  }
}
