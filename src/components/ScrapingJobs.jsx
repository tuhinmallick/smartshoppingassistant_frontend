import React, { useState, useEffect } from "react";

const ScrapingJobs = () => {
  const [scrapingJobs, setScrapingJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScrapingJobs = async () => {
      try {
        const response = await fetch("/api/scrapingJobs");
        const data = await response.json();
        setScrapingJobs(data);
      } catch (error) {
        console.error("Error fetching scraping jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScrapingJobs();
  }, []);

  return (
    <div>
      <h1>Scraping Jobs</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {scrapingJobs.map((job) => (
            <li key={job.id}>
              <h3>{job.productName}</h3>
              <p>Status: {job.status}</p>
              {job.status === "pending" && <button>Cancel Job</button>}
              {/* You can also implement actions to update or delete jobs here */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ScrapingJobs;
