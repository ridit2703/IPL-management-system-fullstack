
import { apiRequest } from "../../lib/api-client";

export function getAllTeams() {
  return apiRequest("/teams");
}

export function getTeamById(id) {
  return apiRequest(`/teams/${id}`);
}

export function createTeam(teamData) {
  return apiRequest("/teams/create", {
    method: "POST",
    body: teamData,
  });
}