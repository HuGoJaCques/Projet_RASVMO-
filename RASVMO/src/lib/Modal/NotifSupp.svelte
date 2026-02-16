<script>
    import { deleteRoutine } from "../stores/routines";
    let { showModal = $bindable(), row } = $props();
    let dialog = $state();    

    $effect(() => {
        if (showModal) dialog.showModal();
    })
</script>

<dialog class="rounded-2xl shadow-lg w-full max-w-lg mx-auto my-auto" bind:this={dialog} onclose={() => (showModal = false)} onclick={(e) => { if (e.target === dialog) dialog.close(); }}>
    <div class="bg-white rounded-2xl overflow-hidden">

        <div class="px-6 py-4 bg-red-50 border-b">
            <h2 class="text-lg font-semibold text-red-700">
                Confirmation de suppression
            </h2>
        </div>      
        <div class="px-6 py-5">
            <p>Êtes-vous sûr de vouloir supprimer cette routine ?</p>
        </div>  
        <footer class="px-6 py-4 flex justify-end gap-3 bg-gray-50">
            <button class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onclick={() => { dialog.close(); showModal = false; }}>Annuler</button>
            <button class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onclick={() => {
                deleteRoutine(row.id_routine);
                dialog.close();
                showModal = false;
            }}>Supprimer</button>
        </footer>
    </div>
</dialog>