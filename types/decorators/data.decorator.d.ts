import { IApiClient, RequestMethods, RequestOptions } from '../allTypes';
import { Decorator } from './base.decorator';
export declare class AxiosDataDecorator extends Decorator {
    constructor(apiClient: IApiClient);
    all<T = any>(method: RequestMethods, options: RequestOptions): Promise<T>;
}
