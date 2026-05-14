import "./NaverDashboard.css";
import PopularKeywordCard from "./PopularKeywordCard";
import RisingKeywordCard from "./RisingKeywordCard";
import ShoppingTrendCard from "./ShoppingTrendCard";
import NaverBlogResultCard from "./NaverBlogResultCard";

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
      <div className="NaverDashboardContentWrapper">
        <div className="NaverDashboardContentTop">
          <div className="NaverDashboardContentLeft">
            <PopularKeywordCard
              title="🏆 네이버 인기 키워드"
              description="네이버 전반에서 수집한 콘텐츠를 분석해 요즘 사람들의 관심을 가장 많이 받고 있는 식품 키워드입니다."
              apiUrl="/api/dashboard/rankings/naver"
              selectedKeyword={selectedKeyword}
              onSelectKeyword={setSelectedKeyword}
            />
          </div>
          <div className="NaverDashboardContentRight">
            <RisingKeywordCard
              description="최근 7일간 네이버 쇼핑 트렌드 지수 평균과 직전 7일 평균을 비교하여, 증가율이 가장 높은 상위 5개 키워드입니다."
              selectedKeyword={selectedKeyword}
              onSelectKeyword={setSelectedKeyword}
            />
            <ShoppingTrendCard selectedKeyword={selectedKeyword} />
          </div>
        </div>

        <div className="NaverDashboardContentBottom">
          <NaverBlogResultCard selectedKeyword={selectedKeyword} />
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
