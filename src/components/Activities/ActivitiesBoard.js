import styled from "styled-components";
import dayjs from "dayjs";

import LocalActivities from "./LocalActivities";

export default function ActivitiesBoard({ locals, activities, weekdays }) {
  function getLaterActivityEndHour() {
    const activitiesEndsHour = activities.map((activity) => {
      const activityEnd = dayjs(activity?.date).add(activity.duration, "minutes");
      return activityEnd.hour() * 60 + activityEnd.minute();
    });

    return Math.max(...activitiesEndsHour);
  }

  return (
    <Container>
      {locals?.map((local, index) => 
        <LocalActivities
          key={index}
          activities={activities.filter((activity) => activity.local.id === local.id)}
          laterActivityHour={getLaterActivityEndHour()}
          weekdays={weekdays}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 33.33%);
    border: 1px solid #d7d7d7;
    overflow-y: scroll;

    & ul:first-child {
        border-left: 0;
    }

    ::-webkit-scrollbar {
        width: 3px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgba(119, 119, 119, 0.2);
        border-radius: 5px;
    }
`;
