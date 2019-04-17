import { PostProps, PostSummaryProps } from "../../components/post/post";

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
      header: {
        title: this.rawData.title,
        meta: {
          created: this.rawData.published,
          edited: this.rawData.edited,
          illustration: this.rawData.illustration
        },
      },
      description: this.rawData.description,
      content: this.rawData.content,
    }
  }

  /**
   * Transform this raw API post object to PostSummary component properties
   */
  public toPostSummary(): PostSummaryProps {
    return {
      header: {
        title: this.rawData.title,
        meta: {
          created: this.rawData.published,
          edited: this.rawData.edited,
          illustration: this.rawData.illustration
        },
        slug: this.rawData.slug
      },
      description: this.rawData.description,
    }
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
