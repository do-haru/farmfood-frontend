import "./Header.css";
import logo_text from "../assets/logo_text.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="Header">
      <div className="HeaderLogo">
        <img className="HeaderLogoText" src={logo_text} alt="생활곳간" />
      </div>
      <div className="HeaderMenu">
        <Link className="HeaderMenuButton" to="/naver">
          네이버
        </Link>

        <Link className="HeaderMenuButton" to="/youtube">
          유튜브
        </Link>
      </div>
    </header>
  );
};

export default Header;
