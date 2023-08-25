import { IApiClient, IAxiosBaseApiClient, RequestMethods, RequestOptions } from '../allTypes';

import { Decorator } from './base.decorator';

export class VersionDecorator extends Decorator {
  private version: string;
  private baseClient: IAxiosBaseApiClient;

  constructor(
    apiClient: IApiClient,
    params: {
      version: string;
    },
    baseClient: IAxiosBaseApiClient,
  ) {
    super(apiClient);
    this.version = params.version;
    this.baseClient = baseClient;
  }

  all<T = any>(method: RequestMethods, options: RequestOptions): Promise<T> {
    return this.apiClient[method]({ ...options, baseURL: `${this.baseClient.baseURL}/${this.version}` });
  }
}
