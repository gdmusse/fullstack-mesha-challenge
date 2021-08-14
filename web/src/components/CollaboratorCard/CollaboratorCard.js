import React from "react";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import {
  CollaboratorCardContainer,
  CollaboratorCardContent,
  CardText,
} from "./styled";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    boxShadow: "none",
    outline: "1px solid grey",
    outlineOffset: "1px",
    padding: "0",
  },
  content: {
    padding: "0",
    "&:last-child": {
      paddingBottom: 0,
    },
  },
}));

const CollaboratorCard = (props) => {
  const classes = useStyles();
  return (
    <CollaboratorCardContainer className={classes.container}>
      <CollaboratorCardContent className={classes.content}>
        <CardActionArea onClick={props.onClickCard}>
          <CardText>
            <Typography gutterBottom variant="h4">
              Nome: {props.name}
            </Typography>
            {props.validated === 0 ? (
              <Typography gutterBottom variant="h5">
                Não validado
              </Typography>
            ) : (
              <Typography gutterBottom variant="h5">
                Validado às {props.date}
              </Typography>
            )}
          </CardText>
        </CardActionArea>
      </CollaboratorCardContent>
    </CollaboratorCardContainer>
  );
};

export default CollaboratorCard;
