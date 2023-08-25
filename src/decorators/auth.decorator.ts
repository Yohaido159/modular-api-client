import { IApiClient, RequestMethods, RequestOptions } from '../allTypes';

import { Decorator } from './base.decorator';

export class AuthenticationDecorator extends Decorator {
  private token: string;

  constructor(apiClient: IApiClient, params: { token: string }) {
    super(apiClient);
    this.token = params.token;
  }

  all<T = any>(method: RequestMethods, options: RequestOptions): Promise<T> {
    return this.apiClient[method]({
      ...options,
      headers: { ...options.headers, Authorization: `${this.token}` },
    });
  }
}
