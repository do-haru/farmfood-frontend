import "./DashboardMain.css";
import PopularKeywordCard from "./PopularKeywordCard";

const DashboardMain = () => {
  return (
    <div className="DashboardMain">
      <div className="DashboardMainContent">
        <div className="DashboardMainLeft">
          <PopularKeywordCard />
        </div>
        <div className="DashboardMainRight"></div>
      </div>
    </div>
  );
};

export default DashboardMain;
