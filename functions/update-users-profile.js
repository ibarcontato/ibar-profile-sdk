const { dbGateway } = require('ibar-sdk').database;
const { isObject } = require('ibar-sdk').validations;

module.exports = async function updateUsersAllowedPath(users, allowedPaths, docClient, changedBy) {
  const errorList = [];

  for (let user of users) {
    user.profiles.map(profile => profile.allowedPaths = allowedPaths);
    const putReturn = await dbGateway(docClient, 'Users').put({
      updateObject: { profiles: user.profiles },
      keys: { id: user.id },
      changedBy: changedBy
    }).catch(e => e)
    if (!isObject(putReturn))
      errorList.push({ userId: user.id, error: JSON.parse(putReturn) });
  }

  return errorList;
} 