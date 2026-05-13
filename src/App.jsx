import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import NaverDashboard from "./components/NaverDashboard";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="AppMain">
        <Routes>
          <Route path="/" element={<Navigate to="/naver" replace />} />
          <Route path="/naver" element={<NaverDashboard />} />
          <Route path="/youtube" element={<div>유튜브 대시보드 준비중</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
