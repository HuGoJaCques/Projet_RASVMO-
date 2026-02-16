<script>
  import TableHeader from "./TableHeader.svelte";
  import TableRow from "./TableRow.svelte";
  import { routinesLog } from "../stores/routinesLog";
  
  let { ongletRoutine, data = null } = $props();

  // Si data est fourni en props, on l'utilise, sinon on utilise le store routinesLog
  let tableData = $derived(data ?? $routinesLog);

  let selectedRowId = $state(null);
  let selectImage = $state(null);

  function selectRow(row) {
    selectedRowId = row?.id_routine ?? null;
  }    
</script>

<div class="m-6 overflow-auto">  
  <div class="inline-block min-w-full rounded-xl border border-gray-200 shadow-sm bg-white">

    <table class="min-w-full">

      <TableHeader {ongletRoutine} />

      <tbody>
        {#each tableData as row}
          <TableRow 
            {row}
            {ongletRoutine}
            {selectedRowId}
            selectRow={selectRow}
            selectImage={(img) => selectImage = img}
          />
        {/each}
      </tbody>

    </table>
  </div>
</div>

{#if selectImage}
  <div class="fixed inset-0 flex justify-center items-center z-50">
    <!-- Fond cliquable -->
    <button class="absolute inset-0 bg-gray-900/80" onclick={() => selectImage = null} aria-label="Fermer l'image"></button>
    <!-- Conteneur de l'image au-dessus du fond -->
    <div class="relative z-10 max-w-[70vw] max-h-[80vh] bg-white p-2 rounded-lg shadow-lg">
      <img 
        src={selectImage} 
        alt="Aperçu"
        class="max-w-full max-h-full rounded-lg"
      />
    </div>
  </div>
{/if}



