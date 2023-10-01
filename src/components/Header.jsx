import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div>
        <Link className="logo"> İş Takip</Link>
      </div>
      <div className="links">
        <NavLink to={"/"}>İş Listesi</NavLink>
        <NavLink to={"add-job"}>İş Ekle</NavLink>
      </div>
    </header>
  );
};

export default Header;
