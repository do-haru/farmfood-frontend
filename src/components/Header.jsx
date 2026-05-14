import "./Header.css";
import logo_text from "../assets/logo_text.png";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="Header">
      <div className="HeaderLogo">
        <img className="HeaderLogoText" src={logo_text} alt="생활곳간" />
      </div>
      <div className="HeaderMenu">
        <NavLink
          className={({ isActive }) =>
            `HeaderMenuButton${isActive ? " active" : ""}`
          }
          to="/naver"
        >
          네이버
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `HeaderMenuButton${isActive ? " active" : ""}`
          }
          to="/youtube"
        >
          유튜브
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
