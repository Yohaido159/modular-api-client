import { IApiClient, PostOrPutOptions, RequestOptions } from 'modular-api-client';

import { Decorator } from './base.decorator';
export declare class AxiosDataDecorator extends Decorator {
  constructor(apiClient: IApiClient);
  all<T = any>(method: string, options: RequestOptions | PostOrPutOptions): Promise<T>;
}
