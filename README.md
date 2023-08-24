# Description

This package provides a customizable API client equipped with a rich set of decorators that allow you to modify, extend, and manipulate the behavior of the client. Using TypeScript, the decorators can modify request headers, add authentication, log requests and responses, set versions, and more. The decorator pattern allows for great flexibility and clean code, and the classes and interfaces provided can be extended for even more functionality.

# Installation

To install the package, you can use the following npm command:

```bash
npm install modular-api-client --save
```

# Usage

Here's an example of how you might use the package in your code:

## Basic Usage

### Importing the Client

```ts
import {
  ApiClient,
  AxiosBaseApiClient,
  VersionDecorator,
  AuthenticationDecorator,
  HeaderDecorator,
  DataDecorator,
} from "modular-api-client";
```

### Creating an Instance

```ts
const client = new ApiClient(new AxiosBaseApiClient("https://api.example.com"));
```

### Adding Decorators

```ts
client.addDecorator({ decorator: VersionDecorator, params: { version: "v1" } });
client.addDecorator({ decorator: AuthenticationDecorator, params: { token: "Bearar your-token-here" } });
client.addDecorator({ decorator: HeaderDecorator, params: { "X-Custom-Header": "Custom Value" } });
client.addDecorator({ decorator: DataDecorator });
```

### Making Requests

```ts
client.get({ url: "/users/1" }).then((response) => {
  console.log(response);
});
```

### Result

```
request url: https://api.example.com/v1/users/1
request headers: { 'X-Custom-Header': 'Custom Value' , Authorization: 'Bearar your-token-here' }
response: { userId: 1, name: 'John Doe' }
```

## Advanced Usage

### Creating Custom Decorators

Custom decorators allow you to extend the core functionality of the API client and encapsulate specific behavior related to logging, timing, authentication, headers, etc. By following the structure provided, you can create decorators that can be easily added or removed.

#### Implementing a Basic Custom Decorator

```ts
// retry-decorator.js
import { Decorator } from "modular-api-client";

export class RetryDecorator extends Decorator {
  constructor(apiClient, params) {
    super(apiClient);
    this.retries = params.retries;
    this.delay = params.delay;
  }

  get(options) {
    const attempt = async ({ retriesLeft }) => {
      try {
        return await this.apiClient.get(options);
      } catch (error) {
        if (retriesLeft > 0) {
          return new Promise((resolve) => setTimeout(() => resolve(attempt({ retriesLeft: retriesLeft - 1 })), this.delay));
        }
        return Promise.reject(error);
      }
    };

    return attempt({ retriesLeft: this.retries });
  }
}

// index.js
import { ApiClient, AxiosBaseApiClient } from "modular-api-client";

const client = new ApiClient(new AxiosBaseApiClient("https://api.example.com"));
client.addDecorator({ decorator: RetryDecorator, params: { retries: 3, delay: 1000 } });
// this decorator apply only for the 'GET' method
// This request will be retried 3 times with a 1 second delay between each attempt
// if successful, the response will be returned
// if unsuccessful after 3 attempts, the error will be thrown
client.get({ url: "/users/1" }).then((response) => {
  console.log(response);
});

// this decorator apply for all methods
export class RetryDecorator extends Decorator {
    // ...
    all(method, options) {
        const attempt = async ({ retriesLeft }) => {
        try {
            return await this.apiClient[method](options);
            // ...
        }
        // ...
        });
    // ...
    }
}
```
