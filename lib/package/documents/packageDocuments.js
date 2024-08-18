'use strict';

const _ = require('lodash');
const BbPromise = require('bluebird');

module.exports = {
  packageDocuments() {
    if(this.serverless.configurationInput.systemsManager != null){
      if(this.serverless.configurationInput.systemsManager.documents != null){
        this.validateParameterArray(this.serverless.configurationInput.systemsManager.documents).forEach(documentsConf => {
          this.validateMandatoryPropValue(documentsConf.name, "Name")
          this.validateReservedNamePrefix(documentsConf.name, [ "aws", "amazon", "amzn", "AWSEC2", "AWSConfigRemediationAWSSupport" ])
          this.validateMandatoryPropValue(documentsConf.type, "Type")
          this.validateMandatoryPropValue(documentsConf.content, "Content")
          const logicalId = `${documentsConf.name.replace(/[^\w]/gi, '')}Command`

          const parameterTemplate = `
            {
              "Type" : "AWS::SSM::Document",
              "Properties" : {
                "DocumentFormat" : "JSON",
                "DocumentType" : "${documentsConf.type}",
                "Name": "${documentsConf.name}"
              }
            }
          `;
     
          const parseTemplate = JSON.parse(parameterTemplate)
          parseTemplate.Properties.Content = documentsConf.content

          if(documentsConf.targetType){
            parseTemplate.Properties.TargetType = documentsConf.targetType
          }

          if(documentsConf.updateMethod){
            parseTemplate.Properties.UpdateMethod = documentsConf.updateMethod
          }

          if(documentsConf.versionName){
            parseTemplate.Properties.VersionName = documentsConf.versionName
          }

          if(documentsConf.attachments){
            const attachments = []
            this.validateParameterArray(documentsConf.attachments).forEach(attachmentsConf => {
              let attachment = {}
              
              if(attachmentsConf.name){
                attachment.Name = attachmentsConf.name
              }
              this.validateMandatoryPropValue(attachmentsConf.values, "Attachments/Values")
              attachment.Values = attachmentsConf.values
              
              this.validateMandatoryPropValue(attachmentsConf.key, "Attachments/Name")
              attachment.Key = attachmentsConf.key
              attachments.push(attachment)
            })
            parseTemplate.Properties.Attachments = attachments
          }

          if(documentsConf.requires){
            const requires = []
            this.validateParameterArray(documentsConf.requires).forEach(requiresConf => {
              let require = {}
              this.validateMandatoryPropValue(requiresConf.name, "Requires/Name")
              require.Name = requiresConf.name
              if(requiresConf.version){
                require.Version = requiresConf.version
              }
              requires.push(require)
            })
            parseTemplate.Properties.Requires = requires
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
  }

  
};
