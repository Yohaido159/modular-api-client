import { AxiosInstance, AxiosResponse } from 'axios';

declare module 'modular-api-client' {
  interface IAxiosBaseApiClient {
    baseURL: string;
    instance: AxiosInstance;

    get(options: RequestOptions): Promise<AxiosResponse>;
    post(options: RequestOptions): Promise<AxiosResponse>;
    put(options: RequestOptions): Promise<AxiosResponse>;
    delete(options: RequestOptions): Promise<AxiosResponse>;
  }

  export type OptionsGet = {
    url: string;
    params?: any;
    headers?: any;
  };

  export type OptionsPost = {
    url: string;
    data: any;
    headers?: any;
  };

  export type OptionDelete = {
    url: string;
    headers?: any;
  };

  export interface IApiClient {
    get(options: OptionsGet): any;
    post(options: OptionsPost): any;
    put(options: OptionsPost): any;
    delete(options: OptionDelete): any;
    all(method: string, options: any): any;
  }

  export type Decorator = IApiClient;

  export interface IApiClient {
    get(options: any): Promise<any>;
    post(options: any): Promise<any>;
    put(options: any): Promise<any>;
    delete(options: any): Promise<any>;
    [key: string]: any;
  }

  export type RequestOptions = {
    url: string;
    params?: object;
    headers?: object;
    [key: string]: any;
  };

  export type PostOrPutOptions = RequestOptions & {
    data?: any;
  };

  export interface IDecorator {
    all<T = any>(method: string, options: RequestOptions | PostOrPutOptions): Promise<T>;
    get<T = any>(options: RequestOptions): Promise<T>;
    post<T = any>(options: PostOrPutOptions): Promise<T>;
    put<T = any>(options: PostOrPutOptions): Promise<T>;
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
}
