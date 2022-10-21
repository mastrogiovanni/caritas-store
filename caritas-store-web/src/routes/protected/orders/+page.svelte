<script>
    import { onMount } from "svelte";
    import * as moment from 'moment';
    import { orderForTenantAndRequest, upsertOrder } from "$lib/api.orders";
    import { currentRequest } from "$lib/apis.request";
    import { loadProducts } from "$lib/apis.products";
    import TenantList from "$lib/components/TenantList.svelte";
    import { currentUser } from "$lib/stores";
    import OrderList from "$lib/components/OrderList.svelte";
    import Retailer from "$lib/components/Retailer.svelte";

    let orderRequest = undefined;
    let currentTenant = $currentUser?.id;
    let orders = [];
    let products = [];
    
    onMount(async () => {
        // orderRequest = await currentRequest();
        onUser($currentUser.id);
    })

    async function reloadData() {
        if (orderRequest) {
            console.log("Current Tenant", currentTenant)
            orders = await orderForTenantAndRequest(currentTenant, orderRequest._id);
            products = await loadProducts();
            // Filter only right based on the order
            products = products.filter(item => (
                (item.orderType === orderRequest.type) || 
                (item.orderType === "all")
            ));

            products = products.filter(item => item.disabled !== "true")

            products = products.map(item => {
                const list = orders.filter(order => order.product === item._id)
                if (list && list.length > 0) {
                    return {
                        ...item,
                        quantity: list[0].quantity,
                        newQuantity: list[0].quantity
                    }
                }
                return {
                    ...item,
                    quantity: 0,
                    newQuantity: 0
                }
            })
        }
    }

    function onUser(id) {
        currentTenant = id;
        reloadData();
    }

    function needsSave() {
        return products.filter(item => parseFloat(item.quantity) !== parseFloat(item.newQuantity)).length > 0;
    }

    async function save() {
        for (let product of products.filter(item => { return parseFloat(item.quantity) !== parseFloat(item.newQuantity) })) {
            await upsertOrder(currentTenant, orderRequest._id, product._id, product.newQuantity);
            product.quantity = product.newQuantity;
        }
        products = products;
    }

    let needSave = false;

    $: {
        if (products) {
            needSave = needsSave();   
        }
    }
    
    function select(req) {
        console.log(req);
        orderRequest = req;
        reloadData();
    }

</script>

<h1>Ordini</h1>

<p/>

<OrderList {select}></OrderList>

<p/>

{#if orderRequest}

    <h2>Periodo: {moment(new Date(orderRequest.from)).format("MMM Do")} - {moment(new Date(orderRequest.to)).format("MMM Do")} ({orderRequest.type})</h2>
    {#if orderRequest.notes}    
    <small>{orderRequest.notes}</small>
    {/if}

    <div class="d-flex flex-row-reverse bd-highlight">
        <div class="p-2 bd-highlight">
            <button
                on:click|preventDefault={save}
                class="btn btn-primary" disabled={!needSave}>Salva</button
            >
        </div>
    </div>

    <table class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Fornitore</th>
                <th>Prezzo</th>
                <th>Unità</th>
                <th colspan="2">Quantità</th>
            </tr>
        </thead>
        <tbody>
            {#each products as product (product._id)}
                <tr>
                    <td>{product.name || ''}<br/>{product.description || ''}</td>
                    <td>{product.category}</td>
                    <td><Retailer id={product.retailer} /></td>
                    <td>{product.price}</td>
                    <td>{product.unity}</td>
                    <td>{product.quantity || ''}</td>
                    <td><input style="width: 100%" on:change={() => { needSave = needsSave() }} type="text" name={product._id} bind:value={product.newQuantity} ></td>
                </tr>
            {/each}
        </tbody>
    </table>

{:else}

    Nessuna Richiesta Ordine al momento

{/if}