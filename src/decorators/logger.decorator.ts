import { IApiClient, IAxiosBaseApiClient } from '../allTypes';

import { Decorator } from './base.decorator';

export class LoggerDecorator extends Decorator {
  private logger: any;
  private baseClient: IAxiosBaseApiClient;
  private reqInterceptor: number;
  private resInterceptor: number;

  constructor(apiClient: IApiClient, params: any, baseClient: any) {
    super(apiClient);
    this.baseClient = baseClient;
    this.logger = params.logger;
    this.reqInterceptor = this.baseClient.instance.interceptors.request.use((config) => {
      this.logger(`Request: ${config.method?.toUpperCase()} ${config.url}`, config);
      return config;
    });
    this.resInterceptor = this.baseClient.instance.interceptors.response.use((response) => {
      this.logger(`Response: ${response.status} ${response.statusText}`);
      return response;
    });
  }

  cleanup() {
    this.baseClient.instance.interceptors.request.eject(this.reqInterceptor);
    this.baseClient.instance.interceptors.response.eject(this.resInterceptor);
  }
}
