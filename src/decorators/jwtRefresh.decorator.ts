import axios, { AxiosError } from 'axios';

import { IApiClient, RequestMethods, RequestOptions } from '../allTypes';
import { Decorator } from '../decorators/base.decorator';

interface IRefreshCallback {
  (): Promise<string>;
}

export class JWTRefreshDecorator extends Decorator {
  private refreshCallback: IRefreshCallback;

  constructor(apiClient: IApiClient, params: { refreshCallback: IRefreshCallback }, baseClient: any) {
    super(apiClient);
    this.refreshCallback = params.refreshCallback;
  }

  async all<T = any>(method: RequestMethods, options: RequestOptions): Promise<T> {
    try {
      return await this.apiClient[method](options);
    } catch (error) {
      const err = error as AxiosError;

      if (err.response && err.response.status === 401) {
        const newToken = await this.refreshCallback();
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${newToken}`,
        };
        return await this.apiClient[method](options);
      } else {
        throw error;
      }
    }
  }
}
