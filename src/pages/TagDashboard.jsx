import React, { useState, useEffect } from "react";

const TagDashboard = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("https://anubhava-backend.vercel.app/companies")
      .then((response) => response.json())
      .then((data) => setCompanies(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>TagDashboard</h1>
      <div>
        {companies.map((company) => (
          <div key={company._id}>
            <h2>Company Name: {company.name}</h2>
            <p>Tags:</p>
            <ul>
              {company.tags.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagDashboard;
