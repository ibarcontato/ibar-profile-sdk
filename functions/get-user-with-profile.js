const { dbGateway } = require('ibar-sdk').database;

module.exports = async function getUserWithProfile(profileName, docClient) {
  const allUsers = await dbGateway(docClient, 'Users').scan({ projectionExpression: 'id, profiles' });
  const usersWithProfile = allUsers.items.filter(user => {
    if (user.profiles) {
      const userProfiles = user.profiles.filter(e => e.name == profileName)
      return userProfiles.length > 0;
    }
    return false;
  })

  return usersWithProfile;
}

const a = {
  
}