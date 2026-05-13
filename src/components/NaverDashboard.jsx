import "./NaverDashboard.css";
import PopularKeywordCard from "./PopularKeywordCard";
import ShoppingTrendCard from "./ShoppingTrendCard";

import { useEffect, useState } from "react";

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
          <ShoppingTrendCard selectedKeyword={selectedKeyword} />
        </div>
      </div>
    </div>
  );
};

export default NaverDashboard;
