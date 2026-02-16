<script>
    import { updateRoutine } from "./stores/routines";
    import { createEventDispatcher, onMount } from "svelte";
    export let row = {}; 
    const dispatch = createEventDispatcher();

    //copie local
    let formData = {};
    
    onMount(() => {
        formData = {
            ...row,
            nom_routine: row.nom_routine,
            description_routine: row.description_routine,
            lien: row.lien
        };
    });

    async function save() {
        try{
            await updateRoutine(row.id_routine, formData);
            dispatch('close');
        } catch(e){
            console.error('Erreur modification routine', e);
        }
    }

    function closeForm(){
        dispatch('close');
    }
</script>

<div class="border rounded-2xl">
    <div class="flex justify-end pt-2 pr-2">
        <button title="Fermer la fenêtre" on:click={closeForm}>
            <i class='bx bx-window-close bx-flip-vertical text-2xl' style='color:#ff0000' ></i>
        </button>
    </div>

    <form on:submit|preventDefault={save} class="flex flex-wrap gap-x-4 gap-y-2 p-4">

        <div class="flex-1">            
            <label for="routine" class="block text-sm font-medium mb-1 text-gray-700">Routine</label>
            <div class="mt-2"> 
                <input type="text"
                    bind:value={formData.nom_routine}
                    class="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500rder border">
            </div>
        </div>

        <div class="flex-1">            
            <label for="description" class="block text-sm font-medium mb-1 text-gray-700">Description</label>
            <div class="mt-2"> 
                <textarea
                    id="description"
                    bind:value={formData.description_routine}
                    class="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500rder border"
                    rows="2">
                </textarea>
            </div>
        </div> 

        <div class="flex-1">            
            <label for="#" class="block text-sm font-medium mb-1 text-gray-700">Lien</label>
            <div class="mt-2"> 
                <textarea
                    id="lien"
                    bind:value={formData.lien}
                    class="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500rder border"
                    rows="2">
                </textarea>
            </div>
        </div>
        
        <div class="w-full flex justify-end mt-4">
            <button type="submit"
                class="bg-blue-700 text-white font-bold px-4 py-2 rounded-2xl hover:bg-blue-500 transition">
                Modifier la routine
            </button>
        </div>
    </form>

</div>









