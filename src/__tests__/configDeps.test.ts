import { config } from '../config/config';
import dependencies from '../infrastructure/dependencies';

describe('Config and Dependencies', () => {
  it('should export config object', () => {
    expect(config).toBeDefined();
    expect(config.environment).toBeDefined();
    expect(config.mongo).toBeDefined();
  });

  it('should export dependencies', () => {
    expect(dependencies).toBeDefined();
    expect(dependencies.mongoDbClient).toBeDefined();
  });
});
