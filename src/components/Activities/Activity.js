import styled from "styled-components";
import dayjs from "dayjs";
import { BiLogIn, BiCheckCircle } from "react-icons/bi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import TicketContext from "../../contexts/TicketContext";

import useApi from "../../hooks/useApi";
import useHover from "../../hooks/useHover";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";

export default function Activity({ activityInfo }) {
  const [hoverRef, isHovered] = useHover();
  const [ freeSpots, setFreeSpots ] = useState(activityInfo.freeSpots);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const activityId = activityInfo.id;
  const { activity, ticket } = useApi();
  const { ticketData, setTicketData } = useContext(TicketContext);

  useEffect(() => {
    setIsSignedUp(ticketData.activities.some((act) => act.id === activityInfo.id));
  }, []);

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

  function signUpToActivity() {
    activity.signUp(activityId)
      .then(() => {
        setIsSignedUp(true);
        ticket.getTicketFromUser()
          .then((res) => setTicketData(res?.data));
      })
      .catch(err => {
        toast(err.response?.data.message);
        setFreeSpots(err.response?.data.object.freeSpots);
      });
  }

  function signOutFromActivity() {
    activity.signOut(activityId)
      .then((res) => {
        setIsSignedUp(false);
        setFreeSpots(res.data.freeSpots);
        ticket.getTicketFromUser()
          .then((response) => setTicketData(response?.data));
      })
      .catch(err => {
        toast(err.response?.data.message);
      });
  }

  return (
    <ActivityCard height={(90 / 60) * activityInfo.duration} position={convertStartToMinutes() * (90 / 60)} isSignedUp={isSignedUp} >
      <ActivityText>
        <Title>
          {activityInfo?.name}
        </Title>
        <p>
          {printActivityDuration()}
        </p>
      </ActivityText>
      <VacancyInfo isSignedUp={isSignedUp}>
        <ReserveButton freeSpots={freeSpots} isSignedUp={isSignedUp} ref={hoverRef}>
          {isSignedUp ? 
            <div onClick={signOutFromActivity}>
              {isHovered ?
                <>
                  <AiOutlineCloseCircle />
                  <span>Desinscrever</span>
                </>
                :
                <>
                  <BiCheckCircle />
                  <span>Inscrito</span>
                </>
              }
            </div>
            :(freeSpots > 0 ?
              (<div onClick={signUpToActivity}>
                <BiLogIn />
                {freeSpots === 1 ?
                  <span>{freeSpots} vaga</span>
                  : <span>{freeSpots} vagas</span>}
              </div>)
              : (
                <div>
                  <AiOutlineCloseCircle />
                  <span>Esgotado</span>
                </div>
              ))}
        </ReserveButton>
      </VacancyInfo>
    </ActivityCard>
  );
}

const ActivityCard = styled.li`
    width: calc(100% - 20px);
    height: ${({ height }) => height - 10}px;
    padding: 10px;
    background-color: ${({ isSignedUp }) => isSignedUp ? "#D0FFDB" : "#f1f1f1"};
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
  border-left: 1px solid ${({ isSignedUp }) => isSignedUp ? "#99E8A1" : "#CFCFCF"};
  padding-left: 10px;
  
`;

const ReserveButton = styled.div`
  width: 60px;
  cursor: ${({ freeSpots, isSignedUp }) => freeSpots > 0 || isSignedUp ? "pointer" : "default"};
  color: ${({ freeSpots, isSignedUp }) => freeSpots > 0 || isSignedUp ? "#078632" : "#CC6666"};

  svg {
    font-size: 25px;
    position: relative;
    left: ${({ freeSpots, isSignedUp }) => freeSpots > 0 && !isSignedUp ? "-4px" : "0px"};;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }
`;

const Title = styled.p`
    font-weight: 700;
    margin-bottom: 5px;
`;
