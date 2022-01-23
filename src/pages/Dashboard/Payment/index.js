import { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import useApi from "../../../hooks/useApi";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import ForbidText from "../../../components/ForbidText";
import SelectTickets from "../../../components/Payment/SelectTickets";
import Checkout from "./Checkout";
import { toast } from "react-toastify";

export default function Payment() {
  const [enrollmentInfo, setEnrollmentInfo] = useState("");
  const { enrollment } = useApi();
  const match = useRouteMatch();

  useEffect(() => {
    enrollment.getPersonalInformations()
      .then(res => setEnrollmentInfo(res.data))
      .catch(err => toast(err));
  }, []);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>

      {enrollmentInfo ? (
        <Switch>
          <Route path={`${match.path}`} exact>
            <SelectTickets />  
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

