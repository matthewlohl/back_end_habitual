describe('Habits ENDPOINTS', () => {
  let api;

  beforeEach( async () => {
    await resetTestDB()
  });

  beforeAll( async () => {
    api = app.listen(5000, () => console.log('Test server running on port 5000'))
  });

  afterAll( async () => {
    console.log('Stopping test server')
    await api.close()
  })

  it('Returns a list of all Habits in database', async () => {
    const res = await request(api).get('/habits');
    expect(res.statusCode).toEqual(200)
    expect(res.body.length).toEqual(3)
  })
})
