import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import useApi from "../../../hooks/useApi";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import ForbidText from "../../../components/ForbidText";
import SelectTickets from "../../../components/Payment/Tickets/SelectTickets";
import TicketContext from "../../../contexts/TicketContext";

export default function Payment() {
  const [enrollmentInfo, setEnrollmentInfo] = useState("");
  const { enrollment, ticket } = useApi();

  const { ticketData } = useContext(TicketContext);

  useEffect(() => {
    enrollment.getPersonalInformations()
      .then(res => setEnrollmentInfo(res.data))
      .catch(err => console.log(err));
  }, []);

  function handleClick() {
    const { ticketValue, enrollmentId } = ticketData;
    let ticketTypeId;
    
    if (ticketValue === 100) ticketTypeId = 2;
    const body = {
      value: ticketValue.toString(),
      isPaid: false,
      enrollmentId,
      ticketTypeId,
      hasHotel: false, 
    };

    ticket.createTicket(body)
      .then(() => toast("Ingresso reservado com sucesso!"))
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

      {!enrollmentInfo 
        ? <ForbidText>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</ForbidText>
        : <SelectTickets />  
      }

      {!ticketData.ticketValue
        ? ""
        :  
        (ticketData.ticketValue === 100 
          ? 
          <Div>
            Fechado! O total ficou em <strong>R$ {ticketData.ticketValue}</strong>. Agora é só confirmar:
            <Button disabled={!ticketData} onClick={handleClick}>RESERVAR INGRESSO</Button>
          </Div> 
          : 
          "")
      }
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

const Button = styled.button`
  display: block;
  margin-top: 17px;
  background-color: #E0E0E0;
  border: 0;
  border-radius: 4px;
  height: 37px;
  width: 180px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);

  font-size: 14px;
  line-height: 16px;
  text-align: center;
  cursor: pointer;
`;

