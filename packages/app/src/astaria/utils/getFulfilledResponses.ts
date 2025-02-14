const isFulfilled = <T>(
  promise: PromiseSettledResult<T>
): promise is PromiseFulfilledResult<T> => promise.status === 'fulfilled';

export const getFulfilledResponses = <T>(promises: PromiseSettledResult<T>[]) =>
  promises.filter(isFulfilled).map((result) => result.value);
