import { IApiClient, IDecorator, RequestMethods, RequestOptions } from '../allTypes';
export declare class Decorator implements IDecorator {
    protected apiClient: IApiClient;
    constructor(apiClient: IApiClient);
    isMethodDeclaredLocaly(method: string): boolean;
    all<T = any>(method: RequestMethods, options: RequestOptions): Promise<T>;
    get<T = any>(options: RequestOptions): Promise<T>;
    post<T = any>(options: RequestOptions): Promise<T>;
    put<T = any>(options: RequestOptions): Promise<T>;
    delete<T = any>(options: RequestOptions): Promise<T>;
    cleanup(): void;
}
