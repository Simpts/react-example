import { Router } from "express";
import fallback from "./fallback";
import api from "./api";

export default () => {
  const app = Router();
  api(app);

  fallback(app);
  return app;
};
