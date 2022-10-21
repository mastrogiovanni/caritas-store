# Product

## Aggiungi un prodotto
http POST localhost:3000/api/product name=Tacchino description="Bel tacchino"

## Tutti i prodotti
http GET localhost:3000/api/product

# Tenant

## Crea Tenant
http POST localhost:3000/api/tenant name="Casa Giacinta"

## Lista Tenants
http GET localhost:3000/api/tenant

# Order Request

## Create an Order Request
http POST localhost:3000/api/orderrequest from="2022-02-12T15:31:09.431Z" to="2022-03-12T15:31:09.431Z" notes="Non facciamo scherzi"

## Current Order Request
http GET localhost:3000/api/orderrequest

## Tenant Order Placed
http GET localhost:3000/api/order/tenant/6207e6d112da824cd94edc80/request/6207e6eb12da824cd94edc82

# Order

## Tenant place an order for a product in an order request
http PUT localhost:3000/api/order idTenant=6207e6d112da824cd94edc80 idOrderRequest=6207e6eb12da824cd94edc82 idProduct=6207e6c512da824cd94edc7e quantity=0

