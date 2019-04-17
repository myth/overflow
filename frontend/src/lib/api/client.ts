const DEFAULT_HEADERS = new Headers([
  ["Accept", "application/json"],
  ["Content-Type", "application/json"]
]);

enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  OPTIONS = "OPTIONS"
}

interface QueryParams {
  [key: string]: string
}

interface FetchArgs {
  method: HttpMethod,
  endpoint: string,
  headers?: Headers,
  data?: any,
  queryParams?: QueryParams,
}

/**
 * Base Api whose fetch method is generic over the object type interface T
 * which should correspond to the specific data returned in the HTTP response.
 */
export class BaseApi {
  /**
   * Construct a BaseApi client fixed to a base url.
   * @param baseUrl A base API URL which subsequent endpoints could be concatenated with.
   */
  constructor(private readonly baseUrl: string) { }

  /**
   * Generic HTTP request method.
   * @param args Required and optional parameters for the fetch() command.
   */
  public async fetch<T>(args: FetchArgs): Promise<T> {
    return await fetch(`${this.baseUrl}${args.endpoint}`, {
      method: args.method,
      headers: args.headers ? args.headers : DEFAULT_HEADERS,
      body: args.data
    }).then(resp => {
      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }
      return resp.json()
    }).then(resp => {
      return resp as T
    });
  }
}

/**
 * An endpoint is a class generic over the object type interface T, which should correspond
 * to the specific data returned in the HTTP response.
 */
export class Endpoint<T> {
  constructor(private readonly api: BaseApi, private readonly endpoint: string) { }

  public async getAll() {
    try {
      return await this.api.fetch<T[]>({
        method: HttpMethod.GET,
        endpoint: this.endpoint,
      });
    } catch (e) {
      console.error(e);
    }

    return [];
  };
  public async get() { };
  public async post() { };
  public async put() { };
  public async delete() { };
  public async options() { };
}
