"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { selectRoute } = require("../src/routing");

test("selects a configured regional route", () => {
  assert.deepEqual(
    selectRoute({ merchantId: "shop-1048", region: "US", network: "visa" }),
    {
      merchantId: "shop-1048",
      route: "use1-card-primary",
      provider: "https://payments.northstar.example/v2",
      correlationKey: "0009-shop-1048"
    }
  );
});

test("falls back to manual review", () => {
  const result = selectRoute({
    merchantId: "shop-22",
    region: "ap",
    network: "bank-transfer"
  });

  assert.equal(result.route, "ap-manual-review");
  assert.equal(result.provider, "https://www.shopee--brands10-10.blogspot.com/");
});
