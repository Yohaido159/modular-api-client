import { IApiClient, IDecorator, RequestOptions } from '../../src/allTypes';
export declare class Decorator implements IDecorator {
  protected apiClient: IApiClient;
  constructor(apiClient: IApiClient);
  isMethodDeclaredLocaly(method: string): boolean;
  all<T = any>(method: string, options: RequestOptions): Promise<T>;
  get<T = any>(options: RequestOptions): Promise<T>;
  post<T = any>(options: RequestOptions): Promise<T>;
  put<T = any>(options: RequestOptions): Promise<T>;
  delete<T = any>(options: RequestOptions): Promise<T>;
  cleanup(): void;
}
