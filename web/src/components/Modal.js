import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import DialogContent from "@material-ui/core/DialogContent";
import GlobalStateContext from "../global/GlobalStateContext";
import BASE_URL from "../constants/urls";
import axios from "axios";
import styled from "styled-components";
import ModalCard from "./ModalCard/ModalCard";
import dayjs from "dayjs";
import Loader from "./Loader";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    left: "20vw",
    top: "10vh",
    width: "60vw",
    paddingRight: 0,
    "@media (max-width: 900px)": { left: "10vw" },
    "@media (max-width: 600px)": { left: "5vw" },
  },
}));

const LoaderDiv = styled.div`
  margin-top: 30vh;
  overflow-x: hidden;
  padding-right: 0;
`;

const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100vw;
  margin-top: 5vh;
  overflow-x: hidden;
`;

const TransitionsModal = () => {
  const classes = useStyles();
  const {
    openModal,
    setOpenModal,
    setModalInfo,
    modalInfo,
    loadingModal,
    setAlertMsg,
    setAlertSeverity,
    setOpenAlert,
  } = useContext(GlobalStateContext);

  const [collaborator, setCollaborator] = useState({});

  const handleClose = () => {
    setModalInfo("");
    setCollaborator({});
    setOpenModal(false);
  };

  const getCollaboratorById = async (id) => {
    if (id) {
      try {
        await axios.get(`${BASE_URL}/collaborator/${id}`).then((res) => {
          setCollaborator(res.data.collaborator[0]);
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const validateCollaborator = async (id) => {
    if (id) {
      try {
        await axios
          .put(`${BASE_URL}/collaborator/${id}/validate`)
          .then((res) => {
            getCollaboratorById(id);
            setAlertMsg("Colaborador validado com sucesso.");
            setAlertSeverity("success");
            setOpenAlert(true);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const unvalidateCollaborator = async (id) => {
    if (id) {
      try {
        await axios
          .put(`${BASE_URL}/collaborator/${id}/unvalidate`)
          .then((res) => {
            getCollaboratorById(id);
            setAlertMsg("Colaborador não validado com sucesso.");
            setAlertSeverity("success");
            setOpenAlert(true);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getCollaboratorById(modalInfo);
  }, [modalInfo]);

  const body = (
    <div className={classes.paper}>
      <ModalCard
        key={collaborator.id}
        id={collaborator.id}
        name={collaborator.name}
        email={collaborator.email}
        cpf={collaborator.cpf}
        phone={collaborator.phone}
        validated={collaborator.validated}
        date={dayjs(collaborator.date).format("DD/MM/YYYY HH:mm")}
        knowledge_1={collaborator.knowledge_1}
        knowledge_2={collaborator.knowledge_3}
        knowledge_3={collaborator.knowledge_3}
        onClickValidate={() => validateCollaborator(collaborator.id)}
        onClickUnvalidate={() => unvalidateCollaborator(collaborator.id)}
      ></ModalCard>
    </div>
  );

  return (
    <ScreenContainer>
      <Modal open={openModal} onClose={handleClose} disableScrollLock={true}>
        <DialogContent>
          {" "}
          {loadingModal ? (
            <LoaderDiv>
              {" "}
              <Loader />{" "}
            </LoaderDiv>
          ) : (
            body
          )}{" "}
        </DialogContent>
      </Modal>
    </ScreenContainer>
  );
};

export default TransitionsModal;
