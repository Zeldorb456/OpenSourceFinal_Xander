import { generateAccessToken, generateRefreshToken } from '../ports/rest/middleware/authentication';

describe('Authentication Middleware', () => {
  it('should generate access token', () => {
    const user = { userName: 'test', role: 'user' };
    const token = generateAccessToken(user);
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  it('should generate refresh token', () => {
    const user = { userName: 'test', role: 'user' };
    const token = generateRefreshToken(user);
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });
});
