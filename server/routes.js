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

// Route 1: GET/artwork
const artwork = async function (req, res) {
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
          artworks: data.rows,
        });
      }
    }
  );
};


// Route 2: GET/artist
const artist = async function (req, res) {
  connection.query(
    `
    SELECT c.preferredDisplayName AS artist_name, COUNT(*) AS artwork_count
    FROM objects_constituents oc
    JOIN constituents c ON oc.constituentID = c.constituentID
    WHERE oc.roleType = 'artist'
    GROUP BY c.preferredDisplayName
    ORDER BY artwork_count DESC
    LIMIT 10;
  `,
    (err, data) => {
      if (err) {
        console.log(err);

        res.json({});
      } else {
        res.json({
          Top_10_Artist: data.rows,
        });
      }
    }
  );
};




module.exports = {
  artwork,
  artist,
};
