const axios = require("axios");
const assert = require("assert");
const nock = require("nock");

// Mock GET
nock("https://reqres.in").get("/api/users").query({ page: 2 }).reply(200, {
  page: 2,
  per_page: 6,
  total: 12,
  total_pages: 2,
  data: [],
});

// Mock POST
nock("https://reqres.in")
  .post("/api/users")
  .reply(201, { name: "morpheus", job: "leader" });

// Mock PATCH
nock("https://reqres.in")
  .patch("/api/users/2")
  .reply(200, { name: "neo", job: "the one" });

// Mock DELETE
nock("https://reqres.in").delete("/api/users/2").reply(204);

describe("API Automation Reqres.in", () => {
  const api = axios.create({ baseURL: "https://reqres.in/api" });

  it("GET List Users", async () => {
    const response = await api.get("/users?page=2");
    assert.strictEqual(response.status, 200);
  });

  it("POST Create User", async () => {
    const response = await api.post("/users", {
      name: "morpheus",
      job: "leader",
    });
    assert.strictEqual(response.status, 201);
  });

  it("PATCH Update User", async () => {
    const response = await api.patch("/users/2", {
      name: "neo",
      job: "the one",
    });
    assert.strictEqual(response.status, 200);
  });

  it("DELETE User", async () => {
    const response = await api.delete("/users/2");
    assert.strictEqual(response.status, 204);
  });
});
