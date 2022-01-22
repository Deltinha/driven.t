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

  saveReservation(roomId) {
    return api.post(
      `/hotels/reservation/${roomId}`,
      {},
      {
        headers: {
          ...this.getAuthorizationHeader(),
        },
      }
    );
  }

  getReservation() {
    return api.get("/hotels/reservation", {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }
}
