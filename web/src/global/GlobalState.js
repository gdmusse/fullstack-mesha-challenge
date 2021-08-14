import React, { useState } from "react";
import GlobalStateContext from "./GlobalStateContext";

const GlobalState = (props) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState("");
  const [collaborators, setCollaborators] = useState([]);
  const [modalInfo, setModalInfo] = useState("");
  const [loadingModal, setLoadingModal] = useState("");

  return (
    <GlobalStateContext.Provider
      value={{
        openAlert,
        setOpenAlert,
        alertMsg,
        setAlertMsg,
        alertSeverity,
        setAlertSeverity,
        loading,
        setLoading,
        collaborators,
        setCollaborators,
        setOpenModal,
        openModal,
        modalInfo,
        setModalInfo,
        loadingModal,
        setLoadingModal,
      }}
    >
      {props.children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalState;
