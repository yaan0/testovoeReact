import logo from "../../resources/img/FrameWhite.svg";
import sun from "../../resources/img/SunWhite.svg";

import "./Logo.css";

const Logo = () => {
  return (
    <div className="Logo">
      <img src={logo} alt="logo" />
      <img src={sun} alt="sun" />
    </div>
  );
};

export default Logo;
