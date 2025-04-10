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

// Route 1: GET/artworkByGenre
// Filter artworks by genre(like specific categories: photography, painting, or sculpture);
const artworkByGenre = async function (req, res) {
  const genreInput = req.query.genre || ""; // get genre input

  connection.query(
    `
    SELECT o.objectID, o.title, o.subclassification AS genre,
      o.endYear,
      img.iiifthumburl AS url
    FROM objects o 
    LEFT JOIN published_images img ON o.objectid = img.depictstmsobjectID
      AND img.viewtype = 'primary'
    WHERE o.subclassification ILIKE $1
    ORDER BY o.endYear DESC NULLS LAST
    LIMIT 10;
    `,
    [`%${genreInput}%`],
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Query failed" });
      } else {
        res.json({
          artworks: data.rows,
        });
      }
    }
  );
};

// Route 2: GET/topten-artist
// Find the top 10 artists with the most artworks in the collection;
// Update: more complex query to get top 10 artist with their most latest work(where url is not null)
//          get their life span(attribute: displayDate in constituent table)

const topTenArtist = async function (req, res) {
  connection.query(
    `
    WITH artist_artwork_counts AS (
      SELECT
        c.preferredDisplayName,
        oc.constituentID,
        COUNT(*) AS artwork_count
      FROM objects_constituents oc
      JOIN constituents c ON oc.constituentID = c.constituentID
      WHERE oc.roleType = 'artist'
      GROUP BY c.preferredDisplayName, oc.constituentID
    ),
    ranked_artworks AS (
      SELECT
        oc.constituentID,
        o.objectID,
        o.title AS artwork_title,
        o.endYear,
        img.iiifThumbURL AS url,
        ROW_NUMBER() OVER (
          PARTITION BY oc.constituentID
          ORDER BY o.endYear DESC NULLS LAST
        ) AS rn
      FROM objects_constituents oc
      JOIN objects o ON oc.objectID = o.objectID
      LEFT JOIN published_images img
        ON o.objectID = img.depictstmsobjectID AND img.viewtype = 'primary'
      WHERE oc.roleType = 'artist' AND img.iiifThumbURL IS NOT NULL
    ),
    latest_valid_artworks AS (
      SELECT *
      FROM ranked_artworks
      WHERE rn = 1
    )
    SELECT
      c.preferredDisplayName AS artist_name,
      CASE
        WHEN c.displayDate IS NOT NULL THEN c.displayDate
        WHEN c.beginYear IS NOT NULL AND c.endYear IS NOT NULL THEN CONCAT(c.beginYear, ' - ', c.endYear)
        WHEN c.beginYear IS NOT NULL THEN CONCAT(c.beginYear, ' - ?')
        WHEN c.endYear IS NOT NULL THEN CONCAT('? - ', c.endYear)
        ELSE 'Unknown'
      END AS display_lifespan,
      la.artwork_title,
      la.endYear,
      la.url,
      aac.artwork_count
    FROM artist_artwork_counts aac
    JOIN constituents c ON aac.constituentID = c.constituentID
    JOIN latest_valid_artworks la ON aac.constituentID = la.constituentID
    ORDER BY aac.artwork_count DESC
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

// Route 3: GET/artworkByTitle
const artworkByTitle = async function (req, res) {
  const titleInput = req.query.title || "";

  connection.query(
    `
    SELECT o.title AS artwork_title,
           o.objectID,
           o.beginYear,
           o.endYear,
           c.nationality,
           img.iiifthumburl AS url
    FROM objects o
    LEFT JOIN objects_constituents oc ON o.objectid = oc.objectid
      AND oc.roletype = 'artist'
      AND oc.displayorder = 1
    LEFT JOIN constituents c ON oc.constituentID = c.constituentID
    LEFT JOIN published_images img ON o.objectid = img.depictstmsobjectID
      AND img.viewtype = 'primary'
    WHERE o.title ILIKE $1
    LIMIT 25;
    `,
    [`%${titleInput}%`],
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Query failed" });
      } else {
        res.json(data.rows);
      }
    }
  );
};

// Route 4.1: GET/artworkByStyle/ByGenre
// update on Apr.7: add image url
//                  add subclassInput for choosing genre(e.g. 'drawing', 'sculpture', 'photograph',  'print', 'paint')
//                  add beginYear, endYear for artwork's time period
//                  add "AND img.iiifthumburl,o.beginyear,o.endyear IS NOT NULL"
//                  delete "GROUP BY style, artist_name, artwork_title, o.objectID, artist_name, url" //ORDER BY artwork finish year DESC
const artworkByStyle = async function (req, res) {
  const styleInput = req.query.style || "";
  const subclassInput = req.query.subclass || "";

  connection.query(
    `
    SELECT o.objectID,
           o.title AS artwork_title,
           ot.visualBrowserStyle AS style,
           c.preferredDisplayname AS artist_name,
           o.beginyear AS beginYear,
           o.endyear AS endYear,
           img.iiifthumburl AS url
    FROM objects o
    JOIN objects_constituents oc
      ON o.objectID = oc.objectID AND oc.displayorder = 1
    JOIN objects_terms ot
      ON o.objectID = ot.objectID
    JOIN constituents c
      ON oc.constituentID = c.constituentID
    LEFT JOIN published_images img
      ON o.objectID = img.depictstmsobjectID
      AND img.viewtype = 'primary'
    WHERE oc.roleType = 'artist'
      AND ot.visualBrowserStyle ILIKE $1
      AND o.provenancetext ILIKE $2
      AND img.iiifthumburl IS NOT NULL
    ORDER BY o.endYear DESC NULLS LAST
    LIMIT 10;
    `,
    [`%${styleInput}%`, `%${subclassInput}%`],
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Query failed" });
      } else {
        res.json(data.rows);
      }
    }
  );
};

// Route 4.2: GET /artwork-by-genre?genre=Painting&style=Impression
const artworkByGenreByStyle = async function (req, res) {
  const subclassInput = req.query.subclass || "";
  const styleInput = req.query.style || "";

  connection.query(
    `
    SELECT o.objectID,
           o.title AS artwork_title,
           o.provenancetext AS genre,
           ot.visualBrowserStyle AS style,
           c.preferredDisplayname AS artist_name,
           o.beginyear AS beginYear,
           o.endyear AS endYear,
           img.iiifthumburl AS url
    FROM objects o
    JOIN objects_constituents oc
      ON o.objectID = oc.objectID AND oc.displayorder = 1
    JOIN constituents c
      ON oc.constituentID = c.constituentID
    JOIN objects_terms ot
      ON o.objectID = ot.objectID
    LEFT JOIN published_images img
      ON o.objectID = img.depictstmsobjectID
      AND img.viewtype = 'primary'
    WHERE oc.roleType = 'artist'
      AND o.provenancetext ILIKE $1
      AND ot.visualBrowserStyle ILIKE $2
      AND img.iiifthumburl IS NOT NULL
    ORDER BY o.endYear DESC NULLS LAST
    LIMIT 10;
    `,
    [`%${subclassInput}%`, `%${styleInput}%`],
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Query failed" });
      } else {
        res.json({
          artworks: data.rows,
        });
      }
    }
  );
};

// Route 5: GET/artworkBibliographyByTitle
const artworkBibliographyByTitle = async function (req, res) {
  const title = req.query.title || "";

  connection.query(
    `
    SELECT objectid,
           artwork_title,
           text,
           textType,
           year
    FROM (
        SELECT o.objectid,
               o.title AS artwork_title,
               t.text,
               t.textType,
               t.year,
               ROW_NUMBER() OVER (PARTITION BY o.objectid ORDER BY t.year DESC) AS rn
        FROM objects o
        JOIN objects_text_entries t ON o.objectID = t.objectID
        WHERE t.textType = 'bibliography'
          AND o.title ILIKE $1
    ) sub
    WHERE rn = 1
    LIMIT 25;
    `,
    [`%${title}%`],
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Query failed" });
      } else {
        res.json(data.rows);
      }
    }
  );
};

// Route 6: GET/artworkByNationalityAndEndYear
const artworkByNationalityAndEndYear = async function (req, res) {
  const nationality = req.query.nationality || "";
  // const endYear = req.query.endYear || "";

  connection.query(
    `
    SELECT c.nationality,
           o.title AS artwork_title,
           o.beginYear,
           o.endYear,
           c.preferreddisplayname,
           img.iiifthumburl AS url
    FROM objects o
    JOIN objects_constituents oc
      ON o.objectID = oc.objectID
      AND oc.roletype = 'artist'
      AND oc.displayorder = 1
    JOIN constituents c
      ON oc.constituentID = c.constituentID
    LEFT JOIN published_images img
      ON o.objectID = img.depictstmsobjectID
      AND img.viewtype = 'primary'
    WHERE c.nationality ILIKE $1
      AND o.endYear IS NOT NULL
      AND o.beginYear IS NOT NULL
      AND c.nationality IS NOT NULL
      AND img.iiifthumburl IS NOT NULL
    LIMIT 25;
    `,

    [`%${nationality}%`],
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Query failed" });
      } else {
        res.json(data.rows);
      }
    }
  );
};

// Route 7: GET/topNationalities
// Identify the top 10 most common nationalities of artists in the NGA collection;
const topNationalities = async function (req, res) {
  connection.query(
    `
    SELECT nationality,
           COUNT(*) AS artist_count
    FROM constituents
    WHERE artistOfNGAObject = 1
      AND nationality IS NOT NULL
    GROUP BY nationality
    ORDER BY artist_count DESC
    LIMIT 10;
    `,
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Query failed" });
      } else {
        res.json(data.rows);
      }
    }
  );
};

// Route 8: GET/topDonors
// List the most common donors and the number of artworks they donated.
const topDonors = async function (req, res) {
  connection.query(
    `
    SELECT c.preferredDisplayName AS donor_name,
           COUNT(oc.objectID) AS artwork_count
    FROM objects_constituents oc
    JOIN constituents c ON oc.constituentID = c.constituentID
    WHERE oc.roleType = 'donor'
    GROUP BY c.preferredDisplayName
    ORDER BY artwork_count DESC
    LIMIT 25;
    `,
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Query failed" });
      } else {
        res.json(data.rows);
      }
    }
  );
};

// Route 9: GET/artworkByArtist
const artworkByArtist = async function (req, res) {
  const artist = req.query.artist || "";
  connection.query(
    `
      WITH target_artist AS (
          SELECT constituentID
          FROM constituents
          WHERE preferredDisplayName ILIKE $1
      )

      SELECT o.title AS artwork_title,
            o.objectID,
            o.beginYear,
            o.endYear,
            c.nationality,
            c.preferredDisplayName AS artist_name,
            ot.visualBrowserStyle AS style
      FROM objects o
              LEFT JOIN objects_constituents oc
                        ON o.objectID = oc.objectID
                            AND oc.roleType = 'artist'
                            AND oc.displayOrder = 1
              LEFT JOIN constituents c
                        ON oc.constituentID = c.constituentID
              LEFT JOIN objects_terms ot
                        ON o.objectID = ot.objectID
      WHERE EXISTS (
          SELECT 1
          FROM target_artist ta
          WHERE ta.constituentID = c.constituentID
      )
      and ot.visualBrowserStyle is not null
      ORDER BY o.endYear DESC
      LIMIT 25;
    `,
    [`%${artist}%`],
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Query failed" });
      } else {
        res.json(data.rows);
      }
    }
  );
};

// Route 10: GET/artworkCountByYear
const artworkCountByYear = async function (req, res) {
  connection.query(
    `
    SELECT endyear, COUNT(objectid) AS count
    FROM objects
    WHERE endyear IS NOT NULL 
        AND endyear <= EXTRACT(YEAR FROM CURRENT_DATE)
    GROUP BY endyear
    ORDER BY endyear DESC;
    `,
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Query failed" });
      } else {
        res.json(data.rows);
      }
    }
  );
};



const artworkbyID = async function (req, res) {
  const id = req.query.id;
  connection.query(
    `
    SELECT o.objectID,
           o.title,
           o.provenancetext AS genre,
           c.preferredDisplayname AS artist_name,
           o.beginyear,
           o.endyear,
           img.iiifthumburl AS url
    FROM objects o
    JOIN objects_constituents oc 
        ON o.objectID = oc.objectID 
        AND oc.roletype = 'artist' 
        AND oc.displayorder = 1
    JOIN constituents c 
        ON oc.constituentID = c.constituentID
    LEFT JOIN published_images img 
        ON o.objectID = img.depictstmsobjectID
        AND img.viewtype = 'primary'
    WHERE o.objectID = $1;
    `,
    [id],
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Query failed" });
      } else {
        res.json(data.rows);
      }
    }
  );
};


module.exports = {
  artworkByGenre,
  topTenArtist,
  artworkByTitle,
  artworkByStyle,
  artworkByGenreByStyle,
  artworkBibliographyByTitle,
  artworkByNationalityAndEndYear,
  topNationalities,
  topDonors,
  artworkByArtist,
  artworkCountByYear,
  artworkbyID,
};
