import { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import useApi from "../../../hooks/useApi";
import ForbidText from "../../../components/ForbidText";
import SelectionOverview from "./SelectionOverview";

export default function Hotel() {
  const [ticketInfo, setTicketInfo] = useState({});
  const [bookingInfo, setBookingInfo] = useState({});
  const { hotel, ticket } = useApi();

  function getBooking() {
    hotel.getBooking()
      .then(res =>
        setBookingInfo(res.data))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    ticket.getTicketFromUser()
      .then(res => 
        setTicketInfo(res.data))
      .catch(err => console.error(err));
    getBooking();
  }, []);

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {
        Object.keys(ticketInfo).length === 0 ?
          <ForbidText>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</ForbidText>
          : !ticketInfo.hasHotel ?
            <ForbidText>Sua modalidade de ingresso não inclui hospedagem
              <br/>Prossiga para a escolha de atividades</ForbidText>
            : Object.keys(bookingInfo).length === 0 ?
              <span>HOTEL COMPONENT AQUI</span>
              :  <SelectionOverview booking={bookingInfo}/>
      }
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

