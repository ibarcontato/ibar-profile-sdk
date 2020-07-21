const isPathInAllowedPaths = require('./is-path-in-allowed-paths');

describe('\n function isPathInAllowedPaths(allowedPaths, path)', () => {
  test('should return true when path is in allowedPaths', () => {
    const allowedPaths = ['GET/existingPath'];
    const path = 'GET/existingPath';

    const expected = true;

    try {
      const received = isPathInAllowedPaths(allowedPaths, path);
      expect(received).toEqual(expected);
    } catch (received) {
      fail();
    }
  })

  test('should return false when path is not in allowedPaths', () => {
    const allowedPaths = ['GET/existingPath'];
    const path = 'GET/nonExistingPath';

    const expected = false;

    try {
      const received = isPathInAllowedPaths(allowedPaths, path);
      expect(received).toEqual(expected);
    } catch (received) {
      fail();
    }
  })

  test('should return error objects when allowedPaths is not valid', () => {
    const allowedPathsList = [1, true, {}, '', () => { }, null, undefined];
    const path = 'GET/existingPath';

    for (let allowedPaths of allowedPathsList) {
      const expected = JSON.stringify({
        statusCode: 400,
        errorMessage: '"allowedPaths" should be a list.',
        inputData: allowedPaths
      });

      try {
        const received = isPathInAllowedPaths(allowedPaths, path);
        fail();
      } catch (received) {
        expect(JSON.parse(received)).toEqual(JSON.parse(expected));
      }
    }
  })

  test('should return error object when path is not valid', () => {
    const allowedPaths = ['GET/existingPath'];
    const paths = [1, true, [], {}, () => {}, null, undefined];

    for (let path of paths) {
      const expected = JSON.stringify({
        statusCode: 400,
        errorMessage: '"path" should be a string.',
        inputData: path
      });

      try {
        const received = isPathInAllowedPaths(allowedPaths, path);
        fail();
      } catch (received) {
        expect(JSON.parse(received)).toEqual(JSON.parse(expected));
      }
    }
  })
})

//
//
//
//