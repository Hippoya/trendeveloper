import "./css/App.css";
import { Link } from "react-router-dom";
// import logo from "./logo.svg";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "../src/css/App.module.css";
import "./css/index.css";
import Background from "../src/components/Background";
import Menu from "../src/components/Menu";
import DetailPage from "../src/pages/DetailPage";
import DetailTrend from "./pages/DetailTrend";
// import Signin from "./pages/Signin";
// import Signup from "./pages/Signup";

import React, { useContext } from "react";
import { AuthContext, ContextProvider } from "./context/Auth.context";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyHeader from "../src/components/MyHeader";
import MyFooter from "../src/components/MyFooter";
import Signin from "./pages/Signin";
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";

import Signup from "./pages/Signup";
import Trend from "./pages/Trend";
import RoadMap from "./pages/RoadMap";
import Recruitment from "./pages/RecruitmentPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <div className="App">
          <Background />
          <MyHeader />
          <Link to="/signup">회원가입</Link> |{" "}
              <Link to="/signin">로그인</Link>
          {/* <Navbar /> */}
          <div className="wrapper">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/recruitement" element={<Recruitment />} />
              <Route
                path="/recruitement/DetailPage/:id?"
                element={<DetailPage />}
              />
              <Route path="/company/detail/:id?" element={<DetailTrend />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/roadmap" element={<RoadMap />} />
              <Route path="/trend/stat/:id?" element={<Trend />} />
            </Routes>
          </div>
          {/* <MyFooter /> */}
        </div>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
