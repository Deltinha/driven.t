import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class TicketApi extends AuthenticatedApi {
  getTicketFromUser() {
    return api.get("/tickets/user", {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }
}
