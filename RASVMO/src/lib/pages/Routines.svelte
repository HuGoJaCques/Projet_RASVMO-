<script>
    import Filter from "../Filter.svelte";
    import Tables from "../Table/Tables.svelte";
    import Modal from "../Modal/Modal.svelte";
    import ModalRoutine from "../Modal/ModalRoutine.svelte";
    import { onMount } from "svelte";
    import { getFrequences } from "../api/frequences";
    import { loadRoutinesDay, loadRoutinesFrequency, routinesDay, routinesFrequency } from "../stores/routines";
    import Alert from "../Components/Alert/Alert.svelte";

    let selectedOption =$state(null);
    let showModal = $state(false);
    let showModalRoutine = $state(false);
    let frequence = $state([]);
    let error = null;

    // Chargement initial
    onMount(async () => {
        try{
            frequence = await getFrequences();
            loadRoutinesDay();
        }catch (e) {
            error = e.message;
        }
    })   

    $effect(() => {
        if(selectedOption){
            loadRoutinesFrequency(selectedOption.label);
        }
    })   

    //Refresh après ajout et suppression
    async function refreshRoutines() {
        if(selectedOption) {
            await loadRoutinesFrequency(selectedOption.label);
        }
        await loadRoutinesDay();
    }
</script>

<div class="m-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

    <!-- Bloc Filtre -->
    <div class="sm:w-auto"> 
        <Filter {frequence} bind:value={selectedOption}/>      
    </div>

    <div class="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
        <button 
            onclick={() => (showModal = true)} 
            class="flex items-center justify-center bg-blue-600/90 backdrop-blur-sm hover:bg-blue-500/90 text-white font-semibold text-sm py-2 px-4 rounded-xl gap-2 sm:w-auto
            shadow-md hover:shadow-lg transition-all duration-200 active:scale-95">
            Ajouter une routine
            <i class='bx bx-plus'></i>
        </button>
    </div>

    <Modal bind:showModal {frequence} onSuccess={refreshRoutines}/>
</div>
    
<Alert/>
{#if selectedOption}
    {#if $routinesFrequency.length === 0 }
        <span class="flex justify-center w-full">
            <b>Aucune Routine enregistrée pour la fréquence {selectedOption.label}</b>
        </span>
    {:else}
        <Tables data={$routinesFrequency} ongletRoutine={true} />
    {/if}
{:else}
    {#if $routinesDay.length === 0}
        <span class="flex justify-center w-full">
            <b>Aucune routine n'est prévue pour aujourd'hui</b>
        </span>
    {:else}
        <Tables data={$routinesDay} ongletRoutine={true}/>
    {/if}
{/if}

<button class="flex items-center justify-center bg-blue-600/90 backdrop-blur-sm hover:bg-blue-500/90 text-white font-semibold text-sm py-2 px-4 rounded-xl gap-2 sm:w-auto
            shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 m-6 {$routinesDay.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}" type="button" onclick={() => (showModalRoutine = true)}>
        Lancer la routine
</button>

<ModalRoutine bind:showModalRoutine/>