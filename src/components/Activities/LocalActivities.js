import styled from "styled-components";

import Activity from "./Activity";

export default function LocalActivities({ activities, laterActivityHour, weekdays }) {
  return (
    <ActivitiesList height={(90 / 60) * (laterActivityHour - 9 * 60)}>
      {activities.map((activity, index) => 
        <Activity
          key={index}
          activityInfo={activity}
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
