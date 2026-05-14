import "./RisingKeywordCard.css";
import InfoTooltip from "./InfoTooltip";
import { useEffect, useState } from "react";

const RisingKeywordCard = ({ apiUrl = "/api/dashboard/rising-keywords/naver", description, selectedKeyword, onSelectKeyword }) => {
  const [risingKeywords, setRisingKeywords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:8080${apiUrl}`)
      .then((response) => response.json())
      .then((data) => {
        setRisingKeywords(data);
      })
      .catch((error) => {
        console.error("급상승 키워드 조회 실패:", error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="RisingKeywordCard">
      <h2>
        🔥 급상승 키워드
        {description && <InfoTooltip text={description} />}
      </h2>

      <div className="RisingKeywordCardTable">
        <div className="RisingKeywordCardTableHeader">
          <span>순위</span>
          <span>키워드</span>
          <span>증가율</span>
        </div>

        <div className="RisingKeywordCardList">
        {isLoading ? (
          <div className="RisingKeywordCardLoading">불러오는 중...</div>
        ) : isError ? (
          <div className="RisingKeywordCardLoading">데이터를 불러올 수 없습니다.</div>
        ) : risingKeywords.length === 0 ? (
          <div className="RisingKeywordCardEmpty">
            <span>📊</span>
            <p>아직 비교할 데이터가 없어요</p>
            <p>지표를 한 번 더 수집하면 표시됩니다</p>
          </div>
        ) : risingKeywords.map((item, index) => (
          <div className={`RisingKeywordCardRow${selectedKeyword === item.keyword ? " selected" : ""}`} key={item.keyword} onClick={() => onSelectKeyword(selectedKeyword === item.keyword ? null : item.keyword)}>
            <span className="RisingKeywordCardRank">{index + 1}위</span>
            <span className="RisingKeywordCardKeyword">{item.keyword}</span>
            <span className="RisingKeywordCardRate">
              {item.growthRate != null
                ? `+${item.growthRate.toFixed(1)}%`
                : "-"}
            </span>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};


export default RisingKeywordCard;
