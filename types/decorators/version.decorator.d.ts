import { Decorator } from './base.decorator';
export declare class VersionDecorator extends Decorator {
  private version;
  private baseClient;
  constructor(
    apiClient: IApiClient,
    params: {
      version: string;
    },
    baseClient: IApiClient,
  );
  all<T = any>(method: string, options: RequestOptions): Promise<T>;
}
