import { apiFetchGet, apiFetchUpdate,  } from "./client";

export function updateRoutinesJour(id, data) {
     return apiFetchUpdate(`/routine_jour/update/${id}`, data);
}

export function getRoutinesJour() {
     return apiFetchGet(`/routine_jour`);
}