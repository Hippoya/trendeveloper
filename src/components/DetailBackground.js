import React, { useState, useEffect } from "react";
import styles from "../css/DetailBackground.module.css";

const API_URI = process.env.REACT_APP_API_URI;

const DetailBackground = () => {
  let [detailData, setdetailData] = useState(null);
  let [worknetLink, setWorknetLink] = useState("");
  let respJSON = useState({});
  //let logoLink = useState("");
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);

    const fetchData = async () => {
      if (urlSearchParams.has("id")) {
        console.log(urlSearchParams.get("id"));
        let recruitmentID = urlSearchParams.get("id");
        //const token = localStorage.getItem("token");

        let resp = await fetch(
          API_URI + "/api/v1/recruitment/detail?id=" + recruitmentID,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              //"Authorization": "Bearer " + token
            },
            body: JSON.stringify(),
          }
        );
        respJSON = await resp.json();
        console.log(respJSON);
        setdetailData(respJSON);
        setWorknetLink(
          "http://www.work.go.kr/empInfo/empInfoSrch/detail/empDetailAuthView.do?callPage=detail&wantedAuthNo=" +
            recruitmentID
        );
        //logoLink = respJSON["logoLink"];
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles["detail-background"]}>
      <div className={styles.box1}>
        <head>
          <title className={styles.title}>
            {detailData ? detailData.wantedTitle : "Loading..."}
          </title>
        </head>
        <p className={styles.p1}>
          {detailData ? detailData.jobCont : "Loading..."}
        </p>
        <a href={`${worknetLink}`} target="_blank" rel="noreferrer">
          Link
        </a>
      </div>
    </div>
  );
};

export default DetailBackground;
