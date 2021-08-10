import { Router } from "express";
import { getExpenses, addExpense } from "../services/expenseTracker";

const CODES = {
  SERVER_ERROR: 500,
};

export default app => {
  const route = Router();

  route.get("/expenses", async (_, res) => {
    const [error, rows] = await to(getExpenses());

    if (error) {
      console.error(error);
      return res
        .json({
          error: "Internal Server Error",
        })
        .status(CODES.SERVER_ERROR);
    }

    return res.json({ data: { rows } });
  });

  /**
   * Match POST reqs both on /expense and /expenses
   *
   * @todo Validate request data using express-validator
   */
  route.post("/expenses?", async (req, res) => {
    const amount = req.body.amount;
    const description = req.body.description;
    const [error] = await to(addExpense(amount, description));

    if (error) {
      console.error(error);
      return res
        .json({
          error: "Internal Server Error",
        })
        .status(CODES.SERVER_ERROR);
    }

    return res.json({ data: "" });
  });

  app.use("/api", route);
};

/**
 * Simple utility function for returning an error/data
 * array from a promise to avoid "try/catch hell"
 */
function to(promise) {
  return promise.then(data => [null, data]).catch(error => [error, null]);
}
