export const processContractInteractionError = (
  error: Error
): string | undefined => {
  if (error?.message) {
    return error?.message;
  }

  if (!error) {
    return 'An unknown error occurred';
  }

  const errorMessage = error.message.match(/^.*"message":"(.*)"/)?.at(1);

  if (errorMessage) {
    return errorMessage;
  }

  const [, rawErrorString] = error.toString().split('(');

  if (rawErrorString) {
    const errorObj = rawErrorString.split(', ').at(0)?.replace('error=', '');
    try {
      if (!errorObj) {
        throw new Error();
      }

      const parsedError = JSON.parse(errorObj);

      return parsedError.message;
    } catch (error) {
      return 'An unknown error occurred';
    }
  }

  return error?.toString().split('(').at(0);
};
