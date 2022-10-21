<script>
    import { goto } from "$app/navigation";
    import { session } from "$app/stores";

    function logout() {
        $session = {};
        localStorage.removeItem("login");
        goto("/login");
    }
</script>

<!-- src/routes/__layout.svelte -->
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/protected">Home</a>
                </li>
                {#if $session.role === 'admin'}
                <li class="nav-item">
                    <a class="nav-link" href="/protected/users">Utenti</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/protected/retailers">Fornitori</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/protected/products">Prodotti</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/protected/order-requests">Ordini</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/protected/report-user">Report Cliente
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/protected/report-retailer">Report Fornitore
                    </a>
                </li>
                {/if}

                {#if $session.role === 'user'}
                <li class="nav-item">
                    <a class="nav-link" href="/protected/orders">Orders</a>
                </li>
                {/if}

                <!--
            <li class="nav-item dropdown">
                <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Dropdown
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><hr class="dropdown-divider" /></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li>
            -->
            </ul>
            <form class="d-flex">
                <!--
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button class="btn btn-outline-success" type="submit">Search</button>
                -->
                <button on:click={logout} class="btn btn-outline-success" type="submit">Logout</button>
            </form>
        </div>
    </div>
</nav>

<div class="container">
    <div class="row">
        <div class="col">
            <slot />
        </div>
    </div>
</div>
