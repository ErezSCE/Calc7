import request from 'supertest';
import { app } from './server';

describe('Health check endpoint', () => {
  it('should return status ok with timestamp and log response time', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('timestamp');
    // Verify timestamp is a valid ISO string
    const date = new Date(response.body.timestamp);
    expect(date.toISOString()).toBe(response.body.timestamp);
    // Ensure console.log was called with response time info
    expect(consoleSpy).toHaveBeenCalled();
    const logArg = consoleSpy.mock.calls[0][0] as string;
    expect(logArg).toMatch(/Health check response time: .* ms/);
    consoleSpy.mockRestore();
  });
});
