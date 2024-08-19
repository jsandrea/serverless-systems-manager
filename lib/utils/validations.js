

module.exports = {
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
  },

  validateReservedNamePrefix(name, reserveNames){
    if(reserveNames.includes(name)){
      const errorMessage = [
        `${name} name is reserved by AWS `,
        `Reserve Names: ${reserveNames}`,
        ' Please check the README for more info.',
      ].join('');
      throw new this.serverless.classes
        .Error(errorMessage);
    }
  }
}