import { IApiClient, RequestMethods, RequestOptions } from '../allTypes';
import { Decorator } from './base.decorator';
export declare class AuthenticationDecorator extends Decorator {
    private token;
    constructor(apiClient: IApiClient, params: {
        token: string;
    });
    all<T = any>(method: RequestMethods, options: RequestOptions): Promise<T>;
}
