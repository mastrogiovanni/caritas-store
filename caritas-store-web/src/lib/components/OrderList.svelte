<script>
    import { onMount } from "svelte";
    import { currentRequest } from "$lib/apis.request";
    import moment from 'moment';

    export let select = undefined;

    let requests = []
    let selected = -1;
    
    onMount(async () => {
        requests = await currentRequest();
        if (requests && requests.length > 0) {
            _select(0);
        }
    });

    function _select(index) {
        if (select) {
            select(requests[index]);
        }
        selected = index;
    }
</script>

<div class="list-group">
	{#each requests as request, i (request._id)}
		<a
			on:click|preventDefault={() => { _select(i) }}
			href="#!"
			class="list-group-item list-group-item-action {i === selected ? 'active' : ''}"
			aria-current={i === selected}
		>
            {moment(new Date(request.from)).format("MMM Do")} 
            - 
            {moment(new Date(request.to)).format("MMM Do")}
            ({request.type})
            {request.notes}
		</a>
	{/each}
</div>