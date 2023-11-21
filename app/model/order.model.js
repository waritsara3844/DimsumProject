const sql = require("./db");

const Order = function (order) {
  this.total = order.total;
  this.user_id = order.user_id;
};

Order.create = async (newOrder) => {
  return await sql.promise().query("INSERT INTO orders SET ?", newOrder);
};

Order.summaries = async (start, end) => {
  const query = `SELECT DATE(o.created_at) as date, SUM(o.total) as total_amount FROM orders o
  WHERE o.created_at >= '${start}' AND o.created_at < '${end}'
  GROUP BY date`;
  const [rows] = await sql.promise().query(query);
  return rows;
};

Order.ranking = async () => {
  const query = `SELECT * FROM menus m ORDER BY sold_amount DESC;`;
  const [rows] = await sql.promise().query(query);
  return rows;
};

module.exports = Order;
