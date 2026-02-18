<script>
    let { iconNormal, iconHover, color } = $props();
    let hovered = $state(false);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<i
    class="bx text-2xl {color} cursor-pointer {hovered ? iconHover : iconNormal}"
    onmouseenter={() => hovered = true}
    onmouseleave={() => hovered = false}>
</i>