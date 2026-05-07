import "./Header.css";
import logo_text from "../assets/logo_text.png";

const Header = () => {
  return (
    <header className="Header">
      <div className="HeaderLogo">
        <img className="HeaderLogoText" src={logo_text} alt="생활곳간" />
      </div>
      <div className="HeaderMenu"></div>
    </header>
  );
};

export default Header;
