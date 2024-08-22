'use strict'
const _ = require('lodash');
const BbPromise = require('bluebird');
const packageParameters = require('./package/parameters/packageParameters');
const packageMaintenanceWindow = require('./package/parameters/packageMaintenanceWindow');

class ServerlessSystemsManager {
  constructor(serverless) {
    this.serverless = serverless;

    this.provider = this.serverless.getProvider('aws');
    this.service = this.serverless.service.service;
    this.region = this.provider.getRegion();
    this.stage = this.provider.getStage();

    Object.assign(
      this,
      packageParameters,
      packageMaintenanceWindow
    )

    this.hooks = {
      'package:compileEvents': ()=> BbPromise.bind(this)
      .then(this.packageParameters)
      .then(this.packageMaintenanceWindow)
    }
      
      
    };
    

  }
module.exports = ServerlessSystemsManager