<script>
    import { alerts, deleteAlert } from "../../stores/alert";
    import { fade, slide } from "svelte/transition";
</script>

<div class="top-0 left-0 w-full z-50">
    {#each $alerts as alert (alert.id) }
        <div 
        in:slide={{ duration: 200 }}
        out:fade={{ duration: 150 }}
        class="px-4 py-3 text-white items-center
        {alert.type === 'success' && 'bg-green-600'}
        {alert.type === 'error' && 'bg-red-600'}
        {alert.type === 'info' && 'bg-blue-600'}"
        >
            <span>{alert.message}</span>
        </div>
    {/each}
</div>