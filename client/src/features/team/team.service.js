
import { apiRequest } from "../../lib/api-client.js";

const BASE_URL = "/teams";

export const getAllTeams = async () => {
  return await apiRequest(BASE_URL);
};

export const getTeamById = async (id) => {
  return await apiRequest(`${BASE_URL}/${id}`);
};

export const createTeam = async (data) => {
  return await apiRequest(`${BASE_URL}/create`, {
    method: "POST",
    body: data,
  });
};

export const updateTeam = async (id, data) => {
  return await apiRequest(`${BASE_URL}/${id}`, {
    method: "PATCH",
    body: data,
  });
};

export const deleteTeam = async (id) => {
  return await apiRequest(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};


// import { apiRequest } from "../../lib/api-client";

// const BASE_URL = "/teams";

// export const getAllTeams = async () => {
//   return apiRequest(BASE_URL);
// };

// export const getTeamById = async (id) => {
//   return apiRequest(`${BASE_URL}/${id}`);
// };

// export const createTeam = async (data) => {
//   return apiRequest(`${BASE_URL}/create`, {
//     method: "POST",
//     body: data,
//   });
// };

// export const updateTeam = async (id, data) => {
//   return apiRequest(`${BASE_URL}/${id}`, {
//     method: "PATCH",
//     body: data,
//   });
// };

// export const deleteTeam = async (id) => {
//   return apiRequest(`${BASE_URL}/${id}`, {
//     method: "DELETE",
//   });
// };


