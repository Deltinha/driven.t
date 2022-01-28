import { useState, useEffect } from "react";
import useApi from "../../../hooks/useApi";

import { toast } from "react-toastify";
import dayjs from "dayjs";
import styled from "styled-components";

import ActivitiesBox from "../../../components/Activities/ActivitiesBox";
import LocalsNames from "../../../components/Activities/LocalsNames";
import ActivitiesBoard from "../../../components/Activities/ActivitiesBoard";
import { StyledTypography } from "../../../components/PagesTitle";
import getWeekdayName from "../../../components/Activities/utils/functions";
import DaysButton from "../../../components/Activities/DaysButton";

export default function Activities() {
  const { activity } = useApi();
  const [selectedDay, setSelectedDay] = useState("");
  const [weekdays, setWeekdays] = useState([]);
  const [locals, setLocals] = useState([]);
  const [activities, setActivities] = useState([]);

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
        date: `${dayjs(activity.date).date()}/${dayjs(activity.date).month() < 10 ? "0" + dayjs(activity.date).month() : dayjs(activity.date).month()}`
      };
    });
    setWeekdays(handleDuplicates(weekdayNames, "date"));
  }

  function handleDuplicates(a, b) {
    const withoutDuplicates = {};

    for (const item of a) {
      const date = item[b];

      if (!withoutDuplicates[date]) {
        withoutDuplicates[date] = item;
      }
    }

    return Object.values(withoutDuplicates);
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
  }, []);

  return (
    <ActivitiesBox>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      
      <ButtonsDiv>
        {weekdays.map(weekday => (
          <DaysButton
            isSelected={selectedDay === weekday?.date}
            selectDay={selectDay} 
            weekday={weekday} />
        ))}
      </ButtonsDiv>

      <LocalsNames locals={locals} />
      <ActivitiesBoard 
        locals={locals} 
        activities={activities}
        weekdays={weekdays} 
      />
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
