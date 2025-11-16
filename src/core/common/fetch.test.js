import { describe, expect, it, vi } from 'vitest';
import { axiosInstance } from './utils/axios';
import { fetchData } from './fetch';

vi.mock('./utils/axios', () => ({
  axiosInstance: {
    request: vi.fn(),
  },
}));

describe('fetchData', () => {
  it('should fetch data successfully', async () => {
    const mockData = { id: 1, name: 'Test' };
    axiosInstance.request.mockResolvedValue({ data: mockData });

    const result = await fetchData({
      url: '/api/test',
      method: 'GET',
    });

    expect(result).toEqual(mockData);
    expect(axiosInstance.request).toHaveBeenCalledWith({
      method: 'GET',
      url: '/api/test',
      data: undefined,
      headers: {},
    });
  });

  it('should pass body and headers to axios', async () => {
    const mockData = { success: true };
    const body = { name: 'Test' };
    const headers = { 'Content-Type': 'application/json' };

    axiosInstance.request.mockResolvedValue({ data: mockData });

    await fetchData({
      url: '/api/test',
      method: 'POST',
      body,
      headers,
    });

    expect(axiosInstance.request).toHaveBeenCalledWith({
      method: 'POST',
      url: '/api/test',
      data: body,
      headers,
    });
  });

  it('should throw error when request fails', async () => {
    const errorMessage = 'Network error';
    axiosInstance.request.mockRejectedValue(new Error(errorMessage));

    await expect(
      fetchData({ url: '/api/test', method: 'GET' })
    ).rejects.toThrow(`Fetch error: ${errorMessage}`);
  });
});
