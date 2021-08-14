import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export const CollaboratorCardContainer = styled(Card)`
  width: 600px;
  margin-bottom: 5%;
  transition: transform .2s;
  &:hover {
    transform: scale(1.02);
  }
  @media screen and (max-width: 600px) {
    max-width: 90vw;
    max-height: 390px;
  }
`;

export const CollaboratorCardContent = styled(CardContent)`
  display: flex;
  background-color: #f16b82;
  padding: 0;
`;

export const CardText = styled.div`
  margin: 5px 5px 0px 5px;
`;
