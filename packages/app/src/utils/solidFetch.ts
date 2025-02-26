import { HttpClient } from './http/HttpClient';

export const solidFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const httpClient = HttpClient.getInstance();
  return httpClient.fetch(url, {
    ...options,
    retries: 5,
  });
};
