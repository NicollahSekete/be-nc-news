const request = require('supertest')
const app = require('../app')
const db = require('../db/connection.js')
const seed = require('../db/seeds/seed')
const testData = require('../db/data/test-data')
const { text } = require('express')

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
                    comment_count: expect.any(Number),
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
                expect(checkCommentCount).toBe(2)
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
                expect(result.length).toBeGreaterThan(0)
                result.forEach((element) => {
                    expect(element).toMatchObject({
                        comment_id: expect.any(Number),
                        votes: expect.any(Number),
                        created_at: expect.any(String),
                        author: expect.any(String),
                        body: expect.any(String),
                        article_id: expect.any(Number)
                    })
                });
            })
        });

        test("should return an array of objects in order", () => {
            return request(app).get('/api/articles/1/comments').expect(200).then((res) => {
                const result = res.body.comments
                expect(result).toBeSortedBy('created_at', {
                    descending: true
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

    describe("PATCH /api/articles/:article_id", () => {
        test("Should return  article with updated votes from given article_id", () => {
            return request(app).patch("/api/articles/1").send({ inc_votes: 10 }).expect(200).then(({ body }) => {
                const { article } = body;
                expect(article.article_id).toBe(1);
                expect(article.votes).toBe(110);

                expect(article).toMatchObject({
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: expect.any(Number),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String),
                    body: expect.any(String),
                });
            });
        })

        test("should return 404 when valid but non existent id is passed", () => {
            return request(app).patch('/api/articles/1000').send({ inc_votes: 1 }).expect(404)
                .then(({ body }) => {
                    expect(body.msg).toBe("Not Found")
                })
        })


        test("should return 400  when inc_votes is non-numeric", () => {
            return request(app).patch('/api/articles/1000').send({ inc_votes: "three" }).expect(400)
                .then(({ body }) => {
                    expect(body.msg).toBe("Bad Request")
                })
        })

        test("should return 404 when valid but non existent id is passed", () => {
            return request(app).patch('/api/articles/notANumber').send({ inc_votes: 1 }).expect(400)
                .then(({ body }) => {
                    expect(body.msg).toBe("Bad Request")
                })
        })
    })

    describe(" GET /api/users", () => {
        test("should return all users", () => {
            return request(app).get('/api/users').expect(200).then(({ body }) => {
                const { users } = body;
                expect(Array.isArray(users)).toBe(true);
                expect(users.length).toBeGreaterThan(0)
                users.forEach((element) => {
                    expect(element).toMatchObject({
                        username: expect.any(String),
                        name: expect.any(String),
                        avatar_url: expect.any(String),

                    })
                });
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


        test("expect 400 when when invalid id is passed", () => {
            return request(app).post("/api/articles/invalid/comments").send({
                username: 'icellusedkars',
                body: 'heres the body'
            }).expect(400).then(({ body }) => {
                expect(body.msg).toBe('Bad Request')
            })
        })


        test("expect 404 when valid but non existent id is passed", () => {
            return request(app).post("/api/articles/7777777/comments").send({
                username: 'icellusedkars',
                body: 'iceing'
            }).expect(404).then(({ body }) => {
                expect(body.msg).toBe('Not Found')
            })
        })

    })

    describe("GET /api/articles/:article_id (comment count)", () => {
        test("should return single object including property of comment_count", () => {
            return request(app).get("/api/articles/6").expect(200).then(({ body }) => {
                const { article } = body;

                expect(article).toMatchObject({
                    comment_count: expect.any(Number)
                })

            })
        })
    })


    describe(" GET /api/articles (queries)", () => {
        test("should return articles where topic is specified", () => {
            return request(app).get('/api/articles?topic=mitch').expect(200).then(({ body }) => {
                const { articles } = body
                articles.forEach((element) => {
                    expect(element).toMatchObject({
                        title: expect.any(String),
                        topic: expect.any(String),
                        author: expect.any(String),
                        article_id: expect.any(Number),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        article_img_url: expect.any(String),
                        comment_count: expect.any(Number),
                    })
                });
            })
        })

        test("should return articles where sortby is specified", () => {
            return request(app).get('/api/articles?sort_by=author').expect(200).then(({ body }) => {
                const { articles } = body
                expect(articles).toBeSortedBy('author', {
                    descending: true
                });

            })
        })

        test("should return articles  where order is specified", () => {
            return request(app).get('/api/articles?order=asc').expect(200).then(({ body }) => {
                const { articles } = body
                expect(articles).toBeSortedBy('created_at', {
                    descending: false
                });

            })
        })

        test("should return articles where sortby and order is specified", () => {
            return request(app).get('/api/articles?sort_by=title&order=asc').expect(200).then(({ body }) => {
                const { articles } = body

                expect(articles).toBeSortedBy('title', {
                    descending: false
                });

            })
        })

        test("should return articles where topic, sortby and order is specified", () => {
            return request(app).get('/api/articles?topic=mitch&sort_by=article_id&order=asc').expect(200).then(({ body }) => {
                const { articles } = body
                expect(articles).toBeSortedBy('article_id', {
                    descending: false
                });
            })
        })

        test("should empty array where topic specified exists but has no articles", () => {
            return request(app).get('/api/articles?topic=paper').expect(200).then(({ body }) => {
                const { articles } = body
                expect(articles).toEqual([]);

            })
        })

        test("should return 404 when queried by topic that does not exist", () => {
            return request(app).get('/api/articles?topic=DontExist').expect(404).then(({ body }) => {
                expect(body.msg).toBe('Not Found')
            })
        })

        test("should return 400 for Invalid sort_by query", () => {
            return request(app).get('/api/articles?sort_by=goat&order=asc').expect(400).then(({ body }) => {
                expect(body.msg).toBe('Bad Request')
            })
        })

        test("should return 400 for  Invalid order query", () => {
            return request(app).get('/api/articles?order=popularity').expect(400).then(({ body }) => {
                expect(body.msg).toBe('Bad Request')
            })
        })
    })
});