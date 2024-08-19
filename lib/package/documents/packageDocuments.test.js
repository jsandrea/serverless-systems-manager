'use strict';
const packageDocuments = require('./packageDocuments');
const validations = require('../../utils/validations'); 

describe('packageDocuments', () => {
  let serverlessMock;
  let moduleInstance;

  beforeEach(() => {
    serverlessMock = {
      configurationInput: {
        systemsManager: {
          documents: []
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

    moduleInstance = Object.create(packageDocuments);
    moduleInstance.serverless = serverlessMock;
    moduleInstance.validateParameterArray = validations.validateParameterArray
    moduleInstance.validateMandatoryPropValue = validations.validateMandatoryPropValue
    moduleInstance.validateReservedNamePrefix = validations.validateReservedNamePrefix
  });

  describe('packageDocuments', () => {
    it('should do nothing if systemsManager is not provided', async () => {
      moduleInstance.serverless.configurationInput.systemsManager = null;

      const value = await moduleInstance.packageDocuments();

      expect(value).toBeUndefined()
    });
    it('should do nothing if documents is not provided', async () => {
      moduleInstance.serverless.configurationInput.systemsManager = {
        documents: null
      };

      const value = await moduleInstance.packageDocuments();

      expect(value).toBeUndefined()
    });

    it('should add parameter to CloudFormation template', async () => {
      moduleInstance.serverless.configurationInput.systemsManager.documents = [
        {
          name: 'test',
          type: 'Command',
          content: {}
        }
      ];

      await moduleInstance.packageDocuments();

      expect(moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources).toHaveProperty('testCommand');
      const parameter = moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources.testCommand;
      
      expect(parameter).toHaveProperty('Type', 'AWS::SSM::Document');
      expect(parameter.Properties).toHaveProperty('Name', 'test');
      expect(parameter.Properties).toHaveProperty('DocumentType', 'Command');
      expect(parameter.Properties).toHaveProperty('DocumentFormat', 'JSON');
      expect(parameter.Properties).toHaveProperty('Content', {});
    });

    it('should add target type to CloudFormation template', async () => {
      moduleInstance.serverless.configurationInput.systemsManager.documents = [
        {
          name: 'test',
          type: 'Command',
          content: {},
          targetType: "/AWS::EC2::Instance"
        }
      ];

      await moduleInstance.packageDocuments();

      expect(moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources).toHaveProperty('testCommand');
      const parameter = moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources.testCommand;
      
      expect(parameter).toHaveProperty('Type', 'AWS::SSM::Document');
      expect(parameter.Properties).toHaveProperty('Name', 'test');
      expect(parameter.Properties).toHaveProperty('DocumentType', 'Command');
      expect(parameter.Properties).toHaveProperty('DocumentFormat', 'JSON');
      expect(parameter.Properties).toHaveProperty('Content', {});
      expect(parameter.Properties).toHaveProperty('TargetType', "/AWS::EC2::Instance");
    });

    it('should add updateMethod type to CloudFormation template', async () => {
      moduleInstance.serverless.configurationInput.systemsManager.documents = [
        {
          name: 'test',
          type: 'Command',
          content: {},
          updateMethod: "NewVersion"
        }
      ];

      await moduleInstance.packageDocuments();

      expect(moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources).toHaveProperty('testCommand');
      const parameter = moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources.testCommand;
      
      expect(parameter).toHaveProperty('Type', 'AWS::SSM::Document');
      expect(parameter.Properties).toHaveProperty('Name', 'test');
      expect(parameter.Properties).toHaveProperty('DocumentType', 'Command');
      expect(parameter.Properties).toHaveProperty('DocumentFormat', 'JSON');
      expect(parameter.Properties).toHaveProperty('Content', {});
      expect(parameter.Properties).toHaveProperty('UpdateMethod', "NewVersion");
    });

    it('should add versionName type to CloudFormation template', async () => {
      moduleInstance.serverless.configurationInput.systemsManager.documents = [
        {
          name: 'test',
          type: 'Command',
          content: {},
          versionName: "Release1"
        }
      ];

      await moduleInstance.packageDocuments();

      expect(moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources).toHaveProperty('testCommand');
      const parameter = moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources.testCommand;
      
      expect(parameter).toHaveProperty('Type', 'AWS::SSM::Document');
      expect(parameter.Properties).toHaveProperty('Name', 'test');
      expect(parameter.Properties).toHaveProperty('DocumentType', 'Command');
      expect(parameter.Properties).toHaveProperty('DocumentFormat', 'JSON');
      expect(parameter.Properties).toHaveProperty('Content', {});
      expect(parameter.Properties).toHaveProperty('VersionName', "Release1");
    });

    it('should add requires to CloudFormation template', async () => {
      moduleInstance.serverless.configurationInput.systemsManager.documents = [
        {
          name: 'test',
          type: 'Command',
          content: {},
          requires: [{version: "$LATEST",name: "requiredDocument"}]
        }
      ];

      await moduleInstance.packageDocuments();

      expect(moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources).toHaveProperty('testCommand');
      const parameter = moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources.testCommand;
      
      expect(parameter).toHaveProperty('Type', 'AWS::SSM::Document');
      expect(parameter.Properties).toHaveProperty('Name', 'test');
      expect(parameter.Properties).toHaveProperty('DocumentType', 'Command');
      expect(parameter.Properties).toHaveProperty('DocumentFormat', 'JSON');
      expect(parameter.Properties).toHaveProperty('Content', {});
      expect(parameter.Properties).toHaveProperty('Requires', [{Version: "$LATEST",Name: "requiredDocument"}]);
    });

    it('should add requires version to CloudFormation template', async () => {
      moduleInstance.serverless.configurationInput.systemsManager.documents = [
        {
          name: 'test',
          type: 'Command',
          content: {},
          requires: [{name: "requiredDocument"}]
        }
      ];

      await moduleInstance.packageDocuments();

      expect(moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources).toHaveProperty('testCommand');
      const parameter = moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources.testCommand;
      
      expect(parameter).toHaveProperty('Type', 'AWS::SSM::Document');
      expect(parameter.Properties).toHaveProperty('Name', 'test');
      expect(parameter.Properties).toHaveProperty('DocumentType', 'Command');
      expect(parameter.Properties).toHaveProperty('DocumentFormat', 'JSON');
      expect(parameter.Properties).toHaveProperty('Content', {});
      expect(parameter.Properties).toHaveProperty('Requires', [{Name: "requiredDocument"}]);
    });

    it('should add attachments to CloudFormation template', async () => {
      moduleInstance.serverless.configurationInput.systemsManager.documents = [
        {
          name: 'test',
          type: 'Command',
          content: {},
          attachments: [{key: "AttachmentReference",name: "requiredDocument", values: [ "arn:aws:ssm:us-east-2:111122223333:document/OtherAccountDocument/3/their-file.py" ]}]
        }
      ];

      await moduleInstance.packageDocuments();

      expect(moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources).toHaveProperty('testCommand');
      const parameter = moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources.testCommand;

      expect(parameter).toHaveProperty('Type', 'AWS::SSM::Document');
      expect(parameter.Properties).toHaveProperty('Name', 'test');
      expect(parameter.Properties).toHaveProperty('DocumentType', 'Command');
      expect(parameter.Properties).toHaveProperty('DocumentFormat', 'JSON');
      expect(parameter.Properties).toHaveProperty('Content', {});
      expect(parameter.Properties).toHaveProperty('Attachments', [{Key: "AttachmentReference",Name: "requiredDocument", Values: [ "arn:aws:ssm:us-east-2:111122223333:document/OtherAccountDocument/3/their-file.py" ]}]);
    });

    it('should not add attachments name to CloudFormation template', async () => {
      moduleInstance.serverless.configurationInput.systemsManager.documents = [
        {
          name: 'test',
          type: 'Command',
          content: {},
          attachments: [{key: "AttachmentReference", values: [ "arn:aws:ssm:us-east-2:111122223333:document/OtherAccountDocument/3/their-file.py" ]}]
        }
      ];

      await moduleInstance.packageDocuments();

      expect(moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources).toHaveProperty('testCommand');
      const parameter = moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources.testCommand;

      expect(parameter).toHaveProperty('Type', 'AWS::SSM::Document');
      expect(parameter.Properties).toHaveProperty('Name', 'test');
      expect(parameter.Properties).toHaveProperty('DocumentType', 'Command');
      expect(parameter.Properties).toHaveProperty('DocumentFormat', 'JSON');
      expect(parameter.Properties).toHaveProperty('Content', {});
      expect(parameter.Properties).toHaveProperty('Attachments', [{Key: "AttachmentReference", Values: [ "arn:aws:ssm:us-east-2:111122223333:document/OtherAccountDocument/3/their-file.py" ]}]);
    });
    
  })

});
