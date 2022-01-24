import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class Hotel extends AuthenticatedApi {
  listAll() {
    return api.get("/hotels", {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }

  listRooms(hotelId) {
    return api.get(`/hotels/${hotelId}/rooms`, {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }

  getBooking() {
    return api.get("/hotels/booking", {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }

  saveBooking(roomId) {
    return api.post(
      `/hotels/${roomId}`,
      {},
      {
        headers: {
          ...this.getAuthorizationHeader(),
        },
      }
    );
  }
}
