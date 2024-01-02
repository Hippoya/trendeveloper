import React, { useEffect, useState } from "react";
import styles from "../css/DetailPage.module.css";

import TrendBackground from "../components/TrendBackground";

const API_URI = process.env.REACT_APP_API_URI;

const Trend = () => {
  const [ranks, setRanks] = useState(null);
  useEffect(() => {
    // Fetch ranks data from API
    const fetchRanks = async () => {
      let from = "202004";
      let to = "202308";

      const response = await fetch(
        API_URI + `/stat/rank?from=${from}&to=${to}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      );

      const respJSON = await response.json();
      console.log(respJSON);
      // Set the TrendBackground component with the top 5 ranks as props
      setRanks(<TrendBackground ranks={respJSON} />);
    };

    // Call the fetchRanks function when the component mounts
    fetchRanks();
  }, []);

  return (
    <div className={styles.require}>
      {/* Render the TrendBackground component with the top 5 ranks */}
      {ranks}
    </div>
  );
};

export default Trend;
