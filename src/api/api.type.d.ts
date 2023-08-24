type OptionsGet = {
  url: string;
  params?: any;
  headers?: any;
};

type OptionsPost = {
  url: string;
  data: any;
  headers?: any;
};

type OptionDelete = {
  url: string;
  headers?: any;
};

interface IApiClient {
  get(options: OptionsGet): any;
  post(options: OptionsPost): any;
  put(options: OptionsPost): any;
  delete(options: OptionDelete): any;
  all(method: string, options: any): any;
}

type Decorator = IApiClient;


interface IApiClient {
  get(options: any): Promise<any>;
  post(options: any): Promise<any>;
  put(options: any): Promise<any>;
  delete(options: any): Promise<any>;
  [key: string]: any;
}

type RequestOptions = {
  url: string;
  params?: object;
  headers?: object;
  [key: string]: any;
};

type PostOrPutOptions = RequestOptions & {
  data?: any;
};

interface IDecorator {
all<T = any>(method: string, options: RequestOptions | PostOrPutOptions): Promise<T>;
get<T = any>(options: RequestOptions): Promise<T>;
post<T = any>(options: PostOrPutOptions): Promise<T>;
put<T = any>(options: PostOrPutOptions): Promise<T>;
delete<T = any>(options: RequestOptions): Promise<T>;
cleanup?(): void;
}
