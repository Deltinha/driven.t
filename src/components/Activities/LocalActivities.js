import { useEffect, useState } from "react";
import styled from "styled-components";

import Activity from "./Activity";
import { formatDate } from "./utils/functions";

export default function LocalActivities({ activities, laterActivityHour, currentDay }) {
  const [activitiesOfDay, setActivitiesOfDay] = useState([]);
  
  useEffect(() => {
    getActivitiesOfDay();
  }, [currentDay]);

  function getActivitiesOfDay() {
    setActivitiesOfDay([]);
    const currentActivities = [];
    activities.forEach((activity) => {
      if (formatDate(activity.date) === currentDay) {
        currentActivities.push(activity);
        setActivitiesOfDay(currentActivities);
      }
    });
  }

  return (
    <ActivitiesList height={(90 / 60) * (laterActivityHour - 9 * 60)}>
      {activitiesOfDay?.map((activity) => 
        <Activity
          key={activity.id}
          activityInfo={activity}
          currentDay={currentDay}
        />
      )}
    </ActivitiesList>
  );
}

const ActivitiesList = styled.ul`
    width: 100%;
    min-height: 100%;
    height: ${({ height }) => height}px;
    border-left: 1px solid #d7d7d7;
    padding: 10px;
    position: relative;
`;
