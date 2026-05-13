import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import NaverDashboard from "./components/NaverDashboard";
import YoutubeDashboard from "./components/YoutubeDashboard";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="AppMain">
        <Routes>
          <Route path="/" element={<Navigate to="/naver" replace />} />
          <Route path="/naver" element={<NaverDashboard />} />
          <Route path="/youtube" element={<YoutubeDashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
