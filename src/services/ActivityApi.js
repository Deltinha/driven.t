import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class ActivityApi extends AuthenticatedApi {
  getActivities() {
    return api.get("/activities", {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }

  getActivitiesLocals() {
    return api.get("/activities/locals", {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }
}