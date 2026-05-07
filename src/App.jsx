import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import DashboardMain from "./components/DashboardMain";

function App() {
  return (
    <div className="App">
      <Header />
      <DashboardMain />
    </div>
  );
}

export default App;
