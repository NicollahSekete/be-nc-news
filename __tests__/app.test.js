const request = require('supertest')
const app = require('../app')
const db = require('../db/connection.js')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data')

beforeEach(() => seed(testData))
afterAll(() => db.end())


describe("app", () => {
    describe("GET /api/topics", () => {
        test("should return an array of objects with properties of slug and description", () => {
            return request(app).get('/api/topics').expect(200).then((res) => {
                expect(res.body.topics[0]).toMatchObject({
                    slug: expect.any(String),
                    description: expect.any(String)
                })
                expect(typeof res.body.topics).toBe("object")
            })

        });
        // test("should return sorted data by slug ASC", () => {
        //     return request(app).get('/api/topics').expect(200).then((res) => {

        //         const topics = res.body.topics
        //         expect(topics).toBeSortedBy('slug', { ascending: true })
        //     })

        // });
        test("should return 404 when route does not exist", () => {
            return request(app).get('/api/topic').expect(404).then((res) => {

                expect(res.res.statusMessage).toBe('Not Found')
            })

        });

    })

});