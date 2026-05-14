import "./PopularKeywordCard.css";
import { useEffect, useState } from "react";

const PopularKeywordCard = ({ title, apiUrl, selectedKeyword, onSelectKeyword }) => {
  const [rankings, setRankings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:8080${apiUrl}`)
      .then((response) => response.json())
      .then((data) => {
        setRankings(data);
      })
      .catch((error) => {
        console.error("인기 키워드 조회 실패:", error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="PopularKeywordCard">
      <h2>{title}</h2>

      <div className="PopularKeywordCardTable">
        <div className="PopularKeywordCardTableHeader">
          <span>순위</span>
          <span>키워드</span>
          <span>점수</span>
        </div>

        <div className="PopularKeywordCardTableBody">
          {isLoading ? (
            <div className="PopularKeywordCardLoading">불러오는 중...</div>
          ) : isError ? (
            <div className="PopularKeywordCardLoading">데이터를 불러올 수 없습니다.</div>
          ) : rankings.map((item) => (
            <div
              className={`PopularKeywordCardTableRow${selectedKeyword === item.keyword ? " selected" : ""}`}
              key={item.rank}
              onClick={() => onSelectKeyword(selectedKeyword === item.keyword ? null : item.keyword)}
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
