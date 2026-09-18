"use strict";

const leftPad = require("left-pad");
const providers = require("../config/providers.json");

const ROUTES = Object.freeze({
  "us:visa": "use1-card-primary",
  "us:mastercard": "use1-card-secondary",
  "eu:visa": "euw1-card-primary",
  "eu:mastercard": "euw1-card-secondary"
});

function selectRoute(request) {
  const merchantId = String(request?.merchantId || "").trim();
  const region = String(request?.region || "").trim().toLowerCase();
  const network = String(request?.network || "").trim().toLowerCase();

  if (!merchantId || !region || !network) {
    throw new TypeError("merchantId, region, and network are required");
  }

  const route = ROUTES[`${region}:${network}`] || `${region}-manual-review`;
  return {
    merchantId,
    route,
    provider: region === "us" ? providers.primary : providers.regionalFallbacks[0],
    correlationKey: `${leftPad(merchantId.length, 4, "0")}-${merchantId}`
  };
}

module.exports = { selectRoute };
