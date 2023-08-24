import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface RequestOptions extends AxiosRequestConfig {
  url: string;
  data?: any;
}

interface IAxiosBaseApiClient {
  baseURL: string;
  instance: AxiosInstance;
}

export const createAxiosInstance = (baseURL: string): AxiosInstance => {
  return axios.create({ baseURL });
};

export class AxiosBaseApiClient {
  baseURL: string;
  instance: AxiosInstance;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.instance = createAxiosInstance(this.baseURL);
  }

  get(options: RequestOptions): Promise<AxiosResponse> {
    const { url, params, headers, ...otherOptions } = options;
    return this.instance.get(url, { params, headers, ...otherOptions });
  }

  post(options: RequestOptions): Promise<AxiosResponse> {
    const { url, data, params, headers, ...otherOptions } = options;
    return this.instance.post(url, data, { headers, params, ...otherOptions });
  }

  put(options: RequestOptions): Promise<AxiosResponse> {
    const { url, data, params, headers, ...otherOptions } = options;
    return this.instance.put(url, data, { headers, params, ...otherOptions });
  }

  delete(options: RequestOptions): Promise<AxiosResponse> {
    const { url, params, headers, ...otherOptions } = options;
    return this.instance.delete(url, { headers, params, ...otherOptions });
  }
}
