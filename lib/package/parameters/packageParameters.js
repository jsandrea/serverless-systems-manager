'use strict';

const _ = require('lodash');
const BbPromise = require('bluebird');

module.exports = {
  packageParameters() {
    if(this.serverless.configurationInput.systemsManager != null){
      if(this.serverless.configurationInput.systemsManager.parameters != null){
        this.validateParameterArray(this.serverless.configurationInput.systemsManager.parameters).forEach(parameterConf => {

          this.validateMandatoryPropValue(parameterConf.type, "type")
          this.validateMandatoryPropValue(parameterConf.name, "name")
          this.validateMandatoryPropValue(parameterConf.value, "value")

          const logicalId = `${parameterConf.name.replace(/[^\w\s]/gi, '')}Parameter`

          const parameterTemplate = `
              {
                "Type" : "AWS::SSM::Parameter",
                "Properties" : {
                    "Name" : "${parameterConf.name}",
                    "Type" : "${parameterConf.type}",
                    "Value" : "${parameterConf.value}"
                  }
              }
            `;

            const parseTemplate = JSON.parse(parameterTemplate)
            if(parameterConf.allowedPattern){
              parseTemplate.Properties.AllowedPattern = parameterConf.allowedPattern
            }

            if(parameterConf.description){
              parseTemplate.Properties.Description = parameterConf.description
            }
            
            const newParameterObject = {
              [logicalId]:parseTemplate,
            };

            _.merge(this.serverless.service.provider.compiledCloudFormationTemplate.Resources,
                newParameterObject);
        });
      }else {
        const errorMessage = [
          'parameters property must not be empty',
          ' Please check the README for more info.',
        ].join('');
        throw new this.serverless.classes
          .Error(errorMessage);
      }
      
    }
    

    return BbPromise.resolve();
  },

  validateParameterArray(paramaters) {    
    if (!Array.isArray(paramaters)) {
      
      const errorMessage = [
        'parameters property is not an array',
        ' Please check the README for more info.',
      ].join('');
      throw new this.serverless.classes
        .Error(errorMessage);
    }
    return paramaters;
  },

  validateMandatoryPropValue(propValue, propName){
    if(!propValue){
      const errorMessage = [
        `parameters ${propName} is mandatory`,
        ' Please check the README for more info.',
      ].join('');
      throw new this.serverless.classes
        .Error(errorMessage);
    }
  }
};
