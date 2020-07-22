const getUserWithProfile = require('./get-user-with-profile');

const mockedDocumentClient = class DocumentClient { };
const docClient = new mockedDocumentClient();
const changedBy = 'changedBy';

describe('\n async function getUserWithProfile(profileName, docClient)', () => {
  test('should return filled usersWithProfile when inputs are valid and users are found', async () => {
    const profileName = 'estabAdmin';
    const expected = [{ profiles: [{ name: 'estabAdmin' }], id: 'userId1' }];

    const received = await getUserWithProfile(profileName, docClient).catch(received => received);
    expect(received).toEqual(expected);
  })

  test('should return empty usersWithProfiles when inputs are valid and users are not found', async () => {
    const profileName = 'estabAdmin2';
    const expected = [];

    const received = await getUserWithProfile(profileName, docClient).catch(received => received);
    expect(received).toEqual(expected);
  })

})
