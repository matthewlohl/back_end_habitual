const habitsController = require ('../../../controllers/habits');
const Habit = require ('../../../models/habit');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn()}))
const mockRes = { status: mockStatus}

describe('Habits Controller', () => {

  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

  describe('index', () => {

    test('Returns Habits with 200 status code', async () => {
      jest.spyOn(Habit, 'all', 'get')
        .mockResolvedValue(['habit1', 'habit2']);
      await habitsController.index(null, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(['habit1', 'habit2'])
    })
  })

  describe('show', () => {

    test('Returns a habit by id with 200 status code', async () => {
      let testHabit = {
        id: 1, habit_name: 'Test Habit',
        date_complete: [20220921], period: 1,
        frequency: 2, frequency_done:0
      }
      jest.spyOn(Habit, 'findById')
        .mockResolvedValue(new Habit(testHabit));
      
      const mockReq = {params: {id:1}}
      await habitsController.show(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(200)
      expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit))
    })
  })

  describe('Create', () => {

    test('Create a new habit with 200 status', async () => {
      let testHabit = {
        id: 1, habit_name: 'Test Habit',
        date_complete: [20220921], period: 1,
        frequency: 2, frequency_done:0
      }
    jest.spyOn(Habit, 'create')
      .mockResolvedValue(new Habit(testHabit))
    
    const mockReq = {body: testHabit}
    await habitsController.create(mockReq, mockRes);
    expect(mockStatus).toHaveBeenCalledWith(201)
    expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit))
    })
  })

 describe('Destroy', () => {

    test('Returns a 204 status on successful deletion', async () => {
      jest.spyOn(Habit.prototype, 'delete')
        .mockResolvedValue('Deleted')
      
      const mockReq = { params: {id:1}}
      await habitsController.destroy(mockReq, mockRes);
      expect(mockStatus).toHaveBeenCalledWith(204)
    })
 })

})
