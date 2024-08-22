const validations = require('./validations'); 

describe('validations', () => {

  let serverlessMock;
  let moduleInstance;

  beforeEach(() => {
    serverlessMock = {
      classes: {
        Error: class extends Error {},
      }
    };

    moduleInstance = Object.create(validations);
    moduleInstance.serverless = serverlessMock;
  });

  describe('validateMandatoryPropValue', () => {
    it('should throw an error if property value is missing', () => {
      expect(() => moduleInstance.validateMandatoryPropValue(null, 'testProp')).toThrowError(
        new serverlessMock.classes.Error('parameters testProp is mandatory Please check the README for more info.')
      );
    });

    it('should not throw an error if property value is present', () => {
      expect(() => moduleInstance.validateMandatoryPropValue('value', 'testProp')).not.toThrow();
    });
  });

  describe('validateParameterArray', () => {
    it('should throw an error if input is not an array', () => {
      expect(() => moduleInstance.validateParameterArray(null)).toThrowError(
        new serverlessMock.classes.Error('parameters property is not an array Please check the README for more info.')
      );
    });

    it('should return the same array if input is valid', () => {
      const result = moduleInstance.validateParameterArray([{}]);
      expect(result).toEqual([{}]);
    });
  });

  describe('validateReservedNamePrefix', () => {
    const reservedNames= [ "aws", "amazon", "amzn", "AWSEC2", "AWSConfigRemediationAWSSupport" ];
    it('should throw an error if input is reserved name', () => {
      expect(() => moduleInstance.validateReservedNamePrefix('aws', reservedNames)).toThrowError(
        new serverlessMock.classes.Error('aws name is reserved by AWS Reserve Names: aws,amazon,amzn,AWSEC2,AWSConfigRemediationAWSSupport Please check the README for more info.')
      );
    });

    it('should return the same array if input is valid', () => {
      const result = moduleInstance.validateReservedNamePrefix('test', reservedNames);
      expect(result).toBeUndefined()
    });
  });
    
})