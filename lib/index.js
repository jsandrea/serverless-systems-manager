'use strict'
const _ = require('lodash');
const BbPromise = require('bluebird');
const packageParameters = require('./package/parameters/packageParameters');

class ServerlessSystemsManager {
  constructor(serverless) {
    this.serverless = serverless;

    this.provider = this.serverless.getProvider('aws');
    this.service = this.serverless.service.service;
    this.region = this.provider.getRegion();
    this.stage = this.provider.getStage();

    Object.assign(
      this,
      packageParameters
    )

    this.hooks = {
      'package:compileEvents': ()=> BbPromise.bind(this)
      .then(this.packageParameters)
      
    };
    

  }
}
module.exports = ServerlessSystemsManager