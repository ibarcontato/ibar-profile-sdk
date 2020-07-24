const updateEstabWorkers = require('./update-estab-workers');

const mockedDocumentClient = class DocumentClient { };
const docClient = new mockedDocumentClient();
const changedBy = 'changedBy';

describe('\n async function updateEstabWorkers(estabs, workers, docClient, changedBy)', () => {
  test('should return undefined when all inputs are valid', async () => {
    const estabs = [
      { hashId: 'hashId1', id: 'estabId1', workers: ['userId1', 'userId2'] },
      { hashId: 'hashId2', id: 'estabId1', workers: ['userId1', 'userId2'] },
      { hashId: 'hashId3', id: 'estabId1', workers: ['userId1', 'userId2'] }
    ];
    const workers = ['userId1', 'userId2', 'userId3'];

    const expected = undefined;

    const received = await updateEstabWorkers(estabs, workers, docClient, changedBy);
    expect(received).toEqual(expected);
  })

  test('should return a error object when an error occurs on user update', async () => {
    const estabs = [
      { hashId: 'hashId1', id: 'estabId1', workers: ['userId1', 'userId2'] },
      { hashId: 'hashId2', id: 'FORCE_ERROR', workers: ['userId1', 'userId2'] },
      { hashId: 'hashId3', id: 'estabId1', workers: ['userId1', 'userId2'] }
    ];
    const workers = ['userId1', 'userId2', 'userId3'];

    const expected = JSON.stringify({
      statusCode: 400, 
      inputData: [{ estabId: 'FORCE_ERROR', error: { errorMessage: 'UPDATE_ERROR_MESSAGE', statusCode: 400 } }],
      errorMessage: 'Error on update estab workers.'
    }); 
 
    const received = await updateEstabWorkers(estabs, workers, docClient, changedBy).catch(e => e);
    expect(JSON.parse(received)).toEqual(JSON.parse(expected));
  })

})
