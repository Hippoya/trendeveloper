import { useEffect, useState } from "react"; // Importing necessary modules from react library
import { Link } from "react-router-dom"; // Importing necessary modules from react-router-dom library

import { BiCircle, BiX } from "react-icons/bi"; // Importing necessary icons from react-icons library
import styles from "../css/RecruitmentList.module.css"; // Importing necessary styles from RecruitmentList.module.css file

const API_URI = process.env.REACT_APP_API_URI; // Assigning API_URI value from environment variables

const RecruitContent = (props) => {
  // Creating a functional component named RecruitContent with props parameter
  const [companyInfo, setCompanyInfo] = useState({}); // Creating a state variable named companyInfo and its setter function with initial value as an empty object
  const [closeDtInfo, setCloseDtInfo] = useState({}); // Creating a state variable named closeDtInfo and its setter function with initial value as an empty object
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Using useEffect hook to perform side effect

    const fetchCompanyInfo = async () => {
      setIsLoading(true); // 데이터 로딩 시작
      // Creating an asynchronous function named fetchCompanyInfo
      try {
        // Using try-catch block to handle errors
        const url = `${API_URI}/recruitment/detail?id=${props.id}`; // Assigning API endpoint to url variable
        // console.log(url); // Logging url to console
        const response = await fetch(
          // Assigning fetch response to response variable
          url, // Fetching data from API endpoint with recruitmentID parameter
          {
            method: "GET", // Using GET method to fetch data
            headers: {
              "Content-Type": "application/json", // Setting content type as application/json
            },
            body: JSON.stringify(), // Converting data to JSON format
          }
        );
        // console.log(response.headers); // Logging response to console
        const respJSON = (await response.json())[0]; // Parsing response data to JSON format and assigning it to respJSON variable
        // console.log(respJSON); // Logging respJSON to console
        // console.log(respJSON.companyName); // Logging respJSON to console
        // console.log(respJSON.closeDT); // Logging respJSON.closeDT to console
        // console.log(respJSON.closeDT === undefined); // Logging respJSON.closeDT === undefined to console
        let closeDtInfoTmp = {
          date: "",
          until: null,
        };
        // Check if closeDT exists and is not undefined
        const closeDtSrc = respJSON.closeDT;
        // console.log(closeDtSrc);
        const closeDtArr = closeDtSrc.split("  "); // Split by double spaces
        // console.log(closeDtArr);

        // Based on the length of closeDtArr, set closeDtInfoTmp
        closeDtInfoTmp.date =
          closeDtArr.length === 1 ? closeDtArr[0] : closeDtArr[1];
        closeDtInfoTmp.until =
          closeDtArr.length === 1 ? (
            <BiX size="30px" color="#E00000" />
          ) : (
            <BiCircle size="20px" color="#008000" />
          );

        // Update state with the new information
        setCompanyInfo(respJSON);
        // console.log(companyInfo);
        setCloseDtInfo(closeDtInfoTmp);
      } catch (error) {
        // Handling errors
        console.error(error); // Logging error to console
      } finally {
        setIsLoading(false); // 데이터 로딩 완료
      }
    };
    fetchCompanyInfo(); // Calling fetchCompanyInfo function
  }, [props.id]); // Running useEffect hook only once when component mounts

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 인디케이터 렌더링
  }

  return (
    // Returning JSX
    <tr key={props.index}>
      {/* Creating a table row with key attribute */}
      <td>{companyInfo.companyName}</td>
      {/* Creating a table data cell with companyInfo.companyName value */}
      <td className={styles.link}>
        {/* Creating a table data cell with className attribute */}
        <Link to={`/recruitment/detail?id=${companyInfo.wantedAuthNo}`}>
          {/* Creating a Link component with to attribute */}
          {companyInfo.wantedTitle}
          {/* Displaying companyInfo.wantedTitle value */}
        </Link>
      </td>
      <td style={{ textAlign: "center" }}>{closeDtInfo.date}</td>
      {/* Creating a table data cell with textAlign and closeDtInfo.date properties */}
      <td style={{ textAlign: "center" }}>{closeDtInfo.until}</td>
      {/* Creating a table data cell with textAlign and closeDtInfo.until properties */}
    </tr>
  );
};

export default RecruitContent; // Exporting RecruitContent component as default
