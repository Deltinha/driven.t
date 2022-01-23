import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import useApi from "../../../hooks/useApi";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import ForbidText from "../../../components/ForbidText";
import SelectTickets from "../../../components/Payment/Tickets/SelectTickets";
import TicketContext from "../../../contexts/TicketContext";
import SelectHosting from "../../../components/Payment/Tickets/SelectHosting";
import BookTicketArea from "../../../components/Payment/Tickets/BookTicketArea";
import { hostingTypes } from "../../../components/Payment/Tickets/HostingTypes";
import Checkout from "./Checkout";

export default function Payment() {
  const { enrollment, ticket } = useApi();
  const { ticketData } = useContext(TicketContext);

  const [ticketsTypes, setTicketsTypes] = useState([]);
  const [enrollmentInfo, setEnrollmentInfo] = useState("");
  const history = useHistory();
  const match = useRouteMatch();

  useEffect(() => {
    enrollment.getPersonalInformations()
      .then(res => {
        setEnrollmentInfo(res.data);

        ticket.getTicketsTypes()
          .then(res => setTicketsTypes(res.data))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }, []);

  function getTicketId(name) {
    const ticketSelected = ticketsTypes.find(ticket => ticket.name === name);
    return ticketSelected.id;
  }

  function handleClick() {
    const { ticketInfo, enrollmentId } = ticketData;
    const ticketTypeId = getTicketId(ticketInfo.name);
    const body = {
      value: ticketInfo.value.toString(),
      isPaid: false,
      enrollmentId,
      ticketTypeId,
      hasHotel: !ticketInfo.hasHotel ? false : true, 
    };

    ticket.createTicket(body)
      .then(() => {
        toast("Ingresso reservado com sucesso!");
        history.push(`${match.path}/checkout`);
      })
      .catch((error) => {
        if (error.response.status === 409) {
          toast("Essa reserva já possui ingresso!");
        } else {
          toast("Não foi possível");
        }
        console.log(error);
      });
  }

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>

      {enrollmentInfo ? (
        <Switch>
          <Route path={`${match.path}`} exact>
            <SelectTickets ticketsTypes={ticketsTypes} />
            {!ticketData.ticketInfo
              ? ""
              :  
              (ticketData.ticketInfo.name === "Online" 
                ? <BookTicketArea ticketData={ticketData} handleClick={handleClick} /> 
                : 
                <Div>
                  <SelectHosting hostingTypes={hostingTypes}/>
            
                  {ticketData.ticketInfo.hasOwnProperty("hasHotel") 
                    ? <BookTicketArea ticketData={ticketData} handleClick={handleClick} />
                    : ""
                  }
                </Div>
              )
            }
          </Route>

          <Route path={`${match.path}/checkout`} exact>
            <Checkout />
          </Route>
        </Switch>
      ) : (
        <ForbidText>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</ForbidText>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const Div = styled.div`
  margin-top: 40px;
  color: #8E8E8E;
`;
