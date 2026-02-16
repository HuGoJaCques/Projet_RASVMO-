import { writable } from "svelte/store";
import { getRoutinesFreq, deleteRoutines, updateRoutines } from "../api/routine";
import { getRoutinesJour } from "../api/routine_jour";
import { addAlert } from "./alert";

export const routinesDay = writable([]);
export const routinesFrequency = writable([]);

export async function loadRoutinesDay() {
  routinesDay.set(await getRoutinesJour());
}

export async function loadRoutinesFrequency(freq) {
  routinesFrequency.set(await getRoutinesFreq(freq));
}

export async function deleteRoutine(id) { 
  try{
    await deleteRoutines(id);

    routinesDay.update(list =>
      list.filter(r => r.id_routine !== id)
    );

    routinesFrequency.update(list =>
      list.filter(r => r.id_routine !== id)
    );
    addAlert('Routine supprimée avec succès')
  } catch(e) {
    addAlert('Erreur lors de la suppression', 'error')
    throw e;
  }  
}

export async function updateRoutine(id, data) {
  try{
     const updated = await updateRoutines(id, data);

    routinesDay.update(list =>
        list.map(r => 
            r.id_routine === id ? {...r, ...updated} : r
        )
    )

    routinesFrequency.update(list =>
        list.map(r => 
            r.id_routine === id ? {...r, ...updated} : r
        )
    )
    addAlert('Routine mise à jour');
  } catch (e){
    addAlert('Erreur modification routine', 'error')
    throw e;
  }   
}
