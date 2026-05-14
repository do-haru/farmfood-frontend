import "./InfoTooltip.css";

const InfoTooltip = ({ text }) => {
  return (
    <span className="InfoTooltip">
      <span className="InfoTooltipIcon">?</span>
      <span className="InfoTooltipText">{text}</span>
    </span>
  );
};

export default InfoTooltip;
