<script>
  import TableImage from "./TableImage.svelte";
  import TableActions from "./TableActions.svelte";
  import Form from "../Form.svelte";
  import { fade } from "svelte/transition";

  export let row;
  export let ongletRoutine;
  export let selectedRowId;
  export let selectRow;
  export let selectImage;

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("fr-FR") : "—";
</script>

<tr class="hover:bg-gray-100 transition">

  <!-- Nom + statut UNIQUEMENT en suivi -->
    <td class="px-6 py-4 text-sm text-center">
      {#if ongletRoutine}
        <div class="grid grid-cols-[70px_1fr] items-center justify-items-center gap-3">
          {#if row.is_done === true}
            <span class="flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-700">
              <span class="w-2 h-2 rounded-full bg-green-500"></span>
              Faite
            </span>
          {:else if row.is_done === false}         
            <span class="flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                <span class="w-2 h-2 rounded-full bg-red-500"></span>
                À faire
            </span>            
          {/if}

          <span class="font-medium text-gray-800 text-center">
            {row.nom_routine}
          </span>          
        </div>  
      {:else}
           <span class="font-medium text-gray-800 text-center">
            {row.nom_routine}
          </span>  
      {/if}       
    </td>

    <!-- Description -->
  <td class="px-6 py-4 text-sm text-center">
    {row.description_routine}
  </td>

  <!-- Fréquence -->
  <td class="px-6 py-4 text-sm text-center">
    {row.libelle_frequence}
  </td>

  <!-- Commentaire -->
  <td class="px-6 py-4 text-sm text-center">
    {#if ongletRoutine}
      {row.last_commentaire ?? "Jamais exécutée"}
    {:else}
      {row.commentaire_routine_log ?? "—"}
    {/if}
  </td>

  <!-- Image (uniquement suivi) -->
  {#if !ongletRoutine}
    <TableImage {selectImage} image={row.image_path_log} />
  {/if}

  <!-- Date -->
  <td class="px-6 py-4 text-sm text-center">
    {#if ongletRoutine}
      {formatDate(row.last_date_execution)}
    {:else}
      {formatDate(row.date_execution_routine_log)}
    {/if}
  </td>

  <!-- Colonnes UNIQUEMENT routines -->
  {#if ongletRoutine}
    <td class="px-6 py-4 text-sm text-center">
      {formatDate(row.next_execution)}
    </td>

    <td class="px-6 py-4 text-sm text-center">
      <div class="flex items-center gap-2 w-32 mx-auto ">
        <TableActions row={row} onEdit={selectRow} />
      </div>
    </td>
  {/if}
</tr>

{#if ongletRoutine && selectedRowId === row.id_routine}
  <tr transition:fade>
    <td colspan="7" class="p-4 bg-gray-50">
      <Form {row} on:close={() => selectRow(null)} />
    </td>
  </tr>
{/if}