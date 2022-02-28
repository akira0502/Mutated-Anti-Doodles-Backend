const sql = require("./db.js");
// constructor
const Whitelist = function(whitelist) {
  this.user_address = whitelist.user_address;
  this.user_name = whitelist.user_name;
  this.user_email = whitelist.user_email;
  this.user_phone = whitelist.user_phone;
  this.created_at = whitelist.created_at;
};

Whitelist.create = (newWhiltelist, result) => {
  sql.query(`SELECT * FROM whitelist WHERE user_address = '${newWhiltelist.user_address}'`, (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(null, "same address already exist.");
        return;
      }
      else {
        sql.query("INSERT INTO whitelist SET ?", newWhiltelist, (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }
            console.log("created whitelist: ", { id: res.insertId, ...newWhiltelist });
            result(null, "your create success!");
          });
      }
  });
  
};

Whitelist.findAll = (result) => {
    let query = "SELECT * FROM whitelist";
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("whitelist: ", res);
      result(null, res);
    });
  };


Whitelist.findByAddress = (_address, result) => {
  sql.query(`SELECT * FROM whitelist WHERE user_address = ${_address}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found whitelist: ", res[0]);
      result(null, "ok");
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Whitelist.updateByAddress = (user_address, whitelist, result) => {
  sql.query(
    `UPDATE whitelist SET user_name = ?, user_email = ?, user_phone = ?, created_at = ? WHERE user_address = ${user_address}`,
    [whitelist.user_name, whitelist.user_email, whitelist.user_phone, whitelist.created_at],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { user_address: user_address, ...whitelist });
    }
  );
};

Whitelist.remove = (user_address, result) => {
  sql.query(`DELETE FROM whitelist WHERE user_address = ${user_address} `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
};

Whitelist.removeAll = result => {
  sql.query("DELETE FROM whitelist", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Whitelist;