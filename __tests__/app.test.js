const request = require('supertest')
const app = require('../app')
const db = require('../db/connection.js')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data')

beforeEach(() => seed(testData))
afterAll(() => db.end())


describe("app", () => {
    describe("/api", () => {
        test("should return 404 when route does not exist", () => {
            return request(app).get('/api/topic').expect(404).then((res) => {
                expect(res.body.msg).toBe('Path not found')
            })
        });
    })
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

    describe("GET /api/articles/:article_id/comments", () => {
        test("should return an array of objects with expected properties", () => {
            return request(app).get('/api/articles/1/comments').expect(200).then((res) => {
                const result = res.body.comments
                result.forEach((element) => {
                    if (result.length != 0) {
                        expect(element).toMatchObject({
                            comment_id: expect.any(Number),
                            votes: expect.any(Number),
                            created_at: expect.any(String),
                            author: expect.any(String),
                            body: expect.any(String),
                            article_id: expect.any(Number)
                        })
                    }
                });
            })
        });

        test("should return an array of objects in order", () => {
            return request(app).get('/api/articles/1/comments').expect(200).then((res) => {
                const result = res.body.comments
                expect(result).toBeSortedBy('created_at', {
                    descending: true,
                    coerce: true,
                });
            })
        });

        test("should return 200 and empty array when no associated comments exist with passed article_id ", () => {
            return request(app).get('/api/articles/7/comments').expect(200).then((res) => {
                const result = res.body.comments
                expect(result).toEqual([])
            })
        });

        test("should return 404 when valid but non existent id is passed", () => {
            return request(app).get("/api/articles/1123123123/comments").expect(404).then(({ body }) => {
                expect(body.msg).toBe('Not Found')

            })
        })

        test("should return 400 when invalid id is passed", () => {
            return request(app).get("/api/articles/error/comments").expect(400).then(({ body }) => {
                expect(body.msg).toBe('Bad Request')
            })
        })

        test("should return object with expected length", () => {
            return request(app).get("/api/articles/3/comments").expect(200).then((res) => {
                const result = res.body.comments
                expect(Array.isArray(result)).toBe(true)
                expect(result).toHaveLength(2)

            })

        })


    })

    describe("GET /api/articles/article_id", () => {
        test("should return a single object", () => {
            return request(app).get("/api/articles/6").expect(200).then(({ body }) => {
                const { article } = body;
                expect(typeof article).toBe("object")

            })
        })
        test("should return an object with expected properties", () => {
            return request(app).get("/api/articles/6").expect(200).then(({ body }) => {
                const { article } = body;

                expect(article).toMatchObject({
                    title: expect.any(String),
                    topic: expect.any(String),
                    author: expect.any(String),
                    article_id: expect.any(Number),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),
                    body: expect.any(String),
                })

            })
        })

        test("should return 404 when valid but non existent id is passed", () => {
            return request(app).get("/api/articles/1000").expect(404).then(({ body }) => {
                expect(body.msg).toBe('Not Found')

            })
        })

        test("should return 400 when invalid  id is passed", () => {
            return request(app).get("/api/articles/banana").expect(400).then(({ body }) => {
                expect(body.msg).toBe('Bad Request')
            })
        })

    })

});