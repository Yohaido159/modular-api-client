import { ApiClient } from '../src/api/apiClient';
import { AuthenticationDecorator } from '../src/decorators/auth.decorator';
import { AxiosDataDecorator } from '../src/decorators/data.decorator';
import { HeadersDecorator } from '../src/decorators/headers.decorator';
import { LoggerDecorator } from '../src/decorators/logger.decorator';
import { VersionDecorator } from '../src/decorators/version.decorator';

import { MockAxiosBaseApiClient } from './mockBaseApiClient';

const baseURL = 'https://jsonplaceholder.typicode.com';

describe('ApiClient', () => {
  it(`should perform a GET POST PUT DELETE with decorator`, async () => {
    const apiClient = new ApiClient(
      new MockAxiosBaseApiClient(baseURL, {
        get: { data: [{ id: 1, title: 'foo' }] },
        post: { data: { id: 1, title: 'foo' } },
        put: { data: { id: 1, title: 'foo' } },
        delete: { data: { id: 1, title: 'foo' } },
      }),
    );

    apiClient.addDecorator({ decorator: AxiosDataDecorator });

    const responseGet = await apiClient.get({ url: '/posts' });
    expect(responseGet).toEqual([{ id: 1, title: 'foo' }]);

    const responsePost = await apiClient.post({ url: '/posts', data: { title: 'foo' } });
    expect(responsePost).toEqual({ id: 1, title: 'foo' });

    const responsePut = await apiClient.put({ url: '/posts/1', data: { title: 'foo' } });
    expect(responsePut).toEqual({ id: 1, title: 'foo' });

    const responseDelete = await apiClient.delete({ url: '/posts/1' });
    expect(responseDelete).toEqual({ id: 1, title: 'foo' });
  });

  it(`should perform a GET POST PUT DELETE without decorator`, async () => {
    const apiClient = new ApiClient(
      new MockAxiosBaseApiClient(baseURL, {
        get: { data: [{ id: 1, title: 'foo' }] },
        post: { data: { id: 1, title: 'foo' } },
        put: { data: { id: 1, title: 'foo' } },
        delete: { data: { id: 1, title: 'foo' } },
      }),
    );

    apiClient.addDecorator({ decorator: AxiosDataDecorator });
    apiClient.removeDecorator({ decorator: AxiosDataDecorator });

    const responseGet = await apiClient.get({ url: '/posts' });
    expect(responseGet.data).toEqual([{ id: 1, title: 'foo' }]);

    const responsePost = await apiClient.post({ url: '/posts', data: { title: 'foo' } });
    expect(responsePost.data).toEqual({ id: 1, title: 'foo' });

    const responsePut = await apiClient.put({ url: '/posts/1', data: { title: 'foo' } });
    expect(responsePut.data).toEqual({ id: 1, title: 'foo' });

    const responseDelete = await apiClient.delete({ url: '/posts/1' });
    expect(responseDelete.data).toEqual({ id: 1, title: 'foo' });
  });

  it(`should perform a GET with versions decorator`, async () => {
    const apiClient = new ApiClient(
      new MockAxiosBaseApiClient(baseURL, {
        get: { data: [{ id: 1, title: 'foo' }] },
        post: { data: { id: 1, title: 'foo' } },
        put: { data: { id: 1, title: 'foo' } },
        delete: { data: { id: 1, title: 'foo' } },
      }),
    );
    apiClient.addDecorator({ decorator: VersionDecorator, params: { version: 'v1' } });

    await apiClient.get({ url: '/posts' });
    expect(apiClient.baseClient.instance.get).toHaveBeenCalledWith('/posts', {
      baseURL: 'https://jsonplaceholder.typicode.com/v1',
    });
  });

  it(`should perform a GET with versions decorator but for one scope`, async () => {
    const apiClient = new ApiClient(
      new MockAxiosBaseApiClient(baseURL, {
        get: { data: [{ id: 1, title: 'foo' }] },
        post: { data: { id: 1, title: 'foo' } },
        put: { data: { id: 1, title: 'foo' } },
        delete: { data: { id: 1, title: 'foo' } },
      }),
    );
    apiClient.addDecorator({ decorator: VersionDecorator, params: { version: 'v1' } });

    await apiClient.get({ url: '/posts' });

    expect(apiClient.baseClient.instance.get).toHaveBeenCalledWith('/posts', {
      baseURL: 'https://jsonplaceholder.typicode.com/v1',
    });

    const newClient = apiClient.without({ decorator: VersionDecorator });
    await newClient.get({ url: '/posts' });

    expect(newClient.baseClient.instance.get).toHaveBeenCalledWith('/posts', {});

    await apiClient.get({ url: '/posts' });
    expect(apiClient.baseClient.instance.get).toHaveBeenCalledWith('/posts', {
      baseURL: 'https://jsonplaceholder.typicode.com/v1',
    });
  });
});

