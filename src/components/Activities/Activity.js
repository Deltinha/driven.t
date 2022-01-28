import styled from "styled-components";
import dayjs from "dayjs";

export default function Activity({ activityInfo }) {
  function printActivityDuration() {
    const activityDate = dayjs(activityInfo?.date);
    const init = activityDate.format("HH:mm");
    const end = activityDate.add(activityInfo.duration, "minute").format("HH:mm");

    return `${init} - ${end}`;
  }

  function convertStartToMinutes() {
    const day = dayjs(activityInfo?.date);
    const startHourToMinutes = (day.hour() * 60) - 9 * 60;
    const startMinutes = day.minute();

    return startHourToMinutes + startMinutes;
  }

  return (
    <ActivityCard height={(90 / 60) * activityInfo.duration} position={convertStartToMinutes() * (90 / 60)}>
      <Title>
        {activityInfo?.name}
      </Title>
      <p>
        {printActivityDuration()}
      </p>
    </ActivityCard>
  );
}

const ActivityCard = styled.li`
    width: calc(100% - 20px);
    height: ${({ height }) => height - 10}px;
    padding: 10px;
    background-color: #f1f1f1;
    border-radius: 5px;
    font-size: 12px;
    position: absolute;
    top: ${({ position }) => position + 10}px;
    margin-bottom: 10px;
`;

const Title = styled.p`
    font-weight: 700;
    margin-bottom: 5px;
`;
