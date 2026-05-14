import "./RisingKeywordCard.css";
import { useEffect, useState } from "react";

const RisingKeywordCard = ({ selectedKeyword, onSelectKeyword }) => {
  const [risingKeywords, setRisingKeywords] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/dashboard/rising-keywords/naver")
      .then((response) => response.json())
      .then((data) => {
        setRisingKeywords(data);
      })
      .catch((error) => {
        console.error("급상승 키워드 조회 실패:", error);
      });
  }, []);

  return (
    <div className="RisingKeywordCard">
      <h2>🔥 급상승 키워드</h2>

      <div className="RisingKeywordCardList">
        {risingKeywords.map((item, index) => (
          <div className={`RisingKeywordCardRow${selectedKeyword === item.keyword ? " selected" : ""}`} key={item.keyword} onClick={() => onSelectKeyword(item.keyword)}>
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
  );
};

export default RisingKeywordCard;
