import { AxiosResponse } from 'axios';

import { MockAxiosBaseApiClient } from '../../../tests/mockBaseApiClient';
import { RequestOptions } from '../../allTypes'; // Adjust the import based on your file structure
import { ApiClient } from '../../api/apiClient';
import { JWTRefreshDecorator } from '../jwtRefresh.decorator';

describe('JWTRefreshDecorator', () => {
  it('should refresh token on 401 and retry', async () => {
    const apiClient = new ApiClient(
      new MockAxiosBaseApiClient('http://localhost:3000', {
        get: { data: [{ id: 1, title: 'foo' }] },
      }),
    );

    const mockRefreshCallback = jest.fn();

    apiClient.addDecorator({
      decorator: JWTRefreshDecorator,
      params: {
        refreshCallback: mockRefreshCallback,
      },
    });

    const mock401Response: AxiosResponse = {
      data: 'Unauthorized',
      status: 401,
      statusText: 'Unauthorized',
      headers: {},
      config: {} as any,
    };

    const mockResponse: AxiosResponse = {
      data: 'some data',
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
    };

    apiClient.baseClient.instance.get.mockRejectedValueOnce({ response: mock401Response });
    apiClient.baseClient.instance.get.mockResolvedValueOnce(mockResponse);
    mockRefreshCallback.mockResolvedValueOnce('new-token');
    const options: RequestOptions = {
      url: '/some/url',
    };
    const response = await apiClient.get(options);

    expect(response).toEqual(mockResponse);
    expect(mockRefreshCallback).toBeCalled();
    expect(apiClient.baseClient.instance.get).toBeCalledTimes(2);
    expect(apiClient.baseClient.instance.get).toHaveBeenNthCalledWith(1, '/some/url', {});
    expect(apiClient.baseClient.instance.get).toHaveBeenNthCalledWith(2, '/some/url', {
      headers: {
        Authorization: 'Bearer new-token',
      },
    });
  });
});
