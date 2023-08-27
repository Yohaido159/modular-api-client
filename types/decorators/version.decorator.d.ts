import { IApiClient, IAxiosBaseApiClient, RequestMethods, RequestOptions } from '../allTypes';
import { Decorator } from './base.decorator';
export declare class VersionDecorator extends Decorator {
    private version;
    private baseClient;
    constructor(apiClient: IApiClient, params: {
        version: string;
    }, baseClient: IAxiosBaseApiClient);
    all<T = any>(method: RequestMethods, options: RequestOptions): Promise<T>;
}
