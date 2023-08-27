import { DecoratorContainer, RequestOptions } from '../allTypes';

export class ApiClient {
  baseClient: any;
  private client: any;
  private decorators: DecoratorContainer[] = [];

  constructor(baseClient: any) {
    this.baseClient = baseClient;
    this.client = this.baseClient;
    this.decorators = [];
  }

  applyDecorators() {
    this.client = this.baseClient;
    for (const decoratorObject of this.decorators) {
      this.applyDecorator(decoratorObject);
    }
  }

  applyDecorator<T>(decoratorContainer: DecoratorContainer<T>) {
    const decoratorObject = this.findDecorator(decoratorContainer);
    if (decoratorObject) {
      this.client = new decoratorObject.decorator(this.client, decoratorObject.params || {}, this.baseClient);
      decoratorObject.decoratorInstance = this.client;
    }
  }

  addDecorator<T>(decoratorContainer: DecoratorContainer<T>) {
    this.decorators.push(decoratorContainer);
    this.applyDecorator(decoratorContainer);
  }

  findDecorator<T>(decoratorContainer: DecoratorContainer): DecoratorContainer<T> | undefined {
    return this.decorators.find((dec) => {
      return dec.decorator === decoratorContainer.decorator;
    });
  }

  removeDecorator(decoratorContainer: DecoratorContainer) {
    const decorator = this.findDecorator(decoratorContainer);
    if (decorator) {
      const index = this.decorators.indexOf(decorator);
      this.decorators[index].decoratorInstance?.cleanup();
      this.decorators.splice(index, 1);
    }
    this.applyDecorators();
  }

  clone(): ApiClient {
    const clone = new ApiClient(this.baseClient);
    clone.decorators = [...this.decorators];
    return clone;
  }

  with(decoratorContainer: DecoratorContainer): ApiClient {
    const clone = this.clone();
    clone.addDecorator(decoratorContainer);
    return clone;
  }

  without(decoratorContainer: DecoratorContainer): ApiClient {
    const clone = this.clone();
    clone.removeDecorator(decoratorContainer);
    return clone;
  }

  get<T = any>(options: RequestOptions): Promise<T> {
    return this.client.get(options);
  }

  post<T = any>(options: RequestOptions): Promise<T> {
    return this.client.post(options);
  }

  put<T = any>(options: RequestOptions): Promise<T> {
    return this.client.put(options);
  }

  delete<T = any>(options: RequestOptions): Promise<T> {
    return this.client.delete(options);
  }
}
