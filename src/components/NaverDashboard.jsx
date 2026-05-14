import "./NaverDashboard.css";
import PopularKeywordCard from "./PopularKeywordCard";
import RisingKeywordCard from "./RisingKeywordCard";
import ShoppingTrendCard from "./ShoppingTrendCard";

import { useState, useEffect } from "react";

const getTimeAgo = (dateStr) => {
  const diff = Math.floor((new Date() - new Date(dateStr)) / 1000);
  if (diff < 60) return "방금 전";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
};

const NaverDashboard = () => {
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/dashboard/rankings/naver")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setLastUpdated(data[0].rankedAt);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="NaverDashboard">
      <div className="NaverDashboardContent">
        <div className="NaverDashboardContentLeft">
          <PopularKeywordCard
            title="🏆 네이버 인기 키워드"
            apiUrl="/api/dashboard/rankings/naver"
            selectedKeyword={selectedKeyword}
            onSelectKeyword={setSelectedKeyword}
          />
        </div>
        <div className="NaverDashboardContentRight">
          <RisingKeywordCard selectedKeyword={selectedKeyword} onSelectKeyword={setSelectedKeyword} />
          <ShoppingTrendCard selectedKeyword={selectedKeyword} />
        </div>
      </div>
      {lastUpdated && (
        <div className="NaverDashboardLastUpdated">
          마지막 업데이트: {getTimeAgo(lastUpdated)}
        </div>
      )}
    </div>
  );
};

export default NaverDashboard;
