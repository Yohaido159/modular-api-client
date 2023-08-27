import { MockAxiosBaseApiClient } from '../../../tests/mockBaseApiClient';
import { ApiClient } from '../../api/apiClient';
import { JWTRefreshDecorator } from '../jwtRefresh.decorator';

describe('JWTRefreshDecorator', () => {
  let apiClient: any, mockRefreshCallback: any, mock401Response: any, mockResponse: any, options: any;

  beforeEach(() => {
    apiClient = new ApiClient(
      new MockAxiosBaseApiClient('http://localhost:3000', {
        get: { data: [{ id: 1, title: 'foo' }] },
      }),
    );
    mockRefreshCallback = jest.fn();
    apiClient.addDecorator({
      decorator: JWTRefreshDecorator,
      params: {
        refreshCallback: mockRefreshCallback,
      },
    });

    mock401Response = {
      data: 'Unauthorized',
      status: 401,
      statusText: 'Unauthorized',
      headers: {},
      config: {} as any,
    };

    mockResponse = {
      data: 'some data',
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
    };

    options = {
      url: '/some/url',
    };
  });

  it('should refresh token on 401', async () => {
    apiClient.baseClient.instance.get.mockRejectedValueOnce({ response: mock401Response });
    mockRefreshCallback.mockResolvedValueOnce('Bearer new-token');

    await apiClient.get(options);
    expect(mockRefreshCallback).toBeCalledTimes(1);
  });

  it('should retry request after token refresh', async () => {
    apiClient.baseClient.instance.get.mockRejectedValueOnce({ response: mock401Response });
    apiClient.baseClient.instance.get.mockResolvedValueOnce(mockResponse);
    mockRefreshCallback.mockResolvedValueOnce('Bearer new-token');

    const response = await apiClient.get(options);
    expect(response).toEqual(mockResponse);
  });

  it('should update headers on token refresh', async () => {
    apiClient.baseClient.instance.get.mockRejectedValueOnce({ response: mock401Response });
    mockRefreshCallback.mockResolvedValueOnce('Bearer new-token');

    const headerBefore = { ...apiClient.baseClient.instance.defaults.headers.common };
    await apiClient.get(options);
    const headerAfter = { ...apiClient.baseClient.instance.defaults.headers.common };

    expect(headerBefore).toEqual({});
    expect(headerAfter).toEqual({
      Authorization: 'Bearer new-token',
    });
  });

  it('should use new token in subsequent requests', async () => {
    apiClient.baseClient.instance.get.mockRejectedValueOnce({ response: mock401Response });
    mockRefreshCallback.mockResolvedValueOnce('Bearer new-token');
    await apiClient.get(options);
    await apiClient.get(options);

    expect(apiClient.baseClient.instance.defaults.headers.common).toEqual({
      Authorization: 'Bearer new-token',
    });
  });

  it('should call methods correct number of times', async () => {
    apiClient.baseClient.instance.get.mockRejectedValueOnce({ response: mock401Response });
    await apiClient.get(options); // 1 and return 401 and do again 2 and return 200
    await apiClient.get(options); // 3 and return 200

    mockRefreshCallback.mockResolvedValueOnce('Bearer new-token-2');
    apiClient.baseClient.instance.get.mockRejectedValueOnce({ response: mock401Response });

    await apiClient.get(options); // 4 and return 401 and do again 5 and return 200

    expect(apiClient.baseClient.instance.get).toBeCalledTimes(5);
    expect(mockRefreshCallback).toBeCalledTimes(2);
  });
});
