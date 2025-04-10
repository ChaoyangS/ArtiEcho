import React, { useEffect, useState } from "react";
import "./NationalityTable.css";
import axios from "axios";

const NationalityTable = () => {
  const [nationalities, setNationalities] = useState([]);
  const nationalityToCountryCode = {
    American: "US",
    French: "fr",
    Italian: "it",
    German: "de",
    British: "gb",
    Dutch: "nl",
    Flemish: "be",
    Czech: "cz",
    Swiss: "ch",
    Austrian: "at",
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/top-nationalities`, {
        headers: {
          "X-API-Token": "artiecho",
        },
      })
      .then((response) => {
        setNationalities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching nationality:", error);
      });
  }, []);

  return (
    <div className="nationality-table-container">
      <div className="table-wrapper">
        <table className="nationality-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nationality</th>
              <th>Number of Artists</th>
            </tr>
          </thead>
          <tbody>
            {nationalities.map((nationality, index) => {
              const code = nationalityToCountryCode[nationality.nationality];

              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {code && (
                      <img
                        src={`https://countryflagsapi.netlify.app/flag/${code.toUpperCase()}.svg`}
                        alt={`${nationality.nationality} flag`}
                        style={{
                          marginRight: "0.5rem",
                          verticalAlign: "middle",
                          height: "1rem",
                        }}
                      />
                    )}
                    {nationality.nationality}
                  </td>
                  <td>{nationality.artist_count}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NationalityTable;
