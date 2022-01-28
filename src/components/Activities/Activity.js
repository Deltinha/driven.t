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

  function convertStartToMinutes() {
    const day = dayjs(activityInfo?.date);
    const startHourToMinutes = (day.hour() * 60) - 9 * 60;
    const startMinutes = day.minute();

    return startHourToMinutes + startMinutes;
  }

  return (
    <ActivityCard height={(90 / 60) * activityInfo.duration} position={convertStartToMinutes() * (90 / 60)}>
      <ActivityText>
        <Title>
          {activityInfo?.name}
        </Title>
        <p>
          {printActivityDuration()}
        </p>
      </ActivityText>
      <VacancyInfo>
        <ReserveButton freeSpots={freeSpots}>
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
        </ReserveButton>
      </VacancyInfo>
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
    display: flex;
    justify-content: space-between;
`;

const ActivityText = styled.div`
  display: flex;
  flex-direction: column;
`;

const VacancyInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px #CFCFCF solid;
  padding-left: 10px;
  
`;

const ReserveButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: ${({ freeSpots }) => freeSpots > 0 ? "pointer" : "default"};
  color: ${({ freeSpots }) => freeSpots > 0 ? "#078632" : "#CC6666"};

  svg {
    font-size: 25px;
    position: relative;
    left: ${({ freeSpots }) => freeSpots > 0 ? "-4px" : "0px"};;
  }
`;

const Title = styled.p`
    font-weight: 700;
    margin-bottom: 5px;
`;
