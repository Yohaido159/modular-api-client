import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
interface RequestOptions extends AxiosRequestConfig {
    url: string;
    data?: any;
}
export declare const createAxiosInstance: (baseURL: string) => AxiosInstance;
export declare class AxiosBaseApiClient {
    baseURL: string;
    instance: AxiosInstance;
    constructor(baseURL: string);
    get(options: RequestOptions): Promise<AxiosResponse>;
    post(options: RequestOptions): Promise<AxiosResponse>;
    put(options: RequestOptions): Promise<AxiosResponse>;
    delete(options: RequestOptions): Promise<AxiosResponse>;
}
export {};
