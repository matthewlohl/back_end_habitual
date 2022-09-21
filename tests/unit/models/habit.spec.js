const Book = require ('../../../models/habit')

const pg = require ('pg');

jest.mock('pg');

const db = require('../../../dbConfig/init');
const Habit = require('../../../models/habit');

describe('Habit model', () => {

  beforeEach(() => jest.clearAllMocks())

  afterAll(() => jest.resetAllMocks())

  describe('All', () => {

    test('Resolves with habits on db query', async () => {
      
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [{}, {}, {}]});
      const all = await Habit.all
      expect(all).toHaveLength(3)
    })
  })

  describe('findById', () => {
    test('Resolves with Habit on successful db query', async () => {
        let habitData = { id: 2, habit_name: 'Test Habit'}
        
        jest.spyOn(db, 'query')
            .mockResolvedValueOnce({rows: [{habitData}] });
        const result = await Habit.findById(2);
        
        expect(result).toBeInstanceOf(Book)
    })

  describe('Create', () => {

    test('Resolve with habits on successful db query', async () => {

      let habitData = {habit_name: 'Test Habit', period: 2, frequency: 3}

      jest.spyOn(db, 'query')
        .mockResolvedValueOnce ({ rows: [{...habitData, id: 1}] });
      
      const result = await Habit.create(habitData);
      expect(result).toHaveProperty('id')
    
    })
  })

  describe('Delete', () => {

    test('Resolves with message on successful db query', async () => {

      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({id:1})

      let habitData = new Habit ({ id: 1, habit_name: 'Test Habit'})
      const result = await habitData.delete();

      expect(result).toBe('Habit was deleted')
    })
  })
});


})
