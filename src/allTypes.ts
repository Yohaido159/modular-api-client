import { AxiosInstance, AxiosResponse } from 'axios';

export interface IAxiosBaseApiClient {
  baseURL: string;
  instance: AxiosInstance;

  get(options: RequestOptions): Promise<AxiosResponse>;
  post(options: RequestOptions): Promise<AxiosResponse>;
  put(options: RequestOptions): Promise<AxiosResponse>;
  delete(options: RequestOptions): Promise<AxiosResponse>;
}

export type RequestOptions = {
  url: string;
  params?: any;
  headers?: any;
  data?: any;
  [key: string]: any;
};

export interface IApiClient {
  get(options: RequestOptions): any;
  post(options: RequestOptions): any;
  put(options: RequestOptions): any;
  delete(options: RequestOptions): any;
  all(method: string, options: RequestOptions): any;
}

export type Decorator = IApiClient;

export type RequestMethods = 'get' | 'post' | 'put' | 'delete';

export interface IDecorator {
  all<T = any>(method: string, options: RequestOptions): Promise<T>;
  get<T = any>(options: RequestOptions): Promise<T>;
  post<T = any>(options: RequestOptions): Promise<T>;
  put<T = any>(options: RequestOptions): Promise<T>;
  delete<T = any>(options: RequestOptions): Promise<T>;
  cleanup?(): void;
}
export interface IDecoratorConstructor<T> {
  new (apiClient: IApiClient, params: T, baseClient: IApiClient): Decorator;
}

export type DecoratorContainer<T = any> = {
  decorator: IDecoratorConstructor<T>;
  decoratorInstance?: any;
  params?: T;
};
