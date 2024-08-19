'use strict';

const _ = require('lodash');
const BbPromise = require('bluebird');
const packageParameters = require('./packageParameters'); 
const validations = require('../../utils/validations'); 

describe('packageParameters', () => {
  let serverlessMock;
  let moduleInstance;

  beforeEach(() => {
    serverlessMock = {
      configurationInput: {
        systemsManager: {
          parameters: []
        }
      },
      service: {
        provider: {
          compiledCloudFormationTemplate: {
            Resources: {}
          }
        }
      },
      classes: {
        Error: class extends Error {},
      }
    };

    moduleInstance = Object.create(packageParameters);
    moduleInstance.serverless = serverlessMock;
    moduleInstance.validateParameterArray = validations.validateParameterArray
    moduleInstance.validateMandatoryPropValue = validations.validateMandatoryPropValue
  });

  describe('packageParameters', () => {
    it('should do nothing if systemsManager is not provided', async () => {
      moduleInstance.serverless.configurationInput.systemsManager = null;

      console.log = jest.fn();

      const value = await moduleInstance.packageParameters();

      expect(value).toBeUndefined()
    });

    it('should do nothing if parameters is not provided', async () => {
      moduleInstance.serverless.configurationInput.systemsManager = {
        parameters: null
      };

      const value = await moduleInstance.packageParameters();

      expect(value).toBeUndefined()
    });



    it('should add parameter to CloudFormation template', async () => {
      moduleInstance.serverless.configurationInput.systemsManager.parameters = [
        {
          type: 'String',
          name: 'TestParameter',
          value: 'TestValue'
        }
      ];

      await moduleInstance.packageParameters();

      expect(moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources).toHaveProperty('TestParameterParameter');
      const parameter = moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources.TestParameterParameter;
      
      expect(parameter).toHaveProperty('Type', 'AWS::SSM::Parameter');
      expect(parameter.Properties).toHaveProperty('Name', 'TestParameter');
      expect(parameter.Properties).toHaveProperty('Type', 'String');
      expect(parameter.Properties).toHaveProperty('Value', 'TestValue');
    });

    it('should add description to CloudFormation template', async () => {
        moduleInstance.serverless.configurationInput.systemsManager.parameters = [
          {
            type: 'String',
            name: 'TestParameter',
            value: 'TestValue',
            description: 'TestDescription'
          }
        ];
  
        await moduleInstance.packageParameters();
  
        expect(moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources).toHaveProperty('TestParameterParameter');
        const parameter = moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources.TestParameterParameter;
        
        expect(parameter).toHaveProperty('Type', 'AWS::SSM::Parameter');
        expect(parameter.Properties).toHaveProperty('Name', 'TestParameter');
        expect(parameter.Properties).toHaveProperty('Type', 'String');
        expect(parameter.Properties).toHaveProperty('Value', 'TestValue');
        expect(parameter.Properties).toHaveProperty('Description', 'TestDescription');
      });
      it('should add allowedPattern to CloudFormation template', async () => {
        moduleInstance.serverless.configurationInput.systemsManager.parameters = [
          {
            type: 'String',
            name: 'TestParameter',
            value: 'TestValue',
            allowedPattern: 'TestallowedPattern'
          }
        ];
  
        await moduleInstance.packageParameters();
  
        expect(moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources).toHaveProperty('TestParameterParameter');
        const parameter = moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources.TestParameterParameter;
        
        expect(parameter).toHaveProperty('Type', 'AWS::SSM::Parameter');
        expect(parameter.Properties).toHaveProperty('Name', 'TestParameter');
        expect(parameter.Properties).toHaveProperty('Type', 'String');
        expect(parameter.Properties).toHaveProperty('Value', 'TestValue');
        expect(parameter.Properties).toHaveProperty('AllowedPattern', 'TestallowedPattern');
      });

      it('should add dataType to CloudFormation template', async () => {
        moduleInstance.serverless.configurationInput.systemsManager.parameters = [
          {
            type: 'String',
            name: 'TestParameter',
            value: 'TestValue',
            dataType: 'TestdataType'
          }
        ];
  
        await moduleInstance.packageParameters();
  
        expect(moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources).toHaveProperty('TestParameterParameter');
        const parameter = moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources.TestParameterParameter;
        
        expect(parameter).toHaveProperty('Type', 'AWS::SSM::Parameter');
        expect(parameter.Properties).toHaveProperty('Name', 'TestParameter');
        expect(parameter.Properties).toHaveProperty('Type', 'String');
        expect(parameter.Properties).toHaveProperty('Value', 'TestValue');
        expect(parameter.Properties).toHaveProperty('DataType', 'TestdataType');
      });
      
    it('should handle policies with Expiration correctly', async () => {
      moduleInstance.serverless.configurationInput.systemsManager.parameters = [
        {
          type: 'String',
          name: 'TestParameterWithPolicy',
          value: 'TestValue',
          policies: [
            {
              type: 'Expiration',
              version: '1',
              attributes: {
                timestamp: '2022-12-31T23:59:59Z'
              }
            }
          ]
        }
      ];

      await moduleInstance.packageParameters();

      const parameter = moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources.TestParameterWithPolicyParameter;
      
      expect(parameter.Properties.Policies).toBe(JSON.stringify([
        {
          Type: 'Expiration',
          Version: '1',
          Attributes: {
            Timestamp: '2022-12-31T23:59:59Z'
          }
        }
      ]));
    });

    it('should handle policies with ExpirationNotification correctly', async () => {
      moduleInstance.serverless.configurationInput.systemsManager.parameters = [
        {
          type: 'String',
          name: 'TestParameterWithPolicy',
          value: 'TestValue',
          policies: [
            {
              type: 'ExpirationNotification',
              version: '1',
              attributes: {
                before: 'TestBefore',
                unit: 'Testunit'
              }
            }
          ]
        }
      ];

      await moduleInstance.packageParameters();

      const parameter = moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources.TestParameterWithPolicyParameter;
      
      expect(parameter.Properties.Policies).toBe(JSON.stringify([
        {
          Type: 'ExpirationNotification',
          Version: '1',
          Attributes: {
            Before: 'TestBefore',
            Unit: 'Testunit'
          }
        }
      ]));
    });


    it('should handle policies with NoChangeNotification correctly', async () => {
      moduleInstance.serverless.configurationInput.systemsManager.parameters = [
        {
          type: 'String',
          name: 'TestParameterWithPolicy',
          value: 'TestValue',
          policies: [
            {
              type: 'NoChangeNotification',
              version: '1',
              attributes: {
                after: 'TestAfter',
                unit: 'Testunit'
              }
            }
          ]
        }
      ];

      await moduleInstance.packageParameters();

      const parameter = moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources.TestParameterWithPolicyParameter;
      
      expect(parameter.Properties.Policies).toBe(JSON.stringify([
        {
          Type: 'NoChangeNotification',
          Version: '1',
          Attributes: {
            After: 'TestAfter',
            Unit: 'Testunit'
          }
        }
      ]));
    });

    it('should change tier to Advanced if it was Standard', async () => {
      moduleInstance.serverless.configurationInput.systemsManager.parameters = [
        {
          type: 'String',
          name: 'TestParameterWithTier',
          value: 'TestValue',
          tier: 'Standard',
          policies: [
            {
              type: 'Expiration',
              version: '1',
              attributes: {
                timestamp: '2022-12-31T23:59:59Z'
              }
            }
          ] 
        }
      ];

      console.log = jest.fn();

      await moduleInstance.packageParameters();

      const parameter = moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources.TestParameterWithTierParameter;
      
      expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Tier property was changed from Standard to Advanced'));
      expect(parameter.Properties.Tier).toBe('Advanced');
    });
  });


  it('should throw error if the policy provided is not valid', async () => {
    moduleInstance.serverless.configurationInput.systemsManager.parameters = [
      {
        type: 'String',
        name: 'TestParameterWithPolicy',
        value: 'TestValue',
        policies: [
          {
            type: 'TestPolicyType'
          }
        ]
      }
    ];
    
    await expect(()=> moduleInstance.packageParameters()).toThrowError(
      new serverlessMock.classes.Error('Not valid policy type was provided Please check the README for more info.')
    );
  });
});
