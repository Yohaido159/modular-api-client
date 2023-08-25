import { IApiClient, RequestOptions } from '../../src/allTypes';

import { Decorator } from './base.decorator';
export declare class AxiosDataDecorator extends Decorator {
  constructor(apiClient: IApiClient);
  all<T = any>(method: string, options: RequestOptions): Promise<T>;
}
