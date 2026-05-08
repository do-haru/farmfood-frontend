import "./ShoppingTrendCard.css";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ShoppingTrendCard = ({ selectedKeyword }) => {
  const [trendData, setTrendData] = useState([]);
  const [filteredTrendData, setFilteredTrendData] = useState([]);
  const [viewUnit, setViewUnit] = useState("daily");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getDateDiff = (start, end) => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();

    return (endTime - startTime) / (1000 * 60 * 60 * 24) + 1;
  };

  const formatDate = (date) => {
    return date.toISOString().slice(0, 10);
  };

  const getDefaultDateRange = () => {
    const end = new Date();
    end.setDate(end.getDate() - 1);

    const start = new Date(end);
    start.setDate(start.getDate() - 30);

    return {
      startDate: formatDate(start),
      endDate: formatDate(end),
    };
  };

  useEffect(() => {
    if (!selectedKeyword) {
      setTrendData([]);
      setFilteredTrendData([]);
      return;
    }

    const defaultRange = getDefaultDateRange();

    setStartDate(defaultRange.startDate);
    setEndDate(defaultRange.endDate);

    fetch(
      `http://localhost:8080/api/dashboard/keywords/${selectedKeyword}/shopping-trends`,
    )
      .then((response) => response.json())
      .then((data) => {
        setTrendData(data);

        const filtered = data.filter((item) => {
          return (
            item.period >= defaultRange.startDate &&
            item.period <= defaultRange.endDate
          );
        });

        setFilteredTrendData(filtered);
      })
      .catch((error) => {
        console.error("쇼핑 트렌드 조회 실패:", error);
      });
  }, [selectedKeyword]);

  const handleSearch = () => {
    if (viewUnit === "daily" && startDate && endDate) {
      const diff = getDateDiff(startDate, endDate);

      if (diff > 31) {
        alert("일간 조회는 최대 31일까지만 가능합니다.");
        return;
      }
    }

    const filtered = trendData.filter((item) => {
      if (startDate && item.period < startDate) {
        return false;
      }

      if (endDate && item.period > endDate) {
        return false;
      }

      return true;
    });

    setFilteredTrendData(filtered);
  };

  return (
    <div className="ShoppingTrendCard">
      <h2>쇼핑 트렌드 추이</h2>
      <div className="ShoppingTrendCardFilter">
        <select value={viewUnit} onChange={(e) => setViewUnit(e.target.value)}>
          <option value="daily">일간</option>
          <option value="monthly">월간</option>
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <span>-</span>

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button type="button" onClick={handleSearch}>
          조회
        </button>
      </div>

      <div className="ShoppingTrendCardBody">
        {selectedKeyword ? (
          <div className="ShoppingTrendChartArea">
            {trendData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={filteredTrendData}
                  margin={{ top: 10, right: 10, left: -5, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="period"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#9aa0aa" }}
                  />

                  <YAxis
                    domain={[0, 100]}
                    ticks={[0, 20, 40, 60, 80, 100]}
                    width={32}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#9aa0aa" }}
                  />
                  <Line
                    type="linear"
                    dataKey="value"
                    strokeWidth={3}
                    stroke="#b8bcc6"
                    dot={false}
                    activeDot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div>쇼핑 트렌드 데이터가 없습니다.</div>
            )}
          </div>
        ) : (
          <div>키워드를 선택하세요</div>
        )}
      </div>
    </div>
  );
};

export default ShoppingTrendCard;
