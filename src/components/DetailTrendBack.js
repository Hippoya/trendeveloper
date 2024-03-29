import React, { useState, useEffect } from "react";
import styles from "../css/DetailTrendBack.module.css";
import ReactApexChart from "react-apexcharts";
import NewsList from "./NewsList";

//API 연결
const API_URI = process.env.REACT_APP_API_URI;

const DetailTrendBack = () => {
  const [chartData, setChartData] = useState([0, 0]);
  const [news, setNews] = useState([]);

  const urlSearchParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    // Fetch company info from API
    let id = urlSearchParams.get("id");
    const fetchCompanyInfo = async () => {
      // Fetch recruitment detail
      const response = await fetch(API_URI + "/recruitment/detail?id=" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });

      const respJSON = (await response.json())[0];
      // console.log(respJSON);

      // Fetch company detail
      const response2 = await fetch(
        API_URI + "/company/detail?id=" + respJSON["companyName"],
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      );

      const respJSON2 = (await response2.json())[0];
      // console.log(respJSON2);
      // Set chart data with fetched company info
      setChartData([
        respJSON2.negative * 100,
        respJSON2.positive * 100,
        respJSON2.neutral * 100,
      ]);
      setNews(<NewsList company={respJSON["companyName"]}></NewsList>);
    };

    fetchCompanyInfo();
  }, []);

  return (
    <div className={styles.background}>
      <div />
      <div className={styles.chart}>
        {/* Render chart with chart data */}
        <ReactApexChart
          options={donutData.options}
          series={chartData}
          type="pie"
          width="500"
        />
      </div>
      <div>
        <div className={styles["headline-label"]}>
          관련 뉴스 헤드라인을 살펴볼까요?
          <br />
          <span>(클릭하면 관련 뉴스 기사 페이지로 이동해요!)</span>
        </div>
        {/* Render news list */}
        {news ? news : "Loading..."}
      </div>
    </div>
  );
};

//차트 데이터
const donutData = {
  options: {
    chart: {
      type: "pie",
    },
    colors: ["#FF6666", "#8BC34A", "#D9D9D9"],
    legend: {
      position: "bottom",
    },
    responsive: [
      {
        breakpoint: 480,
      },
    ],
    labels: ["부정", "긍정", "중립"],
    title: {
      text: "기업 감성 현황",
      fontSize: "24px",
      align: "center",
    },
  },
};

export default DetailTrendBack;
