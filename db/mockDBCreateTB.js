const pool = require("./mockDB");
const testProduct = [
    { product_id: 1, product_name: "Laptop", category: "Electronics", price: 1000, stock: 5 },
    { product_id: 2, product_name: "Phone", category: "Electronics", price: 500, stock: 10 },
  ];
async function createTestTB() {

  await pool.connect();
  await pool.query(`DROP TABLE IF EXISTS product;`);
  await pool.query(`CREATE TABLE product (product_id SERIAL PRIMARY KEY, 
    product_name VARCHAR (50) NOT NULL, 
    category VARCHAR (50) NOT NULL, 
    price NUMERIC  NOT NULL,
    stock INTEGER  NOT NULL);`);
    for (const p of testProduct) {
        const query = "INSERT INTO product (product_name, category, price, stock) VALUES ($1, $2, $3, $4);";
        const values = [p.product_name, p.category, p.price, p.stock];
        try {
            await pool.query(query, values);
        } catch (error) {
            console.error('Error inserting product:', error);
        }
    }
  await pool.end();
}
// createTestDB();
module.exports = createTestTB;
