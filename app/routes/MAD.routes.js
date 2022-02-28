module.exports = app => {
    const whitelist = require("../controllers/whitelist.controllers.js");
    var router = require("express").Router();
    router.post("/", whitelist.create);
    router.get("/", whitelist.findAll);
    router.post("/:_address", whitelist.findByAddress);
    router.put("/:_address", whitelist.updateByAddress);
    router.delete("/:_address", whitelist.deleteByAddress);
    router.delete("/", whitelist.deleteAll);
    app.use('/api/whitelist', router);

    const salemanage = require("../controllers/salemanage.controllers.js");
    var salemanage_router = require("express").Router();
    salemanage_router.post("/", salemanage.update);
    salemanage_router.get('/', salemanage.get);
    app.use('/api/salemanage',salemanage_router);
  };