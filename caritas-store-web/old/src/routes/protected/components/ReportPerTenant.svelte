<script>
    import { onMount } from "svelte";
    import { orderForTenantAndRequest } from "../libs/api.orders";
    import Retailer from "./Retailer.svelte";

    export let idTenant;
    export let idRequest;

    let orders = [];
    
    onMount(async () => {
        reload();
    })

    async function reload() {
        if (idTenant && idRequest) {
            orders = await orderForTenantAndRequest(idTenant, idRequest)
        }
    } 

    $: {
        if (idTenant && idRequest) {
            reload();
        }
    }
</script>

{#if orders}
<table class="table">
    <thead>
        <tr>
            <th>Product</th>
            <th>Categoria</th>
			<th>Fornitore</th>
			<th>Prezzo Unitario</th>
            <th>Quantità</th>            
            <th>Totale</th>
        </tr>
    </thead>
    <tbody>
        {#each orders as order (order._id)}
            <tr>
                <td>{order.name || ''}<br/>{order.description || ''}</td>
                <td>{order.category || ''}</td>
				<td><Retailer id={order.retailer} /></td>
				<td>{order.price || ''}&euro;/{order.unity || ''}</td>
                <td>{order.quantity} {order.unity || ''}</td> 
                <td>{+order.quantity * +order.price}&euro;</td>
            </tr>
        {/each}
    </tbody>
</table>
{/if}
