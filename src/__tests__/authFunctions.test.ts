import { generateAccessToken, generateRefreshToken, authenticateToken } from '../ports/rest/middleware/authentication';

describe('Authentication Functions', () => {
  it('should generate access token', () => {
    const token = generateAccessToken({ userName: 'test', role: 'user' });
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  it('should generate refresh token', () => {
    const token = generateRefreshToken({ userName: 'test', role: 'user' });
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  it('should authenticate token and set user', () => {
    const token = generateAccessToken({ userName: 'test', role: 'user' });
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = {};
    const next = jest.fn();

    authenticateToken(req as any, res as any, next);
    expect(next).toHaveBeenCalled();
  });

  it('should reject request without token', () => {
    const req = { headers: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    authenticateToken(req as any, res as any, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('should reject invalid token', () => {
    const req = { headers: { authorization: 'Bearer invalid' } };
    const res = { sendStatus: jest.fn() };
    const next = jest.fn();

    authenticateToken(req as any, res as any, next);
    expect(res.sendStatus).toHaveBeenCalledWith(403);
  });
});
