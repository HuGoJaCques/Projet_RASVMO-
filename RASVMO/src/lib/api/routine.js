import { apiFetchGet, apiFetchPost, apiFetchDelete, apiFetchUpdate } from "./client";

export function getRoutinesFreq(frequence) {
    return apiFetchGet(`/routine/${frequence}`);
}

export function getRoutinesJour() {
    return apiFetchGet(`/get_routine_jour`);
}

export function addRoutines(data) {
    return apiFetchPost('/routine', data);
}

export function deleteRoutines(id) {
    return apiFetchDelete(`/delete/${id}`);
}

export function updateRoutines(id, data) {
     return apiFetchUpdate(`/update/${id}`, data);
}

