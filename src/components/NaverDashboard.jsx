import "./NaverDashboard.css";
import PopularKeywordCard from "./PopularKeywordCard";
import RisingKeywordCard from "./RisingKeywordCard";
import ShoppingTrendCard from "./ShoppingTrendCard";

import { useState } from "react";

const NaverDashboard = () => {
  const [selectedKeyword, setSelectedKeyword] = useState(null);

  return (
    <div className="NaverDashboard">
      <div className="NaverDashboardContent">
        <div className="NaverDashboardContentLeft">
          <PopularKeywordCard
            title="네이버 인기 키워드"
            apiUrl="/api/dashboard/rankings/naver"
            onSelectKeyword={setSelectedKeyword}
          />
        </div>
        <div className="NaverDashboardContentRight">
          <RisingKeywordCard />
          <ShoppingTrendCard selectedKeyword={selectedKeyword} />
        </div>
      </div>
    </div>
  );
};

export default NaverDashboard;
