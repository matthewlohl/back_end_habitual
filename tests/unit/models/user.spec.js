const pg = require('pg');

jest.mock('pg');

const db = require('../../../dbConfig/init');
const User = require('../../../models/user');

describe('User model', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMock())

    describe('All', () => {
        test('Resolves with habits on db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ row: [{}, {}, {}]});
            const all = await User.all
            expect(all).toHaveLength(3)
        })
    })

    describe('findById', () => {
        test('Resolves with User on successful db query', async () => {
            let userData = {id: 1, user_name: 'Bradley'}

            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({row: [{userData}]});
            const result = await User.findById(1);

            expect (result).toBeInstanceOf(User)
        })
    })
})
