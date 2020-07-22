const updateUsersAllowedPath = require('./update-users-profile');

const mockedDocumentClient = class DocumentClient { };
const docClient = new mockedDocumentClient();
const changedBy = 'changedBy';

describe('\n async function updateUsersAllowedPath(users, allowedPaths, docClient, changedBy)', () => {
  test('should return an empty errorList when all inputs are valid', async () => {
    const users = [
      {
        id: 'user1',
        profiles: [
          { name: 'estabAdmin', allowedPaths: ['POST/order', 'GET/products'], estabs: ['estab 1', 'estab 2'] },
          { name: 'waiter', allowedPaths: ['GET/order', 'GET/products'], estabs: ['estab 1'] },
        ] 
      }
    ];
    const allowedPaths = ['POST/order', 'GET/products', 'GET/specials'];

    const expected = [];

    const received = await updateUsersAllowedPath(users, allowedPaths, docClient, changedBy).catch(received => received);
    expect(received).toEqual(expected);
  })

  test('should return a filled errorList when an error occurs on user update', async () => {
    const users = [
      {
        id: 'user1',
        profiles: [
          { name: 'estabAdmin', allowedPaths: ['POST/order', 'GET/products'], estabs: ['estab 1', 'estab 2'] },
          { name: 'waiter', allowedPaths: ['GET/order', 'GET/products'], estabs: ['estab 1'] },
        ]
      },
      {
        id: 'FORCE_ERROR',
        profiles: [
          { name: 'estabAdmin', allowedPaths: ['POST/order', 'GET/products'], estabs: ['estab 1', 'estab 2'] },
          { name: 'waiter', allowedPaths: ['GET/order', 'GET/products'], estabs: ['estab 1'] },
        ]
      }, 
      {
        id: 'user3',
        profiles: [
          { name: 'estabAdmin', allowedPaths: ['POST/order', 'GET/products'], estabs: ['estab 1', 'estab 2'] },
          { name: 'waiter', allowedPaths: ['GET/order', 'GET/products'], estabs: ['estab 1'] },
        ]
      }
    ];
    const allowedPaths = ['POST/order', 'GET/products', 'GET/specials'];

    const expected = [
      {
        userId: 'FORCE_ERROR',
        error: {
          statusCode: 400,
          errorMessage: 'UPDATE_ERROR_MESSAGE'
        }
      }
    ]

    const received = await updateUsersAllowedPath(users, allowedPaths, docClient, changedBy).catch(received => received);
    expect(received).toEqual(expected);
  })

})
