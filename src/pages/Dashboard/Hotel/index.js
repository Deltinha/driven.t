import { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import useApi from "../../../hooks/useApi";
import ForbidText from "../../../components/ForbidText";

export default function Hotel() {
  const [ticketInfo, setTicketInfo] = useState([]);
  const { ticket } = useApi();

  useEffect(() => {
    ticket.getTicketFromUser()
      .then(res => 
        setTicketInfo(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {
        ticketInfo.hasHotel ?
          <span>COMPONENTE SELECT HOTEL AQUI</span> 
          : <ForbidText>Sua modalidade de ingresso não inclui hospedagem
            <br/>Prossiga para a escolha de atividades</ForbidText>
      }
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

