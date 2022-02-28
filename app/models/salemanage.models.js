const sql = require("./db.js");
// constructor
const Salemanage = function(salemanage) {
  this.presale_start = salemanage.presale_start;
  this.publicsale_start = salemanage.publicsale_start;
};

Salemanage.update = (salemanage, result) => {
    sql.query(
      `UPDATE salemanage SET presale_start = ?, publicsale_start = ? WHERE id = 1`,
      [salemanage.presale_start, salemanage.publicsale_start],
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
        result(null, {...salemanage });
      }
    );
  };

Salemanage.get = (result) => {
    let query = "SELECT * FROM salemanage";
    sql.query(query, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        console.log("salemanage: ", res[0]);
        result(null, res[0]);
    });
};

module.exports = Salemanage;