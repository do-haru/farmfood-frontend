import "./NaverBlogResultCard.css";
import { useEffect, useState } from "react";

const TABS = [
  { key: "news", label: "뉴스", endpoint: "news-contents" },
  { key: "blog", label: "블로그", endpoint: "blog-contents" },
  { key: "cafe", label: "카페", endpoint: "cafe-contents" },
  { key: "shopping", label: "쇼핑", endpoint: "shopping-contents" },
];

const NaverBlogResultCard = ({ selectedKeyword }) => {
  const [activeTab, setActiveTab] = useState("blog");
  const [contents, setContents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const currentTab = TABS.find((t) => t.key === activeTab);

  useEffect(() => {
    if (!selectedKeyword) return;

    setIsLoading(true);
    setIsError(false);
    setContents([]);

    fetch(
      `http://localhost:8080/api/dashboard/keywords/${selectedKeyword}/${currentTab.endpoint}`,
    )
      .then((res) => res.json())
      .then((data) => setContents(data))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [selectedKeyword, activeTab]);

  return (
    <div className="NaverBlogResultCard">
      <div className="NaverBlogResultCardHeader">
        <h3>
          {selectedKeyword && (
            <span className="NaverBlogResultCardKeyword">
              {selectedKeyword}
            </span>
          )}
          네이버 검색 결과
        </h3>
        <div className="NaverBlogResultCardTabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`NaverBlogResultCardTab${activeTab === tab.key ? " active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="NaverBlogResultCardBody">
        {!selectedKeyword ? (
          <div className="NaverBlogResultCardEmpty">
            <p>
              <span className="NaverBlogResultCardEmptyIcon">📝</span> 키워드를
              선택하면
            </p>
            <p>네이버 검색 결과를 확인할 수 있어요</p>
          </div>
        ) : isLoading ? (
          <div className="NaverBlogResultCardMessage">불러오는 중...</div>
        ) : isError ? (
          <div className="NaverBlogResultCardMessage">
            데이터를 불러올 수 없습니다.
          </div>
        ) : contents.length === 0 ? (
          <div className="NaverBlogResultCardEmpty">
            <p>검색 결과가 없습니다.</p>
          </div>
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
                <div
                  className="NaverBlogResultCardItemTitle"
                  dangerouslySetInnerHTML={{ __html: item.title }}
                />
                {item.description && (
                  <div
                    className="NaverBlogResultCardItemDesc"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                )}
                {item.publishedAt && (
                  <div className="NaverBlogResultCardItemDate">
                    {item.publishedAt}
                  </div>
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
