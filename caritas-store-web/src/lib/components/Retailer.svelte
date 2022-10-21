<script>
    import { onMount } from "svelte";
    import { loadRetailer } from "$lib/apis.retailer";
    import { get, getOrExecute, set } from "$lib/cache";

    export let id;

    let retailer = {}

    onMount(async () => {
        if (!id) {
            return;
        }
        retailer = await getOrExecute("retailer-" + id, async () => {
            return await loadRetailer(id);
        })
    })
</script>

{#if id && retailer}
{retailer.name}
{/if}