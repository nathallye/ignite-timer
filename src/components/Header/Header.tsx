import { NavLink } from "react-router-dom";
import { Timer, Scroll } from "phosphor-react";

import { HeaderContainer } from "./styles";

import logoIgnite from "http://localhost:5173/logo-ignite.svg";

export const Header = () => {
  return (
    <HeaderContainer>
      <img src={logoIgnite} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
};
