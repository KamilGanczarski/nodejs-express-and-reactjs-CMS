const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.POSTGRESQL_URI
});

client.connect();

module.exports = {
  query: (text, params) => {
    return new Promise((resolve, reject) => {
      client.query(text, params, (err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(res.rows)
      })
    });
  }
}
