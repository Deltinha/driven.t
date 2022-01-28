import styled from "styled-components";
import dayjs from "dayjs";
import { BiLogIn } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function Activity({ activityInfo, nextActivityDate }) {
  const { freeSpots } = activityInfo;

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
      <ActivityText>
        <Title>
          {activityInfo?.name}
        </Title>
        <p>
          {printActivityDuration()}
        </p>
      </ActivityText>
      <VacancyInfo freeSpots={freeSpots}>
        {freeSpots > 0 ?
          (<>
            <BiLogIn />
            {freeSpots === 1 ?
              <span>{freeSpots} vaga</span>
              : <span>{freeSpots} vagas</span>}
          </>)
          : (
            <>
              <AiOutlineCloseCircle />
              <span>Esgotado</span></>
          )}
      </VacancyInfo>
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
    display: flex;
    justify-content: space-between;
`;

const ActivityText = styled.div`
  display: flex;
  flex-direction: column;
`;

const VacancyInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ freeSpots }) => freeSpots > 0 ? "#078632" : "#CC6666"};
  justify-content: center;
  align-items: center;
  border-left: 1px #CFCFCF solid;
  padding-left: 10px;
  gap: 5px;
  cursor: ${({ freeSpots }) => freeSpots > 0 ? "pointer" : "default"};;
  
  > svg {
    font-size: 25px;
    position: relative;
    left: ${({ freeSpots }) => freeSpots > 0 ? "-4px" : "0px"};;
  }
`;

const Title = styled.p`
    font-weight: 700;
    margin-bottom: 5px;
`;
