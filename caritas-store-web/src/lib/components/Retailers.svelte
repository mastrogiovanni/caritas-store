<script>
    import { onMount } from "svelte";
    import { loadRetailers } from "$lib/apis.retailer";

    export let id;
    export let value;

    let retailers = [];

    onMount(async () => {
        retailers = await loadRetailers();
    }) 
</script>

<label for={id} class="form-label">Fornitore</label>
<select bind:value={value} id={id} aria-describedby="{id}Help" class="form-select" aria-label="Tipo Ordine">
    <option selected>-</option>
    {#each retailers as retailer (retailer._id)}
        <option value={retailer._id}>{retailer.name}</option>
    {/each}
</select>
<div id="{id}Help" class="form-text">Fornitore</div>
