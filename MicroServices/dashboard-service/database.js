const Pool = require("pg").Pool;

const pool = new Pool({
  user: "ygcgfcmmeklfql",
  password: "afd65f7923413906a331892c42d7ec32efbb71109cecabb99eaf0aafddd0f527",
  host: "ec2-52-215-209-64.eu-west-1.compute.amazonaws.com",
  port: 5432,
  database: "d77ttrmai37fkf",
  ssl: { rejectUnauthorized: false}
});



module.exports = pool;