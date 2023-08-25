import { AxiosResponse } from 'axios';
import { IApiClient, PostOrPutOptions, RequestOptions } from 'modular-api-client';

import { Decorator } from './base.decorator';

export class AxiosDataDecorator extends Decorator {
  constructor(apiClient: IApiClient) {
    super(apiClient);
  }

  async all<T = any>(method: string, options: RequestOptions | PostOrPutOptions): Promise<T> {
    return this.apiClient[method](options).then((response: AxiosResponse<T>) => response.data);
  }
}
