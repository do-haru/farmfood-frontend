import "./PopularKeywordCard.css";
import { useEffect, useState } from "react";

const PopularKeywordCard = ({ onSelectKeyword }) => {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/dashboard/rankings")
      .then((response) => response.json())
      .then((data) => {
        setRankings(data);
      })
      .catch((error) => {
        console.error("인기 키워드 조회 실패:", error);
      });
  }, []);

  return (
    <div className="PopularKeywordCard">
      <h2>네이버 인기 키워드</h2>

      <div className="PopularKeywordCardTable">
        <div className="PopularKeywordCardTableHeader">
          <span>순위</span>
          <span>키워드</span>
          <span>점수</span>
        </div>

        <div className="PopularKeywordCardTableBody">
          {rankings.map((item) => (
            <div
              className="PopularKeywordCardTableRow"
              key={item.rank}
              onClick={() => onSelectKeyword(item.keyword)}
            >
              <span>{item.rank}</span>
              <span>{item.keyword}</span>
              <span>{item.finalScore.toFixed(1)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularKeywordCard;
