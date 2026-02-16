import { writable } from "svelte/store";
import {v4 as uuidv4} from 'uuid';

export const alerts = writable([]);

export function addAlert(message, type = 'success', timeout = 2000) {
    const id = uuidv4();
    alerts.update(a => {
        a.splice(0, a.length);
        a.push({ id, message, type });
        return a;
    });
    if(timeout){
        setTimeout(() => {
            deleteAlert(id);
        }, timeout);
    }
}

export function deleteAlert(id) {
    alerts.update(a => a.filter(alert => alert.id !== id));
}