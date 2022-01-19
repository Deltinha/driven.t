import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import NotEnrollment from "../../../components/Payment/NotEnrollment";
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
        <NotEnrollment /> : <SelectTickets />  
      }
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

