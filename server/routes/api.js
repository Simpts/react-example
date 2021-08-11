import { Router } from "express";
import { getExpenses, addExpense } from "../services/expenseTracker";

const CODES = {
  SERVER_ERROR: 500,
  BAD_REQUEST: 400,
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
    const maxDecimals = 2;
    let amount = parseFloat(Number(req.body.amount).toFixed(maxDecimals));
    const description = req.body.description;

    if (
      typeof amount != "number" ||
      isNaN(amount) ||
      amount <= 0 ||
      description.length > 140
    ) {
      return res.json({ error: "Bad Request" }).status(CODES.BAD_REQUEST);
    }

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
