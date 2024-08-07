# Serverless Systems Manager
This is a serverless pluggin that will help you creating the necesary resources for AWS Systems Manager. 

## Install
`$ npm install serverless-systems-manager --save-dev`

Add the pluggin to your yml file
```yml 
plugins:
  - serverless-systems-manager
  ```


## Configure

* Parameter Store

```yml 
custom:
  parameters:
- name: /name/parameter
      type: String
      value: Value
      tier: Advanced
      description: Some description
      allowedPattern: "^[a-zA-Z]{1,10}$"
      datatype: text
      policies: 
        - type: Expiration
          version: '1.0'
          attributes:
            timestamp: '2025-12-02T21:34:33.000Z'
        - type: ExpirationNotification
          version: '1.0'
          attributes:
            before: "15"
            unit: "Days"
        - type: NoChangeNotification
          version: '1.0'
          attributes:
            before: "15"
```
