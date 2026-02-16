<script>
  import { API_BASE_URL } from "../config";

  export let image;
  export let selectImage;
  let imageURL = `${API_BASE_URL}/upload/routines/${image}`
</script>

<td class="px-6 py-4 text-sm text-gray-800 text-center">
  {#if image}
    <button on:click={() => {
      selectImage(imageURL)
      console.log(imageURL)
    }}>
      <img src={imageURL} alt="Capture d'écran" class="h-auto w-50 mx-auto cursor-pointer transform hover:scale-110 transition duration-300 ease-in-out" />
    </button>
  {:else}
    <span>—</span>    
  {/if}
</td>
