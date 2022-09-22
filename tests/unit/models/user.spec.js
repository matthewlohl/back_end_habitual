const pg = require('pg');

jest.mock('pg');

const db = require('../../../dbConfig/init');
const User = require('../../../models/user');

describe('User model', () => {
  beforeEach(() => jest.clearAllMocks())

  afterAll(() => jest.resetAllMocks())

  describe('All', () => {

    test('Resolves with habits on db query', async () => {
      
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [{}, {}, {}]});
      const all = await User.all
      expect(all).toHaveLength(3)
    })
  })

})
