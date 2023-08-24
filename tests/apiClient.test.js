import MockAdapter from 'axios-mock-adapter';

import { ApiClient } from '../apiClient';
import { AxiosBaseApiClient, createAxiosInstance } from '../AxiosBaseApiClient';
import {
  AuthenticationDecorator,
  DataDecorator,
  LoggerDecorator,
  VersionDecorator,
} from '../decorators/common.decoretor';

import { MockAxiosBaseApiClient } from './mockBaseApiClient';

const baseURL = 'https://jsonplaceholder.typicode.com';

describe('ApiClient', () => {
  it(`should perform a GET POST PUT DELETE with decorator`, async () => {
    const apiClient = new ApiClient(new AxiosBaseApiClient(baseURL));
    const axiosInstance = apiClient.baseClient.instance;
    const mock = new MockAdapter(axiosInstance);

    mock.onGet('/posts').reply(200, [{ id: 1, title: 'foo' }]);
    mock.onPost('/posts').reply(201, { id: 1, title: 'foo' });
    mock.onPut('/posts/1').reply(200, { id: 1, title: 'foo' });
    mock.onDelete('/posts/1').reply(200, { id: 1, title: 'foo' });

    apiClient.addDecorator({ decorator: DataDecorator });

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

    apiClient.addDecorator({ decorator: DataDecorator });
    apiClient.removeDecorator({ decorator: DataDecorator });

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
    const apiClient = new ApiClient(new AxiosBaseApiClient(baseURL));
    const axiosInstance = apiClient.baseClient.instance;
    const mock = new MockAdapter(axiosInstance);

    mock.onGet('/posts').reply(200, [{ id: 1, title: 'foo' }]);
    mock.onPost('/posts').reply(201, { id: 1, title: 'foo' });
    mock.onPut('/posts/1').reply(200, { id: 1, title: 'foo' });
    mock.onDelete('/posts/1').reply(200, { id: 1, title: 'foo' });

    apiClient.addDecorator({ decorator: VersionDecorator, params: { version: 'v1' } });

    const responseGet = await apiClient.get({ url: '/posts' });
    expect(responseGet.config.baseURL).toEqual(`${baseURL}/v1`);
  });

  it(`should perform a GET with versions decorator but for one scope`, async () => {
    const apiClient = new ApiClient(new AxiosBaseApiClient(baseURL));
    const axiosInstance = apiClient.baseClient.instance;
    const mock = new MockAdapter(axiosInstance);

    mock.onGet('/posts').reply(200, [{ id: 1, title: 'foo' }]);
    mock.onPost('/posts').reply(201, { id: 1, title: 'foo' });
    mock.onPut('/posts/1').reply(200, { id: 1, title: 'foo' });
    mock.onDelete('/posts/1').reply(200, { id: 1, title: 'foo' });

    apiClient.addDecorator({ decorator: VersionDecorator, params: { version: 'v1' } });

    const responseGet = await apiClient.get({ url: '/posts' });
    expect(responseGet.config.baseURL).toEqual(`${baseURL}/v1`);

    const responseGet2 = await apiClient.without({ decorator: VersionDecorator }).get({ url: '/posts' });
    expect(responseGet2.config.baseURL).toEqual(`${baseURL}`);

    const responseGet3 = await apiClient.get({ url: '/posts' });
    expect(responseGet3.config.baseURL).toEqual(`${baseURL}/v1`);
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
    apiClient.addDecorator({ decorator: DataDecorator });

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
});
