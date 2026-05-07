import "./DashboardMain.css";
import PopularKeywordCard from "./PopularKeywordCard";
import ShoppingTrendCard from "./ShoppingTrendCard";

import { useEffect, useState } from "react";

const DashboardMain = () => {
  const [selectedKeyword, setSelectedKeyword] = useState(null);

  return (
    <div className="DashboardMain">
      <div className="DashboardMainContent">
        <div className="DashboardMainLeft">
          <PopularKeywordCard onSelectKeyword={setSelectedKeyword} />
        </div>
        <div className="DashboardMainRight">
          <ShoppingTrendCard selectedKeyword={selectedKeyword} />
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
