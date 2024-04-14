const request = require("supertest");
const app = require("./index");
const createTestTB = require('./db/mockDBCreateTB');

test("GET/products", async () => {
  const response = await request(app).get("/products");
  expect(response.statusCode).toBe(200);
});

describe("GET/products/:id", () => {
  test("Success Case", async () => {
    const response = await request(app).get("/products/1");
    expect(response.statusCode).toBe(200);
  });
  test("Not Found Case", async () => {
    const response = await request(app).get("/products/100");
    expect(response.statusCode).toBe(404);
  });
});

describe("POST/products", () => {
  test("Success Case", async () => {
    const response = await request(app).post("/products").send({
      name: "newProduct",
      category: "Food",
      price: 100,
      stock: 10,
    });
    expect(response.statusCode).toBe(200);
  });
  test("Missing Input Case", async () => {
    const response = await request(app).post("/products").send({
      name: "newProduct",
      category: "",
      price: 100,
      stock: 10,
    });
    expect(response.statusCode).toBe(400);
  });
  test("Wrong Type of Input Case", async () => {
    const response = await request(app).post("/products").send({
      name: "newProduct",
      category: "Food",
      price: "100",
      stock: 10,
    });
    expect(response.statusCode).toBe(400);
  });
});

describe("PUT/products/:id", () => {
  test("Success Case", async () => {
    const response = await request(app).put("/products/2").send({
      name: "editProduct",
      category: "Drink",
      price: 10,
      stock: 100,
    });
    expect(response.statusCode).toBe(200);
  });
  test("Not Found Case", async () => {
    const response = await request(app).put("/products/100").send({
      name: "editProduct",
      category: "Drink",
      price: 10,
      stock: 100,
    });
    expect(response.statusCode).toBe(404);
  });
  test("Missing Input Case", async () => {
    const response = await request(app).put("/products/2").send({
        name: "",
        category: "Drink",
        price: 10,
        stock: 100,
    });
    expect(response.statusCode).toBe(400);
  });
  test("Wrong Type of Input Case", async () => {
    const response = await request(app).put("/products/2").send({
        name: "editProduct",
        category: "Drink",
        price: 10,
        stock: "100",
    });
    expect(response.statusCode).toBe(400);
  });
});

describe("DELETE/products/:id", () => {
  test("Success Case", async () => {
    const response = await request(app).delete("/products/2");
    expect(response.statusCode).toBe(200);
  });
  test("Not Found Case", async () => {
    const response = await request(app).delete("/products/100");
    expect(response.statusCode).toBe(404);
    createTestTB();
  });
});
