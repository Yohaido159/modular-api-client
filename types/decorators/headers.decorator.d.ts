import { IApiClient, RequestOptions } from '../../src/allTypes';

import { Decorator } from './base.decorator';
export declare class HeadersDecorator extends Decorator {
  private headers;
  constructor(apiClient: IApiClient, params: object);
  all<T = any>(method: string, options: RequestOptions): Promise<T>;
}
