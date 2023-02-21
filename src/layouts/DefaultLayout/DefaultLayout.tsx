import { Outlet } from "react-router-dom";

import { LayoutContainer } from "./styles";
import { Header } from "../../components/Header";

export const DefaultLayout = () => {
  return (
    <LayoutContainer>
      <Header />
      <Outlet /> {/* renderiza o conteúdo dinamicamente */}
    </LayoutContainer>
  );
};
