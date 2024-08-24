'use strict';

const packageMaintenanceWindow = require('./packageMaintenanceWindow');

describe('packageMaintenanceWindow', () => {
  let serverlessMock;
  let moduleInstance;
  
  beforeEach(() => {
    serverlessMock = {
      configurationInput: {
        systemsManager: {
          maintenanceWindow: []
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
  
    moduleInstance = Object.create(packageMaintenanceWindow);
    moduleInstance.serverless = serverlessMock;
  });

  describe('packageMaintenanceWindow', () => {

    it('should do nothing if systemsManager is not provided', async () => {
      moduleInstance.serverless.configurationInput.systemsManager = null;

      console.log = jest.fn();

      const value = await moduleInstance.packageMaintenanceWindow();

      expect(value).toBeUndefined()
    });

    it('should do nothing if systemsManager.maintainanceWindowa is not provided', async () => {
      moduleInstance.serverless.configurationInput.systemsManager.maintenanceWindow = null;

      console.log = jest.fn();

      const value = await moduleInstance.packageMaintenanceWindow();

      expect(value).toBeUndefined()
  });

    it('should add properties to CloudFormation packageMaintenanceWindow template', async () => {
    moduleInstance.serverless.configurationInput.systemsManager.maintenanceWindow = [
      {
        allowUnassociatedTargets: 'false',
        cutoff: 'cutoff',
        duration: 'duration',
        name: 'name',
        schedule: 'schedule'
      }
    ];
      
    await moduleInstance.packageMaintenanceWindow();

    expect(moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources).toHaveProperty('nameMaintenanceWindow');
      const maintenanceWindow = moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources.nameMaintenanceWindow;
    
      expect(maintenanceWindow).toHaveProperty('Type', 'AWS::SSM::MaintenanceWindow');
      expect(maintenanceWindow.Properties).toHaveProperty('AllowUnassociatedTargets', 'false');
      expect(maintenanceWindow.Properties).toHaveProperty('Cutoff', 'cutoff');
      expect(maintenanceWindow.Properties).toHaveProperty('Name', 'name');
      expect(maintenanceWindow.Properties).toHaveProperty('Schedule', 'schedule');
     });
  
    it('should add description to CloudFormation template', async () => {
      moduleInstance.serverless.configurationInput.systemsManager.maintenanceWindow = [
        {
          allowUnassociatedTargets: 'false',
          cutoff: 'cutoff',
          duration: 'duration',
          name: 'name',
          schedule: 'schedule',
          description: 'description'
        }
      ];
  
      await moduleInstance.packageMaintenanceWindow();

      expect(moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources).toHaveProperty('nameMaintenanceWindow');
      const maintenanceWindow = moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources.nameMaintenanceWindow;
      
      expect(maintenanceWindow).toHaveProperty('Type', 'AWS::SSM::MaintenanceWindow');
      expect(maintenanceWindow.Properties).toHaveProperty('AllowUnassociatedTargets', 'false');
      expect(maintenanceWindow.Properties).toHaveProperty('Cutoff', 'cutoff');
      expect(maintenanceWindow.Properties).toHaveProperty('Name', 'name');
      expect(maintenanceWindow.Properties).toHaveProperty('Schedule', 'schedule');
      expect(maintenanceWindow.Properties).toHaveProperty('Description', 'description');
      });

      it('should add Enddate to CloudFormation template', async () => {
        moduleInstance.serverless.configurationInput.systemsManager.maintenanceWindow = [
          {
            allowUnassociatedTargets: 'false',
            cutoff: 'cutoff',
            duration: 'duration',
            name: 'name',
            schedule: 'schedule',
            endDate:'endDate'
          }
        ];
    
          await moduleInstance.packageMaintenanceWindow();
    
          expect(moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources).toHaveProperty('nameMaintenanceWindow');
          const maintenanceWindow = moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources.nameMaintenanceWindow;
          
          expect(maintenanceWindow).toHaveProperty('Type', 'AWS::SSM::MaintenanceWindow');
          expect(maintenanceWindow.Properties).toHaveProperty('AllowUnassociatedTargets', 'false');
          expect(maintenanceWindow.Properties).toHaveProperty('Cutoff', 'cutoff');
          expect(maintenanceWindow.Properties).toHaveProperty('Name', 'name');
          expect(maintenanceWindow.Properties).toHaveProperty('Schedule', 'schedule');
          expect(maintenanceWindow.Properties).toHaveProperty('EndDate', 'endDate');
        });
  
    it('should add ScheduleOffset to CloudFormation template', async () => {
      moduleInstance.serverless.configurationInput.systemsManager.maintenanceWindow = [
        {
          allowUnassociatedTargets: 'false',
          cutoff: 'cutoff',
          duration: 'duration',
          name: 'name',
          schedule: 'schedule',
          scheduleOffset:'scheduleOffset'
        }
      ];
    
          await moduleInstance.packageMaintenanceWindow();
    
          expect(moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources).toHaveProperty('nameMaintenanceWindow');
          const maintenanceWindow = moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources.nameMaintenanceWindow;
          
          expect(maintenanceWindow).toHaveProperty('Type', 'AWS::SSM::MaintenanceWindow');
          expect(maintenanceWindow.Properties).toHaveProperty('AllowUnassociatedTargets', 'false');
          expect(maintenanceWindow.Properties).toHaveProperty('Cutoff', 'cutoff');
          expect(maintenanceWindow.Properties).toHaveProperty('Name', 'name');
          expect(maintenanceWindow.Properties).toHaveProperty('Schedule', 'schedule');
          expect(maintenanceWindow.Properties).toHaveProperty('ScheduleOffset', 'scheduleOffset');
         });
  
    it('should add ScheduleTimezone to CloudFormation template', async () => {
      moduleInstance.serverless.configurationInput.systemsManager.maintenanceWindow = [
        {
          allowUnassociatedTargets: 'false',
          cutoff: 'cutoff',
          duration: 'duration',
          name: 'name',
          schedule: 'schedule',
          scheduleTimezone:'scheduleTimezone'
        }
      ];

      await moduleInstance.packageMaintenanceWindow();

      expect(moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources).toHaveProperty('nameMaintenanceWindow');
      const maintenanceWindow = moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources.nameMaintenanceWindow;
      
      expect(maintenanceWindow).toHaveProperty('Type', 'AWS::SSM::MaintenanceWindow');
      expect(maintenanceWindow.Properties).toHaveProperty('AllowUnassociatedTargets', 'false');
      expect(maintenanceWindow.Properties).toHaveProperty('Cutoff', 'cutoff');
      expect(maintenanceWindow.Properties).toHaveProperty('Name', 'name');
      expect(maintenanceWindow.Properties).toHaveProperty('Schedule', 'schedule');
      expect(maintenanceWindow.Properties).toHaveProperty('ScheduleTimezone', 'scheduleTimezone');
     });
     it('should add StartDate to CloudFormation template', async () => {
      moduleInstance.serverless.configurationInput.systemsManager.maintenanceWindow = [
        {
          allowUnassociatedTargets: 'false',
          cutoff: 'cutoff',
          duration: 'duration',
          name: 'name',
          schedule: 'schedule',
          startDate:'startDate'
        }
      ];

        await moduleInstance.packageMaintenanceWindow();

        expect(moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources).toHaveProperty('nameMaintenanceWindow');
        const maintenanceWindow = moduleInstance.serverless.service.provider.compiledCloudFormationTemplate.Resources.nameMaintenanceWindow;
        
        expect(maintenanceWindow).toHaveProperty('Type', 'AWS::SSM::MaintenanceWindow');
        expect(maintenanceWindow.Properties).toHaveProperty('AllowUnassociatedTargets', 'false');
        expect(maintenanceWindow.Properties).toHaveProperty('Cutoff', 'cutoff');
        expect(maintenanceWindow.Properties).toHaveProperty('Name', 'name');
        expect(maintenanceWindow.Properties).toHaveProperty('Schedule', 'schedule');
        expect(maintenanceWindow.Properties).toHaveProperty('StartDate', 'startDate');
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
  
    describe('validateMandatoryPropValue', () => {
      it('should throw an error if property value is missing', () => {
        expect(() => moduleInstance.validateMandatoryPropValue(null, 'testProp')).toThrowError(
          new serverlessMock.classes.Error('property testProp is mandatory Please check the README for more info.')
        );
      });
  
    });
  })
  });
