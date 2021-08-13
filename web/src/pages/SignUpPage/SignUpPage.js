import React from "react";
import { ScreenContainer, LogoImage } from "./styled";
import logo from "../../assets/images/logo.png";
import SignUpForm from "./SignUpForm";
import AlertModified from "../../components/Alert";

const SignUpPage = () => {
  return (
    <ScreenContainer>
      <LogoImage src={logo} />
      <SignUpForm />
      <AlertModified />
    </ScreenContainer>
  );
};

export default SignUpPage;
