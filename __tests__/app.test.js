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
                expect(res.body.articles[0]).toMatchObject({
                    title: expect.any(String),
                    topic: expect.any(String),
                    author: expect.any(String),
                    article_id: expect.any(Number),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),
                    comment_count: expect.any(String),
                })
                expect(typeof res.body.articles).toBe("object")
            })

        });
        test("should return sorted created_at date in descending order", () => {
            return request(app).get('/api/articles').expect(200).then((res) => {
                expect(res.body.articles).toBeSortedBy('created_at', {
                    descending: true,
                    coerce: true,
                });
            })
        });
        test("should return articles with expected length", () => {
            return request(app).get('/api/articles').expect(200).then((res) => {
                expect(res.body.articles).toHaveLength(12);
            })
        })
        test("checks comment_count returns expected value", () => {
            return request(app).get('/api/articles').expect(200).then((res) => {
                const checkCommentCount = Number(res.body.articles[0].comment_count);
                expect(checkCommentCount).toBe(1)
            })

        })
    })
    describe("/api", () => {
        test("should return 404 when route does not exist", () => {
            return request(app).get('/api/topic').expect(404).then((res) => {
                expect(res.body.msg).toBe('Path not found')
            })
        });
    })

    describe("GET /api/topics", () => {
        test("should return an array of objects with properties of slug and description", () => {
            return request(app).get('/api/topics').expect(200).then((res) => {
                expect(res.body.topics[0]).toMatchObject({
                    slug: expect.any(String),
                    description: expect.any(String)
                })
                expect(typeof res.body.topics).toBe("object")
                expect(res.body.topics).toHaveLength(3)
            })

        });

    })

});