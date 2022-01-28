import { useState, useEffect } from "react";
import useApi from "../../../hooks/useApi";

import { toast } from "react-toastify";
import dayjs from "dayjs";

import ActivitiesBox from "../../../components/Activities/ActivitiesBox";
import LocalsNames from "../../../components/Activities/LocalsNames";
import ActivitiesBoard from "../../../components/Activities/ActivitiesBoard";
import { StyledTypography } from "../../../components/PagesTitle";
import getWeekdayName from "../../../components/Activities/utils/Weekdays";

export default function Activities() {
  const { activity } = useApi();
  const [weekdays, setWeekdays] = useState([]);
  const [locals, setLocals] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    activity.getActivitiesLocals()
      .then((response) => {
        setLocals(response.data);
        
        activity.getActivities()
          .then((res) => {
            setActivities(res.data);
            const weekdayNames = res.data.map(activity => {
              return getWeekdayName(dayjs(activity.date).day());
            });
            setWeekdays(new Set(weekdays));
          })
          .catch((error) => toast(error.response.data.message));
      })
      .catch((error) => toast(error.response.data.message));
  }, []);

  return (
    <ActivitiesBox>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      <div>
        botoes
      </div>
      <LocalsNames locals={locals} />
      <ActivitiesBoard 
        locals={locals} 
        activities={activities}
        weekdays={weekdays} 
      />
    </ActivitiesBox>
  );
}
