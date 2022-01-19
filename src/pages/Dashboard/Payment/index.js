import { useEffect, useState } from "react";
import useApi from "../../../hooks/useApi";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import NotEnrollment from "../../../components/Payment/NotEnrollment";

export default function Payment() {
  const [enrollmentInfo, setEnrollmentInfo] = useState("");
  const { enrollment } = useApi();

  useEffect(() => {
    enrollment.getPersonalInformations()
      .then(res => setEnrollmentInfo(res.data));
  }, []);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>

      {!enrollmentInfo ? 
        <NotEnrollment /> : "lala"  
      }
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

