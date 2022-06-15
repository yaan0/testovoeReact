import logo from "../../resources/img/FrameWhite.svg";
import sunLight from "../../resources/img/SunLight.svg";
import sunDark from "../../resources/img/SunDark.svg";

import "./Header.css";

const Header = ({ setIsDarkTheme, isDarkTheme }) => {
  return (
    <div className="Logo">
      <img src={logo} alt="logo" />
      <img
        className="LogoSun"
        src={`${isDarkTheme ? sunDark : sunLight}`}
        alt="sun"
        onClick={() => setIsDarkTheme(!isDarkTheme)}
      />
    </div>
  );
};

export default Header;
