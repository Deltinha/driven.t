import styled from "styled-components";
import dayjs from "dayjs";

export default function Activity({ activityInfo, nextActivityDate }) {
  function printActivityDuration() {
    const activityDate = dayjs(activityInfo?.date);
    const init = activityDate.format("HH:mm");
    const end = activityDate.add(activityInfo.duration, "minute").format("HH:mm");

    return `${init} - ${end}`;
  }

  function checkActivitySequence() {
    if (!nextActivityDate) return false;
    const activityEnd = dayjs(activityInfo?.date).add(activityInfo.duration, "minute").hour();
    const nextActivityStart = dayjs(nextActivityDate).hour();

    if (activityEnd === nextActivityStart) return true;
    return false;
  }

  return (
    <ActivityCard height={(80 / 60) * activityInfo.duration} position={(dayjs(activityInfo?.date).hour() - 9) * 80} sequenceActivity={checkActivitySequence()}>
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
    height: ${({ height, sequenceActivity }) => sequenceActivity ? height - 10 : height}px;
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
