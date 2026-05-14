import "./YoutubeDashboard.css";
import PopularKeywordCard from "./PopularKeywordCard";
import RisingKeywordCard from "./RisingKeywordCard";

import { useState, useEffect } from "react";

const getTimeAgo = (dateStr) => {
  const diff = Math.floor((new Date() - new Date(dateStr)) / 1000);
  if (diff < 60) return "방금 전";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
};

const YoutubeDashboard = () => {
  const [selectedKeyword, setSelectedKeyword] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/dashboard/rankings/youtube")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setLastUpdated(data[0].rankedAt);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="YoutubeDashboard">
      <div className="YoutubeDashboardContent">
        <div className="YoutubeDashboardContentLeft">
          <PopularKeywordCard
            title="🏆 유튜브 인기 키워드"
            description="유튜브 전반에서 수집한 영상을 분석해 요즘 사람들의 관심을 가장 많이 받고 있는 식품 키워드입니다."
            apiUrl="/api/dashboard/rankings/youtube"
            selectedKeyword={selectedKeyword}
            onSelectKeyword={setSelectedKeyword}
          />
        </div>
        <div className="YoutubeDashboardContentRight">
          <RisingKeywordCard
            apiUrl="/api/dashboard/rising-keywords/youtube"
            description="직전 수집 대비 유튜브 반응이 가장 많이 증가한 식품 키워드입니다."
            selectedKeyword={selectedKeyword}
            onSelectKeyword={setSelectedKeyword}
          />
        </div>
      </div>
      {lastUpdated && (
        <div className="YoutubeDashboardLastUpdated">
          마지막 업데이트: {getTimeAgo(lastUpdated)}
        </div>
      )}
    </div>
  );
};

export default YoutubeDashboard;
