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

            if(parameterConf.dataType){
              parseTemplate.Properties.DataType = parameterConf.dataType
            }

            if(parameterConf.tier){
              parseTemplate.Properties.Tier = parameterConf.tier
            }

            if(parameterConf.policies){
              let ArrayOfPolicies=[]  
              this.validateParameterArray(parameterConf.policies)

              parameterConf.policies.forEach(policie =>{
               let policies ={}
                
                  if(policie.type ==="Expiration") {
                    this.validateMandatoryPropValue(policie.attributes.timestamp,'Timestamp for type Expiration')  
                     policies={
                      Type:policie.type,
                      Version: policie.version,
                      Attributes: {
                        Timestamp:policie.attributes.timestamp
                      }
                    }              
                  }else if(policie.type ==="ExpirationNotification"){
                    this.validateMandatoryPropValue(policie.attributes.before,'Before for type ExpirationNotification') 
                    this.validateMandatoryPropValue(policie.attributes.unit,'Unit for type ExpirationNotification') 

                    policies={
                      Type:policie.type,
                      Version: policie.version,
                      Attributes: {
                        Before :policie.attributes.before,
                        Unit:policie.attributes.unit
                      }
                    }
                   }else if(policie.type ==="NoChangeNotification") {
                    this.validateMandatoryPropValue(policie.attributes.after,'After for type NoChangeNotification') 
                    this.validateMandatoryPropValue(policie.attributes.unit,'Unit for type NoChangeNotification') 

                    policies={
                      Type:policie.type,
                      Version: policie.version,
                      Attributes: {
                        After :policie.attributes.after,
                        Unit:policie.attributes.unit
                      }
                    }
                   }else{
                    const errorMessage = [
                      'Not valid policy type was provided',
                      ' Please check the README for more info.',
                    ].join('');
                    throw new this.serverless.classes
                      .Error(errorMessage);
                   }
                  ArrayOfPolicies.push(policies)
              
              })
              
              
               parseTemplate.Properties.Policies = JSON.stringify(ArrayOfPolicies)
               if(parameterConf.tier === "Standard"){
                console.log("*****************************************************************************************") 
                console.log("Tier property was changed from Standard to Advanced. For more information see \n https://docs.aws.amazon.com/systems-manager/latest/userguide/parameter-store-advanced-parameters.html") 
                console.log("*****************************************************************************************") 
 
               }
               
               parseTemplate.Properties.Tier="Advanced"
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
      
    }else{
      console.log("Warning: Systems Manager config was not provided")
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
