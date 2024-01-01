import React, { useState, useEffect } from "react";
import styles from "../css/NewsList.module.css";

// API URI from environment variables
const API_URI = process.env.REACT_APP_API_URI;

// Functional component for NewsList
const NewsList = (props) => {
  // State variables for positive, negative, and neutral news
  let [positiveNews, setPositiveNews] = useState([]);
  let [negativeNews, setNegativeNews] = useState([]);
  let [neutralNews, setNeutralNews] = useState([]);

  // useEffect hook to fetch news data
  useEffect(() => {
    // async function to fetch news data
    // console.log(props.company);
    const fetchNewsData = async () => {
      // fetch news list using company name from recruitment detail
      const response2 = await fetch(
        API_URI + "/news/list?company=" + props.company,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          //body: JSON.stringify(),
        }
      );

      // convert response to JSON format
      const respJSON2 = await response2.json();
      // console.log(respJSON2);

      // filter news based on positive, negative, and neutral sentiment
      // Assuming respJSON2 is an array
      if (Array.isArray(respJSON2)) {
        const maxSize = 3;

        // Adjust these conditions based on the actual data structure
        const positive = respJSON2
          .filter((news) => news.positive === 1 && news.negative === 0) // if positive is "1" when true
          .slice(0, maxSize);

        const negative = respJSON2
          .filter((news) => news.positive === 0 && news.negative === 1) // if negative is "1" when true
          .slice(0, maxSize);

        const neutral = respJSON2
          .filter((news) => news.positive !== 1 && news.negative !== 1) // adjusting based on actual values
          .slice(0, maxSize);

        // console.log(positive);
        // console.log(negative);
        // console.log(neutral);
        setPositiveNews(positive);
        setNegativeNews(negative);
        setNeutralNews(neutral);
      } else {
        console.error("respJSON2 is not an array", respJSON2);
      }
    };

    // call fetchNewsData function
    fetchNewsData();
  }, [props.company]);

  // Component that displays a table with three columns of news items categorized by sentiment
  return (
    <div className={styles.newsList}>
      <table className={styles.table}>
        <thead>
          <tr>
            {/* Column for positive sentiment news */}
            <th className={`${styles.categoryTitle} ${styles.positive}`}>
              긍정 감성 뉴스 목록
            </th>
            {/* Column for neutral sentiment news */}
            <th className={`${styles.categoryTitle} ${styles.neutral}`}>
              중립 감성 뉴스 목록
            </th>
            {/* Column for negative sentiment news */}
            <th className={`${styles.categoryTitle} ${styles.negative}`}>
              부정 감성 뉴스 목록
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {/* List of positive sentiment news */}
              <ul className={styles.newsItems}>
                {positiveNews.map((news, index) => (
                  <li key={index} className={styles.newsItem}>
                    {/* Link to the news article */}
                    {news ? (
                      <a href={news.link} target="_blank" rel="noreferrer">
                        {news.headline}
                      </a>
                    ) : (
                      "Loading..."
                    )}
                  </li>
                ))}
              </ul>
            </td>
            <td>
              {/* List of neutral sentiment news */}
              <ul className={styles.newsItems}>
                {neutralNews.map((news, index) => (
                  <li key={index} className={styles.newsItem}>
                    {/* Link to the news article */}
                    {news ? (
                      <a href={news.link} target="_blank" rel="noreferrer">
                        {news.headline}
                      </a>
                    ) : (
                      "Loading..."
                    )}
                  </li>
                ))}
              </ul>
            </td>
            <td>
              {/* List of negative sentiment news */}
              <ul className={styles.newsItems}>
                {negativeNews.map((news, index) => (
                  <li key={index} className={styles.newsItem}>
                    {/* Link to the news article */}
                    {news ? (
                      <a href={news.link} target="_blank" rel="noreferrer">
                        {news.headline}
                      </a>
                    ) : (
                      "Loading..."
                    )}
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NewsList;
