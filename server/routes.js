const { Pool, types } = require("pg");
const config = require("./config.json");

// Override the default parsing for BIGINT (PostgreSQL type ID 20)
types.setTypeParser(20, (val) => parseInt(val, 10)); //DO NOT DELETE THIS

// Create PostgreSQL connection using database credentials provided in config.json
// Do not edit. If the connection fails, make sure to check that config.json is filled out correctly
const connection = new Pool({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db,
  ssl: {
    rejectUnauthorized: false,
  },
});
connection.connect((err) => err && console.log(err));

// /********************************
//  * ROUTES *
//  ********************************/

// Route 1: GET /artwork
const artwork = async function (req, res) {
  // you can use a ternary operator to check the value of request query values
  // which can be particularly useful for setting the default value of queries
  // note if users do not provide a value for the query it will be undefined, which is falsey
  //   const explicit = req.query.explicit === "true" ? 1 : 0;

  // Here is a complete example of how to query the database in JavaScript.
  // Only a small change (unrelated to querying) is required for TASK 3 in this route.
  connection.query(
    `
    SELECT objectID, title, subclassification
    FROM  objects
    WHERE  subclassification IN ('Drawing', 'Sculpture', 'Photograph',  'Print', 'Painting')
    LIMIT 10;
  `,
    (err, data) => {
      if (err) {
        console.log(err);

        res.json({});
      } else {
        res.json({
          song_ID: data.rows[1],
        });
      }
    }
  );
};




module.exports = {
  artwork,
};
