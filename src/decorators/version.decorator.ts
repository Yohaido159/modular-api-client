import { Decorator } from "./base.decorator";

export class VersionDecorator extends Decorator {
    private version: string;
    private baseClient: IApiClient;
  
    constructor(
      apiClient: IApiClient,
      params: {
        version: string;
      },
      baseClient: IApiClient,
    ) {
      super(apiClient);
      this.version = params.version;
      this.baseClient = baseClient;
    }
  
    all<T = any>(method: string, options: RequestOptions | PostOrPutOptions): Promise<T> {
      return this.apiClient[method]({ ...options, baseURL: `${this.baseClient.baseURL}/${this.version}` });
    }
  }
  
  