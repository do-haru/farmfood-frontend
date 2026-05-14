import "./PopularKeywordCard.css";
import InfoTooltip from "./InfoTooltip";
import { useEffect, useState } from "react";

const PopularKeywordCard = ({
  title,
  description,
  apiUrl,
  selectedKeyword,
  onSelectKeyword,
}) => {
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
      <h2>
        {title}
        {description && <InfoTooltip text={description} />}
      </h2>

      <div className="PopularKeywordCardTable">
        <div className="PopularKeywordCardTableHeader">
          <span>순위</span>
          <span>키워드</span>
          <span>변화</span>
        </div>

        <div className="PopularKeywordCardTableBody">
          {isLoading ? (
            <div className="PopularKeywordCardLoading">불러오는 중...</div>
          ) : isError ? (
            <div className="PopularKeywordCardLoading">
              데이터를 불러올 수 없습니다.
            </div>
          ) : (
            rankings.map((item) => (
              <div
                className={`PopularKeywordCardTableRow${selectedKeyword === item.keyword ? " selected" : ""}`}
                key={item.rank}
                onClick={() =>
                  onSelectKeyword(
                    selectedKeyword === item.keyword ? null : item.keyword,
                  )
                }
              >
                <span>{item.rank}</span>
                <span>{item.keyword}</span>
                <span
                  className={
                    item.rankChange === null
                      ? "rank-new"
                      : item.rankChange > 0
                        ? "rank-up"
                        : item.rankChange < 0
                          ? "rank-down"
                          : "rank-same"
                  }
                >
                  {item.rankChange === null
                    ? "NEW"
                    : item.rankChange > 0
                      ? `▲${item.rankChange}`
                      : item.rankChange < 0
                        ? `▼${Math.abs(item.rankChange)}`
                        : "-"}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PopularKeywordCard;
