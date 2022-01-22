import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Rooms from "./Rooms";
import HotelSelection from "./HotelSelection";
import SelectedHotel from "./SelectedHotelCard";
import useApi from "../../../hooks/useApi";

export default function Hotel() {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [reservation, setReservation] = useState(null);
  const { hotel } = useApi();

  useEffect(() => {
    fetchReservation();
  }, []);

  return (
    <>
      <StyledTypography variant="h4">
        Escolha de hotel e quarto
      </StyledTypography>

      {reservation ? (
        <SelectedHotel
          clearReservation={resetReservation}
          reservation={reservation}
        />
      ) : (
        <HotelSelection
          selectedHotel={selectedHotel}
          setSelectedHotel={setSelectedHotel}
        />
      )}
      {reservation ? (
        ""
      ) : (
        <Rooms hotelId={selectedHotel} fetchReservation={fetchReservation} />
      )}
    </>
  );

  function fetchReservation() {
    hotel.getReservation().then((r) => {
      setReservation(r.data);
    });
  }

  function resetReservation() {
    setSelectedHotel(null);
    setReservation(null);
  }
}

const StyledTypography = styled(Typography)``;
