
import { apiRequest } from "../../lib/api-client";

export function getAllPlayers() {
  return apiRequest("/players");
}

export function deletePlayer(id) {
  return apiRequest(`/players/${id}`, {
    method: "DELETE"
  });
}
