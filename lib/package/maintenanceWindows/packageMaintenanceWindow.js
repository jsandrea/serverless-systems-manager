'use strict';

const _ = require('lodash');
const BbPromise = require('bluebird');

module.exports = {
  packageMaintenanceWindow(){
     if(this.serverless.configurationInput.systemsManager != null){
        const maintenanceWindow =this.serverless.configurationInput.systemsManager.maintenanceWindow
        if(maintenanceWindow != null){
            this.validateMandatoryPropValue(maintenanceWindow)
                maintenanceWindow.forEach(maintenanceWindowConf =>{
              
                this.validateMandatoryPropValue(maintenanceWindowConf.allowUnassociatedTargets, "allowUnassociatedTargets")
                this.validateMandatoryPropValue(maintenanceWindowConf.cutoff, "cutoff")
                this.validateMandatoryPropValue(maintenanceWindowConf.duration, "duration")
                this.validateMandatoryPropValue(maintenanceWindowConf.name, "name")
                this.validateMandatoryPropValue(maintenanceWindowConf.schedule, "schedule")

                const logicalId = `${maintenanceWindowConf.name.replace(/[^\w\s]/gi, '')}MaintenanceWindow`


                const maintenanceWindowTemplate = `
                {
                  "Type" : "AWS::SSM::MaintenanceWindow",
                  "Properties" : {
                      "AllowUnassociatedTargets" : "${maintenanceWindowConf.allowUnassociatedTargets}",
                      "Cutoff" : "${maintenanceWindowConf.cutoff}",
                      "Duration" : "${maintenanceWindowConf.duration}",
                      "Name" : "${maintenanceWindowConf.name}",
                      "Schedule" : "${maintenanceWindowConf.schedule}"
                    }
                }
              `;
 
              const parseTemplate = JSON.parse(maintenanceWindowTemplate)
              if(maintenanceWindowConf.description){
                parseTemplate.Properties.Description=maintenanceWindowConf.description
              }
              if(maintenanceWindowConf.endDate){
                parseTemplate.Properties.EndDate=maintenanceWindowConf.endDate
              }
              if(maintenanceWindowConf.scheduleOffset){
                parseTemplate.Properties.ScheduleOffset=maintenanceWindowConf.scheduleOffset
              }
              if(maintenanceWindowConf.scheduleTimezone){
                parseTemplate.Properties.ScheduleTimezone=maintenanceWindowConf.scheduleTimezone
              }
              if(maintenanceWindowConf.startDate){
                parseTemplate.Properties.StartDate=maintenanceWindowConf.startDate
              }
              const newParameterObject = {
                [logicalId]:parseTemplate,
              };

              _.merge(this.serverless.service.provider.compiledCloudFormationTemplate.Resources,
                newParameterObject);
            })
          
        }
    }

    return BbPromise.resolve();
},   
 validateMandatoryPropValue(propValue, propName){
  if(propValue == undefined){
    const errorMessage = [
      `property ${propName} is mandatory`,
      ' Please check the README for more info.',
    ].join('');
    throw new this.serverless.classes
      .Error(errorMessage);
  }
},validateParameterArray(paramaters) {    
  if (!Array.isArray(paramaters)) {
    
    const errorMessage = [
      'parameters property is not an array',
      ' Please check the README for more info.',
    ].join('');
    throw new this.serverless.classes
      .Error(errorMessage);
  }
  return paramaters;
}
}

