<script>
    import { fly } from "svelte/transition";

    // Données d'entrée pour la barre de progression
    let { progress = $bindable(), max = $bindable() } = $props(); // Valeur

</script>
    <div class="w-full bg-gray-200 rounded-full h-6 dark:bg-gray-700">
        <div
            class="bg-blue-600 h-6 rounded-full transition-all duration-500 ease-in-out"
            style="width: {Math.min((progress / max) * 100, 100)}%"
            transition:fly={{ y: 20, duration: 300 }}
        ></div>
    </div>