import React from "react";
import { ScreenContainer, LogoImage } from "./styled";
import logo from "../../assets/images/logo.png";

import AlertModified from "../../components/Alert";

const AdministratorPage = () => {
  return (
    <ScreenContainer>
      <LogoImage src={logo} />
        "pagina adm"
      <AlertModified />
    </ScreenContainer>
  );
};

export default AdministratorPage;
