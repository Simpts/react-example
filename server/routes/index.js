import { Router } from "express";
import fallback from "./fallback";

export default () => {
  const app = Router();

  fallback(app);
  return app;
};
