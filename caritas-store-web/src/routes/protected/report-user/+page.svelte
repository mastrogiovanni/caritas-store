<script>
    import { onMount } from "svelte";
    import { allRequests } from "$lib/apis.request";
    import moment from 'moment';
    import TenantList from "$lib/components/TenantList.svelte";
    import ReportPerTenant from "$lib/components/ReportPerTenant.svelte";

    let requests = [];

    let selected = -1;
    let tenant = undefined;
    let request = undefined;

    function select(index) {
        selected = index;
        request = requests[selected]._id;
    }

    onMount(async () => {
        requests = await allRequests();
        if (requests && requests.length > 0) {
            select(0);
        }
    })

</script>

<h1>Report per Cliente</h1>

<div class="list-group">
	{#each requests as request, i (request._id)}
		<a
			on:click|preventDefault={() => select(i)}
			href="#!"
			class="list-group-item list-group-item-action {i === selected ? 'active' : ''}"
			aria-current={i === selected}
		>
            {request?.from ? moment(new Date(request.from)).format("MMM Do") : ""}
            - 
            {request?.to ? moment(new Date(request.to)).format("MMM Do") : ""}
            ({request.type})
            - 
            {request.notes || ''}
		</a>
	{/each}
</div>

<p />

<TenantList onUser={(id) => { tenant = id }}></TenantList>
<p/>

<ReportPerTenant idTenant={tenant} idRequest={request}></ReportPerTenant>

