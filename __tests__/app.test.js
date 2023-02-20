const request = require('supertest')
const app = require('../app')
const db = require('../db/connection.js')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data')

beforeEach(() => seed(testData))
afterAll(() => db.end())


describe("app", () => {
    describe("GET /api/articles", () => {
        test("should return an array of objects with properties", () => {
            return request(app).get('/api/articles').expect(200).then((res) => {
                console.log(res.body)
                // expect(res.body.topics[0]).toMatchObject({
                //     slug: expect.any(String),
                //     description: expect.any(String)
                // })
                // expect(typeof res.body.topics).toBe("object")
            })

        });
    })
});