"use strict";

const cds = require("@sap/cds");
const proxy = require("@sap/cds-odata-v2-adapter-proxy");

// criar proxy /v2/* para odata v2
cds.on("bootstrap", async function (app) {
    app.use(proxy({}));
});

module.exports = cds.server;