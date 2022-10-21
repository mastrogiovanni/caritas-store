<script>
    import { onMount } from "svelte";
    import { allRequests } from "./libs/apis.request";
    import * as moment from 'moment';
    import ReportPerRetailer from "./components/ReportPerRetailer.svelte";
    import RetailerList from "./components/RetailerList.svelte";

    let requests = [];
    let selected = -1;
    let retailer = undefined;
    let request = undefined;

    onMount(async () => {
        requests = await allRequests();
        if (requests && requests.length > 0) {
            select(0);
        }
    })

    function select(index) {
        selected = index;
        request = requests[selected]._id;
    }


</script>

<h1>Report per Fornitore</h1>

<div class="list-group">
	{#each requests as request, i (request._id)}
		<a
			on:click|preventDefault={() => select(i)}
			href="#!"
			class="list-group-item list-group-item-action {i === selected ? 'active' : ''}"
			aria-current={i === selected}
		>
            {moment(new Date(request.from)).format("MMM Do")} 
            - 
            {moment(new Date(request.to)).format("MMM Do")}
            ({request.type})
            - {request.notes || ''}

		</a>
	{/each}
</div>

<p />

<RetailerList onRetailer={(id) => { retailer = id }}></RetailerList>

<p/>

<ReportPerRetailer idRetailer={retailer} idRequest={request}></ReportPerRetailer>

