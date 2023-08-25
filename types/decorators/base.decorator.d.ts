import { IApiClient, IDecorator, PostOrPutOptions, RequestOptions } from 'modular-api-client';
export declare class Decorator implements IDecorator {
  protected apiClient: IApiClient;
  constructor(apiClient: IApiClient);
  isMethodDeclaredLocaly(method: string): boolean;
  all<T = any>(method: string, options: RequestOptions | PostOrPutOptions): Promise<T>;
  get<T = any>(options: RequestOptions): Promise<T>;
  post<T = any>(options: PostOrPutOptions): Promise<T>;
  put<T = any>(options: PostOrPutOptions): Promise<T>;
  delete<T = any>(options: RequestOptions): Promise<T>;
  cleanup(): void;
}
