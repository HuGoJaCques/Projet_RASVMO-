<script>
  export let ongletRoutine = false;
</script>

<thead class="bg-gray-50 text-gray-700">
  <tr>
    <th class="px-6 py-4">Routine</th>
    <th class="px-6 py-4">Description</th>
    <th class="px-6 py-4">Fréquence</th>

    <th class="px-6 py-4">
      {ongletRoutine ? "Dernier commentaire" : "Commentaire"}
    </th>

    {#if !ongletRoutine}
      <th class="px-6 py-4">Capture d’écran</th>
    {/if}

    <th class="px-6 py-4">
      {ongletRoutine ? "Date de dernière exécution" : "Date d’exécution"}
    </th>

    {#if ongletRoutine}
      <th class="px-6 py-4">Prochaine exécution</th>
      <th class="px-6 py-4">Actions</th>
    {/if}
  </tr>
</thead>
