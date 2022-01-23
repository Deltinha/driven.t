import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class HotelApi extends AuthenticatedApi {
  getBooking() {
    return api.get("/hotels/booking", {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }
}
