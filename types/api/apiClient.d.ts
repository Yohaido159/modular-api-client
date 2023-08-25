import { DecoratorContainer, PostOrPutOptions, RequestOptions } from 'modular-api-client';
export declare class ApiClient {
  private baseClient;
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
  post<T = any>(options: PostOrPutOptions): Promise<T>;
  put<T = any>(options: PostOrPutOptions): Promise<T>;
  delete<T = any>(options: RequestOptions): Promise<T>;
}
