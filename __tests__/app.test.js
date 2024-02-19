const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const db = require("../db/connection");

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
