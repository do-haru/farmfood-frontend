import "./YoutubeDashboard.css";
import PopularKeywordCard from "./PopularKeywordCard";

import { useState } from "react";

const YoutubeDashboard = () => {
  const [selectedKeyword, setSelectedKeyword] = useState(null);

  return (
    <div className="YoutubeDashboard">
      <div className="YoutubeDashboardContent">
        <div className="YoutubeDashboardContentLeft">
          <PopularKeywordCard
            title="유튜브 인기 키워드"
            apiUrl="/api/dashboard/rankings/youtube"
            onSelectKeyword={setSelectedKeyword}
          />
        </div>
      </div>
    </div>
  );
};

export default YoutubeDashboard;
