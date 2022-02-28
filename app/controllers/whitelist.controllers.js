const Whitelist = require("../models/whitelist.models.js");
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      const whitelist = new Whitelist({
        user_address: req.body.user_address,
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_phone: req.body.user_phone,
        created_at: req.body.created_at
      });
      Whitelist.create(whitelist, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Whitelist."
          });
        else res.send(data);
      });
};

exports.findAll = (req, res) => {
    Whitelist.findAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving whitelist."
        });
      else res.send(data);
    });
  };

exports.findByAddress = (req, res) => {
    Whitelist.findByAddress(req.params._address, (err, data) => {
        if (err) {
        if (err.kind === "not_found") {
            res.send("poor");
        } else {
            res.status(500).send({
            message: "Error retrieving Whitelist with address " + req.params._address
            });
        }
        } else res.send(data);
    });
};

exports.updateByAddress = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);
  Whitelist.updateByAddress(
    req.params._address,
    new Whitelist(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Whitelist with address ${req.params._address}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Whitelist with address " + req.params._address
          });
        }
      } else res.send(data);
    }
  );
};

exports.deleteByAddress = (req, res) => {
  Whitelist.remove(req.params._address, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Whitelist with address ${req.params._address}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Whitelist with address " + req.params._address
        });
      }
    } else res.send({ message: `Whitelist was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Whitelist.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all whitelist."
      });
    else res.send({ message: `All Whitelist were deleted successfully!` });
  });
};