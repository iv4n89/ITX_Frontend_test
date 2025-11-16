import { axiosInstance } from './utils/axios';

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
