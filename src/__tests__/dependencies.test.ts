import dependencies from '../infrastructure/dependencies';

describe('Dependencies', () => {
  it('should export mongoDbClient', () => {
    expect(dependencies).toBeDefined();
    expect(dependencies.mongoDbClient).toBeDefined();
  });
});
