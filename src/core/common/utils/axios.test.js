import { describe, expect, it } from 'vitest';
import { axiosInstance } from './axios';

describe('axiosInstance', () => {
  it('should be defined', () => {
    expect(axiosInstance).toBeDefined();
  });

  it('should have correct baseURL', () => {
    expect(axiosInstance.defaults.baseURL).toBe(
      import.meta.env.VITE_API_BASE_URL
    );
  });

  it('should have correct default headers', () => {
    expect(axiosInstance.defaults.headers['Content-Type']).toBe(
      'application/json'
    );
  });
});
