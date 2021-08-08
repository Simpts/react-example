import mysql from "mysql2";

const DB = mysql.createPool({
  host: process.env.DB_HOST ?? "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export function getExpenses() {
  return new Promise((resolve, reject) => {
    DB.execute("SELECT amount, description FROM expenses", (error, rows) => {
      if (error) return reject(error);
      resolve(rows);
    });
  });
}

export function addExpense(amount, description) {
  return new Promise((resolve, reject) => {
    DB.execute(
      "INSERT INTO expenses (amount, description) VALUES (?, ?)",
      [amount, description],
      error => {
        if (error) return reject(error);
        resolve();
      },
    );
  });
}
