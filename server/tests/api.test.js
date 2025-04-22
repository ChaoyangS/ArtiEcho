const request = require("supertest");
const app = require("../server");

describe("API Tests", () => {
  const token = "artiecho";
  const headers = {
    "X-API-Token": token,
  };

  // test health
  test("GET /health should return 200", async () => {
    const response = await request(app).get("/health").set(headers);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ status: "OK" });
  });

  // test artwork related API
  test("GET /artwork-by-genre should return artwork data", async () => {
    const response = await request(app).get("/artwork-by-genre").set(headers);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });

  test("GET /artist should return artist data", async () => {
    const response = await request(app).get("/artist").set(headers);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });

  test("GET /artwork-by-title should return artwork data", async () => {
    const response = await request(app).get("/artwork-by-title").set(headers);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });

  test("GET /artwork-by-style should return artwork data", async () => {
    const response = await request(app).get("/artwork-by-style").set(headers);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });

  test("GET /artwork-bibliography-search should return bibliography data", async () => {
    const response = await request(app)
      .get("/artwork-bibliography-search")
      .set(headers);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });

  test("GET /artwork-by-nationality should return artwork data", async () => {
    const response = await request(app)
      .get("/artwork-by-nationality")
      .query({
        nationality: "French",
        endYear: "1900",
      })
      .set(headers);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });

  test("GET /top-nationalities should return nationality statistics", async () => {
    const response = await request(app).get("/top-nationalities").set(headers);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });

  test("GET /top-donors should return donor statistics", async () => {
    const response = await request(app).get("/top-donors").set(headers);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });

  // test invalid token
  test("API should reject requests without valid token", async () => {
    const response = await request(app).get("/artwork-by-genre");

    expect(response.statusCode).toBe(401);
  });
});
