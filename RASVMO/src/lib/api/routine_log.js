import { apiFetchGet, apiFetchPost  } from "./client";

export function getRoutinesLog(date) {
    return apiFetchGet(`/routinelog/${date}`);
}

export function addRoutineLog(routineData) {
    return apiFetchPost(`/routinelog/update`, routineData);
}