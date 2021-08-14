import React from "react";
import Typography from "@material-ui/core/Typography";
import { ButtonDiv, ModalCardContainer, ModalCardContent } from "./styled";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AlertModified from "../Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  media: {
    objectFit: "contain",
    height: "350px",
    "@media (max-width: 600px)": { height: "300px" },
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
  validateButton: {
    backgroundColor: "#4cbf32",
    "&:hover": {
      background: "#339b27",
    },
  },
  unvalidateButton: {
    backgroundColor: "#bf3732",
    "&:hover": {
      background: "#9b2b27",
    },
  },
}));

const ModalCard = (props) => {
  const classes = useStyles();

  return (
    <ModalCardContainer>
      <AlertModified />
      <ModalCardContent className={classes.content}>
        <Typography gutterBottom variant="h4">
          Nome: {props.name}
        </Typography>
        <Typography gutterBottom variant="h5">
          Email: {props.email}
        </Typography>
        <Typography gutterBottom variant="h5">
          Cpf: {props.cpf}
        </Typography>
        <Typography gutterBottom variant="h5">
          Telefone: {props.phone}
        </Typography>

        <Typography gutterBottom variant="h5">
          Conhecimentos: {props.knowledge_1}
          {props.knowledge_2 ? <>, {props.knowledge_2}</> : <></>}
          {props.knowledge_3 ? <>, {props.knowledge_3}</> : <></>}
        </Typography>
        {props.validated === 0 ? (
          <Typography gutterBottom variant="h5">
            Não validado
            <ButtonDiv>
              {" "}
              <Button
                variant="contained"
                color="primary"
                size="small"
                disableElevation={true}
                onClick={props.onClickValidate}
                className={classes.validateButton}
              >
                Validar
              </Button>
            </ButtonDiv>
          </Typography>
        ) : (
          <Typography gutterBottom variant="h5">
            Validado às {props.date}
            <ButtonDiv>
              <Button
                variant="contained"
                color="primary"
                size="small"
                disableElevation={true}
                onClick={props.onClickUnvalidate}
                className={classes.unvalidateButton}
              >
                Não Validar
              </Button>
            </ButtonDiv>
          </Typography>
        )}
      </ModalCardContent>
    </ModalCardContainer>
  );
};

export default ModalCard;
