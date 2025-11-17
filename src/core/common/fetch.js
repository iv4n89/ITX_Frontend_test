import { axiosInstance } from './utils/axios';

/**
 * Fetch data using axios instance
 * @param {{ url: string, method: string, body: object, headers?: object }} params
 * @returns {Promise<any>}
 */
export async function fetchData({ url, method, body, headers = {} }) {
  try {
    const response = await axiosInstance.request({
      method,
      url,
      data: body,
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Fetch error: ${error.message}`);
  }
}
