import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import ForbidText from "../../../components/ForbidText";
import SelectTickets from "../../../components/Payment/SelectTickets";

export default function Payment() {
  const [enrollmentInfo, setEnrollmentInfo] = useState("");
  const { enrollment } = useApi();

  useEffect(() => {
    enrollment.getPersonalInformations()
      .then(res => setEnrollmentInfo(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>

      {!enrollmentInfo ? 
        <ForbidText>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</ForbidText>
        : <SelectTickets />  
      }
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

