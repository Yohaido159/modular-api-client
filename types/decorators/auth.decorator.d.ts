import { IApiClient, PostOrPutOptions, RequestOptions } from 'modular-api-client';

import { Decorator } from './base.decorator';
export declare class AuthenticationDecorator extends Decorator {
  private token;
  constructor(
    apiClient: IApiClient,
    params: {
      token: string;
    },
  );
  all<T = any>(method: string, options: RequestOptions | PostOrPutOptions): Promise<T>;
}
