# Serverless Systems Manager
This is a serverless plugin that will help you creating the necessary resources for AWS Systems Manager. 

## Requierement

Serverless Framework v3 or later is required

## TOC
  - [Install](#Install)
  - [Configure](#Configure)
    - [Parameter Store](#Parameter-Store) 
    - [Documents](#Documents)
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
systemsManager:
  parameters:
    - name: /name/parameter
      type: String
      value: Value
```

* Add Description
```yml 
systemsManager:
  parameters:
    - name: /name/parameter
      type: String
      value: Value
      description: Some description
```

* Parameter Policies 

Tier must be 'Advanced'
```yml 
systemsManager:
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
            after: "15"
            unit: "Days"
```

* Parameter Pattern
```yml 
systemsManager:
  parameters:
    - name: /name/parameter
      type: String
      value: Value
      allowedPattern: "^[a-zA-Z]{1,10}$"
``` 

* Define DataType

text or aws:ec2:image, text is default
```yml 
systemsManager:
  parameters:
    - name: /name/parameter1
      type: String
      value: Value
      dataType: text
```

* Define Multiple Parameters
```yml 
systemsManager:
  parameters:
    - name: /name/parameter1
      type: String
      value: Value
    - name: /name/parameter2
      type: String
      value: Value
```

### Documents

Creates a Systems Manager (SSM) document in AWS Systems Manager for D
document types:

ApplicationConfiguration | ApplicationConfigurationSchema | Automation | Automation.ChangeTemplate | ChangeCalendar | CloudFormation | Command | DeploymentStrategy | Package | Policy | ProblemAnalysis | ProblemAnalysisTemplate | Session


* Mandatory Properties

name,type,content
```yml 
systemsManager:
  documents:
    - name: testDocument
      type: Command
      content:
        schemaVersion: "2.2"
        description: "Command Document Example"
        mainSteps:
        - action: "aws:runPowerShellScript"
          name: "example"
          inputs:
            runCommand:
            - "Write-Output {{Message}}"
```

* Define content in other file

It's recomended to have a seperate file with document's content to improve readability

```yml 
systemsManager:
  documents:
    - name: testDocument
      type: Command
      content:
       ${file(testDocumentContent.yml)}
```

* Define versioning

For versioning porpuse, update Method "NewVersion" will automatically version your doucment
```yml 
systemsManager:
  documents:
    - name: testDocument
      type: Command
      updateMethod: NewVersion
      content:
       ${file(testDocumentContent.yml)}
```

* Define Target type

```yml 
systemsManager:
  documents:
    - name: testDocument
      type: Command
      targetType: /AWS::EC2::Instance
      content:
       ${file(testDocumentContent.yml)}
```

* Define Attachments

If attachments are defined, key and values are mandatory
```yml 
systemsManager:
  documents:
    - name: testDocument
      type: Command
      attachments:
        - key: AttachmentReference
          name: testFile
          values: 
            - "arn:aws:ssm:us-east-2:111122223333:document/OtherAccountDocument/3/their-file.py" 
      content:
       ${file(testDocumentContent.yml)}
```

* Define Required Documents

If requires are defined, name it's mandatory
```yml 
systemsManager:
  documents:
    - name: testDocument
      type: Command
      requires:
        - version: $LATEST
          name: requiredDocument
      content:
       ${file(testDocumentContent.yml)}
```

* Define multiple documents

It can be created many documents or documents types as you require
```yml 
systemsManager:
  documents:
    - name: testDocument
      type: Command
      content:
       ${file(testDocumentContent.yml)}
    - name: testSession
      type: Session
      content:
       ${file(tesSessionContent.yml)}
    - name: testSession
      type: Automation
      content:   
       ${file(tesAutomationContent.yml)}
```

## License

[MIT](LICENSE)

