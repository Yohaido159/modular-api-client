import { IApiClient, RequestMethods, RequestOptions } from '../allTypes';

import { Decorator } from './base.decorator';

export class HeadersDecorator extends Decorator {
  private headers: object;

  constructor(apiClient: IApiClient, params: object) {
    super(apiClient);
    this.headers = params;
  }

  async all<T = any>(method: RequestMethods, options: RequestOptions): Promise<T> {
    return this.apiClient[method]({
      ...options,
      headers: {
        ...options.headers,
        ...this.headers,
      },
    });
  }
}
