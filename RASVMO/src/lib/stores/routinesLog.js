import { writable } from "svelte/store";
import { getRoutinesLog, addRoutineLog } from "../api/routine_log";

export const routinesLog = writable([]);

export async function loadRoutinesLog(date) {
  routinesLog.set(await getRoutinesLog(date));
}

export async function saveRoutineLog(routineData) {
  await addRoutineLog(routineData);
}
