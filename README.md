# Serverless Systems Manager
This is a serverless plugin that will help you creating the necesary resources for AWS Systems Manager. 

## Requierement

Serverless Framework v3 or later is required

## TOC
  - [Install](#Install)
  - [Configure](#Configure)
    - [Parameter Store](#Parameter-Store) 
  - [License](#License) 

## Install
```
$ npm install serverless-systems-manager --save-dev
```

Add the pluggin to your yml file
```yml 
plugins:
  - serverless-systems-manager
  ```

## Configure

### Parameter Store

* Mandatory Properties

name, type and value are mandatory

```yml 
custom:
  parameters:
    - name: /name/parameter
      type: String
      value: Value
```

* Add Description
```yml 
custom:
  parameters:
    - name: /name/parameter
      type: String
      value: Value
      description: Some description
```

* Parameter Policies 

Tier must be 'Advanced'
```yml 
custom:
  parameters:
    - name: /name/parameter
      type: String
      value: Value
      tier: Advanced
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

* Parameter Pattern
```yml 
custom:
  parameters:
    - name: /name/parameter
      type: String
      value: Value
      allowedPattern: "^[a-zA-Z]{1,10}$"
``` 

* Define DataType

text or aws:ec2:image, text is default
```yml 
custom:
  parameters:
    - name: /name/parameter1
      type: String
      value: Value
      dataType: text
```

* Define Multiple Parameters
```yml 
custom:
  parameters:
    - name: /name/parameter1
      type: String
      value: Value
    - name: /name/parameter2
      type: String
      value: Value
```

## License

[MIT](LICENSE)

