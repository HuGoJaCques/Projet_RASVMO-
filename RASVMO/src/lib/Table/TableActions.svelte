<script>
  import { deleteRoutine } from "../stores/routines";
  import NotifSupp from "../Modal/NotifSupp.svelte";  
  import { getLinkType } from "../utils/linkHelper";
  import { addAlert } from "../stores/alert";
  let { row, onEdit } = $props();
  let showModal = $state(false);

  function openRoutineLink() {
    const linkType = getLinkType(row.lien);
    if (linkType === "web") {
      window.open(row.lien, "_blank", "noopener,noreferrer");
    } else if (linkType === "windows") {
      // Copier presse papier pour les chemins Windows pour le serveur prod qui bloque l'accès aux fonctionnalité de presse papier
      console.log("Opening Windows link: ", row.lien);
    }
  }

</script>
  
    <button title="Modifier la routine" onclick={() => onEdit(row)}>
      <i class='bx bx-edit cursor-pointer text-2xl'></i>
    </button>

    <button title="Supprimer la routine" onclick={()=>{    
      showModal = true;
    }}>
      <i class='bx bx-trash cursor-pointer text-2xl' style='color:#ff0000'></i>
    </button>

    {#if getLinkType(row.lien) === "web" || getLinkType(row.lien) === "windows"}
      <button 
        onclick={() => openRoutineLink()}
        title={getLinkType(row.lien) === "web" ? "Ouvrir l'application" : "Copier le chemin de l'application Windows"}
      >
        {#if getLinkType(row.lien) === "web"}
          <i class="bx bx-navigation text-2xl text-blue-600"></i>
        {:else}
          <i class="bx bx-folder-open text-2xl text-amber-500"></i>
        {/if}
      </button>
    {/if}

<NotifSupp bind:showModal={showModal} row={row}/>