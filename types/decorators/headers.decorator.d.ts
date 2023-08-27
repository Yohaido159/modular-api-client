import { IApiClient, RequestMethods, RequestOptions } from '../allTypes';
import { Decorator } from './base.decorator';
export declare class AxiosHeadersDecorator extends Decorator {
    private baseClient;
    private initalHeaders;
    constructor(apiClient: IApiClient, params: object, baseClient: any);
    all<T = any>(method: RequestMethods, options: RequestOptions): Promise<T>;
    cleanup(): void;
}
