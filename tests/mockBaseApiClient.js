export class MockAxiosBaseApiClient {
  constructor(baseURL, data) {
    this.baseURL = baseURL;
    this.instance = {
      get: jest.fn().mockResolvedValue(data.get),
      post: jest.fn().mockResolvedValue(data.post),
      put: jest.fn().mockResolvedValue(data.put),
      delete: jest.fn().mockResolvedValue(data.delete),
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
      defaults: {
        headers: {
          common: {},
          get: {},
          post: {},
          put: {},
          patch: {},
          delete: {},
        },
      },
    };
  }

  get(options) {
    const { url, params, headers, ...otherOptions } = options;
    return this.instance.get(url, { params, headers, ...otherOptions });
  }

  post(options) {
    const { url, data, params, headers, ...otherOptions } = options;
    return this.instance.post(url, data, { headers, params, ...otherOptions });
  }

  put(options) {
    const { url, data, params, headers, ...otherOptions } = options;
    return this.instance.put(url, data, { headers, params, ...otherOptions });
  }

  delete(options) {
    const { url, params, headers, ...otherOptions } = options;
    return this.instance.delete(url, { headers, params, ...otherOptions });
  }
}
