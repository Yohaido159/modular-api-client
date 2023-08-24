import { Decorator } from "./base.decorator";

export class AuthenticationDecorator extends Decorator {
    private token: string;
  
    constructor(apiClient: IApiClient, params: { token: string }) {
      super(apiClient);
      this.token = params.token;
    }
  
    all<T = any>(method: string, options: RequestOptions | PostOrPutOptions): Promise<T> {
      return this.apiClient[method]({
        ...options,
        headers: { ...options.headers, Authorization: `${this.token}` },
      });
    }
  }
  