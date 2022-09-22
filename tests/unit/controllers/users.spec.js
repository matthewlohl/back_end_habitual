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
          .mockResolvedValue(['matt']);
        await usersController.index(null, mockRes);
        

        expect(mockJson).toHaveBeenCalledWith({'users': ['matt']})
      })
    })
  
})


// "users": [
//   {
//     "id": 1,
//     "username": "Matthew",
//     "email": "matthew@example.com",
//     "password_digest": "123123"
//   }
// ]

// {
//   "id": 1,
//   "habit_name": "drink water",
//   "date_complete": [
//     20220101,
//     20220102,
//     20220103
//   ],
//   "period": 1,
//   "frequency": 5,
//   "frequency_done": 0
// }
