exports.database = {
  dbGateway: (docClient, tableName) => {
    const put = (dbParams) => {
      const id = dbParams.keys && dbParams.keys.id;
      if (id === 'FORCE_ERROR')
        return Promise.reject(JSON.stringify({ errorMessage: 'UPDATE_ERROR_MESSAGE', statusCode: 400 }));

      return Promise.resolve({ statusCode: 200 });
    };

    return { put }
  }
}

exports.utils = require('ibar-sdk').utils;
exports.validations = require('ibar-sdk').validations;
exports.models = require('ibar-sdk').models;
exports.throws = require('ibar-sdk').throws;   