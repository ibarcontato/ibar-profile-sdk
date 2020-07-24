const { dbGateway } = require('ibar-sdk').database;
const { isObject } = require('ibar-sdk').validations;
const { throwErrorResponseModel } = require('ibar-sdk').throws;

module.exports = async function updateEstabWorkers(estabs, workers, docClient, changedBy) {
  const errorList = [];

  for (let estab of estabs) {
    const putReturn = await dbGateway(docClient, 'Estabs').put({
      updateObject: { workers: workers },
      keys: { id: estab.id },
      changedBy: changedBy
    }).catch(err => err);

    if (!isObject(putReturn))
      errorList.push({ estabId: estab.id, error: JSON.parse(putReturn) }); 
  }

  if (errorList.length != 0)
    throwErrorResponseModel(errorList, 'Error on update estab workers.')
}    