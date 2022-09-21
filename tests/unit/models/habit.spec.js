const Habit = require('../../../models/Habit');

jest.mock('../../../models/Habit');

// const pg = require ('pg')
// jest.mock('pg')

const db = require('../../../dbConfig/init');

describe('Habit', () => {
  
  beforeEach(() => jest.clearAllMocks())
  afterAll(() => jest.resetAllMocks())

  describe('all', () => {

    test('it resolves with Habits on successful db query', async () => {

      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [{},{},{}]});
      const all = await Habit.all;
      
      expect(all).toHaveLength(3)

    })
  })
})
