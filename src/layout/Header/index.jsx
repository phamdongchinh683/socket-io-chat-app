import React from "react";
import { Link } from "react-router-dom";
import routeLink from '../../mocks/test.json';

const Header = () => {
  return <header>
    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
      {
        routeLink.map((router) =>
          <Link to={router.link}>{router.pageName}</Link>)
      }
    </div></header>;
};

export default Header;
