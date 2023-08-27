import { IApiClient, RequestMethods, RequestOptions } from '../allTypes';
import { Decorator } from '../decorators/base.decorator';
interface IRefreshCallback {
    (): Promise<string>;
}
export declare class JWTRefreshDecorator extends Decorator {
    baseClient: any;
    private refreshCallback;
    private defaultHeaders;
    constructor(apiClient: IApiClient, params: {
        refreshCallback: IRefreshCallback;
    }, baseClient: any);
    all<T = any>(method: RequestMethods, options: RequestOptions): Promise<T>;
    cleanup(): void;
}
export {};
