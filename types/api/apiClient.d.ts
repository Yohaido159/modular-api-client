import { DecoratorContainer, RequestOptions } from '../allTypes';
export declare class ApiClient {
    baseClient: any;
    private client;
    private decorators;
    constructor(baseClient: any);
    applyDecorators(): void;
    applyDecorator<T>(decoratorContainer: DecoratorContainer<T>): void;
    addDecorator<T>(decoratorContainer: DecoratorContainer<T>): void;
    findDecorator<T>(decoratorContainer: DecoratorContainer): DecoratorContainer<T> | undefined;
    removeDecorator(decoratorContainer: DecoratorContainer): void;
    clone(): ApiClient;
    with(decoratorContainer: DecoratorContainer): ApiClient;
    without(decoratorContainer: DecoratorContainer): ApiClient;
    get<T = any>(options: RequestOptions): Promise<T>;
    post<T = any>(options: RequestOptions): Promise<T>;
    put<T = any>(options: RequestOptions): Promise<T>;
    delete<T = any>(options: RequestOptions): Promise<T>;
}
