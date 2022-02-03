import { useState, useEffect, useContext } from "react";
import useApi from "../../../hooks/useApi";

import { toast } from "react-toastify";
import dayjs from "dayjs";
import styled from "styled-components";

import ActivitiesBox from "../../../components/Activities/ActivitiesBox";
import LocalsNames from "../../../components/Activities/LocalsNames";
import ActivitiesBoard from "../../../components/Activities/ActivitiesBoard";
import { StyledTypography } from "../../../components/PagesTitle";
import { formatDate, getWeekdayName, removeDuplicatedObjectsFromArray, sortDays } from "../../../components/Activities/utils/functions";
import DaysButton from "../../../components/Activities/DaysButton";
import TicketContext from "../../../contexts/TicketContext";

export default function Activities() {
  const { activity, ticket } = useApi();
  const [selectedDay, setSelectedDay] = useState("");
  const [weekdays, setWeekdays] = useState([]);
  const [locals, setLocals] = useState([]);
  const [activities, setActivities] = useState([]);
  const { setTicketData } = useContext(TicketContext);

  function selectDay(date) {
    if (selectedDay === date) {
      setSelectedDay(false);
    } else {
      setSelectedDay(date);
    }
  }

  function handleWeekdays(activities) {
    const weekdayNames = activities.map(activity => {
      return {
        name: getWeekdayName(dayjs(activity.date).day()),
        date: formatDate(activity.date),
      };
    });

    const weekdaysWithouDuplicatedObjects = removeDuplicatedObjectsFromArray(weekdayNames, "date");
    setWeekdays(weekdaysWithouDuplicatedObjects);
  }

  useEffect(() => {
    activity.getActivitiesLocals()
      .then((response) => {
        setLocals(response.data);
      
        activity.getActivities()
          .then((res) => {
            setActivities(res.data);
            handleWeekdays(res.data);
          })
          .catch((error) => toast(error.response.data.message));
      })
      .catch((error) => toast(error.response.data.message));

    ticket.getTicketFromUser()
      .then((response) => {
        if (response.data) {
          setTicketData(response.data);
        };
      });
  }, []);

  return (
    <ActivitiesBox>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>

      {!selectedDay 
        ? <InfoText>Primeiro, filtre pelo dia do evento</InfoText>
        : ""
      }
      
      <ButtonsDiv>
        {sortDays(weekdays).map(weekday => (
          <DaysButton
            isSelected={selectedDay === weekday?.date}
            selectDay={selectDay} 
            weekday={weekday} />
        ))}
      </ButtonsDiv>
      
      {!selectedDay 
        ? ""
        : (
          <>
            <LocalsNames locals={locals} />
            <ActivitiesBoard 
              locals={locals} 
              activities={activities}
              currentDay={selectedDay}
            />
          </>
        )
      }
      <WarningText>Você só pode se desinscrever de uma atividade até um horário de 12 horas antes da mesma.</WarningText>
    </ActivitiesBox>
  );
}

const ButtonsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;

  @media (max-width: 600px) {
    justify-content: space-evenly;
  }
`;

const InfoText = styled.span`
  color: #8E8E8E;
  font-size: 20px;
  display: block;
  margin-bottom: 20px;
`;

const WarningText = styled.span`
  color: #CC6666;
  display: inline-block;
  margin: 5px;
`;
