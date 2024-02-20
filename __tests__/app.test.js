const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const db = require("../db/connection");
const jsondata = require('../endpoints.json');

beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  db.end();
});

describe("GET /api/treasures", () => {
  test("Returns 200 response code", () => {
    return request(app).get("/api/topics").expect(200);
  });
  test("Responds with array of topic objects with correct properties", () => {
    return request(app)
    .get("/api/topics")
    .expect(200)
    .then((res) => {
        const topics = res.body.topics;
        expect(topics.length).toBe(3)
        topics.forEach((topic) => {
            expect(topic).toMatchObject({
                slug: expect.any(String),
                description: expect.any(String)
            })
        })
    })
  });
});

describe('GET /api description', () => {
    test('Should respond with an object describing all endpoints', () => {
    return request(app)
        .get("/api")
        .expect(200)
        .then((res) => {
expect(JSON.parse(res.text)).toEqual(jsondata)
        })
    })
})

describe('GET /api/articles/:article_id', () => {
  test('responds with the correct article', () => {
    return request(app)
    .get("/api/articles/2")
    .expect(200)
    .then((res) => {
      const article = res.body.article
      expect(article.title).toBe("Sony Vaio; or, The Laptop")
      expect(article.votes).toBe(0)
      expect(article.author).toBe("icellusedkars")
      expect(article.topic).toBe("mitch")
    })
  });
  test('should respond with an error if given an article_id of invalid type (not a number)', () => {
    return request(app)
    .get("/api/articles/string")
    .expect(400)
    .then((res) => {
      const error = res.body
      expect(error.msg).toBe("bad request")
  });
});
test('should respond with error if given article_id of valid type but which doesnt exist in articles database', () => {
  return request(app)
    .get("/api/articles/50000")
    .expect(404)
    .then((res) => {
      const error = res.body
      expect(error.msg).toBe("id not found")
  });
});
})


describe("404 Path not found", () => {
  test("Returns 404 for path that doesnt exist", () => {
    return request(app)
      .get("/api/invalidpath")
      .expect(404)
      .then((res) => {
        const error = res.body;
        expect(error.msg).toBe("Path not found");
      });
  });
});
