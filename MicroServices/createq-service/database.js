const Pool = require("pg").Pool;

const pool = new Pool({
  user: "ahvawpiqbwmgfv",
  password: "acf6cc460f3fed6a49bbb0ea08341dbd9a3e621341a19d325aa08492c09df29b",
  host: "ec2-34-228-100-83.compute-1.amazonaws.com",
  port: 5432,
  database: "d49egcsotl6tln",
  ssl: { rejectUnauthorized: false}
});



module.exports = pool;