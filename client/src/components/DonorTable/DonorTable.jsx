import React, { useEffect, useState } from "react";
import "./DonorTable.css";
import axios from "axios";
import { config } from "../../config"; // 导入配置

const DonorTable = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.API_BASE_URL}/top-donors`, {
        headers: config.API_HEADERS,
      })
      .then((response) => {
        setDonors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching donors:", error);
      });
  }, []);

  return (
    <div className="donor-table-container">
      <div className="table-wrapper">
        <table className="donor-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Donor Name</th>
              <th>Number of Artworks</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{donor.donor_name}</td>
                <td>{donor.artwork_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonorTable;
