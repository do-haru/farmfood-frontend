import "./NaverBlogResultCard.css";
import { useEffect, useState } from "react";

const NaverBlogResultCard = ({ selectedKeyword }) => {
  const [contents, setContents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!selectedKeyword) return;

    setIsLoading(true);
    setIsError(false);

    fetch(`http://localhost:8080/api/dashboard/keywords/${selectedKeyword}/blog-contents`)
      .then((res) => res.json())
      .then((data) => setContents(data))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [selectedKeyword]);

  return (
    <div className="NaverBlogResultCard">
      <h3>
        {selectedKeyword && (
          <span className="NaverBlogResultCardKeyword">{selectedKeyword}</span>
        )}
        네이버 블로그 검색 결과
      </h3>

      <div className="NaverBlogResultCardBody">
        {!selectedKeyword ? (
          <div className="NaverBlogResultCardEmpty">
            <p><span className="NaverBlogResultCardEmptyIcon">📝</span> 키워드를 선택하면</p>
            <p>네이버 블로그 검색 결과를 확인할 수 있어요</p>
          </div>
        ) : isLoading ? (
          <div className="NaverBlogResultCardMessage">불러오는 중...</div>
        ) : isError ? (
          <div className="NaverBlogResultCardMessage">데이터를 불러올 수 없습니다.</div>
        ) : (
          <div className="NaverBlogResultCardList">
            {contents.map((item, index) => (
              <a
                key={index}
                className="NaverBlogResultCardItem"
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="NaverBlogResultCardItemTitle"
                  dangerouslySetInnerHTML={{ __html: item.title }}
                />
                {item.description && (
                  <div className="NaverBlogResultCardItemDesc"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                )}
                {item.publishedAt && (
                  <div className="NaverBlogResultCardItemDate">{item.publishedAt}</div>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NaverBlogResultCard;
