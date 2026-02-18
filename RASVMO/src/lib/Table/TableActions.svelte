<script>
  import { deleteRoutine } from "../stores/routines";
  import NotifSupp from "../Modal/NotifSupp.svelte";  
  import { getLinkType } from "../utils/linkHelper";
  import { addAlert } from "../stores/alert";
  import RoutineIcon from "../Modal/RoutineIcon.svelte";
  let { row, onEdit } = $props();
  let showModal = $state(false);
  let isHovered = $state(false);

  function openRoutineLink() {
    const linkType = getLinkType(row.lien);
    if (linkType === "web") {
      window.open(row.lien, "_blank", "noopener,noreferrer");
    } else if (linkType === "windows") {
      // Copier presse papier pour les chemins Windows pour le serveur prod qui bloque l'accès aux fonctionnalité de presse papier
      navigator.clipboard.writeText(row.lien)
        .then(() => {
          addAlert("Chemin copié dans le presse-papier !", "info");
        })
        .catch(err => {
          addAlert({ type: "error", message: "Erreur lors de la copie du chemin : " + err });
        });
    }
  }

</script>

    {#if getLinkType(row.lien) === "web" || getLinkType(row.lien) === "windows"}
      <button 
        onclick={() => openRoutineLink()}
        title={getLinkType(row.lien) === "web" ? "Ouvrir l'application" : "Copier le chemin de l'application Windows"}
      >
        {#if getLinkType(row.lien) === "web"}
          <RoutineIcon iconNormal="bx-navigation" iconHover="bxs-navigation" color="text-blue-500"/>
        {:else}
          <RoutineIcon iconNormal="bx-folder-open" iconHover="bxs-folder-open" color="text-amber-500"/>
        {/if}
      </button>
    {/if}

    <button title="Modifier la routine" onclick={() => onEdit(row)}>
      <RoutineIcon iconNormal="bx-edit" iconHover="bxs-edit" color="text-gray-500"/>
    </button>

    <button title="Supprimer la routine" onclick={()=>{showModal = true;}}>
      <RoutineIcon iconNormal="bx-trash" iconHover="bxs-trash" color="text-red-500"/>
    </button>    

<NotifSupp bind:showModal={showModal} row={row}/>