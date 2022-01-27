import { useState, useEffect } from "react";
import useApi from "../../../hooks/useApi";

import { toast } from "react-toastify";

import ActivitiesBox from "../../../components/Activities/ActivitiesBox";
import Local from "../../../components/Activities/Local";

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
      {locals?.map((local, index) => 
        <Local
          key={index}
          local={local}
          activities={activities.filter((activity) => activity.local.id === local.id)}
        />
      )}
    </ActivitiesBox>
  );
}
