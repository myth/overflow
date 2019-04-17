import { BaseApi, Endpoint } from "./client";
import { RawApiPost, ApiPost, RawApiTag, ApiTag } from "./models";


export class Api {
  private api: BaseApi;

  private postEndpoint: Endpoint<RawApiPost>;
  private tagEndpoint: Endpoint<RawApiTag>;

  public posts: ApiPost[];
  public tags: ApiTag[];

  constructor() {
    this.api = new BaseApi(API_BASE_URI);

    this.postEndpoint = new Endpoint(this.api, "/posts/");
    this.tagEndpoint = new Endpoint(this.api, "/tags/");

    this.posts = [];
    this.tags = [];
  }

  /**
   * Refresh the underlying data stores with new data from the API.
   */
  public async fetch() {
    const [posts, tags] = await Promise.all([
      this.postEndpoint.getAll(),
      this.tagEndpoint.getAll(),
    ]);

    this.posts = posts.map(p => new ApiPost(p));
    this.tags = tags.map(t => new ApiTag(t));
  }
}
