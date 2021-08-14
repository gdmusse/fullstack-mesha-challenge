import React, { useContext, useEffect } from "react";
import { ScreenContainer, LogoImage, SearchDiv } from "./styled";
import logo from "../../assets/images/logo.png";
import useInput from "../../hooks/useInput";
import AlertModified from "../../components/Alert";
import GlobalStateContext from "../../global/GlobalStateContext";
import axios from "axios";
import BASE_URL from "../../constants/urls";
import CollaboratorCard from "../../components/CollaboratorCard/CollaboratorCard";
import Loader from "../../components/Loader";
import TransitionsModal from "../../components/Modal";
import dayjs from "dayjs";
import { TextField } from "@material-ui/core";

const AdministratorPage = () => {
  const {
    loading,
    setLoading,
    collaborators,
    setCollaborators,
    setOpenModal,
    openModal,
    setModalInfo,
  } = useContext(GlobalStateContext);

  const [search, setSearch] = useInput("");

  useEffect(() => {
    getCollaborators();
  }, [openModal]);

  const getCollaborators = async () => {
    setLoading(true);
    try {
      await axios.get(`${BASE_URL}/collaborator`).then((res) => {
        setCollaborators(res.data.collaborators);
      });
    } catch (err) {
      console.log(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const onClickModal = (id) => {
    setOpenModal(true);
    setModalInfo(id);
  };

  const collaboratorCards =
    collaborators.length > 0 ? (
      collaborators
        .filter((collaborator) => {
          const collaboratorName = collaborator.name.toLowerCase();
          const collaboratorEmail = collaborator.email.toLowerCase();
          const collaboratorKnowledge1 = collaborator.knowledge_1.toLowerCase();
          let collaboratorKnowledge2;
          let collaboratorKnowledge3;
          let collaboratorPhone;
          if (collaborator.phone !== null) {
            collaboratorPhone = collaborator.phone;
          }
          if (collaborator.knowledge_2 !== null) {
            collaboratorKnowledge2 = collaborator.knowledge_2.toLowerCase();
          }
          if (collaborator.knowledge_3 !== null) {
            collaboratorKnowledge3 = collaborator.knowledge_3.toLowerCase();
          }

          if (
            collaboratorName.includes(search.toLowerCase()) ||
            collaboratorEmail.includes(search.toLowerCase()) ||
            collaborator.cpf.includes(search) ||
            (collaboratorPhone && collaboratorPhone.includes(search)) ||
            collaboratorKnowledge1.includes(search) ||
            (collaboratorKnowledge2 &&
              collaboratorKnowledge2.includes(search)) ||
            (collaboratorKnowledge3 && collaboratorKnowledge3.includes(search))
          ) {
            return true;
          } else {
            return false;
          }
        })
        .map((collaborator) => {
          return (
            <CollaboratorCard
              key={collaborator.id}
              id={collaborator.id}
              name={collaborator.name}
              validated={collaborator.validated}
              date={dayjs(collaborator.date).format("DD/MM/YYYY HH:mm")}
              onClickCard={() => onClickModal(collaborator.id)}
            />
          );
        })
    ) : (
      <div>Desculpe, nenhum colaborador se cadastrou ainda.</div>
    );

  return (
    <ScreenContainer>
      <LogoImage src={logo} />
      <TransitionsModal />
      <SearchDiv>
        <TextField
          name={"search"}
          value={search}
          onChange={setSearch}
          variant={"outlined"}
          label={"Busca"}
          margin={"normal"}
          fullWidth
        />
      </SearchDiv>

      {loading ? <Loader /> : <div>{collaboratorCards}</div>}

      <AlertModified />
    </ScreenContainer>
  );
};

export default AdministratorPage;
