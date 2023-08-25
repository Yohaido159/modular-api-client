import { IApiClient, IDecorator, PostOrPutOptions, RequestOptions } from 'modular-api-client';

export class Decorator implements IDecorator {
  protected apiClient: IApiClient;

  constructor(apiClient: IApiClient) {
    this.apiClient = apiClient;
  }

  isMethodDeclaredLocaly(method: string): boolean {
    //check local methods and not inherited methods.
    // eslint-disable-next-line no-prototype-builtins
    return this.constructor.prototype.hasOwnProperty(method);
  }

  all<T = any>(method: string, options: RequestOptions | PostOrPutOptions): Promise<T> {
    return this.apiClient[method](options);
  }

  get<T = any>(options: RequestOptions): Promise<T> {
    if (this.isMethodDeclaredLocaly('get')) {
      return this.get(options);
    } else if (this.isMethodDeclaredLocaly('all')) {
      return this.all('get', options);
    } else {
      return this.apiClient.get(options);
    }
  }

  post<T = any>(options: PostOrPutOptions): Promise<T> {
    if (this.isMethodDeclaredLocaly('post')) {
      return this.post(options);
    } else if (this.isMethodDeclaredLocaly('all')) {
      return this.all('post', options);
    } else {
      return this.apiClient.post(options);
    }
  }

  put<T = any>(options: PostOrPutOptions): Promise<T> {
    if (this.isMethodDeclaredLocaly('put')) {
      return this.put(options);
    } else if (this.isMethodDeclaredLocaly('all')) {
      return this.all('put', options);
    } else {
      return this.apiClient.put(options);
    }
  }

  delete<T = any>(options: RequestOptions): Promise<T> {
    if (this.isMethodDeclaredLocaly('delete')) {
      return this.delete(options);
    } else if (this.isMethodDeclaredLocaly('all')) {
      return this.all('delete', options);
    } else {
      return this.apiClient.delete(options);
    }
  }

  cleanup() {}
}
