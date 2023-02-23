const request = require('supertest')
const app = require('../app')
const db = require('../db/connection.js')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data')
const { text } = require('express')

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

    describe("POST /api/articles/:article_id/comments", () => {
        test("should return expected user and comment", () => {
            return request(app).post("/api/articles/2/comments").send({
                username: 'icellusedkars',
                body: 'such a big fan wow'
            }).expect(201).then((res) => {
                const comment = res.body.comment

                expect(comment.body).toBe("such a big fan wow");
                expect(comment.author).toBe("icellusedkars");
                expect(comment.article_id).toBe(2);
                expect(comment.comment_id).toBe(19);
                expect(comment.votes).toBe(0);
            })
        })

        test("should return expected user and comment and ignore  unnecessary properties", () => {
            return request(app).post("/api/articles/2/comments").send({
                username: 'icellusedkars',
                body: 'such a big fan wow',
                votes: 100
            }).expect(201).then((res) => {
                const comment = res.body.comment
                expect(comment.votes).toBe(0);
            })
        })

        test("expect 400 when missing username", () => {
            return request(app).post("/api/articles/2/comments").send({
                username: '',
                body: 'such a big fan wow'
            }).expect(400).then(({ body }) => {
                expect(body.msg).toBe('Bad Request')
            })

        })

        test("expect 400 when missing body", () => {
            return request(app).post("/api/articles/2/comments").send({
                username: 'icellusedkars',
                body: ''
            }).expect(400).then(({ body }) => {
                expect(body.msg).toBe('Bad Request')
            })

        })

        test("expect 400 when missing both username and body", () => {
            return request(app).post("/api/articles/2/comments").send({
                username: '',
                body: ''
            }).expect(400).then(({ body }) => {
                expect(body.msg).toBe('Bad Request')
            })

        })


        test("expect 400 when missing body", () => {
            return request(app).post("/api/articles/noNumber/comments").send({
                username: 'icellusedkars',
                body: 'heres the body'
            }).expect(400).then(({ body }) => {
                expect(body.msg).toBe('Bad Request')
            })
        })


        test("expect 404 when missing body", () => {
            return request(app).post("/api/articles/7777777/comments").send({
                username: 'icellusedkars',
                body: 'iceing'
            }).expect(404).then(({ body }) => {
                expect(body.msg).toBe('Not Found')
            })
        })


    })

});