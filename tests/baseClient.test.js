import MockAdapter from 'axios-mock-adapter';

import { AxiosBaseApiClient } from '../src/api/AxiosBaseApiClient';

describe('AxiosBaseApiClient', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';

  const apiClient = new AxiosBaseApiClient(baseURL);
  const axiosInstance = apiClient.instance;
  const mock = new MockAdapter(axiosInstance);

  mock.onGet('/posts').reply(200, [{ id: 1, title: 'foo' }]);
  mock.onPost('/posts').reply(201, { id: 1, title: 'foo' });
  mock.onPut('/posts/1').reply(200, { id: 1, title: 'foo' });
  mock.onDelete('/posts/1').reply(200, { id: 1, title: 'foo' });

  it('should perform a GET request', async () => {
    const response = await apiClient.get({ url: '/posts' });
    expect(response.data).toEqual([{ id: 1, title: 'foo' }]);
    expect(response.status).toEqual(200);
  });

  it('should perform a POST request', async () => {
    const response = await apiClient.post({ url: '/posts', title: 'foo' });
    expect(response.data).toEqual({ id: 1, title: 'foo' });
    expect(response.status).toEqual(201);
  });

  it('should perform a PUT request', async () => {
    const response = await apiClient.put({ url: '/posts/1', title: 'foo' });
    expect(response.data).toEqual({ id: 1, title: 'foo' });
    expect(response.status).toEqual(200);
  });

  it('should perform a DELETE request', async () => {
    const response = await apiClient.delete({ url: '/posts/1' });
    expect(response.data).toEqual({ id: 1, title: 'foo' });
    expect(response.status).toEqual(200);
  });
});
