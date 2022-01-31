import { Typography } from "@material-ui/core";
import styled from "styled-components";

export const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;

  @media (max-width: 600px) {
    text-align: center;
  }
`;
