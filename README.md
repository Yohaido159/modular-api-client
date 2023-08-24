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
 DataDecorator } from 'modular-api-client';
```

### Creating an Instance
```ts
const client = new ApiClient(new AxiosBaseApiClient('https://api.example.com'));
```

### Adding Decorators
```ts
client.addDecorator({ decorator: VersionDecorator, params: { version: 'v1' } });
client.addDecorator({ decorator: AuthenticationDecorator, params: { token: 'Bearar your-token-here' } });
client.addDecorator({ decorator: HeaderDecorator, params: { 'X-Custom-Header': 'Custom Value' } });
client.addDecorator({ decorator: DataDecorator, params: { 'X-Custom-Header': 'Custom Value' } });
```

### Making Requests
```ts
client.get({ url: '/users/1' }).then(response => {
  console.log(response);
});
```

### result
```
request url: https://api.example.com/v1/users/1
request headers: { 'X-Custom-Header': 'Custom Value' , Authorization: 'Bearar your-token-here' }
response: { userId: 1, name: 'John Doe' }
```

## Advanced Usage
