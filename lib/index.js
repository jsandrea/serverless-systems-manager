'use strict'
const _ = require('lodash');
const BbPromise = require('bluebird');
const packageParameters = require('./package/parameters/packageParameters');
const packageDocuments= require('./package/documents/packageDocuments');
const validations= require('./utils/validations');
class ServerlessSystemsManager {
  constructor(serverless) {
    this.serverless = serverless;

    this.provider = this.serverless.getProvider('aws');
    this.service = this.serverless.service.service;
    this.region = this.provider.getRegion();
    this.stage = this.provider.getStage();

    Object.assign(
      this,
      validations,
      packageParameters,
      packageDocuments
    )

    this.hooks = {
      'package:compileEvents': ()=> BbPromise.bind(this)
      .then(this.packageParameters)
      .then(this.packageDocuments)
    };
    

  }
}
module.exports = ServerlessSystemsManager