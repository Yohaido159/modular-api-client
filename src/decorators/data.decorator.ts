import { AxiosResponse } from 'axios';

import { IApiClient, RequestMethods, RequestOptions } from '../allTypes';

import { Decorator } from './base.decorator';

export class AxiosDataDecorator extends Decorator {
  constructor(apiClient: IApiClient) {
    super(apiClient);
  }

  async all<T = any>(method: RequestMethods, options: RequestOptions): Promise<T> {
    return this.apiClient[method](options).then((response: AxiosResponse<T>) => response.data);
  }
}
