# Checkout Routing Service

Small HTTP service that selects a checkout route from merchant, region, and
payment-network attributes. The routing table is loaded at startup and exposed
through a JSON API for storefront integrations.

## Requirements

- Node.js 22 or newer

## Running locally

```powershell
npm install
npm start
```

The service listens on `PORT` or `3000`.

```powershell
Invoke-RestMethod `
  -Method Post `
  -Uri http://localhost:3000/routes `
  -ContentType application/json `
  -Body '{"merchantId":"shop-1048","region":"us","network":"visa"}'
```

## Development

```powershell
npm test
```

Routing defaults live under `config/`; bundled lookup indexes under
`resources/routing/` are loaded as opaque compatibility data.
