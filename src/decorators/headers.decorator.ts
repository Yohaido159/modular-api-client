import { IApiClient, RequestMethods, RequestOptions } from '../allTypes';

import { Decorator } from './base.decorator';

export class AxiosHeadersDecorator extends Decorator {
  private baseClient: any;
  private initalHeaders: object;

  constructor(apiClient: IApiClient, params: object, baseClient: any) {
    super(apiClient);
    this.initalHeaders = JSON.parse(JSON.stringify(baseClient.instance.defaults.headers));
    this.baseClient = baseClient;
    this.baseClient.instance.defaults.headers['common'] = {
      ...this.baseClient.instance.defaults.headers['common'],
      ...params,
    };
  }

  async all<T = any>(method: RequestMethods, options: RequestOptions): Promise<T> {
    return this.apiClient[method](options);
  }

  cleanup(): void {
    this.baseClient.instance.defaults.headers = this.initalHeaders;
  }
}
