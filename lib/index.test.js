'use strict';

const ServerlessSystemsManager = require('./index');
const packageParameters = require('./package/parameters/packageParameters');
const packageDocuments = require('./package/documents/packageDocuments');

jest.mock('./package/parameters/packageParameters', () => ({
  packageParameters: jest.fn().mockResolvedValue('mockedValue'),
}));

jest.mock('./package/documents/packageDocuments', () => ({
  packageDocuments: jest.fn().mockResolvedValue('mockedValue'),
}));

describe('ServerlessSystemsManager', () => {
  let serverlessMock;
  let serverlessSystemsManager;

  beforeEach(() => {
    serverlessMock = {
      getProvider: jest.fn().mockReturnValue({
        getRegion: jest.fn().mockReturnValue('us-east-1'),
        getStage: jest.fn().mockReturnValue('dev'),
      }),
      service: {
        service: 'myService',
      },
    };

    serverlessSystemsManager = new ServerlessSystemsManager(
      serverlessMock
    );
  });

  test('should initialize with the correct properties', () => {
    expect(serverlessSystemsManager.serverless).toBe(serverlessMock);
    expect(serverlessSystemsManager.provider.getRegion()).toBe('us-east-1');
    expect(serverlessSystemsManager.provider.getStage()).toBe('dev');
    expect(serverlessSystemsManager.service).toBe('myService');
  });

  test('should call packageParameters on compileEvents hook', async () => {
    const hookFunction = serverlessSystemsManager.hooks['package:compileEvents'];

    await hookFunction();

    expect(packageParameters.packageParameters).toHaveBeenCalled();
    expect(packageDocuments.packageDocuments).toHaveBeenCalled();
  });
});