<script>
  import { onMount } from "svelte";
    import Filter from "../Filter.svelte";
    import Tables from "../Table/Tables.svelte";
    import { loadRoutinesLog } from "../stores/routinesLog";  
    
    //Obtenir la date date de la veille 
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() -1);
    let yesterdayformatted = yesterday.toISOString().split('T')[0];
    let selectedDate = $state(yesterdayformatted);
    let lastSelectedDate;

    onMount(() => {
        loadRoutinesLog(yesterdayformatted);
    })

    $effect(() => {
        if (typeof selectedDate === "string" && selectedDate.length === 10 && selectedDate !== lastSelectedDate) {
            lastSelectedDate = selectedDate;
            console.log(selectedDate);
            loadRoutinesLog(selectedDate);
        };
    })    
</script>

<div class="m-6 w-64">
    <label for="#" class="block text-sm font-medium text-gray-700">Filtrer par date</label>
    <Filter type="date" bind:value={selectedDate}/>
</div>

<Tables ongletRoutine={false}/>