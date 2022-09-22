const usersController = require ('../../../controllers/auth');
const User = require ('../../../models/user');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn()}))
const mockRes = { status: mockStatus}

describe ('Users Controller', () => {
  beforeEach(() => jest.clearAllMocks());

  afterAll(() => jest.resetAllMocks());

    describe('index', () => {

      test('Returns Users with 200 status code', async () => {
        jest.spyOn(User, 'all', 'get')
          .mockResolvedValue('matt');
        await usersController.index(null, mockRes);
        

        expect(mockJson).toHaveBeenCalledWith(['matt'])
      })
    })
  
})
