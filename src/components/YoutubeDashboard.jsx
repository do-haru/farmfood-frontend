import "./YoutubeDashboard.css";
import PopularKeywordCard from "./PopularKeywordCard";
import RisingKeywordCard from "./RisingKeywordCard";

import { useState } from "react";

const YoutubeDashboard = () => {
  const [selectedKeyword, setSelectedKeyword] = useState(null);

  return (
    <div className="YoutubeDashboard">
      <div className="YoutubeDashboardContent">
        <div className="YoutubeDashboardContentLeft">
          <PopularKeywordCard
            title="🏆 유튜브 인기 키워드"
            apiUrl="/api/dashboard/rankings/youtube"
            selectedKeyword={selectedKeyword}
            onSelectKeyword={setSelectedKeyword}
          />
        </div>
        <div className="YoutubeDashboardContentRight">
          <RisingKeywordCard
            apiUrl="/api/dashboard/rising-keywords/youtube"
            selectedKeyword={selectedKeyword}
            onSelectKeyword={setSelectedKeyword}
          />
        </div>
      </div>
    </div>
  );
};

export default YoutubeDashboard;