describe('test the decorator', () => {
  it(`should perform 'all' method from decorator`, async () => {
    const apiClient = new ApiClient(
      new MockAxiosBaseApiClient(baseURL, {
        get: { data: [{ id: 1, title: 'foo' }] },
        post: { data: { id: 1, title: 'foo' } },
        put: { data: { id: 1, title: 'foo' } },
        delete: { data: { id: 1, title: 'foo' } },
      }),
    );

    apiClient.addDecorator({ decorator: VersionDecorator, params: { version: 'v2' } });
    apiClient.addDecorator({ decorator: AuthenticationDecorator, params: { token: 'Bearer 1233123' } });
    apiClient.addDecorator({ decorator: AxiosDataDecorator });

    const responseGet = await apiClient.get({ url: '/posts' });
    expect(apiClient.baseClient.instance.get).toHaveBeenCalledWith('/posts', {
      baseURL: 'https://jsonplaceholder.typicode.com/v2',
      headers: {
        Authorization: 'Bearer 1233123',
      },
    });
    expect(responseGet).toEqual([{ id: 1, title: 'foo' }]);
    expect(apiClient.baseClient.instance.get).toHaveBeenCalledTimes(1);
  });

  it(`should test the 'cleanup' method from decorator`, async () => {
    const apiClient = new ApiClient(
      new MockAxiosBaseApiClient(baseURL, {
        get: { data: [{ id: 1, title: 'foo' }] },
        post: { data: { id: 1, title: 'foo' } },
        put: { data: { id: 1, title: 'foo' } },
        delete: { data: { id: 1, title: 'foo' } },
      }),
    );

    const logger = jest.fn();
    apiClient.addDecorator({ decorator: LoggerDecorator, params: { logger } });
    apiClient.addDecorator({ decorator: VersionDecorator, params: { version: 'v2' } });

    expect(apiClient.baseClient.instance.interceptors.request.use).toHaveBeenCalled();
    expect(apiClient.baseClient.instance.interceptors.request.use).toHaveBeenCalledTimes(1);
    const interceptor = apiClient.baseClient.instance.interceptors.request.use.mock.calls[0][0];
    const config = { method: 'get', url: '/test' };
    interceptor(config);

    expect(logger).toHaveBeenCalledWith('Request: GET /test', config);
  });

  it(`should test the 'cleanup' method from decorator`, async () => {
    const apiClient = new ApiClient(
      new MockAxiosBaseApiClient(baseURL, {
        get: { data: [{ id: 1, title: 'foo' }] },
      }),
    );

    const logger = jest.fn();
    apiClient.addDecorator({ decorator: LoggerDecorator, params: { logger } });
    apiClient.removeDecorator({ decorator: LoggerDecorator });

    apiClient.get({ url: '/posts' });

    expect(apiClient.baseClient.instance.interceptors.request.eject).toHaveBeenCalled();
    expect(logger).not.toHaveBeenCalled();
  });

  it.only(`should test the 'HeaderDecorator'`, async () => {
    const apiClient = new ApiClient(
      new MockAxiosBaseApiClient(baseURL, {
        get: { data: [{ id: 1, title: 'foo' }] },
      }),
    );

    const logger = jest.fn();
    apiClient.addDecorator({
      decorator: HeadersDecorator,
      params: {
        'X-Test': 'test',
      },
    });

    apiClient.get({ url: '/posts' });
    // expect(apiClient.baseClient.instance.get).toHaveBeenCalledWith('/posts', {});
    expect(apiClient.baseClient.instance.defaults.headers.common['X-Test']).toEqual('test');
  });
});
