import { AxiosError } from 'axios';

import { IApiClient, RequestMethods, RequestOptions } from '../allTypes';
import { Decorator } from '../decorators/base.decorator';

interface IRefreshCallback {
  (): Promise<string>;
}

export class JWTRefreshDecorator extends Decorator {
  private refreshCallback: IRefreshCallback;
  private defaultHeaders: any;

  constructor(
    apiClient: IApiClient,
    params: { refreshCallback: IRefreshCallback },
    public baseClient: any,
  ) {
    super(apiClient);
    this.baseClient = baseClient;
    this.refreshCallback = params.refreshCallback;
  }

  async all<T = any>(method: RequestMethods, options: RequestOptions): Promise<T> {
    try {
      console.log('JWTRefreshDecorator.all');
      return await this.apiClient[method](options);
    } catch (error) {
      const err = error as AxiosError;

      if (err.response && err.response.status === 401) {
        const newToken = await this.refreshCallback();
        this.baseClient.instance.defaults.headers.common.Authorization = newToken;
        return await this.apiClient[method](options);
      } else {
        throw error;
      }
    }
  }

  cleanup(): void {
    delete this.baseClient.instance.defaults.headers.common.Authorization;
  }
}
