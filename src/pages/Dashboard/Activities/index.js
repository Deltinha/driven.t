import { useState, useEffect } from "react";
import useApi from "../../../hooks/useApi";

import { toast } from "react-toastify";

import ActivitiesBox from "../../../components/Activities/ActivitiesBox";
import LocalsNames from "../../../components/Activities/LocalsNames";
import ActivitiesBoard from "../../../components/Activities/ActivitiesBoard";

export default function Activities() {
  const { activity } = useApi();
  const [locals, setLocals] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    activity.getActivitiesLocals()
      .then((response) => {
        setLocals(response.data);
        
        activity.getActivities()
          .then((res) => setActivities(res.data))
          .catch((error) => toast(error.response.data.message));
      })
      .catch((error) => toast(error.response.data.message));
  }, []);

  return (
    <ActivitiesBox>
      <LocalsNames locals={locals} />
      <ActivitiesBoard locals={locals} activities={activities} />
    </ActivitiesBox>
  );
}
