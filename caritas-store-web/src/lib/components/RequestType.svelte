<script>
    export let id;
    export let value;
</script>

<label for={id} class="form-label">Tipo</label>
<select bind:value={value} id={id} aria-describedby="{id}Help" class="form-select" aria-label="Tipo Ordine">
    <option selected>-</option>
    <option value="weekly">Settimanale</option>
    <option value="monthly">Mensile</option>
</select>
<div id="{id}Help" class="form-text">Tipo</div>
