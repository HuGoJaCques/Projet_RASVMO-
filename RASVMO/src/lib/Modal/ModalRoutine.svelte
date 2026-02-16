<script>
    import { updateRoutinesJour } from "../api/routine_jour";
    import InputFIle from "../InputFIle.svelte";
    import { routinesDay, loadRoutinesDay } from "../stores/routines";
    import { saveRoutineLog } from "../stores/routinesLog";
    import { addAlert } from "../stores/alert";
    import ProgressBar from "../Components/ProgressBar/ProgressBar.svelte"; 
    import { getLinkType } from "../utils/linkHelper";
    import { handleValidation } from "../utils/validationUtils";

    let { showModalRoutine = $bindable() } = $props();
    let dialog;
     
    let commentaire = $state('');
    let image = $state("");

    //Liste des routines non faites
    let routinesAFaire = $derived($routinesDay.filter(r => r.is_done === false));    

    //Routine courante = toujours la première
    let currentRoutine = $derived(routinesAFaire[0]);

    //Compteur figé
    let totalRoutinesAFaire = $state(0);
    let completedCount = $state(0); 

    //Variable globale windows
    let windowObjectReference = $state(null);
    
    //fonction pour ouvrir le lien
    function openRoutineLink(routine){   
        if(!routine || !routine.lien) return;
        if(getLinkType(routine.lien) === "windows") {
            console.log("Opening Windows link: ", routine.lien);        
        }
        else if(getLinkType(routine.lien) === "web") {
            if(windowObjectReference && !windowObjectReference.closed){
                windowObjectReference.close();
            }
            windowObjectReference = window.open(
                routine.lien,
                "_blank"
            )
        }
    }

    $effect(() => {
        if (!showModalRoutine){
            commentaire = "";
            image = null;
            return;
        };

        // Sécurité : ne pas ouvrir le modal si aucune routine à faire
        if(routinesAFaire.length === 0) {
            showModalRoutine = false;
            addAlert("Toutes les routines du jour ont été complétées !", "success");           
            // Fermer le modal si jamais il est ouvert
            if (dialog?.open) {
                dialog.close();
            }
            return;
        }

        if (!dialog?.open) {
            totalRoutinesAFaire = routinesAFaire.length;
            completedCount = 0;
            dialog.showModal();
            openRoutineLink(routinesAFaire[0]);
        }
    })

    async function handlesubmit(event) {
        event.preventDefault();
        if (!currentRoutine) return;
        
        try {
            await updateRoutinesJour(currentRoutine.id_routine, {
                commentaire: commentaire,
                image: image
            });

            // Recuperer les données avant cuurentRoutine devient la suivante ou null
            const logData = {
                nom_routine: currentRoutine.nom_routine,
                description: currentRoutine.description_routine,
                frequence: currentRoutine.libelle_frequence,
                date_execution: new Date().toISOString(),
                commentaire: commentaire,
                image: image
            };

            await saveRoutineLog(logData);

            commentaire = "";
            image = null;
            completedCount++;
            await loadRoutinesDay(); // Recharger les routines du jour après la mise à jour  

            if(routinesAFaire.length > 0) {
                openRoutineLink(routinesAFaire[0]);   
            }
        } catch (error) {
            // Fermer le modal en cas d'erreur critique (ex: perte de connexion) pour éviter que l'utilisateur reste bloqué
            if (dialog?.open) {
                dialog.close();
            }            
            console.error("Erreur lors de la mise à jour de la routine :", error);
            addAlert("Une erreur est survenue lors de la validation de la routine. Veuillez réessayer.", "error");
        }        
    }
</script>

<dialog class="p-6 rounded-2xl shadow-lg w-full max-w-lg mx-auto my-auto" bind:this={dialog} onclose={() => (showModalRoutine = false)}	onclick={(e) => { if (e.target === dialog) dialog.close(); }}>
    <form  class="bg-white p-6 rounded-2xl space-y-6 w-full" onsubmit={handlesubmit}>
        <div class="text-center border-b pb-3">
            <h2 class="text-2xl font-semibold">{currentRoutine?.nom_routine}</h2>             
        </div>
        
        <div class="space-y-4 ">
            <div>
                <label class="text-sm font-medium mb-1 text-gray-700" for="">Commentaire</label>
                <input bind:value={commentaire} type="text" class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                oninvalid={(e) => handleValidation(e)} oninput={(e) => handleValidation(e)} required
                >  
            </div>
        </div>

        <InputFIle bind:imagepath={image}/>

        <div class="mt-4 flex flex-col space-y-1 text-center">
            <p class="text-sm text-gray-500">
                {completedCount} / {totalRoutinesAFaire}
            </p>
            <ProgressBar progress={completedCount} max={totalRoutinesAFaire} />
        </div>        

        <div class="flex justify-end gap-3 mt-4">
            <button onclick={() => dialog?.close()} class="px-4 py-2 rounded-md border border-red-400 text-red-500 hover:bg-red-50 transition" type="reset">Annuler</button>
            <button class="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition" type="submit">Valider</button>
        </div>
    </form>
</dialog>
