const Salemanage = require("../models/salemanage.models.js");
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    const salemanage = new Salemanage({
        presale_start: req.body.presale_start,
        publicsale_start: req.body.publicsale_start
    });
    Salemanage.update(salemanage, (err, data) => {
    if (err)
        res.status(500).send({
        message:
            err.message || "Some error occurred while updating the Salemanage."
        });
    else res.send(data);
    });
};

exports.get = (req, res) => {
    Salemanage.get((err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving salemanage."
        });
        else res.send(data);
    });
};